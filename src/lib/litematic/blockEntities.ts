// Geometría de BLOCK ENTITIES (cofres, shulkers, camas, cabezas, campana…).
//
// Estas entidades no se renderizan como modelos de bloque normales: tienen
// geometría propia (cajas con el unwrap nativo de Minecraft) y usan un atlas de
// texturas de entidad aparte (entity-atlas.png). Cada builder devuelve una lista
// de quads en espacio de bloque [0,1] que el meshWorker emite en la pasada
// "entity" (un mesh/material independiente del de bloques).
//
// El atlas apila cada textura entera; el manifiesto mapea key -> rect en píxeles.
// Los builders expresan los UV en PÍXELES NATIVOS de su textura y `atlas.norm`
// los normaliza al rect del atlas — así soporta texturas de cualquier tamaño.

import * as THREE from 'three'
import { BlockState } from './types'
import { baseName } from './blockColors'

// ── Tipos compartidos con buildMesh ───────────────────────────────────────────
export interface LocalQuad { pos: number[]; uv: number[]; r: number; g: number; b: number; cull: number }

// ── Atlas de entidad (construido desde el manifiesto JSON) ─────────────────────
export interface EntityManifest {
  size: [number, number]
  tex: Record<string, { x: number; y: number; w: number; h: number }>
}

export interface EntityAtlas {
  /** UV del atlas para un punto en píxeles nativos de la textura `key`. */
  norm(key: string, px: number, py: number): [number, number]
  size(key: string): [number, number]
  has(key: string): boolean
}

export function makeEntityAtlas(m: EntityManifest): EntityAtlas {
  const [AW, AH] = m.size
  return {
    has: (k) => k in m.tex,
    size: (k) => { const r = m.tex[k]; return r ? [r.w, r.h] : [64, 64] },
    norm: (k, px, py) => {
      const r = m.tex[k]
      if (!r) return [0, 0]
      return [(r.x + px) / AW, (r.y + py) / AH]
    },
  }
}

// ── Primitivas de geometría ───────────────────────────────────────────────────

const DIR_NORMAL: Record<string, [number, number, number]> = {
  east: [1, 0, 0], west: [-1, 0, 0], up: [0, 1, 0], down: [0, -1, 0], south: [0, 0, 1], north: [0, 0, -1],
}

// 4 esquinas (0-16) de una cara de la caja [f,t], orden [BL,BR,TR,TL], normal afuera.
function faceCorners(dir: string, f: number[], t: number[]): number[] {
  const [x1, y1, z1] = f, [x2, y2, z2] = t
  switch (dir) {
    case 'south': return [x1, y1, z2, x2, y1, z2, x2, y2, z2, x1, y2, z2]
    case 'north': return [x2, y1, z1, x1, y1, z1, x1, y2, z1, x2, y2, z1]
    case 'east':  return [x2, y1, z2, x2, y1, z1, x2, y2, z1, x2, y2, z2]
    case 'west':  return [x1, y1, z1, x1, y1, z2, x1, y2, z2, x1, y2, z1]
    case 'up':    return [x1, y2, z2, x2, y2, z2, x2, y2, z1, x1, y2, z1]
    default:      return [x1, y1, z1, x2, y1, z1, x2, y1, z2, x1, y1, z2] // down
  }
}

function shadeFor(nx: number, ny: number, nz: number): number {
  const ax = Math.abs(nx), ay = Math.abs(ny), az = Math.abs(nz)
  if (ay >= ax && ay >= az) return ny >= 0 ? 1.0 : 0.5
  if (az >= ax) return nz >= 0 ? 0.8 : 0.7
  return 0.62
}

