// Construye la geometría 3D del schematic instanciando los modelos de bloque reales
// (escaleras, losas, vallas, redstone…). Por cada índice de paleta se precalcula una
// lista de "quads locales" (caja unidad 0..1, con rotaciones de elemento y blockstate
// ya aplicadas); el bucle por celda solo traslada y aplica el culling por cullface.
//
// Niveles: modelo 3D (ModelDB) -> cubo texturado (blockTextures) -> color plano.
// Pasadas: sólido+recorte (alphaTest) y translúcido (cristal/agua).

import * as THREE from 'three'
import { SchematicModel, isAir, BlockState } from './types'

type ModelInput = Pick<SchematicModel, 'width' | 'height' | 'length' | 'blocks' | 'palette'>
import { getBlockColor, baseName } from './blockColors'
import { getFaceInfo } from './blockTextures'
import { UVRect } from './atlas'
import { BakedElement, ResolvedPart } from './models'
import { EntityAtlas, LocalQuad, isBlockEntity, buildBlockEntity } from './blockEntities'

export interface MeshGeometries {
  opaque: THREE.BufferGeometry | null
  transparent: THREE.BufferGeometry | null
  entity: THREE.BufferGeometry | null
  emissive: THREE.BufferGeometry | null
  lights: LightSample[]
}

// Muestra de fuente de luz (ya en coordenadas del modelo, centrado en el origen).
// Se agrupan por celdas para acotar el nº de luces puntuales reales en showcase.
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
}

