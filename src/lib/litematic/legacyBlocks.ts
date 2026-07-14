// Normalización de estados de bloque LEGACY (Minecraft 1.12 y anteriores,
// pre-Flattening 1.13) → equivalente moderno (nombre + propiedades). Muchos
// bloques 1.12 guardaban el subtipo en una propiedad `variant`/`color`/`type`
// que en 1.13 pasó a ser un bloque distinto; sin convertirlo, el visor no
// encuentra el modelo y sale un cubo de color plano.

import { BlockState } from './types'

const MC = 'minecraft:'
const bs = (name: string, properties?: Record<string, string>): BlockState =>
  properties && Object.keys(properties).length ? { name: MC + name, properties } : { name: MC + name }

// ── Mapas de variante → bloque moderno ────────────────────────────────────────
const STONE: Record<string, string> = {
  stone: 'stone', granite: 'granite', smooth_granite: 'polished_granite',
  diorite: 'diorite', smooth_diorite: 'polished_diorite',
  andesite: 'andesite', smooth_andesite: 'polished_andesite',
}
const DIRT: Record<string, string> = { dirt: 'dirt', coarse_dirt: 'coarse_dirt', podzol: 'podzol' }
const SANDSTONE: Record<string, string> = { default: 'sandstone', chiseled_sandstone: 'chiseled_sandstone', smooth_sandstone: 'cut_sandstone' }
const RED_SANDSTONE: Record<string, string> = { default: 'red_sandstone', chiseled_red_sandstone: 'chiseled_red_sandstone', smooth_red_sandstone: 'cut_red_sandstone' }
const STONEBRICK: Record<string, string> = { stonebrick: 'stone_bricks', mossy_stonebrick: 'mossy_stone_bricks', cracked_stonebrick: 'cracked_stone_bricks', chiseled_stonebrick: 'chiseled_stone_bricks' }
const PRISMARINE: Record<string, string> = { prismarine: 'prismarine', prismarine_bricks: 'prismarine_bricks', dark_prismarine: 'dark_prismarine' }
const RED_FLOWER: Record<string, string> = {
  poppy: 'poppy', blue_orchid: 'blue_orchid', allium: 'allium', houstonia: 'azure_bluet',
  red_tulip: 'red_tulip', orange_tulip: 'orange_tulip', white_tulip: 'white_tulip',
  pink_tulip: 'pink_tulip', oxeye_daisy: 'oxeye_daisy',
}
const DOUBLE_PLANT: Record<string, string> = {
  sunflower: 'sunflower', syringa: 'lilac', double_grass: 'tall_grass',
  double_fern: 'large_fern', double_rose: 'rose_bush', paeonia: 'peony',
}
const TALLGRASS: Record<string, string> = { grass: 'short_grass', fern: 'fern', dead_bush: 'dead_bush' }
const SLAB_VARIANT: Record<string, string> = {
  stone: 'smooth_stone', sandstone: 'sandstone', wood_old: 'petrified_oak',
  cobblestone: 'cobblestone', brick: 'brick', smooth_brick: 'stone_brick',
  nether_brick: 'nether_brick', quartz: 'quartz',
}

const WOODS = new Set(['oak', 'spruce', 'birch', 'jungle', 'acacia', 'dark_oak'])
const slabType = (props: Record<string, string>, dbl: boolean) =>
  dbl ? 'double' : (props.half === 'top' ? 'top' : 'bottom')