// Rotación de blockstate (x luego y) alrededor del centro (8,8,8), espacio 0-16.
function blockstateMatrix(x: number, y: number): THREE.Matrix4 {
  const m = new THREE.Matrix4().makeTranslation(8, 8, 8)
  if (y) m.multiply(new THREE.Matrix4().makeRotationY((-y * Math.PI) / 180))
  if (x) m.multiply(new THREE.Matrix4().makeRotationX((-x * Math.PI) / 180))
  return m.multiply(new THREE.Matrix4().makeTranslation(-8, -8, -8))
}

// Cara con UV en píxeles nativos [x0,y0,x1,y1] (y hacia abajo) + rotación 0/90/180/270.
export interface EntityFace { uv: [number, number, number, number]; rot?: number }

// Emite las caras de una caja [from,to] (coords 0-16) con textura `key`, aplicando
// la matriz M (rotación de blockstate). UV en píxeles nativos → atlas.
function emitBox(
  out: LocalQuad[],
  key: string,
  atlas: EntityAtlas,
  from: number[],
  to: number[],
  faces: Record<string, EntityFace>,
  M: THREE.Matrix4,
  uFlip?: Set<string>, // caras cuyo eje U se invierte (espeja la textura horizontalmente)
): void {
  const rotM = new THREE.Matrix4().extractRotation(M)
  const v = new THREE.Vector3()
  const n = new THREE.Vector3()

  for (const dir in faces) {
    const face = faces[dir]
    const corners = faceCorners(dir, from, to)
    const pos: number[] = []
    for (let k = 0; k < 4; k++) {
      v.set(corners[k * 3], corners[k * 3 + 1], corners[k * 3 + 2]).applyMatrix4(M).multiplyScalar(1 / 16)
      pos.push(v.x, v.y, v.z)
    }
    const bn = DIR_NORMAL[dir] ?? [0, 1, 0]
    n.set(bn[0], bn[1], bn[2]).applyMatrix4(rotM).normalize()
    const shade = shadeFor(n.x, n.y, n.z)

    // UV: orden [BL,BR,TR,TL] en px nativos; y hacia abajo (top=y0, bottom=y1).
    // uFlip intercambia x0↔x1 → espeja la cara horizontalmente.
    let x0 = face.uv[0], x1 = face.uv[2]
    const y0 = face.uv[1], y1 = face.uv[3]
    if (uFlip?.has(dir)) { const t = x0; x0 = x1; x1 = t }
    let uvc: [number, number][] = [[x0, y1], [x1, y1], [x1, y0], [x0, y0]]
    const k = (((face.rot ?? 0) / 90) | 0) % 4
    if (k) uvc = uvc.map((_, i) => uvc[(i + k) % 4])
    const uv: number[] = []
    for (const [px, py] of uvc) { const [u, w] = atlas.norm(key, px, py); uv.push(u, w) }

    out.push({ pos, uv, r: shade, g: shade, b: shade, cull: -1 })
  }
}

// Unwrap de caja estándar de Minecraft (texOffs u,v · tamaño W,H,D en px).
// `sideRot` rota las 4 caras laterales (los cofres y entidades lo necesitan a 180).
function boxFaces(u: number, v: number, W: number, H: number, D: number, sideRot: number, skip: string[] = []): Record<string, EntityFace> {
  const f = (x: number, y: number, w: number, h: number): [number, number, number, number] => [x, y, x + w, y + h]
  const all: Record<string, EntityFace> = {
    down:  { uv: f(u + D,         v,     W, D), rot: 0 },
    up:    { uv: f(u + D + W,     v,     W, D), rot: 0 },
    east:  { uv: f(u + D + W,     v + D, D, H), rot: sideRot },
    south: { uv: f(u + D,         v + D, W, H), rot: sideRot },
    west:  { uv: f(u,             v + D, D, H), rot: sideRot },
    north: { uv: f(u + D + W + D, v + D, W, H), rot: sideRot },
  }
  for (const s of skip) delete all[s]
  return all
}

// ── Cofres ─────────────────────────────────────────────────────────────────────

