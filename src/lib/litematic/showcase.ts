// Modo exhibición: la build al atardecer, con el aspecto de un pack de shaders.
// Todo es propio (nada copiado de packs de shaders); el visor lo usa así:
//
// - Materiales: los MeshBasicMaterial de siempre con el sombreado cambiado
//   (onBeforeCompile). Así siguen sirviendo el recorte, el alphaTest, el atlas y el
//   resaltado de materiales sin escribir nada de eso otra vez. La normal sale de las
//   derivadas de la posición (las caras son planas): la malla no necesita normales,
//   que en L eran 90 MB y ~300 ms al entrar.
// - Color de partida: el color de vértice lleva el sombreado por cara de vanilla y
//   la sombra suave horneados; se deshacen con lo que trae el atributo `lit` (ver
//   RawBuffers.lit) y se ilumina de nuevo en lineal: sol, cielo, luz de bloque.
// - Sol: rasante y cálido, con su mapa de sombras propio (SunShadow), con sombra de
//   contacto nítida y penumbra que se abre con la distancia al que tapa (PCSS).
// - Cielo: degradado de atardecer con el sol, su halo y nubes, en un triángulo a
//   pantalla completa que se pinta antes que nada.
// - Niebla de distancia y de altura con el color del horizonte en esa dirección.
// - Agua con reflejo del cielo (Fresnel), olas en la normal y brillo del sol; lava
//   que brilla y se mueve; hojas y plantas que se mecen.
// - Al final (gradePass): AgX, un poco de saturación y calidez, viñeta y tramado.
//
// En móvil o con una GPU floja va la versión ligera ('ligera'): cielo, color,
// niebla, luz de bloque y tono, con una sombra simple y sin nada animado.

import * as THREE from 'three'

export type ScQuality = 'alta' | 'ligera'
/** Qué capa pinta un material: lo opaco, lo translúcido (agua, cristal) o lo que da luz. */
export type ScRole = 'solid' | 'trans' | 'emit'

// Sol del atardecer: azimut (desde +X hacia +Z) y altura. Con la cámara de serie
// (desde +X+Z) entra por la derecha y algo de frente: ilumina las caras que miran a
// +X y tira las sombras largas hacia la izquierda, por el suelo.
const SUN_AZ = -22 * Math.PI / 180
const SUN_EL = 17 * Math.PI / 180

// ── Hora del día ──
// De las 5:30 (amanecer) a las 22:30 (noche); de serie, el atardecer de siempre.
export const HORA_MIN = 5.5, HORA_MAX = 22.5, HORA_SERIE = 18.5

/** Nombre del momento del día de una hora. */
export function momentoDelDia(h: number): string {
  return h < 7 ? 'Amanecer' : h < 11 ? 'Mañana' : h < 14.5 ? 'Mediodía' : h < 17.5 ? 'Tarde' : h < 19.9 ? 'Atardecer' : h < 21.2 ? 'Anochecer' : 'Noche'
}

type V3 = [number, number, number]
// Lo que cambia con la hora. Los colores van en lineal y con HDR, como el resto.
interface Paleta {
  hzSun: V3; hzAway: V3; bandSun: V3; bandAway: V3; zen: V3; low: V3
  glow: V3; disk: V3; cloudLit: V3; cloudBase: V3
  ambUp: V3; ambHz: V3; ambDn: V3; ambSun: V3
  sun: V3        // color e intensidad de la luz que da sombra (el sol, o la luna)
  exposure: number; bloom: number; stars: number; moon: number
  fill: number   // relleno del suelo de césped (ver SC_SUELO)
  block: number  // luz de bloque (antorchas, farolillos...)
}
// Momentos clave; entre dos se mezcla suave. El de las 18:30 es el atardecer de
// siempre, tal cual (las constantes que había antes en los shaders).
const PALETAS: [number, Paleta][] = [
  [5.5, {   // amanecer: sol bajo, rosado
    hzSun: [1.55, 0.72, 0.55], hzAway: [0.42, 0.36, 0.55], bandSun: [0.90, 0.52, 0.55], bandAway: [0.16, 0.19, 0.42], zen: [0.035, 0.065, 0.20], low: [0.05, 0.05, 0.09],
    glow: [1.6, 0.80, 0.55], disk: [45, 30, 20], cloudLit: [1.9, 1.0, 0.85], cloudBase: [0.50, 0.38, 0.50],
    ambUp: [0.17, 0.21, 0.44], ambHz: [0.20, 0.19, 0.31], ambDn: [0.12, 0.09, 0.08], ambSun: [0.20, 0.10, 0.08],
    sun: [4.2, 2.6, 2.0], exposure: 1.15, bloom: 0.25, stars: 0, moon: 0, fill: 0.45, block: 1,
  }],
  [8.5, {   // mañana: cielo azul, sol algo cálido
    hzSun: [1.20, 0.98, 0.82], hzAway: [0.50, 0.65, 0.95], bandSun: [0.55, 0.66, 1.00], bandAway: [0.24, 0.42, 0.95], zen: [0.06, 0.17, 0.58], low: [0.16, 0.19, 0.27],
    glow: [1.4, 1.0, 0.65], disk: [55, 45, 30], cloudLit: [2.3, 2.05, 1.75], cloudBase: [1.0, 1.0, 1.1],
    ambUp: [0.26, 0.37, 0.74], ambHz: [0.25, 0.29, 0.44], ambDn: [0.17, 0.14, 0.10], ambSun: [0.08, 0.05, 0.03],
    sun: [4.8, 4.0, 3.2], exposure: 0.95, bloom: 0.18, stars: 0, moon: 0, fill: 0.5, block: 1,
  }],
  [13, {    // mediodía: sol alto y blanco, sombras cortas
    hzSun: [0.82, 0.95, 1.18], hzAway: [0.62, 0.78, 1.10], bandSun: [0.36, 0.58, 1.20], bandAway: [0.28, 0.50, 1.15], zen: [0.07, 0.20, 0.80], low: [0.22, 0.27, 0.36],
    glow: [1.2, 1.15, 1.0], disk: [60, 58, 50], cloudLit: [2.5, 2.5, 2.5], cloudBase: [1.3, 1.35, 1.45],
    ambUp: [0.30, 0.42, 0.80], ambHz: [0.29, 0.34, 0.48], ambDn: [0.19, 0.17, 0.14], ambSun: [0.03, 0.03, 0.02],
    sun: [4.9, 4.7, 4.3], exposure: 0.85, bloom: 0.12, stars: 0, moon: 0, fill: 0.5, block: 1,
  }],
  [16, {    // tarde: como la mañana, algo más dorada
    hzSun: [1.35, 0.98, 0.70], hzAway: [0.55, 0.62, 0.85], bandSun: [0.70, 0.68, 0.85], bandAway: [0.25, 0.40, 0.85], zen: [0.05, 0.14, 0.50], low: [0.14, 0.15, 0.22],
    glow: [1.6, 1.0, 0.55], disk: [55, 42, 26], cloudLit: [2.3, 1.85, 1.4], cloudBase: [0.90, 0.85, 0.95],
    ambUp: [0.24, 0.34, 0.70], ambHz: [0.23, 0.26, 0.40], ambDn: [0.17, 0.13, 0.09], ambSun: [0.12, 0.06, 0.03],
    sun: [5.0, 3.8, 2.6], exposure: 0.95, bloom: 0.2, stars: 0, moon: 0, fill: 0.5, block: 1,
  }],
  [18.5, {  // atardecer (el de siempre)
    hzSun: [1.65, 0.62, 0.20], hzAway: [0.34, 0.20, 0.36], bandSun: [0.85, 0.40, 0.24], bandAway: [0.085, 0.11, 0.34], zen: [0.018, 0.040, 0.14], low: [0.030, 0.034, 0.072],
    glow: [1.7, 0.70, 0.22], disk: [48, 28, 12], cloudLit: [1.9, 0.85, 0.36], cloudBase: [0.42, 0.28, 0.36],
    ambUp: [0.20, 0.29, 0.66], ambHz: [0.20, 0.22, 0.36], ambDn: [0.16, 0.10, 0.07], ambSun: [0.20, 0.075, 0.022],
    sun: [5.2, 3.016, 1.456], exposure: 1.0, bloom: 0.25, stars: 0, moon: 0, fill: 0.5, block: 1,
  }],
  [20.4, {  // anochecer: el sol ya no está, cielo morado y las primeras estrellas
    hzSun: [0.62, 0.26, 0.30], hzAway: [0.13, 0.09, 0.21], bandSun: [0.28, 0.15, 0.32], bandAway: [0.04, 0.045, 0.15], zen: [0.008, 0.013, 0.055], low: [0.012, 0.012, 0.03],
    glow: [0.5, 0.20, 0.14], disk: [0, 0, 0], cloudLit: [0.55, 0.28, 0.38], cloudBase: [0.13, 0.10, 0.17],
    ambUp: [0.07, 0.08, 0.18], ambHz: [0.07, 0.06, 0.12], ambDn: [0.035, 0.025, 0.035], ambSun: [0.05, 0.02, 0.02],
    sun: [0, 0, 0], exposure: 1.5, bloom: 0.3, stars: 0.35, moon: 0, fill: 0.1, block: 1.1,
  }],
  [22.0, {  // noche: oscura, estrellas y luna; la luz es la de las antorchas
    hzSun: [0.04, 0.05, 0.10], hzAway: [0.03, 0.04, 0.085], bandSun: [0.018, 0.026, 0.07], bandAway: [0.014, 0.022, 0.06], zen: [0.003, 0.005, 0.02], low: [0.006, 0.007, 0.014],
    glow: [0, 0, 0], disk: [0, 0, 0], cloudLit: [0.09, 0.10, 0.15], cloudBase: [0.035, 0.04, 0.07],
    ambUp: [0.035, 0.05, 0.11], ambHz: [0.03, 0.035, 0.07], ambDn: [0.012, 0.012, 0.018], ambSun: [0, 0, 0],
    sun: [0.30, 0.38, 0.62], exposure: 2.0, bloom: 0.35, stars: 1, moon: 1, fill: 0.05, block: 1.2,
  }],
]

