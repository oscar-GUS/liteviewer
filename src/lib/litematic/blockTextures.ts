// Mapeo bloque -> texturas de cara (nombres de tile del atlas), con orientación por
// eje para columnas (troncos/pilares) y tintes (hierba/hojas/agua).
// Devuelve nombres de textura; buildMesh comprueba si están en el atlas y, si no,
// cae a color plano para esa cara.

import { baseName, normalizeLegacy } from './blockColors'

export type RGB = readonly [number, number, number] // 0-1

// FACES order en buildMesh: 0:+X  1:-X  2:+Y(arriba)  3:-Y(abajo)  4:+Z  5:-Z
export interface FaceInfo {
  tiles: string[]            // 6 nombres de textura
  tints: (RGB | null)[]      // 6 tintes (multiplican la textura) o null
  transparent: boolean
}

// Tintes de bioma, fijos (bioma llanura, sin selector) y por bloque como en vanilla.
// Fuentes:
// - Minecraft Wiki, "Plains" y "Color": hierba #91BD59, follaje #77AB2F y agua
//   #3F76E4 en llanura. Antes el follaje era #59AE30, que es el de bosque.
// - net.minecraft.client.color.block.BlockColors y FoliageColor: el abeto
//   (#619961), el abedul (#80A755) y el mangle (#92C648) tienen color fijo; el
//   nenúfar es #208030 (-14647248); el tallo unido, #E0C71C (-2046180); el tallo
//   suelto va por edad (r = 32·edad, g = 255 - 8·edad, b = 4·edad). Lo que no se
//   registra ahí sale sin teñir aunque el modelo traiga tintindex: cerezo, roble
//   pálido, bambú, cortapiedras y los calderos de lava y de nieve en polvo.
const hex = (c: number): RGB => [((c >> 16) & 255) / 255, ((c >> 8) & 255) / 255, (c & 255) / 255]
export const GRASS: RGB = hex(0x91bd59)
export const FOLIAGE: RGB = hex(0x77ab2f)
export const WATER: RGB = hex(0x3f76e4)
const SPRUCE: RGB = hex(0x619961)
const BIRCH: RGB = hex(0x80a755)
const MANGROVE: RGB = hex(0x92c648)
const LILY_PAD: RGB = hex(0x208030)
const ATTACHED_STEM: RGB = hex(0xe0c71c)

/**
 * Tinte de bioma de las caras con tintindex de un bloque (nombre base, sin
 * "minecraft:"), o null si vanilla no lo tiñe y la textura se pinta tal cual.
 */
export function blockTint(base: string, properties?: Record<string, string>): RGB | null {
  switch (base) {
    case 'grass_block': case 'short_grass': case 'grass': case 'tall_grass': case 'fern':
    case 'large_fern': case 'potted_fern': case 'sugar_cane': case 'reeds':
    case 'pink_petals': case 'wildflowers': case 'bush':
      return GRASS
    case 'oak_leaves': case 'jungle_leaves': case 'acacia_leaves': case 'dark_oak_leaves': case 'vine':
      return FOLIAGE
    // Vanilla lo tiñe con el follaje seco (1.21.5), cuyo valor en llanura no tengo
    // verificado: se queda con el follaje normal, como estaba.
    case 'leaf_litter':
      return FOLIAGE
    case 'spruce_leaves': return SPRUCE
    case 'birch_leaves': return BIRCH
    case 'mangrove_leaves': return MANGROVE
    case 'lily_pad': case 'waterlily': return LILY_PAD
    case 'attached_melon_stem': case 'attached_pumpkin_stem': return ATTACHED_STEM
    case 'melon_stem': case 'pumpkin_stem': {
      const age = Math.max(0, Math.min(7, parseInt(properties?.age ?? '0', 10) || 0))
      return [(age * 32) / 255, (255 - age * 8) / 255, (age * 4) / 255]
    }
    case 'water': case 'flowing_water': case 'bubble_column': case 'water_cauldron':
      return WATER
  }
  return null
}

const DYES = new Set(['white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime', 'pink', 'gray', 'light_gray', 'cyan', 'purple', 'blue', 'brown', 'green', 'red', 'black'])
const WOODS = new Set(['oak', 'spruce', 'birch', 'jungle', 'acacia', 'dark_oak', 'mangrove', 'cherry'])

interface Spec {
  top: string
  bottom: string
  side: string
  column?: boolean      // si true, top/bottom = textura de tapa (end), según eje
  tintTop?: RGB
  tintAll?: RGB
  transparent?: boolean
}

