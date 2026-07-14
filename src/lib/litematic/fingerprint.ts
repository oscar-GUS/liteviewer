// Huella de una schematic para detectar duplicados: dimensiones + histograma de
// bloques (cuántos de cada tipo, sin aire) + hash de la firma canónica.
import type { SchematicModel } from './types'
import { isAir } from './types'

export interface SchematicFingerprint {
  hash:   string                  // sha-256 hex de la firma canónica (match exacto = misma build)
  w:      number
  h:      number
  l:      number
  total:  number                  // bloques no-aire
  blocks: Record<string, number>  // histograma id->cantidad
}

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function computeFingerprint(m: SchematicModel): Promise<SchematicFingerprint> {
  const blocks: Record<string, number> = {}
  let total = 0
  for (let i = 0; i < m.blocks.length; i++) {
    const bs = m.palette[m.blocks[i]]
    if (!bs || isAir(bs.name)) continue
    blocks[bs.name] = (blocks[bs.name] ?? 0) + 1
    total++
  }
  const canon = `${m.width}x${m.height}x${m.length}|` +
    Object.keys(blocks).sort().map(k => `${k}:${blocks[k]}`).join(',')
  return { hash: await sha256Hex(canon), w: m.width, h: m.height, l: m.length, total, blocks }
}

// Similitud 0..1 entre dos huellas. Hash igual = 1 (misma build). Si no, similitud
// de COMPOSICIÓN (Bray-Curtis sobre proporciones normalizadas), penalizada por
// diferencia de volumen.
//
// Antes usábamos coseno de los conteos crudos, pero en builds de terreno el bloque
// mayoritario (piedra de la base subterránea) domina el vector en ambas y el coseno
// se quedaba altísimo aunque el resto no tuviera nada que ver (p.ej. una cascada y
// un volcán daban 92%). Normalizando a proporciones y midiendo la diferencia de
// mezcla, dos builds distintos divergen y solo los duplicados reales quedan ≈1.
export function fingerprintSimilarity(a: SchematicFingerprint, b: SchematicFingerprint): number {
  if (a.hash === b.hash) return 1

  const sumA = a.total || Object.values(a.blocks).reduce((x, y) => x + y, 0) || 1
  const sumB = b.total || Object.values(b.blocks).reduce((x, y) => x + y, 0) || 1

  // L1 entre las distribuciones de proporciones (0 = idénticas, 2 = disjuntas).
  let l1 = 0
  const keys = new Set([...Object.keys(a.blocks), ...Object.keys(b.blocks)])
  for (const k of keys) {
    l1 += Math.abs((a.blocks[k] ?? 0) / sumA - (b.blocks[k] ?? 0) / sumB)
  }
  const composicion = 1 - l1 / 2   // Bray-Curtis: 1 = misma mezcla, 0 = sin solape

  // Penalización por diferencia de volumen (mismas dims ≈ 1, muy distintas baja).
  const volA = a.w * a.h * a.l, volB = b.w * b.h * b.l
  const volRatio = Math.min(volA, volB) / Math.max(volA, volB || 1)
  return composicion * (0.5 + 0.5 * volRatio)
}