// El camino del sol: el de verdad, un arco limpio a velocidad constante (15 grados
// por hora alrededor del eje del mundo), como a 40° de latitud a principios de verano
// (declinación 20°): sale a las ~5:40 por el noreste, a mediodía está a 70° hacia el
// sur y se pone a las ~20:05 por el noroeste. El mediodía va a la hora con la que a las
// 18:30 está a la altura del atardecer de siempre (SUN_EL), y todo el arco se gira para
// que a esa hora venga de donde venía (SUN_AZ). La luna, enfrente.
const LAT = 40 * Math.PI / 180, DECL = 20 * Math.PI / 180
const MEDIODIA = HORA_SERIE - Math.acos((Math.sin(SUN_EL) - Math.sin(LAT) * Math.sin(DECL)) / (Math.cos(LAT) * Math.cos(DECL))) / (Math.PI / 12)

// Dirección del sol a la hora h, en (este, norte, arriba).
function solLocal(h: number): [number, number, number] {
  const H = (h - MEDIODIA) * Math.PI / 12
  return [
    -Math.cos(DECL) * Math.sin(H),
    Math.sin(DECL) * Math.cos(LAT) - Math.cos(DECL) * Math.sin(LAT) * Math.cos(H),
    Math.sin(DECL) * Math.sin(LAT) + Math.cos(DECL) * Math.cos(LAT) * Math.cos(H),
  ]
}
// Giro de (este, norte) al plano XZ del visor para que a HORA_SERIE el sol venga de SUN_AZ.
const SOL_GIRO = (() => { const [e, n] = solLocal(HORA_SERIE); return SUN_AZ - Math.atan2(n, e) })()

function paleta(h: number): Paleta {
  let i = 1
  while (i < PALETAS.length - 1 && h > PALETAS[i][0]) i++
  const [h0, a] = PALETAS[i - 1], [h1, b] = PALETAS[i]
  let t = Math.max(0, Math.min(1, (h - h0) / (h1 - h0)))
  t = t * t * (3 - 2 * t)
  const out = {} as Record<string, unknown>
  for (const k of Object.keys(a) as (keyof Paleta)[]) {
    const x = a[k], y = b[k]
    out[k] = Array.isArray(x) ? (x as V3).map((v, j) => v + ((y as V3)[j] - v) * t) : (x as number) + ((y as number) - (x as number)) * t
  }
  return out as unknown as Paleta
}

// Mapas de sombras: lado en texels.
const SHADOW_SIZE: Record<ScQuality, number> = { alta: 4096, ligera: 2048 }

