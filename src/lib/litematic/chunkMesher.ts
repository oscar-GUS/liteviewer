// Mallado por trozos con estado. Lo usa el worker (meshWorker.ts) y, si no hay
// workers, el propio visor en el hilo principal.
//
// Antes cada cambio del corte rehacía la malla de la build entera y el visor la
// subía a la GPU de golpe: en Minas Tirith (L) eran 134-211 MB en un frame, con
// congelaciones de 67-160 ms (300-600 ms en XL) al soltar y en cada pausa del
// arrastre. Ahora:
// - El worker se queda con el volumen y con lo precalculado (MeshPrep) y malla la
//   build en trozos de CHUNK_XZ x CHUNK_Y x CHUNK_XZ. Cada trozo lleva dónde
//   empieza cada capa en Y dentro de cada búfer.
// - El corte en Y no rehace ningún trozo: el visor enseña solo sus capas con
//   drawRange, y aquí se malla aparte la "tapa", que son la capa de arriba y la de
//   abajo del corte con sus caras y su sombra de verdad (una capa de L, 4-9 ms).
//   Trozos con drawRange más tapa son exactamente la malla con el corte, quad a
//   quad (comprobado en S, M, L, Lschem y XL).
// - Los cortes en X y Z sí rehacen los trozos que cruzan el plano (los que quedan
//   enteros dentro no cambian y los de fuera ni se tocan), con la Y entera.
// - Trabaja a ratos de SLICE_MS y entre medias atiende mensajes: un cambio de
//   corte no espera a que acabe la build. La tapa va siempre antes que los trozos.
// - Si la build no cabe en MAX_QUADS, se vuelve a lo de antes: cada corte, también
//   en Y, malla solo lo que deja ver (ver limit()).

import {
  prepareMesh, meshRegion, fancyLeavesFit, MeshPrep, MeshScratch,
  IAtlas, MeshOptions, SliceRange, RawBuffers, MAX_QUADS,
} from './buildMesh'
import { ModelDB, ModelsData } from './models'
import { EntityAtlas, EntityManifest, makeEntityAtlas } from './blockEntities'

// Lado de los trozos. Medido con L, XL y Lschem en Node:
// - 32x64x32: L 476 mallas, XL 1.355; trozo más lento 8-19 ms.
// - 64x64x64: L 146 mallas, XL 455, Lschem 211; trozo más lento 20-59 ms.
// - Columnas de 64 con la altura entera: L 81, XL 199; pero un trozo llega a
//   113-193 ms y retrasa la tapa del corte lo mismo.
// Cada malla es una draw call más en cada frame (las 455 de XL, 0,6 ms de CPU en
// Edge), y los trozos grandes solo pesan al rehacer un corte en X o Z: se malla
// todo lo que queda dentro de cada trozo que cruza el plano, así que tarda más
// cuanto más dentro del trozo cae (con la 4060, de soltar a tenerlo exacto: L
// 55-160 ms, XL 0,2-0,5 s; sin tirones mientras). El corte en Y, que es el que
// se arrastra capa a capa, no depende del tamaño.
export const CHUNK_XZ = 64
export const CHUNK_Y = 64

// Trabajo seguido antes de volver a mirar mensajes, y lo que se manda junto.
const SLICE_MS = 8
const SLICE_BYTES = 8 * 1048576

export interface AtlasRaw {
  tiles: Record<string, number>
  size: { w: number; h: number }
  cell: number
  pad: number
  cols: number
  white: number
}

export type MesherIn =
  // Modelo nuevo: el mesher se queda con los bloques (el visor manda una copia).
  | {
    type: 'model'
    width: number; height: number; length: number
    blocks: Uint16Array
    palette: { name: string; properties?: Record<string, string> }[]
    chunk?: [number, number]
  }
  // (Re)mallar todo: recursos u opciones nuevos. Atlas, modelos y manifiesto de
  // entidades viajan SOLO cuando cambian (`undefined` = los de antes; `null` = no
  // hay). models.json son ~3,8 MB y clonarlo costaba 14-50 ms en el hilo principal.
  | {
    type: 'build'
    gen: number; seq: number
    slice: SliceRange
    opts?: MeshOptions
    /** Posición de la cámara en celdas: se malla primero lo más cercano. */
    eye?: [number, number, number] | null
    atlasRaw?: AtlasRaw | null
    dbRaw?: ModelsData | null
    entityManifest?: EntityManifest | null
  }
  // Corte nuevo (seq crece en cada cambio).
  | { type: 'slice'; seq: number; slice: SliceRange }
  // Capa fantasma (la de debajo en el modo capa a capa), o ninguna.
  | { type: 'ghost'; y: number | null }
  // Con o sin la luz de la exhibición en lo que se malle desde ahora (la build no
  // se rehace). Sin ella, el modo normal no la calcula ni la manda; con ella otra
  // vez, se remalla solo lo que se malló sin luz. Cuenta como un corte (seq).
  | { type: 'light'; seq: number; on: boolean }

