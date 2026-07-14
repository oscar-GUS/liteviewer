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
    const texture = await new Promise<THREE.Texture>((resolve, reject) => {
      new THREE.TextureLoader().load(pngUrl, (t) => {
        t.magFilter = THREE.NearestFilter
        t.minFilter = THREE.NearestFilter
        t.generateMipmaps = false
        t.flipY = false
        resolve(t)
      }, undefined, reject)
    })
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
