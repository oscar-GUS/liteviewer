// Construye la geometría 3D del schematic instanciando los modelos de bloque reales
// (escaleras, losas, vallas, redstone…). Por cada índice de paleta se precalcula una
// lista de "quads locales" (caja unidad 0..1, con rotaciones de elemento y blockstate
// ya aplicadas); el bucle por celda solo traslada y aplica el culling por cullface.
//
// Niveles: modelo 3D (ModelDB) -> cubo texturado (blockTextures) -> color plano.
// Pasadas: sólido+recorte (alphaTest) y translúcido (cristal tintado/agua).
//
// Sombra suave (AO por vértice, como el smooth lighting de vanilla): cada esquina
// de una cara mira sus 3 vecinos (dos lados y la diagonal) y se oscurece 0.2 por
// cada bloque macizo. Va horneada en el color de vértice, así que no cuesta nada al
// pintar. Se puede apagar (MeshOptions.ao): la miniatura del catálogo sale sin ella.

import * as THREE from 'three'
import { SchematicModel, isAir, BlockState } from './types'

type ModelInput = Pick<SchematicModel, 'width' | 'height' | 'length' | 'blocks' | 'palette'>
import { getBlockColor, baseName, normalizeLegacy } from './blockColors'
import { getFaceInfo, blockTint, WATER } from './blockTextures'
// Solo el tipo: atlas.ts importa de aquí OPAQUE_LEAF_SUFFIX.
import type { UVRect } from './atlas'
import { BakedElement, ResolvedPart } from './models'
import { EntityAtlas, LocalQuad, isBlockEntity, buildBlockEntity } from './blockEntities'
import { computeLight, LightPalette } from './blockLight'

/** Hojas detalladas (con huecos, como "Gráficos: Detallados") o rápidas (opacas). */
export type LeavesMode = 'auto' | 'fancy' | 'fast'

export interface MeshOptions {
  /** Sombra suave en esquinas y rincones. Por defecto sí. */
  ao?: boolean
  /** 'auto': detalladas salvo que la build tenga más de LEAVES_FAST_MIN hojas. */
  leaves?: LeavesMode
  /**
   * Luz por vértice para el modo exhibición (RawBuffers.lit): luz de cielo y de
   * bloque propagadas como en Minecraft (blockLight.ts), la sombra suave aparte y
   * qué es cada cara (hojas, plantas, agua, lava). Sin ella, la malla de siempre.
   */
  light?: boolean
}

// Último byte de RawBuffers.lit: qué es la cara, para el sombreado de la exhibición
// (showcase.ts lee lo mismo). Bits 0-1: tipo (LK_LEAVES es todo lo que deja pasar
// la luz como una hoja: hojas y plantas); bit 2: sin el sombreado por cara de
// vanilla (elementos con shade: false); bits 3-7: en las plantas, 1 + cuánto se
// mece ese vértice (1 = la base, que no se mueve; 16 = la punta de una planta de un
// bloque; 31 = la de una de dos). Con 0, si es hoja se mece entera.
export const LK_LEAVES = 1, LK_WATER = 2, LK_LAVA = 3, LK_NOSHADE = 4

// Por encima de estas hojas (en todo el volumen, no en el corte, para que no
// cambie al cortar) el modo 'auto' las pone rápidas. Con hojas detalladas cada
// hoja dibuja sus 6 caras aunque tenga otra al lado (dentro de una copa ya no se
// descartan): ~6 quads por hoja frente a solo la piel de la copa. Medido en la
// Fase 2: un bosque de robles con 22.800 hojas pasa de 87k a 181k quads (se queda
// detallado); un dosel de selva de 139k hojas, de 153k a 835k (x5,5); y la XL
// (145k hojas) pasa del tope de 8 M quads de la capa opaca y sale truncada.
// Con 60k el extra queda por debajo de ~360k quads (~42 MB de GPU y otro tanto de
// copia en JS): asumible también en móvil, y por encima las hojas se comen la malla.
export const LEAVES_FAST_MIN = 60_000

/** Sufijo de las copias opacas de las texturas de hojas que el atlas añade al cargar. */
export const OPAQUE_LEAF_SUFFIX = '#opaca'

export interface MeshGeometries {
  opaque: THREE.BufferGeometry | null
  transparent: THREE.BufferGeometry | null
  entity: THREE.BufferGeometry | null
  emissive: THREE.BufferGeometry | null
  lights: LightSample[]
}

// Muestra de fuente de luz (ya en coordenadas del modelo, centrado en el origen),
// agrupadas por celdas. Eran las luces puntuales del modo exhibición; hoy la luz de
// bloque va horneada en la malla (blockLight.ts) y solo las devuelve buildMeshRaw.
export interface LightSample {
  x: number; y: number; z: number
  r: number; g: number; b: number
  level: number
  count: number
}

export interface IAtlas {
  tileIndex(name: string): number | undefined
  uv(index: number): UVRect
  readonly whiteIndex: number
}

export interface IModelDB {
  resolve(name: string, properties?: Record<string, string>): ResolvedPart[] | null
}

export interface RawBuffers {
  pos: Float32Array
  uv: Float32Array
  col: Uint8Array          // color de vértice normalizado 0-255 (los emisivos >1 saturan, que es lo deseado)
  idx: Uint16Array | Uint32Array
  /**
   * Entrada de paleta del bloque de cada vértice (PAL_NONE en el agua de los
   * bloques anegados). Con ella el visor resalta dónde va un material sin rehacer
   * la malla (ver SchematicViewer.setHighlightPalette).
   */
  pal: Uint16Array
  /**
   * Solo con MeshOptions.light: 4 bytes por vértice, luz de bloque y de cielo (0-15
   * llevado a 0-255, ya promediada con las celdas vecinas), la sombra suave que va
   * en `col` y el tipo de cara (LK_*).
   */
  lit?: Uint8Array
}

/** Vértices que no son de ningún material (el agua que se añade a un bloque anegado). */
export const PAL_NONE = 0xffff

export interface RawGeometries {
  opaque: RawBuffers | null
  transparent: RawBuffers | null
  entity: RawBuffers | null
  emissive: RawBuffers | null
  lights: LightSample[]
  truncated: boolean
  /** Si esta malla lleva las hojas rápidas (opacas). */
  fastLeaves: boolean
  /** Si con hojas detalladas la capa opaca seguiría por debajo de MAX_QUADS (estimado). */
  fancyLeavesFit: boolean
}

export interface SliceRange {
  x: [number, number]
  y: [number, number]
  z: [number, number]
}

// 6 direcciones de cara/vecino: índices 0:+X 1:-X 2:+Y 3:-Y 4:+Z 5:-Z
const NEIGHBOR: ReadonlyArray<readonly [number, number, number]> = [
  [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1],
]

// Tintes de bioma: tabla por bloque en blockTextures.blockTint (con fuentes).
const NO_TINT: readonly [number, number, number] = [1, 1, 1]

// Color del redstone dust según nivel de señal (rampa exacta de Minecraft):
// power 0 = rojo oscuro casi negro, power 15 = rojo vivo.
function redstoneColor(power: number): readonly [number, number, number] {
  const f = Math.max(0, Math.min(15, power)) / 15
  const r = f * 0.6 + (f > 0 ? 0.4 : 0.3)
  const g = Math.max(0, Math.min(1, f * f * 0.7 - 0.5))
  const b = Math.max(0, Math.min(1, f * f * 0.6 - 0.7))
  return [r, g, b]
}

// Translúcidos de verdad (mezcla con lo de detrás). El cristal normal y su panel
// NO: en vanilla son de recorte (el marco opaco y el resto hueco), así que van a
// la pasada sólida con alphaTest, escriben profundidad y no hace falta ordenarlos.
const TRANSLUCENT = new Set(['water', 'ice', 'frosted_ice', 'slime_block', 'honey_block', 'nether_portal', 'bubble_column'])
function isTranslucent(name: string): boolean {
  const b = baseName(name)
  return b.includes('stained_glass') || b === 'tinted_glass' || TRANSLUCENT.has(b)
}

// Bloques de cubo entero con huecos en la textura: no tapan las caras de sus
// vecinos, o por los huecos se vería el vacío (antes pasaba con hojas, spawner y
// faro). Las hojas solo cuando van detalladas: las rápidas son opacas y sí tapan.
const NON_OCCLUDING = new Set(['glass', 'spawner', 'trial_spawner', 'vault', 'beacon', 'mangrove_roots'])
function isLeaves(base: string): boolean { return base.endsWith('_leaves') }
function isNonOccluding(base: string): boolean {
  return NON_OCCLUDING.has(base) || base.endsWith('copper_grate') || isLeaves(base)
}

// Bloques que no dibujan la cara que comparten con otro igual (en vanilla,
// HalfTransparentBlock e IronBarsBlock): cristal, cristal tintado, paneles,
// barrotes, hielo, slime, miel y rejillas de cobre. Una pared de cristal de
// 128x64x4 pasa de 196.608 quads a ~18.000. Las hojas no: en detallado vanilla
// dibuja también las caras entre hojas.
function selfCulls(base: string): boolean {
  return base === 'glass' || base === 'glass_pane' || base.includes('stained_glass') || base === 'tinted_glass' ||
    base === 'iron_bars' || base === 'ice' || base === 'frosted_ice' || base === 'slime_block' ||
    base === 'honey_block' || base.endsWith('copper_grate')
}

// ¿Oscurece a sus vecinos con la sombra suave? En vanilla, solo los bloques de
// colisión de cubo entero (getShadeBrightness 0.2), menos los de cristal, que
// devuelven 1. Las hojas sí oscurecen.
function aoOccluderOk(base: string): boolean {
  return !(base === 'glass' || base.includes('stained_glass') || base === 'tinted_glass' ||
    base.endsWith('copper_grate') || base === 'honey_block' || base === 'nether_portal')
}

// Modelos con "ambientocclusion": false en vanilla, que va a nivel de modelo y
// models.json no guarda (sacado de la caché de build-models). Las plantas en cruz
// ya salen sin sombra suave por shade:false; aquí van los que llevan shade y
// vanilla tampoco sombrea: raíles, redstone, tallos, nenúfar, puertas, paneles...
const NO_AO = new Set([
  'redstone_wire', 'lily_pad', 'ladder', 'tripwire', 'vine', 'glow_lichen', 'sculk_vein', 'resin_clump',
  'melon_stem', 'pumpkin_stem', 'attached_melon_stem', 'attached_pumpkin_stem', 'hopper', 'lever',
  'flower_pot', 'cocoa', 'chorus_plant', 'pink_petals', 'wildflowers', 'leaf_litter', 'frogspawn',
  'fire', 'soul_fire', 'cobweb', 'pitcher_crop', 'pitcher_plant', 'waterlily',
])
function noAmbientOcclusion(base: string): boolean {
  return NO_AO.has(base) || base.endsWith('rail') || base.endsWith('_door') || base.endsWith('glass_pane') ||
    base.endsWith('_bars') || base.endsWith('cauldron') || base.endsWith('repeater') || base.endsWith('comparator') ||
    base.startsWith('potted_') || base.endsWith('torch')
}

// Lo que se mece con el viento en la exhibición. Plantas que crecen del suelo: se
// mece la punta y la base se queda (lw 1, o 2 en la mitad de arriba de las de dos
// bloques). Lo que va en columna o cuelga se mueve entero, como las hojas (LK_LEAVES):
// la punta de un bloque y la base del de encima tienen que ir juntas.
const SWAY_PLANT = new Set([
  'short_grass', 'grass', 'tall_grass', 'fern', 'large_fern', 'dandelion', 'poppy', 'blue_orchid', 'allium',
  'azure_bluet', 'red_tulip', 'orange_tulip', 'white_tulip', 'pink_tulip', 'oxeye_daisy', 'cornflower',
  'lily_of_the_valley', 'wither_rose', 'torchflower', 'sunflower', 'lilac', 'rose_bush', 'peony', 'pitcher_plant',
  'wheat', 'carrots', 'potatoes', 'beetroots', 'sweet_berry_bush', 'dead_bush', 'bush', 'firefly_bush',
  'short_dry_grass', 'tall_dry_grass', 'seagrass', 'tall_seagrass', 'nether_sprouts', 'warped_roots',
  'crimson_roots', 'open_eyeblossom', 'closed_eyeblossom',
])
const SWAY_WHOLE = new Set([
  'sugar_cane', 'kelp', 'kelp_plant', 'vine', 'cave_vines', 'cave_vines_plant', 'weeping_vines',
  'weeping_vines_plant', 'twisting_vines', 'twisting_vines_plant', 'hanging_roots',
])
function plantSway(base: string, props?: Record<string, string>): number {
  if (!SWAY_PLANT.has(base) && !base.endsWith('_sapling')) return 0
  return props?.half === 'upper' ? 2 : 1
}
function swaysWhole(base: string): boolean { return isLeaves(base) || SWAY_WHOLE.has(base) }

