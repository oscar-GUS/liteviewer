// Parser del formato Litematica (.litematic).
//
// Estructura: { Metadata, Regions: { <nombre>: { Position, Size, BlockStatePalette,
// BlockStates, ... } } }. Cada región guarda los bloques en un "LitematicaBitArray":
// un array de longs donde cada celda ocupa `bits` bits EMPAQUETADOS DE FORMA CONTIGUA
// (los valores pueden cruzar el límite entre dos longs — distinto del formato de chunk
// de Minecraft 1.16+). Por eso se decodifica con BigInt a 64 bits.

import { NbtCompound, NbtValue } from './nbt'
import { SchematicTooLargeError, volumeTooLargeToParse } from './limits'
import { normalizeLegacyBlockState } from './legacyBlocks'
import { BlockState, SchematicModel, ContainerInfo, SignText, ItemFrame, Minecart, ArmorStand, cellIndex, isAir, readContainerItems, readSignText, readItemFrameMeta, readMinecartMeta, readArmorStandMeta, readMovingPiston, readSkullTexture, expandSkullPalette, Boat, readBoatMeta } from './types'

interface RegionData {
  posX: number; posY: number; posZ: number
  sizeX: number; sizeY: number; sizeZ: number // con signo
  absX: number; absY: number; absZ: number
  minX: number; minY: number; minZ: number    // esquina mínima en espacio global
  palette: BlockState[]
  states: BigInt64Array
  tileEntities?: NbtValue[]
  entities?: NbtValue[]
}