// GLSL común al cielo y a los materiales: ruido, cielo, luz ambiente y niebla.
const GLSL_COMMON = /* glsl */`
uniform vec3 scSunDir;
uniform vec3 scSunCol;
uniform float scTime;
uniform vec4 scFog;
// La hora del día (ver Showcase.setTime): el sol del cielo (scSunDir es la luz que da
// sombra, que de noche es la luna), los colores del cielo, la luz ambiente, las
// estrellas y la luna.
uniform vec3 scSkySun;
uniform vec3 scHzSun;
uniform vec3 scHzAway;
uniform vec3 scBandSun;
uniform vec3 scBandAway;
uniform vec3 scZen;
uniform vec3 scLow;
uniform vec3 scGlowCol;
uniform vec3 scDiskCol;
uniform vec3 scCloudLit;
uniform vec3 scCloudBase;
uniform vec3 scAmbUp;
uniform vec3 scAmbHz;
uniform vec3 scAmbDn;
uniform vec3 scAmbSun;
uniform vec3 scMoonDir;
uniform vec2 scNight;   // estrellas, luna
uniform float scSueloFill;
float scHash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float scNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(scHash(i), scHash(i + vec2(1.0, 0.0)), u.x), mix(scHash(i + vec2(0.0, 1.0)), scHash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float scFbm(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { s += a * scNoise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
  return s;
}
// Ruido de un píxel a otro sin patrones (para girar los discos de muestras y tramar).
float scIGN(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }

// Color del horizonte hacia d: el del lado del sol y el del otro (al atardecer,
// encendido de naranja y rosado y morado).
vec3 scHorizon(vec3 d) {
  float toward = pow(clamp(dot(normalize(vec3(d.x, 0.0, d.z) + 1e-5), normalize(vec3(scSkySun.x, 0.0, scSkySun.z) + 1e-5)) * 0.5 + 0.5, 0.0, 1.0), 2.0);
  return mix(scHzAway, scHzSun, toward);
}
// Halo del sol (dispersión hacia delante): ancho y suave, más un núcleo.
vec3 scGlow(float sd) {
  float g = max(sd, 0.0);
  return scGlowCol * (pow(g, 8.0) * 0.20 + pow(g, 48.0) * 0.8 + pow(g, 600.0) * 4.0);
}
// Estrellas: una de cada pocas celdas de una rejilla en la esfera, con su brillo.
vec3 scStars(vec3 d) {
  vec2 p = vec2(atan(d.z, d.x), asin(clamp(d.y, -1.0, 1.0))) * 90.0;
  vec2 c = floor(p);
  float h = scHash(c);
  vec2 o = fract(p) - 0.5 - (vec2(scHash(c + 3.1), scHash(c + 7.7)) - 0.5) * 0.6;
  float r = length(o);
  return vec3(0.85, 0.9, 1.0) * step(0.975, h) * smoothstep(0.16, 0.0, r) * (0.4 + 2.2 * fract(h * 37.0));
}

// Cuánto se baja el horizonte en el fondo (seno, unos 18 grados). La cámara de serie
// mira 26 grados hacia abajo y, con el horizonte en su sitio, casi todo el fondo
// era la bruma de debajo: el degradado, el cielo azul y las nubes solo se veían
// con la cámara baja. El sol (disco y halo) sigue donde apunta la luz.
#define SC_SKY_DROP 0.32

// Cielo del atardecer en la dirección d (normalizada), en lineal y con HDR. disk:
// 1 con el disco del sol y el horizonte bajado (el fondo), 0 sin ellos (reflejos y
// niebla).
vec3 scSky(vec3 d, float disk) {
  float sd = dot(d, scSkySun);
  float toward = pow(clamp(sd * 0.5 + 0.5, 0.0, 1.0), 2.0);
  float y = d.y + SC_SKY_DROP * disk;
  vec3 hor = scHorizon(d);
  vec3 band = mix(scBandAway, scBandSun, toward);
  vec3 c;
  if (y >= 0.0) {
    c = mix(hor, band, smoothstep(0.0, 0.16, y));
    c = mix(c, scZen, smoothstep(0.10, 0.75, y));
  } else {
    // Bajo el horizonte, bruma que se va oscureciendo hacia abajo, sin corte.
    c = mix(hor, scLow, 1.0 - exp(-max(-y, 0.0) * 6.0));
  }
  c += scGlow(sd) * exp(-max(-y, 0.0) * 5.0);
  c += disk * scDiskCol * smoothstep(0.99972, 0.99988, sd);
  // De noche, estrellas (solo en el fondo, por encima del horizonte) y la luna.
  if (scNight.x > 0.0) c += disk * scNight.x * scStars(d) * smoothstep(0.0, 0.25, y);
  if (scNight.y > 0.0) {
    float md = dot(d, scMoonDir);
    c += scNight.y * (disk * vec3(2.4, 2.6, 2.9) * smoothstep(0.99955, 0.99968, md) + vec3(0.10, 0.13, 0.22) * pow(max(md, 0.0), 60.0));
  }
  return c;
}

// Nubes altas sobre el cielo: ruido proyectado en un plano, encendidas por debajo
// del lado del sol. lift: lo que se baja el horizonte (SC_SKY_DROP en el fondo, 0
// en los reflejos); la luz sigue saliendo del sol de verdad.
vec3 scClouds(vec3 d, vec3 c, float lift) {
  vec3 e = normalize(vec3(d.x, d.y + lift, d.z));
  if (e.y <= 0.0) return c;
  vec2 uv = e.xz / (e.y + 0.10) * 0.55 + vec2(scTime * 0.006, scTime * 0.002);
  float n = scFbm(uv * 1.4);
  float cov = smoothstep(0.50, 0.80, n) * smoothstep(0.0, 0.10, e.y) * (1.0 - smoothstep(0.55, 0.95, e.y));
  float sd = max(dot(d, scSkySun), 0.0);
  float lit = pow(sd, 3.0);
  float thick = smoothstep(0.55, 0.95, n);
  vec3 cc = mix(scCloudBase, scCloudLit, lit * (1.0 - 0.6 * thick));
  cc = mix(cc, cc * vec3(0.55, 0.5, 0.65), thick * 0.7);
  return mix(c, cc, cov * 0.85);
}

// Luz del cielo que llega a una cara con normal n (sin el sol directo): azul desde
// arriba, azul grisáceo por los lados y encendido del lado del sol, y un rebote
// cálido del suelo desde abajo. Fuerte para que lo que está a la sombra se lea
// (frío frente al sol cálido) y no se quede negro con el color de la niebla.
vec3 scAmbient(vec3 n) {
  vec3 a = n.y >= 0.0 ? mix(scAmbHz, scAmbUp, n.y) : mix(scAmbHz, scAmbDn, -n.y);
  vec2 s = normalize(scSkySun.xz + 1e-5);
  a += scAmbSun * max(dot(n.xz, s), 0.0);
  return a;
}

// Perspectiva aérea: niebla por distancia, más espesa abajo, del color de la bruma
// del horizonte en esa dirección (hacia el sol se enciende con el halo). scFog:
// densidad (por bloque), altura del suelo, 1 / altura de la capa de bruma y tope.
vec3 scAerial(vec3 col, vec3 p) {
  vec3 v = p - cameraPosition;
  float dist = length(v);
  vec3 dir = v / max(dist, 1e-4);
  float hf = exp(-max(p.y - scFog.y, 0.0) * scFog.z);
  float f = 1.0 - exp(-dist * scFog.x * (0.4 + hf));
  f = min(f, scFog.w);
  vec3 fc = scHorizon(dir) * 0.5 + scGlow(dot(normalize(vec3(dir.x, max(dir.y, 0.0) * 0.3, dir.z)), scSkySun)) * 0.18 * exp(-max(-dir.y, 0.0) * 2.5);
#ifdef SC_SUELO
  // El suelo, sin bruma: es césped hasta el horizonte, que queda como una
  // línea nítida contra el cielo (con la bruma se perdía en el fondo).
  return col;
#endif
  return mix(col, fc, f);
}
`