/**
 * Si el bloque se mueve solo en la exhibición (versión alta): agua y lava (también
 * lo anegado), hojas y lo que se mece. Sin nada de esto, con el giro en pausa la
 * imagen está quieta y el visor no tiene que pintar sin parar.
 */
export function movesInShowcase(bs: BlockState): boolean {
  const base = normalizeLegacy(baseName(bs.name), bs.properties)
  return fluidFamily(base) !== null || isUnderwater(bs) || swaysWhole(base) || plantSway(base, bs.properties) > 0
}

function tintFor(name: string, props?: Record<string, string>): readonly [number, number, number] {
  const b = baseName(name)
  if (b === 'redstone_wire') return redstoneColor(parseInt(props?.power ?? '0', 10) || 0)
  // Lo que vanilla no tiñe sale blanco aunque el modelo traiga tintindex (cerezo,
  // roble pálido, bambú, cortapiedras, calderos de lava y de nieve...). Antes caía
  // todo al verde de follaje: la sierra del cortapiedras salía verde.
  return blockTint(normalizeLegacy(b, props), props) ?? NO_TINT
}

// Nivel de luz (0-15) que emite un bloque. Los que dan luz van a la malla emisiva
// (en el modo exhibición brillan con bloom) y, con MeshOptions.light, son el
// origen de la luz de bloque que se propaga (blockLight.ts).
const LIGHT: Record<string, number> = {
  beacon: 15, conduit: 15, glowstone: 15, jack_o_lantern: 15, lava: 15, sea_lantern: 15,
  shroomlight: 15, lava_cauldron: 15, ochre_froglight: 15, verdant_froglight: 15,
  pearlescent_froglight: 15, fire: 15, lantern: 14, end_rod: 14, torch: 14, wall_torch: 14,
  cave_vines_plant: 14, soul_torch: 10, soul_wall_torch: 10, soul_lantern: 10, soul_fire: 10,
  crying_obsidian: 10, glow_lichen: 7, ender_chest: 7, redstone_ore: 9, deepslate_redstone_ore: 9,
  sea_pickle: 6, sculk_catalyst: 6, magma_block: 3, smoker: 13, blast_furnace: 13, furnace: 13,
  brewing_stand: 1, brown_mushroom: 1, amethyst_cluster: 5, large_amethyst_bud: 4,
  medium_amethyst_bud: 2, small_amethyst_bud: 1, glow_item_frame: 0,
  redstone_block: 4, // no emite luz en vanilla; brillo rojo tenue a propósito
  end_portal: 15, end_gateway: 15,
}
// La textura que brilla en los que no brillan enteros (ver buildPalRender).
const EMISSIVE_TILE: Record<string, string> = {
  repeater: 'redstone_torch', comparator: 'redstone_torch',
  furnace: 'furnace_front_on', smoker: 'smoker_front_on', blast_furnace: 'blast_furnace_front_on',
  jack_o_lantern: 'jack_o_lantern',
}
// Dan luz pero no brillan (ver buildPalRender).
const NO_GLOW = new Set(['brewing_stand', 'brown_mushroom'])
function lightLevel(name: string, props?: Record<string, string>): number {
  const b = baseName(name)
  // Emisores condicionados por blockstate
  if (b === 'redstone_lamp') return props?.lit === 'true' ? 15 : 0
  if (b === 'furnace' || b === 'smoker' || b === 'blast_furnace') return props?.lit === 'true' ? 13 : 0
  if (b === 'campfire') return props?.lit === 'false' ? 0 : 15            // por defecto encendido
  if (b === 'soul_campfire') return props?.lit === 'false' ? 0 : 10
  if (b === 'redstone_torch' || b === 'redstone_wall_torch') return props?.lit === 'false' ? 0 : 7
  if (b === 'repeater' || b === 'comparator') return props?.powered === 'true' ? 3 : 0 // tenue, solo activos
  if (b === 'redstone_ore' || b === 'deepslate_redstone_ore') return props?.lit === 'true' ? 9 : 0
  if (b === 'respawn_anchor') return (parseInt(props?.charges ?? '0', 10) || 0) > 0 ? 15 : 0
  if (b === 'candle' || b.endsWith('_candle')) return props?.lit === 'true' ? Math.min(12, 3 * (parseInt(props?.candles ?? '1', 10) || 1)) : 0
  if (b === 'cave_vines' || b === 'cave_vines_plant') return props?.berries === 'true' ? 14 : 0
  if (b === 'copper_bulb' || b.endsWith('_copper_bulb')) return props?.lit === 'true' ? 15 : 0
  return LIGHT[b] ?? 0
}
// Color aproximado de la luz que emite cada bloque (LightSample). El brillo se hace
// en el material; aquí solo el tono de la luz.
function lightColor(name: string): { r: number; g: number; b: number } {
  const b = baseName(name)
  if (b.startsWith('soul_')) return { r: 0.45, g: 0.78, b: 1.0 }                 // alma: cian
  if (b === 'redstone_torch' || b === 'redstone_wall_torch' || b === 'redstone_lamp' ||
      b === 'redstone_ore' || b === 'deepslate_redstone_ore' || b === 'redstone_block' ||
      b === 'repeater' || b === 'comparator') return { r: 1.0, g: 0.22, b: 0.12 }
  if (b === 'lava' || b === 'magma_block' || b === 'fire' || b === 'campfire' ||
      b === 'lava_cauldron') return { r: 1.0, g: 0.55, b: 0.20 }                 // fuego cálido
  if (b === 'torch' || b === 'wall_torch' || b === 'lantern' || b === 'jack_o_lantern' ||
      b === 'candle' || b.endsWith('_candle')) return { r: 1.0, g: 0.78, b: 0.45 }
  if (b === 'end_portal' || b === 'end_gateway') return { r: 0.35, g: 0.6, b: 0.95 }  // portal del End: azul/cian
  return { r: 1.0, g: 0.95, b: 0.82 }                                            // glowstone/sea lantern/etc: blanco cálido
}

function shadeFor(nx: number, ny: number, nz: number): number {
  const ax = Math.abs(nx), ay = Math.abs(ny), az = Math.abs(nz)
  if (ay >= ax && ay >= az) return ny >= 0 ? 1.0 : 0.5
  if (az >= ax) return nz >= 0 ? 0.8 : 0.7
  return 0.62
}

// Genera las 4 esquinas (0-16) y sus (u,v en 0-16) de una cara de la caja [f,t].
// Orden [BL,BR,TR,TL]; normal hacia afuera; uv: a=izq, c=der, b=arriba, d=abajo.
function faceQuad(dir: string, f: number[], t: number[], uv: number[]): { pos: number[]; uv: number[] } {
  const [x1, y1, z1] = f, [x2, y2, z2] = t
  const [a, b, c, d] = uv
  switch (dir) {
    case 'south': return { pos: [x1, y1, z2, x2, y1, z2, x2, y2, z2, x1, y2, z2], uv: [a, d, c, d, c, b, a, b] }
    case 'north': return { pos: [x2, y1, z1, x1, y1, z1, x1, y2, z1, x2, y2, z1], uv: [a, d, c, d, c, b, a, b] }
    case 'east': return { pos: [x2, y1, z2, x2, y1, z1, x2, y2, z1, x2, y2, z2], uv: [a, d, c, d, c, b, a, b] }
    case 'west': return { pos: [x1, y1, z1, x1, y1, z2, x1, y2, z2, x1, y2, z1], uv: [a, d, c, d, c, b, a, b] }
    case 'up': return { pos: [x1, y2, z2, x2, y2, z2, x2, y2, z1, x1, y2, z1], uv: [a, d, c, d, c, b, a, b] }
    default: return { pos: [x1, y1, z1, x2, y1, z1, x2, y1, z2, x1, y1, z2], uv: [a, d, c, d, c, b, a, b] } // down
  }
}

const DIR_NORMAL: Record<string, [number, number, number]> = {
  east: [1, 0, 0], west: [-1, 0, 0], up: [0, 1, 0], down: [0, -1, 0], south: [0, 0, 1], north: [0, 0, -1],
}
function dirIndexFromNormal(n: THREE.Vector3): number {
  const ax = Math.abs(n.x), ay = Math.abs(n.y), az = Math.abs(n.z)
  if (ax >= ay && ax >= az) return n.x >= 0 ? 0 : 1
  if (ay >= az) return n.y >= 0 ? 2 : 3
  return n.z >= 0 ? 4 : 5
}

// Datos de sombra suave de un quad, precalculados por entrada de paleta.
// d: dirección de la cara (0..5, como NEIGHBOR). layer: 1 si la cara está en el
// borde del bloque (los vecinos se miran en la celda de delante), 0 si está metida
// hacia dentro (la tapa de una losa: se miran en la misma capa que el bloque).
// w: pesos bilineales de las 4 esquinas de la cara para cada uno de los 4 vértices
// (w[k*4 + c]): en una cara parcial (la losa, el escalón) se interpola como hace
// vanilla. pure: en una cara entera cada vértice cae justo en una esquina, pure[k]
// es esa esquina y se ahorran los pesos (casi todos los quads).
interface QuadAO { d: number; layer: number; w: Float32Array; pure: Int8Array | null }
// Para la luz de la exhibición: lf, de qué celda se toma la luz si el quad va sin
// sombra suave (d * 2 + layer como en QuadAO; sin él, la propia celda); lk, el
// tipo de cara (LK_*); lw, si es una planta que se mece (1, o 2 en la mitad de
// arriba de una de dos bloques).
// uvIn: en las hojas detalladas, la uv de la copia opaca de su textura, para la cara
// que da a otra hoja (ver emit).
type MeshQuad = LocalQuad & { ao?: QuadAO; lf?: number; lk?: number; lw?: number; uvIn?: number[] }

// occluder: tapa las caras de sus vecinos. aoOcc: oscurece a sus vecinos (sombra
// suave). selfCull: no dibuja las caras contra otro bloque igual (cristal...).
// fluidCover: en un bloque anegado, lo que el propio bloque tapa de cada cara de
// su celda (ver selfCover); el agua no se dibuja ahí.
interface PalRender {
  air: boolean; occluder: boolean; aoOcc?: boolean; selfCull?: boolean
  solid: MeshQuad[]; trans: MeshQuad[]; entity?: LocalQuad[]; emis?: MeshQuad[]
  fluid?: FluidInfo; fluidCover?: Uint16Array; light?: { level: number; r: number; g: number; b: number }
}

// Lo que buildPalRender necesita saber de la malla en curso.
interface PalCtx { ao: boolean; fastLeaves: boolean }