export function parseLitematic(root: NbtCompound): SchematicModel {
  const regionsTag = root.Regions as NbtCompound | undefined
  if (!regionsTag || typeof regionsTag !== 'object') {
    throw new Error('No es un .litematic válido (falta Regions)')
  }

  const metadata = (root.Metadata as NbtCompound | undefined) ?? {}
  const name = typeof metadata.Name === 'string' ? metadata.Name : 'Schematic'
  const author = typeof metadata.Author === 'string' ? metadata.Author : undefined

  // ── Leer cada región y calcular su esquina mínima en espacio global ──
  const regions: RegionData[] = []
  for (const regionName of Object.keys(regionsTag)) {
    const reg = regionsTag[regionName] as NbtCompound
    const pos = reg.Position as NbtCompound
    const size = reg.Size as NbtCompound
    const paletteRaw = reg.BlockStatePalette as NbtCompound[] | undefined
    const states = reg.BlockStates as BigInt64Array | undefined
    if (!pos || !size || !paletteRaw || !states) continue

    const sizeX = Number(size.x), sizeY = Number(size.y), sizeZ = Number(size.z)
    const posX = Number(pos.x), posY = Number(pos.y), posZ = Number(pos.z)
    const absX = Math.abs(sizeX), absY = Math.abs(sizeY), absZ = Math.abs(sizeZ)

    regions.push({
      posX, posY, posZ, sizeX, sizeY, sizeZ, absX, absY, absZ,
      // Con tamaño negativo la región se extiende hacia el negativo desde Position.
      minX: sizeX >= 0 ? posX : posX + sizeX + 1,
      minY: sizeY >= 0 ? posY : posY + sizeY + 1,
      minZ: sizeZ >= 0 ? posZ : posZ + sizeZ + 1,
      palette: paletteRaw.map(toBlockState),
      states,
      tileEntities: reg.TileEntities as NbtValue[] | undefined,
      entities: reg.Entities as NbtValue[] | undefined,
    })
  }

  if (regions.length === 0) throw new Error('El .litematic no tiene regiones con bloques')

  // ── Caja global que engloba todas las regiones ──
  let gMinX = Infinity, gMinY = Infinity, gMinZ = Infinity
  let gMaxX = -Infinity, gMaxY = -Infinity, gMaxZ = -Infinity
  for (const r of regions) {
    gMinX = Math.min(gMinX, r.minX); gMaxX = Math.max(gMaxX, r.minX + r.absX)
    gMinY = Math.min(gMinY, r.minY); gMaxY = Math.max(gMaxY, r.minY + r.absY)
    gMinZ = Math.min(gMinZ, r.minZ); gMaxZ = Math.max(gMaxZ, r.minZ + r.absZ)
  }
  const width = gMaxX - gMinX
  const height = gMaxY - gMinY
  const length = gMaxZ - gMinZ

  // Build descomunal: abortar ANTES de asignar el array de bloques (volumen ×2
  // bytes → cientos de MB → cuelga el navegador). Se lanza con las dimensiones
  // para poder mostrar un aviso limpio.
  if (volumeTooLargeToParse(width, height, length)) throw new SchematicTooLargeError(width, height, length)

  // ── Paleta global: índice 0 reservado para aire (las celdas sin escribir quedan a 0) ──
  const palette: BlockState[] = [{ name: 'minecraft:air' }]
  const globalKeyToIndex = new Map<string, number>([['minecraft:air', 0]])
  const blocks = new Uint16Array(width * height * length)
  const containers = new Map<number, ContainerInfo>()
  const signs = new Map<number, SignText>()
  const itemFrames: ItemFrame[] = []
  const minecarts: Minecart[] = []
  const armorStands: ArmorStand[] = []
  const boats: Boat[] = []
  const movedBlocks = new Map<number, BlockState>()   // celdas moving_piston → bloque real que mueve
  const skullTex = new Map<number, string>()          // celdas de cabeza de jugador → hash de su skin

  for (const r of regions) {
    // Mapa índice local -> índice global de la paleta de esta región
    const localToGlobal = new Int32Array(r.palette.length)
    for (let i = 0; i < r.palette.length; i++) {
      const bs = r.palette[i]
      if (isAir(bs.name)) { localToGlobal[i] = 0; continue }
      const key = paletteKey(bs)
      let gi = globalKeyToIndex.get(key)
      if (gi === undefined) {
        gi = palette.length
        palette.push(bs)
        globalKeyToIndex.set(key, gi)
      }
      localToGlobal[i] = gi
    }

    const bits = Math.max(2, ceilLog2(r.palette.length))
    const decode = makeBitArrayReader(r.states, bits)

    const offX = r.minX - gMinX
    const offY = r.minY - gMinY
    const offZ = r.minZ - gMinZ
    const { absX, absY, absZ } = r

    for (let y = 0; y < absY; y++) {
      for (let z = 0; z < absZ; z++) {
        for (let x = 0; x < absX; x++) {
          // Orden interno de Litematica: idx = (y*absZ + z)*absX + x
          const local = (y * absZ + z) * absX + x
          const li = decode(local)
          if (li <= 0 || li >= r.palette.length) continue // 0 = aire o fuera de rango
          const gi = localToGlobal[li]
          if (gi === 0) continue
          blocks[cellIndex(width, length, offX + x, offY + y, offZ + z)] = gi
        }
      }
    }

    // Tile entities (inventario / carteles): x/y/z son locales a la región (0-based).
    if (r.tileEntities) {
      for (const teRaw of r.tileEntities) {
        if (!teRaw || typeof teRaw !== 'object' || Array.isArray(teRaw) || ArrayBuffer.isView(teRaw)) continue
        const te = teRaw as NbtCompound
        const gx = offX + Number(te.x), gy = offY + Number(te.y), gz = offZ + Number(te.z)
        if (gx < 0 || gx >= width || gy < 0 || gy >= height || gz < 0 || gz >= length) continue
        const cell = cellIndex(width, length, gx, gy, gz)
        const info = readContainerItems(te); if (info) containers.set(cell, info)
        const sign = readSignText(te); if (sign) signs.set(cell, sign)
        const moved = readMovingPiston(te); if (moved) movedBlocks.set(cell, moved)
        const skin = readSkullTexture(te); if (skin) skullTex.set(cell, skin)
      }
    }

    // Entidades: item frames y minecarts (Pos relativa a la región → celda global).
    if (r.entities) {
      for (const eRaw of r.entities) {
        if (!eRaw || typeof eRaw !== 'object' || Array.isArray(eRaw) || ArrayBuffer.isView(eRaw)) continue
        const e = eRaw as NbtCompound
        const frameMeta = readItemFrameMeta(e)
        const cartMeta   = frameMeta ? null : readMinecartMeta(e)
        const standMeta  = frameMeta || cartMeta ? null : readArmorStandMeta(e)
        const boatMeta   = frameMeta || cartMeta || standMeta ? null : readBoatMeta(e)
        if (!frameMeta && !cartMeta && !standMeta && !boatMeta) continue
        const p = e.Pos as unknown
        let px: number, py: number, pz: number
        if (Array.isArray(p) && p.length >= 3) { px = Number(p[0]); py = Number(p[1]); pz = Number(p[2]) }
        else if (ArrayBuffer.isView(p) && (p as Float64Array).length >= 3) { const a = p as Float64Array; px = a[0]; py = a[1]; pz = a[2] }
        else if (e.TileX !== undefined) { px = Number(e.TileX); py = Number(e.TileY); pz = Number(e.TileZ) }
        else continue
        // El Pos de las entidades es relativo a Position de la región (puede ser
        // negativo si Size es negativo). Mundo = Position + Pos; global = mundo - gMin.
        // fx/fy/fz = posición fraccionaria (exacta); gx/gy/gz = celda para el culling.
        const fx = (r.posX + px) - gMinX
        const fy = (r.posY + py) - gMinY
        const fz = (r.posZ + pz) - gMinZ
        const gx = Math.floor(fx), gy = Math.floor(fy), gz = Math.floor(fz)
        if (gx < 0 || gx >= width || gy < 0 || gy >= height || gz < 0 || gz >= length) continue
        if (frameMeta) itemFrames.push({ x: gx, y: gy, z: gz, ...frameMeta })
        else if (cartMeta) minecarts.push({ x: fx, y: fy, z: fz, ...cartMeta })
        else if (standMeta) armorStands.push({ x: fx, y: fy, z: fz, ...standMeta })
        else if (boatMeta) boats.push({ x: fx, y: fy, z: fz, ...boatMeta })
      }
    }
  }

  // moving_piston: sustituye cada uno por el bloque real que está siendo movido
  // (o la cabeza del pistón), leído de su block entity. Así se pinta con la
  // textura correcta en vez de un cubo sin textura.
  for (const [cell, bs] of movedBlocks) {
    if (isAir(bs.name)) { blocks[cell] = 0; continue }
    const key = paletteKey(bs)
    let gi = globalKeyToIndex.get(key)
    if (gi === undefined) {
      gi = palette.length
      palette.push(bs)
      globalKeyToIndex.set(key, gi)
    }
    blocks[cell] = gi
  }

  // Cabezas de jugador con skin propio: a cada celda se le asigna una entrada de
  // paleta sintética (clon del player_head + `skin` = key del atlas dinámico), una
  // por skin distinto, para que el skin real se pinte por la vía normal del mesh.
  const skins = expandSkullPalette(skullTex, blocks, palette)

  // Recuento de bloques no-aire sobre el resultado final (robusto ante solapes)
  let totalBlocks = 0
  for (let i = 0; i < blocks.length; i++) if (blocks[i] !== 0) totalBlocks++

  return { name, author, width, height, length, palette, blocks, totalBlocks, source: 'litematic', containers, signs, itemFrames, minecarts, armorStands, boats, skins }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function toBlockState(p: NbtCompound): BlockState {
  const name = String(p.Name)
  const props = p.Properties as NbtCompound | undefined
  if (!props) return normalizeLegacyBlockState({ name })
  const properties: Record<string, string> = {}
  for (const k of Object.keys(props)) properties[k] = String(props[k])
  return normalizeLegacyBlockState({ name, properties })
}

function paletteKey(b: BlockState): string {
  if (!b.properties) return b.name
  const keys = Object.keys(b.properties).sort()
  return b.name + '[' + keys.map((k) => `${k}=${b.properties![k]}`).join(',') + ']'
}

function ceilLog2(n: number): number {
  let bits = 0
  let v = n - 1
  while (v > 0) { bits++; v >>= 1 }
  return bits
}

/**
 * Devuelve una función que extrae el valor de `bits` bits en la posición `index`
 * del LitematicaBitArray (empaquetado contiguo, longs big-endian sin signo).
 */
function makeBitArrayReader(longs: BigInt64Array, bits: number): (index: number) => number {
  const bitsBig = BigInt(bits)
  const mask = (1n << bitsBig) - 1n
  const n = longs.length

  const getLong = (i: number): bigint =>
    i >= 0 && i < n ? BigInt.asUintN(64, longs[i]) : 0n

  return (index: number): number => {
    const startBit = index * bits
    const startLong = Math.floor(startBit / 64)
    const offset = startBit % 64
    const endLong = Math.floor((startBit + bits - 1) / 64)
    const offsetBig = BigInt(offset)

    let value: bigint
    if (startLong === endLong) {
      value = (getLong(startLong) >> offsetBig) & mask
    } else {
      const low = getLong(startLong) >> offsetBig
      const high = getLong(endLong) << (64n - offsetBig)
      value = (low | high) & mask
    }
    return Number(value)
  }
}
