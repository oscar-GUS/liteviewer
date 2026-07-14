// Parser NBT (Named Binary Tag) minimalista para navegador.
// Big-endian, tags 0-12. Long y LongArray se conservan como BigInt porque la
// decodificación de bits de Litematica los necesita con precisión de 64 bits.

export type NbtValue =
  | number
  | bigint
  | string
  | Int8Array
  | Int32Array
  | BigInt64Array
  | NbtValue[]
  | NbtCompound

export interface NbtCompound {
  [key: string]: NbtValue
}

const TAG_END = 0
const TAG_COMPOUND = 10

const decoder = new TextDecoder('utf-8')

class NbtReader {
  private view: DataView
  private off = 0

  constructor(bytes: Uint8Array) {
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  }

  private u8(): number {
    const v = this.view.getUint8(this.off)
    this.off += 1
    return v
  }

  private i8(): number {
    const v = this.view.getInt8(this.off)
    this.off += 1
    return v
  }

  private i16(): number {
    const v = this.view.getInt16(this.off)
    this.off += 2
    return v
  }

  private i32(): number {
    const v = this.view.getInt32(this.off)
    this.off += 4
    return v
  }

  private i64(): bigint {
    const v = this.view.getBigInt64(this.off)
    this.off += 8
    return v
  }

  private f32(): number {
    const v = this.view.getFloat32(this.off)
    this.off += 4
    return v
  }

  private f64(): number {
    const v = this.view.getFloat64(this.off)
    this.off += 8
    return v
  }

  private str(): string {
    const len = this.view.getUint16(this.off)
    this.off += 2
    const bytes = new Uint8Array(this.view.buffer, this.view.byteOffset + this.off, len)
    this.off += len
    return decoder.decode(bytes)
  }

  private payload(type: number): NbtValue {
    switch (type) {
      case 1: return this.i8()
      case 2: return this.i16()
      case 3: return this.i32()
      case 4: return this.i64()
      case 5: return this.f32()
      case 6: return this.f64()
      case 7: { // TAG_Byte_Array
        const len = this.i32()
        const arr = new Int8Array(this.view.buffer, this.view.byteOffset + this.off, len).slice()
        this.off += len
        return arr
      }
      case 8: return this.str()
      case 9: { // TAG_List
        const elem = this.u8()
        const len = this.i32()
        const out: NbtValue[] = []
        for (let i = 0; i < len; i++) out.push(this.payload(elem))
        return out
      }
      case 10: { // TAG_Compound
        const obj: NbtCompound = {}
        for (;;) {
          const t = this.u8()
          if (t === TAG_END) break
          const name = this.str()
          obj[name] = this.payload(t)
        }
        return obj
      }
      case 11: { // TAG_Int_Array
        const len = this.i32()
        const arr = new Int32Array(len)
        for (let i = 0; i < len; i++) arr[i] = this.i32()
        return arr
      }
      case 12: { // TAG_Long_Array
        const len = this.i32()
        const arr = new BigInt64Array(len)
        for (let i = 0; i < len; i++) arr[i] = this.i64()
        return arr
      }
      default:
        throw new Error(`NBT: tipo de tag desconocido (${type})`)
    }
  }

  readRoot(): NbtCompound {
    const type = this.u8()
    if (type !== TAG_COMPOUND) {
      throw new Error(`NBT: la raíz no es un compound (tipo ${type})`)
    }
    this.str() // nombre de la raíz (se descarta)
    return this.payload(TAG_COMPOUND) as NbtCompound
  }
}

/** Parsea bytes NBT descomprimidos y devuelve el compound raíz. */
export function parseNbt(bytes: Uint8Array): NbtCompound {
  return new NbtReader(bytes).readRoot()
}
