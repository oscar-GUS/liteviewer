// Modelo común al que se normalizan ambos formatos (.litematic y .schem).
// Todo el render, materiales y controles trabajan sobre este modelo, sin saber
// de qué formato vino.

import type { NbtCompound, NbtValue } from './nbt'

/** Un ítem dentro de un contenedor. */
export interface ContainerItem {
  /** Hueco (índice de slot). */
  slot: number
  /** Id del ítem, p.ej. "minecraft:redstone". */
  id: string
  /** Cantidad. */
  count: number
}

/** Contenido de un contenedor (hopper, cofre, barril…). */
export interface ContainerInfo {
  items: ContainerItem[]
  /** Total de ítems (suma de Count). */
  total: number
  /** Huecos ocupados. */
  slots: number
  /** Huecos bloqueados (crafter), por índice de slot. */
  disabled?: number[]
}

/** Texto de un cartel: líneas de la cara frontal y trasera. */
export interface SignText { front: string[]; back: string[] }

function componentToText(j: unknown): string {
  if (typeof j === 'string') return j
  if (typeof j === 'number' || typeof j === 'boolean') return String(j)
  if (Array.isArray(j)) return j.map(componentToText).join('')
  if (j && typeof j === 'object') {
    const o = j as Record<string, unknown>
    let out = typeof o.text === 'string' ? o.text : ''
    if (Array.isArray(o.extra)) out += (o.extra as unknown[]).map(componentToText).join('')
    return out
  }
  return ''
}

// Una línea de cartel viene como componente JSON ('{"text":"x"}'), string JSON o texto plano.
function plainComponent(s: string): string {
  const t = s.trim()
  if (!t || t === '""') return ''
  if (t[0] === '{' || t[0] === '[' || t[0] === '"') {
    try { return componentToText(JSON.parse(t)) } catch { /* texto plano */ }
  }
  return t
}

function readSignSide(side: NbtValue | undefined): string[] {
  if (!side || typeof side !== 'object' || Array.isArray(side) || ArrayBuffer.isView(side)) return []
  const msgs = (side as NbtCompound).messages
  if (!Array.isArray(msgs)) return []
  return (msgs as NbtValue[]).map((m) => (typeof m === 'string' ? plainComponent(m) : ''))
}

function trimTail(arr: string[]): string[] {
  while (arr.length && arr[arr.length - 1] === '') arr.pop()
  return arr
}

/** Lee el texto de un cartel (1.20+ front_text/back_text o legado Text1..4), o null. */
export function readSignText(te: NbtCompound): SignText | null {
  let front = readSignSide(te.front_text)
  const back = trimTail(readSignSide(te.back_text))
  if (front.length === 0) {
    const legacy = [te.Text1, te.Text2, te.Text3, te.Text4].map((t) => (typeof t === 'string' ? plainComponent(t) : ''))
    if (legacy.some((l) => l !== '')) front = legacy
  }
  front = trimTail(front)
  if (front.length === 0 && back.length === 0) return null
  return { front, back }
}

function readDisabledSlots(v: NbtValue | undefined): number[] {
  if (!v) return []
  if (ArrayBuffer.isView(v)) return Array.from(v as Int32Array)
  if (Array.isArray(v)) return (v as NbtValue[]).filter((n) => typeof n === 'number') as number[]
  return []
}

/** Lee `Items` (+ `disabled_slots` del crafter) de un tile-entity, o null si vacío. */
export function readContainerItems(te: NbtCompound): ContainerInfo | null {
  const raw = te.Items
  const items: ContainerItem[] = []
  let total = 0
  if (Array.isArray(raw)) {
    for (const it of raw as NbtValue[]) {
      if (!it || typeof it !== 'object' || Array.isArray(it) || ArrayBuffer.isView(it)) continue
      const comp = it as NbtCompound
      const count = Number(comp.Count ?? comp.count ?? 0)
      const id = typeof comp.id === 'string' ? comp.id : ''
      if (count <= 0 || !id) continue
      items.push({ slot: Number(comp.Slot ?? comp.slot ?? items.length), id, count })
      total += count
    }
  }
  const disabled = readDisabledSlots(te.disabled_slots)
  if (items.length === 0 && disabled.length === 0) return null
  return { items, total, slots: items.length, disabled: disabled.length ? disabled : undefined }
}