export function normalizeLegacyBlockState(b: BlockState): BlockState {
  const short = b.name.replace(/^minecraft:/, '')
  const p = b.properties ?? {}
  const facing = p.facing
  const deLado = !!facing && facing !== 'up'
  const v = p.variant

  switch (short) {
    // ── Dependientes de propiedad (on/off, pared) ──────────────────────────────
    case 'unpowered_repeater':   return bs('repeater',   { ...p, powered: 'false' })
    case 'powered_repeater':     return bs('repeater',   { ...p, powered: 'true' })
    case 'unpowered_comparator': return bs('comparator', { ...p, powered: 'false' })
    case 'powered_comparator':   return bs('comparator', { ...p, powered: 'true' })
    case 'torch':                return deLado ? bs('wall_torch', { facing: facing! }) : b
    case 'redstone_torch':       return deLado ? bs('redstone_wall_torch', { facing: facing!, lit: 'true' })  : bs('redstone_torch', { lit: 'true' })
    case 'unlit_redstone_torch': return deLado ? bs('redstone_wall_torch', { facing: facing!, lit: 'false' }) : bs('redstone_torch', { lit: 'false' })

    // ── Variantes → bloque propio ──────────────────────────────────────────────
    case 'stone':      return bs(STONE[v] ?? 'stone')
    case 'dirt':       return bs(DIRT[v] ?? 'dirt', v === 'podzol' ? { snowy: p.snowy ?? 'false' } : undefined)
    case 'sand':       return bs(v === 'red_sand' ? 'red_sand' : 'sand')
    case 'planks':     return bs(WOODS.has(v) ? `${v}_planks` : 'oak_planks')
    case 'sapling':    return bs(WOODS.has(v) ? `${v}_sapling` : 'oak_sapling', p.stage ? { stage: p.stage } : undefined)
    case 'sandstone':  return bs(SANDSTONE[v] ?? 'sandstone')
    case 'red_sandstone': return bs(RED_SANDSTONE[v] ?? 'red_sandstone')
    case 'stonebrick': return bs(STONEBRICK[v] ?? 'stone_bricks')
    case 'prismarine': return bs(PRISMARINE[v] ?? 'prismarine')
    case 'sponge':     return bs(p.wet === 'true' ? 'wet_sponge' : 'sponge')
    case 'quartz_block':
      if (v === 'chiseled') return bs('chiseled_quartz_block')
      if (v === 'lines')    return bs('quartz_pillar', { axis: p.axis ?? 'y' })
      return bs('quartz_block')

    // Troncos/hojas (variant + axis)
    case 'log':
    case 'log2': {
      const w = v || 'oak'
      if (p.axis === 'none') return bs(`${w}_wood`)
      return bs(`${w}_log`, { axis: p.axis ?? 'y' })
    }
    case 'leaves':
    case 'leaves2':
      return bs(`${v || 'oak'}_leaves`)

    // Coloreados (color en propiedad)
    case 'wool':                  return bs(`${p.color ?? 'white'}_wool`)
    case 'carpet':                return bs(`${p.color ?? 'white'}_carpet`)
    case 'stained_glass':         return bs(`${p.color ?? 'white'}_stained_glass`)
    case 'stained_hardened_clay': return bs(`${p.color ?? 'white'}_terracotta`)
    case 'stained_glass_pane': {
      const { color, ...rest } = p
      return bs(`${color ?? 'white'}_stained_glass_pane`, rest)
    }

    // Flores
    case 'red_flower':    return bs(RED_FLOWER[v] ?? 'poppy')
    case 'yellow_flower': return bs('dandelion')
    case 'tallgrass':     return bs(TALLGRASS[p.type ?? v] ?? 'short_grass')
    case 'double_plant': {
      const base = DOUBLE_PLANT[v] ?? 'sunflower'
      return bs(base, { half: p.half === 'upper' ? 'upper' : 'lower' })
    }

    // Losas. Ojo: `stone_slab` también existe en 1.13+ (bloque propio, sin
    // `variant`). Solo convertimos si trae `variant` → es legacy.
    case 'stone_slab':        return v ? bs(`${SLAB_VARIANT[v] ?? 'smooth_stone'}_slab`, { type: slabType(p, false) }) : b
    case 'double_stone_slab': return bs(`${SLAB_VARIANT[v] ?? 'smooth_stone'}_slab`, { type: 'double' })
    case 'stone_slab2':        return bs('red_sandstone_slab', { type: slabType(p, false) })
    case 'double_stone_slab2': return bs('red_sandstone_slab', { type: 'double' })
    case 'wooden_slab':        return bs(`${WOODS.has(v) ? v : 'oak'}_slab`, { type: slabType(p, false) })
    case 'double_wooden_slab': return bs(`${WOODS.has(v) ? v : 'oak'}_slab`, { type: 'double' })

    // Nota: `stone_stairs` NO se convierte: en 1.14+ es un bloque real (escaleras
    // de piedra) y en 1.12 son de cobblestone; sin propiedad que los distinga,
    // preferimos no romper los modernos (los 1.12 salen como escaleras de piedra).

    default: return b
  }
}