export interface RawGeometries {
  opaque: RawBuffers | null
  transparent: RawBuffers | null
  entity: RawBuffers | null
  emissive: RawBuffers | null
  lights: LightSample[]
  truncated: boolean
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

// Tintes (bioma llanura, fijo)
const GRASS: readonly [number, number, number] = [0x91 / 255, 0xbd / 255, 0x59 / 255]
const FOLIAGE: readonly [number, number, number] = [0x59 / 255, 0xae / 255, 0x30 / 255]
const WATER: readonly [number, number, number] = [0x3f / 255, 0x76 / 255, 0xe4 / 255]
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

const TRANSLUCENT = new Set(['water', 'ice', 'slime_block', 'honey_block', 'nether_portal', 'bubble_column'])
function isTranslucent(name: string): boolean {
  const b = baseName(name)
  return b.includes('glass') || TRANSLUCENT.has(b)
}
function tintFor(name: string, props?: Record<string, string>): readonly [number, number, number] {
  const b = baseName(name)
  if (b === 'water' || b.endsWith('_cauldron')) return WATER
  if (b === 'redstone_wire') return redstoneColor(parseInt(props?.power ?? '0', 10) || 0)
  if (b === 'grass_block' || b === 'short_grass' || b === 'tall_grass' || b === 'fern' || b === 'large_fern' || b === 'sugar_cane') return GRASS
  // Cherry leaves: la textura ya viene rosa. El modelo trae tintindex, pero
  // multiplicar por el verde de follaje las deja verde-marrón. Tint blanco = sin cambio.
  if (b === 'cherry_leaves') return NO_TINT
  return FOLIAGE
}

// Nivel de luz (0-15) que emite un bloque. Solo se usa para el "glow" del modo
// showcase: los bloques con nivel > 0 se separan a una malla emisiva sin sombrear
// y se realzan para que el bloom los haga brillar. No es propagación de luz real.
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
// Color aproximado de la luz que emite cada bloque (para las luces puntuales del
// showcase). El glow/realce se hace en el material; aquí solo el tono de la luz.
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

interface PalRender { air: boolean; occluder: boolean; solid: LocalQuad[]; trans: LocalQuad[]; entity?: LocalQuad[]; emis?: LocalQuad[]; fluid?: FluidInfo; light?: { level: number; r: number; g: number; b: number } }

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

export function buildMeshRaw(
  model: ModelInput,
  atlas: IAtlas | null,
  db: IModelDB | null,
  slice?: SliceRange,
  entityAtlas?: EntityAtlas | null,
): RawGeometries {
  const { width, height, length, blocks, palette } = model
  const pal = palette.map((bs) => buildPalRender(bs, atlas, db, true, entityAtlas ?? null))

  const solid = new Builder()
  const trans = new Builder()
  const entity = new Builder()
  const emissive = new Builder()
  const cx = width / 2, cy = height / 2, cz = length / 2
  const at = (x: number, y: number, z: number) => blocks[(y * length + z) * width + x]

  // Agrupación de emisores en celdas pequeñas (lado ~4) para no generar miles de
  // luces pero manteniéndolas pegadas a cada emisor (así una antorcha sí ilumina
  // el bloque de al lado). En builds enormes la celda crece para acotar el total.
  const lb = Math.max(4, Math.round(Math.max(width, height, length) / 30))
  const buckets = new Map<number, { sx: number; sy: number; sz: number; n: number; lvl: number; r: number; g: number; b: number }>()

  const xMin = slice?.x[0] ?? 0, xMax = slice?.x[1] ?? width - 1
  const yMin = slice?.y[0] ?? 0, yMax = slice?.y[1] ?? height - 1
  const zMin = slice?.z[0] ?? 0, zMax = slice?.z[1] ?? length - 1

  for (let y = yMin; y <= yMax; y++) {
    for (let z = zMin; z <= zMax; z++) {
      for (let x = xMin; x <= xMax; x++) {
        const p = pal[at(x, y, z)]
        if (p.air) continue
        const ox = x - cx, oy = y - cy, oz = z - cz
        if (p.light) {
          const key = (((x / lb) | 0) * 1024 + ((y / lb) | 0)) * 1024 + ((z / lb) | 0)
          let e = buckets.get(key)
          if (!e) { e = { sx: 0, sy: 0, sz: 0, n: 0, lvl: 0, r: 0, g: 0, b: 0 }; buckets.set(key, e) }
          e.sx += x; e.sy += y; e.sz += z; e.n++
          if (p.light.level > e.lvl) e.lvl = p.light.level
          e.r += p.light.r; e.g += p.light.g; e.b += p.light.b
        }
        if (p.fluid) { emitFluid(p.fluid, x, y, z, ox, oy, oz); continue }
        emit(p.solid, solid, x, y, z, ox, oy, oz)
        emit(p.trans, trans, x, y, z, ox, oy, oz)
        if (p.entity) emit(p.entity, entity, x, y, z, ox, oy, oz)
        if (p.emis) emit(p.emis, emissive, x, y, z, ox, oy, oz)
      }
    }
  }

  // Vecino visible (dentro de límites y del slice), o null si hay que dibujar la cara.
  function fluidNeighbor(nx: number, ny: number, nz: number): PalRender | null {
    if (nx < 0 || nx >= width || ny < 0 || ny >= height || nz < 0 || nz >= length) return null
    if (slice && !(nx >= slice.x[0] && nx <= slice.x[1] && ny >= slice.y[0] && ny <= slice.y[1] && nz >= slice.z[0] && nz <= slice.z[1])) return null
    return pal[at(nx, ny, nz)]
  }

  // Altura (px 0-16) de una esquina de la tapa: promedia las celdas de fluido que
  // tocan la esquina (la fuente pesa más). Dos celdas que comparten una arista dan
  // la misma altura -> las superficies se unen sin escalones ni huecos.
  function emitFluid(fi: FluidInfo, x: number, y: number, z: number, ox: number, oy: number, oz: number) {
    if (!atlas) return
    // La lava va a la malla emisiva (solo brilla en showcase); el bake es normal.
    const bld = fi.family === 'lava' ? emissive : (fi.translucent ? trans : solid)
    const rect = atlas.uv(fi.tileIdx)
    const cr = fi.tint ? fi.tint[0] : 1, cg = fi.tint ? fi.tint[1] : 1, cb = fi.tint ? fi.tint[2] : 1
    const aboveSame = (() => { const a = fluidNeighbor(x, y + 1, z); return !!a?.fluid && a.fluid.family === fi.family })()

    // Alturas de las 4 esquinas (px). hXZ: X=0|16 (oeste/este), Z=0|16 (norte/sur).
    const corner = (dx: number, dz: number) => aboveSame ? 16 : cornerH(x, y, z, dx, dz, fi)
    const h00 = corner(-1, -1), h10 = corner(1, -1), h01 = corner(-1, 1), h11 = corner(1, 1)

    // Empuja una cara: verts en px [x,y,z], uv en px [u,v] del tile, dir para sombra.
    const face = (verts: number[][], uvtile: number[][], dir: string) => {
      const bn = DIR_NORMAL[dir]
      const sh = shadeFor(bn[0], bn[1], bn[2])
      const pos: number[] = []
      for (const v of verts) pos.push(v[0] / 16, v[1] / 16, v[2] / 16)
      const uvflat: number[] = []
      for (const u of uvtile) uvflat.push(u[0], u[1])
      bld.add({ pos, uv: mapUv(uvflat, rect), r: cr * sh, g: cg * sh, b: cb * sh, cull: -1 }, ox, oy, oz)
    }

    const occ = (nx: number, ny: number, nz: number) => fluidNeighbor(nx, ny, nz)?.occluder
    const sameFluid = (nx: number, ny: number, nz: number) => { const p = fluidNeighbor(nx, ny, nz); return !!p?.fluid && p.fluid.family === fi.family }

    // Tapa (esquinas a distinta altura -> superficie continua/inclinada)
    if (!aboveSame && !occ(x, y + 1, z)) {
      face([[0, h01, 16], [16, h11, 16], [16, h10, 0], [0, h00, 0]], [[0, 16], [16, 16], [16, 0], [0, 0]], 'up')
    }
    // Fondo
    if (!occ(x, y - 1, z) && !sameFluid(x, y - 1, z)) {
      face([[0, 0, 0], [16, 0, 0], [16, 0, 16], [0, 0, 16]], [[0, 0], [16, 0], [16, 16], [0, 16]], 'down')
    }
    // Laterales: el borde superior usa las dos esquinas correspondientes (la uv se
    // recorta a esa altura). Se ocultan contra sólido o el mismo fluido.
    if (!occ(x + 1, y, z) && !sameFluid(x + 1, y, z)) { // este (+X)
      face([[16, 0, 16], [16, 0, 0], [16, h10, 0], [16, h11, 16]], [[0, 16], [16, 16], [16, 16 - h10], [0, 16 - h11]], 'east')
    }
    if (!occ(x - 1, y, z) && !sameFluid(x - 1, y, z)) { // oeste (-X)
      face([[0, 0, 0], [0, 0, 16], [0, h01, 16], [0, h00, 0]], [[0, 16], [16, 16], [16, 16 - h01], [0, 16 - h00]], 'west')
    }
    if (!occ(x, y, z + 1) && !sameFluid(x, y, z + 1)) { // sur (+Z)
      face([[0, 0, 16], [16, 0, 16], [16, h11, 16], [0, h01, 16]], [[0, 16], [16, 16], [16, 16 - h11], [0, 16 - h01]], 'south')
    }
    if (!occ(x, y, z - 1) && !sameFluid(x, y, z - 1)) { // norte (-Z)
      face([[16, 0, 0], [0, 0, 0], [0, h00, 0], [16, h10, 0]], [[0, 16], [16, 16], [16, 16 - h00], [0, 16 - h10]], 'north')
    }
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

  function emit(quads: LocalQuad[], b: Builder, x: number, y: number, z: number, ox: number, oy: number, oz: number) {
    for (const q of quads) {
      if (q.cull >= 0) {
        const d = NEIGHBOR[q.cull]
        const nx = x + d[0], ny = y + d[1], nz = z + d[2]
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && nz >= 0 && nz < length) {
          const neighborVisible = !slice ||
            (nx >= slice.x[0] && nx <= slice.x[1] &&
             ny >= slice.y[0] && ny <= slice.y[1] &&
             nz >= slice.z[0] && nz <= slice.z[1])
          if (neighborVisible && pal[at(nx, ny, nz)].occluder) continue
        }
      }
      b.add(q, ox, oy, oz)
    }
  }

  // Convierte las celdas-emisor agrupadas en muestras de luz (centradas en el origen),
  // y se queda con las más fuertes (más emisores / mayor nivel).
  const MAX_LIGHTS = 48
  const lights: LightSample[] = []
  for (const e of buckets.values()) {
    lights.push({
      x: e.sx / e.n - cx + 0.5, y: e.sy / e.n - cy + 0.5, z: e.sz / e.n - cz + 0.5,
      r: e.r / e.n, g: e.g / e.n, b: e.b / e.n, level: e.lvl, count: e.n,
    })
  }
  lights.sort((a, b) => b.count * b.level - a.count * a.level)

  return {
    opaque: solid.raw(),
    transparent: trans.raw(),
    entity: entity.raw(),
    emissive: emissive.raw(),
    lights: lights.slice(0, MAX_LIGHTS),
    truncated: solid.truncated || trans.truncated || entity.truncated || emissive.truncated,
  }
}

export function buildMesh(
  model: ModelInput,
  atlas: IAtlas | null,
  db: IModelDB | null,
  slice?: SliceRange,
  entityAtlas?: EntityAtlas | null,
): MeshGeometries {
  const raw = buildMeshRaw(model, atlas, db, slice, entityAtlas)
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
function buildPalRender(bs: BlockState, atlas: IAtlas | null, db: IModelDB | null, textured: boolean, entityAtlas: EntityAtlas | null): PalRender {
  if (isAir(bs.name)) return { air: true, occluder: false, solid: [], trans: [] }

  // Bloque de luz (minecraft:light): INVISIBLE en el juego, solo es fuente de luz.
  // No se dibuja NADA (nada de textura azul); se aplica su nivel (propiedad `level`
  // 0-15) como luz blanca para el showcase.
  if (baseName(bs.name) === 'light') {
    const lvl = parseInt(bs.properties?.level ?? '15', 10) || 0
    return { air: false, occluder: false, solid: [], trans: [], light: lvl > 0 ? { level: lvl, r: 1.0, g: 0.97, b: 0.88 } : undefined }
  }

  // Block entities con geometría y textura propias (cofres, shulkers, cabezas…)
  if (entityAtlas && isBlockEntity(bs.name)) {
    const entity = buildBlockEntity(bs, entityAtlas)
    if (entity) return { air: false, occluder: false, solid: [], trans: [], entity }
  }

  // Fluidos: altura por `level` (resueltos en el bucle, ver emitFluid).
  const family = atlas ? fluidFamily(baseName(bs.name)) : null
  if (atlas && family) {
    const tileIdx = atlas.tileIndex(family === 'lava' ? 'lava_still' : 'water_still')
    if (tileIdx !== undefined) {
      const full = baseName(bs.name) === 'bubble_column'
      const lvl = full ? 8 : (parseInt(bs.properties?.level ?? '0', 10) || 0)
      return {
        air: false, occluder: false, solid: [], trans: [],
        fluid: { family, tileIdx, tint: family === 'water' ? WATER : null, translucent: family === 'water', heightPx: fluidHeightPx(lvl) },
        light: family === 'lava' ? { level: 15, ...lightColor('lava') } : undefined,
      }
    }
  }

  // Bloques que emiten luz: sus caras se separan a la malla emisiva (bake normal).
  // El brillo se aplica solo en showcase (material realzado + luces puntuales); en
  // modo normal la malla emisiva usa el material opaco y se ve igual que antes.
  const level = lightLevel(bs.name, bs.properties)
  const emissive = level > 0
  const light = emissive ? { level, ...lightColor(bs.name) } : undefined
  // Emisores parciales: solo brilla una textura (la antorcha de redstone), no todo
  // el bloque (repetidor/comparador).
  const bn = baseName(bs.name)
  const emissiveTile = emissive && (bn === 'repeater' || bn === 'comparator') ? 'redstone_torch' : undefined

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
        const r = fromModel(bs, parts, atlas, emissive, emissiveTile)
        if (r.solid.length || r.trans.length || r.emis?.length) { r.light = light; return r }
      }
    } catch {
      // un bloque problemático no debe romper toda la malla: cae a cubo
    }
  }
  const r = cubeRender(bs, atlas, textured, emissive) // fallback: cubo texturado o color plano
  r.light = light
  return r
}