export interface BlockState {
  /** Id completo con namespace, p.ej. "minecraft:oak_log". */
  name: string
  /** Propiedades del block state, p.ej. { axis: "y", facing: "north" }. */
  properties?: Record<string, string>
  /**
   * Solo cabezas de jugador con skin propio en el NBT: key en el atlas de
   * entidad (dinámico) de su textura. La usa `buildSkull` en vez de la de Steve.
   * Se resuelve en el parser expandiendo la paleta (una entrada por skin).
   */
  skin?: string
}

/**
 * Un `minecraft:moving_piston` es un block entity que GUARDA el bloque real que
 * está siendo empujado (o la cabeza del pistón) en su NBT `blockState`. Lee ese
 * bloque para poder pintar la textura correcta en vez de un cubo sin textura.
 */
export function readMovingPiston(te: NbtCompound): BlockState | null {
  const bsRaw = (te.blockState ?? te.block_state) as NbtValue | undefined
  if (!bsRaw || typeof bsRaw !== 'object' || Array.isArray(bsRaw) || ArrayBuffer.isView(bsRaw)) return null
  const bs = bsRaw as NbtCompound
  const name = bs.Name
  if (typeof name !== 'string' || !name) return null
  const props: Record<string, string> = {}
  const propsRaw = bs.Properties
  if (propsRaw && typeof propsRaw === 'object' && !Array.isArray(propsRaw) && !ArrayBuffer.isView(propsRaw)) {
    for (const [k, v] of Object.entries(propsRaw as NbtCompound)) props[k] = String(v)
  }
  return { name, properties: Object.keys(props).length ? props : undefined }
}

function asCompound(v: NbtValue | undefined): NbtCompound | null {
  return v && typeof v === 'object' && !Array.isArray(v) && !ArrayBuffer.isView(v) ? (v as NbtCompound) : null
}

/**
 * Textura de una cabeza de jugador desde su block entity, o null si no tiene.
 * Devuelve el HASH de la skin (último segmento de la URL de textures.minecraft.net),
 * que el viewer resuelve por proxy. Formatos:
 *   1.20.5+: profile { properties: [ { name:"textures", value:"<b64>" } ] }
 *   antiguo: SkullOwner { Properties: { textures: [ { Value:"<b64>" } ] } }
 * El base64 decodifica a JSON con { textures: { SKIN: { url } } }.
 */
export function readSkullTexture(te: NbtCompound): string | null {
  const b64 = skullTextureB64(te)
  if (!b64) return null
  let json: string
  try { json = atob(b64) } catch { return null }
  const m = json.match(/textures\.minecraft\.net\/texture\/([0-9a-fA-F]+)/)
  return m ? m[1].toLowerCase() : null
}

function isPlayerHeadName(name: string): boolean {
  const b = name.includes(':') ? name.slice(name.indexOf(':') + 1) : name
  return b === 'player_head' || b === 'player_wall_head'
}

/**
 * Expande la paleta con una entrada sintética por cada cabeza de jugador con skin
 * propio: clona su block state añadiéndole `skin` (key del atlas dinámico) y
 * reapunta la celda. Deduplica por skin (misma textura → misma key) y por
 * (entrada original + key). Muta `blocks` y `palette`. Devuelve key -> hash, o
 * undefined si no hay ninguna. Mismo patrón que la sustitución de moving_piston.
 */
export function expandSkullPalette(
  skullTex: Map<number, string>,
  blocks: Uint16Array,
  palette: BlockState[],
): Map<string, string> | undefined {
  if (!skullTex.size) return undefined
  const skins = new Map<string, string>()        // key -> hash
  const hashToKey = new Map<string, string>()    // hash -> key (dedupe skins)
  const synthToIndex = new Map<string, number>() // "gi0#key" -> índice paleta
  for (const [cell, hash] of skullTex) {
    const gi0 = blocks[cell]
    const bs0 = palette[gi0]
    if (!bs0 || !isPlayerHeadName(bs0.name)) continue
    let key = hashToKey.get(hash)
    if (!key) { key = `skull/custom_${hashToKey.size}`; hashToKey.set(hash, key); skins.set(key, hash) }
    const sk = gi0 + '#' + key
    let gi = synthToIndex.get(sk)
    if (gi === undefined) { gi = palette.length; palette.push({ ...bs0, skin: key }); synthToIndex.set(sk, gi) }
    blocks[cell] = gi
  }
  return skins.size ? skins : undefined
}

