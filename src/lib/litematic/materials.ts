// Lista de materiales: lo que hay que reunir para construir la build en survival.
// Cuenta ítems, no bloques: una losa doble son dos losas, una puerta (dos bloques)
// es una, cuatro velas en un bloque son cuatro velas, una maceta con flor es una
// maceta y una flor, y lo que no se coloca con un ítem (agua, fuego, la cabeza del
// pistón) no cuenta. Vale para la build entera, una capa o el corte (ver `box`).

import { SchematicModel, BlockState, isAir } from './types'
import { baseName, getBlockColor, toHex } from './blockColors'
import { getFaceInfo } from './blockTextures'
import { displayName } from './blockNames'

export interface MaterialEntry {
  /** Clave del ítem (id sin namespace). */
  key: string
  /** Nombre en español. */
  name: string
  /** Número de ítems. */
  count: number
  /** Color de la muestra (hex). */
  hex: string
  /** Nombre de tile de textura para el icono (cara superior). */
  iconTile: string
  /** Lo que cabe en un stack: 64, 16 (carteles, estandartes...) o 1 (camas, shulkers...). */
  stack: number
  /** Entradas de paleta que lo aportan (para resaltar dónde va). */
  pals: number[]
}

/** Celdas de [min, max] (incluidos) por eje. */
export interface MaterialBox { x: [number, number]; y: [number, number]; z: [number, number] }

// Lo que no es material: aire aparte, lo que no se coloca con un ítem o solo se
// coloca en creativo (agua y lava se dejan fuera: con dos cubos el agua es
// infinita, y contar un cubo por bloque engañaría).
const NOT_MATERIAL = new Set([
  'piston_head', 'moving_piston', 'water', 'lava', 'bubble_column', 'fire', 'soul_fire',
  'nether_portal', 'end_portal', 'end_gateway', 'structure_void', 'frosted_ice',
  // Bloques técnicos: solo en creativo o con comandos.
  'barrier', 'light', 'structure_block', 'jigsaw', 'command_block', 'chain_command_block',
  'repeating_command_block', 'test_block', 'test_instance_block',
])

// Bloques que se colocan con un ítem de otro nombre.
const ITEM_OF: Record<string, string> = {
  redstone_wire: 'redstone',
  tripwire: 'string',
  kelp_plant: 'kelp',
  cave_vines: 'glow_berries', cave_vines_plant: 'glow_berries',
  twisting_vines_plant: 'twisting_vines', weeping_vines_plant: 'weeping_vines',
  bamboo_sapling: 'bamboo',
  sweet_berry_bush: 'sweet_berries',
  cocoa: 'cocoa_beans',
  wheat: 'wheat_seeds', carrots: 'carrot', potatoes: 'potato', beetroots: 'beetroot_seeds',
  melon_stem: 'melon_seeds', attached_melon_stem: 'melon_seeds',
  pumpkin_stem: 'pumpkin_seeds', attached_pumpkin_stem: 'pumpkin_seeds',
  torchflower_crop: 'torchflower_seeds', pitcher_crop: 'pitcher_pod',
  big_dripleaf_stem: 'big_dripleaf',
  // No es un ítem: hierba marina con polvo de hueso.
  tall_seagrass: 'seagrass',
  water_cauldron: 'cauldron', lava_cauldron: 'cauldron', powder_snow_cauldron: 'cauldron',
  // Se hacen con la pala o la azada sobre tierra.
  farmland: 'dirt', dirt_path: 'dirt',
  powder_snow: 'powder_snow_bucket',
}

// Plantas en maceta cuyo ítem no se llama como el bloque sin "potted_".
const POT_PLANT: Record<string, string> = {
  potted_azalea_bush: 'azalea',
  potted_flowering_azalea_bush: 'flowering_azalea',
}

// Variantes de pared: se colocan con el mismo ítem (antorcha, cartel, cabeza...).
const WALL_VARIANT = /^(.*)_wall_(torch|sign|hanging_sign|banner|head|skull|fan)$/