const CHEST_BLOCKS = new Set(['minecraft:chest', 'minecraft:trapped_chest', 'minecraft:ender_chest'])
const CHEST_Y: Record<string, number> = { north: 0, east: 90, south: 180, west: 270 }

function chestVariant(name: string): 'normal' | 'trapped' | 'ender' {
  if (name === 'minecraft:trapped_chest') return 'trapped'
  if (name === 'minecraft:ender_chest')   return 'ender'
  return 'normal'
}

// Textura (key del atlas) según variante y tipo de cofre (single/left/right).
function chestKey(name: string, type: string): string {
  const v = chestVariant(name)
  if (v === 'ender') return 'chest/ender'
  if (type === 'left')  return `chest/${v}_left`
  if (type === 'right') return `chest/${v}_right`
  return `chest/${v}`
}

const LOCK_FACES: Record<string, EntityFace> = {
  north: { uv: [1, 1, 3, 5], rot: 180 },
  east:  { uv: [0, 1, 1, 5], rot: 180 },
  south: { uv: [4, 1, 6, 5], rot: 180 },
  west:  { uv: [3, 1, 4, 5], rot: 180 },
  up:    { uv: [1, 0, 3, 1], rot: 180 },
  down:  { uv: [3, 0, 5, 1], rot: 180 },
}

interface BoxEl { from: number[]; to: number[]; faces: Record<string, EntityFace>; lock?: boolean }

function chestElements(type: string): BoxEl[] {
  // Cofre doble: cada mitad llega hasta la junta (sin hueco) y omite su cara
  // interna (el slot en blanco de la textura left/right). El cerrojo COMPLETO
  // (2px) lo lleva SOLO la mitad left, cruzando la junta (x −1..1, centrado en la
  // costura oeste); la mitad right no lleva cerrojo → un único cierre continuo.
  if (type === 'left') {
    return [
      { from: [0, 0, 1],  to: [15, 10, 15], faces: boxFaces(0, 19, 15, 10, 14, 180, ['up', 'west']) },
      { from: [0, 10, 1], to: [15, 14, 15], faces: boxFaces(0, 0, 15, 5, 14, 180, ['down', 'west']) },
      { from: [-1, 7, 0], to: [1, 11, 2],   faces: LOCK_FACES, lock: true },
    ]
  }
  if (type === 'right') {
    return [
      { from: [1, 0, 1],  to: [16, 10, 15], faces: boxFaces(0, 19, 15, 10, 14, 180, ['up', 'east']) },
      { from: [1, 10, 1], to: [16, 14, 15], faces: boxFaces(0, 0, 15, 5, 14, 180, ['down', 'east']) },
    ]
  }
  return [ // single
    { from: [1, 0, 1],  to: [15, 10, 15], faces: boxFaces(0, 19, 14, 10, 14, 180, ['up']) },
    { from: [1, 10, 1], to: [15, 14, 15], faces: boxFaces(0, 0, 14, 5, 14, 180, ['down']) },
    { from: [7, 7, 0],  to: [9, 11, 2],   faces: LOCK_FACES, lock: true },
  ]
}

// Caras frontal/trasera de los dobles: la textura left/right tiene el trim de la
// esquina en el lado contrario al que toca con esta geometría → se espeja la U
// solo en north/south para que el trim quede en el borde exterior (no en la junta).
const DOUBLE_UFLIP = new Set(['north', 'south'])