function skullTextureB64(te: NbtCompound): string | null {
  // Moderno: profile.properties = lista de { name, value }
  const profile = asCompound(te.profile)
  if (profile && Array.isArray(profile.properties)) {
    for (const p of profile.properties as NbtValue[]) {
      const c = asCompound(p)
      if (c && c.name === 'textures' && typeof c.value === 'string') return c.value
    }
  }
  // Antiguo: SkullOwner.Properties.textures = lista de { Value }
  const owner = asCompound(te.SkullOwner)
  const propsComp = owner && asCompound(owner.Properties)
  if (propsComp && Array.isArray(propsComp.textures)) {
    const first = asCompound((propsComp.textures as NbtValue[])[0])
    if (first && typeof first.Value === 'string') return first.Value
  }
  return null
}

export interface SchematicModel {
  name: string
  author?: string
  /** Tamaño en X. */
  width: number
  /** Tamaño en Y (altura). */
  height: number
  /** Tamaño en Z. */
  length: number
  /** Paleta: índice -> block state. */
  palette: BlockState[]
  /**
   * width*height*length índices de paleta, en orden canónico
   * idx = (y * length + z) * width + x.
   * Las celdas vacías referencian una entrada de paleta de aire.
   */
  blocks: Uint16Array
  /** Número de bloques no-aire. */
  totalBlocks: number
  source: 'litematic' | 'schem'
  /** Contenido de contenedores no vacíos, por índice de celda canónico. */
  containers?: Map<number, ContainerInfo>
  /** Texto de carteles, por índice de celda canónico. */
  signs?: Map<number, SignText>
  /** Item frames (entidades), con su celda, orientación y el ítem que contienen. */
  itemFrames?: ItemFrame[]
  /** Minecarts (entidades libres): posición, tipo y giro. */
  minecarts?: Minecart[]
  /** Armor stands (entidades libres): posición y giro. */
  armorStands?: ArmorStand[]
  /** Barcos (entidades libres): posición, madera, cofre y giro. */
  boats?: Boat[]
  /**
   * Cabezas de jugador con skin propio: key del atlas de entidad -> hash de la
   * textura en textures.minecraft.net. El viewer las descarga (vía proxy) y las
   * compone en el atlas de entidad dinámico. Solo presente si hay alguna.
   */
  skins?: Map<string, string>
}

/** Minecart (entidad): celda que ocupa, variante y giro en Y (grados). */
export interface Minecart {
  x: number; y: number; z: number
  /** Bloque interior que representa la variante, o null si es un minecart vacío. */
  content: string | null
  yaw: number
}

/** Armor stand (entidad): celda que ocupa y giro en Y (grados). */
export interface ArmorStand {
  x: number; y: number; z: number
  yaw: number
}

/** Lee un armor stand de una entidad NBT (giro); null si no lo es. */
export function readArmorStandMeta(e: NbtCompound): { yaw: number } | null {
  const id = String((e.id ?? (e as Record<string, unknown>).Id ?? '')).replace('minecraft:', '')
  if (id !== 'armor_stand') return null
  const rot = e.Rotation as unknown
  let yaw = 0
  if (Array.isArray(rot) && rot.length >= 1) yaw = Number(rot[0])
  else if (ArrayBuffer.isView(rot) && (rot as Float32Array).length >= 1) yaw = (rot as Float32Array)[0]
  return { yaw: Number.isFinite(yaw) ? yaw : 0 }
}

// Mapa id de entidad → bloque interior que se dibuja dentro del minecart.
const MINECART_CONTENT: Record<string, string | null> = {
  minecart:               null,
  hopper_minecart:        'hopper',
  chest_minecart:         'chest',
  furnace_minecart:       'furnace',
  tnt_minecart:           'tnt',
  command_block_minecart: 'command_block',
  spawner_minecart:       'spawner',
}

