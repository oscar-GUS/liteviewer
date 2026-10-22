// Recursos del visor que no dependen del schematic: atlas de bloques, models.json
// y manifiesto del atlas de entidades. Se piden UNA vez por página y los comparten
// todos los visores y las capturas de miniatura. models.json son ~3,8 MB de JSON y
// el atlas genera sus mipmaps en el hilo principal (60-250 ms): antes la ficha los
// volvía a pedir en cada montaje, y en serie detrás del parseo del archivo.
//
// Si una carga falla, la promesa se olvida para que el siguiente intento la repita
// en vez de heredar el error hasta recargar la página.

import { Atlas } from './atlas'
import { ModelDB } from './models'
import { asset } from './assets'
import type { EntityManifest } from './blockEntities'

function unaVez<T>(cargar: () => Promise<T>): () => Promise<T> {
  let p: Promise<T> | null = null
  return () => {
    if (!p) {
      const nueva = cargar()
      p = nueva
      nueva.catch(() => { if (p === nueva) p = null })
    }
    return p
  }
}

/** Atlas de bloques (atlas.png + atlas.json), cacheado por página. */
export const loadAtlas = unaVez(() => Atlas.load())

/** Modelos de bloque horneados (models.json), cacheados por página. */
export const loadModelDB = unaVez(() => ModelDB.load())

/**
 * Manifiesto del atlas de entidades (cofres, shulkers, cabezas...). Va sin caché
 * del navegador (`no-cache`, revalida) porque la textura cuelga de la huella `v`
 * que trae dentro (ver SchematicViewer.loadEntityAtlas); dentro de la página basta
 * con pedirlo una vez. LitematicViewer lo lanza en paralelo con la descarga del
 * archivo para que el visor no tenga que esperarlo al mallar.
 */
export const loadEntityManifest = unaVez(() =>
  fetch(asset('entity-atlas.json'), { cache: 'no-cache' }).then((r) => {
    if (!r.ok) throw new Error(`No se pudo cargar entity-atlas.json (${r.status})`)
    return r.json() as Promise<EntityManifest>
  }))