export interface ChunkOut {
  id: number
  /** Celdas del trozo [x0, y0, z0, x1, y1, z1], enteras (sin recortar por el corte). */
  box: number[]
  /** MESH_KINDS: opaco, translúcido, entidades y emisivo. Todo null = el trozo se queda vacío. */
  geo: (RawBuffers | null)[]
  /** Quad donde empieza cada capa del trozo (ver RegionMesh.layers). */
  layers: Uint32Array
}

export type MesherOut =
  | { type: 'chunks'; gen: number; fastLeaves: boolean; items: ChunkOut[] }
  // Tapa del corte `seq`: las capas `layers` mallada con el corte entero. `starts`:
  // quad donde empieza cada una en cada búfer (RegionMesh.layers).
  | { type: 'cap'; gen: number; seq: number; slice: SliceRange; layers: number[]; starts: Uint32Array; geo: (RawBuffers | null)[] }
  // Capa fantasma `y` con el corte en X/Z `slice`, sin sombra suave (null = ninguna).
  | { type: 'ghost'; gen: number; y: number | null; slice: SliceRange; geo: (RawBuffers | null)[] }
  // Sin nada pendiente para (gen, seq).
  | { type: 'done'; gen: number; seq: number; truncated: boolean; fastLeaves: boolean; fancyLeavesFit: boolean }

/** Capas que lleva la tapa del corte: la de arriba y la de abajo si cortan algo. */
export function capLayers(slice: SliceRange, height: number): number[] {
  const out: number[] = []
  if (slice.y[0] > 0) out.push(slice.y[0])
  if (slice.y[1] < height - 1 && !out.includes(slice.y[1])) out.push(slice.y[1])
  return out
}

function makeAtlas(data: AtlasRaw): IAtlas {
  return {
    tileIndex: (name: string) => data.tiles[name],
    uv: (index: number) => {
      const { cell, pad, cols, size } = data
      const col = index % cols
      const row = Math.floor(index / cols)
      // OJO: esta es la copia del worker (construye el mesh de bloques). Debe ir
      // sincronizada con Atlas.uv() en atlas.ts — tenerla desincronizada ya costó
      // una tarde: el arreglo del téxel de borde no surtía efecto porque el mesh
      // lo generaba esta función, no aquella.
      const stride = cell + 2 * pad
      const x = col * stride + pad
      const y = row * stride + pad
      return [x / size.w, y / size.h, (x + cell) / size.w, (y + cell) / size.h]
    },
    get whiteIndex() { return data.white },
  }
}

const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now())
const copySlice = (s: SliceRange): SliceRange => ({ x: [s.x[0], s.x[1]], y: [s.y[0], s.y[1]], z: [s.z[0], s.z[1]] })

export class ChunkMesher {
  private model: MesherIn & { type: 'model' } | null = null
  private cs = CHUNK_XZ
  private cy = CHUNK_Y
  private nx = 0; private ny = 0; private nz = 0; private n = 0

  // Recursos guardados entre builds (ver MesherIn 'build').
  private atlas: IAtlas | null = null
  private db: ModelDB | null = null
  private entityAtlas: EntityAtlas | null = null

  private prep: MeshPrep | null = null
  private gen = -1
  private seq = 0
  private slice: SliceRange = { x: [0, 0], y: [0, 0], z: [0, 0] }
  private opts: MeshOptions | undefined