// Bloques con varias piezas por celda: la propiedad que dice cuántas.
const AMOUNT_PROP: Record<string, string> = {
  sea_pickle: 'pickles', snow: 'layers', turtle_egg: 'eggs',
  pink_petals: 'flower_amount', wildflowers: 'flower_amount', leaf_litter: 'segment_amount',
}
// Bloques de varias caras: un ítem por cara puesta.
const FACES_ALL = ['north', 'south', 'east', 'west', 'up', 'down']
const MULTIFACE = new Set(['glow_lichen', 'sculk_vein', 'resin_clump'])

function itemOf(base: string): string {
  if (base === 'wall_torch') return 'torch'
  const w = WALL_VARIANT.exec(base)
  if (w) return `${w[1]}_${w[2]}`
  return ITEM_OF[base] ?? base
}

/**
 * Los ítems que hacen falta para colocar un bloque: clave e ítems. Casi siempre
 * uno; dos en macetas con planta y tartas con vela; ninguno si no es material. La
 * otra mitad de algo que ya cuenta (la de arriba de una puerta, la cabecera de una
 * cama, la cabeza del pistón) lleva su ítem con 0: no suma, pero dice de qué es, y
 * al resaltar la puerta se ve entera.
 */
export function itemsFor(bs: BlockState): [string, number][] {
  if (isAir(bs.name)) return []
  const base = baseName(bs.name)
  const p = bs.properties
  if (base === 'piston_head') return [[p?.type === 'sticky' ? 'sticky_piston' : 'piston', 0]]
  if (NOT_MATERIAL.has(base)) return []

  if (base.startsWith('potted_')) return [['flower_pot', 1], [POT_PLANT[base] ?? base.slice(7), 1]]
  if (base === 'candle_cake' || base.endsWith('_candle_cake')) return [['cake', 1], [base.slice(0, -5), 1]]

  const item = itemOf(base)
  // Dos bloques, un ítem: puertas, plantas altas, plantaforma pequeña, odre...
  // (todo lo que tiene half=upper/lower; escaleras y trampillas usan top/bottom).
  if (p?.half === 'upper' || (base.endsWith('_bed') && p?.part === 'head')) return [[item, 0]]
  let n = 1
  if (base.endsWith('_slab') && p?.type === 'double') n = 2
  else if (base === 'candle' || base.endsWith('_candle')) n = num(p?.candles)
  else if (AMOUNT_PROP[base]) n = num(p?.[AMOUNT_PROP[base]])
  else if (MULTIFACE.has(base)) n = faces(p, FACES_ALL)
  else if (base === 'vine') n = faces(p, FACES_ALL.slice(0, 5))
  return [[item, n]]
}

const num = (v: string | undefined): number => Math.max(1, parseInt(v ?? '1', 10) || 1)
function faces(p: Record<string, string> | undefined, keys: string[]): number {
  let n = 0
  for (const k of keys) if (p?.[k] === 'true') n++
  return Math.max(1, n)
}

// ── Tamaño de stack ─────────────────────────────────────────────────────────

const STACK_16 = new Set(['bucket', 'snowball', 'egg', 'blue_egg', 'brown_egg', 'ender_pearl', 'honey_bottle', 'armor_stand', 'written_book'])
const STACK_1 = new Set([
  'cake', 'minecart', 'saddle', 'potion', 'splash_potion', 'lingering_potion', 'enchanted_book', 'writable_book',
  'totem_of_undying', 'elytra', 'trident', 'shield', 'bow', 'crossbow', 'fishing_rod', 'flint_and_steel', 'shears',
  'carrot_on_a_stick', 'warped_fungus_on_a_stick', 'spyglass', 'brush', 'mace', 'bundle', 'goat_horn',
  'knowledge_book', 'debug_stick', 'mushroom_stew', 'rabbit_stew', 'beetroot_soup', 'suspicious_stew', 'wolf_armor',
])
const STACK_1_END = /(_bed|shulker_box|_bucket|_boat|_raft|_minecart|_sword|_pickaxe|_axe|_shovel|_hoe|_spear|_helmet|_chestplate|_leggings|_boots|_horse_armor|_banner_pattern|_harness)$/