// emissiveTile: si se pasa, solo emiten las caras cuya textura termina en ese nombre
// (emisión parcial, p.ej. la antorcha del repetidor); si no, emite todo el bloque.
function fromModel(bs: BlockState, parts: ResolvedPart[], atlas: IAtlas, emissive = false, emissiveTile?: string): PalRender {
  const translucent = isTranslucent(bs.name)
  const tint = tintFor(bs.name, bs.properties)
  const solid: LocalQuad[] = []
  const trans: LocalQuad[] = []
  const emis: LocalQuad[] = []
  let fullCube = false

  const n = new THREE.Vector3()
  const v = new THREE.Vector3()

  for (const part of parts) {
    const bsM = blockstateMatrix(part.x, part.y)
    for (const el of part.model.elements) {
      if (el.from[0] === 0 && el.from[1] === 0 && el.from[2] === 0 && el.to[0] === 16 && el.to[1] === 16 && el.to[2] === 16) fullCube = true
      const M = bsM.clone().multiply(elementMatrix(el))
      const rot = new THREE.Matrix4().extractRotation(M)

      for (const dir in el.faces) {
        const face = el.faces[dir]
        const tileIdx = atlas.tileIndex(face.tile)
        const flat = getBlockColor(bs.name, bs.properties)
        const rect: UVRect = tileIdx !== undefined ? atlas.uv(tileIdx) : atlas.uv(atlas.whiteIndex)
        const baseR = tileIdx !== undefined ? (face.tint ? tint[0] : 1) : flat.r / 255
        const baseG = tileIdx !== undefined ? (face.tint ? tint[1] : 1) : flat.g / 255
        const baseB = tileIdx !== undefined ? (face.tint ? tint[2] : 1) : flat.b / 255

        const q = faceQuad(dir, el.from, el.to, face.uv)
        // posiciones: aplicar M y escalar a [0,1]
        const pos: number[] = []
        for (let k = 0; k < 4; k++) {
          v.set(q.pos[k * 3], q.pos[k * 3 + 1], q.pos[k * 3 + 2]).applyMatrix4(M).multiplyScalar(1 / 16)
          pos.push(v.x, v.y, v.z)
        }
        // normal final -> sombra + dirección de cull
        const bn = DIR_NORMAL[dir] ?? [0, 1, 0]
        n.set(bn[0], bn[1], bn[2]).applyMatrix4(rot).normalize()
        const shade = el.shade ? shadeFor(n.x, n.y, n.z) : 1 // bake siempre normal
        const cull = face.cull ? dirIndexFromNormal(n.clone().set(DIR_NORMAL[face.cull][0], DIR_NORMAL[face.cull][1], DIR_NORMAL[face.cull][2]).applyMatrix4(rot)) : -1

        const uv = mapUv(rotateUv(q.uv, face.rot), rect)
        const quad: LocalQuad = { pos, uv, r: baseR * shade, g: baseG * shade, b: baseB * shade, cull }
        const faceEmis = emissiveTile ? face.tile.endsWith(emissiveTile) : emissive
        ;(faceEmis ? emis : translucent ? trans : solid).push(quad)
      }
    }
  }
  return { air: false, occluder: fullCube && !translucent, solid, trans, emis: emis.length ? emis : undefined }
}