// Sombra del sol. scShadowInfo: 1 / lado del mapa, lado de un texel en bloques,
// profundidad que cubre el mapa en bloques, 1 si hay mapa.
const GLSL_SHADOW = /* glsl */`
uniform sampler2D scShadowDepth;
uniform sampler2DShadow scShadowCmp;
uniform mat4 scShadowMat;
uniform vec4 scShadowInfo;
uniform float scPenK;   // penumbra: 1 con el sol, más con la luna
vec2 scDisk(int i, int n, float phi) {
  float r = sqrt((float(i) + 0.5) / float(n));
  float th = float(i) * 2.3999632 + phi;
  return r * vec2(cos(th), sin(th));
}
// Sin salidas antes de los bucles: con ellas, el compilador de D3D avisa de que las
// muestras del bucle van en un flujo que varía de un píxel a otro.
float scShadow(vec3 p, vec3 n, float ndl) {
  float tw = scShadowInfo.y;
  // Desplazada por la normal (más cuanto más rasante) para que la cara no se
  // sombree a sí misma.
  vec3 q = p + n * tw * (0.9 + 1.6 * (1.0 - ndl));
  vec3 s = (scShadowMat * vec4(q, 1.0)).xyz * 0.5 + 0.5;
  bool fuera = scShadowInfo.w < 0.5 || s.x <= 0.0 || s.y <= 0.0 || s.x >= 1.0 || s.y >= 1.0 || s.z >= 1.0;
  float z = s.z - 0.03 / scShadowInfo.z;
  float texel = scShadowInfo.x;
#ifdef SC_PCSS
  float phi = 6.2831853 * scIGN(gl_FragCoord.xy);
  // Cuánto se abre la penumbra como mucho: un bloque y poco (en texels).
  float maxT = clamp(1.3 / tw, 3.0, 22.0);
  float bd = 0.0, bn = 0.0;
  for (int i = 0; i < 12; i++) {
    float d = textureLod(scShadowDepth, s.xy + scDisk(i, 12, phi) * maxT * texel, 0.0).r;
    float b = step(d, z);
    bd += d * b; bn += b;
  }
  // Penumbra: ~2 grados por bloque de distancia entre lo que tapa y la cara.
  float pen = clamp((z - bd / max(bn, 1.0)) * scShadowInfo.z * 0.036 / tw * scPenK, 0.7 * scPenK, maxT);
  float sum = 0.0;
  for (int i = 0; i < 16; i++) sum += textureLod(scShadowCmp, vec3(s.xy + scDisk(i, 16, phi) * pen * texel, z), 0.0);
  return fuera || bn < 0.5 ? 1.0 : sum / 16.0;
#else
  float sum = textureLod(scShadowCmp, vec3(s.xy + vec2(-0.5, -0.5) * texel, z), 0.0);
  sum += textureLod(scShadowCmp, vec3(s.xy + vec2(0.5, -0.5) * texel, z), 0.0);
  sum += textureLod(scShadowCmp, vec3(s.xy + vec2(-0.5, 0.5) * texel, z), 0.0);
  sum += textureLod(scShadowCmp, vec3(s.xy + vec2(0.5, 0.5) * texel, z), 0.0);
  return fuera ? 1.0 : sum * 0.25;
#endif
}
`

// Sombreado de los bloques. Sustituye a la luz de MeshBasicMaterial (todo blanco).
const GLSL_LIGHT = /* glsl */`
uniform vec3 scBlockCol;
varying vec3 vScPos;
varying vec3 vScLit;
varying float vScKind;
vec3 scLin(vec3 c) { return pow(max(c, vec3(0.0)), vec3(2.2)); }
// El sombreado por cara de vanilla (buildMesh.shadeFor), para quitarlo del color.
float scShadeFor(vec3 n) {
  vec3 a = abs(n);
  if (a.y >= a.x && a.y >= a.z) return n.y >= 0.0 ? 1.0 : 0.5;
  if (a.z >= a.x) return n.z >= 0.0 ? 0.8 : 0.7;
  return 0.62;
}
// Olas del agua: suma de ondas que cruzan, como pendiente de la superficie.
vec3 scWaterNormal(vec2 p, float t) {
  vec2 g = vec2(0.0);
  vec2 d1 = vec2(0.83, 0.55), d2 = vec2(-0.45, 0.89), d3 = vec2(0.97, -0.24), d4 = vec2(-0.71, -0.70);
  g += d1 * cos(dot(d1, p) * 1.10 + t * 1.30) * 0.026;
  g += d2 * cos(dot(d2, p) * 1.70 + t * 1.70) * 0.020;
  g += d3 * cos(dot(d3, p) * 2.90 + t * 2.30) * 0.014;
  g += d4 * cos(dot(d4, p) * 4.30 + t * 2.90) * 0.010;
  g += (vec2(scNoise(p * 2.2 + t * 0.35), scNoise(p * 2.2 - t * 0.31 + 7.3)) - 0.5) * 0.035;
  return normalize(vec3(-g.x, 1.0, -g.y));
}

vec3 scShade(inout vec4 dc) {
  vec3 n = normalize(cross(dFdx(vScPos), dFdy(vScPos)));
  int k = int(vScKind + 0.5);
  bool noShade = k >= 4;
  int kt = k & 3;
  float ao = clamp(vScLit.z, 0.04, 1.0);
  vec3 alb = scLin(clamp(dc.rgb / ((noShade ? 1.0 : scShadeFor(n)) * ao), 0.0, 1.0));
  vec3 V = normalize(cameraPosition - vScPos);
  vec3 L = scSunDir;
  float sky = vScLit.y, blk = vScLit.x;
  // Cielo: la curva de vanilla (la luz de cielo cae deprisa bajo techo).
  float skyF = sky * sky * (0.25 + 0.75 * sky);
  // Luz de bloque: naranja y que cae deprisa, como la de una antorcha.
  vec3 blkL = scBlockCol * (pow(blk, 4.0) * 2.6 + blk * blk * 0.35);
  float tAnim = scTime;
#ifdef SC_STATIC
  tAnim = 0.0;
#endif

#if defined(SC_EMIT)
  float ndl = max(dot(n, L), 0.0);
  float sh = scShadow(vScPos, n, ndl) * step(1e-4, ndl);
  vec3 lit = scSunCol * ndl * sh + scAmbient(n) * skyF + blkL + 0.03;
  vec3 col;
  if (kt == 3) {
    // Lava: brilla entera y el brillo se mueve despacio.
    float m = scNoise(vScPos.xz * 0.55 + vec2(tAnim * 0.21, -tAnim * 0.17)) * 0.6 + scNoise(vScPos.zx * 1.7 - tAnim * 0.33) * 0.4;
    col = alb * (2.4 + 2.2 * m);
  } else {
    // Lo que da luz: brilla lo claro de su textura (la llama, el cristal del
    // farolillo, la piedra luminosa); lo oscuro (el hierro, la madera) se ilumina normal.
    float lum = dot(alb, vec3(0.2126, 0.7152, 0.0722));
    float glow = smoothstep(0.10, 0.55, lum);
    col = alb * lit * (1.0 - glow) + alb * glow * 13.0;
  }
  return scAerial(col, vScPos);
#else
  bool foliage = kt == 1;
  float ndl = dot(n, L);
  // Las plantas y las hojas dejan pasar algo de luz: también les llega por detrás.
  float ndlS = foliage ? 0.06 + max(ndl, 0.0) * 0.85 + max(-ndl, 0.0) * 0.3 : max(ndl, 0.0);
  // Hojas y plantas: su punto de muestra, además, un poco hacia el sol. Sus caras
  // (también las de dentro, que se dibujan entre hojas) están en el mapa de sombras con
  // sus huecos, y la normal no basta para salir de ellas: con el sol rasante y el
  // texel grande de una build grande se sombreaban a sí mismas en franjas.
  float sh = scShadow(foliage ? vScPos + L * scShadowInfo.y * 2.5 : vScPos, n, foliage ? 1.0 : ndlS) * step(1e-4, ndlS);
  vec3 sun = scSunCol * ndlS * sh;
  // Contraluz: el sol detrás de las hojas las enciende.
  if (foliage) sun += scSunCol * sh * pow(max(dot(-V, L), 0.0), 5.0) * 0.5;
  // El sol no entra donde el cielo no llega (dentro de casa con las ventanas a la
  // sombra): con poca luz de cielo, la sombra del mapa ya es lo de fuera.
  vec3 amb = scAmbient(foliage ? vec3(0.0, 1.0, 0.0) : n) * skyF;
  vec3 lit = sun * mix(1.0, ao, 0.45) + (amb + blkL) * ao + 0.012 * ao;
  vec3 col = alb * lit;
#ifdef SC_SUELO
  // El suelo, con una luz de relleno neutra: con el sol rasante del atardecer su
  // sombra salía negra. SC_SUELO_ALB aclaraba el hormigón gris de antes, que era muy
  // oscuro; el césped ya va con su color (1,0).
  col = alb * SC_SUELO_ALB * (sun + amb + SC_SUELO_FILL);
#endif
#if defined(SC_TRANS)
  if (kt == 2) {
    // Agua: el cielo reflejado según el ángulo (Fresnel) y el brillo del sol.
    vec3 nw = n.y > 0.5 ? scWaterNormal(vScPos.xz, tAnim) : n;
    float c = max(dot(nw, V), 0.0);
    float F = 0.02 + 0.98 * pow(1.0 - c, 5.0);
    vec3 R = reflect(-V, nw);
    R.y = abs(R.y);
    vec3 refl = scClouds(R, scSky(R, 0.0), 0.0) * (0.35 + 0.65 * skyF);
    float rs = max(dot(R, L), 0.0);
    // El brillo del sol, solo en la cara de arriba: en los lados del agua (el borde
    // de la build) no hay olas y, con la cámara baja, salía un destello enorme.
    vec3 spec = step(0.5, n.y) * scSunCol * sh * (pow(rs, 900.0) * 30.0 + pow(rs, 90.0) * 1.2);
    // El cuerpo del agua: azul verdoso con el dibujo de su textura, casi opaco (con
    // la mezcla normal, lo que se ve debajo solo lo agrisaría).
    float tex = dot(alb, vec3(0.2126, 0.7152, 0.0722));
    vec3 body = vec3(0.02, 0.26, 0.40) * (0.75 + 4.0 * tex) * (amb * 3.0 + sun * 0.30 + blkL * 0.6);
    col = mix(body, refl, F) + spec;
    dc.a = clamp(mix(0.93, 0.99, F) + dot(spec, vec3(0.3)), 0.0, 1.0);
  }
#endif
  return scAerial(col, vScPos);
#endif
}
`