const all = (t: string, extra: Partial<Spec> = {}): Spec => ({ top: t, bottom: t, side: t, ...extra })
const col = (side: string, end: string, extra: Partial<Spec> = {}): Spec => ({ top: end, bottom: end, side, column: true, ...extra })
const tbs = (top: string, bottom: string, side: string, extra: Partial<Spec> = {}): Spec => ({ top, bottom, side, ...extra })

// Casos especiales (multi-cara, columnas, tintes, nombres distintos del bloque).
const SPECIAL: Record<string, Spec> = {
  grass_block: tbs('grass_block_top', 'dirt', 'grass_block_side', { tintTop: GRASS }),
  podzol: tbs('podzol_top', 'dirt', 'podzol_side'),
  mycelium: tbs('mycelium_top', 'dirt', 'mycelium_side'),
  dirt_path: tbs('dirt_path_top', 'dirt', 'dirt_path_side'),
  farmland: tbs('farmland', 'dirt', 'dirt'),
  sandstone: tbs('sandstone_top', 'sandstone_bottom', 'sandstone'),
  cut_sandstone: tbs('sandstone_top', 'sandstone_bottom', 'cut_sandstone'),
  chiseled_sandstone: tbs('sandstone_top', 'sandstone_bottom', 'chiseled_sandstone'),
  smooth_sandstone: all('sandstone_top'),
  red_sandstone: tbs('red_sandstone_top', 'red_sandstone_bottom', 'red_sandstone'),
  cut_red_sandstone: tbs('red_sandstone_top', 'red_sandstone_bottom', 'cut_red_sandstone'),
  chiseled_red_sandstone: tbs('red_sandstone_top', 'red_sandstone_bottom', 'chiseled_red_sandstone'),
  smooth_red_sandstone: all('red_sandstone_top'),
  quartz_block: tbs('quartz_block_top', 'quartz_block_bottom', 'quartz_block_side'),
  smooth_quartz: all('quartz_block_bottom'),
  quartz_pillar: col('quartz_block_side', 'quartz_block_top'),
  purpur_pillar: all('purpur_block'),
  basalt: col('basalt_side', 'basalt_top'),
  polished_basalt: col('polished_basalt_side', 'polished_basalt_top'),
  bone_block: col('bone_block_side', 'bone_block_top'),
  hay_block: col('hay_block_side', 'hay_block_top'),
  deepslate: col('deepslate', 'deepslate_top'),
  ancient_debris: tbs('ancient_debris_top', 'ancient_debris_top', 'ancient_debris_side'),
  magma_block: all('magma'),
  dried_kelp_block: tbs('dried_kelp_top', 'dried_kelp_bottom', 'dried_kelp_side'),
  honey_block: tbs('honey_block_top', 'honey_block_bottom', 'honey_block_side', { transparent: true }),
  slime_block: all('slime_block', { transparent: true }),
  melon: tbs('melon_top', 'melon_top', 'melon_side'),
  pumpkin: tbs('pumpkin_top', 'pumpkin_top', 'pumpkin_side'),
  carved_pumpkin: tbs('pumpkin_top', 'pumpkin_top', 'carved_pumpkin'),
  jack_o_lantern: tbs('pumpkin_top', 'pumpkin_top', 'jack_o_lantern'),
  tnt: tbs('tnt_top', 'tnt_bottom', 'tnt_side'),
  target: tbs('target_top', 'target_top', 'target_side'),
  note_block: all('note_block'),
  // La vasija decorada es un block entity sin cubo en el atlas → sin la textura
  // real, se aproxima con terracota (su material y color) en vez de color plano.
  decorated_pot: all('terracotta'),
  jukebox: tbs('jukebox_top', 'jukebox_side', 'jukebox_side'),
  bookshelf: tbs('oak_planks', 'oak_planks', 'bookshelf'),
  crafting_table: tbs('crafting_table_top', 'oak_planks', 'crafting_table_side'),
  furnace: tbs('furnace_top', 'furnace_top', 'furnace_side'),
  lodestone: tbs('lodestone_top', 'lodestone_top', 'lodestone_side'),
  redstone_lamp: all('redstone_lamp'),
  // Redstone / técnicos (aprox. sin orientación por facing; el cubo lleva la textura "cara")
  hopper: tbs('hopper_top', 'hopper_outside', 'hopper_outside'),
  piston: tbs('piston_top', 'piston_bottom', 'piston_side'),
  sticky_piston: tbs('piston_top_sticky', 'piston_bottom', 'piston_side'),
  // Bloque técnico de pistón en movimiento: sin textura propia en el atlas, se
  // aproxima con la del pistón para que no salga como cubo de color plano.
  moving_piston: tbs('piston_top', 'piston_bottom', 'piston_side'),
  observer: tbs('observer_top', 'observer_top', 'observer_side'),
  dropper: tbs('furnace_top', 'furnace_top', 'dropper_front'),
  dispenser: tbs('furnace_top', 'furnace_top', 'dispenser_front'),
  repeater: tbs('repeater', 'smooth_stone', 'smooth_stone'),
  comparator: tbs('comparator', 'smooth_stone', 'smooth_stone'),
  redstone_torch: all('redstone_torch'),
  redstone_wall_torch: all('redstone_torch'),
  glass: all('glass'),   // de recorte, como en vanilla (ver buildMesh.isTranslucent)
  tinted_glass: all('tinted_glass', { transparent: true }),
  ice: all('ice', { transparent: true }),
  packed_ice: all('packed_ice'),
  blue_ice: all('blue_ice'),
  water: all('water_still', { tintAll: WATER, transparent: true }),
  bubble_column: all('water_still', { tintAll: WATER, transparent: true }),
  lava: all('lava_still'),
}

