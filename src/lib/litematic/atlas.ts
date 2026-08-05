// Carga el atlas de texturas (public/atlas.png + atlas.json) y da el rectángulo UV
// de cada textura por nombre. Generado por tools/build-atlas.mjs.

import * as THREE from 'three'
import { asset } from './assets'

export interface AtlasData {
  size: { w: number; h: number }
  cell: number
  /** Margen en téxels alrededor de cada textura (réplica de su píxel de borde). */
  pad: number
  /** Niveles de mip en los que el margen sigue midiendo >= 1 téxel. */
  mipLevels: number
  cols: number
  white: number
  tiles: Record<string, number>
}

/** Celda completa en el atlas: la textura más su margen a cada lado. */
export const strideOf = (d: Pick<AtlasData, 'cell' | 'pad'>) => d.cell + 2 * d.pad

export type UVRect = readonly [number, number, number, number] // u0, v0, u1, v1 (v0 = arriba)

// Cadena de mipmaps por reducción box 2×2 exacta. Nivel 0 = atlas completo; cada
// nivel siguiente promedia bloques 2×2. Como la celda (textura + margen) es
// potencia de 2 y está alineada, el 2×2 nunca cruza el borde de una celda.
// El número de niveles lo marca el margen: solo son válidos aquellos en los que
// sigue midiendo >= 1 téxel, porque es el margen lo que evita el sangrado.
function buildTileMipChain(img: HTMLImageElement, extra: number): HTMLCanvasElement[] {
  const base = document.createElement('canvas')
  base.width = img.width; base.height = img.height
  base.getContext('2d')!.drawImage(img, 0, 0)
  const levels: HTMLCanvasElement[] = [base]
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
    const crudo = (await (await fetch(jsonUrl)).json()) as Partial<AtlasData> & Omit<AtlasData, 'pad' | 'mipLevels'>
    // Tolerar atlas SIN margen (formato anterior a tools/pad-atlas.mjs). Sin este
    // respaldo, `pad` llegaba undefined, el stride salia NaN y TODAS las UV eran
    // NaN: el modelo se renderizaba en blanco. Le paso justo eso al toggle de
    // Redstone Tweaks, que usa su propio atlas (atlas-rt) y se quedo sin convertir.
    // pad=0 es exactamente la geometria del formato viejo, asi que un atlas
    // antiguo sigue viendose bien (solo sin las ventajas del margen).
    const data: AtlasData = {
      ...crudo,
      pad:       crudo.pad ?? 0,
      mipLevels: crudo.mipLevels ?? 1,
    }
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const im = new Image()
      im.crossOrigin = 'anonymous'
      im.onload = () => resolve(im)
      im.onerror = reject
      im.src = pngUrl
    })
    // El atlas lleva un margen por textura (tools/pad-atlas.mjs), así que el
    // filtrado bilineal puede salirse del borde sin alcanzar la textura vecina:
    // lo que encuentra es una réplica del propio píxel de borde. Eso permite
    // usar trilineal completo, que es lo que de verdad quita el ruido de lejos.
    // Sin ese margen no había salida: interpolando aparecía una rejilla oscura
    // en cada arista (49-50% del color venía del tile de al lado) y sin
    // interpolar aparecían bandas de aliasing.
    const mips = buildTileMipChain(img, Math.max(0, data.mipLevels - 1))
    const texture = new THREE.Texture(mips[0])
    texture.mipmaps = mips as unknown as THREE.Texture['mipmaps']
    texture.magFilter = THREE.NearestFilter            // nítido y pixelado de cerca
    texture.minFilter = THREE.LinearMipmapLinearFilter // trilineal, ya sin sangrado
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
    const { cell, cols, pad, size } = this.data
    const stride = strideOf(this.data)
    const col = idx % cols, row = Math.floor(idx / cols)
    const scale = px / cell
    return {
      backgroundImage: `url(${this.pngUrl})`,
      backgroundSize: `${size.w * scale}px ${size.h * scale}px`,
      // El desplazamiento va por celda completa (stride) y salta el margen (pad).
      backgroundPosition: `-${(col * stride + pad) * scale}px -${(row * stride + pad) * scale}px`,
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
    const { cell, cols, pad, size } = this.data
    const stride = strideOf(this.data)
    const col = idx % cols, row = Math.floor(idx / cols)
    const ax0 = Math.min(x0, x1), ay0 = Math.min(y0, y1)
    const aw = Math.abs(x1 - x0) || 16, ah = Math.abs(y1 - y0) || 16
    const srcX = col * stride + pad + (ax0 / 16) * cell
    const srcY = row * stride + pad + (ay0 / 16) * cell
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
   * Rectángulo UV del tile: exactamente la textura, sin su margen.
   * Sin sesgo (`e`) a propósito. Antes hacía falta encoger el rango para que el
   * filtro no alcanzara al tile vecino, y eso obligaba a elegir entre sangrado
   * (e pequeño) y primer/último téxel a media anchura (e grande). Con el margen
   * del atlas ya no hay que elegir: el rango es el exacto, así que los téxeles
   * del borde miden lo mismo que los del centro.
   */
  uv(index: number): UVRect {
    const { cols, cell, pad, size } = this.data
    const stride = strideOf(this.data)
    const col = index % cols
    const row = Math.floor(index / cols)
    const x = col * stride + pad
    const y = row * stride + pad
    return [x / size.w, y / size.h, (x + cell) / size.w, (y + cell) / size.h]
  }
}