// Cubo completo (fallback): textura por cara via getFaceInfo, o color plano.
function cubeRender(bs: BlockState, atlas: IAtlas | null, textured: boolean, emissive = false): PalRender {
  const flat = getBlockColor(bs.name, bs.properties)
  const fr = flat.r / 255, fg = flat.g / 255, fb = flat.b / 255
  const info = textured ? getFaceInfo(bs.name, bs.properties) : null
  const translucent = flat.transparent || (info?.transparent ?? false)
  // dirs en el mismo orden que getFaceInfo.tiles: [+X,-X,+Y,-Y,+Z,-Z]
  const dirs = ['east', 'west', 'up', 'down', 'south', 'north']
  const quads: LocalQuad[] = []

  dirs.forEach((dir, di) => {
    let r = fr, g = fg, b = fb
    let rect: UVRect = atlas ? atlas.uv(atlas.whiteIndex) : [0, 0, 0, 0]
    if (info && atlas) {
      const ti = atlas.tileIndex(info.tiles[di])
      if (ti !== undefined) {
        rect = atlas.uv(ti)
        const t = info.tints[di]
        r = t ? t[0] : 1; g = t ? t[1] : 1; b = t ? t[2] : 1
      }
    }
    const q = faceQuad(dir, [0, 0, 0], [16, 16, 16], [0, 0, 16, 16])
    const bn = DIR_NORMAL[dir]
    const shade = shadeFor(bn[0], bn[1], bn[2]) // bake siempre normal
    quads.push({ pos: q.pos.map((c) => c / 16), uv: mapUv(q.uv, rect), r: r * shade, g: g * shade, b: b * shade, cull: di })
  })

  if (emissive) return { air: false, occluder: !translucent, solid: [], trans: [], emis: quads }
  return { air: false, occluder: !translucent, solid: translucent ? [] : quads, trans: translucent ? quads : [] }
}

