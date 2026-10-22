// Cielo de Minecraft para la vista normal, a la hora que se elija como en el juego:
// el degradado vanilla del azul del cielo de llanura al color de la niebla en el
// horizonte (los dos se apagan de noche), el resplandor naranja y rosado del
// amanecer y del atardecer del lado del sol, el sol y la luna cuadrados cruzando el
// cielo de este a oeste, las estrellas y las nubes planas y en bloque (las
// "rápidas"), que avanzan despacio hacia +X y se oscurecen de noche.
//
// El cielo es un triángulo a pantalla completa que se pinta antes que nada (como el
// del modo exhibición): cada píxel mira su dirección. El sol y la luna son los quads
// de vanilla (30 y 20 de lado a 100 de distancia, con mezcla aditiva). Las nubes van
// en otro triángulo que se pinta después de la build: cada píxel corta su rayo con
// el plano de las nubes, con una celda de 12 x 12 bloques por texel de clouds.png, y
// escribe su profundidad (como el suelo): desde abajo las tapa la build y desde
// encima tapan ellas la build. Las texturas son las de vanilla 1.21.11 (cielo-sol.png,
// cielo-luna.png y cielo-nubes.png).

import * as THREE from 'three'
import { asset } from './assets'

// Colores de vanilla (día, llanura): cielo y niebla del horizonte, tal cual (sin
// pasar por THREE.Color, que con la gestión de color aún encendida al importar este
// módulo los convertiría a lineal).
const rgb = (h: number): [number, number, number] => [(h >> 16 & 255) / 255, (h >> 8 & 255) / 255, (h & 255) / 255]
const SKY = rgb(0x78a7ff)
const FOG = rgb(0xc0d8ff)
// Nubes: lado de una celda (bloques), opacidad, y su velocidad en vanilla (0,03
// bloques por tick, 20 ticks por segundo).
const CLOUD_CELL = 12
const CLOUD_ALPHA = 0.8
const CLOUD_SPEED = 0.6

/** Hora de serie del cielo de Minecraft: mediodía. */
export const HORA_NORMAL = 12

/**
 * Luz de día de vanilla a una hora (0 a 1): 1 de día, 0 de noche, y la transición al
 * amanecer y al atardecer (la de getSkyDarken: cos del ángulo del sol * 2 + 0,5).
 */
export function luzDeDia(h: number): number {
  const a = (h - 12) / 24 * Math.PI * 2
  return Math.max(0, Math.min(1, Math.cos(a) * 2 + 0.5))
}