// Ejes de la cara para la sombra suave: [eje U, eje V] (0 = x, 1 = y, 2 = z) según
// el eje de la normal. Esquina c: bit 0 = lado +U, bit 1 = lado +V.
const AO_UV_AXES: ReadonlyArray<readonly [number, number]> = [[2, 1], [0, 2], [0, 1]]
// Lo que oscurece cada vecino macizo (vanilla: getShadeBrightness = 0.2, así que
// cada uno de los 4 que se promedian resta 0.2). Con los dos lados tapados la
// esquina cuenta como tapada aunque la diagonal esté libre: mínimo 0.4 en un rincón.
const AO_STEP = 0.2
// Vecino (dx,dy,dz) ∈ {-1,0,1}³ -> clave 0..26 de la caché por celda.
const nbKey = (dx: number, dy: number, dz: number) => (dx + 1) * 9 + (dy + 1) * 3 + (dz + 1)
const NB_DX = new Int8Array(27), NB_DY = new Int8Array(27), NB_DZ = new Int8Array(27)
for (let k = 0; k < 27; k++) { NB_DX[k] = ((k / 9) | 0) - 1; NB_DY[k] = (((k / 3) | 0) % 3) - 1; NB_DZ[k] = (k % 3) - 1 }
// Por dirección y capa (d*2 + layer): claves de [lado U, lado V, diagonal] de cada
// esquina, y la del centro (la celda de delante de la cara).
const AO_KEYS: Int8Array[] = []
const AO_CENTER = new Int8Array(6)
for (let d = 0; d < 6; d++) {
  const n = NEIGHBOR[d]
  const [ua, va] = AO_UV_AXES[d >> 1]
  AO_CENTER[d] = nbKey(n[0], n[1], n[2])
  for (let layer = 0; layer < 2; layer++) {
    const keys = new Int8Array(12)
    for (let c = 0; c < 4; c++) {
      const su = c & 1 ? 1 : -1, sv = c & 2 ? 1 : -1
      const p = [n[0] * layer, n[1] * layer, n[2] * layer]
      const s1 = [...p]; s1[ua] += su
      const s2 = [...p]; s2[va] += sv
      const dg = [...p]; dg[ua] += su; dg[va] += sv
      keys[c * 3] = nbKey(s1[0], s1[1], s1[2])
      keys[c * 3 + 1] = nbKey(s2[0], s2[1], s2[2])
      keys[c * 3 + 2] = nbKey(dg[0], dg[1], dg[2])
    }
    AO_KEYS[d * 2 + layer] = keys
  }
}

// Sombra suave de un quad (posiciones 0..1 del bloque) que mira hacia `d`.
// Si la cara (que mira hacia `d`) está en el borde del bloque.
function onEdgeOf(pos: number[], d: number): boolean {
  const ax = d >> 1, positive = (d & 1) === 0
  for (let k = 0; k < 4; k++) {
    const c = pos[k * 3 + ax]
    if (positive ? c < 0.999 : c > 0.001) return false
  }
  return true
}

function quadAO(pos: number[], d: number): QuadAO {
  const ax = d >> 1
  const onEdge = onEdgeOf(pos, d)
  const [ua, va] = AO_UV_AXES[ax]
  const w = new Float32Array(16)
  for (let k = 0; k < 4; k++) {
    const u = Math.min(1, Math.max(0, pos[k * 3 + ua])), v = Math.min(1, Math.max(0, pos[k * 3 + va]))
    w[k * 4] = (1 - u) * (1 - v); w[k * 4 + 1] = u * (1 - v); w[k * 4 + 2] = (1 - u) * v; w[k * 4 + 3] = u * v
  }
  let pure: Int8Array | null = new Int8Array(4)
  for (let k = 0; k < 4 && pure; k++) {
    const c = w.subarray(k * 4, k * 4 + 4).findIndex((x) => x > 0.9999)
    if (c < 0) pure = null
    else pure[k] = c
  }
  return { d, layer: onEdge ? 1 : 0, w, pure }
}

// Hojas de todo el volumen (no del corte, para que 'auto' no cambie al cortar), y
// solo si la paleta tiene alguna: sin hojas no se recorre nada. Recorrerlo cuesta
// ~1 ns por celda (unos 50 ms en XL).
function countLeaves(m: ModelInput): number {
  const flag = new Uint8Array(m.palette.length)
  let any = false
  m.palette.forEach((bs, i) => { if (bs && isLeaves(baseName(bs.name))) { flag[i] = 1; any = true } })
  if (!any) return 0
  const n = Math.min(m.blocks.length, m.width * m.height * m.length)
  let count = 0
  for (let i = 0; i < n; i++) count += flag[m.blocks[i]]
  return count
}
function decideFastLeaves(leaves: number, mode: LeavesMode): boolean {
  if (mode !== 'auto') return mode === 'fast'
  return leaves > LEAVES_FAST_MIN
}
// Hojas detalladas: cada hoja dibuja hasta sus 6 caras (las que dan a otra hoja
// también). Para estimar si caben en la malla se cuentan las 6.
const FANCY_QUADS_PER_LEAF = 6

// Los fluidos (agua/lava) no tienen modelo de blockstate: el juego los renderiza
// aparte con altura variable según la propiedad `level`. Se resuelven por celda en
// el bucle principal (no como quads precalculados) para poder conectar con el
// fluido de encima y cullear contra vecinos.
interface FluidInfo {
  family: 'water' | 'lava'
  tileIdx: number
  tint: readonly [number, number, number] | null
  translucent: boolean
  heightPx: number
}
function fluidFamily(base: string): 'water' | 'lava' | null {
  if (base === 'water' || base === 'flowing_water' || base === 'bubble_column') return 'water'
  if (base === 'lava' || base === 'flowing_lava') return 'lava'
  return null
}
// Altura (px 0-16) de la superficie según `level`: 0 = fuente (~14.2/16),
// 1-7 = corriente cada vez más baja, >=8 = cayendo (bloque lleno).
function fluidHeightPx(lvl: number): number {
  if (lvl >= 8) return 16
  return ((8 - lvl) / 9) * 16
}

// Matriz de rotación de un elemento (espacio 0-16)
function elementMatrix(el: BakedElement): THREE.Matrix4 {
  if (!el.rotation) return new THREE.Matrix4()
  const { origin, axis, angle, rescale } = el.rotation
  const rad = (angle * Math.PI) / 180
  const m = new THREE.Matrix4().makeTranslation(origin[0], origin[1], origin[2])
  if (rescale && angle !== 0) {
    const s = 1 / Math.cos(Math.abs(rad))
    const sv = axis === 'x' ? [1, s, s] : axis === 'y' ? [s, 1, s] : [s, s, 1]
    m.multiply(new THREE.Matrix4().makeScale(sv[0], sv[1], sv[2]))
  }
  const ax = axis === 'x' ? new THREE.Vector3(1, 0, 0) : axis === 'y' ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(0, 0, 1)
  m.multiply(new THREE.Matrix4().makeRotationAxis(ax, rad))
  m.multiply(new THREE.Matrix4().makeTranslation(-origin[0], -origin[1], -origin[2]))
  return m
}
// Rotación de blockstate (x luego y) alrededor del centro (8,8,8)
function blockstateMatrix(x: number, y: number): THREE.Matrix4 {
  const m = new THREE.Matrix4().makeTranslation(8, 8, 8)
  if (y) m.multiply(new THREE.Matrix4().makeRotationY((-y * Math.PI) / 180))
  if (x) m.multiply(new THREE.Matrix4().makeRotationX((-x * Math.PI) / 180))
  return m.multiply(new THREE.Matrix4().makeTranslation(-8, -8, -8))
}

function rotateUv(uv8: number[], rot: number): number[] {
  const k = ((rot / 90) | 0) % 4
  if (!k) return uv8
  const pairs = [[uv8[0], uv8[1]], [uv8[2], uv8[3]], [uv8[4], uv8[5]], [uv8[6], uv8[7]]]
  const out: number[] = []
  for (let i = 0; i < 4; i++) { const p = pairs[(i + k) % 4]; out.push(p[0], p[1]) }
  return out
}

// Lo que se calcula una vez por modelo y recursos, antes de mallar ninguna parte:
// la paleta ya resuelta a quads, lo que se consulta por vecino en arrays planos y
// las celdas que dan luz. El visor malla la build por trozos (ver chunkMesher.ts)
// y cada trozo, o la tapa del corte, reutiliza esto en vez de rehacerlo: con la
// paleta de XL (5.449 entradas) y el recuento de hojas por todo el volumen eran
// 30-55 ms fijos en cada llamada.
export interface MeshPrep {
  model: ModelInput
  atlas: IAtlas | null
  pal: PalRender[]
  /** Por entrada de paleta: tapa las caras de sus vecinos. */
  occPal: Uint8Array
  /** Por entrada de paleta: oscurece a sus vecinos (sombra suave). */
  aoOcc: Uint8Array
  /** Por entrada de paleta: grupo de "no dibujar contra otro igual" (0 = ninguno). */
  cullGroup: Uint16Array
  /**
   * Por entrada de paleta: 1 si se mece entero en la exhibición (hojas, caña,
   * enredaderas...), 2 si no se mece pero tampoco sujeta (aire); 0, lo que sujeta
   * (ver anchorByte).
   */
  swayPal: Uint8Array
  /** Por entrada de paleta: 1 si son hojas. */
  leafPal: Uint8Array
  useAO: boolean
  fastLeaves: boolean
  leafCount: number
  /** Celdas que dan luz (índice de celda), en el orden del mallado (y, z, x). */
  emitters: Uint32Array
  /** Con MeshOptions.light: la luz de cada celda (cielo << 4 | bloque, ver blockLight.ts). */
  light: Uint8Array | null
  /** Por entrada de paleta, con luz: no deja pasar la luz (no se promedia en los vértices). */
  lightOpq: Uint8Array | null
}

// Lo que la propagación de luz necesita de la paleta (ver blockLight.ts).
function lightPalette(palette: BlockState[], pal: PalRender[]): LightPalette {
  const n = pal.length
  const lp: LightPalette = { opaque: new Uint8Array(n), faces: new Uint8Array(n), decay: new Uint8Array(n), emit: new Uint8Array(n) }
  pal.forEach((p, i) => {
    if (p.air) return
    const base = baseName(palette[i].name)
    const leaves = isLeaves(base)
    lp.emit[i] = p.light?.level ?? 0
    if (leaves || p.fluid?.family === 'water') lp.decay[i] = 1
    if (p.occluder && !leaves) { lp.opaque[i] = 1; return }
    // Lo que tiene huecos o se ve a través (cristal, hojas, rejillas) no corta nada.
    if (leaves || p.trans.length || isNonOccluding(base)) return
    const quads = p.emis ? p.solid.concat(p.emis) : p.solid
    if (!quads.length) return
    const cov = selfCover(quads)
    if (!cov) return
    let m = 0
    for (let d = 0; d < 6; d++) if (coversAll(cov, d)) m |= 1 << d
    lp.faces[i] = m
  })
  return lp
}

export function prepareMesh(
  model: ModelInput,
  atlas: IAtlas | null,
  db: IModelDB | null,
  entityAtlas?: EntityAtlas | null,
  opts?: MeshOptions,
): MeshPrep {
  const palette = model.palette
  const useAO = opts?.ao ?? true
  const leafCount = countLeaves(model)
  const fastLeaves = decideFastLeaves(leafCount, opts?.leaves ?? 'auto')
  const ctx: PalCtx = { ao: useAO, fastLeaves }
  const pal = palette.map((bs) => buildPalRender(bs, atlas, db, true, entityAtlas ?? null, ctx))
  // Lo que se consulta por vecino, en arrays planos (el bucle lo mira millones de veces).
  const occPal = new Uint8Array(pal.length), aoOcc = new Uint8Array(pal.length)
  const cullGroup = new Uint16Array(pal.length)   // 0 = no se descarta contra sí mismo
  const groupIds = new Map<string, number>()
  pal.forEach((p, i) => {
    occPal[i] = p.occluder ? 1 : 0
    aoOcc[i] = p.aoOcc ? 1 : 0
    if (p.selfCull) {
      const key = baseName(palette[i].name)
      let g = groupIds.get(key)
      if (g === undefined) { g = groupIds.size + 1; groupIds.set(key, g) }
      cullGroup[i] = g
    }
  })
  const swayPal = new Uint8Array(pal.length), leafPal = new Uint8Array(pal.length)
  palette.forEach((bs, i) => {
    const b = normalizeLegacy(baseName(bs.name), bs.properties)
    swayPal[i] = pal[i].air ? 2 : swaysWhole(b) ? 1 : 0
    leafPal[i] = isLeaves(b) ? 1 : 0
  })
  const emitters = findEmitters(model, pal)
  let light: Uint8Array | null = null, lightOpq: Uint8Array | null = null
  if (opts?.light) {
    const lp = lightPalette(palette, pal)
    light = computeLight(model.width, model.height, model.length, model.blocks, lp, emitters)
    lightOpq = lp.opaque
  }
  return { model, atlas, pal, occPal, aoOcc, cullGroup, swayPal, leafPal, useAO, fastLeaves, leafCount, emitters, light, lightOpq }
}