// Vaivén de hojas y plantas (solo en la versión alta). Va en función de la posición
// en el mundo: dos vértices en el mismo sitio se mueven igual y no se abren grietas.
// Solo en horizontal y pequeño (las hojas, 1/48 de bloque por eje; la punta de una
// planta de un bloque, hasta ~1/30): no se sale de su celda. Lo que toca algo que no
// se mece no se mueve (ver anchored en buildMesh.ts).
const GLSL_WAVES = /* glsl */`
vec3 scLeafWave(vec3 p, float t) {
  return vec3(sin(t * 1.7 + p.x * 0.8 + p.y * 0.6), 0.0, sin(t * 1.9 + p.z * 0.7 + p.y * 0.5)) * 0.021;
}
vec3 scPlantWave(vec3 p, float t) {
  float gust = 0.55 + 0.45 * sin(t * 0.7 + p.x * 0.05 + p.z * 0.04);
  float a = sin(t * 2.2 + p.x * 0.9 + p.z * 0.6) + 0.5 * sin(t * 3.6 + p.x * 1.7 - p.z * 1.1);
  return vec3(0.62, 0.0, 0.38) * a * 0.03 * gust;
}
`

// Paso final: tono (AgX), saturación, calidez, viñeta y tramado. Entra el HDR lineal.
const GradeShader = {
  name: 'ExhibicionGrade',
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    scExposure: { value: 1.0 },
    scSat: { value: 1.18 },
    scVignette: { value: 0.32 },
  },
  vertexShader: /* glsl */`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,
  fragmentShader: /* glsl */`