/** Lo que cabe en un stack de este ítem: 64, 16 o 1. */
export function stackSize(key: string): number {
  if (STACK_16.has(key) || key.endsWith('_sign') || key.endsWith('_banner')) return 16
  if (STACK_1.has(key) || key.startsWith('music_disc_') || (key !== 'bucket' && STACK_1_END.test(key))) return 1
  return 64
}

// ── Recuento ────────────────────────────────────────────────────────────────

// Ítems de cada entrada de paleta, una vez por modelo.
const palItemsCache = new WeakMap<SchematicModel, [string, number][][]>()
function palItems(model: SchematicModel): [string, number][][] {
  let v = palItemsCache.get(model)
  if (!v) { v = model.palette.map((bs) => (bs ? itemsFor(bs) : [])); palItemsCache.set(model, v) }
  return v
}

/** Celdas de cada entrada de paleta en `box` (o en todo el volumen). */
export function paletteCounts(model: SchematicModel, box?: MaterialBox): Uint32Array {
  const { width: W, height: H, length: L, blocks } = model
  const pc = new Uint32Array(model.palette.length)
  const entero = !box || (box.x[0] <= 0 && box.x[1] >= W - 1 && box.y[0] <= 0 && box.y[1] >= H - 1 && box.z[0] <= 0 && box.z[1] >= L - 1)
  if (entero) {
    const n = Math.min(blocks.length, W * H * L)
    for (let i = 0; i < n; i++) pc[blocks[i]]++
    return pc
  }
  const x0 = Math.max(0, box!.x[0]), x1 = Math.min(W - 1, box!.x[1])
  const y0 = Math.max(0, box!.y[0]), y1 = Math.min(H - 1, box!.y[1])
  const z0 = Math.max(0, box!.z[0]), z1 = Math.min(L - 1, box!.z[1])
  for (let y = y0; y <= y1; y++) {
    for (let z = z0; z <= z1; z++) {
      const row = (y * L + z) * W
      for (let x = x0; x <= x1; x++) pc[blocks[row + x]]++
    }
  }
  return pc
}

export interface MaterialList {
  entries: MaterialEntry[]
  /** Bloques que no son aire (incluidos los que no son material, como el agua). */
  blocks: number
}

/** Lista de materiales de `box` (o de la build entera), de más a menos. */
export function materialsOf(model: SchematicModel, box?: MaterialBox): MaterialList {
  const pc = paletteCounts(model, box)
  const items = palItems(model)
  const counts = new Map<string, { n: number; pals: number[] }>()
  let blocks = 0
  for (let pi = 0; pi < pc.length; pi++) {
    const c = pc[pi]
    if (!c) continue
    const bs = model.palette[pi]
    if (bs && !isAir(bs.name)) blocks += c
    for (const [key, k] of items[pi]) {
      let e = counts.get(key)
      if (!e) { e = { n: 0, pals: [] }; counts.set(key, e) }
      e.n += c * k
      e.pals.push(pi)
    }
  }
  const entries: MaterialEntry[] = []
  for (const [key, { n, pals }] of counts) {
    // Solo mitades que no cuentan (en una capa, la de arriba de una puerta).
    if (!n) continue
    entries.push({ key, count: n, name: displayName(key), hex: toHex(getBlockColor(key)), iconTile: getFaceInfo(key).tiles[2], stack: stackSize(key), pals })
  }
  entries.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'es'))
  return { entries, blocks }
}

export function computeMaterials(model: SchematicModel, box?: MaterialBox): MaterialEntry[] {
  return materialsOf(model, box).entries
}

// ── Lista marcada de antes ──────────────────────────────────────────────────