// Celdas con luz de todo el volumen, solo si alguna entrada de la paleta la da:
// casi ninguna build tiene tantas como para que importe, y sin ellas no se
// recorre nada. Mismo coste que countLeaves (~1 ns por celda).
function findEmitters(m: ModelInput, pal: PalRender[]): Uint32Array {
  const flag = new Uint8Array(pal.length)
  let any = false
  pal.forEach((p, i) => { if (p.light && !p.air) { flag[i] = 1; any = true } })
  if (!any) return new Uint32Array(0)
  const n = Math.min(m.blocks.length, m.width * m.height * m.length)
  let count = 0
  for (let i = 0; i < n; i++) count += flag[m.blocks[i]]
  const out = new Uint32Array(count)
  for (let i = 0, j = 0; i < n && j < count; i++) if (flag[m.blocks[i]]) out[j++] = i
  return out
}

/**
 * Luces puntuales para el corte (solo buildMeshRaw): los emisores se agrupan en celdas pequeñas
 * (lado ~4) para no generar miles de luces pero manteniéndolas pegadas a cada
 * emisor (así una antorcha sí ilumina el bloque de al lado). En builds enormes la
 * celda crece para acotar el total. Se queda con las más fuertes (más emisores y
 * mayor nivel), ya centradas en el origen.
 */
export function lightsFor(prep: MeshPrep, slice?: SliceRange): LightSample[] {
  const { width, height, length, blocks } = prep.model
  const cx = width / 2, cy = height / 2, cz = length / 2
  const lb = Math.max(4, Math.round(Math.max(width, height, length) / 30))
  const buckets = new Map<number, { sx: number; sy: number; sz: number; n: number; lvl: number; r: number; g: number; b: number }>()
  const WL = width * length
  for (let i = 0; i < prep.emitters.length; i++) {
    const cell = prep.emitters[i]
    const x = cell % width, z = Math.floor(cell / width) % length, y = Math.floor(cell / WL)
    if (slice && (x < slice.x[0] || x > slice.x[1] || y < slice.y[0] || y > slice.y[1] || z < slice.z[0] || z > slice.z[1])) continue
    const light = prep.pal[blocks[cell]].light!
    const key = (((x / lb) | 0) * 1024 + ((y / lb) | 0)) * 1024 + ((z / lb) | 0)
    let e = buckets.get(key)
    if (!e) { e = { sx: 0, sy: 0, sz: 0, n: 0, lvl: 0, r: 0, g: 0, b: 0 }; buckets.set(key, e) }
    e.sx += x; e.sy += y; e.sz += z; e.n++
    if (light.level > e.lvl) e.lvl = light.level
    e.r += light.r; e.g += light.g; e.b += light.b
  }
  const MAX_LIGHTS = 48
  const lights: LightSample[] = []
  for (const e of buckets.values()) {
    lights.push({
      x: e.sx / e.n - cx + 0.5, y: e.sy / e.n - cy + 0.5, z: e.sz / e.n - cz + 0.5,
      r: e.r / e.n, g: e.g / e.n, b: e.b / e.n, level: e.lvl, count: e.n,
    })
  }
  lights.sort((a, b) => b.count * b.level - a.count * a.level)
  return lights.slice(0, MAX_LIGHTS)
}

/** Si con hojas detalladas la capa opaca seguiría por debajo de MAX_QUADS (estimado). */
export function fancyLeavesFit(prep: MeshPrep, opaqueQuads: number): boolean {
  // Con hojas rápidas, si al pasarlas a detalladas la capa opaca se saldría del
  // tope y la build saldría recortada (la XL: 145k hojas sobre 7,4 M quads).
  return !prep.fastLeaves || opaqueQuads + prep.leafCount * FANCY_QUADS_PER_LEAF <= MAX_QUADS
}

export function buildMeshRaw(
  model: ModelInput,
  atlas: IAtlas | null,
  db: IModelDB | null,
  slice?: SliceRange,
  entityAtlas?: EntityAtlas | null,
  opts?: MeshOptions,
): RawGeometries {
  const prep = prepareMesh(model, atlas, db, entityAtlas, opts)
  const s: SliceRange = slice ?? { x: [0, model.width - 1], y: [0, model.height - 1], z: [0, model.length - 1] }
  const r = meshRegion(prep, s, s)
  return {
    opaque: r.geo[0],
    transparent: r.geo[1],
    entity: r.geo[2],
    emissive: r.geo[3],
    lights: lightsFor(prep, s),
    truncated: r.truncated,
    fastLeaves: prep.fastLeaves,
    fancyLeavesFit: fancyLeavesFit(prep, r.quads[0]),
  }
}

/** Capas de malla, en este orden en RegionMesh.geo/quads y en los desplazamientos por capa. */
export const MESH_KINDS = ['opaque', 'transparent', 'entity', 'emissive'] as const

export interface RegionOptions {
  /** Solo estas capas en Y (ordenadas), en vez de todas las de `box` (la tapa del corte). */
  layers?: readonly number[]
  /** Tope de quads por capa de malla (por defecto MAX_QUADS), para repartirlo entre trozos. */
  limits?: readonly number[]
  /** Constructores reutilizables (ver MeshScratch); si no, se crean nuevos. */
  scratch?: MeshScratch
  /** Sombra suave: la de MeshOptions si no se dice (la capa fantasma va sin ella). */
  ao?: boolean
  /** Luz por vértice: la de MeshOptions si no se dice (la capa fantasma va sin ella). */
  light?: boolean
}

export interface RegionMesh {
  /** opaco, translúcido, entidades y emisivo (MESH_KINDS); null si no hay nada. */
  geo: (RawBuffers | null)[]
  /**
   * Quad donde empieza cada capa en Y, por capa de malla: para la k-ésima,
   * layers[k * (n + 1) + i] con i = 0..n (n capas; la última entrada es el total).
   * El mallado va en orden y, z, x, así que las capas de cada búfer van seguidas
   * y un drawRange enseña cualquier rango de capas sin rehacer nada.
   */
  layers: Uint32Array
  quads: number[]
  truncated: boolean
}

/** Constructores que se reutilizan entre llamadas a meshRegion (en el worker, entre trozos). */
export class MeshScratch {
  readonly b = [new Builder(4096), new Builder(4096), new Builder(4096), new Builder(4096)]
}

/**
 * Malla las celdas de `box` (incluido) mirando como visibles los vecinos de `vis`:
 * un vecino fuera de `vis` ni tapa caras ni da sombra, así que con `vis` = el corte
 * se ven las caras cortadas. Los vecinos fuera de `box` pero dentro de `vis` sí
 * cuentan, y por eso un trozo sale sin costuras con los de al lado.
 */