uniform sampler2D tDiffuse;
uniform float scExposure;
uniform float scSat;
uniform float scVignette;
varying vec2 vUv;
// AgX (Sobotka), con la aproximación polinómica habitual de su curva de contraste.
vec3 agxCurve(vec3 x) {
  vec3 x2 = x * x, x4 = x2 * x2;
  return 15.5 * x4 * x2 - 40.14 * x4 * x + 31.96 * x4 - 6.868 * x2 * x + 0.4298 * x2 + 0.1191 * x - 0.00232;
}
vec3 agx(vec3 c) {
  const mat3 inM = mat3(0.842479062253094, 0.0423282422610123, 0.0423756549057051,
                        0.0784335999999992, 0.878468636469772, 0.0784336,
                        0.0792237451477643, 0.0791661274605434, 0.879142973793104);
  const mat3 outM = mat3(1.19687900512017, -0.0528968517574562, -0.0529716355144438,
                         -0.0980208811401368, 1.15190312990417, -0.0980434501171241,
                         -0.0990297440797205, -0.0989611768448433, 1.15107367264116);
  const float lo = -12.47393, hi = 4.026069;
  c = inM * max(c, vec3(1e-10));
  c = clamp(log2(c), lo, hi);
  c = (c - lo) / (hi - lo);
  c = agxCurve(c);
  return outM * c;   // ya en pantalla (sRGB)
}
float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }
void main() {
  vec3 c = texture2D(tDiffuse, vUv).rgb * scExposure;
  c = agx(c);
  // Algo más de contraste y saturación, y un punto cálido en las luces.
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = mix(vec3(l), c, scSat);
  c = mix(c, c * c * (3.0 - 2.0 * c), 0.25);
  c *= mix(vec3(1.0), vec3(1.04, 1.0, 0.95), smoothstep(0.3, 0.9, l));
  // Viñeta suave.
  vec2 q = vUv - 0.5;
  c *= 1.0 - scVignette * smoothstep(0.25, 0.85, dot(q, q) * 2.2);
  // Tramado contra las bandas del degradado del cielo.
  c += (ign(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
}
`,
}

/** Mapa de sombras del sol, encajado en la caja de lo que se ve. */
class SunShadow {
  readonly target: THREE.WebGLRenderTarget
  readonly cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  readonly matrix = new THREE.Matrix4()
  texelWorld = 1
  depthRange = 1
  private depthMats = new Map<THREE.Material, THREE.MeshBasicMaterial>()
  private _c = new THREE.Color()
  private readonly pcss: boolean

  constructor(size: number, floatOk: boolean, pcss: boolean) {
    // Color: la profundidad a pelo (para buscar lo que tapa); profundidad: con
    // comparación por hardware (la penumbra filtrada). El color solo lo lee la
    // búsqueda de lo que tapa del PCSS: sin él (la versión ligera) va el más pequeño
    // que deja three (R8: 4 MB a 2048 en vez de 16) y no se escribe.
    this.pcss = pcss
    this.target = new THREE.WebGLRenderTarget(size, size, {
      format: THREE.RedFormat, type: !pcss ? THREE.UnsignedByteType : floatOk ? THREE.FloatType : THREE.HalfFloatType,
      minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, generateMipmaps: false,
    })
    this.target.texture.name = 'Exhibicion.sombraColor'
    const dt = new THREE.DepthTexture(size, size, THREE.UnsignedIntType)
    dt.format = THREE.DepthFormat
    dt.compareFunction = THREE.LessEqualCompare
    dt.minFilter = THREE.LinearFilter
    dt.magFilter = THREE.LinearFilter
    dt.name = 'Exhibicion.sombra'
    this.target.depthTexture = dt
  }

  // Encaja la cámara del sol en la caja (mundo) mirando hacia `-sun`. `reach`: lo
  // que se alarga el far más allá de la caja (bloques), para lo que recibe sombra
  // fuera de ella (el suelo).
  fit(box: THREE.Box3, sun: THREE.Vector3, reach = 0): void {
    const c = box.getCenter(new THREE.Vector3())
    const r = Math.max(1, box.getSize(new THREE.Vector3()).length() / 2)
    const cam = this.cam
    cam.position.copy(c).addScaledVector(sun, r * 2)
    cam.up.set(0, 1, 0)
    cam.lookAt(c)
    cam.updateMatrixWorld()
    const inv = cam.matrixWorldInverse
    const v = new THREE.Vector3()
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity, z0 = Infinity, z1 = -Infinity
    for (let i = 0; i < 8; i++) {
      v.set(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z).applyMatrix4(inv)
      x0 = Math.min(x0, v.x); x1 = Math.max(x1, v.x); y0 = Math.min(y0, v.y); y1 = Math.max(y1, v.y); z0 = Math.min(z0, v.z); z1 = Math.max(z1, v.z)
    }
    const pad = 1
    cam.left = x0 - pad; cam.right = x1 + pad; cam.bottom = y0 - pad; cam.top = y1 + pad
    cam.near = Math.max(0.01, -z1 - pad); cam.far = -z0 + pad + reach
    cam.updateProjectionMatrix()
    this.matrix.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse)
    this.texelWorld = Math.max(cam.right - cam.left, cam.top - cam.bottom) / this.target.width
    this.depthRange = cam.far - cam.near
  }

  // Material de profundidad de cada material de bloque: el mismo atlas y el mismo
  // alphaTest (las hojas dejan pasar el sol por sus huecos) y el mismo recorte.
  private depthMat(src: THREE.Material): THREE.MeshBasicMaterial {
    const s = src as THREE.MeshBasicMaterial
    let d = this.depthMats.get(src)
    if (!d) {
      d = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, clippingPlanes: s.clippingPlanes, colorWrite: this.pcss })
      d.onBeforeCompile = (sh) => {
        sh.fragmentShader = sh.fragmentShader.replace('#include <dithering_fragment>',
          '#include <dithering_fragment>\n\tgl_FragColor = vec4(gl_FragCoord.z, 0.0, 0.0, 1.0);')
      }
      d.customProgramCacheKey = () => 'lv-sc-sombra'
      this.depthMats.set(src, d)
      // Se suelta con su material (los de marcos, vagonetas y mobs se rehacen en
      // cada corte): si no, el mapa se quedaba con los dos para siempre.
      const dd = d
      const drop = (): void => {
        src.removeEventListener('dispose', drop)
        if (this.depthMats.get(src) === dd) this.depthMats.delete(src)
        dd.dispose()
      }
      src.addEventListener('dispose', drop)
      dd.userData.drop = drop
    }
    const map = s.alphaTest > 0 ? s.map ?? null : null
    if (d.map !== map || d.alphaTest !== (map ? s.alphaTest : 0)) {
      d.map = map; d.alphaTest = map ? s.alphaTest : 0; d.needsUpdate = true
    }
    return d
  }

  /** Pinta la profundidad desde el sol de `casters` (el resto de la escena se oculta mientras). */
  render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, casters: Set<THREE.Object3D>): void {
    const hidden: THREE.Object3D[] = []
    const swapped: [THREE.Mesh, THREE.Material | THREE.Material[]][] = []
    scene.traverse((o) => {
      const m = o as THREE.Mesh
      if (!(m.isMesh || (o as THREE.Line).isLine || (o as THREE.Points).isPoints) || !o.visible) return
      if (casters.has(o) && m.isMesh && !Array.isArray(m.material)) {
        swapped.push([m, m.material])
        m.material = this.depthMat(m.material)
      } else { o.visible = false; hidden.push(o) }
    })
    const prevRT = renderer.getRenderTarget()
    const prevBg = scene.background
    renderer.getClearColor(this._c)
    const prevA = renderer.getClearAlpha()
    scene.background = null
    renderer.setClearColor(0xffffff, 1)
    renderer.setRenderTarget(this.target)
    renderer.clear()
    renderer.render(scene, this.cam)
    renderer.setRenderTarget(prevRT)
    renderer.setClearColor(this._c, prevA)
    scene.background = prevBg
    for (const o of hidden) o.visible = true
    for (const [m, mat] of swapped) m.material = mat
  }

  dispose(): void {
    this.target.depthTexture?.dispose()
    this.target.dispose()
    for (const [src, d] of this.depthMats) { src.removeEventListener('dispose', d.userData.drop); d.dispose() }
    this.depthMats.clear()
  }
}

function reducedMotion(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

// GPU flojas por el nombre que da WebGL (ANGLE o el driver): render por software,
// las de móvil, las integradas de Intel (HD, UHD, Iris, Xe y la Arc integrada, que
// sale como "Intel(R) Graphics"; las Arc dedicadas no), las integradas de AMD
// ("Radeon(TM) Graphics", Vega), las GeForce MX y los Apple M de base ("Apple GPU"
// en Safari no dice cuál). Lo que se escape lo pilla la medida de los primeros
// frames (SchematicViewer.checkScSpeed).
const WEAK_GPU = new RegExp([
  /swiftshader|llvmpipe|software|basic render|mali|adreno|powervr/,
  /intel\(r\) (u?hd|xe) graphics|intel\(r\) iris|iris\(tm\)|intel\(r\) graphics/,
  /radeon\(tm\) (graphics|vega)|radeon vega|geforce mx\d|\bmx\d{3}\b/,
  /apple gpu|apple m\d(?! (pro|max|ultra))/,
].map((r) => r.source).join('|'), 'i')

/** ¿Va la versión ligera? Pantalla táctil como puntero principal o GPU floja. */
export function lightQualityHint(renderer: THREE.WebGLRenderer): boolean {
  if (typeof matchMedia !== 'undefined' && matchMedia('(pointer: coarse)').matches) return true
  try {
    const gl = renderer.getContext()
    const ext = gl.getExtension('WEBGL_debug_renderer_info')
    return weakGpu(String(gl.getParameter(ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER)))
  } catch {
    return false
  }
}
export function weakGpu(name: string): boolean { return WEAK_GPU.test(name) }

/** Uniforms, materiales, cielo, sombra del sol y paso final del modo exhibición. */
export class Showcase {
  readonly u = {
    scTime: { value: 0 },
    scSunDir: { value: new THREE.Vector3() },
    scSunCol: { value: new THREE.Vector3(1.0, 0.58, 0.28).multiplyScalar(5.2) },
    scBlockCol: { value: new THREE.Vector3(1.0, 0.56, 0.24) },
    scSkySun: { value: new THREE.Vector3() },
    scHzSun: { value: new THREE.Vector3() },
    scHzAway: { value: new THREE.Vector3() },
    scBandSun: { value: new THREE.Vector3() },
    scBandAway: { value: new THREE.Vector3() },
    scZen: { value: new THREE.Vector3() },
    scLow: { value: new THREE.Vector3() },
    scGlowCol: { value: new THREE.Vector3() },
    scDiskCol: { value: new THREE.Vector3() },
    scCloudLit: { value: new THREE.Vector3() },
    scCloudBase: { value: new THREE.Vector3() },
    scAmbUp: { value: new THREE.Vector3() },
    scAmbHz: { value: new THREE.Vector3() },
    scAmbDn: { value: new THREE.Vector3() },
    scAmbSun: { value: new THREE.Vector3() },
    scMoonDir: { value: new THREE.Vector3(0, 1, 0) },
    scNight: { value: new THREE.Vector2() },
    scSueloFill: { value: 0.5 },
    scPenK: { value: 1 },
    scFog: { value: new THREE.Vector4(0.003, 0, 0.05, 0.5) },
    scShadowDepth: { value: null as THREE.Texture | null },
    scShadowCmp: { value: null as THREE.Texture | null },
    scShadowMat: { value: new THREE.Matrix4() },
    scShadowInfo: { value: new THREE.Vector4(0, 1, 1, 0) },
  }
  readonly sky: THREE.Mesh
  readonly grade = GradeShader
  quality: ScQuality
  /** Se mece lo que se mece (alta y sin "reducir movimiento"). */
  waves: boolean
  shadowDirty = true
  shadowAt = 0
  // El mapa de sombras (128 MB en la alta): se crea al pintarlo y se suelta al salir
  // de la exhibición (releaseShadow).
  private shadow: SunShadow | null = null
  private floatOk: boolean
  private mats = new Set<THREE.Material>()
  private sunAz = SUN_AZ
  private sunOff = 0     // giro del sol pedido (setSunAngle), en radianes
  private hora = HORA_SERIE
  /** Exposición y fuerza del bloom de la hora (los aplica el visor en sus pases). */
  exposure = 1
  bloom = 0.25
  private skyMat: THREE.ShaderMaterial

  constructor(renderer: THREE.WebGLRenderer, quality: ScQuality) {
    this.quality = quality
    this.waves = quality === 'alta' && !reducedMotion()
    this.setTime(HORA_SERIE)
    this.floatOk = renderer.extensions.has('EXT_color_buffer_float')

    // Cielo: un triángulo que cubre la pantalla, al fondo, antes que todo lo demás.
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3))
    const invProj = { value: new THREE.Matrix4() }, camWorld = { value: new THREE.Matrix4() }
    this.skyMat = new THREE.ShaderMaterial({
      uniforms: { ...this.u, scInvProj: invProj, scCamWorld: camWorld },
      vertexShader: /* glsl */`
uniform mat4 scInvProj;
uniform mat4 scCamWorld;
varying vec3 vDir;
void main() {
  vec4 v = scInvProj * vec4(position.xy, 0.5, 1.0);
  vDir = (scCamWorld * vec4(v.xyz / v.w, 0.0)).xyz;
  gl_Position = vec4(position.xy, 0.9999, 1.0);
}`,
      fragmentShader: /* glsl */`
${GLSL_COMMON}
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  gl_FragColor = vec4(scClouds(d, scSky(d, 1.0), SC_SKY_DROP), 1.0);
}`,
      depthTest: false, depthWrite: false,
    })
    this.sky = new THREE.Mesh(g, this.skyMat)
    this.sky.frustumCulled = false
    this.sky.renderOrder = -1e9
    this.sky.onBeforeRender = (_r, _s, cam) => {
      invProj.value.copy(cam.projectionMatrixInverse)
      camWorld.value.copy(cam.matrixWorld)
    }
  }

  /** Gira el sol (grados, alrededor de la vertical) desde su sitio de serie. Hasta ±60. */
  setSunAngle(deg: number): void {
    this.sunOff = THREE.MathUtils.degToRad(Math.max(-60, Math.min(60, deg)))
    this.setTime(this.hora)
  }
  get sunAngle(): number { return THREE.MathUtils.radToDeg(this.sunOff) }

  /**
   * Hora del día (de HORA_MIN a HORA_MAX): el sol (o la luna), los colores del cielo y
   * la luz. Solo cambia uniforms; el mapa de sombras queda por rehacer (shadowDirty).
   */
  setTime(h: number): void {
    h = Math.max(HORA_MIN, Math.min(HORA_MAX, h))
    this.hora = h
    const u = this.u
    // El sol por su arco (ver solLocal), girado con SOL_GIRO y lo que se haya pedido
    // con setSunAngle; la luna, enfrente.
    const [e, n, up] = solLocal(h)
    const g = SOL_GIRO + this.sunOff
    const sun = new THREE.Vector3(e * Math.cos(g) - n * Math.sin(g), up, e * Math.sin(g) + n * Math.cos(g)).normalize()
    const el = Math.asin(THREE.MathUtils.clamp(sun.y, -1, 1))
    this.sunAz = Math.atan2(sun.z, sun.x)
    u.scSkySun.value.copy(sun)
    const moon = sun.clone().negate()
    u.scMoonDir.value.copy(moon)
    // La luz que da sombra: el sol mientras está arriba, la luna de noche. El cambio
    // va con las dos casi apagadas (la paleta del anochecer no tiene luz directa).
    const deNoche = h > 13 && el < THREE.MathUtils.degToRad(-1.5)
    const key = deNoche ? moon : sun
    if (key.y < 0.06) { key.y = 0.06; key.normalize() }
    u.scSunDir.value.copy(key)
    u.scPenK.value = deNoche ? 2.5 : 1
    const p = paleta(h)
    const set = (v: { value: THREE.Vector3 }, c: V3) => v.value.set(c[0], c[1], c[2])
    set(u.scHzSun, p.hzSun); set(u.scHzAway, p.hzAway); set(u.scBandSun, p.bandSun); set(u.scBandAway, p.bandAway)
    set(u.scZen, p.zen); set(u.scLow, p.low); set(u.scGlowCol, p.glow); set(u.scDiskCol, p.disk)
    set(u.scCloudLit, p.cloudLit); set(u.scCloudBase, p.cloudBase)
    set(u.scAmbUp, p.ambUp); set(u.scAmbHz, p.ambHz); set(u.scAmbDn, p.ambDn); set(u.scAmbSun, p.ambSun)
    // Sol bajo el horizonte: sin luz directa aunque la paleta aún tenga algo.
    const sunK = deNoche ? 1 : THREE.MathUtils.smoothstep(THREE.MathUtils.radToDeg(el), -2, 3)
    u.scSunCol.value.set(p.sun[0] * sunK, p.sun[1] * sunK, p.sun[2] * sunK)
    u.scBlockCol.value.set(1.0, 0.56, 0.24).multiplyScalar(p.block)
    u.scNight.value.set(p.stars, p.moon)
    u.scSueloFill.value = p.fill
    this.exposure = p.exposure
    this.bloom = p.bloom
    this.shadowDirty = true
  }
  get time(): number { return this.hora }

  /**
   * Material de exhibición a partir de uno de los normales: copia lo que haga falta
   * (atlas, alphaTest, recorte...) y cambia la luz. `extra`: otro onBeforeCompile
   * que va antes (el resaltado de materiales). `kind`: el tipo de cara para la malla
   * que no trae el atributo `lit` (las de marcos, vagonetas y mobs, o la malla de
   * antes de entrar mientras llega la nueva).
   */
  material(role: ScRole, params: THREE.MeshBasicMaterialParameters, extra?: (sh: THREE.WebGLProgramParametersWithUniforms) => void, kind = 0): THREE.MeshBasicMaterial {
    const m = new THREE.MeshBasicMaterial(params)
    m.color.set(0xffffff)
    // Sin el atributo `lit`: luz de cielo plena, sin luz de bloque ni sombra suave.
    ;(m as unknown as { defaultAttributeValues: Record<string, number[]> }).defaultAttributeValues = { lit: [0, 1, 1, kind / 255] }
    m.onBeforeCompile = (sh) => {
      extra?.(sh)
      this.patch(sh, role)
    }
    m.customProgramCacheKey = () => `lv-sc-${role}-${this.quality}-${this.waves ? 1 : 0}${extra ? '-r' : ''}`
    this.mats.add(m)
    return m
  }

  /** Suelta un material de los de material() (los de marcos, vagonetas... al rehacerlos). */
  forget(m: THREE.Material): void { this.mats.delete(m) }

  private patch(sh: THREE.WebGLProgramParametersWithUniforms, role: ScRole): void {
    Object.assign(sh.uniforms, this.u)
    const defs = [
      role === 'trans' ? '#define SC_TRANS' : role === 'emit' ? '#define SC_EMIT' : '',
      this.quality === 'alta' ? '#define SC_PCSS' : '#define SC_STATIC',
      this.waves ? '#define SC_WAVES' : '',
    ].join('\n')
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>
${defs}
attribute vec4 lit;
uniform float scTime;
varying vec3 vScPos;
varying vec3 vScLit;
varying float vScKind;
${GLSL_WAVES}`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
{
  vScLit = lit.xyz;
  float kb = floor(lit.w * 255.0 + 0.5);
  float kt = mod(kb, 4.0);
  // Sin "flat": en D3D (ANGLE) obliga a reescribir los índices en cada dibujo y
  // costaba ~5 ms por frame en L. Es igual en los 4 vértices del quad, así que
  // interpolado sale lo mismo (se redondea al leerlo).
  vScKind = kt + (mod(floor(kb / 4.0), 2.0) > 0.5 ? 4.0 : 0.0);
#ifdef SC_WAVES
  float kw = floor(kb / 8.0);
  vec3 wp = (modelMatrix * vec4(transformed, 1.0)).xyz;
  vec3 sway = vec3(0.0);
  if (kw > 0.5) sway = scPlantWave(wp, scTime) * ((kw - 1.0) / 15.0);
  else if (kt == 1.0) sway = scLeafWave(wp, scTime);
  // Con la cámara pegada a la hoja, el vaivén la puede cruzar con el plano near: a
  // menos de un tercio de bloque de la cámara no se mece. Y nunca más de 1/16 de
  // bloque por eje, ni con un valor raro. (El hueco de las hojas del borde de la build
  // era otra cosa, los planos de recorte: ver anchored en buildMesh y updateClip.)
  sway *= smoothstep(0.08, 0.35, distance(wp, cameraPosition));
  sway = clamp(sway, vec3(-0.0625), vec3(0.0625));
  if (sway.x != sway.x || sway.z != sway.z) sway = vec3(0.0);
  transformed += sway;
#endif
}
vScPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`)
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
${defs}
${GLSL_COMMON}
${GLSL_SHADOW}
${GLSL_LIGHT}`)
      .replace('vec3 outgoingLight = reflectedLight.indirectDiffuse;', 'vec3 outgoingLight = scShade(diffuseColor);')
  }

  /** Cambia de versión (alta o ligera): los materiales se recompilan y la sombra se rehace. */
  setQuality(q: ScQuality, renderer: THREE.WebGLRenderer): void {
    if (q === this.quality) return
    this.quality = q
    this.waves = q === 'alta' && !reducedMotion()
    this.floatOk = renderer.extensions.has('EXT_color_buffer_float')
    this.releaseShadow()
    for (const m of this.mats) m.needsUpdate = true
  }

  /** Suelta el mapa de sombras (al salir de la exhibición); se rehace al volver a pintarlo. */
  releaseShadow(): void {
    this.shadow?.dispose()
    this.shadow = null
    this.u.scShadowDepth.value = null
    this.u.scShadowCmp.value = null
    this.u.scShadowInfo.value.w = 0
    this.shadowDirty = true
  }

  /** Deja mecerse hojas, plantas y agua (si la versión es la alta y no se pide menos movimiento). */
  setWaves(on: boolean): void {
    const w = on && this.quality === 'alta' && !reducedMotion()
    if (w === this.waves) return
    this.waves = w
    for (const m of this.mats) m.needsUpdate = true
  }

  /** Niebla a la medida de lo que se ve: caja en el mundo y radio de la build. */
  setFog(box: THREE.Box3, radius: number): void {
    const r = Math.max(24, radius)
    const h = Math.max(8, box.max.y - box.min.y)
    this.u.scFog.value.set(0.045 / r, box.min.y, 2.2 / h, 0.3)
  }

  /**
   * Rehace el mapa de sombras para la caja `box` con lo que proyecta sombra. `reach`:
   * cuánto más allá de la caja llega en profundidad (lo que recibe sombra fuera).
   */
  renderShadow(renderer: THREE.WebGLRenderer, scene: THREE.Scene, casters: Set<THREE.Object3D>, box: THREE.Box3, reach = 0): void {
    this.shadowDirty = false
    this.shadowAt = performance.now()
    if (box.isEmpty()) { this.u.scShadowInfo.value.w = 0; return }
    let s = this.shadow
    if (!s) {
      s = this.shadow = new SunShadow(SHADOW_SIZE[this.quality], this.floatOk, this.quality === 'alta')
      this.u.scShadowDepth.value = s.target.texture
      this.u.scShadowCmp.value = s.target.depthTexture
    }
    s.fit(box, this.u.scSunDir.value, reach)
    s.render(renderer, scene, casters)
    this.u.scShadowMat.value.copy(s.matrix)
    this.u.scShadowInfo.value.set(1 / s.target.width, s.texelWorld, s.depthRange, 1)
  }

  dispose(): void {
    this.releaseShadow()
    this.sky.geometry.dispose()
    this.skyMat.dispose()
    for (const m of this.mats) m.dispose()
    this.mats.clear()
  }
}
