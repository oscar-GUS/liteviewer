// Carga el atlas de texturas (public/atlas.png + atlas.json) y da el rectángulo UV
// de cada textura por nombre. Generado por tools/build-atlas.mjs.

import * as THREE from 'three'
import { asset } from './assets'

export interface AtlasData {
  size: { w: number; h: number }
  cell: number
  cols: number
  white: number
  tiles: Record<string, number>
}

export type UVRect = readonly [number, number, number, number] // u0, v0, u1, v1 (v0 = arriba)

// Cadena de mipmaps por reducción box 2×2 exacta. Nivel 0 = atlas completo; cada
// nivel siguiente promedia bloques 2×2. Con celdas potencia de 2 alineadas, el 2×2
// no cruza bordes de tile → sin sangrado. Se generan log2(cell) niveles extra
// (celda 16 → tiles 16,8,4,2,1).
function buildTileMipChain(img: HTMLImageElement, cell: number): HTMLCanvasElement[] {
  const base = document.createElement('canvas')
  base.width = img.width; base.height = img.height
  base.getContext('2d')!.drawImage(img, 0, 0)
  const levels: HTMLCanvasElement[] = [base]
  const extra = Math.max(0, Math.round(Math.log2(cell)))
  let prev = base
  for (let l = 0; l < extra; l++) {
    const pw = prev.width, ph = prev.height
    const nw = pw >> 1, nh = ph >> 1
    if (nw < 1 || nh < 1) break
    const src = prev.getContext('2d')!.getImageData(0, 0, pw, ph).data
    const next = document.createElement('canvas'); next.width = nw; next.height = nh
    const nctx = next.getContext('2d')!
    const out = nctx.createImageData(nw, nh)
    const d = out.data
    for (let y = 0; y < nh; y++) {
      for (let x = 0; x < nw; x++) {
        const sx = x * 2, sy = y * 2
        const i00 = (sy * pw + sx) * 4, i10 = i00 + 4, i01 = i00 + pw * 4, i11 = i01 + 4
        const o = (y * nw + x) * 4
        for (let c = 0; c < 4; c++) d[o + c] = (src[i00 + c] + src[i10 + c] + src[i01 + c] + src[i11 + c]) >> 2
      }
    }
    nctx.putImageData(out, 0, 0)
    levels.push(next)
    prev = next
  }
  return levels
}

export class Atlas {
  readonly texture: THREE.Texture
  private data: AtlasData
  private pngUrl: string

  private constructor(texture: THREE.Texture, data: AtlasData, pngUrl: string) {
    this.texture = texture
    this.data = data
    this.pngUrl = pngUrl
  }

  static async load(pngUrl = asset('atlas.png'), jsonUrl = asset('atlas.json')): Promise<Atlas> {
    const data = (await (await fetch(jsonUrl)).json()) as AtlasData
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const im = new Image()
      im.crossOrigin = 'anonymous'
      im.onload = () => resolve(im)
      im.onerror = reject
      im.src = pngUrl
    })
    // Cadena de mipmaps generada a mano con box 2×2 exacto: como las celdas son de
    // `cell` px (potencia de 2) y están alineadas, el 2×2 nunca cruza el borde de un
    // tile → mipmaps SIN sangrado entre texturas vecinas, sin regenerar el atlas.
    const mips = buildTileMipChain(img, data.cell)
    const texture = new THREE.Texture(mips[0])
    texture.mipmaps = mips as unknown as THREE.Texture['mipmaps']
    texture.magFilter = THREE.NearestFilter            // nítido y pixelado de cerca
    texture.minFilter = THREE.LinearMipmapLinearFilter // trilineal → sin ruido/aliasing de lejos
    texture.generateMipmaps = false
    texture.flipY = false
    texture.anisotropy = 8                             // aristas a ras: three lo capa al máx del hardware
    texture.needsUpdate = true
    return new Atlas(texture, data, pngUrl)
  }

  /** Estilos CSS para mostrar un tile como icono de `px` px (o null si no existe). */
  cssBackground(name: string, px: number): Record<string, string> | null {
    const idx = this.data.tiles[name]
    if (idx === undefined) return null
    const { cell, cols, size } = this.data
    const col = idx % cols, row = Math.floor(idx / cols)
    const scale = px / cell
    return {
      backgroundImage: `url(${this.pngUrl})`,
      backgroundSize: `${size.w * scale}px ${size.h * scale}px`,
      backgroundPosition: `-${col * cell * scale}px -${row * cell * scale}px`,
      imageRendering: 'pixelated',
    }
  }

  /**
   * Estilos CSS para mostrar una SUB-región (uv en 0-16 dentro del tile) escalada
   * a una caja boxW×boxH. Útil para componer caras sueltas de un modelo (p.ej. la
   * cara superior de una antorcha sobre la losa de un repetidor).
   */
  cssCrop(name: string, x0: number, y0: number, x1: number, y1: number, boxW: number, boxH: number): Record<string, string> | null {
    const idx = this.data.tiles[name]
    if (idx === undefined) return null
    const { cell, cols, size } = this.data
    const col = idx % cols, row = Math.floor(idx / cols)
    const ax0 = Math.min(x0, x1), ay0 = Math.min(y0, y1)
    const aw = Math.abs(x1 - x0) || 16, ah = Math.abs(y1 - y0) || 16
    const srcX = col * cell + (ax0 / 16) * cell
    const srcY = row * cell + (ay0 / 16) * cell
    const sx = boxW / ((aw / 16) * cell), sy = boxH / ((ah / 16) * cell)
    return {
      backgroundImage: `url(${this.pngUrl})`,
      backgroundSize: `${size.w * sx}px ${size.h * sy}px`,
      backgroundPosition: `-${srcX * sx}px -${srcY * sy}px`,
      backgroundRepeat: 'no-repeat',
      imageRendering: 'pixelated',
    }
  }

  get whiteIndex(): number {
    return this.data.white
  }

  getRawData(): AtlasData { return this.data }

  /** Índice de tile por nombre de textura, o undefined si no está en el atlas. */
  tileIndex(name: string): number | undefined {
    return this.data.tiles[name]
  }

  /**
   * Rectángulo UV del tile. Margen mínimo (`e`, en téxels) solo para que, con
   * NEAREST, el téxel del borde no salte al tile vecino (tiles pegados sin padding).
   * OJO: `e` grande (p.ej. 0.5) comprime el rango a `cell-1` téxels → el primer y
   * último píxel de cada cara salen a media anchura. Con 0.01 el sesgo es
   * imperceptible (~1%) y sigue muy por encima del error de float32 → sin sangrado.
   */
  uv(index: number): UVRect {
    const { cell, cols, size } = this.data
    const col = index % cols
    const row = Math.floor(index / cols)
    const e = 0.01
    return [
      (col * cell + e) / size.w,
      (row * cell + e) / size.h,
      ((col + 1) * cell - e) / size.w,
      ((row + 1) * cell - e) / size.h,
    ]
  }
}