export function meshRegion(prep: MeshPrep, box: SliceRange, vis: SliceRange, ro?: RegionOptions): RegionMesh {
  const { width, height, length, blocks } = prep.model
  const { pal, occPal, aoOcc, cullGroup, atlas } = prep
  // Para emit (ver allí): van aquí arriba porque emit se llama en el bucle de más abajo,
  // antes de donde se declara la función.
  const leafPal = prep.leafPal
  const qIn = {} as MeshQuad
  const useAO = ro?.ao ?? prep.useAO
  const bs = ro?.scratch?.b ?? [new Builder(), new Builder(), new Builder(), new Builder()]
  for (let k = 0; k < 4; k++) bs[k].reset(ro?.limits?.[k] ?? MAX_QUADS)
  const [solid, trans, entity, emissive] = bs
  const cx = width / 2, cy = height / 2, cz = length / 2
  const at = (x: number, y: number, z: number) => blocks[(y * length + z) * width + x]

  const xMin = Math.max(0, box.x[0]), xMax = Math.min(width - 1, box.x[1])
  const zMin = Math.max(0, box.z[0]), zMax = Math.min(length - 1, box.z[1])
  const ys: number[] = []
  if (ro?.layers) { for (const y of ro.layers) if (y >= 0 && y < height) ys.push(y) }
  else for (let y = Math.max(0, box.y[0]); y <= Math.min(height - 1, box.y[1]); y++) ys.push(y)
  const nl = ys.length
  const layerStart = new Uint32Array(4 * (nl + 1))
  // Lo visible: dentro del volumen y del corte. Un vecino fuera del corte ni tapa
  // caras ni da sombra (así se ve la cara cortada, y sin sombra de lo que no está).
  const vx0 = Math.max(0, vis.x[0]), vx1 = Math.min(width - 1, vis.x[1])
  const vy0 = Math.max(0, vis.y[0]), vy1 = Math.min(height - 1, vis.y[1])
  const vz0 = Math.max(0, vis.z[0]), vz1 = Math.min(length - 1, vis.z[1])

  // Sombra suave: vecinos de la celda en curso (27, memorizados por celda con un
  // sello `gen`, así cada vecino se mira una vez aunque lo usen varias caras) y
  // brillo de las 4 esquinas por dirección y capa (12 combinaciones, también por celda).
  let gen = 0, curX = 0, curY = 0, curZ = 0
  const nbGen = new Uint32Array(27), nbVal = new Uint8Array(27)
  const cornerGen = new Uint32Array(12), cornerVal = new Float32Array(48)
  const vf = new Float32Array(4)   // factor de sombra de los 4 vértices del quad en curso
  const occAt = (k: number): number => {
    if (nbGen[k] === gen) return nbVal[k]
    nbGen[k] = gen
    const nx = curX + NB_DX[k], ny = curY + NB_DY[k], nz = curZ + NB_DZ[k]
    const v = nx >= vx0 && nx <= vx1 && ny >= vy0 && ny <= vy1 && nz >= vz0 && nz <= vz1
      ? aoOcc[blocks[(ny * length + nz) * width + nx]] : 0
    nbVal[k] = v
    return v
  }
  const corners = (d: number, layer: number): number => {
    const slot = d * 2 + layer, o = slot * 4
    if (cornerGen[slot] === gen) return o
    cornerGen[slot] = gen
    const keys = AO_KEYS[slot]
    // La celda de delante solo cuenta en caras del borde: en una cara metida
    // hacia dentro esa celda es el propio bloque.
    const center = layer ? occAt(AO_CENTER[d]) : 0
    for (let c = 0; c < 4; c++) {
      const s1 = occAt(keys[c * 3]), s2 = occAt(keys[c * 3 + 1])
      const dg = s1 & s2 ? 1 : occAt(keys[c * 3 + 2])
      cornerVal[o + c] = 1 - AO_STEP * (center + s1 + s2 + dg)
    }
    return o
  }

  // Luz de la exhibición (MeshOptions.light). Como la sombra suave: la de las
  // vecinas de la celda en curso, memorizada por celda, y la de las 4 esquinas de
  // cada cara, que promedia las celdas que tocan la esquina por delante (la de
  // delante, los dos lados y la diagonal si algún lado la deja ver), sin las
  // macizas. Es el smooth lighting de vanilla. Fuera del volumen o del corte, cielo
  // abierto: así la cara que deja al aire un corte sale con luz de cielo.
  const lightOn = !!prep.light && (ro?.light ?? true)
  const lgt = prep.light, lopq = prep.lightOpq
  const lgGen = new Uint32Array(27), lgVal = new Int16Array(27)
  const lcGen = new Uint32Array(12), lcSky = new Float32Array(48), lcBlk = new Float32Array(48)
  const lb = new Uint8Array(16)   // lit de los 4 vértices del quad en curso
  const OPEN = 0xf0
  const lightAt = (k: number): number => {
    if (lgGen[k] === gen) return lgVal[k]
    lgGen[k] = gen
    const nx = curX + NB_DX[k], ny = curY + NB_DY[k], nz = curZ + NB_DZ[k]
    let v = OPEN
    if (nx >= vx0 && nx <= vx1 && ny >= vy0 && ny <= vy1 && nz >= vz0 && nz <= vz1) {
      const c = (ny * length + nz) * width + nx
      v = lopq![blocks[c]] ? -1 : lgt![c]
    }
    lgVal[k] = v
    return v
  }
  const lightCorners = (d: number, layer: number): number => {
    const slot = d * 2 + layer, o = slot * 4
    if (lcGen[slot] === gen) return o
    lcGen[slot] = gen
    const keys = AO_KEYS[slot]
    const cv = lightAt(layer ? AO_CENTER[d] : 13)
    for (let c = 0; c < 4; c++) {
      let s = 0, b = 0, n = 0
      if (cv >= 0) { s += cv >> 4; b += cv & 15; n++ }
      const v1 = lightAt(keys[c * 3]), v2 = lightAt(keys[c * 3 + 1])
      if (v1 >= 0) { s += v1 >> 4; b += v1 & 15; n++ }
      if (v2 >= 0) { s += v2 >> 4; b += v2 & 15; n++ }
      if (v1 >= 0 || v2 >= 0) { const v3 = lightAt(keys[c * 3 + 2]); if (v3 >= 0) { s += v3 >> 4; b += v3 & 15; n++ } }
      if (!n) { const v = flatLight(-1); s = v >> 4; b = v & 15; n = 1 }
      lcSky[o + c] = s / n; lcBlk[o + c] = b / n
    }
    return o
  }
  // Luz de una cara sin sombra suave: la celda de delante si la cara está en el
  // borde (lf impar) y no es maciza, o la propia; si la propia es maciza (un cubo
  // que da luz), la mejor de sus vecinas.
  function flatLight(lf: number): number {
    if (lf >= 0 && lf & 1) { const v = lightAt(AO_CENTER[lf >> 1]); if (v >= 0) return v }
    const v = lightAt(13)
    if (v >= 0) return v
    let s = 0, b = 0
    for (let d = 0; d < 6; d++) {
      const w = lightAt(AO_CENTER[d])
      if (w >= 0) { s = Math.max(s, w >> 4); b = Math.max(b, w & 15) }
    }
    return (s << 4) | b
  }
  // Lo que se mece entero (hojas, caña, enredaderas): los vértices que tocan algo
  // que no se mece (un muro, un cristal, un tronco, el suelo) se quedan quietos, así
  // la hoja no se mete en su vecino ni asoma por delante de él, y la base de la caña
  // se queda en el suelo. Se mira por la posición de la esquina (las celdas que la
  // tocan), no por la cara: todas las caras que comparten la esquina, de este bloque
  // y de los de al lado, deciden lo mismo y no se abren grietas. Va como una planta
  // con la punta a 0 (lw 1, sin vaivén).
  // Las celdas fuera del volumen o del corte en X/Z también cuentan como algo que no
  // se mece: ahí están los planos de recorte, y una esquina del borde que se meciera
  // hacia fuera cruzaría el plano y se recortaría (un hueco en la hoja del borde). En
  // Y no hace falta (el vaivén es solo horizontal y no cruza los planos de arriba y de
  // abajo), y así la copa de un árbol en la capa de arriba se sigue meciendo.
  const swayPal = prep.swayPal
  function anchored(q: MeshQuad, k: number): boolean {
    const px = curX + q.pos[k * 3], py = curY + q.pos[k * 3 + 1], pz = curZ + q.pos[k * 3 + 2]
    for (let i = 0; i < 8; i++) {
      const x = Math.floor(px + (i & 1 ? 1e-3 : -1e-3)), y = Math.floor(py + (i & 2 ? 1e-3 : -1e-3)), z = Math.floor(pz + (i & 4 ? 1e-3 : -1e-3))
      if (x < vx0 || x > vx1 || z < vz0 || z > vz1) return true
      if (y < vy0 || y > vy1) continue
      if (swayPal[at(x, y, z)] === 0) return true
    }
    return false
  }
  // Tipo de cara y vaivén de las plantas (ver LK_*): la punta se mece y la base no.
  function kindByte(q: MeshQuad, k: number): number {
    const base = q.lk ?? 0
    if (!q.lw) return (base & 3) === LK_LEAVES && anchored(q, k) ? base | (1 << 3) : base
    const w = (q.lw === 2 ? 1 : 0) + Math.min(1, Math.max(0, q.pos[k * 3 + 1]))
    return base | ((1 + Math.round(w * 15)) << 3)
  }
  function flatLit(q: MeshQuad, lf: number): void {
    const v = flatLight(lf)
    const s = ((v >> 4) * 17) | 0, b = ((v & 15) * 17) | 0
    for (let k = 0; k < 4; k++) {
      lb[k * 4] = b; lb[k * 4 + 1] = s; lb[k * 4 + 2] = 255; lb[k * 4 + 3] = kindByte(q, k)
    }
  }
  function smoothLit(q: MeshQuad, qa: QuadAO): void {
    const o = lightCorners(qa.d, qa.layer), pure = qa.pure
    for (let k = 0; k < 4; k++) {
      let s: number, b: number
      if (pure) { s = lcSky[o + pure[k]]; b = lcBlk[o + pure[k]] }
      else {
        const w = qa.w, j = k * 4
        s = w[j] * lcSky[o] + w[j + 1] * lcSky[o + 1] + w[j + 2] * lcSky[o + 2] + w[j + 3] * lcSky[o + 3]
        b = w[j] * lcBlk[o] + w[j + 1] * lcBlk[o + 1] + w[j + 2] * lcBlk[o + 2] + w[j + 3] * lcBlk[o + 3]
      }
      lb[k * 4] = (b * 17 + 0.5) | 0; lb[k * 4 + 1] = (s * 17 + 0.5) | 0
      lb[k * 4 + 2] = (vf[k] * 255 + 0.5) | 0; lb[k * 4 + 3] = kindByte(q, k)
    }
  }

  for (let li = 0; li < nl; li++) {
    const y = ys[li]
    layerStart[li] = solid.quads; layerStart[nl + 1 + li] = trans.quads
    layerStart[2 * (nl + 1) + li] = entity.quads; layerStart[3 * (nl + 1) + li] = emissive.quads
    for (let z = zMin; z <= zMax; z++) {
      for (let x = xMin; x <= xMax; x++) {
        const pi = at(x, y, z)
        const p = pal[pi]
        if (p.air) continue
        const ox = x - cx, oy = y - cy, oz = z - cz
        gen++; curX = x; curY = y; curZ = z
        // Agua de un bloque anegado (o de kelp/algas): va además de sus caras, y
        // no es del material del bloque (al resaltar las losas, su agua no).
        if (p.fluid) {
          const fp = p.solid.length || p.trans.length || p.entity?.length || p.emis?.length ? PAL_NONE : pi
          solid.pal = trans.pal = emissive.pal = fp
          emitFluid(p.fluid, x, y, z, ox, oy, oz, p.fluidCover)
        }
        solid.pal = trans.pal = entity.pal = emissive.pal = pi
        const grp = cullGroup[pi]
        emit(p.solid, solid, x, y, z, ox, oy, oz, grp, useAO)
        emit(p.trans, trans, x, y, z, ox, oy, oz, grp, useAO)
        // Entidades y emisores sin sombra suave, como en vanilla (las block
        // entities no la llevan y lo que da luz se pinta con luz plana).
        if (p.entity) emit(p.entity, entity, x, y, z, ox, oy, oz, grp, false)
        if (p.emis) emit(p.emis, emissive, x, y, z, ox, oy, oz, grp, false)
      }
    }
  }
  layerStart[nl] = solid.quads; layerStart[2 * nl + 1] = trans.quads
  layerStart[3 * nl + 2] = entity.quads; layerStart[4 * nl + 3] = emissive.quads

  // Vecino visible (dentro de límites y del corte), o null si hay que dibujar la cara.
  function fluidNeighbor(nx: number, ny: number, nz: number): PalRender | null {
    if (nx < vx0 || nx > vx1 || ny < vy0 || ny > vy1 || nz < vz0 || nz > vz1) return null
    return pal[at(nx, ny, nz)]
  }

  // Altura (px 0-16) de una esquina de la tapa: promedia las celdas de fluido que
  // tocan la esquina (la fuente pesa más). Dos celdas que comparten una arista dan
  // la misma altura -> las superficies se unen sin escalones ni huecos.
  // cov: lo que tapa de cada cara el bloque anegado de la celda (selfCover).
  function emitFluid(fi: FluidInfo, x: number, y: number, z: number, ox: number, oy: number, oz: number, cov?: Uint16Array) {
    if (!atlas) return
    // La lava va a la malla emisiva (solo brilla en showcase); el bake es normal.
    const bld = fi.family === 'lava' ? emissive : (fi.translucent ? trans : solid)
    const rect = atlas.uv(fi.tileIdx)
    const cr = fi.tint ? fi.tint[0] : 1, cg = fi.tint ? fi.tint[1] : 1, cb = fi.tint ? fi.tint[2] : 1
    const aboveSame = (() => { const a = fluidNeighbor(x, y + 1, z); return !!a?.fluid && a.fluid.family === fi.family })()

    // Alturas de las 4 esquinas (px). hXZ: X=0|16 (oeste/este), Z=0|16 (norte/sur).
    const corner = (dx: number, dz: number) => aboveSame ? 16 : cornerH(x, y, z, dx, dz, fi)
    let h00 = corner(-1, -1), h10 = corner(1, -1), h01 = corner(-1, 1), h11 = corner(1, 1)

    // Empuja una cara: pos en px (4 vértices [x,y,z] seguidos), uv en px del tile, d
    // (como NEIGHBOR) para el sombreado.
    const lk = fi.family === 'lava' ? LK_LAVA : LK_WATER
    const face = (pos: number[], uvtile: number[], d: number) => {
      const bn = NEIGHBOR[d]
      const sh = shadeFor(bn[0], bn[1], bn[2])
      for (let i = 0; i < 12; i++) pos[i] /= 16
      const q: MeshQuad = { pos, uv: mapUv(uvtile, rect), r: cr * sh, g: cg * sh, b: cb * sh, cull: -1, ao: undefined, lk }
      // Luz de la celda de delante, también en la tapa (la de encima): la del agua
      // ya ha perdido algo al entrar.
      if (lightOn) flatLit(q, d * 2 + 1)
      bld.add(q, ox, oy, oz, null, lightOn ? lb : null)
    }

    const occ = (nx: number, ny: number, nz: number) => fluidNeighbor(nx, ny, nz)?.occluder
    const sameFluid = (nx: number, ny: number, nz: number) => { const p = fluidNeighbor(nx, ny, nz); return !!p?.fluid && p.fluid.family === fi.family }

    // Todas las caras van metidas FLUID_INSET hacia dentro, como en vanilla
    // (LiquidBlockRenderer), y sin lo que tapa el bloque anegado (selfCover): antes
    // caían en el mismo plano que sus caras y el agua, translúcida y pintada después,
    // las teñía de azul (fondo de las losas, trasera de las escaleras...). La tapa y
    // el fondo se meten solo si se dibujan (si no, entre dos celdas de agua quedaría
    // una rendija); con la tapa bajan también los bordes de arriba de los laterales.
    //
    // Tapa (esquinas a distinta altura -> superficie continua/inclinada). Sobra si el
    // propio bloque tapa entera su cara de arriba (losa de arriba).
    if (!aboveSame && !occ(x, y + 1, z) && !(cov && coversAll(cov, 2))) {
      h00 -= FLUID_INSET; h10 -= FLUID_INSET; h01 -= FLUID_INSET; h11 -= FLUID_INSET
      face([0, h01, 16, 16, h11, 16, 16, h10, 0, 0, h00, 0], [0, 16, 16, 16, 16, 0, 0, 0], 2)
    }
    // Fondo: solo lo que el bloque anegado deja al aire.
    const down = !occ(x, y - 1, z) && !sameFluid(x, y - 1, z)
    const yb = down ? FLUID_INSET : 0
    if (down) {
      const r = freeRects(cov, 3, 16)
      for (let i = 0; i < r.length; i += 4) {
        const u0 = r[i], u1 = r[i + 1], v0 = r[i + 2], v1 = r[i + 3]
        face([u0, yb, v0, u1, yb, v0, u1, yb, v1, u0, yb, v1], [u0, v0, u1, v0, u1, v1, u0, v1], 3)
      }
    }
    // Laterales: el borde de arriba va de la altura de una esquina a la de la otra
    // (hL a la izquierda mirando la cara desde fuera, hR a la derecha), y la uv se
    // recorta a esa altura. Se ocultan contra sólido o el mismo fluido.
    const side = (d: number, hL: number, hR: number) => {
      const r = freeRects(cov, d, Math.max(hL, hR))
      for (let i = 0; i < r.length; i += 4) {
        const u0 = r[i], u1 = r[i + 1], v0 = Math.max(r[i + 2], yb), v1 = r[i + 3]
        // Arriba, la superficie; o el borde del hueco si queda por debajo.
        const t0 = Math.max(v0, Math.min(v1, hL + (hR - hL) * u0 / 16))
        const t1 = Math.max(v0, Math.min(v1, hL + (hR - hL) * u1 / 16))
        if (t0 <= v0 && t1 <= v0) continue
        const pos: number[] = []
        sideXYZ(d, u0, v0, pos); sideXYZ(d, u1, v0, pos); sideXYZ(d, u1, t1, pos); sideXYZ(d, u0, t0, pos)
        face(pos, [u0, 16 - v0, u1, 16 - v0, u1, 16 - t1, u0, 16 - t0], d)
      }
    }
    if (!occ(x + 1, y, z) && !sameFluid(x + 1, y, z)) side(0, h11, h10)   // este (+X)
    if (!occ(x - 1, y, z) && !sameFluid(x - 1, y, z)) side(1, h00, h01)   // oeste (-X)
    if (!occ(x, y, z + 1) && !sameFluid(x, y, z + 1)) side(4, h01, h11)   // sur (+Z)
    if (!occ(x, y, z - 1) && !sameFluid(x, y, z - 1)) side(5, h10, h00)   // norte (-Z)
  }
  function cornerH(x: number, y: number, z: number, dx: number, dz: number, fi: FluidInfo): number {
    let total = 0, weight = 0
    for (const [ax, az] of [[0, 0], [dx, 0], [0, dz], [dx, dz]]) {
      const np = fluidNeighbor(x + ax, y, z + az)
      if (!np?.fluid || np.fluid.family !== fi.family) continue
      const up = fluidNeighbor(x + ax, y + 1, z + az)
      if (up?.fluid && up.fluid.family === fi.family) return 16
      const fh = np.fluid.heightPx
      if (fh >= 14) { total += fh * 10; weight += 10 } else { total += fh; weight += 1 }
    }
    return weight === 0 ? fi.heightPx : total / weight
  }

  // Hojas detalladas en la exhibición: la cara que da a otra hoja va con la copia
  // opaca de la textura. Se ve por los huecos de la de delante, casi siempre muy de
  // canto, y con sus propios huecos salía a franjas (el recorte por alfa a ras, que
  // con las sombras y la luz de la exhibición se marcaba mucho más). Fuera de la
  // exhibición (sin luz) la malla es la de siempre: las miniaturas no cambian.
  function emit(quads: MeshQuad[], b: Builder, x: number, y: number, z: number, ox: number, oy: number, oz: number, grp: number, ao: boolean) {
    for (let q of quads) {
      if (q.cull >= 0) {
        const d = NEIGHBOR[q.cull]
        const nx = x + d[0], ny = y + d[1], nz = z + d[2]
        if (nx >= vx0 && nx <= vx1 && ny >= vy0 && ny <= vy1 && nz >= vz0 && nz <= vz1) {
          const nb = at(nx, ny, nz)
          if (occPal[nb]) continue
          if (grp !== 0 && cullGroup[nb] === grp) continue   // cristal contra el mismo cristal
          if (q.uvIn && lightOn && leafPal[nb]) { Object.assign(qIn, q); qIn.uv = q.uvIn; q = qIn }
        }
      }
      const qa = ao ? q.ao : undefined
      if (!qa) {
        if (lightOn) flatLit(q, q.lf ?? -1)
        b.add(q, ox, oy, oz, null, lightOn ? lb : null)
        continue
      }
      const o = corners(qa.d, qa.layer), pure = qa.pure
      if (pure) {
        vf[0] = cornerVal[o + pure[0]]; vf[1] = cornerVal[o + pure[1]]
        vf[2] = cornerVal[o + pure[2]]; vf[3] = cornerVal[o + pure[3]]
      } else {
        const w = qa.w
        const c0 = cornerVal[o], c1 = cornerVal[o + 1], c2 = cornerVal[o + 2], c3 = cornerVal[o + 3]
        for (let k = 0; k < 4; k++) {
          const j = k * 4
          vf[k] = w[j] * c0 + w[j + 1] * c1 + w[j + 2] * c2 + w[j + 3] * c3
        }
      }
      if (lightOn) smoothLit(q, qa)
      b.add(q, ox, oy, oz, vf, lightOn ? lb : null)
    }
  }

  return {
    geo: bs.map((b) => b.raw()),
    layers: layerStart,
    quads: bs.map((b) => b.quads),
    truncated: solid.truncated || trans.truncated || entity.truncated || emissive.truncated,
  }
}

