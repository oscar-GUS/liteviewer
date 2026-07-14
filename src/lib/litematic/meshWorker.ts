// Web Worker: computa buildMeshRaw fuera del hilo principal
// Recibe datos serializables, devuelve Float32Array/Uint*Array como transferables

import { buildMeshRaw, IAtlas, SliceRange, RawBuffers } from './buildMesh'
import { ModelDB, ModelsData } from './models'
import { EntityAtlas, EntityManifest, makeEntityAtlas } from './blockEntities'

interface WorkerRequest {
  id: number
  modelRaw: {
    width: number
    height: number
    length: number
    blocks: Uint16Array
    palette: { name: string; properties?: Record<string, string> }[]
  }
  atlasRaw: {
    tiles: Record<string, number>
    size: { w: number; h: number }
    cell: number
    cols: number
    white: number
  } | null
  entityManifest: EntityManifest | null
  dbRaw: ModelsData | null
  slice: SliceRange
}

function makeAtlas(data: NonNullable<WorkerRequest['atlasRaw']>): IAtlas {
  return {
    tileIndex: (name: string) => data.tiles[name],
    uv: (index: number) => {
      const { cell, cols, size } = data
      const col = index % cols
      const row = Math.floor(index / cols)
      // Margen mínimo anti-salto-de-tile con NEAREST. 0.5 comprimía el primer/último
      // téxel de cada cara a media anchura; 0.01 es imperceptible y no sangra.
      // OJO: esta es la copia del worker (construye el mesh de bloques). Debe ir
      // sincronizada con Atlas.uv() en atlas.ts.
      const e = 0.01
      return [
        (col * cell + e) / size.w,
        (row * cell + e) / size.h,
        ((col + 1) * cell - e) / size.w,
        ((row + 1) * cell - e) / size.h,
      ]
    },
    get whiteIndex() { return data.white },
  }
}

let entityAtlasCache: EntityAtlas | null = null
let entityManifestCache: EntityManifest | null = null

self.addEventListener('message', (e: MessageEvent<WorkerRequest>) => {
  const { id, modelRaw, atlasRaw, entityManifest, dbRaw, slice } = e.data

  const atlas = atlasRaw ? makeAtlas(atlasRaw) : null
  const db = dbRaw ? ModelDB.fromRaw(dbRaw) : null

  // El manifiesto de entidad es constante; cachearlo entre rebuilds.
  if (entityManifest && entityManifest !== entityManifestCache) {
    entityManifestCache = entityManifest
    entityAtlasCache = makeEntityAtlas(entityManifest)
  }

  const result = buildMeshRaw(modelRaw, atlas, db, slice, entityAtlasCache)

  const transfers: Transferable[] = []
  if (result.opaque) {
    transfers.push(result.opaque.pos.buffer, result.opaque.uv.buffer, result.opaque.col.buffer, result.opaque.idx.buffer)
  }
  if (result.transparent) {
    transfers.push(result.transparent.pos.buffer, result.transparent.uv.buffer, result.transparent.col.buffer, result.transparent.idx.buffer)
  }
  if (result.entity) {
    transfers.push(result.entity.pos.buffer, result.entity.uv.buffer, result.entity.col.buffer, result.entity.idx.buffer)
  }
  if (result.emissive) {
    transfers.push(result.emissive.pos.buffer, result.emissive.uv.buffer, result.emissive.col.buffer, result.emissive.idx.buffer)
  }

  ;(self as unknown as Worker).postMessage({ id, opaque: result.opaque, transparent: result.transparent, entity: result.entity, emissive: result.emissive, lights: result.lights, truncated: result.truncated }, transfers)
})