  // Por trozo: orden de mallado, pendiente, corte con el que se malló en esta
  // build (null = aún no), si el visor tiene una malla suya (de cualquier build),
  // quads por capa de malla y en qué capas de malla se truncó (bit k = MESH_KINDS[k]).
  private order = new Int32Array(0)
  private dirty = new Uint8Array(0)
  private cursor = 0
  private meshedKey: (string | null)[] = []
  // Si la malla del trozo que tiene el visor lleva la luz de la exhibición.
  private meshedLit = new Uint8Array(0)
  // El visor ha salido de la exhibición: lo que se malle va sin su luz. prep.light
  // se queda (1 B por celda) para volver sin rehacer la build.
  private lightOff = false
  private shown = new Uint8Array(0)
  private quads = new Int32Array(0)
  private trunc = new Uint8Array(0)
  private totals = [0, 0, 0, 0]
  // La build no cabe en MAX_QUADS (ver limit()). `retry`: al acabar la vuelta, otra
  // a los trozos truncados con el cupo que haya quedado libre.
  private limited = false
  private retry = false
  private capDirty = false
  // Capa fantasma pedida (null = ninguna) y si hay que mandarla otra vez.
  private ghostY: number | null = null
  private ghostDirty = false
  private doneSent = true
  private scheduled = false
  private stopped = false
  private readonly scratch = new MeshScratch()

  constructor(
    private readonly post: (m: MesherOut, transfer: Transferable[]) => void,
    private readonly defer: (fn: () => void) => void,
  ) {}

  handle(m: MesherIn): void {
    if (this.stopped) return
    if (m.type === 'model') this.setModel(m)
    else if (m.type === 'build') this.build(m)
    else if (m.type === 'ghost') this.setGhost(m.y)
    else if (m.type === 'light') this.setLight(m.seq, m.on)
    else this.setSlice(m.seq, m.slice)
  }

  private get lightOn(): boolean { return !!this.prep?.light && !this.lightOff }

  private setLight(seq: number, on: boolean): void {
    this.seq = seq
    this.lightOff = !on
    this.doneSent = false
    if (this.prep && this.model && this.lightOn) {
      // Vuelve la exhibición: lo que se malló sin luz mientras tanto, otra vez.
      let any = false
      for (let i = 0; i < this.n; i++) if (this.meshedKey[i] !== null && !this.meshedLit[i]) { this.dirty[i] = 1; any = true }
      if (any) this.cursor = 0
      this.capDirty = capLayers(this.slice, this.model.height).length > 0
    }
    this.schedule()
  }

  private setGhost(y: number | null): void {
    this.ghostY = y
    this.ghostDirty = true
    this.schedule()
  }

  private setModel(m: MesherIn & { type: 'model' }): void {
    this.model = m
    if (m.chunk) { this.cs = m.chunk[0]; this.cy = m.chunk[1] }
    this.nx = Math.ceil(m.width / this.cs)
    this.ny = Math.ceil(m.height / this.cy)
    this.nz = Math.ceil(m.length / this.cs)
    this.n = this.nx * this.ny * this.nz
    this.prep = null
    this.order = new Int32Array(this.n)
    this.dirty = new Uint8Array(this.n)
    this.meshedKey = new Array(this.n).fill(null)
    this.meshedLit = new Uint8Array(this.n)
    this.shown = new Uint8Array(this.n)
    this.quads = new Int32Array(this.n * 4)
    this.trunc = new Uint8Array(this.n)
    this.totals = [0, 0, 0, 0]
    this.limited = false
    this.retry = false
    this.capDirty = false
    // La capa fantasma era del modelo anterior: el visor la vuelve a pedir.
    this.ghostY = null
    this.ghostDirty = false
    this.doneSent = true
  }

  private build(m: MesherIn & { type: 'build' }): void {
    if (m.atlasRaw !== undefined) this.atlas = m.atlasRaw ? makeAtlas(m.atlasRaw) : null
    if (m.dbRaw !== undefined) this.db = m.dbRaw ? ModelDB.fromRaw(m.dbRaw) : null
    if (m.entityManifest !== undefined) this.entityAtlas = m.entityManifest ? makeEntityAtlas(m.entityManifest) : null
    if (!this.model) return
    this.gen = m.gen
    this.seq = m.seq
    this.slice = copySlice(m.slice)
    this.opts = m.opts
    this.lightOff = false
    this.prep = prepareMesh(this.model, this.atlas, this.db, this.entityAtlas, this.opts)
    // Lo de la build anterior se queda en pantalla hasta que llegue lo nuevo de
    // cada trozo; el tope de quads se reparte de cero. Los trozos de fuera del corte
    // en X/Z que el visor aún tiene se le mandan vacíos: al ensanchar el corte se
    // verían con lo de antes (las UV del atlas viejo si ha cambiado de recursos).
    this.meshedKey.fill(null)
    this.quads.fill(0)
    this.trunc.fill(0)
    this.totals = [0, 0, 0, 0]
    this.limited = false
    this.sortOrder(m.eye ?? null)
    this.markDirty()
    this.capDirty = capLayers(this.slice, this.model.height).length > 0
    this.ghostDirty = this.ghostY !== null
    this.doneSent = false
    this.schedule()
  }