export function buildMesh(
  model: ModelInput,
  atlas: IAtlas | null,
  db: IModelDB | null,
  slice?: SliceRange,
  entityAtlas?: EntityAtlas | null,
  opts?: MeshOptions,
): MeshGeometries {
  const raw = buildMeshRaw(model, atlas, db, slice, entityAtlas, opts)
  return {
    opaque: rawToGeometry(raw.opaque),
    transparent: rawToGeometry(raw.transparent),
    entity: rawToGeometry(raw.entity),
    emissive: rawToGeometry(raw.emissive),
    lights: raw.lights,
  }
}

function rawToGeometry(b: RawBuffers | null): THREE.BufferGeometry | null {
  if (!b) return null
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(b.pos, 3))
  g.setAttribute('uv', new THREE.Float32BufferAttribute(b.uv, 2))
  g.setAttribute('color', new THREE.Uint8BufferAttribute(b.col, 3, true))
  const vc = b.pos.length / 3
  g.setIndex(vc > 65535 ? new THREE.Uint32BufferAttribute(b.idx, 1) : new THREE.Uint16BufferAttribute(b.idx, 1))
  return g
}

export function rawBuffersToGeometry(b: RawBuffers): THREE.BufferGeometry {
  return rawToGeometry(b)!
}

// ── Precálculo por entrada de paleta ─────────────────────────────────────────────
function buildPalRender(bs: BlockState, atlas: IAtlas | null, db: IModelDB | null, textured: boolean, entityAtlas: EntityAtlas | null, ctx: PalCtx): PalRender {
  if (isAir(bs.name)) return { air: true, occluder: false, solid: [], trans: [] }
  const r = palRenderOf(bs, atlas, db, textured, entityAtlas, ctx)
  // Anegado: agua de fuente en la misma celda, además del bloque. Kelp y algas
  // siempre están bajo el agua aunque no lleven `waterlogged`. Sin esto el agua de
  // alrededor dibujaba "paredes" contra ellos (no veía agua al lado) y la celda se
  // quedaba sin superficie.
  if (!r.fluid && atlas && isUnderwater(bs)) {
    const fl = waterSource(atlas)
    if (fl) {
      r.fluid = fl; r.air = false
      if (!waterShowsThrough(baseName(bs.name), ctx.fastLeaves)) {
        r.fluidCover = selfCover(r.emis ? r.solid.concat(r.emis) : r.solid) ?? undefined
      }
    }
  }
  return r
}

// Anegados con huecos en la textura de caras enteras (en vanilla, noOcclusion: no
// tapan su propia agua). El agua se ve por los huecos, así que no se recorta: le
// basta con ir metida FLUID_INSET (trampillas, hojas detalladas, rejillas de cobre,
// raíces de mangle, andamio y barrotes).
function waterShowsThrough(base: string, fastLeaves: boolean): boolean {
  return base.endsWith('trapdoor') || (isLeaves(base) && !fastLeaves) || base.endsWith('copper_grate') ||
    base === 'mangrove_roots' || base === 'scaffolding' || base.endsWith('_bars')
}

// Lo que el agua de un fluido se mete hacia dentro de su celda (px): 0.001 bloques, como vanilla.
const FLUID_INSET = 0.016
const FULL_RECT: readonly number[] = [0, 16, 0, 16]

// Punto (u, v) de una cara lateral del fluido, en px de la celda: u de izquierda a
// derecha mirando la cara desde fuera, v la altura. Ya metido FLUID_INSET.
function sideXYZ(d: number, u: number, v: number, out: number[]): void {
  switch (d) {
    case 0: out.push(16 - FLUID_INSET, v, 16 - u); break   // este
    case 1: out.push(FLUID_INSET, v, u); break             // oeste
    case 4: out.push(u, v, 16 - FLUID_INSET); break        // sur
    default: out.push(16 - u, v, FLUID_INSET)              // norte
  }
}
// Lo mismo al revés, para cualquier cara (en arriba y abajo, u = x y v = z).
function faceUV(d: number, x: number, y: number, z: number): [number, number] {
  switch (d) {
    case 0: return [16 - z, y]
    case 1: return [z, y]
    case 4: return [x, y]
    case 5: return [16 - x, y]
    default: return [x, z]
  }
}

// Qué tapa el propio bloque de cada cara de su celda (vanilla: isFaceOccludedBySelf),
// en una rejilla de 16x16 px por dirección: 6 x 16 filas (v) de 16 bits (u), en
// las mismas u/v que emitFluid. Solo cuentan los quads pegados al borde, hacia
// fuera y alineados con los ejes. null si no tapa nada. Va por entrada de paleta.
function selfCover(quads: MeshQuad[]): Uint16Array | null {
  let cov: Uint16Array | null = null
  const us = [0, 0, 0, 0], vs = [0, 0, 0, 0]
  const near = (a: number, b: number) => Math.abs(a - b) < 1e-3
  for (const q of quads) {
    const p = q.pos
    const e1x = p[3] - p[0], e1y = p[4] - p[1], e1z = p[5] - p[2]
    const e2x = p[9] - p[0], e2y = p[10] - p[1], e2z = p[11] - p[2]
    const nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x
    const ax = Math.abs(nx) >= Math.abs(ny) && Math.abs(nx) >= Math.abs(nz) ? 0 : Math.abs(ny) >= Math.abs(nz) ? 1 : 2
    const n = ax === 0 ? nx : ax === 1 ? ny : nz
    if (n === 0) continue
    const d = ax * 2 + (n > 0 ? 0 : 1), edge = n > 0 ? 1 : 0
    let ok = true
    for (let k = 0; k < 4 && ok; k++) {
      if (Math.abs(p[k * 3 + ax] - edge) > 1e-4) { ok = false; break }
      const uv = faceUV(d, p[k * 3] * 16, p[k * 3 + 1] * 16, p[k * 3 + 2] * 16)
      us[k] = uv[0]; vs[k] = uv[1]
    }
    if (!ok) continue
    const u0 = Math.min(...us), u1 = Math.max(...us), v0 = Math.min(...vs), v1 = Math.max(...vs)
    // Alineado con los ejes: cada vértice en una esquina del rectángulo.
    for (let k = 0; k < 4 && ok; k++) {
      if (!(near(us[k], u0) || near(us[k], u1)) || !(near(vs[k], v0) || near(vs[k], v1))) ok = false
    }
    if (!ok) continue
    // Solo los píxeles enteros que tapa (mejor algo de agua de más que un hueco).
    const c0 = Math.max(0, Math.ceil(u0 - 1e-3)), c1 = Math.min(16, Math.floor(u1 + 1e-3))
    const r0 = Math.max(0, Math.ceil(v0 - 1e-3)), r1 = Math.min(16, Math.floor(v1 + 1e-3))
    if (c1 <= c0 || r1 <= r0) continue
    const bits = ((1 << c1) - 1) & ~((1 << c0) - 1)
    cov ??= new Uint16Array(96)
    for (let r = r0; r < r1; r++) cov[d * 16 + r] |= bits
  }
  return cov
}
function coversAll(cov: Uint16Array, d: number): boolean {
  for (let r = 0; r < 16; r++) if (cov[d * 16 + r] !== 0xffff) return false
  return true
}
// Huecos que deja libres el bloque en la cara d, en rectángulos [u0,u1,v0,v1] (px)
// seguidos, de la fila 0 hasta vMax: une las filas seguidas con los mismos huecos.
// Sin cobertura, la cara entera.
function freeRects(cov: Uint16Array | undefined, d: number, vMax: number): readonly number[] {
  if (!cov) return FULL_RECT
  const out: number[] = []
  const rows = Math.min(16, Math.ceil(vMax - 1e-4))
  let open: number[] = []   // [u0, u1, v0] de los huecos de la fila anterior
  let prev = -1
  for (let v = 0; v <= rows; v++) {
    const free = v < rows ? ~cov[d * 16 + v] & 0xffff : -1
    if (free === prev) continue
    for (let i = 0; i < open.length; i += 3) out.push(open[i], open[i + 1], open[i + 2], v)
    open = []
    for (let u = 0; v < rows && u < 16;) {
      if (!((free >> u) & 1)) { u++; continue }
      const u0 = u
      while (u < 16 && (free >> u) & 1) u++
      open.push(u0, u, v)
    }
    prev = free
  }
  return out
}