// End portal (superficie plana a 0.75) / end gateway (cubo), con la textura
// `end_portal` (campo de estrellas). Devuelve null si la textura no está en el atlas.
function endPortalRender(bn: string, atlas: IAtlas, emissive: boolean): PalRender | null {
  const ti = atlas.tileIndex('end_portal')
  if (ti === undefined) return null
  const rect = atlas.uv(ti)
  const quads: LocalQuad[] = []
  const addFace = (dir: string, from: number[], to: number[]) => {
    const q = faceQuad(dir, from, to, [0, 0, 16, 16])
    quads.push({ pos: q.pos.map((c) => c / 16), uv: mapUv(q.uv, rect), r: 1, g: 1, b: 1, cull: -1 })
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
// Con el color empaquetado a uint8 son ~116 B/quad -> 8M ≈ 930 MB en el peor caso
// (modelo macizo sin culling). Las pasadas son independientes (opaca/translúcida/
// entidad/emisiva), así que el corte por truncado afecta solo a la capa que lo
// alcanza, no a todo el modelo.
const MAX_QUADS = 8_000_000

// 0-1(+) -> byte 0-255 con saturación (emisivos >1 quedan a 255, que es lo correcto).
function toByte(v: number): number { return v <= 0 ? 0 : v >= 1 ? 255 : (v * 255 + 0.5) | 0 }

class Builder {
  private posBuf: Float32Array
  private uvBuf: Float32Array
  private colBuf: Uint8Array
  private idxBuf: Uint32Array
  private vc = 0
  private qc = 0
  private cap: number
  truncated = false

  constructor(initialCap = 65536) {
    this.cap = initialCap
    this.posBuf = new Float32Array(initialCap * 12)
    this.uvBuf  = new Float32Array(initialCap * 8)
    this.colBuf = new Uint8Array(initialCap * 12)
    this.idxBuf = new Uint32Array(initialCap * 6)
  }

  private grow(): void {
    const newCap = this.cap * 2
    const p = new Float32Array(newCap * 12); p.set(this.posBuf); this.posBuf = p
    const u = new Float32Array(newCap * 8);  u.set(this.uvBuf);  this.uvBuf  = u
    const c = new Uint8Array(newCap * 12);   c.set(this.colBuf); this.colBuf = c
    const i = new Uint32Array(newCap * 6);   i.set(this.idxBuf); this.idxBuf = i
    this.cap = newCap
  }

  add(q: LocalQuad, ox: number, oy: number, oz: number): void {
    if (this.truncated) return
    if (this.qc >= MAX_QUADS) { this.truncated = true; return }
    if (this.qc >= this.cap) this.grow()
    const base = this.vc
    const pi = this.qc * 12, ui = this.qc * 8, ci = this.qc * 12, ii = this.qc * 6
    const br = toByte(q.r), bg = toByte(q.g), bb = toByte(q.b)
    for (let k = 0; k < 4; k++) {
      this.posBuf[pi + k*3]   = q.pos[k*3]   + ox
      this.posBuf[pi + k*3+1] = q.pos[k*3+1] + oy
      this.posBuf[pi + k*3+2] = q.pos[k*3+2] + oz
      this.uvBuf[ui + k*2]   = q.uv[k*2]
      this.uvBuf[ui + k*2+1] = q.uv[k*2+1]
      this.colBuf[ci + k*3]   = br
      this.colBuf[ci + k*3+1] = bg
      this.colBuf[ci + k*3+2] = bb
    }
    this.idxBuf[ii]   = base;     this.idxBuf[ii+1] = base+1; this.idxBuf[ii+2] = base+2
    this.idxBuf[ii+3] = base;     this.idxBuf[ii+4] = base+2; this.idxBuf[ii+5] = base+3
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
    }
  }
}
