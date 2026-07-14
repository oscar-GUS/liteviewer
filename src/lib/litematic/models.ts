// Resolver runtime de modelos de bloque (carga public/models.json horneado).
// Dado un bloque + propiedades, devuelve los modelos a instanciar (con rotación de
// blockstate). El parseo pesado ya está hecho en tools/build-models.mjs.

import { baseName } from './blockColors'
import { asset } from './assets'

export interface BakedFace {
  tile: string
  uv: [number, number, number, number]
  rot: number
  cull: string | null
  tint: 0 | 1
}
export interface BakedElement {
  from: [number, number, number]
  to: [number, number, number]
  rotation: { origin: [number, number, number]; axis: 'x' | 'y' | 'z'; angle: number; rescale?: boolean } | null
  shade: boolean
  faces: Record<string, BakedFace>
}
export interface BakedModel { elements: BakedElement[] }

interface Apply { model: number; x: number; y: number; uvlock: boolean }
interface Variant { when: Record<string, string>; apply: Apply[] }
type WhenCond = Record<string, string> | { OR: WhenCond[] } | { AND: WhenCond[] }
interface MultipartCase { when: WhenCond | null; apply: Apply[] }
interface BlockDef { variants?: Variant[]; multipart?: MultipartCase[] }
export interface ModelsData { blocks: Record<string, BlockDef>; models: BakedModel[] }

export interface ResolvedPart { model: BakedModel; x: number; y: number; uvlock: boolean }

// Bloques que no están en la base horneada pero equivalen a otro idéntico.
// `chain` (cadena clásica) usa la misma geometría/property `axis` que `iron_chain`.
const BLOCK_ALIASES: Record<string, string> = {
  chain: 'iron_chain',
  grass_path: 'dirt_path', // nombre legacy (<=1.16); vanilla lo renombró a dirt_path

  // ── Nombres legacy de Minecraft 1.12 y anteriores (pre-Flattening 1.13) ──────
  // Muchos schematics viejos usan estos IDs; sin alias caen al cubo wireframe.
  // El alias reusa el modelo del bloque moderno equivalente (misma geometría).
  grass:                  'grass_block',
  golden_rail:            'powered_rail',
  stonebrick:             'stone_bricks',
  fence:                  'oak_fence',
  fence_gate:             'oak_fence_gate',
  wooden_door:            'oak_door',
  wooden_button:          'oak_button',
  wooden_pressure_plate:  'oak_pressure_plate',
  trapdoor:               'oak_trapdoor',
  sign:                   'oak_sign',
  wall_sign:              'oak_wall_sign',
  unpowered_repeater:     'repeater',
  powered_repeater:       'repeater',
  unpowered_comparator:   'comparator',
  powered_comparator:     'comparator',
  unlit_redstone_torch:   'redstone_torch',
  lit_furnace:            'furnace',
  lit_redstone_lamp:      'redstone_lamp',
  lit_pumpkin:            'jack_o_lantern',
  web:                    'cobweb',
  snow_layer:             'snow',
  slime:                  'slime_block',
  noteblock:              'note_block',
  magma:                  'magma_block',
  quartz_ore:             'nether_quartz_ore',
  mob_spawner:            'spawner',
  lit_redstone_ore:       'redstone_ore',
  reeds:                  'sugar_cane',
  melon_block:            'melon',
  waterlily:              'lily_pad',
  brick_block:            'bricks',
  hardened_clay:          'terracotta',
}

function matchProps(when: Record<string, string>, props: Record<string, string>): boolean {
  for (const k in when) {
    // El valor puede venir como booleano/número en el JSON; normalizar a string.
    const expected = String(when[k]).split('|')
    if (!expected.includes(props[k])) return false
  }
  return true
}

function matchWhen(when: WhenCond, props: Record<string, string>): boolean {
  const w = when as { OR?: WhenCond[]; AND?: WhenCond[] }
  if (Array.isArray(w.OR)) return w.OR.some((c) => matchWhen(c, props))
  if (Array.isArray(w.AND)) return w.AND.every((c) => matchWhen(c, props))
  return matchProps(when as Record<string, string>, props)
}

export class ModelDB {
  private data: ModelsData
  private constructor(data: ModelsData) { this.data = data }

  static fromRaw(data: ModelsData): ModelDB { return new ModelDB(data) }
  getRawData(): ModelsData { return this.data }

  static async load(url = asset('models.json')): Promise<ModelDB> {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`No se pudo cargar ${url} (${res.status})`)
    return new ModelDB(await res.json())
  }

  /** Modelos a instanciar para un bloque, o null si no está en la base. */
  resolve(name: string, properties?: Record<string, string>): ResolvedPart[] | null {
    const key = baseName(name)
    const aliased = !this.data.blocks[key] && !!BLOCK_ALIASES[key]
    const def = this.data.blocks[key] ?? this.data.blocks[BLOCK_ALIASES[key]]
    if (!def) return null
    // Bloque aliasado sin `axis` (p. ej. chain sin propiedad): por defecto vertical.
    const props = aliased && (!properties || properties.axis === undefined)
      ? { ...(properties ?? {}), axis: 'y' }
      : (properties ?? {})
    const out: ResolvedPart[] = []

    if (def.variants) {
      // primera variante cuyas props casan (las claves vacías {} casan siempre)
      const v = def.variants.find((va) => matchProps(va.when, props))
      if (!v) return null
      for (const a of v.apply) out.push({ model: this.data.models[a.model], x: a.x, y: a.y, uvlock: a.uvlock })
    } else if (def.multipart) {
      let effProps = props
      // Muros: el poste central va condicionado a `up:true`. Si un muro llega sin
      // esa propiedad (o en false) y sin conexiones horizontales, ningún caso casa
      // y el bloque se dibujaría como cubo macizo (fallback). Vanilla siempre pone
      // up=true en un muro aislado, así que lo forzamos para que salga el poste.
      if (key.endsWith('_wall') && props.up !== 'true'
          && props.north !== 'low' && props.north !== 'tall'
          && props.east  !== 'low' && props.east  !== 'tall'
          && props.south !== 'low' && props.south !== 'tall'
          && props.west  !== 'low' && props.west  !== 'tall') {
        effProps = { ...props, up: 'true' }
      }
      for (const part of def.multipart) {
        if (part.when && !matchWhen(part.when, effProps)) continue
        for (const a of part.apply) out.push({ model: this.data.models[a.model], x: a.x, y: a.y, uvlock: a.uvlock })
      }
    }
    return out
  }
}
