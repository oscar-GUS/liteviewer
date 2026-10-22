// Carga el atlas de texturas (public/atlas.png + atlas.json) y da el rectángulo UV
// de cada textura por nombre. Generado por tools/build-atlas.mjs.

import * as THREE from 'three'
import { asset } from './assets'
import { OPAQUE_LEAF_SUFFIX } from './buildMesh'

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
  /** Huella del PNG (sha1 corto). Se cuelga a la URL de la textura: los PNG de
   *  /public se cachean 30 días y sin ella un atlas nuevo (UV nuevas en el JSON)
   *  se pintaría sobre el PNG viejo de la caché. Igual que en entity-atlas. */
  v?: string
}

/** Celda completa en el atlas: la textura más su margen a cada lado. */
export const strideOf = (d: Pick<AtlasData, 'cell' | 'pad'>) => d.cell + 2 * d.pad

export type UVRect = readonly [number, number, number, number] // u0, v0, u1, v1 (v0 = arriba)

// Umbral del alphaTest de los materiales de recorte (0.5) en bytes.
const CUTOFF = 128

// Cadena de mipmaps por reducción box 2×2 exacta. Nivel 0 = atlas completo; cada
// nivel siguiente promedia bloques 2×2. Como la celda (textura + margen) es
// potencia de 2 y está alineada, el 2×2 nunca cruza el borde de una celda.
// El número de niveles lo marca el margen: solo son válidos aquellos en los que
// sigue midiendo >= 1 téxel, porque es el margen lo que evita el sangrado.
//
// Dos arreglos para que las texturas de recorte (hojas, raíles, flores, cristal)
// no se borren de lejos:
// - El color se promedia pesado por el alfa. Antes los téxeles transparentes (que
//   en el canvas son negros) entraban en la media y oscurecían los bordes.
// - El alfa de cada textura se reescala en cada nivel para que pase el alphaTest
//   la misma fracción de téxeles que en el nivel 0 (I. Castaño, "Computing alpha
//   mipmaps"). Con la media a secas el alfa baja de 0.5 y la textura adelgaza
//   hasta desaparecer: los raíles se iban a 30 bloques.
//   Solo en las de alfa todo o nada; las de alfa intermedio (cristal tintado, agua,
//   hielo) van con mezcla y su media es la correcta.
function buildTileMipChain(base: HTMLCanvasElement, d: AtlasData): HTMLCanvasElement[] {
  const levels: HTMLCanvasElement[] = [base]
  const extra = Math.max(0, d.mipLevels - 1)
  if (!extra) return levels
  const stride = strideOf(d)
  const cols = Math.floor(base.width / stride), rows = Math.floor(base.height / stride)
  let pw = base.width, ph = base.height
  let src: Uint8ClampedArray = base.getContext('2d', { willReadFrequently: true })!.getImageData(0, 0, pw, ph).data

  // Cobertura de cada celda en el nivel 0 (fracción de téxeles que pasan el
  // alphaTest), o -1 si no se toca (opaca entera, vacía o de alfa intermedio).
  const cov0 = new Float32Array(cols * rows).fill(-1)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let pass = 0, semi = 0
      const x0 = c * stride + d.pad, y0 = r * stride + d.pad
      for (let y = y0; y < y0 + d.cell; y++) {
        for (let x = x0; x < x0 + d.cell; x++) {
          const a = src[(y * pw + x) * 4 + 3]
          if (a >= CUTOFF) pass++
          if (a > 8 && a < 247) semi++
        }
      }
      const n = d.cell * d.cell
      if (!semi && pass > 0 && pass < n) cov0[r * cols + c] = pass / n
    }
  }

  for (let l = 1; l <= extra; l++) {
    const nw = pw >> 1, nh = ph >> 1
    if (nw < 1 || nh < 1) break
    const out = new Uint8ClampedArray(nw * nh * 4)
    for (let y = 0; y < nh; y++) {
      for (let x = 0; x < nw; x++) {
        const i00 = ((y * 2) * pw + x * 2) * 4, i10 = i00 + 4, i01 = i00 + pw * 4, i11 = i01 + 4
        const a00 = src[i00 + 3], a10 = src[i10 + 3], a01 = src[i01 + 3], a11 = src[i11 + 3]
        const sa = a00 + a10 + a01 + a11
        const o = (y * nw + x) * 4
        if (sa > 0) {
          for (let k = 0; k < 3; k++) {
            out[o + k] = (src[i00 + k] * a00 + src[i10 + k] * a10 + src[i01 + k] * a01 + src[i11 + k] * a11) / sa + 0.5
          }
        }
        out[o + 3] = (sa + 2) >> 2
      }
    }

    // Escalado del alfa por celda sobre una copia: el siguiente nivel sale de la
    // media sin escalar, o el reescalado se acumularía nivel a nivel.
    const scaled = new Uint8ClampedArray(out)
    const st = stride >> l, cl = d.cell >> l, pd = d.pad >> l
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const target = cov0[r * cols + c]
        if (target < 0) continue
        const x0 = c * st + pd, y0 = r * st + pd
        const coverage = (s: number) => {
          let pass = 0
          for (let y = y0; y < y0 + cl; y++) for (let x = x0; x < x0 + cl; x++) if (out[(y * nw + x) * 4 + 3] * s >= CUTOFF) pass++
          return pass / (cl * cl)
        }
        let lo = 0, hi = 8
        for (let it = 0; it < 14; it++) {
          const mid = (lo + hi) / 2
          if (coverage(mid) < target) lo = mid; else hi = mid
        }
        const s = coverage(hi) - target <= target - coverage(lo) ? hi : lo
        if (Math.abs(s - 1) < 1e-3) continue
        // La celda entera, margen incluido (es réplica del borde y entra en el filtrado).
        for (let y = r * st; y < (r + 1) * st; y++) {
          for (let x = c * st; x < (c + 1) * st; x++) {
            const i = (y * nw + x) * 4 + 3
            scaled[i] = out[i] * s
          }
        }
      }
    }

    const next = document.createElement('canvas'); next.width = nw; next.height = nh
    next.getContext('2d')!.putImageData(new ImageData(scaled, nw, nh), 0, 0)
    levels.push(next)
    src = out; pw = nw; ph = nh
  }
  return levels
}

