// Base de los assets del visor (atlas, models, entity-atlas, item-atlas…).
// MineLite los sirve desde la raíz del sitio ('/'); un consumidor standalone
// servido en una subruta (p. ej. el repo liteviewer en GitHub Pages) llama a
// setAssetBase() con su base relativa. Por defecto '/' → comportamiento MineLite.
let base = '/'

export function setAssetBase(b: string): void {
  base = b || '/'
}

/** Resuelve la ruta de un asset contra la base configurada. asset('atlas.png'). */
export function asset(path: string): string {
  const p = path.replace(/^\/+/, '')
  return base.endsWith('/') ? base + p : base + '/' + p
}

// El proxy de skins (/api/skin) solo existe en MineLite. Con la base de serie el
// visor está dentro de MineLite y va relativo; con otra base es el Lite Viewer
// (GitHub Pages) y va a MineLite, que le da permiso de CORS en esa ruta.
const MINELITE = 'https://www.minelite.es'

/** URL de la skin de una cabeza de jugador (textura de 64x64) por su hash. */
export function skinUrl(hash: string): string {
  return `${base === '/' ? '' : MINELITE}/api/skin/${hash}`
}