// La clave que tenía cada bloque en la lista de antes de contar por ítem: su
// nombre, con las antorchas de pared y el polvo de redstone ya juntados.
const LEGACY_OF: Record<string, string> = { redstone_wire: 'redstone', wall_torch: 'torch', redstone_wall_torch: 'redstone_torch', soul_wall_torch: 'soul_torch' }
function legacyKey(bs: BlockState): string | null {
  if (isAir(bs.name)) return null
  const base = baseName(bs.name)
  if (base === 'piston_head' || base === 'moving_piston') return null
  if ((base === 'water' || base === 'lava') && bs.properties?.level !== '0') return null
  return LEGACY_OF[base] ?? base
}

/**
 * Lo marcado con la lista de antes, pasado a la de ahora. La clave es el ítem, y
 * casi todas siguen igual; las que han cambiado (el cartel de pared ya es el
 * cartel, la maceta con flor es maceta y flor) salen marcadas solo si todo lo que
 * se juntó en ellas estaba marcado, aunque una tenga la misma clave que antes (la
 * maceta vacía marcada no vale para las macetas con flor). Devuelve solo claves de
 * ahora: se guarda aparte y no se vuelve a pasar (ver Viewer3D).
 */
export function migrateChecked(model: SchematicModel, entries: MaterialEntry[], checked: Set<string>): Set<string> {
  const out = new Set<string>()
  if (!checked.size) return out
  for (const e of entries) {
    const olds = new Set<string>()
    for (const pi of e.pals) { const k = model.palette[pi] && legacyKey(model.palette[pi]); if (k) olds.add(k) }
    if (olds.size ? [...olds].every((k) => checked.has(k)) : checked.has(e.key)) out.add(e.key)
  }
  return out
}

// ── Formatos ────────────────────────────────────────────────────────────────

/**
 * Stacks y shulkers llenas (27 stacks): "3 stacks + 12", "2 stacks de 16 + 5",
 * "1 shulker + 4 stacks". Vacío si no llega a un stack o el ítem no se apila.
 */
export function formatStacks(n: number, stack = 64): string {
  if (stack <= 1 || n < stack) return ''
  const stacks = Math.floor(n / stack)
  const rem = n % stack
  const de = stack !== 64 ? ` de ${stack}` : ''
  const st = (k: number) => `${k} ${k === 1 ? 'stack' : 'stacks'}${de}`
  if (stacks < 27) return rem ? `${st(stacks)} + ${rem}` : st(stacks)
  const boxes = Math.floor(stacks / 27)
  const stackRem = stacks % 27
  const parts = [`${boxes} ${boxes === 1 ? 'shulker' : 'shulkers'}`]
  if (stackRem) parts.push(st(stackRem))
  if (rem) parts.push(`${rem}`)
  return parts.join(' + ')
}

/** "Piedra: 3 stacks + 12"; sin stacks, el número ("Cama roja: 2"). */
export function materialLine(m: MaterialEntry): string {
  return `${m.name}: ${formatStacks(m.count, m.stack) || m.count.toLocaleString('es-ES')}`
}

/** Para copiar y pegar (Discord, un bloc de notas): una línea por material. */
export function materialsToText(titulo: string, entries: MaterialEntry[]): string {
  return [titulo, ...entries.map(materialLine)].join('\n')
}

/**
 * CSV con punto y coma (el Excel en español no separa por comas) y BOM para que
 * abra los acentos bien. `checked`: añade la columna de preparado.
 */
export function materialsToCsv(entries: MaterialEntry[], checked?: Set<string>): string {
  const q = (s: string) => /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  const head = ['Material', 'ID', 'Cantidad', 'Stacks', 'Sueltos', 'Por stack', ...(checked ? ['Preparado'] : [])]
  const rows = entries.map((m) => {
    const st = m.stack > 1 ? Math.floor(m.count / m.stack) : 0
    const rest = m.stack > 1 ? m.count % m.stack : m.count
    return [q(m.name), `minecraft:${m.key}`, m.count, st, rest, m.stack, ...(checked ? [checked.has(m.key) ? 'sí' : 'no'] : [])].join(';')
  })
  return '﻿' + [head.join(';'), ...rows].join('\r\n') + '\r\n'
}