function resolveSpec(base: string): Spec {
  const special = SPECIAL[base]
  if (special) return special

  // Familia de maderas
  const stripped = base.startsWith('stripped_')
  const wb = stripped ? base.slice('stripped_'.length) : base
  for (const w of WOODS) {
    if (wb === w || wb.startsWith(w + '_')) {
      const suf = wb.slice(w.length + 1)
      const logSide = stripped ? `stripped_${w}_log` : `${w}_log`
      const logEnd = stripped ? `stripped_${w}_log_top` : `${w}_log_top`
      if (suf === 'log') return col(logSide, logEnd)
      if (suf === 'wood') return all(logSide)
      if (suf === 'leaves') {
        const t = blockTint(`${w}_leaves`)
        return all(`${w}_leaves`, t ? { tintAll: t } : {})
      }
      return all(`${w}_planks`) // planks, stairs, slab, fence, door, etc.
    }
  }
  // Carmesí / distorsionado (tallos, no troncos)
  for (const s of ['crimson', 'warped']) {
    const sb = stripped ? base.slice('stripped_'.length) : base
    if (sb === s || sb.startsWith(s + '_')) {
      const suf = sb.slice(s.length + 1)
      const stemSide = stripped ? `stripped_${s}_stem` : `${s}_stem`
      const stemEnd = stripped ? `stripped_${s}_stem_top` : `${s}_stem_top`
      if (suf === 'stem') return col(stemSide, stemEnd)
      if (suf === 'hyphae') return all(stemSide)
      return all(`${s}_planks`)
    }
  }
  if (base === 'bamboo_planks' || base.startsWith('bamboo_')) return all('bamboo_planks')

  // Familia de tintes
  for (const c of DYES) {
    if (base.startsWith(c + '_')) {
      const suf = base.slice(c.length + 1)
      if (suf.includes('stained_glass')) return all(`${c}_stained_glass`, { transparent: true })
      if (suf.includes('glazed_terracotta')) return all(`${c}_glazed_terracotta`)
      if (suf.includes('concrete_powder')) return all(`${c}_concrete_powder`)
      if (suf.includes('concrete')) return all(`${c}_concrete`)
      if (suf.includes('terracotta')) return all(`${c}_terracotta`)
      if (suf === 'wool' || suf === 'carpet') return all(`${c}_wool`)
    }
  }
  if (base === 'terracotta') return all('terracotta')

  // Por defecto: textura con el mismo nombre que el bloque (cube_all)
  return all(base)
}

export function getFaceInfo(name: string, properties?: Record<string, string>): FaceInfo {
  const spec = resolveSpec(normalizeLegacy(baseName(name), properties))
  const axis = properties?.axis ?? 'y'

  let tiles: string[]
  if (spec.column) {
    const end = spec.top
    const s = spec.side
    if (axis === 'x') tiles = [end, end, s, s, s, s]
    else if (axis === 'z') tiles = [s, s, s, s, end, end]
    else tiles = [s, s, end, end, s, s] // y
  } else {
    tiles = [spec.side, spec.side, spec.top, spec.bottom, spec.side, spec.side]
  }

  const tints: (RGB | null)[] = [null, null, null, null, null, null]
  if (spec.tintAll) tints.fill(spec.tintAll)
  if (spec.tintTop) tints[2] = spec.tintTop

  return { tiles, tints, transparent: !!spec.transparent }
}
