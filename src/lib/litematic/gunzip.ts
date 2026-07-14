// Descompresión de los archivos de schematic.
// Tanto .litematic como .schem son NBT comprimido con gzip. Usamos el
// DecompressionStream nativo del navegador (soporte universal) — sin dependencias.

/**
 * Descomprime el buffer si detecta cabecera gzip/zlib; si no, lo devuelve tal cual
 * (algunos exportadores guardan NBT sin comprimir).
 */
export async function decompressIfNeeded(buf: ArrayBuffer): Promise<Uint8Array> {
  const bytes = new Uint8Array(buf)

  // gzip: magic 0x1f 0x8b
  if (bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b) {
    return inflate(bytes, 'gzip')
  }
  // zlib/deflate: 0x78 (0x01 / 0x9c / 0xda como segundo byte)
  if (bytes.length >= 2 && bytes[0] === 0x78) {
    return inflate(bytes, 'deflate')
  }
  // Sin comprimir (NBT crudo)
  return bytes
}

async function inflate(bytes: Uint8Array, format: 'gzip' | 'deflate'): Promise<Uint8Array> {
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue(bytes)
      controller.close()
    },
  })
  const stream = source.pipeThrough(new DecompressionStream(format))
  const out = await new Response(stream).arrayBuffer()
  return new Uint8Array(out)
}