function buildChest(bs: BlockState, atlas: EntityAtlas): LocalQuad[] {
  const yRot = CHEST_Y[bs.properties?.facing ?? 'north'] ?? 0
  const raw = bs.properties?.type ?? 'single'
  // Minecraft pone type=left en el bloque OESTE, pero la textura chest_left tiene
  // su slot en blanco al OESTE (se une por el oeste = bloque ESTE). Así que cada
  // mitad usa la geometría+textura del lado CONTRARIO (par cruzado), para que el
  // slot en blanco coincida con la cara omitida y la mitad caiga en su lado.
  const type = raw === 'left' ? 'right' : raw === 'right' ? 'left' : 'single'
  const bodyKey = chestKey(bs.name, type)
  const lockKey = chestKey(bs.name, 'single') // cerrojo desde el slot single (sólido)
  const isDouble = type === 'left' || type === 'right'
  const M = blockstateMatrix(0, yRot)
  const out: LocalQuad[] = []
  for (const el of chestElements(type)) {
    const uFlip = isDouble && !el.lock ? DOUBLE_UFLIP : undefined
    emitBox(out, el.lock ? lockKey : bodyKey, atlas, el.from, el.to, el.faces, M, uFlip)
  }
  return out
}

// ── Shulkers ───────────────────────────────────────────────────────────────────
// Modelo entity: base 16×8×16 (texOffs 0,28) + tapa 16×12×16 (texOffs 0,0), 64×64.
// `facing` indica hacia dónde abre la tapa; el bloque cerrado se rota según facing.

const SHULKER_COLORS = new Set([
  'white','orange','magenta','light_blue','yellow','lime','pink','gray',
  'light_gray','cyan','purple','blue','brown','green','red','black',
])

// Rotación de la caja cerrada según facing (modelo base = tapa hacia arriba +y).
// Eje y ángulo (grados) de la rotación que lleva +y a la dirección de `facing`.
const SHULKER_ROT: Record<string, [THREE.Vector3, number] | null> = {
  up:    null,
  down:  [new THREE.Vector3(1, 0, 0), 180],
  north: [new THREE.Vector3(1, 0, 0), -90],
  south: [new THREE.Vector3(1, 0, 0), 90],
  east:  [new THREE.Vector3(0, 0, 1), -90],
  west:  [new THREE.Vector3(0, 0, 1), 90],
}

function centeredRot(axis: THREE.Vector3, deg: number): THREE.Matrix4 {
  return new THREE.Matrix4().makeTranslation(8, 8, 8)
    .multiply(new THREE.Matrix4().makeRotationAxis(axis, (deg * Math.PI) / 180))
    .multiply(new THREE.Matrix4().makeTranslation(-8, -8, -8))
}

export function shulkerKey(name: string): string {
  const base = baseName(name) // p.ej. "red_shulker_box" -> "red_shulker_box"
  const color = base.replace(/_?shulker_box$/, '').replace(/_$/, '')
  if (color && SHULKER_COLORS.has(color)) return `shulker/${color}`
  return 'shulker/default'
}

function buildShulker(bs: BlockState, atlas: EntityAtlas): LocalQuad[] {
  const key = shulkerKey(bs.name)
  const rot = SHULKER_ROT[bs.properties?.facing ?? 'up']
  const M = rot ? centeredRot(rot[0], rot[1]) : new THREE.Matrix4()
  const out: LocalQuad[] = []

  // El modelo del shulker está invertido en Y respecto al cofre: la cara superior
  // visible de la tapa usa el SLOT "down" del unwrap, y la inferior de la base el
  // SLOT "up". Reusamos boxFaces y remapeamos up↔down (los lados quedan igual).
  const lid = boxFaces(0, 0, 16, 12, 16, 0)
  const lidFaces = { up: lid.down, north: lid.north, south: lid.south, east: lid.east, west: lid.west }
  const base = boxFaces(0, 28, 16, 8, 16, 0)
  const baseFaces = { down: base.up, north: base.north, south: base.south, east: base.east, west: base.west }

  emitBox(out, key, atlas, [0, 0, 0], [16, 8, 16], baseFaces, M) // base (inferior)
  emitBox(out, key, atlas, [0, 4, 0], [16, 16, 16], lidFaces, M) // tapa (superior)
  return out
}

// ── Cabezas / calaveras ──────────────────────────────────────────────────────
// Caja 8×8×8 (texOffs 0,0, textura 64×32). En suelo se rota por `rotation`
// (0-15, pasos de 22.5°); en pared se pega al muro y mira hacia `facing`.

