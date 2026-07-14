// =============================================================================
// Captura de miniatura isométrica de un schematic.
// Parsea el buffer, lo renderiza en un canvas offscreen en vista isométrica
// con fondo transparente, y devuelve un PNG cuadrado como File listo para subir.
// =============================================================================

import { parseSchematicBuffer } from './parse'
import { Atlas } from './atlas'
import { ModelDB } from './models'
import { SchematicViewer } from './SchematicViewer'
import { isTooLargeToRender, SchematicTooLargeError } from './limits'
export { SchematicTooLargeError } from './limits'

// Atlas y ModelDB son pesados (~3MB el models.json) → cachear entre capturas.
let atlasP: Promise<Atlas> | null = null
let dbP:    Promise<ModelDB> | null = null
const getAtlas = () => (atlasP ??= Atlas.load())
const getDB    = () => (dbP    ??= ModelDB.load())

const raf = () => new Promise<void>(r => requestAnimationFrame(() => r()))

/**
 * Genera una miniatura isométrica (PNG cuadrado, fondo transparente) de un
 * schematic `.litematic`/`.schem` a partir de su ArrayBuffer.
 */
export async function generateIsoThumbnail(
  buffer: ArrayBuffer,
  fileName: string,
  size = 1280,
): Promise<File> {
  const [first] = await generateIsoThumbnails(buffer, fileName, size, 1)
  return first
}

/**
 * Genera N miniaturas isométricas (PNG cuadrado, fondo transparente) rotando la
 * cámara 90° entre cada una. Por defecto 4 (las 4 esquinas isométricas).
 */
export async function generateIsoThumbnails(
  buffer: ArrayBuffer,
  fileName: string,
  size = 1280,
  count = 4,
): Promise<File[]> {
  const model = await parseSchematicBuffer(buffer, fileName)
  // Builds descomunales no se pueden renderizar en el navegador (la malla
  // desborda y sale rota). Abortamos aquí para que el flujo de subida pida una
  // imagen manual en vez de generar una miniatura bugueada.
  if (isTooLargeToRender(model)) throw new SchematicTooLargeError()
  const [atlas, db] = await Promise.all([getAtlas(), getDB()])

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size

  const viewer = new SchematicViewer(canvas)
  try {
    viewer.setAtlas(atlas)
    viewer.setModelDB(db)
    // Esperar al atlas de entidades ANTES de construir el mesh: si no, los cofres,
    // shulkers, etc. salen con el modelo placeholder de tablones en la miniatura.
    await viewer.whenEntityReady()
    viewer.load(model)
    await viewer.waitForIdle() // espera a que el Web Worker termine el mesh

    const base = (fileName.replace(/\.[^.]+$/, '').replace(/[^\w-]+/g, '_') || 'preview')
    const files: File[] = []
    for (let t = 0; t < count; t++) {
      const blob = await viewer.captureIso(size, t)
      if (!blob) throw new Error('No se pudo generar la imagen del schematic')
      files.push(new File([blob], `${base}_iso${t + 1}.png`, { type: 'image/png' }))
    }
    return files
  } finally {
    viewer.dispose()
  }
}