// Hojas rápidas: una copia opaca de cada textura de hojas en una celda libre del
// atlas (`<nombre>#opaca`), con los huecos rellenos de un tono oscuro de la propia
// hoja, como el modo "Gráficos: Rápidos" de vanilla. Así las hojas rápidas son
// quads normales de la pasada sólida, sin otra malla ni otro material. Si no
// quedan celdas libres (al atlas de Redstone Tweaks le sobran 5), se añaden filas
// por abajo: `size` crece y las UV de todo se calculan con el tamaño nuevo, el
// mismo que lee el worker (getRawData).
function addOpaqueLeaves(img: HTMLImageElement, d: AtlasData): HTMLCanvasElement {
  const stride = strideOf(d)
  const names = Object.keys(d.tiles).filter((n) => n.endsWith('_leaves') && !n.startsWith('bamboo_'))
  const rows = Math.floor(img.height / stride)
  const used = new Set(Object.values(d.tiles)); used.add(d.white)
  // Más allá de las filas del PNG todo está libre (filas nuevas).
  const free: number[] = []
  for (let i = 0; free.length < names.length; i++) if (i >= d.cols * rows || !used.has(i)) free.push(i)
  const totalRows = free.length ? Math.max(rows, Math.floor(free[free.length - 1] / d.cols) + 1) : rows

  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height + (totalRows - rows) * stride
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!
  ctx.drawImage(img, 0, 0)
  if (canvas.height !== img.height) d.size = { w: d.size.w, h: d.size.h + (totalRows - rows) * stride }

  names.forEach((name, k) => {
    const from = d.tiles[name], to = free[k]
    const sx = (from % d.cols) * stride, sy = Math.floor(from / d.cols) * stride
    const tx = (to % d.cols) * stride, ty = Math.floor(to / d.cols) * stride
    const px = ctx.getImageData(sx, sy, stride, stride)
    const p = px.data
    let r = 0, g = 0, b = 0, n = 0
    for (let i = 0; i < p.length; i += 4) if (p[i + 3] >= CUTOFF) { r += p[i]; g += p[i + 1]; b += p[i + 2]; n++ }
    const hole = n ? [r / n * 0.4, g / n * 0.4, b / n * 0.4] : [0, 0, 0]
    for (let i = 0; i < p.length; i += 4) {
      if (p[i + 3] < CUTOFF) { p[i] = hole[0]; p[i + 1] = hole[1]; p[i + 2] = hole[2] }
      p[i + 3] = 255
    }
    ctx.putImageData(px, tx, ty)
    d.tiles[name + OPAQUE_LEAF_SUFFIX] = to
  })
  return canvas
}