  private setSlice(seq: number, s: SliceRange): void {
    const xzChanged = s.x[0] !== this.slice.x[0] || s.x[1] !== this.slice.x[1] || s.z[0] !== this.slice.z[0] || s.z[1] !== this.slice.z[1]
    const yChanged = s.y[0] !== this.slice.y[0] || s.y[1] !== this.slice.y[1]
    this.seq = seq
    this.slice = copySlice(s)
    if (!this.model || !this.prep) return
    if (xzChanged || (this.limited && yChanged)) this.markDirty()
    if (xzChanged && this.ghostY !== null) this.ghostDirty = true
    this.capDirty = capLayers(this.slice, this.model.height).length > 0
    this.doneSent = false
    this.schedule()
  }

  /** Para del todo (el visor se cierra): suelta el volumen y no manda nada más. */
  stop(): void {
    this.stopped = true
    this.model = null
    this.prep = null
  }

  // Marca los trozos que hay que rehacer: solo aquellos cuyo corte efectivo cambia,
  // los que cruza un plano nuevo o uno que se ha ido. Los de fuera no se mallan (el
  // visor los oculta) y, al volver a entrar, si su corte no ha cambiado vuelven tal
  // cual. Los de fuera con una malla de antes en el visor (de la build anterior, o
  // soltada con la build truncada) se le mandan vacíos.
  private markDirty(): void {
    for (let i = 0; i < this.n; i++) {
      const k = this.keyOf(i)
      if (k === null) {
        if (this.limited) this.release(i)
        this.dirty[i] = this.meshedKey[i] === null && this.shown[i] ? 1 : 0
      } else this.dirty[i] = k !== this.meshedKey[i] ? 1 : 0
    }
    this.cursor = 0
    this.retry = this.limited
  }

  // La build no cabe en MAX_QUADS y algún trozo ha salido truncado. Hasta la build
  // siguiente se malla solo lo que deja ver el corte, también en Y (ver keyOf), y
  // lo de fuera se suelta: el cupo es para lo que se ve, como cuando cada corte
  // rehacía la malla entera, y con los cortes cada parte sale entera.
  private limit(): void {
    this.limited = true
    this.markDirty()
  }

  // Fuera del corte con la build truncada: deja su cupo libre.
  private release(i: number): void {
    if (this.meshedKey[i] === null) return
    for (let k = 0; k < 4; k++) { this.totals[k] -= this.quads[i * 4 + k]; this.quads[i * 4 + k] = 0 }
    this.trunc[i] = 0
    this.meshedKey[i] = null
  }

  // Celdas del trozo i (enteras): [x0, y0, z0, x1, y1, z1].
  private boxOf(i: number): number[] {
    const m = this.model!
    const ix = i % this.nx, iz = Math.floor(i / this.nx) % this.nz, iy = Math.floor(i / (this.nx * this.nz))
    const x0 = ix * this.cs, y0 = iy * this.cy, z0 = iz * this.cs
    return [x0, y0, z0, Math.min(m.width - 1, x0 + this.cs - 1), Math.min(m.height - 1, y0 + this.cy - 1), Math.min(m.length - 1, z0 + this.cs - 1)]
  }

  // Lo que del corte en X y Z le afecta al trozo i: sus celdas y sus vecinas a un
  // bloque (caras, sombra suave y agua miran a esa distancia). null = fuera del corte.
  // Con la build truncada (limit()), también las capas del corte en Y que caen en él.
  private keyOf(i: number): string | null {
    const b = this.boxOf(i), s = this.slice
    if (s.x[1] < b[0] || s.x[0] > b[3] || s.z[1] < b[2] || s.z[0] > b[5]) return null
    const a = s.x[0] >= b[0] ? s.x[0] : -1, c = s.x[1] <= b[3] ? s.x[1] : -1
    const d = s.z[0] >= b[2] ? s.z[0] : -1, e = s.z[1] <= b[5] ? s.z[1] : -1
    const key = `${a},${c},${d},${e}`
    if (!this.limited) return key
    if (s.y[1] < b[1] || s.y[0] > b[4]) return null
    const f = s.y[0] > b[1] ? s.y[0] : -1, g = s.y[1] < b[4] ? s.y[1] : -1
    return f < 0 && g < 0 ? key : `${key},${f},${g}`
  }