/** Lee un minecart de una entidad NBT (tipo + giro); null si no lo es. El caller pone x,y,z. */
export function readMinecartMeta(e: NbtCompound): { content: string | null; yaw: number } | null {
  const id = String((e.id ?? (e as Record<string, unknown>).Id ?? '')).replace('minecraft:', '')
  if (!(id in MINECART_CONTENT)) return null
  const rot = e.Rotation as unknown
  let yaw = 0
  if (Array.isArray(rot) && rot.length >= 1) yaw = Number(rot[0])
  else if (ArrayBuffer.isView(rot) && (rot as Float32Array).length >= 1) yaw = (rot as Float32Array)[0]
  return { content: MINECART_CONTENT[id], yaw: Number.isFinite(yaw) ? yaw : 0 }
}

// Maderas con textura de barco disponibles en el atlas (el bambú es balsa, otro modelo).
const BOAT_WOODS = new Set(['oak','spruce','birch','jungle','acacia','dark_oak','mangrove','cherry','pale_oak'])

/** Barco (entidad libre): posición, madera, si lleva cofre y giro en Y (grados). */
export interface Boat {
  x: number; y: number; z: number
  variant: string
  chest: boolean
  yaw: number
}

/** Lee un barco de una entidad NBT (madera + cofre + giro); null si no lo es. */
export function readBoatMeta(e: NbtCompound): { variant: string; chest: boolean; yaw: number } | null {
  const id = String((e.id ?? (e as Record<string, unknown>).Id ?? '')).replace('minecraft:', '')
  let variant: string | null = null
  let chest = false
  if (id === 'boat' || id === 'chest_boat') {
    // Formato antiguo: id genérico + Type = madera.
    chest = id === 'chest_boat'
    variant = typeof e.Type === 'string' ? e.Type.replace('minecraft:', '') : 'oak'
  } else {
    // Formato moderno: id por madera (oak_boat / oak_chest_boat).
    const mChest = id.match(/^(.+)_chest_boat$/)
    const mBoat = id.match(/^(.+)_boat$/)
    if (mChest) { variant = mChest[1]; chest = true }
    else if (mBoat) variant = mBoat[1]
  }
  if (!variant || !BOAT_WOODS.has(variant)) return null   // balsas de bambú fuera por ahora
  const rot = e.Rotation as unknown
  let yaw = 0
  if (Array.isArray(rot) && rot.length >= 1) yaw = Number(rot[0])
  else if (ArrayBuffer.isView(rot) && (rot as Float32Array).length >= 1) yaw = (rot as Float32Array)[0]
  return { variant, chest, yaw: Number.isFinite(yaw) ? yaw : 0 }
}

/** Item frame (marco): celda que ocupa, cara a la que mira y el ítem dentro. */
export interface ItemFrame {
  x: number; y: number; z: number
  facing: number   // 0 down, 1 up, 2 north, 3 south, 4 west, 5 east
  rotation: number // 0..7 (cada paso = 45°)
  item: string | null
  glow: boolean
}

/** Lee la metadata de un item frame de una entidad NBT, o null si no lo es. */
export function readItemFrameMeta(e: NbtCompound): { facing: number; rotation: number; item: string | null; glow: boolean } | null {
  const id = String((e.id ?? (e as Record<string, unknown>).Id ?? '')).replace('minecraft:', '')
  if (id !== 'item_frame' && id !== 'glow_item_frame') return null
  const itemC = e.Item as NbtCompound | undefined
  const rawId = itemC ? String(itemC.id ?? (itemC as Record<string, unknown>).Id ?? '') : ''
  const item = rawId ? rawId.replace('minecraft:', '') : null
  return { facing: Number(e.Facing ?? 0), rotation: Number(e.ItemRotation ?? 0), item, glow: id === 'glow_item_frame' }
}

/** Índice canónico de una celda dentro de `blocks`. */
export function cellIndex(width: number, length: number, x: number, y: number, z: number): number {
  return (y * length + z) * width + x
}

const AIR_NAMES = new Set([
  'minecraft:air', 'minecraft:cave_air', 'minecraft:void_air',
  'air', 'cave_air', 'void_air',
])

/** ¿Es un bloque de aire (no se renderiza ni cuenta como material)? */
export function isAir(name: string): boolean {
  return AIR_NAMES.has(name)
}
