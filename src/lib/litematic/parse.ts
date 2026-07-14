// Punto de entrada único de parseo: detecta el formato y devuelve el modelo común.

import { decompressIfNeeded } from './gunzip'
import { parseNbt, NbtCompound } from './nbt'
import { parseLitematic } from './parseLitematic'
import { parseSchem } from './parseSchem'
import { SchematicModel } from './types'
import { SchematicTooLargeError, MAX_DECOMPRESSED_BYTES } from './limits'

export async function parseSchematicFile(file: File): Promise<SchematicModel> {
  return parseSchematicBuffer(await file.arrayBuffer(), file.name)
}

export async function parseSchematicBuffer(buf: ArrayBuffer, fileName: string): Promise<SchematicModel> {
  const bytes = await decompressIfNeeded(buf)
  // Guarda temprana: un NBT descomprimido gigante (build descomunal) colgaría
  // parseNbt construyendo un árbol JS de cientos de MB. Se corta aquí, antes.
  if (bytes.length > MAX_DECOMPRESSED_BYTES) throw new SchematicTooLargeError()
  const nbt = parseNbt(bytes)
  const lower = fileName.toLowerCase()

  if (lower.endsWith('.litematic')) return parseLitematic(nbt)
  if (lower.endsWith('.schem')) return parseSchem(nbt)

  // Extensión desconocida: deducir por contenido
  if (hasKey(nbt, 'Regions')) return parseLitematic(nbt)
  if (hasKey(nbt, 'Width') || hasKey(nbt, 'Palette') || hasKey(nbt, 'Schematic') || hasKey(nbt, 'Blocks')) {
    return parseSchem(nbt)
  }
  throw new Error('Formato no reconocido (se esperaba .litematic o .schem)')
}

function hasKey(nbt: NbtCompound, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(nbt, key)
}