  private sortOrder(eye: [number, number, number] | null): void {
    const ids = Array.from({ length: this.n }, (_, i) => i)
    if (eye) {
      const d = ids.map((i) => {
        const b = this.boxOf(i)
        const cx = (b[0] + b[3] + 1) / 2 - eye[0], cy = (b[1] + b[4] + 1) / 2 - eye[1], cz = (b[2] + b[5] + 1) / 2 - eye[2]
        return cx * cx + cy * cy + cz * cz
      })
      ids.sort((a, b) => d[a] - d[b])
    }
    this.order = Int32Array.from(ids)
  }

  private schedule(): void {
    if (this.scheduled || this.stopped) return
    this.scheduled = true
    this.defer(this.pump)
  }

  private nextDirty(): number {
    while (this.cursor < this.n && !this.dirty[this.order[this.cursor]]) this.cursor++
    return this.cursor < this.n ? this.order[this.cursor] : -1
  }

  private pump = (): void => {
    this.scheduled = false
    if (!this.prep || !this.model) return
    const t0 = now()
    // La tapa y la capa fantasma antes que los trozos: son lo que cambia al pasar de capa.
    if (this.capDirty) { this.capDirty = false; this.sendCap() }
    if (this.ghostDirty) { this.ghostDirty = false; this.sendGhost() }
    const items: ChunkOut[] = []
    const transfer: Transferable[] = []
    let bytes = 0
    while (now() - t0 < SLICE_MS && bytes < SLICE_BYTES) {
      const i = this.nextDirty()
      if (i < 0) break
      this.dirty[i] = 0
      const it = this.meshChunk(i)
      if (!it) continue
      items.push(it)
      transfer.push(it.layers.buffer)
      for (const g of it.geo) if (g) { transfer.push(...bufs(g)); bytes += g.pos.byteLength + g.uv.byteLength + g.col.byteLength + g.idx.byteLength + g.pal.byteLength + (g.lit?.byteLength ?? 0) }
    }
    if (items.length) this.post({ type: 'chunks', gen: this.gen, fastLeaves: this.prep.fastLeaves, items }, transfer)
    if (this.capDirty || this.ghostDirty || this.nextDirty() >= 0) { this.schedule(); return }
    if (this.retry) {
      // Con la build truncada, lo que han soltado o encogido los trozos de esta
      // vuelta va a los truncados (antes no podía: se mallan por cercanía).
      this.retry = false
      let any = false
      for (let i = 0; i < this.n; i++) {
        const t = this.trunc[i]
        if (!t || this.meshedKey[i] === null) continue
        for (let k = 0; k < 4; k++) if (t & (1 << k) && this.totals[k] < MAX_QUADS) { this.dirty[i] = 1; any = true; break }
      }
      if (any) { this.cursor = 0; this.schedule(); return }
    }
    if (!this.doneSent) {
      this.doneSent = true
      let truncated = false
      for (let i = 0; i < this.n; i++) if (this.trunc[i] && this.meshedKey[i] !== null) { truncated = true; break }
      this.post({
        type: 'done', gen: this.gen, seq: this.seq, truncated, fastLeaves: this.prep.fastLeaves,
        fancyLeavesFit: fancyLeavesFit(this.prep, this.totals[0]),
      }, [])
    }
  }