const ALWAYS_UNDERWATER = new Set(['kelp', 'kelp_plant', 'seagrass', 'tall_seagrass'])
function isUnderwater(bs: BlockState): boolean {
  return bs.properties?.waterlogged === 'true' || ALWAYS_UNDERWATER.has(baseName(bs.name))
}
function waterSource(atlas: IAtlas): FluidInfo | null {
  const tileIdx = atlas.tileIndex('water_still')
  if (tileIdx === undefined) return null
  return { family: 'water', tileIdx, tint: WATER, translucent: true, heightPx: fluidHeightPx(0) }
}

function palRenderOf(bs: BlockState, atlas: IAtlas | null, db: IModelDB | null, textured: boolean, entityAtlas: EntityAtlas | null, ctx: PalCtx): PalRender {
  const bn = baseName(bs.name)

  // Bloque de luz (minecraft:light): INVISIBLE en el juego, solo es fuente de luz.
  // No se dibuja NADA (nada de textura azul); se aplica su nivel (propiedad `level`
  // 0-15) como luz blanca para el showcase.
  if (bn === 'light') {
    const lvl = parseInt(bs.properties?.level ?? '15', 10) || 0
    return { air: false, occluder: false, solid: [], trans: [], light: lvl > 0 ? { level: lvl, r: 1.0, g: 0.97, b: 0.88 } : undefined }
  }

  // Barrera y vacío de estructura: invisibles en el juego (solo se ven con el ítem
  // en la mano). Antes salían como cubos macizos de un color al azar, porque su
  // modelo está vacío y caían al cubo de color plano.
  if (bn === 'barrier' || bn === 'structure_void') return { air: true, occluder: false, solid: [], trans: [] }

  // Block entities con geometría y textura propias (cofres, shulkers, cabezas…)
  if (entityAtlas && isBlockEntity(bs.name)) {
    const entity = buildBlockEntity(bs, entityAtlas)
    if (entity) return { air: false, occluder: false, solid: [], trans: [], entity }
  }

  // Fluidos: altura por `level` (resueltos en el bucle, ver emitFluid).
  const family = atlas ? fluidFamily(bn) : null
  if (atlas && family) {
    const tileIdx = atlas.tileIndex(family === 'lava' ? 'lava_still' : 'water_still')
    if (tileIdx !== undefined) {
      const full = bn === 'bubble_column'
      const lvl = full ? 8 : (parseInt(bs.properties?.level ?? '0', 10) || 0)
      return {
        air: false, occluder: false, solid: [], trans: [],
        fluid: { family, tileIdx, tint: family === 'water' ? WATER : null, translucent: family === 'water', heightPx: fluidHeightPx(lvl) },
        light: family === 'lava' ? { level: 15, ...lightColor('lava') } : undefined,
      }
    }
  }

  // Bloques que emiten luz: sus caras se separan a la malla emisiva (bake normal).
  // El brillo se aplica solo en el modo exhibición (showcase.ts); en modo normal la
  // malla emisiva usa el material opaco y se ve igual que antes.
  const level = lightLevel(bs.name, bs.properties)
  const light = level > 0 ? { level, ...lightColor(bs.name) } : undefined
  // Lo que da tan poca luz que en su textura no hay nada que brille (el soporte
  // para pociones, el champiñón): sigue siendo fuente de luz, pero no va a la malla
  // emisiva, que en la exhibición hacía brillar entero todo lo claro de la textura.
  const emissive = level > 0 && !NO_GLOW.has(bn)
  // Emisores parciales: solo brilla una textura, no todo el bloque. La antorcha del
  // repetidor y del comparador, la boca de los hornos encendidos y la cara de la
  // calabaza (los laterales de piedra y la corteza brillaban en blanco).
  const emissiveTile = emissive ? EMISSIVE_TILE[bn] : undefined

  // End portal / end gateway: en vanilla son render especial (modelo vacío). Los
  // pintamos con la textura de campo de estrellas: el portal como superficie plana
  // a 0.75 y el gateway como cubo. Emisivos (el portal es fuente de luz).
  if (atlas && (bn === 'end_portal' || bn === 'end_gateway')) {
    const r = endPortalRender(bn, atlas, emissive)
    if (r) { r.light = light; return r }
  }

  if (textured && db && atlas) {
    try {
      const parts = db.resolve(bs.name, bs.properties)
      if (parts && parts.length) {
        const r = fromModel(bs, parts, atlas, ctx, emissive, emissiveTile)
        if (r.solid.length || r.trans.length || r.emis?.length) { r.light = light; return r }
      }
    } catch {
      // un bloque problemático no debe romper toda la malla: cae a cubo
    }
  }
  const r = cubeRender(bs, atlas, textured, ctx, emissive) // fallback: cubo texturado o color plano
  r.light = light
  return r
}

// Índice de dirección (como NEIGHBOR) -> nombre de cara del modelo.
const DIR_NAME = ['east', 'west', 'up', 'down', 'south', 'north']

// UV por defecto de una cara de la caja [f,t] (0-16), la que vanilla pone cuando
// el modelo no trae `uv` (BlockElement.uvsByFace).
function defaultUv(dir: string, f: number[], t: number[]): number[] {
  switch (dir) {
    case 'down': return [f[0], 16 - t[2], t[0], 16 - f[2]]
    case 'up': return [f[0], f[2], t[0], t[2]]
    case 'south': return [f[0], 16 - t[1], t[0], 16 - f[1]]
    case 'west': return [f[2], 16 - t[1], t[2], 16 - f[1]]
    case 'east': return [16 - t[2], 16 - t[1], 16 - f[2], 16 - f[1]]
    default: return [16 - t[0], 16 - t[1], 16 - f[0], 16 - f[1]] // north
  }
}
function sameUv(a: number[], b: number[]): boolean {
  for (let i = 0; i < 4; i++) if (Math.abs(a[i] - b[i]) > 0.01) return false
  return true
}
const round4 = (v: number) => Math.round(v * 1e4) / 1e4

// emissiveTile: si se pasa, solo emiten las caras cuya textura termina en ese nombre
// (emisión parcial, p.ej. la antorcha del repetidor); si no, emite todo el bloque.
function fromModel(bs: BlockState, parts: ResolvedPart[], atlas: IAtlas, ctx: PalCtx, emissive = false, emissiveTile?: string): PalRender {
  const base = baseName(bs.name)
  const translucent = isTranslucent(bs.name)
  const tint = tintFor(bs.name, bs.properties)
  const flat = getBlockColor(bs.name, bs.properties)
  // Hojas rápidas: la copia opaca de su textura (la añade el atlas al cargar) y
  // tapan como un bloque macizo. Si el atlas no la tiene, tapan igual pero con
  // huecos (como se veían antes de la Fase 2).
  const opaqueLeaf = ctx.fastLeaves && isLeaves(base)
  const useAO = ctx.ao && !noAmbientOcclusion(base)
  const sway = plantSway(base, bs.properties), whole = swaysWhole(base)
  const solid: MeshQuad[] = []
  const trans: MeshQuad[] = []
  const emis: MeshQuad[] = []
  let fullCube = false

  const n = new THREE.Vector3()
  const v = new THREE.Vector3()
  const a = new THREE.Vector3()

  for (const part of parts) {
    const bsM = blockstateMatrix(part.x, part.y)
    // uvlock: al girar el bloque, la textura se queda fija al mundo en vez de girar
    // con él (escaleras, vallas, muros, setas...). Se aplica en las caras con la UV
    // por defecto de su caja y sin rotación de UV ni de elemento: ahí basta con
    // volver a calcular esa UV sobre la caja ya girada (giros de 90°, sigue siendo
    // una caja). Las caras con UV a medida (~10 %: partes de vallas, muros,
    // puertas de valla y botones) siguen girando con el modelo, como antes.
    const lock = part.uvlock && (part.x !== 0 || part.y !== 0)
    for (const el of part.model.elements) {
      if (el.from[0] === 0 && el.from[1] === 0 && el.from[2] === 0 && el.to[0] === 16 && el.to[1] === 16 && el.to[2] === 16) fullCube = true
      const M = bsM.clone().multiply(elementMatrix(el))
      const rot = new THREE.Matrix4().extractRotation(M)

      let lf: number[] | null = null, lt: number[] | null = null
      if (lock && !el.rotation) {
        a.set(el.from[0], el.from[1], el.from[2]).applyMatrix4(bsM)
        v.set(el.to[0], el.to[1], el.to[2]).applyMatrix4(bsM)
        lf = [round4(Math.min(a.x, v.x)), round4(Math.min(a.y, v.y)), round4(Math.min(a.z, v.z))]
        lt = [round4(Math.max(a.x, v.x)), round4(Math.max(a.y, v.y)), round4(Math.max(a.z, v.z))]
      }

      for (const dir in el.faces) {
        const face = el.faces[dir]
        let tileIdx = atlas.tileIndex(face.tile)
        // Hojas detalladas: la copia opaca, para las caras entre hojas (ver emit).
        let uvIn: number[] | undefined
        const opq = isLeaves(base) ? atlas.tileIndex(face.tile + OPAQUE_LEAF_SUFFIX) : undefined
        if (opaqueLeaf) {
          if (opq !== undefined) tileIdx = opq
        }
        const rect: UVRect = tileIdx !== undefined ? atlas.uv(tileIdx) : atlas.uv(atlas.whiteIndex)
        const baseR = tileIdx !== undefined ? (face.tint ? tint[0] : 1) : flat.r / 255
        const baseG = tileIdx !== undefined ? (face.tint ? tint[1] : 1) : flat.g / 255
        const baseB = tileIdx !== undefined ? (face.tint ? tint[2] : 1) : flat.b / 255

        // normal final -> sombra + dirección de cull
        const bn = DIR_NORMAL[dir] ?? [0, 1, 0]
        n.set(bn[0], bn[1], bn[2]).applyMatrix4(rot).normalize()
        const di = dirIndexFromNormal(n)

        let pos: number[]
        let uv16: number[]
        if (lf && lt && face.rot === 0 && sameUv(face.uv, defaultUv(dir, el.from, el.to))) {
          const nd = DIR_NAME[di]
          const q = faceQuad(nd, lf, lt, defaultUv(nd, lf, lt))
          pos = q.pos.map((c) => c / 16)
          uv16 = q.uv
        } else {
          const q = faceQuad(dir, el.from, el.to, face.uv)
          // posiciones: aplicar M y escalar a [0,1]
          pos = []
          for (let k = 0; k < 4; k++) {
            v.set(q.pos[k * 3], q.pos[k * 3 + 1], q.pos[k * 3 + 2]).applyMatrix4(M).multiplyScalar(1 / 16)
            pos.push(v.x, v.y, v.z)
          }
          uv16 = rotateUv(q.uv, face.rot)
        }
        const shade = el.shade ? shadeFor(n.x, n.y, n.z) : 1 // bake siempre normal
        const cull = face.cull ? dirIndexFromNormal(n.clone().set(DIR_NORMAL[face.cull][0], DIR_NORMAL[face.cull][1], DIR_NORMAL[face.cull][2]).applyMatrix4(rot)) : -1

        const faceEmis = emissiveTile ? face.tile.endsWith(emissiveTile) : emissive
        // Sombra suave en todo menos lo que da luz, los elementos sin sombreado
        // (plantas en cruz, algas) y los modelos que en vanilla la apagan (NO_AO).
        const ao = useAO && el.shade && !faceEmis ? quadAO(pos, di) : undefined
        const quad: MeshQuad = {
          pos, uv: mapUv(uv16, rect), r: baseR * shade, g: baseG * shade, b: baseB * shade, cull, ao,
          lf: di * 2 + (onEdgeOf(pos, di) ? 1 : 0), lk: (whole || sway ? LK_LEAVES : 0) | (el.shade ? 0 : LK_NOSHADE), lw: sway,
        }
        if (!opaqueLeaf && opq !== undefined) uvIn = mapUv(uv16, atlas.uv(opq))
        if (uvIn) quad.uvIn = uvIn
        ;(faceEmis ? emis : translucent ? trans : solid).push(quad)
      }
    }
  }
  return {
    air: false,
    occluder: fullCube && !translucent && (opaqueLeaf || !isNonOccluding(base)),
    aoOcc: fullCube && aoOccluderOk(base),
    selfCull: selfCulls(base),
    solid, trans, emis: emis.length ? emis : undefined,
  }
}

