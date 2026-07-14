// Atlas de iconos de ÍTEM (public/item-atlas.png + .json), generado por
// tools/build-item-atlas.mjs. Da el estilo CSS para pintar el icono de un ítem
// puro (espada, comida, redstone…) que no tiene textura de bloque. Singleton:
// se carga una vez y avisa a los suscriptores para que repinten cuando llega.

import { asset } from './assets'

interface ItemAtlasData {
  size: { w: number; h: number }
  cell: number
  cols: number
  tiles: Record<string, number>
}

let DATA: ItemAtlasData | null = null
let loading: Promise<void> | null = null
const subs = new Set<() => void>()

export function ensureItemAtlas(): void {
  if (DATA || loading) return
  loading = fetch(asset('item-atlas.json'))
    .then((r) => r.json())
    .then((d: ItemAtlasData) => { DATA = d; subs.forEach((f) => f()) })
    .catch(() => { /* sin atlas de ítems: se cae a color plano */ })
}

export function onItemAtlasLoad(cb: () => void): () => void {
  subs.add(cb)
  return () => { subs.delete(cb) }
}

// Estilo CSS (sprite) para el icono de un ítem de `px` px, o null si no está.
export function itemIconStyle(name: string, px: number): Record<string, string> | null {
  if (!DATA) return null
  const id = name.replace(/^minecraft:/, '').replace(/\[.*$/, '')
  const idx = DATA.tiles[id]
  if (idx === undefined) return null
  const { cell, cols, size } = DATA
  const col = idx % cols, row = Math.floor(idx / cols), scale = px / cell
  return {
    backgroundImage: `url(${asset('item-atlas.png')})`,
    backgroundSize: `${size.w * scale}px ${size.h * scale}px`,
    backgroundPosition: `-${col * cell * scale}px -${row * cell * scale}px`,
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated',
  }
}