export class Atlas {
  readonly texture: THREE.Texture
  private data: AtlasData
  private pngUrl: string
  /** Tamaño del PNG tal cual (para los iconos CSS); `data.size` puede ser mayor si
   *  se añadieron filas para las hojas opacas. */
  private pngSize: { w: number; h: number }

  private constructor(texture: THREE.Texture, data: AtlasData, pngUrl: string, pngSize: { w: number; h: number }) {
    this.texture = texture
    this.data = data
    this.pngUrl = pngUrl
    this.pngSize = pngSize
  }

  static async load(pngUrl = asset('atlas.png'), jsonUrl = asset('atlas.json')): Promise<Atlas> {
    // El JSON revalida siempre (`no-cache`) y el PNG cuelga de su huella `v`.
    const crudo = (await (await fetch(jsonUrl, { cache: 'no-cache' })).json()) as Partial<AtlasData> & Omit<AtlasData, 'pad' | 'mipLevels'>
    // Tolerar atlas SIN margen (formato anterior a tools/pad-atlas.mjs). Sin este
    // respaldo, `pad` llegaba undefined, el stride salia NaN y TODAS las UV eran
    // NaN: el modelo se renderizaba en blanco. Le paso justo eso al toggle de
    // Redstone Tweaks, que usa su propio atlas (atlas-rt) y se quedo sin convertir.
    // pad=0 es exactamente la geometria del formato viejo, asi que un atlas
    // antiguo sigue viendose bien (solo sin las ventajas del margen).
    const data: AtlasData = {
      ...crudo,
      tiles: { ...crudo.tiles },
      size: { ...crudo.size },
      pad:       crudo.pad ?? 0,
      mipLevels: crudo.mipLevels ?? 1,
    }
    const src = data.v ? `${pngUrl}${pngUrl.includes('?') ? '&' : '?'}v=${encodeURIComponent(data.v)}` : pngUrl
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const im = new Image()
      im.crossOrigin = 'anonymous'
      im.onload = () => resolve(im)
      im.onerror = reject
      im.src = src
    })
    // El atlas lleva un margen por textura (tools/pad-atlas.mjs), así que el
    // filtrado bilineal puede salirse del borde sin alcanzar la textura vecina:
    // lo que encuentra es una réplica del propio píxel de borde. Eso permite
    // usar trilineal completo, que es lo que de verdad quita el ruido de lejos.
    // Sin ese margen no había salida: interpolando aparecía una rejilla oscura
    // en cada arista (49-50% del color venía del tile de al lado) y sin
    // interpolar aparecían bandas de aliasing.
    const base = addOpaqueLeaves(img, data)
    const mips = buildTileMipChain(base, data)
    const texture = new THREE.Texture(mips[0])
    texture.mipmaps = mips as unknown as THREE.Texture['mipmaps']
    texture.magFilter = THREE.NearestFilter            // nítido y pixelado de cerca
    texture.minFilter = THREE.LinearMipmapLinearFilter // trilineal, ya sin sangrado
    texture.generateMipmaps = false
    texture.flipY = false
    texture.anisotropy = 8                             // aristas a ras: three lo capa al máx del hardware
    texture.needsUpdate = true
    return new Atlas(texture, data, src, { w: img.width, h: img.height })
  }

  /** Estilos CSS para mostrar un tile como icono de `px` px (o null si no existe). */
  cssBackground(name: string, px: number): Record<string, string> | null {
    const idx = this.data.tiles[name]
    if (idx === undefined) return null
    const { cell, cols, pad } = this.data
    const size = this.pngSize
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
    const { cell, cols, pad } = this.data
    const size = this.pngSize
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