const SKULLS: Record<string, string> = {
  skeleton_skull: 'skeleton', skeleton_wall_skull: 'skeleton',
  wither_skeleton_skull: 'wither_skeleton', wither_skeleton_wall_skull: 'wither_skeleton',
  zombie_head: 'zombie', zombie_wall_head: 'zombie',
  creeper_head: 'creeper', creeper_wall_head: 'creeper',
  piglin_head: 'piglin', piglin_wall_head: 'piglin',
  player_head: 'player', player_wall_head: 'player',
}

/** Key del atlas de entidad para una cabeza, o null si no es una (o no hay textura). */
export function skullKey(name: string): string | null {
  const t = SKULLS[baseName(name)]
  return t ? `skull/${t}` : null
}

/** true si es una cabeza de jugador (única con skin propio en el NBT). */
export function isPlayerHead(name: string): boolean {
  const b = baseName(name)
  return b === 'player_head' || b === 'player_wall_head'
}

// Caja canónica mira a +Z (sur); rotación que la lleva a cada `facing`.
const SKULL_WALL_YROT: Record<string, number> = { south: 0, north: 180, east: 90, west: -90 }

function buildSkull(bs: BlockState, atlas: EntityAtlas): LocalQuad[] | null {
  // Cabeza de jugador con skin propio (bs.skin): su textura en el atlas dinámico.
  // Si no está cargada aún (o falló), cae a la textura por defecto (Steve, etc.).
  const key = bs.skin && atlas.has(bs.skin) ? bs.skin : skullKey(bs.name)
  if (!key || !atlas.has(key)) return null
  const out: LocalQuad[] = []
  // El modelo de cabeza usa addBox en Y negativo (como el shulker): el unwrap
  // tiene up↔down intercambiados respecto al render, así que se remapean.
  const b = boxFaces(0, 0, 8, 8, 8, 0)
  const faces = { up: b.down, down: b.up, north: b.north, south: b.south, east: b.east, west: b.west }
  if (baseName(bs.name).includes('wall')) {
    const yRot = SKULL_WALL_YROT[bs.properties?.facing ?? 'south'] ?? 0
    emitBox(out, key, atlas, [4, 4, 0], [12, 12, 8], faces, centeredRot(new THREE.Vector3(0, 1, 0), yRot))
  } else {
    const deg = (parseInt(bs.properties?.rotation ?? '0', 10) || 0) * 22.5
    emitBox(out, key, atlas, [4, 0, 4], [12, 8, 12], faces, centeredRot(new THREE.Vector3(0, 1, 0), -deg))
  }
  return out
}

// ── Minecarts ────────────────────────────────────────────────────────────────
// La vaina del minecart es una entidad libre (no una celda del palette): se
// construye aparte y el viewer la coloca en la celda de la entidad. Textura
// entity/minecart/minecart (64×32): unwrap clásico — laterales en (0,0) caja
// 16×8×2, suelo en (0,10) caja 20×16×2. Solo usamos la cara ancha de cada uno.
const MINECART_KEY = 'minecart/minecart'
const MC_SIDE:  [number, number, number, number]  = [2, 2, 18, 10]   // cara lateral (16×8 px)
const MC_FLOOR: [number, number, number, number]  = [2, 12, 22, 28]  // suelo (20×16 px)

