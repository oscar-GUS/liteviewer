// Luz por celda para el modo exhibición, como la de Minecraft: luz de cielo y luz
// de bloque de 0 a 15 que se propagan de celda en celda perdiendo 1 por paso, sin
// atravesar lo macizo. La calcula el worker una vez por build (solo si la malla se
// pide con luz, ver MeshOptions.light) y meshRegion la lee para hornear en cada
// vértice la luz de sus celdas vecinas (el "smooth lighting" de vanilla).
//
// - Cielo: cada columna recibe 15 desde arriba hasta el primer bloque que la tapa.
//   Lo de alrededor del volumen cuenta como cielo abierto (la build está en un
//   mundo, no en una caja), y desde ahí se reparte por los huecos: bajo un tejado
//   se va apagando, y en un sótano sin aberturas no entra.
// - Bloque: desde cada emisor (antorchas, farolillos, lava...) con su nivel.
// - Lo macizo (cubos enteros opacos) no deja pasar ni recibe. Las caras enteras de
//   los bloques parciales tampoco dejan pasar por ese lado: una losa de abajo corta
//   la luz que baja, y un tejado de escaleras deja la casa a oscuras como en vanilla.
//   Hojas y agua restan uno más por celda.
//
// Ocupa un byte por celda (cielo en el nibble alto, bloque en el bajo): L, con 69 M
// de celdas, son 69 MB en el worker.

/** Lo que la propagación necesita de cada entrada de paleta. */
export interface LightPalette {
  /** No deja pasar la luz (cubo entero opaco). */
  opaque: Uint8Array
  /** Caras enteras del propio bloque (bit d = dirección d, como NEIGHBOR): por ahí no pasa. */
  faces: Uint8Array
  /** Lo que resta de más al entrar en la celda (hojas y agua: 1). */
  decay: Uint8Array
  /** Nivel de luz que emite (0 = nada). */
  emit: Uint8Array
}

// Desplazamientos de las 6 direcciones (como NEIGHBOR en buildMesh.ts: +X, -X, +Y, -Y, +Z, -Z).
const DX = [1, -1, 0, 0, 0, 0], DY = [0, 0, 1, -1, 0, 0], DZ = [0, 0, 0, 0, 1, -1]

/**
 * Luz de toda la build: un byte por celda en el mismo orden que `blocks`
 * ((y * L + z) * W + x), cielo << 4 | bloque. Las celdas opacas quedan a 0.
 */
export function computeLight(
  W: number, H: number, L: number, blocks: Uint16Array, lp: LightPalette, emitters: Uint32Array,
): Uint8Array {
  const N = W * H * L
  const WL = W * L
  const out = new Uint8Array(N)
  const { opaque, faces, decay } = lp
  // Cola de celdas por repartir. Crece si hace falta (una celda puede entrar
  // varias veces si luego le llega más luz por otro camino).
  let q = new Int32Array(1 << 16)
  let qh = 0, qt = 0
  const push = (c: number) => {
    if (qt === q.length) {
      if (qh > q.length >> 1) { q.copyWithin(0, qh, qt); qt -= qh; qh = 0 }
      else { const n = new Int32Array(q.length * 2); n.set(q); q = n }
    }
    q[qt++] = c
  }

  // ── Cielo ──
  // Columna a columna desde arriba: 15 sin perder nada hasta lo que la tapa. hm =
  // la primera altura (desde abajo) que tiene cielo directo en esa columna.
  const hm = new Int32Array(W * L)
  for (let z = 0; z < L; z++) {
    for (let x = 0; x < W; x++) {
      let y = H - 1
      for (; y >= 0; y--) {
        const c = y * WL + z * W + x
        const p = blocks[c]
        if (opaque[p] || decay[p]) break
        // Una cara entera arriba (losa de arriba, tejado) corta el cielo de esta celda.
        if (faces[p] & 4) break
        out[c] = 0xf0
        // La de abajo, entera, deja la celda con cielo pero no lo pasa.
        if (faces[p] & 8) { y--; break }
      }
      hm[z * W + x] = y + 1
    }
  }
  // Semillas: las celdas con cielo directo que tienen al lado (o debajo) una que no
  // lo tiene. Con el mapa de alturas basta mirar las columnas vecinas.
  for (let z = 0; z < L; z++) {
    for (let x = 0; x < W; x++) {
      const h = hm[z * W + x]
      if (h >= H) continue
      let top = h   // hasta dónde (sin incluir) hay vecinas sin cielo a la misma altura
      if (x > 0) top = Math.max(top, hm[z * W + x - 1])
      if (x < W - 1) top = Math.max(top, hm[z * W + x + 1])
      if (z > 0) top = Math.max(top, hm[(z - 1) * W + x])
      if (z < L - 1) top = Math.max(top, hm[(z + 1) * W + x])
      for (let y = h; y < Math.min(top, H); y++) push(y * WL + z * W + x)
      if (h > 0) push(h * WL + z * W + x)   // hacia abajo, lo que haya bajo la columna
    }
  }
  // Los lados del volumen dan al aire libre: lo que no tiene cielo directo recibe 14
  // desde fuera si su cara hacia fuera lo deja pasar.
  const fromOutside = (x: number, y: number, z: number, d: number) => {
    const c = y * WL + z * W + x
    const p = blocks[c]
    if (opaque[p] || faces[p] & (1 << d)) return
    const lv = 14 - decay[p]
    if (lv > out[c] >> 4) { out[c] = (lv << 4) | (out[c] & 15); push(c) }
  }
  for (let y = 0; y < H; y++) {
    for (let z = 0; z < L; z++) { fromOutside(0, y, z, 1); if (W > 1) fromOutside(W - 1, y, z, 0) }
    for (let x = 0; x < W; x++) { fromOutside(x, y, 0, 5); if (L > 1) fromOutside(x, y, L - 1, 4) }
  }
  spread(true)

  // ── Bloque ──
  qh = qt = 0
  for (let i = 0; i < emitters.length; i++) {
    const c = emitters[i]
    const lv = lp.emit[blocks[c]]
    if (lv > (out[c] & 15)) { out[c] = (out[c] & 0xf0) | lv; push(c) }
  }
  spread(false)
  return out

  // Reparte lo que hay en la cola: cada vecina que lo deja pasar recibe uno menos
  // (más lo que reste ella). sky: el nibble del cielo; si no, el del bloque.
  function spread(sky: boolean): void {
    const sh = sky ? 4 : 0
    while (qh < qt) {
      const c = q[qh++]
      const lv = (out[c] >> sh) & 15
      if (lv <= 1) continue
      const x = c % W, z = ((c / W) | 0) % L, y = (c / WL) | 0
      const pc = blocks[c]
      // Un emisor macizo (piedra luminosa) sí da luz hacia fuera.
      const own = opaque[pc] ? 0 : faces[pc]
      for (let d = 0; d < 6; d++) {
        if (own & (1 << d)) continue
        const nx = x + DX[d], ny = y + DY[d], nz = z + DZ[d]
        if (nx < 0 || ny < 0 || nz < 0 || nx >= W || ny >= H || nz >= L) continue
        const n = ny * WL + nz * W + nx
        const pn = blocks[n]
        if (opaque[pn] || faces[pn] & (1 << (d ^ 1))) continue
        const nl = lv - 1 - decay[pn]
        if (nl <= ((out[n] >> sh) & 15)) continue
        out[n] = sky ? (nl << 4) | (out[n] & 15) : (out[n] & 0xf0) | nl
        push(n)
      }
    }
  }
}