function reducedMotion(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

export class VanillaSky {
  readonly mesh: THREE.Mesh
  /** Las nubes (con su profundidad, después de la build). */
  readonly clouds: THREE.Mesh
  /** Si las nubes se mueven (no con "reducir movimiento"): pide frames de vez en cuando. */
  readonly moving: boolean
  private mat: THREE.ShaderMaterial
  private cloudMat: THREE.ShaderMaterial
  private texs: THREE.Texture[] = []
  private t0 = performance.now()
  private disposed = false
  private orthoProj = new THREE.PerspectiveCamera(55, 1, 0.1, 10)
  private u = {
    vsInvProj: { value: new THREE.Matrix4() },
    vsCamWorld: { value: new THREE.Matrix4() },
    // Las nubes: la proyección de la cámara de verdad (no la del cielo en las vistas
    // planas) y si la cámara es plana (entonces van en el cielo, sin profundidad).
    vsRealInvProj: { value: new THREE.Matrix4() },
    vsProj: { value: new THREE.Matrix4() },
    vsOrtho: { value: 0 },
    vsSun: { value: null as THREE.Texture | null },
    vsMoon: { value: null as THREE.Texture | null },
    vsClouds: { value: null as THREE.Texture | null },
    vsSunDir: { value: new THREE.Vector3(0, 1, 0) },
    // Altura de las nubes (mundo), su desplazamiento en X y hasta dónde se ven (en las
    // vistas planas).
    vsCloud: { value: new THREE.Vector3(200, 0, 800) },
    vsSky: { value: new THREE.Vector3(...SKY) },
    vsFog: { value: new THREE.Vector3(...FOG) },
    vsCloudCol: { value: new THREE.Vector3(1, 1, 1) },
    // Resplandor del amanecer o del atardecer (color y alfa) y hacia qué lado (±X).
    vsSunrise: { value: new THREE.Vector4() },
    vsSunriseX: { value: 1 },
    vsStars: { value: 0 },
  }

  constructor(onLoad: () => void) {
    this.moving = !reducedMotion()
    const load = (file: string, key: 'vsSun' | 'vsMoon' | 'vsClouds', repeat: boolean) => {
      new THREE.TextureLoader().load(asset(file), (t) => {
        if (this.disposed) { t.dispose(); return }
        t.magFilter = THREE.NearestFilter
        t.minFilter = repeat ? THREE.LinearMipmapLinearFilter : THREE.NearestFilter
        t.generateMipmaps = repeat
        if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4 }
        t.flipY = false
        this.texs.push(t)
        this.u[key].value = t
        onLoad()
      })
    }
    load('cielo-sol.png', 'vsSun', false)
    load('cielo-luna.png', 'vsMoon', false)
    load('cielo-nubes.png', 'vsClouds', true)
    this.setTime(HORA_NORMAL)

    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3))
    this.mat = new THREE.ShaderMaterial({
      uniforms: this.u,
      vertexShader: /* glsl */`
uniform mat4 vsInvProj;
uniform mat4 vsCamWorld;
varying vec3 vDir;
void main() {
  vec4 v = vsInvProj * vec4(position.xy, 0.5, 1.0);
  vDir = (vsCamWorld * vec4(v.xyz / v.w, 0.0)).xyz;
  gl_Position = vec4(position.xy, 0.9999, 1.0);
}`,
      fragmentShader: /* glsl */`
uniform sampler2D vsSun;
uniform sampler2D vsMoon;
uniform sampler2D vsClouds;
uniform vec3 vsSunDir;
uniform vec3 vsCloud;
uniform vec3 vsSky;
uniform vec3 vsFog;
uniform vec3 vsCloudCol;
uniform vec4 vsSunrise;
uniform float vsSunriseX;
uniform float vsStars;
uniform float vsOrtho;
varying vec3 vDir;
float vsHash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
// Un quad del cielo (sol o luna): mitad de su lado (a distancia 1) y su textura, sumada.
vec3 vsQuad(vec3 d, vec3 c, float hs, sampler2D tex) {
  float sd = dot(d, c);
  if (sd <= 0.0) return vec3(0.0);
  // Gira alrededor del eje norte-sur (Z), como en vanilla: su "arriba" es -Z.
  vec3 u = normalize(cross(vec3(0.0, 0.0, -1.0), c));
  vec3 v = cross(c, u);
  vec3 p = d / sd;
  vec2 uv = vec2(dot(p, u), dot(p, v)) / (2.0 * hs) + 0.5;
  if (uv.x <= 0.0 || uv.x >= 1.0 || uv.y <= 0.0 || uv.y >= 1.0) return vec3(0.0);
  return texture2D(tex, uv).rgb;
}
void main() {
  vec3 d = normalize(vDir);
  // Del color de la niebla en el horizonte al del cielo; por debajo, niebla.
  vec3 c = mix(vsFog, vsSky, smoothstep(0.0, 0.42, d.y));
  // Amanecer y atardecer: el abanico de color del lado del sol, sobre el horizonte.
  if (vsSunrise.a > 0.0) {
    float side = max(normalize(vec3(d.x, 0.0, d.z) + 1e-5).x * vsSunriseX, 0.0);
    float w = vsSunrise.a * pow(side, 1.5) * (1.0 - smoothstep(-0.05, 0.55, d.y)) * smoothstep(-0.25, 0.0, d.y);
    c = mix(c, vsSunrise.rgb, w);
  }
  // Estrellas: cuadraditos repartidos al azar, sumados.
  if (vsStars > 0.0 && d.y > 0.0) {
    vec2 q = vec2(atan(d.z, d.x), asin(clamp(d.y, -1.0, 1.0))) * 70.0;
    vec2 cell = floor(q);
    float h = vsHash(cell);
    vec2 o = abs(fract(q) - 0.5 - (vec2(vsHash(cell + 3.1), vsHash(cell + 7.7)) - 0.5) * 0.6);
    float s = 0.07 + 0.08 * fract(h * 53.0);
    c += vsStars * step(0.982, h) * step(max(o.x, o.y), s) * (0.6 + 0.8 * fract(h * 37.0));
  }
  // El sol y la luna (enfrente), sumados como en vanilla. Bajo el horizonte no.
  float up = smoothstep(-0.02, 0.02, d.y);
  c += up * vsQuad(d, vsSunDir, 0.3, vsSun);
  c += up * vsQuad(d, -vsSunDir, 0.2, vsMoon);
  // Nubes en las vistas planas (en las demás van aparte, ver clouds): el plano a su
  // altura, mirando hacia arriba desde debajo, apagándose con la distancia.
  if (vsOrtho > 0.5 && d.y > 0.0 && cameraPosition.y < vsCloud.x) {
    float t = (vsCloud.x - cameraPosition.y) / d.y;
    vec2 q = cameraPosition.xz + d.xz * t;
    q.x -= vsCloud.y;
    float m = texture2D(vsClouds, q / ${(CLOUD_CELL * 256).toFixed(1)}).a;
    float far = 1.0 - smoothstep(0.55, 1.0, t * length(d.xz) / vsCloud.z);
    c = mix(c, vsCloudCol, m * ${CLOUD_ALPHA.toFixed(2)} * far);
  }
  gl_FragColor = vec4(c, 1.0);
}`,
      depthTest: false,
      depthWrite: false,
    })
    // Las nubes, aparte: transparentes, con la profundidad del punto del plano.
    this.cloudMat = new THREE.ShaderMaterial({
      uniforms: this.u,
      vertexShader: /* glsl */`
varying vec2 vNdc;
void main() {
  vNdc = position.xy;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`,
      fragmentShader: /* glsl */`
uniform sampler2D vsClouds;
uniform mat4 vsRealInvProj;
uniform mat4 vsCamWorld;
uniform mat4 vsProj;
uniform vec3 vsCloud;
uniform vec3 vsCloudCol;
uniform float vsOrtho;
varying vec2 vNdc;
void main() {
  if (vsOrtho > 0.5) discard;
  vec4 fa = vsRealInvProj * vec4(vNdc, -1.0, 1.0);
  vec4 fb = vsRealInvProj * vec4(vNdc, 1.0, 1.0);
  vec3 pa = (vsCamWorld * vec4(fa.xyz / fa.w, 1.0)).xyz;
  vec3 pb = (vsCamWorld * vec4(fb.xyz / fb.w, 1.0)).xyz;
  vec3 rd = normalize(pb - pa);
  float t = (vsCloud.x - cameraPosition.y) / rd.y;
  // Hacia el plano: desde abajo mirando arriba o desde encima mirando abajo.
  if (abs(rd.y) < 1e-4 || t <= 0.0) discard;
  vec3 p = cameraPosition + rd * t;
  vec2 q = p.xz;
  q.x -= vsCloud.y;
  // Solo se suavizan hacia el horizonte (mirando de canto al plano), no al alejarse.
  float a = texture2D(vsClouds, q / ${(CLOUD_CELL * 256).toFixed(1)}).a * ${CLOUD_ALPHA.toFixed(2)} * smoothstep(0.012, 0.1, abs(rd.y));
  if (a < 0.004) discard;
  vec4 c = vsProj * viewMatrix * vec4(p, 1.0);
  gl_FragDepth = clamp(c.z / c.w * 0.5 + 0.5, 0.0, 1.0);
  // Por debajo, la cara de abajo de vanilla (algo más oscura); por encima, la de arriba.
  gl_FragColor = vec4(vsCloudCol * (rd.y > 0.0 ? 0.88 : 1.0), a);
}`,
      transparent: true,
      depthWrite: false,
    })
    this.clouds = new THREE.Mesh(g, this.cloudMat)
    this.clouds.frustumCulled = false
    // Detrás de lo transparente de la build (agua, cristal, la capa fantasma), que
    // queda por debajo.
    this.clouds.renderOrder = 6
    this.mesh = new THREE.Mesh(g, this.mat)
    this.mesh.frustumCulled = false
    this.mesh.renderOrder = -1e9
    const u = this.u
    this.mesh.onBeforeRender = (_r, _s, cam) => {
      // Las vistas planas no tienen perspectiva: el cielo se pinta como si la hubiera
      // (55 grados), mirando hacia donde miran.
      const oc = cam as THREE.OrthographicCamera
      if (oc.isOrthographicCamera) {
        this.orthoProj.aspect = (oc.right - oc.left) / Math.max(1e-6, oc.top - oc.bottom)
        this.orthoProj.updateProjectionMatrix()
        u.vsInvProj.value.copy(this.orthoProj.projectionMatrixInverse)
      } else {
        u.vsInvProj.value.copy(cam.projectionMatrixInverse)
      }
      u.vsOrtho.value = oc.isOrthographicCamera ? 1 : 0
      u.vsRealInvProj.value.copy(cam.projectionMatrixInverse)
      u.vsProj.value.copy(cam.projectionMatrix)
      u.vsCamWorld.value.copy(cam.matrixWorld)
      if (this.moving) u.vsCloud.value.y = ((performance.now() - this.t0) / 1000 * CLOUD_SPEED) % (CLOUD_CELL * 256)
    }
  }

  /**
   * Hora del día (horas, 12 = mediodía), como en vanilla: el sol sale por el este
   * (+X) a las 6 y se pone por el oeste a las 18, pasando por encima; la luna, enfrente.
   */
  setTime(h: number): void {
    const u = this.u
    const a = (h - 12) / 24 * Math.PI * 2
    u.vsSunDir.value.set(-Math.sin(a), Math.cos(a), 0)
    const b = luzDeDia(h)
    u.vsSky.value.set(SKY[0] * b, SKY[1] * b, SKY[2] * b)
    u.vsFog.value.set(FOG[0] * (b * 0.94 + 0.06), FOG[1] * (b * 0.94 + 0.06), FOG[2] * (b * 0.91 + 0.09))
    const cb = b * 0.9 + 0.1
    u.vsCloudCol.value.set(cb, cb, b * 0.85 + 0.15)
    // El color del amanecer de vanilla (getSunriseColor), cuando el sol está cerca
    // del horizonte.
    const g = Math.cos(a)
    if (g >= -0.4 && g <= 0.4) {
      const k = g / 0.4 * 0.5 + 0.5
      let al = 1 - (1 - Math.sin(k * Math.PI)) * 0.99
      al *= al
      u.vsSunrise.value.set(k * 0.3 + 0.7, k * k * 0.7 + 0.2, 0.2, al)
    } else {
      u.vsSunrise.value.w = 0
    }
    u.vsSunriseX.value = Math.sin(a) < 0 ? 1 : -1
    // Las estrellas de vanilla (getStarBrightness), algo más vivas sobre el fondo.
    const s = Math.max(0, Math.min(1, 1 - (Math.cos(a) * 2 + 0.25)))
    u.vsStars.value = s * s
  }

  get visible(): boolean { return this.mesh.visible }
  set visible(v: boolean) { this.mesh.visible = v; this.clouds.visible = v }

  /** Altura de las nubes (mundo) y hasta dónde se ven en horizontal en las vistas planas (bloques). */
  setClouds(y: number, range: number): void {
    this.u.vsCloud.value.x = y
    this.u.vsCloud.value.z = range
  }

  dispose(): void {
    this.disposed = true
    this.mesh.geometry.dispose()
    this.mat.dispose()
    this.cloudMat.dispose()
    for (const t of this.texs) t.dispose()
    this.texs = []
  }
}
