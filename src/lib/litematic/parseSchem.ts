// Parser del formato Sponge Schematic (.schem), usado por WorldEdit/FAWE.
//
// v2: en la raíz están Width/Height/Length, Palette (mapa "id"->int) y BlockData
//     (byte array de varints).
// v3: todo cuelga de un compound "Schematic", y Palette/Data están dentro de "Blocks".
// El orden de BlockData es idx = (y*length + z)*width + x, igual que nuestro canónico.

import { NbtCompound, NbtValue } from './nbt'
import { BlockState, SchematicModel, ContainerInfo, SignText, ItemFrame, Minecart, ArmorStand, cellIndex, isAir, readContainerItems, readSignText, readItemFrameMeta, readMinecartMeta, readArmorStandMeta, readMovingPiston, readSkullTexture, expandSkullPalette, Boat, readBoatMeta } from './types'
import { SchematicTooLargeError, volumeTooLargeToParse } from './limits'
import { normalizeLegacyBlockState } from './legacyBlocks'

export function parseSchem(rootIn: NbtCompound): SchematicModel {
  // v3 envuelve todo en "Schematic"
  let root = rootIn
  const wrapped = root.Schematic
  if (wrapped && typeof wrapped === 'object' && !Array.isArray(wrapped) && !ArrayBuffer.isView(wrapped)) {
    root = wrapped as NbtCompound
  }

  const width = Number(root.Width)
  const height = Number(root.Height)
  const length = Number(root.Length)
  if (!width || !height || !length) {
    throw new Error('No es un .schem válido (faltan dimensiones)')
  }
  // Build descomunal: abortar antes de asignar el array de bloques.
  if (volumeTooLargeToParse(width, height, length)) throw new SchematicTooLargeError(width, height, length)

  // Localizar Palette + datos de bloque (v3 bajo "Blocks", v2 en la raíz)
  let paletteComp: NbtCompound | undefined
  let blockData: Int8Array | undefined
  const blocksTag = root.Blocks as NbtCompound | undefined
  if (blocksTag && (blocksTag.Palette || blocksTag.Data)) {
    paletteComp = blocksTag.Palette as NbtCompound
    blockData = blocksTag.Data as Int8Array
  } else {
    paletteComp = root.Palette as NbtCompound
    blockData = root.BlockData as Int8Array
  }
  if (!paletteComp || !blockData) {
    throw new Error('.schem sin Palette/BlockData')
  }

  // Paleta: id (int) -> block state
  let maxId = 0
  for (const k of Object.keys(paletteComp)) maxId = Math.max(maxId, Number(paletteComp[k]))
  const palette: BlockState[] = new Array(maxId + 1)
  for (const k of Object.keys(paletteComp)) {
    palette[Number(paletteComp[k])] = parseBlockString(k)
  }
  for (let i = 0; i < palette.length; i++) {
    if (!palette[i]) palette[i] = { name: 'minecraft:air' }
  }

  // Decodificar BlockData (varints) directamente al orden canónico
  const total = width * height * length
  const blocks = new Uint16Array(total)
  const data = blockData
  let bi = 0
  let oi = 0
  while (oi < total && bi < data.length) {
    let value = 0
    let shift = 0
    let b: number
    do {
      b = data[bi++] & 0xff
      value |= (b & 0x7f) << shift
      shift += 7
    } while ((b & 0x80) !== 0 && bi < data.length)
    blocks[oi++] = value < palette.length ? value : 0
  }

  let totalBlocks = 0
  for (let i = 0; i < total; i++) {
    if (!isAir(palette[blocks[i]].name)) totalBlocks++
  }

  // Block entities con inventario. v3: Blocks.BlockEntities; v2: BlockEntities en
  // la raíz; legado: TileEntities. La posición va en `Pos` (int[x,y,z]) o x/y/z.
  const containers = new Map<number, ContainerInfo>()
  const signs = new Map<number, SignText>()
  const skullTex = new Map<number, string>()   // celdas de cabeza de jugador → hash de su skin
  // Clave para deduplicar en la paleta al sustituir moving_piston por su bloque real.
  const bkey = (bs: BlockState) => bs.name + (bs.properties ? '|' + Object.entries(bs.properties).sort().map(([k, v]) => `${k}=${v}`).join(',') : '')
  const keyToIdx = new Map<string, number>()
  for (let i = 0; i < palette.length; i++) keyToIdx.set(bkey(palette[i]), i)
  const beList = (blocksTag?.BlockEntities ?? root.BlockEntities ?? root.TileEntities) as NbtValue[] | undefined
  if (Array.isArray(beList)) {
    for (const beRaw of beList) {
      if (!beRaw || typeof beRaw !== 'object' || Array.isArray(beRaw) || ArrayBuffer.isView(beRaw)) continue
      const be = beRaw as NbtCompound
      const pos = be.Pos
      let x: number, y: number, z: number
      if (ArrayBuffer.isView(pos) && (pos as Int32Array).length >= 3) {
        const p = pos as Int32Array
        x = p[0]; y = p[1]; z = p[2]
      } else {
        x = Number(be.x); y = Number(be.y); z = Number(be.z)
      }
      if (!Number.isFinite(x) || x < 0 || x >= width || y < 0 || y >= height || z < 0 || z >= length) continue
      const cell = cellIndex(width, length, x, y, z)
      const info = readContainerItems(be); if (info) containers.set(cell, info)
      const sign = readSignText(be); if (sign) signs.set(cell, sign)
      const skin = readSkullTexture(be); if (skin) skullTex.set(cell, skin)
      // moving_piston → pinta el bloque real que está siendo movido.
      const moved = readMovingPiston(be)
      if (moved) {
        if (isAir(moved.name)) { blocks[cell] = 0 }
        else {
          const k = bkey(moved)
          let gi = keyToIdx.get(k)
          if (gi === undefined) { gi = palette.length; palette.push(moved); keyToIdx.set(k, gi) }
          blocks[cell] = gi
        }
      }
    }
  }

  // Entidades (item frames y minecarts). En .schem el Pos es relativo al origen.
  const itemFrames: ItemFrame[] = []
  const minecarts: Minecart[] = []
  const armorStands: ArmorStand[] = []
  const boats: Boat[] = []
  const enList = (blocksTag?.Entities ?? root.Entities) as NbtValue[] | undefined
  if (Array.isArray(enList)) {
    for (const eRaw of enList) {
      if (!eRaw || typeof eRaw !== 'object' || Array.isArray(eRaw) || ArrayBuffer.isView(eRaw)) continue
      const e = eRaw as NbtCompound
      const frameMeta = readItemFrameMeta(e)
      const cartMeta   = frameMeta ? null : readMinecartMeta(e)
      const standMeta  = frameMeta || cartMeta ? null : readArmorStandMeta(e)
      const boatMeta   = frameMeta || cartMeta || standMeta ? null : readBoatMeta(e)
      if (!frameMeta && !cartMeta && !standMeta && !boatMeta) continue
      const p = e.Pos as unknown
      let fx: number, fy: number, fz: number
      if (Array.isArray(p) && p.length >= 3) { fx = Number(p[0]); fy = Number(p[1]); fz = Number(p[2]) }
      else if (ArrayBuffer.isView(p) && (p as Float64Array).length >= 3) { const a = p as Float64Array; fx = a[0]; fy = a[1]; fz = a[2] }
      else continue
      // fx/fy/fz = posición fraccionaria (exacta); x/y/z = celda para el culling.
      const x = Math.floor(fx), y = Math.floor(fy), z = Math.floor(fz)
      if (x < 0 || x >= width || y < 0 || y >= height || z < 0 || z >= length) continue
      if (frameMeta) itemFrames.push({ x, y, z, ...frameMeta })
      else if (cartMeta) minecarts.push({ x: fx, y: fy, z: fz, ...cartMeta })
      else if (standMeta) armorStands.push({ x: fx, y: fy, z: fz, ...standMeta })
      else if (boatMeta) boats.push({ x: fx, y: fy, z: fz, ...boatMeta })
    }
  }

  // Cabezas de jugador con skin propio → entradas de paleta sintéticas.
  const skins = expandSkullPalette(skullTex, blocks, palette)

  const metadata = root.Metadata as NbtCompound | undefined
  const name = metadata && typeof metadata.Name === 'string' ? metadata.Name : 'Schematic'
  const author = metadata && typeof metadata.Author === 'string' ? metadata.Author : undefined

  return { name, author, width, height, length, palette, blocks, totalBlocks, source: 'schem', containers, signs, itemFrames, minecarts, armorStands, boats, skins }
}

/** "minecraft:stone[facing=north,half=top]" -> { name, properties } */
function parseBlockString(s: string): BlockState {
  const br = s.indexOf('[')
  if (br === -1) return normalizeLegacyBlockState({ name: s })
  const name = s.slice(0, br)
  const inner = s.endsWith(']') ? s.slice(br + 1, -1) : s.slice(br + 1)
  const properties: Record<string, string> = {}
  for (const pair of inner.split(',')) {
    const eq = pair.indexOf('=')
    if (eq > 0) properties[pair.slice(0, eq)] = pair.slice(eq + 1)
  }
  return normalizeLegacyBlockState({ name, properties })
}