// Cubo completo (fallback): textura por cara via getFaceInfo, o color plano.
function cubeRender(bs: BlockState, atlas: IAtlas | null, textured: boolean, ctx: PalCtx, emissive = false): PalRender {
  const base = normalizeLegacy(baseName(bs.name), bs.properties)
  const flat = getBlockColor(bs.name, bs.properties)
  const fr = flat.r / 255, fg = flat.g / 255, fb = flat.b / 255
  const info = textured ? getFaceInfo(bs.name, bs.properties) : null
  const translucent = flat.transparent || (info?.transparent ?? false)
  const opaqueLeaf = ctx.fastLeaves && isLeaves(base)
  // dirs en el mismo orden que getFaceInfo.tiles: [+X,-X,+Y,-Y,+Z,-Z]
  const dirs = ['east', 'west', 'up', 'down', 'south', 'north']
  const quads: MeshQuad[] = []

  dirs.forEach((dir, di) => {
    let r = fr, g = fg, b = fb
    let rect: UVRect = atlas ? atlas.uv(atlas.whiteIndex) : [0, 0, 0, 0]
    if (info && atlas) {
      const ti = (opaqueLeaf ? atlas.tileIndex(info.tiles[di] + OPAQUE_LEAF_SUFFIX) : undefined) ?? atlas.tileIndex(info.tiles[di])
      if (ti !== undefined) {
        rect = atlas.uv(ti)
        const t = info.tints[di]
        r = t ? t[0] : 1; g = t ? t[1] : 1; b = t ? t[2] : 1
      }
    }
    const q = faceQuad(dir, [0, 0, 0], [16, 16, 16], [0, 0, 16, 16])
    const bn = DIR_NORMAL[dir]
    const shade = shadeFor(bn[0], bn[1], bn[2]) // bake siempre normal
    const pos = q.pos.map((c) => c / 16)
    const ao = ctx.ao && !emissive ? quadAO(pos, di) : undefined
    const quad: MeshQuad = { pos, uv: mapUv(q.uv, rect), r: r * shade, g: g * shade, b: b * shade, cull: di, ao, lf: di * 2 + 1, lk: swaysWhole(base) ? LK_LEAVES : 0 }
    if (info && atlas && !opaqueLeaf && isLeaves(base)) {
      const o = atlas.tileIndex(info.tiles[di] + OPAQUE_LEAF_SUFFIX)
      if (o !== undefined) quad.uvIn = mapUv(q.uv, atlas.uv(o))
    }
    quads.push(quad)
  })

  const occluder = !translucent && (opaqueLeaf || !isNonOccluding(base))
  const common = { air: false, occluder, aoOcc: !translucent && aoOccluderOk(base), selfCull: selfCulls(base) }
  if (emissive) return { ...common, solid: [], trans: [], emis: quads }
  return { ...common, solid: translucent ? [] : quads, trans: translucent ? quads : [] }
}

// End portal (superficie plana a 0.75) / end gateway (cubo), con la textura
// `end_portal` (campo de estrellas). Devuelve null si la textura no está en el atlas.
function endPortalRender(bn: string, atlas: IAtlas, emissive: boolean): PalRender | null {
  const ti = atlas.tileIndex('end_portal')
  if (ti === undefined) return null
  const rect = atlas.uv(ti)
  const quads: MeshQuad[] = []
  const addFace = (dir: string, from: number[], to: number[]) => {
    const q = faceQuad(dir, from, to, [0, 0, 16, 16])
    quads.push({ pos: q.pos.map((c) => c / 16), uv: mapUv(q.uv, rect), r: 1, g: 1, b: 1, cull: -1, ao: undefined })
  }
  if (bn === 'end_portal') {
    addFace('up', [0, 12, 0], [16, 12, 16])      // superficie plana a 0.75, visible por ambas caras
    addFace('down', [0, 12, 0], [16, 12, 16])
  } else {
    for (const d of ['east', 'west', 'up', 'down', 'south', 'north']) addFace(d, [0, 0, 0], [16, 16, 16])
  }
  return emissive
    ? { air: false, occluder: false, solid: [], trans: [], emis: quads }
    : { air: false, occluder: false, solid: quads, trans: [] }
}

// uv en 0-16 -> uv del atlas (rect [u0,v0,u1,v1], v0 arriba)
function mapUv(uv16: number[], rect: UVRect): number[] {
  const [u0, v0, u1, v1] = rect
  const out: number[] = []
  for (let i = 0; i < 4; i++) {
    out.push(u0 + (uv16[i * 2] / 16) * (u1 - u0), v0 + (uv16[i * 2 + 1] / 16) * (v1 - v0))
  }
  return out
}

// Límite de quads por pasada para evitar OOM en schematics muy grandes.
// Con el color empaquetado a uint8 son ~116 B/quad (124 con la entrada de paleta
// por vértice, ver RawBuffers.pal) -> 8M ≈ 990 MB en el peor caso
// (modelo macizo sin culling). Las pasadas son independientes (opaca/translúcida/
// entidad/emisiva), así que el corte por truncado afecta solo a la capa que lo
// alcanza, no a todo el modelo.
export const MAX_QUADS = 8_000_000

// 0-1(+) -> byte 0-255 con saturación (emisivos >1 quedan a 255, que es lo correcto).
function toByte(v: number): number { return v <= 0 ? 0 : v >= 1 ? 255 : (v * 255 + 0.5) | 0 }

class Builder {
  private posBuf: Float32Array
  private uvBuf: Float32Array
  private colBuf: Uint8Array
  private idxBuf: Uint32Array
  private palBuf: Uint16Array
  // Luz por vértice (MeshOptions.light): se reserva la primera vez que hace falta,
  // así la malla de siempre no gasta ni un byte en ella.
  private litBuf: Uint8Array | null = null
  private hasLit = false
  private vc = 0
  private qc = 0
  private cap: number
  // Tope de quads de esta malla: MAX_QUADS, o lo que le quede a un trozo del tope
  // total de la build (chunkMesher reparte el mismo MAX_QUADS entre todos).
  private limit = MAX_QUADS
  truncated = false
  /** Entrada de paleta de lo que se añade ahora (meshRegion la pone en cada celda). */
  pal = 0

  get quads(): number { return this.qc }

  constructor(initialCap = 65536) {
    this.cap = initialCap
    this.posBuf = new Float32Array(initialCap * 12)
    this.uvBuf  = new Float32Array(initialCap * 8)
    this.colBuf = new Uint8Array(initialCap * 12)
    this.idxBuf = new Uint32Array(initialCap * 6)
    this.palBuf = new Uint16Array(initialCap * 4)
  }

  // Vacía para reutilizar los búferes (los trozos del worker usan siempre los mismos).
  reset(limit = MAX_QUADS): void {
    this.vc = 0
    this.qc = 0
    this.truncated = false
    this.hasLit = false
    this.limit = Math.max(0, limit)
  }

  private grow(): void {
    const newCap = this.cap * 2
    const p = new Float32Array(newCap * 12); p.set(this.posBuf); this.posBuf = p
    const u = new Float32Array(newCap * 8);  u.set(this.uvBuf);  this.uvBuf  = u
    const c = new Uint8Array(newCap * 12);   c.set(this.colBuf); this.colBuf = c
    const i = new Uint32Array(newCap * 6);   i.set(this.idxBuf); this.idxBuf = i
    const q = new Uint16Array(newCap * 4);   q.set(this.palBuf); this.palBuf = q
    if (this.litBuf) { const l = new Uint8Array(newCap * 16); l.set(this.litBuf); this.litBuf = l }
    this.cap = newCap
  }

  // ao: factor de sombra suave de cada uno de los 4 vértices, o null (color plano).
  // lit: los 16 bytes de luz de los 4 vértices (RawBuffers.lit), o null sin luz.
  add(q: MeshQuad, ox: number, oy: number, oz: number, ao: Float32Array | null, lit: Uint8Array | null = null): void {
    if (this.truncated) return
    if (this.qc >= this.limit) { this.truncated = true; return }
    if (this.qc >= this.cap) this.grow()
    const base = this.vc
    const pi = this.qc * 12, ui = this.qc * 8, ci = this.qc * 12, ii = this.qc * 6
    this.palBuf.fill(this.pal, this.qc * 4, this.qc * 4 + 4)
    if (lit) {
      if (!this.litBuf) this.litBuf = new Uint8Array(this.cap * 16)
      this.litBuf.set(lit, this.qc * 16)
      this.hasLit = true
    }
    for (let k = 0; k < 4; k++) {
      this.posBuf[pi + k*3]   = q.pos[k*3]   + ox
      this.posBuf[pi + k*3+1] = q.pos[k*3+1] + oy
      this.posBuf[pi + k*3+2] = q.pos[k*3+2] + oz
      this.uvBuf[ui + k*2]   = q.uv[k*2]
      this.uvBuf[ui + k*2+1] = q.uv[k*2+1]
    }
    if (!ao) {
      const br = toByte(q.r), bg = toByte(q.g), bb = toByte(q.b)
      for (let k = 0; k < 4; k++) {
        this.colBuf[ci + k*3]   = br
        this.colBuf[ci + k*3+1] = bg
        this.colBuf[ci + k*3+2] = bb
      }
    } else {
      for (let k = 0; k < 4; k++) {
        // Sin emisivos aquí: color y factor <= 1, no hace falta saturar.
        const f = ao[k] * 255
        this.colBuf[ci + k*3]   = (q.r * f + 0.5) | 0
        this.colBuf[ci + k*3+1] = (q.g * f + 0.5) | 0
        this.colBuf[ci + k*3+2] = (q.b * f + 0.5) | 0
      }
    }
    // El quad se parte por la diagonal más oscura (0fps, "Ambient occlusion for
    // Minecraft-like worlds"). Con la otra, un rincón con una sola esquina oscura
    // sale como un triángulo recortado y cambia según hacia dónde mire la cara.
    if (ao && ao[0] + ao[2] > ao[1] + ao[3]) {
      this.idxBuf[ii]   = base+1;   this.idxBuf[ii+1] = base+2; this.idxBuf[ii+2] = base+3
      this.idxBuf[ii+3] = base+1;   this.idxBuf[ii+4] = base+3; this.idxBuf[ii+5] = base
    } else {
      this.idxBuf[ii]   = base;     this.idxBuf[ii+1] = base+1; this.idxBuf[ii+2] = base+2
      this.idxBuf[ii+3] = base;     this.idxBuf[ii+4] = base+2; this.idxBuf[ii+5] = base+3
    }
    this.vc += 4
    this.qc++
  }

  raw(): RawBuffers | null {
    if (this.qc === 0) return null
    return {
      pos: this.posBuf.slice(0, this.qc * 12),
      uv:  this.uvBuf.slice(0, this.qc * 8),
      col: this.colBuf.slice(0, this.qc * 12),
      idx: this.vc > 65535
        ? this.idxBuf.slice(0, this.qc * 6)
        : new Uint16Array(this.idxBuf.subarray(0, this.qc * 6)),
      pal: this.palBuf.slice(0, this.qc * 4),
      lit: this.hasLit && this.litBuf ? this.litBuf.slice(0, this.qc * 16) : undefined,
    }
  }
}