  private meshChunk(i: number): ChunkOut | null {
    const key = this.keyOf(i)
    const b = this.boxOf(i)
    if (key === null) {
      // Fuera del corte: si el visor tiene una malla de antes, se le manda vacía.
      if (!this.shown[i]) return null
      this.shown[i] = 0
      return { id: i, box: b, geo: [null, null, null, null], layers: new Uint32Array(0) }
    }
    const m = this.model!, s = this.slice
    // Los trozos van con la Y entera: el corte en Y lo pone el visor (drawRange y
    // tapa). Con la build truncada, solo con las capas del corte (ver limit()).
    const y0 = this.limited ? Math.max(b[1], s.y[0]) : b[1], y1 = this.limited ? Math.min(b[4], s.y[1]) : b[4]
    const box: SliceRange = { x: [Math.max(b[0], s.x[0]), Math.min(b[3], s.x[1])], y: [y0, y1], z: [Math.max(b[2], s.z[0]), Math.min(b[5], s.z[1])] }
    const vis: SliceRange = { x: s.x, y: [0, m.height - 1], z: s.z }
    // El tope de quads (MAX_QUADS por capa de malla) es de toda la build: a este
    // trozo le toca lo que dejan los demás.
    const limits = [0, 1, 2, 3].map((k) => MAX_QUADS - (this.totals[k] - this.quads[i * 4 + k]))
    const light = this.lightOn
    const r = meshRegion(this.prep!, box, vis, { limits, scratch: this.scratch, light })
    this.meshedLit[i] = light ? 1 : 0
    let t = 0
    for (let k = 0; k < 4; k++) {
      this.totals[k] += r.quads[k] - this.quads[i * 4 + k]
      this.quads[i * 4 + k] = r.quads[k]
      if (r.truncated && r.quads[k] >= limits[k]) t |= 1 << k
    }
    this.trunc[i] = t
    this.meshedKey[i] = key
    if (t && !this.limited) this.limit()
    const empty = r.geo.every((g) => !g)
    if (empty && !this.shown[i]) return null
    this.shown[i] = empty ? 0 : 1
    return { id: i, box: b, geo: r.geo, layers: y0 === b[1] && y1 === b[4] ? r.layers : padLayers(r.layers, b, y0, y1) }
  }

  private sendCap(): void {
    const m = this.model!, s = this.slice
    const layers = capLayers(s, m.height)
    if (!layers.length) return
    const r = meshRegion(this.prep!, s, s, { layers, scratch: this.scratch, light: this.lightOn })
    const transfer: Transferable[] = [r.layers.buffer]
    for (const g of r.geo) if (g) transfer.push(...bufs(g))
    this.post({ type: 'cap', gen: this.gen, seq: this.seq, slice: copySlice(s), layers, starts: r.layers, geo: r.geo }, transfer)
  }

  // Capa fantasma: la capa entera dentro del corte en X/Z, mirando solo a sí misma
  // (sus caras de arriba y de abajo se ven) y sin sombra suave, que en una capa
  // semitransparente solo ensucia. Tampoco lleva la luz de la exhibición: se pinta
  // sin luces.
  private sendGhost(): void {
    const m = this.model!, s = copySlice(this.slice), y = this.ghostY
    if (y === null || y < 0 || y >= m.height) {
      this.post({ type: 'ghost', gen: this.gen, y: null, slice: s, geo: [null, null, null, null] }, [])
      return
    }
    const box: SliceRange = { x: s.x, y: [y, y], z: s.z }
    const r = meshRegion(this.prep!, box, box, { scratch: this.scratch, ao: false, light: false })
    const transfer: Transferable[] = []
    for (const g of r.geo) if (g) transfer.push(...bufs(g))
    this.post({ type: 'ghost', gen: this.gen, y, slice: s, geo: r.geo }, transfer)
  }
}

// Búferes de una malla, para pasarlos al hilo principal sin copiarlos.
function bufs(g: RawBuffers): ArrayBuffer[] {
  const out = [g.pos.buffer, g.uv.buffer, g.col.buffer, g.idx.buffer, g.pal.buffer] as ArrayBuffer[]
  if (g.lit) out.push(g.lit.buffer as ArrayBuffer)
  return out
}

// Capas del trozo entero (las que indexa el visor) a partir de las de un trozo
// mallado solo en [y0, y1]: las de debajo empiezan en 0 y las de encima en el total.
function padLayers(src: Uint32Array, b: number[], y0: number, y1: number): Uint32Array {
  const h = b[4] - b[1] + 1, nl = y1 - y0 + 1
  const out = new Uint32Array(4 * (h + 1))
  for (let k = 0; k < 4; k++) {
    for (let j = 0; j <= h; j++) out[k * (h + 1) + j] = src[k * (nl + 1) + Math.max(0, Math.min(nl, b[1] + j - y0))]
  }
  return out
}