/** Quads de la vaina del minecart (espacio de celda 0-1), girada `yaw` grados en Y. */
export function buildMinecart(yaw: number, atlas: EntityAtlas): LocalQuad[] {
  if (!atlas.has(MINECART_KEY)) return []
  const M = yaw ? centeredRot(new THREE.Vector3(0, 1, 0), -yaw) : new THREE.Matrix4()
  const out: LocalQuad[] = []
  const side = (): EntityFace => ({ uv: MC_SIDE })
  const floor = (): EntityFace => ({ uv: MC_FLOOR })
  // Suelo (placa fina) — cara superior e inferior con la textura de suelo.
  emitBox(out, MINECART_KEY, atlas, [0, 3, 0], [16, 5, 16], { up: floor(), down: floor() }, M)
  // 4 paredes (8 px de alto) con la textura lateral en las caras vistas.
  emitBox(out, MINECART_KEY, atlas, [0, 3, 0],  [16, 11, 2],  { north: side(), south: side(), up: side() }, M)
  emitBox(out, MINECART_KEY, atlas, [0, 3, 14], [16, 11, 16], { north: side(), south: side(), up: side() }, M)
  emitBox(out, MINECART_KEY, atlas, [0, 3, 2],  [2, 11, 14],  { west: side(),  east: side(),  up: side() }, M)
  emitBox(out, MINECART_KEY, atlas, [14, 3, 2], [16, 11, 14], { west: side(),  east: side(),  up: side() }, M)
  return out
}

// ── Armor stand ──────────────────────────────────────────────────────────────
// Entidad libre (~2 bloques de alto). Modelo reconocible: base + piernas +
// barra de cintura + hombros + cuello + cabeza, con la textura wood (64×64) y
// los offsets de UV nativos del modelo vanilla (así los texels son opacos).
const ARMOR_KEY = 'armor_stand/wood'

interface StandBox { from: number[]; to: number[]; faces: Record<string, EntityFace> }

function armorStandBoxes(): StandBox[] {
  return [
    { from: [3, 0, 3],   to: [13, 2, 13], faces: boxFaces(0, 32, 12, 1, 12, 0) }, // base (plancha)
    { from: [5, 2, 7],   to: [7, 12, 9],  faces: boxFaces(8, 0, 2, 11, 2, 0) },   // pierna dcha
    { from: [9, 2, 7],   to: [11, 12, 9], faces: boxFaces(40, 0, 2, 11, 2, 0) },  // pierna izq
    { from: [4, 12, 6],  to: [12, 15, 10], faces: boxFaces(0, 26, 12, 3, 3, 0) }, // barra de cadera
    { from: [7, 15, 7],  to: [9, 20, 9],  faces: boxFaces(8, 0, 2, 11, 2, 0) },   // columna
    { from: [3, 20, 7],  to: [13, 23, 9], faces: boxFaces(0, 26, 12, 3, 3, 0) },  // barra de hombros
    { from: [7, 23, 7],  to: [9, 25, 9],  faces: boxFaces(8, 0, 2, 11, 2, 0) },   // cuello
    { from: [6, 25, 6],  to: [10, 30, 10], faces: boxFaces(0, 0, 2, 7, 2, 0) },   // cabeza
  ]
}

/** Quads de un armor stand (espacio de celda 0-1, puede exceder 1 en Y ~2 bloques). */
export function buildArmorStand(yaw: number, atlas: EntityAtlas): LocalQuad[] {
  if (!atlas.has(ARMOR_KEY)) return []
  const M = yaw ? centeredRot(new THREE.Vector3(0, 1, 0), -yaw) : new THREE.Matrix4()
  const out: LocalQuad[] = []
  for (const b of armorStandBoxes()) emitBox(out, ARMOR_KEY, atlas, b.from, b.to, b.faces, M)
  return out
}

// ── Barcos ────────────────────────────────────────────────────────────────────
// Modelo vanilla BoatModel (textura 128×64: fondo, 4 paredes, 2 remos). Cada parte
// se define en el espacio del modelo de Minecraft (píxeles, Y hacia abajo) con su
// addBox + pose + rotación, y se lleva al espacio del visor (Y arriba) con GP:
// (x,y,z) → (-z,-y,-x). El barco queda centrado en (0,·,0); el viewer lo coloca en
// el Pos real y aplica el giro. texOffs/tamaños verificados contra la textura.
interface BoatPart { tu: number; tv: number; box: [number, number, number, number, number, number]; pose: [number, number, number]; rot: [number, number, number] }

