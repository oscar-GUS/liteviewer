// Lista de materiales: cuenta los bloques no-aire por "ítem" y los ordena.

import { SchematicModel, isAir } from './types'
import { baseName, getBlockColor, toHex } from './blockColors'
import { getFaceInfo } from './blockTextures'
import { displayName } from './blockNames'

export interface MaterialEntry {
  /** Clave del ítem (nombre base). */
  key: string
  /** Nombre en español. */
  name: string
  /** Número de bloques. */
  count: number
  /** Color de la muestra (hex). */
  hex: string
  /** Nombre de tile de textura para el icono (cara superior). */
  iconTile: string
}

// Algunos bloques se obtienen de un ítem distinto al colocado.
const ITEM_OVERRIDES: Record<string, string> = {
  redstone_wire: 'redstone',
  wall_torch: 'torch',
  redstone_wall_torch: 'redstone_torch',
  soul_wall_torch: 'soul_torch',
}

function itemKey(name: string): string {
  const base = baseName(name)
  return ITEM_OVERRIDES[base] ?? base
}

// Bloques que aparecen en el mundo pero NO son un material/ítem colocable.
const NON_MATERIAL = new Set(['piston_head', 'moving_piston'])

// Fluidos con level>0 son variantes "en movimiento", no son ítems colocables.
const FLUID_BLOCKS = new Set(['lava', 'water'])

export function computeMaterials(model: SchematicModel): MaterialEntry[] {
  // Clave de ítem por índice de paleta (null = aire o bloque no-material)
  const idxKey: (string | null)[] = model.palette.map((p) => {
    if (isAir(p.name) || NON_MATERIAL.has(baseName(p.name))) return null
    const base = baseName(p.name)
    if (FLUID_BLOCKS.has(base) && p.properties?.level !== '0') return null
    return itemKey(p.name)
  })

  const counts = new Map<string, number>()
  const blocks = model.blocks
  for (let i = 0; i < blocks.length; i++) {
    const k = idxKey[blocks[i]]
    if (k) counts.set(k, (counts.get(k) ?? 0) + 1)
  }

  const entries: MaterialEntry[] = []
  for (const [key, count] of counts) {
    entries.push({ key, count, name: displayName(key), hex: toHex(getBlockColor(key)), iconTile: getFaceInfo(key).tiles[2] })
  }
  entries.sort((a, b) => b.count - a.count)
  return entries
}

/** Lista de materiales como texto plano (para descargar en .txt). */
export function materialsToText(model: SchematicModel, entries: MaterialEntry[]): string {
  const lines: string[] = [
    model.name || 'Schematic',
    `Dimensiones: ${model.width} x ${model.height} x ${model.length}`,
    `Total: ${model.totalBlocks.toLocaleString('es-ES')} bloques · ${entries.length} tipos`,
    '',
  ]
  for (const m of entries) {
    const stacks = formatStacks(m.count)
    lines.push(`${String(m.count).padStart(8)}  ${m.name}${stacks ? `  (${stacks})` : ''}`)
  }
  return lines.join('\r\n')
}

/** Detalle en stacks (64) y cajas shulker (27 stacks). Vacío si n < 64. */
export function formatStacks(n: number): string {
  if (n < 64) return ''
  const stacks = Math.floor(n / 64)
  const rem = n % 64
  if (stacks < 27) {
    return rem ? `${stacks} st + ${rem}` : `${stacks} st`
  }
  const boxes = Math.floor(stacks / 27)
  const stackRem = stacks % 27
  const parts = [`${boxes} cajas`]
  if (stackRem) parts.push(`${stackRem} st`)
  if (rem) parts.push(`${rem}`)
  return parts.join(' + ')
}
