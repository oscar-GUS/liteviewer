// Límite de tamaño para renderizar/previsualizar en 3D.
//
// Un navegador no puede montar una malla texturada de millones de bloques
// (cientos de millones de vértices → se queda sin memoria y la geometría se
// trunca, saliendo un render roto tipo "wireframe transparente"). Por encima de
// este umbral mostramos un aviso limpio en vez de intentar renderizar.

// nº de bloques no-aire. Con greedy meshing los quads reales son bastantes
// menos que el nº de bloques (caras interiores descartadas), y el mesher trunca
// con elegancia en MAX_QUADS=8M sin colgar. El cuelgue de verdad lo evitan el
// volumen y el tamaño descomprimido; este umbral solo corta builds tan densos
// que saldrían con la malla truncada. 6M cubre farms grandes (4M+) sin problema.
export const MAX_RENDER_BLOCKS = 6_000_000
export const MAX_RENDER_VOLUME = 96_000_000       // ancho·alto·largo (celdas)
// Tope del NBT ya descomprimido: por encima, ni parseamos (parseNbt construiría
// un árbol JS de cientos de MB y colgaría el navegador). Un build normal
// descomprime a pocos MB; los monstruos (p.ej. 662 MB) se cortan aquí.
export const MAX_DECOMPRESSED_BYTES = 200 * 1024 * 1024

interface Dim { totalBlocks: number; width: number; height: number; length: number }

/** ¿Es demasiado grande para previsualizar en 3D de forma fiable? */
export function isTooLargeToRender(m: Dim): boolean {
  return m.totalBlocks > MAX_RENDER_BLOCKS
    || (m.width * m.height * m.length) > MAX_RENDER_VOLUME
}

/** Error lanzado al parsear/renderizar un schematic demasiado grande. `message`
 *  es un código estable ('SCHEMATIC_TOO_LARGE') para comprobaciones programáticas. */
export class SchematicTooLargeError extends Error {
  width: number; height: number; length: number
  constructor(width = 0, height = 0, length = 0) {
    super('SCHEMATIC_TOO_LARGE')
    this.name = 'SchematicTooLargeError'
    this.width = width; this.height = height; this.length = length
  }
}

/** ¿El volumen (bounding box) es tan grande que ni siquiera conviene parsear el
 *  array de bloques (asignaría cientos de MB y colgaría el navegador)? */
export function volumeTooLargeToParse(width: number, height: number, length: number): boolean {
  return (width * height * length) > MAX_RENDER_VOLUME
}