const BOAT_PARTS: BoatPart[] = [
  { tu: 0,  tv: 0,  box: [-14, -9, -3, 28, 16, 3], pose: [0, 3, 1],   rot: [Math.PI / 2, 0, 0] },              // fondo
  { tu: 0,  tv: 19, box: [-13, -7, -1, 18, 6, 2],  pose: [-15, 4, 4], rot: [0, Math.PI * 1.5, 0] },           // popa
  { tu: 0,  tv: 27, box: [-8, -7, -1, 16, 6, 2],   pose: [15, 4, 0],  rot: [0, Math.PI / 2, 0] },             // proa
  { tu: 0,  tv: 35, box: [-14, -7, -1, 28, 6, 2],  pose: [0, 4, 9],   rot: [0, Math.PI, 0] },                 // costado dcho
  { tu: 0,  tv: 43, box: [-14, -7, -1, 28, 6, 2],  pose: [0, 4, -9],  rot: [0, 0, 0] },                       // costado izq
  { tu: 62, tv: 0,  box: [-1, 0, -5, 2, 2, 18],    pose: [3, -3, 9],  rot: [0, 0, 0] },                       // remo dcho (tumbado al ras)
  { tu: 62, tv: 20, box: [-1, 0, -5, 2, 2, 18],    pose: [3, -3, -9], rot: [0, Math.PI, 0] },                 // remo izq
]

// Mapea el espacio del modelo de MC (Y abajo) al del visor (Y arriba): (x,y,z)→(-z,-y,-x).
const BOAT_GP = new THREE.Matrix4().set(
  0, 0, -1, 0,
  0, -1, 0, 0,
  -1, 0, 0, 0,
  0, 0, 0, 1,
)

/** Quads del casco de un barco (centrado en 0, Y arriba). `chest` usa la textura con cofre. */
export function buildBoat(variant: string, chest: boolean, yaw: number, atlas: EntityAtlas): LocalQuad[] {
  const key = chest ? `chest_boat/${variant}` : `boat/${variant}`
  if (!atlas.has(key)) return []
  const out: LocalQuad[] = []
  const yawM = new THREE.Matrix4().makeRotationY((-yaw * Math.PI) / 180)
  const base = new THREE.Matrix4().multiplyMatrices(yawM, BOAT_GP)
  for (const p of BOAT_PARTS) {
    const [ox, oy, oz, w, h, d] = p.box
    const P = new THREE.Matrix4().makeTranslation(p.pose[0], p.pose[1], p.pose[2])
    if (p.rot[2]) P.multiply(new THREE.Matrix4().makeRotationZ(p.rot[2]))
    if (p.rot[1]) P.multiply(new THREE.Matrix4().makeRotationY(p.rot[1]))
    if (p.rot[0]) P.multiply(new THREE.Matrix4().makeRotationX(p.rot[0]))
    const M = new THREE.Matrix4().multiplyMatrices(base, P)
    emitBox(out, key, atlas, [ox, oy, oz], [ox + w, oy + h, oz + d], boxFaces(p.tu, p.tv, w, h, d, 0), M)
  }
  return out
}

// ── Registro ────────────────────────────────────────────────────────────────────

export function isBlockEntity(name: string): boolean {
  if (CHEST_BLOCKS.has(name)) return true
  if (name.endsWith('shulker_box')) return true
  if (skullKey(name)) return true
  return false
}

/** Quads de la block entity, o null si `name` no es una. */
export function buildBlockEntity(bs: BlockState, atlas: EntityAtlas): LocalQuad[] | null {
  if (CHEST_BLOCKS.has(bs.name)) return buildChest(bs, atlas)
  if (bs.name.endsWith('shulker_box')) return buildShulker(bs, atlas)
  if (skullKey(bs.name)) return buildSkull(bs, atlas)
  return null
}
