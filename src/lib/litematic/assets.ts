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
