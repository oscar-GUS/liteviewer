// Motor del visor 3D (agnóstico de framework). three.js sobre un <canvas>.
// - Cámaras: libre (perspectiva, órbita) + ortográfica (iso y vistas planas).
// - Spectator: near-plane pequeño + sin frustum-cull (no desaparece al acercarse).
// - Zoom/órbita suaves (damping), render continuo.
// - Corte por planos de recorte en X/Y/Z (instantáneo, sin remesh).

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { SchematicModel, BlockState, isAir } from './types'
import { baseName } from './blockColors'
import { getFaceInfo } from './blockTextures'
import { buildMesh, buildMeshRaw, MeshGeometries, RawBuffers, SliceRange, LightSample } from './buildMesh'
import { Atlas } from './atlas'
import { ModelDB } from './models'
import { EntityAtlas, EntityManifest, makeEntityAtlas, buildMinecart, buildArmorStand, buildBoat } from './blockEntities'
import { asset } from './assets'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

export type ViewName = 'free' | 'iso' | 'top' | 'bottom' | 'north' | 'south' | 'east' | 'west'
export type Axis = 'x' | 'y' | 'z'

const ISO_EL = Math.atan(1 / Math.SQRT2)
const BG_COLOR = 0x1c1c1f
// Luces puntuales de los emisores en showcase. decay bajo (1) = caída suave que sí
// alcanza a los bloques de alrededor sin reventar los pegados (decay 2 los apagaba
// a 1-2 bloques). Intensidad absoluta, no escala con reach².
const EMITTER_INTENSITY = 2.0
const EMITTER_DECAY = 1.0
// Realce del material emisivo en showcase: multiplica el color para saturar y que
// el bloom lo haga brillar. En modo normal la malla emisiva usa el material opaco.
const EMISSIVE_BOOST = 1.6
const Y_AXIS = new THREE.Vector3(0, 1, 0)
// Constante de tiempo (s) del suavizado del vuelo WASD: la velocidad se acerca
// exponencialmente a la objetivo, así acelera al pulsar y desliza/frena al soltar
// en vez de arrancar y parar de golpe. Menor = más directo, mayor = más flotante.
const FLY_TAU = 0.09
const SIGN_FACING: Record<string, [number, number]> = { north: [0, -1], south: [0, 1], east: [1, 0], west: [-1, 0] }

const VIEW_DIR: Record<Exclude<ViewName, 'free'>, { dir: [number, number, number]; up: [number, number, number] }> = {
  iso: { dir: [Math.cos(ISO_EL) * Math.cos(Math.PI / 4), Math.sin(ISO_EL), Math.cos(ISO_EL) * Math.sin(Math.PI / 4)], up: [0, 1, 0] },
  top: { dir: [0, 1, 0], up: [0, 0, -1] },
  bottom: { dir: [0, -1, 0], up: [0, 0, 1] },
  north: { dir: [0, 0, -1], up: [0, 1, 0] },
  south: { dir: [0, 0, 1], up: [0, 1, 0] },
  east: { dir: [1, 0, 0], up: [0, 1, 0] },
  west: { dir: [-1, 0, 0], up: [0, 1, 0] },
}

export class SchematicViewer {
  private canvas: HTMLCanvasElement
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private perspCam: THREE.PerspectiveCamera
  private orthoCam: THREE.OrthographicCamera
  private activeCam: THREE.Camera
  private controls: OrbitControls
  private opaqueMat: THREE.MeshBasicMaterial
  private transMat: THREE.MeshBasicMaterial
  private entityMat: THREE.MeshBasicMaterial
  private emissiveMat: THREE.MeshBasicMaterial   // bloques que emiten luz: siempre sin iluminar (brillan)
  private opaqueMesh: THREE.Mesh | null = null
  private transMesh: THREE.Mesh | null = null
  private entityMesh: THREE.Mesh | null = null
  private emissiveMesh: THREE.Mesh | null = null

  private model: SchematicModel | null = null
  private atlas: Atlas | null = null
  private db: ModelDB | null = null
  private entityManifest: EntityManifest | null = null
  private entityAtlas: EntityAtlas | null = null
  // Atlas de entidad base (sin skins), para componer/restaurar el dinámico de cabezas.
  private baseEntityManifest: EntityManifest | null = null
  private baseEntityTex: THREE.Texture | null = null
  private customEntityTex: THREE.CanvasTexture | null = null
  private skinToken = 0

  // Atlas de entidades (cofres, shulkers…) que carga async. La captura de la
  // miniatura debe esperar a que esté listo (textura + manifiesto), o los cofres
  // salen con el modelo placeholder de tablones. Se resuelve cuando ambos fetch
  // terminan (aunque fallen, para no colgar la captura).
  private entityTexReady = false
  private entityManifestReady = false
  private entityReadyResolve: (() => void) | null = null
  private entityReadyP: Promise<void> = new Promise((res) => { this.entityReadyResolve = res })
  private markEntityReady(which: 'tex' | 'manifest'): void {
    if (which === 'tex') this.entityTexReady = true
    else this.entityManifestReady = true
    if (this.entityTexReady && this.entityManifestReady && this.entityReadyResolve) {
      this.entityReadyResolve()
      this.entityReadyResolve = null
    }
  }
  /** Promesa que resuelve cuando el atlas de entidades está cargado (textura + manifiesto). */
  whenEntityReady(): Promise<void> { return this.entityReadyP }

  private view: ViewName = 'free'
  private boundingRadius = 10
  private orthoDist = 40
  private viewHalfHeight = 10
  private orthoDir = new THREE.Vector3(1, 1, 1).normalize()
  private orthoUp = new THREE.Vector3(0, 1, 0)

  private clipPlanes: THREE.Plane[]
  private slice: SliceRange = { x: [0, 0], y: [0, 0], z: [0, 0] }

  private worker: Worker | null = null
  private workerSeq = 0
  private workerBusy = false
  private pendingRebuild = false

  // End portal / gateway animado (campo de estrellas con parallax, malla aparte).
  private endPortalMesh: THREE.Mesh | null = null
  private endPortalTex: THREE.CanvasTexture | null = null
  private endPortalCtx: CanvasRenderingContext2D | null = null
  private endPortalLayers: { x: number; y: number; r: number; g: number; b: number; ph: number; sz: number }[][] = []

  // Item frames (marco + ítem dentro). Malla del marco (color) + malla de ítems (atlas).
  private framesGroup: THREE.Group | null = null
  private framesTex: THREE.CanvasTexture | null = null
  private minecartsGroup: THREE.Group | null = null
  private itemAtlasTex: THREE.Texture | null = null
  private itemAtlasData: { cell: number; cols: number; size: { w: number; h: number }; tiles: Record<string, number> } | null = null
  private itemAtlasLoading = false
  truncated = false
  onRebuild?: (truncated: boolean) => void

  private rafId = 0
  private tween: { dir: THREE.Vector3; up: THREE.Vector3; start: number; dur: number } | null = null
  private _needsRender = false

  // Modo escaparate (showcase): autorrotación + iluminación dinámica + bloom.
  private showcase = false
  private opaqueLit: THREE.MeshLambertMaterial | null = null
  private transLit: THREE.MeshLambertMaterial | null = null
  private entityLit: THREE.MeshLambertMaterial | null = null
  private lights: THREE.Light[] = []
  private sun: THREE.DirectionalLight | null = null
  private composer: EffectComposer | null = null
  private bloomPass: UnrealBloomPass | null = null
  private lightSamples: LightSample[] = []        // emisores agrupados (del worker)
  private emitterLights: THREE.PointLight[] = []   // luces puntuales activas en showcase

  // Free-cam WASD (solo vista libre): mover cámara+target juntos.
  private keys = new Set<string>()
  private hovering = false
  private flyEnabled = false   // free-cam activado por el usuario (botón); si no, WASD no mueve
  private lastFlyT = 0
  private flySpeedMul = 1   // multiplicador regulable de la velocidad de vuelo (slider)
  private _flyVel = new THREE.Vector3()      // velocidad de vuelo actual (suavizada)
  private _flyDesired = new THREE.Vector3()  // velocidad objetivo según teclas
  private _flyMove = new THREE.Vector3()     // desplazamiento del frame
  // Arrastre en vista libre: 'fps' = mirar desde tu sitio (izq), 'orbit' = orbitar
  // alrededor del centro de la schematic (der). 'none' = nada.
  private lookMode: 'none' | 'fps' | 'orbit' = 'none'
  private lookPX = 0
  private lookPY = 0
  private lookMoveT = 0
  private orbitVel = { yaw: 0, pitch: 0 }   // inercia del orbit (der): frena suave al soltar
  private lookVel  = { yaw: 0, pitch: 0 }   // inercia del fps look (izq): mismo smooth

  private raycaster = new THREE.Raycaster()
  private pickNdc = new THREE.Vector2()
  private highlight: THREE.LineSegments | null = null
  private highlightPair: THREE.LineSegments | null = null   // 2ª mitad (cofre doble)
  private highlightMat: THREE.LineBasicMaterial
  private signGroup: THREE.Group | null = null
  private tmpV = new THREE.Vector3()

  constructor(canvas: HTMLCanvasElement) {
    THREE.ColorManagement.enabled = false

    this.canvas = canvas
    // Sin preserveDrawingBuffer para máximo rendimiento; captureIso usa un renderer temporal.
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    this.renderer.localClippingEnabled = true
    this.renderer.setClearColor(0x000000, 0) // transparente cuando scene.background = null

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(BG_COLOR)

    const a = this.aspect()
    this.perspCam = new THREE.PerspectiveCamera(55, a, 0.05, 8000)
    this.orthoCam = new THREE.OrthographicCamera(-10 * a, 10 * a, 10, -10, 0.05, 8000)
    this.activeCam = this.perspCam

    this.clipPlanes = [
      new THREE.Plane(new THREE.Vector3(1, 0, 0)), new THREE.Plane(new THREE.Vector3(-1, 0, 0)),
      new THREE.Plane(new THREE.Vector3(0, 1, 0)), new THREE.Plane(new THREE.Vector3(0, -1, 0)),
      new THREE.Plane(new THREE.Vector3(0, 0, 1)), new THREE.Plane(new THREE.Vector3(0, 0, -1)),
    ]
    this.opaqueMat = new THREE.MeshBasicMaterial({ vertexColors: true, alphaTest: 0.5, clippingPlanes: this.clipPlanes })
    this.transMat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.8, depthWrite: false, clippingPlanes: this.clipPlanes })
    this.entityMat = new THREE.MeshBasicMaterial({ vertexColors: true, alphaTest: 0.5, clippingPlanes: this.clipPlanes })
    // polygonOffset: dibuja la geometría emisiva ligeramente por delante para evitar
    // el z-fighting de bloques planos coplanares (p. ej. glow lichen parpadeando).
    this.emissiveMat = new THREE.MeshBasicMaterial({ vertexColors: true, alphaTest: 0.5, clippingPlanes: this.clipPlanes, color: new THREE.Color(EMISSIVE_BOOST, EMISSIVE_BOOST, EMISSIVE_BOOST), polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 })
    this.highlightMat = new THREE.LineBasicMaterial({ color: 0xF4811F, depthTest: false, transparent: true, clippingPlanes: this.clipPlanes })
    this.loadEntityAtlas()

    this.controls = this.makeControls()
    this.resize()
    this.scheduleRender()
    this.setupFlyControls()

    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./meshWorker', import.meta.url))
      this.worker.addEventListener('message', this.onWorkerMessage)
    }
  }

  // ── API ─────────────────────────────────────────────────────────────────────
  load(model: SchematicModel): void {
    this.model = model
    this.boundingRadius = 0.5 * Math.hypot(model.width, model.height, model.length)
    this.slice = { x: [0, model.width - 1], y: [0, model.height - 1], z: [0, model.length - 1] }
    this.updateClip()
    this.rebuild()
    this.buildSignText()
    this.setView(this.view)
    this.scheduleRender()
    void this.applySkins(model)   // cabezas con skin propio: async, rehace el mesh al terminar
  }

  setAtlas(atlas: Atlas): void {
    this.atlas = atlas
    this.opaqueMat.map = atlas.texture
    this.transMat.map = atlas.texture
    this.emissiveMat.map = atlas.texture
    this.opaqueMat.needsUpdate = true
    this.transMat.needsUpdate = true
    this.emissiveMat.needsUpdate = true
    this.syncLitMaps()
    this.rebuild()
  }

  // Atlas de texturas de entidad (cofres, shulkers, cabezas…) apiladas, + su
  // manifiesto JSON. Independiente del atlas de bloques. El manifiesto se pasa al
  // worker para mapear los UV; aquí solo cargamos la textura y guardamos el atlas
  // para el fallback síncrono.
  private loadEntityAtlas(): void {
    new THREE.TextureLoader().load(asset('entity-atlas.png'),
      (t) => {
        t.magFilter = THREE.NearestFilter
        t.minFilter = THREE.NearestFilter
        t.generateMipmaps = false
        t.flipY = false
        this.baseEntityTex = t
        // Si ya hay skins compuestas para el modelo actual, no pisar su textura.
        if (!this.customEntityTex) this.entityMat.map = t
        this.entityMat.needsUpdate = true
        this.syncLitMaps()
        // Minecarts/armor stands usan un mesh propio con esta textura: si se
        // construyeron antes de que cargara, hay que rehacerlos ahora.
        if (this.model?.minecarts?.length || this.model?.armorStands?.length || this.model?.boats?.length) this.buildMinecarts()
        this.scheduleRender()
        this.markEntityReady('tex')
      },
      undefined,
      () => this.markEntityReady('tex'), // si falla la textura, no colgamos la captura
    )
    fetch(asset('entity-atlas.json'))
      .then((r) => r.json())
      .then((m: EntityManifest) => {
        this.baseEntityManifest = m
        // No pisar un manifiesto extendido (con skins) ya aplicado al modelo actual.
        if (!this.customEntityTex) {
          this.entityManifest = m
          this.entityAtlas = makeEntityAtlas(m)
        }
        if (this.model) this.rebuild()
      })
      .catch(() => { /* sin entidades si no carga el manifiesto */ })
      .finally(() => this.markEntityReady('manifest'))
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((res, rej) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => res(img)
      img.onerror = rej
      img.src = src
    })
  }

  // Cabezas de jugador con skin propio: descarga las skins (por proxy), las compone
  // bajo el atlas de entidad base en un canvas y usa ese atlas ampliado (textura +
  // manifiesto) para el mesh de entidad. Las regiones base quedan en los MISMOS
  // píxeles → sus UV no cambian. Async y a prueba de cambios de modelo (skinToken).
  private async applySkins(model: SchematicModel): Promise<void> {
    const token = ++this.skinToken
    const skins = model.skins
    if (!skins || !skins.size) {
      // Modelo sin skins: restaurar el atlas base si veníamos de uno con skins.
      if (this.customEntityTex) {
        this.customEntityTex.dispose(); this.customEntityTex = null
        if (this.baseEntityTex) this.entityMat.map = this.baseEntityTex
        this.entityMat.needsUpdate = true
        this.syncLitMaps()
        if (this.baseEntityManifest) {
          this.entityManifest = this.baseEntityManifest
          this.entityAtlas = makeEntityAtlas(this.baseEntityManifest)
        }
        this.rebuild()
      }
      return
    }

    await this.entityReadyP                              // asegura atlas base cargado
    const base = this.baseEntityManifest
    if (!base || token !== this.skinToken || this.model !== model) return

    const entries = [...skins]                           // [key, hash]
    let baseImg: HTMLImageElement
    try { baseImg = await this.loadImage(asset('entity-atlas.png')) } catch { return }
    const imgs = await Promise.all(entries.map(([, hash]) =>
      this.loadImage(`/api/skin/${hash}`).catch(() => null)))
    if (token !== this.skinToken || this.model !== model) return

    const [bw, bh] = base.size
    const SLOT = 64
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(bw, SLOT)
    canvas.height = bh + entries.length * SLOT
    const ctx = canvas.getContext('2d')!
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(baseImg, 0, 0)
    const tex: EntityManifest['tex'] = { ...base.tex }
    entries.forEach(([key], i) => {
      const img = imgs[i]
      if (!img) return                                   // skin caída → cae a Steve
      const y = bh + i * SLOT
      ctx.drawImage(img, 0, y)                            // 64×64 o 64×32 (cabeza en la esquina)
      tex[key] = { x: 0, y, w: SLOT, h: SLOT }
    })

    const ctex = new THREE.CanvasTexture(canvas)
    ctex.magFilter = THREE.NearestFilter
    ctex.minFilter = THREE.NearestFilter
    ctex.generateMipmaps = false
    ctex.flipY = false
    ctex.needsUpdate = true

    this.customEntityTex?.dispose()
    this.customEntityTex = ctex
    this.entityMat.map = ctex
    this.entityMat.needsUpdate = true
    this.syncLitMaps()
    const manifest: EntityManifest = { size: [canvas.width, canvas.height], tex }
    this.entityManifest = manifest
    this.entityAtlas = makeEntityAtlas(manifest)
    this.rebuild()
  }

  setModelDB(db: ModelDB): void {
    this.db = db
    this.rebuild()
  }

  // Cambia atlas + modelos a la vez (toggle de resource pack) con un solo rebuild.
  setResources(atlas: Atlas, db: ModelDB): void {
    this.atlas = atlas
    this.opaqueMat.map = atlas.texture
    this.transMat.map = atlas.texture
    this.emissiveMat.map = atlas.texture
    this.opaqueMat.needsUpdate = true
    this.transMat.needsUpdate = true
    this.emissiveMat.needsUpdate = true
    this.syncLitMaps()
    this.db = db
    this.rebuild()
  }

  setView(view: ViewName): void {
    this.view = view
    this.tween = null
    this.activeCam = view === 'free' ? this.perspCam : this.orthoCam
    this.controls.dispose()
    this.controls = this.makeControls()
    if (view === 'free') {
      this.frameFree()
    } else {
      const v = VIEW_DIR[view]
      this.orthoDir.set(v.dir[0], v.dir[1], v.dir[2]).normalize()
      this.orthoUp.set(v.up[0], v.up[1], v.up[2])
      this.frameOrtho()
    }
    this.scheduleRender()
  }

  rotate90(): void {
    if (this.view === 'free') return
    this.tween = { dir: this.orthoDir.clone(), up: this.orthoUp.clone(), start: performance.now(), dur: 300 }
    this.scheduleRender()
  }

  /**
   * Modo escaparate: rotación automática suave de la cámara libre + iluminación
   * dinámica (materiales Lambert con sol/ambiente) y un bloom sutil para que los
   * bloques claros brillen → aspecto "con shaders".
   */
  setShowcase(on: boolean): void {
    if (on === this.showcase) return
    if (on) {
      this.ensureShowcase()
      this.showcase = true
      this.setView('free')                 // la autorrotación solo aplica a la cámara libre
      this.ensureNormals(this.opaqueMesh)
      this.ensureNormals(this.entityMesh)
      this.ensureNormals(this.transMesh)
      this.swapShowcaseMaterials(true)
      this.applyShadowFlags(true)
      this.refreshEmitterLights()          // luces puntuales de los bloques emisores
      this.requestShadowUpdate()
      this.controls.autoRotate = true
      this.controls.autoRotateSpeed = 1.1
    } else {
      this.showcase = false
      this.controls.autoRotate = false
      this.swapShowcaseMaterials(false)
      this.applyShadowFlags(false)
      this.clearEmitterLights()
    }
    this.scheduleRender()
  }

  // Crea luces puntuales reales a partir de las muestras de emisores (agrupadas en
  // el worker). Solo en showcase. Se reconstruye al cambiar geometría (slice).
  private refreshEmitterLights(): void {
    this.clearEmitterLights()
    if (!this.showcase) return
    for (const s of this.lightSamples) {
      const reach = Math.max(6, s.level * 0.8 + 5)   // alcance del pozo de luz
      const boost = Math.min(1.6, 1 + 0.25 * Math.log2(s.count + 1))
      const intensity = EMITTER_INTENSITY * (0.45 + 0.55 * (s.level / 15)) * boost
      const pl = new THREE.PointLight(new THREE.Color(s.r, s.g, s.b), intensity, reach, EMITTER_DECAY)
      pl.position.set(s.x, s.y, s.z)
      pl.castShadow = false
      this.scene.add(pl)
      this.emitterLights.push(pl)
    }
  }

  private clearEmitterLights(): void {
    for (const l of this.emitterLights) this.scene.remove(l)
    this.emitterLights.length = 0
  }

  // La luz/modelo no se mueven (solo orbita la cámara), así que la sombra se
  // recalcula solo a petición: al entrar en showcase o al cambiar la geometría.
  private requestShadowUpdate(): void {
    if (this.sun) this.sun.shadow.needsUpdate = true
  }

  private applyShadowFlags(on: boolean): void {
    if (this.opaqueMesh) { this.opaqueMesh.castShadow = on; this.opaqueMesh.receiveShadow = on }
    if (this.entityMesh) { this.entityMesh.castShadow = on; this.entityMesh.receiveShadow = on }
    if (this.transMesh)  { this.transMesh.castShadow = false; this.transMesh.receiveShadow = on }
    // Emisiva: proyecta sombra (bloquea luz) pero no la recibe (debe brillar uniforme).
    if (this.emissiveMesh) { this.emissiveMesh.castShadow = on; this.emissiveMesh.receiveShadow = false }
  }

  get isShowcase(): boolean { return this.showcase }

  /** Pausa/reanuda la autorrotación sin salir del modo showcase. */
  setShowcaseRotation(on: boolean): void {
    if (!this.showcase) return
    this.controls.autoRotate = on
    this.scheduleRender()
  }

  /** Multiplicador de velocidad del vuelo WASD (1 = por defecto). */
  setFlySpeed(mult: number): void { this.flySpeedMul = Math.max(0.05, mult) }
  // Activa/desactiva el free-cam (WASD). Al desactivar, suelta las teclas.
  setFlyEnabled(v: boolean): void { this.flyEnabled = v; if (!v) this.keys.clear(); this.scheduleRender() }
  get flySpeed(): number { return this.flySpeedMul }

  /**
   * Captura la vista actual (con iluminación/sombras/bloom si está en showcase)
   * leyendo el backbuffer del propio renderer → no necesita preserveDrawingBuffer
   * ni un contexto aparte, así que las sombras salen correctas. Resolución = la
   * del canvas. Fondo SIEMPRE transparente y salida PNG, para poder recortar la
   * build sobre cualquier fondo — funcione o no el modo showcase.
   */
  async capturePhoto(): Promise<Blob | null> {
    const w = this.renderer.domElement.width, h = this.renderer.domElement.height
    if (!w || !h) return null
    if (this.sun) this.sun.shadow.needsUpdate = true
    // Fondo transparente: quitamos el color/imagen de fondo solo durante la captura.
    const prevBg = this.scene.background
    this.scene.background = null

    const gl = this.renderer.getContext()
    const rgb = new Uint8Array(w * h * 4)   // color (premultiplicado por su alfa)
    const showcase = this.showcase && !!this.composer

    if (showcase) {
      // El bloom del composer destruye el alfa (fondo opaco). Sacamos el COLOR del
      // composer (con bloom) y el ALFA de un render plano transparente, y se combinan.
      this.composer!.render()
      gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, rgb)   // color, alfa inservible
      this.renderer.render(this.scene, this.activeCam)
      const am = new Uint8Array(w * h * 4)
      gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, am)    // alfa correcto
      // Inyecta el alfa plano en el buffer de color. El color del composer va
      // premultiplicado por alfa 255 (opaco) → ya es recto, no hay que dividir.
      for (let i = 3; i < rgb.length; i += 4) rgb[i] = am[i]
    } else {
      this.renderer.render(this.scene, this.activeCam)
      gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, rgb)
    }

    this.scene.background = prevBg

    const out = document.createElement('canvas')
    out.width = w; out.height = h
    const ctx = out.getContext('2d')!
    const img = ctx.createImageData(w, h)
    const dst = img.data
    const row = w * 4
    // El contexto WebGL es premultiplicado: hay que des-premultiplicar el RGB por
    // el alfa o los bordes semitransparentes salen con halo oscuro en el PNG. En
    // showcase el color ya es recto (alfa inyectado aparte) → no se des-premultiplica.
    for (let y = 0; y < h; y++) {            // readPixels viene con el eje Y invertido
      const src = (h - 1 - y) * row
      const d   = y * row
      for (let x = 0; x < row; x += 4) {
        const a = rgb[src + x + 3]
        if (showcase || a === 0 || a === 255) {
          dst[d + x]     = rgb[src + x]
          dst[d + x + 1] = rgb[src + x + 1]
          dst[d + x + 2] = rgb[src + x + 2]
          dst[d + x + 3] = a
        } else {
          const f = 255 / a
          dst[d + x]     = Math.min(255, rgb[src + x]     * f)
          dst[d + x + 1] = Math.min(255, rgb[src + x + 1] * f)
          dst[d + x + 2] = Math.min(255, rgb[src + x + 2] * f)
          dst[d + x + 3] = a
        }
      }
    }
    ctx.putImageData(img, 0, 0)

    const blob = await new Promise<Blob | null>(res => out.toBlob(b => res(b), 'image/png'))
    this.scheduleRender()
    return blob
  }

  private swapShowcaseMaterials(lit: boolean): void {
    if (this.opaqueMesh) this.opaqueMesh.material = lit ? this.opaqueLit! : this.opaqueMat
    if (this.transMesh)  this.transMesh.material  = lit ? this.transLit!  : this.transMat
    if (this.entityMesh) this.entityMesh.material = lit ? this.entityLit! : this.entityMat
    // Emisiva: realzada (brilla) en showcase; opaca normal fuera de él.
    if (this.emissiveMesh) this.emissiveMesh.material = lit ? this.emissiveMat : this.opaqueMat
  }

  private syncLitMaps(): void {
    if (!this.opaqueLit) return
    this.opaqueLit.map = this.opaqueMat.map;   this.opaqueLit.needsUpdate = true
    this.transLit!.map = this.transMat.map;    this.transLit!.needsUpdate = true
    this.entityLit!.map = this.entityMat.map;  this.entityLit!.needsUpdate = true
  }

  private ensureShowcase(): void {
    if (this.opaqueLit) { this.syncLitMaps(); return }

    this.opaqueLit = new THREE.MeshLambertMaterial({ vertexColors: true, alphaTest: 0.5, clippingPlanes: this.clipPlanes })
    this.entityLit = new THREE.MeshLambertMaterial({ vertexColors: true, alphaTest: 0.5, clippingPlanes: this.clipPlanes })
    this.transLit  = new THREE.MeshLambertMaterial({ vertexColors: true, transparent: true, opacity: 0.8, depthWrite: false, clippingPlanes: this.clipPlanes })
    this.syncLitMaps()

    // Iluminación de estudio: relleno ambiente/hemisférico suave + una luz clave
    // direccional que PROYECTA SOMBRAS. El contraste luz/sombra es lo que da el
    // aspecto de render limpio (no afectan a los MeshBasicMaterial del modo normal).
    // Ambiente más bajo + clave más fuerte => sombras más profundas y contraste.
    // Deja "hueco" oscuro para que las luces puntuales de los emisores destaquen.
    const amb  = new THREE.AmbientLight(0xffffff, 0.85)
    const hemi = new THREE.HemisphereLight(0xd2e0ff, 0x3a3d34, 0.75)
    const sun  = new THREE.DirectionalLight(0xfff3e0, 1.35)
    const fill = new THREE.DirectionalLight(0x9fc0ff, 0.22)
    fill.position.set(-0.5, 0.4, -0.6)
    for (const l of [amb, hemi, sun, fill]) { this.scene.add(l); this.lights.push(l) }
    this.sun = sun

    // Sombras suaves proyectadas por la luz clave (self-shadow del propio modelo).
    // La cámara de sombra (ortográfica) se dimensiona al radio del modelo.
    const r = Math.max(8, this.boundingRadius)
    sun.position.set(0.55, 1, 0.4).normalize().multiplyScalar(r * 2.2)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    sun.shadow.camera.left = -r * 1.3; sun.shadow.camera.right = r * 1.3
    sun.shadow.camera.top  =  r * 1.3; sun.shadow.camera.bottom = -r * 1.3
    sun.shadow.camera.near = 0.5;      sun.shadow.camera.far = r * 5
    sun.shadow.bias = -0.0008
    sun.shadow.normalBias = Math.min(0.3, Math.max(0.05, r * 0.004))
    sun.shadow.autoUpdate = false      // modelo estático: la sombra se recalcula a petición
    sun.shadow.camera.updateProjectionMatrix()
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // Bloom MUY sutil: apenas un halo en lo más brillante (sin lavar nada claro).
    const w = this.canvas.clientWidth || 1, h = this.canvas.clientHeight || 1
    this.composer = new EffectComposer(this.renderer)
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.composer.setSize(w, h)
    this.composer.addPass(new RenderPass(this.scene, this.perspCam))
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.18, 0.35, 0.9)
    this.composer.addPass(this.bloomPass)
  }

  setSlice(axis: Axis, min: number, max: number): void {
    this.slice[axis] = [Math.min(min, max), Math.max(min, max)]
    this.updateClip()
    this.scheduleRender()
    this.rebuild()
  }

  setBackground(hex: string): void {
    this.renderer.domElement.style.backgroundImage = ''
    this.scene.background = new THREE.Color(hex)
    this.scheduleRender()
  }

  // Imagen de fondo: hace la escena transparente para que el div CSS de detrás se vea.
  setBackgroundImage(url: string | null): void {
    if (url) {
      this.scene.background = null
    }
    this.scheduleRender()
  }

  resetView(): void {
    if (this.view === 'free') this.frameFree()
    else this.frameOrtho()
    this.scheduleRender()
  }

  /**
   * Identifica el bloque bajo el cursor recorriendo el rayo por la rejilla de
   * vóxeles (DDA Amanatides-Woo), no por raycast contra el mesh: el mesh de una
   * schematic grande tiene millones de triángulos y three.js los recorre todos
   * (lineal, ~segundos). El DDA es O(longitud del rayo) → instantáneo. Devuelve la
   * primera celda no-aire y visible (dentro del corte) que atraviesa el rayo.
   */
  pick(clientX: number, clientY: number): { x: number; y: number; z: number; state: BlockState } | null {
    if (!this.model) return null
    const rect = this.canvas.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return null
    this.pickNdc.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1,
    )
    this.raycaster.setFromCamera(this.pickNdc, this.activeCam)
    const { width: W, height: H, length: L, blocks, palette } = this.model
    const ray = this.raycaster.ray
    // Origen/dirección en coords de rejilla (el mesh está centrado en el origen).
    const o = [ray.origin.x + W / 2, ray.origin.y + H / 2, ray.origin.z + L / 2]
    const d = [ray.direction.x, ray.direction.y, ray.direction.z]
    const size = [W, H, L]

    // Entrada del rayo en la caja [0,W]x[0,H]x[0,L] (método de slabs).
    let tEnter = 0, tExit = Infinity
    for (let a = 0; a < 3; a++) {
      if (Math.abs(d[a]) < 1e-9) {
        if (o[a] < 0 || o[a] > size[a]) return null
      } else {
        let t1 = (0 - o[a]) / d[a], t2 = (size[a] - o[a]) / d[a]
        if (t1 > t2) { const t = t1; t1 = t2; t2 = t }
        if (t1 > tEnter) tEnter = t1
        if (t2 < tExit) tExit = t2
      }
    }
    if (tEnter > tExit) return null

    const t0 = tEnter + 1e-4
    let cx = Math.min(W - 1, Math.max(0, Math.floor(o[0] + d[0] * t0)))
    let cy = Math.min(H - 1, Math.max(0, Math.floor(o[1] + d[1] * t0)))
    let cz = Math.min(L - 1, Math.max(0, Math.floor(o[2] + d[2] * t0)))
    const stepX = d[0] >= 0 ? 1 : -1, stepY = d[1] >= 0 ? 1 : -1, stepZ = d[2] >= 0 ? 1 : -1
    const tDeltaX = d[0] !== 0 ? Math.abs(1 / d[0]) : Infinity
    const tDeltaY = d[1] !== 0 ? Math.abs(1 / d[1]) : Infinity
    const tDeltaZ = d[2] !== 0 ? Math.abs(1 / d[2]) : Infinity
    let tMaxX = d[0] !== 0 ? ((stepX > 0 ? cx + 1 : cx) - o[0]) / d[0] : Infinity
    let tMaxY = d[1] !== 0 ? ((stepY > 0 ? cy + 1 : cy) - o[1]) / d[1] : Infinity
    let tMaxZ = d[2] !== 0 ? ((stepZ > 0 ? cz + 1 : cz) - o[2]) / d[2] : Infinity

    const sx = this.slice.x, sy = this.slice.y, sz = this.slice.z
    for (let i = 0; i <= W + H + L; i++) {
      if (cx >= sx[0] && cx <= sx[1] && cy >= sy[0] && cy <= sy[1] && cz >= sz[0] && cz <= sz[1]) {
        const state = palette[blocks[(cy * L + cz) * W + cx]]
        if (state && !isAir(state.name)) return { x: cx, y: cy, z: cz, state }
      }
      if (tMaxX < tMaxY && tMaxX < tMaxZ) { cx += stepX; if (cx < 0 || cx >= W) break; tMaxX += tDeltaX }
      else if (tMaxY < tMaxZ) { cy += stepY; if (cy < 0 || cy >= H) break; tMaxY += tDeltaY }
      else { cz += stepZ; if (cz < 0 || cz >= L) break; tMaxZ += tDeltaZ }
    }
    return null
  }

  // ── Texto de carteles (planos con textura de canvas pegados a la cara) ──────────
  private makeSignTexture(lines: string[]): THREE.CanvasTexture {
    const w = 256, h = 144
    const cv = document.createElement('canvas')
    cv.width = w; cv.height = h
    const ctx = cv.getContext('2d')!
    ctx.fillStyle = '#1a1a1a'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const rowH = h / 4
    for (let i = 0; i < Math.min(lines.length, 4); i++) {
      const text = lines[i]
      if (!text) continue
      ctx.font = 'bold 30px sans-serif'
      const tw = ctx.measureText(text).width
      const maxW = w - 18
      const scale = tw > maxW ? maxW / tw : 1
      ctx.save()
      ctx.translate(w / 2, rowH * (i + 0.5))
      ctx.scale(scale, 1)
      ctx.fillText(text, 0, 0)
      ctx.restore()
    }
    const tex = new THREE.CanvasTexture(cv)
    tex.anisotropy = 4
    return tex
  }

  private disposeSignGroup(): void {
    if (!this.signGroup) return
    for (const c of this.signGroup.children) {
      const m = c as THREE.Mesh
      m.geometry.dispose()
      const mat = m.material as THREE.MeshBasicMaterial
      mat.map?.dispose(); mat.dispose()
    }
    this.scene.remove(this.signGroup)
    this.signGroup = null
  }

  private buildSignText(): void {
    this.disposeSignGroup()
    const model = this.model
    if (!model || !model.signs || model.signs.size === 0) return
    const W = model.width, L = model.length
    const cx = W / 2, cy = model.height / 2, cz = L / 2
    const group = new THREE.Group()

    const addPlane = (lines: string[], wx: number, wy: number, wz: number, faceX: number, faceZ: number) => {
      if (!lines.some((l) => l)) return
      const mat = new THREE.MeshBasicMaterial({
        map: this.makeSignTexture(lines), transparent: true, depthWrite: false, side: THREE.DoubleSide,
        clippingPlanes: this.clipPlanes, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
      })
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 0.46), mat)
      mesh.position.set(wx, wy, wz)
      mesh.rotation.y = Math.atan2(faceX, faceZ)
      mesh.renderOrder = 5
      mesh.frustumCulled = false
      group.add(mesh)
    }

    for (const [cell, sign] of model.signs) {
      const bs = model.palette[model.blocks[cell]]
      if (!bs) continue
      const x = cell % W
      const z = Math.floor(cell / W) % L
      const y = Math.floor(cell / (W * L))
      const hanging = bs.name.includes('hanging')
      const wall = bs.name.includes('wall') && !hanging
      let dirX: number, dirZ: number, ly: number, along: number
      if (hanging) {
        // Cartel colgante: la tabla cuelga en la mitad BAJA del bloque (barra/cadenas
        // arriba), y ocupa z 7–9 (grosor 2). El texto va sobre la tabla a ~5/16 de
        // alto, y desplazado ~1.1 para quedar SOBRE la cara (no dentro, o no se ve).
        if (bs.name.includes('wall')) {
          const f = SIGN_FACING[bs.properties?.facing ?? 'south'] ?? [0, 1]
          dirX = f[0]; dirZ = f[1]
        } else {
          const yaw = (parseInt(bs.properties?.rotation ?? '0', 10) || 0) * 22.5 * Math.PI / 180
          dirX = -Math.sin(yaw); dirZ = Math.cos(yaw)
        }
        ly = 5; along = 1.1
      } else if (wall) {
        const f = SIGN_FACING[bs.properties?.facing ?? 'south'] ?? [0, 1]
        dirX = f[0]; dirZ = f[1]; ly = 8.5; along = -5.7
      } else {
        // Cartel de pie: la tabla ocupa la mitad ALTA del bloque (el palo de
        // soporte va debajo). El centro de la tabla está en ~12.5/16, no en el
        // centro del bloque — si no, el texto cae sobre el palo.
        const yaw = (parseInt(bs.properties?.rotation ?? '0', 10) || 0) * 22.5 * Math.PI / 180
        dirX = -Math.sin(yaw); dirZ = Math.cos(yaw); ly = 13.5; along = 1.2
      }
      const toWorld = (lx: number, lz: number): [number, number, number] =>
        [(x - cx) + lx / 16, (y - cy) + ly / 16, (z - cz) + lz / 16]
      const [fx, fy, fz] = toWorld(8 + dirX * along, 8 + dirZ * along)
      addPlane(sign.front, fx, fy, fz, dirX, dirZ)
      if (!wall && sign.back.length) {
        const [bx2, by2, bz2] = toWorld(8 - dirX * along, 8 - dirZ * along)
        addPlane(sign.back, bx2, by2, bz2, -dirX, -dirZ)
      }
    }

    this.scene.add(group)
    this.signGroup = group
    this.scheduleRender()
  }

  /** Dibuja (o quita) el contorno naranja de una celda seleccionada. */
  setHighlight(cell: { x: number; y: number; z: number } | null): void {
    if (!cell || !this.model) {
      if (this.highlight) this.highlight.visible = false
      this.scheduleRender()
      return
    }
    if (!this.highlight) {
      const box = new THREE.BoxGeometry(1.001, 1.001, 1.001)
      const edges = new THREE.EdgesGeometry(box)
      box.dispose()
      this.highlight = new THREE.LineSegments(edges, this.highlightMat)
      this.highlight.renderOrder = 999
      this.highlight.frustumCulled = false
      this.scene.add(this.highlight)
    }
    const { width: W, height: H, length: L } = this.model
    this.highlight.position.set(cell.x - W / 2 + 0.5, cell.y - H / 2 + 0.5, cell.z - L / 2 + 0.5)
    this.highlight.visible = true
    this.scheduleRender()
  }

  /** Resalta una segunda celda (la otra mitad de un cofre doble), o la oculta. */
  setHighlightPair(cell: { x: number; y: number; z: number } | null): void {
    if (!cell || !this.model) {
      if (this.highlightPair) this.highlightPair.visible = false
      this.scheduleRender()
      return
    }
    if (!this.highlightPair) {
      const box = new THREE.BoxGeometry(1.001, 1.001, 1.001)
      const edges = new THREE.EdgesGeometry(box)
      box.dispose()
      this.highlightPair = new THREE.LineSegments(edges, this.highlightMat)
      this.highlightPair.renderOrder = 999
      this.highlightPair.frustumCulled = false
      this.scene.add(this.highlightPair)
    }
    const { width: W, height: H, length: L } = this.model
    this.highlightPair.position.set(cell.x - W / 2 + 0.5, cell.y - H / 2 + 0.5, cell.z - L / 2 + 0.5)
    this.highlightPair.visible = true
    this.scheduleRender()
  }

  /** Resuelve cuando no hay ningún rebuild en curso ni pendiente. */
  waitForIdle(): Promise<void> {
    if (!this.workerBusy && !this.pendingRebuild) return Promise.resolve()
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (!this.workerBusy && !this.pendingRebuild) {
          clearInterval(check)
          resolve()
        }
      }, 16)
    })
  }

  getEntityManifest(): EntityManifest | null { return this.entityManifest }

  get isOrtho(): boolean { return this.view !== 'free' }
  get layerCount(): number { return this.model ? this.model.height : 0 }
  get modelSize(): { width: number; height: number; length: number } {
    return this.model
      ? { width: this.model.width, height: this.model.height, length: this.model.length }
      : { width: 0, height: 0, length: 0 }
  }
  renderNow(): void { this.renderer.render(this.scene, this.activeCam) }

  /**
   * Captura una foto isométrica cuadrada con fondo transparente (PNG).
   * Pensado para un canvas OFFSCREEN (fuera del DOM) → clientWidth/Height = 0,
   * por lo que aspect() = 1 y la captura sale cuadrada sin deformación.
   */
  async captureIso(size = 1024, turns = 0): Promise<Blob | null> {
    if (!this.model) return null

    // Supersampling: se renderiza al doble y luego se reduce a `size` → bordes
    // mucho más suaves (menos pixelado en las tarjetas pequeñas).
    const renderSize = size * 2

    // Renderer temporal con preserveDrawingBuffer para poder leer el canvas
    const offscreen = document.createElement('canvas')
    offscreen.width = renderSize; offscreen.height = renderSize
    const tmpRenderer = new THREE.WebGLRenderer({
      canvas: offscreen, antialias: true, alpha: true,
      preserveDrawingBuffer: true,
    })
    tmpRenderer.setPixelRatio(1)
    tmpRenderer.setSize(renderSize, renderSize, false)
    tmpRenderer.outputColorSpace = THREE.LinearSRGBColorSpace
    tmpRenderer.localClippingEnabled = true

    const prevBg = this.scene.background
    this.scene.background = null

    // Cámara ortográfica cuadrada con la vista iso
    const tmpCam = new THREE.OrthographicCamera(-size / 2, size / 2, size / 2, -size / 2, 0.05, 8000)
    const dir = new THREE.Vector3(
      Math.cos(ISO_EL) * Math.cos(Math.PI / 4),
      Math.sin(ISO_EL),
      Math.cos(ISO_EL) * Math.sin(Math.PI / 4),
    ).normalize()
    const up = new THREE.Vector3(0, 1, 0)
    if (turns % 4 !== 0) {
      const ang = (turns % 4) * (Math.PI / 2)
      dir.applyAxisAngle(Y_AXIS, ang)
    }
    const r = this.boundingRadius
    const dist = r * 4
    const hh = r * 1.05
    tmpCam.top = hh; tmpCam.bottom = -hh
    tmpCam.left = -hh; tmpCam.right = hh
    tmpCam.near = 0.05; tmpCam.far = dist + r * 6
    tmpCam.position.copy(new THREE.Vector3(0, 0, 0)).addScaledVector(dir, dist)
    tmpCam.up.copy(up)
    tmpCam.lookAt(0, 0, 0)
    tmpCam.zoom = 1
    tmpCam.updateProjectionMatrix()

    tmpRenderer.render(this.scene, tmpCam)

    // Reduce con suavizado alto a la resolución final (supersampling AA)
    const out = document.createElement('canvas')
    out.width = size; out.height = size
    const octx = out.getContext('2d')!
    octx.imageSmoothingEnabled = true
    octx.imageSmoothingQuality = 'high'
    octx.drawImage(offscreen, 0, 0, renderSize, renderSize, 0, 0, size, size)

    // WebP (con pérdida) en vez de PNG: preview mucho más ligera (≈5-10×) sin
    // pérdida visible → menos storage y menos egress de Supabase.
    const blob = await new Promise<Blob | null>(resolve =>
      out.toBlob(b => resolve(b), 'image/webp', 0.88))

    // Restaurar
    this.scene.background = prevBg
    tmpRenderer.dispose()
    this.scheduleRender()
    return blob
  }
  get vertexCount(): number {
    let n = 0
    if (this.opaqueMesh?.visible) n += this.opaqueMesh.geometry.getAttribute('position')?.count ?? 0
    if (this.entityMesh?.visible) n += this.entityMesh.geometry.getAttribute('position')?.count ?? 0
    if (this.emissiveMesh?.visible) n += this.emissiveMesh.geometry.getAttribute('position')?.count ?? 0
    if (this.transMesh?.visible) n += this.transMesh.geometry.getAttribute('position')?.count ?? 0
    return n
  }

  resize(): void {
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight
    if (w === 0 || h === 0) return
    this.renderer.setSize(w, h, false)
    this.perspCam.aspect = w / h
    this.perspCam.updateProjectionMatrix()
    this.updateOrtho()
    if (this.composer) { this.composer.setSize(w, h); this.bloomPass?.setSize(w, h) }
    this.scheduleRender()
  }

  dispose(): void {
    cancelAnimationFrame(this.rafId)
    this.disposeEndPortal()
    this.disposeItemFrames()
    this.disposeMinecarts()
    this.itemAtlasTex?.dispose()
    this.customEntityTex?.dispose()
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
    window.removeEventListener('blur', this.onWindowBlur)
    this.canvas.removeEventListener('pointerdown', this.onLookDown)
    this.canvas.removeEventListener('pointermove', this.onLookMove)
    this.canvas.removeEventListener('pointerup', this.onLookUp)
    this.controls.dispose()
    this.worker?.terminate()
    this.worker = null
    this.clearEmitterLights()
    this.disposeMesh(this.opaqueMesh)
    this.disposeMesh(this.transMesh)
    this.disposeMesh(this.entityMesh)
    this.disposeMesh(this.emissiveMesh)
    if (this.highlight) { this.highlight.geometry.dispose(); this.scene.remove(this.highlight) }
    if (this.highlightPair) { this.highlightPair.geometry.dispose(); this.scene.remove(this.highlightPair) }
    this.highlightMat.dispose()
    this.disposeSignGroup()
    this.opaqueMat.dispose()
    this.transMat.dispose()
    this.emissiveMat.dispose()
    this.entityMat.map?.dispose()
    this.entityMat.dispose()
    this.composer?.dispose()
    this.bloomPass?.dispose()
    this.opaqueLit?.dispose()
    this.transLit?.dispose()
    this.entityLit?.dispose()
    this.renderer.dispose()
  }

  // ── Recorte (clipping) ────────────────────────────────────────────────────────
  private updateClip(): void {
    if (!this.model) return
    const { width: W, height: H, length: L } = this.model
    const s = this.slice
    const e = 0.002 // margen para que el plano no roce las caras del borde (evita parpadeo)
    this.clipPlanes[0].set(new THREE.Vector3(1, 0, 0), -(s.x[0] - W / 2) + e)
    this.clipPlanes[1].set(new THREE.Vector3(-1, 0, 0), (s.x[1] + 1 - W / 2) + e)
    this.clipPlanes[2].set(new THREE.Vector3(0, 1, 0), -(s.y[0] - H / 2) + e)
    this.clipPlanes[3].set(new THREE.Vector3(0, -1, 0), (s.y[1] + 1 - H / 2) + e)
    this.clipPlanes[4].set(new THREE.Vector3(0, 0, 1), -(s.z[0] - L / 2) + e)
    this.clipPlanes[5].set(new THREE.Vector3(0, 0, -1), (s.z[1] + 1 - L / 2) + e)
  }

  // ── Cámaras / encuadre ─────────────────────────────────────────────────────────
  private makeControls(): OrbitControls {
    const c = new OrbitControls(this.activeCam, this.canvas)
    c.enableDamping = true
    c.dampingFactor = 0.08
    c.zoomToCursor = true
    c.enablePan = this.view !== 'free'   // en libre no se panea (usamos mouselook propio)
    c.enableZoom = true
    c.enableRotate = false               // libre: mouselook FPS propio; iso/orto no rotan
    c.minDistance = 0.01            // permite acercarse mucho (modo spectator, meterse dentro)
    c.maxDistance = this.boundingRadius * 12
    c.target.set(0, 0, 0)
    c.addEventListener('change', () => this.scheduleRender())
    c.addEventListener('start',  () => this.scheduleRender())
    return c
  }

  // ── Free-cam WASD ──────────────────────────────────────────────────────────────
  // Se controla mientras el ratón está sobre el visor (estilo juego): no roba el
  // foco a inputs ni interfiere con el scroll/escritura de la página fuera del visor.
  private setupFlyControls(): void {
    this.canvas.addEventListener('pointerenter', () => { this.hovering = true })
    // No soltamos las teclas al salir del canvas: el free-cam sigue volando aunque
    // el ratón pase por la lista de materiales / cortes / fuera del visor.
    this.canvas.addEventListener('pointerleave', () => { this.hovering = false })
    // Mouselook FPS (solo vista libre): arrastrar gira la mirada desde tu posición.
    this.canvas.addEventListener('pointerdown', this.onLookDown)
    this.canvas.addEventListener('pointermove', this.onLookMove)
    this.canvas.addEventListener('pointerup', this.onLookUp)
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault()) // el derecho se usa para mirar/seleccionar
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
    window.addEventListener('blur', this.onWindowBlur)
  }

  private onLookDown = (e: PointerEvent): void => {
    if (this.view !== 'free') return
    if (e.button === 0) this.lookMode = 'fps'        // izquierdo: mirar desde ti
    else if (e.button === 2) this.lookMode = 'orbit' // derecho: orbitar el centro
    else return
    this.orbitVel.yaw = 0; this.orbitVel.pitch = 0   // agarrar corta la inercia previa
    this.lookVel.yaw = 0; this.lookVel.pitch = 0
    this.lookPX = e.clientX; this.lookPY = e.clientY
    try { this.canvas.setPointerCapture(e.pointerId) } catch { /* noop */ }
  }
  private onLookMove = (e: PointerEvent): void => {
    if (this.lookMode === 'none' || this.view !== 'free') return
    const dx = e.clientX - this.lookPX, dy = e.clientY - this.lookPY
    this.lookPX = e.clientX; this.lookPY = e.clientY
    if (!dx && !dy) return
    if (this.lookMode === 'fps') this.lookBy(dx, dy)
    else this.orbitBy(dx, dy)
  }
  private onLookUp = (e: PointerEvent): void => {
    if (this.lookMode === 'none') return
    // Si soltó tras una pausa (>80ms sin mover), no hay inercia (no "fling").
    if (performance.now() - this.lookMoveT > 80) {
      if (this.lookMode === 'orbit') { this.orbitVel.yaw = 0; this.orbitVel.pitch = 0 }
      if (this.lookMode === 'fps')   { this.lookVel.yaw  = 0; this.lookVel.pitch  = 0 }
    }
    this.lookMode = 'none'
    try { this.canvas.releasePointerCapture(e.pointerId) } catch { /* noop */ }
    this.scheduleRender() // arranca el coast si quedó velocidad
  }

  // Gira la dirección de mirada alrededor de la posición de la cámara (no orbita):
  // mueve el target rotándolo en torno a la cámara, que queda fija. OrbitControls
  // .update() recalcula el offset y reposiciona la cámara en su sitio mirando al
  // nuevo target -> equivale a un mouselook de primera persona.
  private lookBy(dx: number, dy: number): void {
    const sens = 0.0024   // sensibilidad del "mirar" con click izq (más bajo = más lento)
    const yaw = -dx * sens, pitch = -dy * sens
    this.applyLook(yaw, pitch)
    this.lookVel.yaw = yaw; this.lookVel.pitch = pitch   // guarda velocidad para la inercia
    this.lookMoveT = performance.now()
    this.scheduleRender()
  }
  // Aplica un incremento de yaw/pitch a la dirección de mirada (target girado en
  // torno a la cámara, que queda fija) = mouselook de primera persona.
  private applyLook(yaw: number, pitch: number): void {
    const cam = this.perspCam
    const fwd = new THREE.Vector3().subVectors(this.controls.target, cam.position)
    const dist = fwd.length() || 1
    fwd.normalize()
    fwd.applyAxisAngle(Y_AXIS, yaw)
    const right = new THREE.Vector3().crossVectors(fwd, Y_AXIS).normalize()
    const pitched = fwd.clone().applyAxisAngle(right, pitch)
    if (Math.abs(pitched.y) < 0.995) fwd.copy(pitched)   // tope para no voltear
    fwd.normalize()
    this.controls.target.copy(cam.position).addScaledVector(fwd, dist)
  }
  // Inercia del fps look (izq): tras soltar, sigue girando con la última velocidad y
  // frena suave (igual que el orbit). Devuelve true mientras sigue en marcha.
  private coastLook(): boolean {
    if (this.lookMode === 'fps') return false
    const v = this.lookVel
    if (Math.abs(v.yaw) < 1e-4 && Math.abs(v.pitch) < 1e-4) { v.yaw = 0; v.pitch = 0; return false }
    this.applyLook(v.yaw, v.pitch)
    v.yaw *= 0.9; v.pitch *= 0.9
    return true
  }

  // Orbita la cámara alrededor del centro de la schematic (origen): rota su posición
  // en torno al centro y mira hacia él. Guarda la velocidad angular para la inercia.
  private orbitBy(dx: number, dy: number): void {
    const sens = 0.005
    const yaw = -dx * sens, pitch = -dy * sens
    this.applyOrbit(yaw, pitch)
    this.orbitVel.yaw = yaw; this.orbitVel.pitch = pitch
    this.lookMoveT = performance.now()
    this.scheduleRender()
  }
  private applyOrbit(yaw: number, pitch: number): void {
    const cam = this.perspCam
    const offset = cam.position.clone() // pivote = origen (centro del modelo)
    offset.applyAxisAngle(Y_AXIS, yaw)
    const horizAxis = new THREE.Vector3().crossVectors(Y_AXIS, offset).normalize()
    const pitched = offset.clone().applyAxisAngle(horizAxis, pitch)
    cam.position.copy(Math.abs(pitched.clone().normalize().y) < 0.995 ? pitched : offset)
    this.controls.target.set(0, 0, 0)
  }
  // Inercia del orbit: tras soltar, sigue girando con la última velocidad y frena
  // suave (decay tipo damping). Devuelve true mientras sigue en marcha.
  private coastOrbit(): boolean {
    if (this.lookMode === 'orbit') return false
    const v = this.orbitVel
    if (Math.abs(v.yaw) < 1e-4 && Math.abs(v.pitch) < 1e-4) { v.yaw = 0; v.pitch = 0; return false }
    this.applyOrbit(v.yaw, v.pitch)
    v.yaw *= 0.92; v.pitch *= 0.92
    return true
  }

  private flyKey(e: KeyboardEvent): string | null {
    if (e.key === ' ') return 'up'
    if (e.key === 'Shift') return 'down'
    switch (e.key.toLowerCase()) {
      case 'w': return 'w'
      case 'a': return 'a'
      case 's': return 's'
      case 'd': return 'd'
      default:  return null
    }
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    const ae = document.activeElement
    if (ae && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)) return
    // Con el ratón sobre el visor, espacio/flechas no deben hacer scroll de la página
    // (aunque el vuelo WASD esté desactivado).
    if (this.hovering && (e.key === ' ' || e.key.startsWith('Arrow'))) e.preventDefault()
    if (!this.flyEnabled || this.view !== 'free') return
    const k = this.flyKey(e)
    if (!k) return
    if (k === 'w' || k === 'a' || k === 's' || k === 'd' || k === 'up') e.preventDefault()
    if (this.keys.size === 0) this.lastFlyT = performance.now()                            // primer tecla → resetea dt
    this.keys.add(k)
    this.scheduleRender()
  }

  private onKeyUp = (e: KeyboardEvent): void => {
    const k = this.flyKey(e)
    if (k) this.keys.delete(k)
  }

  private onWindowBlur = (): void => { this.keys.clear() }

  // Integra el movimiento por teclado: avanza cámara + target juntos según la
  // orientación actual (W/S adelante-atrás, A/D laterales, Espacio/Shift sube-baja).
  // Solo en vista libre; velocidad escalada al tamaño del modelo.
  // Devuelve true mientras la cámara siga moviéndose (teclas pulsadas o deslizándose),
  // para que el bucle de render continúe hasta que la velocidad decaiga a cero.
  private updateFly(): boolean {
    if (this.view !== 'free') { if (this.keys.size) this.keys.clear(); this._flyVel.set(0, 0, 0); return false }

    const now = performance.now()
    let dt = (now - this.lastFlyT) / 1000
    this.lastFlyT = now
    if (dt > 0.1) dt = 0.1   // tras una pausa, no des un salto enorme
    if (dt <= 0) return this._flyVel.lengthSq() > 0

    const cam = this.perspCam
    const forward = this.tmpV.subVectors(this.controls.target, cam.position).normalize()
    const right = new THREE.Vector3().crossVectors(forward, cam.up).normalize()

    // Velocidad objetivo según las teclas (0 si no hay ninguna → frena suave).
    this._flyDesired.set(0, 0, 0)
    if (this.keys.has('w'))    this._flyDesired.add(forward)
    if (this.keys.has('s'))    this._flyDesired.addScaledVector(forward, -1)
    if (this.keys.has('d'))    this._flyDesired.add(right)
    if (this.keys.has('a'))    this._flyDesired.addScaledVector(right, -1)
    if (this.keys.has('up'))   this._flyDesired.add(Y_AXIS)
    if (this.keys.has('down')) this._flyDesired.addScaledVector(Y_AXIS, -1)
    if (this._flyDesired.lengthSq() > 0) {
      this._flyDesired.normalize().multiplyScalar(this.boundingRadius * 0.9 * this.flySpeedMul)
    }

    // Suavizado exponencial (independiente del framerate) hacia la velocidad objetivo.
    const smooth = 1 - Math.exp(-dt / FLY_TAU)
    this._flyVel.lerp(this._flyDesired, smooth)

    // Umbral de parada relativo al tamaño del modelo (mismo tacto en todos los tamaños).
    const stopSq = (this.boundingRadius * 1e-3) ** 2
    if (this._flyVel.lengthSq() < stopSq && this._flyDesired.lengthSq() === 0) {
      this._flyVel.set(0, 0, 0)
      return false
    }

    this._flyMove.copy(this._flyVel).multiplyScalar(dt)
    cam.position.add(this._flyMove)
    this.controls.target.add(this._flyMove)   // mover ambos mantiene el offset → se sigue pudiendo orbitar
    return true
  }

  /** Solicita un frame si no hay uno pendiente ya. */
  private scheduleRender(): void {
    if (this._needsRender) return
    this._needsRender = true
    this.rafId = requestAnimationFrame(this.animate)
  }

  private frameFree(): void {
    const r = this.boundingRadius
    const fov = THREE.MathUtils.degToRad(this.perspCam.fov)
    const dist = (r / Math.sin(fov / 2)) * 1.1
    this.controls.target.set(0, 0, 0)
    this.perspCam.position.copy(new THREE.Vector3(1, 0.7, 1).normalize().multiplyScalar(dist))
    this.perspCam.near = 0.05
    this.perspCam.far = r * 12
    this.perspCam.updateProjectionMatrix()
    this.controls.update()
  }

  private frameOrtho(): void {
    const r = this.boundingRadius
    this.orthoDist = r * 4
    this.viewHalfHeight = r * 1.05
    this.orthoCam.near = 0.05
    this.orthoCam.far = this.orthoDist + r * 6
    this.orthoCam.zoom = 1
    this.controls.target.set(0, 0, 0)
    this.updateOrtho()
    this.positionOrtho(this.orthoDir, this.orthoUp)
    this.controls.update()
  }

  private positionOrtho(dir: THREE.Vector3, up: THREE.Vector3): void {
    this.orthoCam.position.copy(this.controls.target).addScaledVector(dir, this.orthoDist)
    this.orthoCam.up.copy(up)
    this.orthoCam.lookAt(this.controls.target)
  }

  private updateOrtho(): void {
    const a = this.aspect()
    const hh = this.viewHalfHeight
    this.orthoCam.top = hh; this.orthoCam.bottom = -hh
    this.orthoCam.left = -hh * a; this.orthoCam.right = hh * a
    this.orthoCam.updateProjectionMatrix()
  }

  private aspect(): number {
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight
    return w > 0 && h > 0 ? w / h : 1
  }

  // ── Worker message handler ─────────────────────────────────────────────────
  private onWorkerMessage = (e: MessageEvent): void => {
    const { id, opaque, transparent, entity, emissive, lights, truncated } = e.data
    this.workerBusy = false
    if (id === this.workerSeq) {
      this.truncated = !!truncated
      this.lightSamples = lights ?? []
      this.setGeometries({
        opaque: opaque ? this.rawToGeo(opaque) : null,
        transparent: transparent ? this.rawToGeo(transparent) : null,
        entity: entity ? this.rawToGeo(entity) : null,
        emissive: emissive ? this.rawToGeo(emissive) : null,
        lights: this.lightSamples,
      })
      if (this.showcase) this.refreshEmitterLights()
      this.scheduleRender()
      this.onRebuild?.(this.truncated)
    }
    if (this.pendingRebuild) {
      this.pendingRebuild = false
      this.rebuild()
    }
  }

  private rawToGeo(b: RawBuffers): THREE.BufferGeometry {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(b.pos, 3))
    g.setAttribute('uv', new THREE.Float32BufferAttribute(b.uv, 2))
    g.setAttribute('color', new THREE.Uint8BufferAttribute(b.col, 3, true))
    const vc = b.pos.length / 3
    g.setIndex(vc > 65535 ? new THREE.Uint32BufferAttribute(b.idx, 1) : new THREE.Uint16BufferAttribute(b.idx, 1))
    return g
  }

  // ── Mallas ───────────────────────────────────────────────────────────────────
  private rebuild(): void {
    if (!this.model) return

    this.buildEndPortal()   // malla animada del end portal/gateway (respeta el corte)
    this.buildItemFrames()  // marcos + ítems (respeta el corte)
    this.buildMinecarts()   // minecarts (vaina + bloque interior)

    if (this.worker) {
      if (this.workerBusy) {
        this.pendingRebuild = true
        return
      }
      this.workerBusy = true
      const id = ++this.workerSeq
      const atlasRaw = this.atlas?.getRawData() ?? null
      const dbRaw = this.db?.getRawData() ?? null
      const blocksCopy = this.model.blocks.slice()
      this.worker.postMessage({
        id,
        modelRaw: {
          width: this.model.width,
          height: this.model.height,
          length: this.model.length,
          blocks: blocksCopy,
          palette: this.model.palette,
        },
        atlasRaw,
        entityManifest: this.entityManifest,
        dbRaw,
        slice: this.slice,
      }, [blocksCopy.buffer])
      return
    }

    // Fallback síncrono (sin workers)
    const geos = buildMesh(this.model, this.atlas, this.db, this.slice, this.entityAtlas)
    this.lightSamples = geos.lights
    this.setGeometries(geos)
    if (this.showcase) this.refreshEmitterLights()
  }

  // ── End portal / gateway animado (campo de estrellas con parallax) ────────────
  private disposeEndPortal(): void {
    if (this.endPortalMesh) {
      this.scene.remove(this.endPortalMesh)
      this.endPortalMesh.geometry.dispose()
      ;(this.endPortalMesh.material as THREE.Material).dispose()
      this.endPortalMesh = null
    }
    this.endPortalTex?.dispose(); this.endPortalTex = null; this.endPortalCtx = null
  }

  private buildEndPortal(): void {
    this.disposeEndPortal()
    const m = this.model
    if (!m) return
    const { width: W, height: H, length: L, blocks, palette } = m
    const sx = this.slice.x, sy = this.slice.y, sz = this.slice.z
    const pos: number[] = [], uv: number[] = []
    const addQuad = (a: number[], b: number[], c: number[], d: number[]) => {
      pos.push(...a, ...b, ...c, ...a, ...c, ...d)
      uv.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1)
    }
    let any = false
    for (let y = sy[0]; y <= sy[1]; y++) for (let z = sz[0]; z <= sz[1]; z++) for (let x = sx[0]; x <= sx[1]; x++) {
      const st = palette[blocks[(y * L + z) * W + x]]
      if (!st) continue
      const bn = baseName(st.name)
      if (bn !== 'end_portal' && bn !== 'end_gateway') continue
      any = true
      const ox = x - W / 2, oy = y - H / 2, oz = z - L / 2
      if (bn === 'end_portal') {
        const h = oy + 0.75   // superficie plana del portal (visible por ambas caras: DoubleSide)
        addQuad([ox, h, oz], [ox + 1, h, oz], [ox + 1, h, oz + 1], [ox, h, oz + 1])
      } else {                // gateway: cubo
        const x0 = ox, x1 = ox + 1, y0 = oy, y1 = oy + 1, z0 = oz, z1 = oz + 1
        addQuad([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0])
        addQuad([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1])
        addQuad([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1])
        addQuad([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0])
        addQuad([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1])
        addQuad([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0])
      }
    }
    if (!any) return
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2))

    const N = 128
    const cv = document.createElement('canvas'); cv.width = cv.height = N
    this.endPortalCtx = cv.getContext('2d')!
    this.endPortalTex = new THREE.CanvasTexture(cv)
    this.endPortalTex.minFilter = THREE.LinearFilter; this.endPortalTex.magFilter = THREE.LinearFilter
    const SPECK = [[44, 196, 196], [60, 210, 215], [150, 90, 185], [120, 70, 170], [210, 225, 255], [90, 150, 220]]
    const mk = (count: number, szMax: number) => Array.from({ length: count }, () => {
      const c = SPECK[(Math.random() * SPECK.length) | 0]
      return { x: Math.random(), y: Math.random(), r: c[0], g: c[1], b: c[2], ph: Math.random() * Math.PI * 2, sz: 1 + Math.random() * szMax }
    })
    this.endPortalLayers = [mk(70, 1.5), mk(50, 2.5), mk(30, 3.5)]   // 3 capas → parallax
    const mat = new THREE.MeshBasicMaterial({
      map: this.endPortalTex, side: THREE.DoubleSide, clippingPlanes: this.clipPlanes,
      polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
    })
    this.endPortalMesh = new THREE.Mesh(geo, mat)
    this.endPortalMesh.renderOrder = 3
    this.scene.add(this.endPortalMesh)
    this.drawEndPortal(performance.now())
  }

  private drawEndPortal(now: number): void {
    const ctx = this.endPortalCtx
    if (!ctx) return
    const N = ctx.canvas.width
    const t = now / 1000
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = '#080b1a'; ctx.fillRect(0, 0, N, N)
    ctx.globalCompositeOperation = 'lighter'
    const speeds = [0.012, 0.025, 0.045]
    this.endPortalLayers.forEach((layer, li) => {
      const off = (t * speeds[li]) % 1
      for (const s of layer) {
        const px = ((s.x + off) % 1) * N
        const py = ((s.y + off * 0.6) % 1) * N
        const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 2 + s.ph))
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${tw.toFixed(3)})`
        ctx.fillRect(px, py, s.sz, s.sz)
      }
    })
    ctx.globalCompositeOperation = 'source-over'
    if (this.endPortalTex) this.endPortalTex.needsUpdate = true
  }

  // ── Item frames (marco + ítem) ────────────────────────────────────────────────
  private disposeItemFrames(): void {
    if (!this.framesGroup) return
    for (const c of this.framesGroup.children) {
      const m = c as THREE.Mesh
      m.geometry.dispose()
      ;(m.material as THREE.Material).dispose()
    }
    this.scene.remove(this.framesGroup)
    this.framesGroup = null
    this.framesTex?.dispose(); this.framesTex = null
  }

  private ensureItemAtlas3D(): void {
    if (this.itemAtlasData || this.itemAtlasLoading) return
    this.itemAtlasLoading = true
    Promise.all([
      fetch(asset('item-atlas.json')).then((r) => r.json()),
      new Promise<THREE.Texture>((res, rej) => new THREE.TextureLoader().load(asset('item-atlas.png'), (t) => {
        t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.flipY = false
        res(t)
      }, undefined, rej)),
    ]).then(([data, tex]) => {
      this.itemAtlasData = data; this.itemAtlasTex = tex
      this.buildItemFrames(); this.scheduleRender()   // ya tenemos atlas → re-construir con ítems
    }).catch(() => { /* sin atlas de ítems: solo marcos */ })
  }

  private buildItemFrames(): void {
    this.disposeItemFrames()
    const m = this.model
    if (!m || !m.itemFrames || m.itemFrames.length === 0) return
    this.ensureItemAtlas3D()
    const { width: W, height: H, length: L } = m
    const sx = this.slice.x, sy = this.slice.y, sz = this.slice.z

    const NORMALS = [[0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1], [-1, 0, 0], [1, 0, 0]]
    const blkPos: number[] = [], blkUv: number[] = []   // marco real + cubos de bloque (atlas de bloques)
    const iPos: number[] = [], iUv: number[] = []       // ítem plano (atlas de ítems)
    const data = this.itemAtlasData
    type V3 = [number, number, number]

    const pushQuad = (P: number[], p0: V3, p1: V3, p2: V3, p3: V3) =>
      P.push(p0[0], p0[1], p0[2], p1[0], p1[1], p1[2], p2[0], p2[1], p2[2], p0[0], p0[1], p0[2], p2[0], p2[1], p2[2], p3[0], p3[1], p3[2])
    const pushUv = (Uo: number[], r: readonly number[]) => Uo.push(r[0], r[3], r[2], r[3], r[2], r[1], r[0], r[3], r[2], r[1], r[0], r[1])

    // Rect del tile en el atlas de bloques SIN margen (para sub-UVs del modelo).
    const raw = this.atlas?.getRawData()
    const tileRect = (idx: number): [number, number, number, number] => {
      const col = idx % raw!.cols, row = Math.floor(idx / raw!.cols), c = raw!.cell
      return [(col * c) / raw!.size.w, (row * c) / raw!.size.h, ((col + 1) * c) / raw!.size.w, ((row + 1) * c) / raw!.size.h]
    }
    // Sub-UV: rect del tile + región 0..16 del modelo (v0 = arriba).
    const subUv = (tile: string, mu0: number, mv0: number, mu1: number, mv1: number): [number, number, number, number] | null => {
      const idx = this.atlas?.tileIndex(tile); if (idx === undefined) return null
      const [tu0, tv0, tu1, tv1] = tileRect(idx)
      return [tu0 + (mu0 / 16) * (tu1 - tu0), tv0 + (mv0 / 16) * (tv1 - tv0), tu0 + (mu1 / 16) * (tu1 - tu0), tv0 + (mv1 / 16) * (tv1 - tv0)]
    }
    const itemRect = (id: string): [number, number, number, number] | null => {
      if (!data || data.tiles[id] === undefined) return null
      const idx = data.tiles[id], col = idx % data.cols, row = Math.floor(idx / data.cols)
      return [(col * data.cell) / data.size.w, (row * data.cell) / data.size.h, ((col + 1) * data.cell) / data.size.w, ((row + 1) * data.cell) / data.size.h]
    }

    const n = new THREE.Vector3(), up = new THREE.Vector3(), U = new THREE.Vector3(), V = new THREE.Vector3()
    let bx = 0, by = 0, bz = 0
    // Punto del modelo (0..16) → mundo: x,y en el plano (U,V), z = profundidad a lo largo de n.
    const WALL = -0.5 + 0.02
    const w = (mx: number, my: number, mz: number): V3 => {
      const lu = (mx - 8) / 16, lv = (my - 8) / 16, ld = WALL + (mz - 15) / 16
      return [bx + U.x * lu + V.x * lv + n.x * ld, by + U.y * lu + V.y * lv + n.y * ld, bz + U.z * lu + V.z * lv + n.z * ld]
    }
    // Cara de un box del modelo (16px) con su sub-UV; se añade al atlas de bloques.
    const FQ: Record<string, (f: number[], t: number[]) => [V3, V3, V3, V3]> = {
      south: (f, t) => [w(f[0], f[1], t[2]), w(t[0], f[1], t[2]), w(t[0], t[1], t[2]), w(f[0], t[1], t[2])],
      north: (f, t) => [w(t[0], f[1], f[2]), w(f[0], f[1], f[2]), w(f[0], t[1], f[2]), w(t[0], t[1], f[2])],
      east: (f, t) => [w(t[0], f[1], t[2]), w(t[0], f[1], f[2]), w(t[0], t[1], f[2]), w(t[0], t[1], t[2])],
      west: (f, t) => [w(f[0], f[1], f[2]), w(f[0], f[1], t[2]), w(f[0], t[1], t[2]), w(f[0], t[1], f[2])],
      up: (f, t) => [w(f[0], t[1], t[2]), w(t[0], t[1], t[2]), w(t[0], t[1], f[2]), w(f[0], t[1], f[2])],
      down: (f, t) => [w(f[0], f[1], f[2]), w(t[0], f[1], f[2]), w(t[0], f[1], t[2]), w(f[0], f[1], t[2])],
    }
    const addFace = (f: number[], t: number[], dir: string, tile: string, uv: number[]) => {
      const r = subUv(tile, uv[0], uv[1], uv[2], uv[3]); if (!r) return
      const q = FQ[dir](f, t); pushQuad(blkPos, q[0], q[1], q[2], q[3]); pushUv(blkUv, r)
    }

    // Geometría real del modelo item_frame (template_item_frame): panel de fondo + 4 listones.
    type ElFace = [string, string, number[]]   // dir, #tex(wood|back), uv 0..16
    const ELEMENTS: { f: number[]; t: number[]; faces: ElFace[] }[] = [
      { f: [3, 3, 15.5], t: [13, 13, 16], faces: [['south', 'back', [3, 3, 13, 13]], ['north', 'back', [3, 3, 13, 13]]] },
      { f: [2, 2, 15], t: [14, 3, 16], faces: [['down', 'wood', [2, 0, 14, 1]], ['up', 'wood', [2, 15, 14, 16]], ['south', 'wood', [2, 13, 14, 14]], ['west', 'wood', [15, 13, 16, 14]], ['east', 'wood', [0, 13, 1, 14]]] },
      { f: [2, 13, 15], t: [14, 14, 16], faces: [['down', 'wood', [2, 0, 14, 1]], ['up', 'wood', [2, 15, 14, 16]], ['south', 'wood', [2, 2, 14, 3]], ['west', 'wood', [15, 2, 16, 3]], ['east', 'wood', [0, 2, 1, 3]]] },
      { f: [2, 3, 15], t: [3, 13, 16], faces: [['south', 'wood', [2, 3, 3, 13]], ['west', 'wood', [15, 3, 16, 13]], ['east', 'wood', [0, 3, 1, 13]]] },
      { f: [13, 3, 15], t: [14, 13, 16], faces: [['south', 'wood', [13, 3, 14, 13]], ['west', 'wood', [15, 3, 16, 13]], ['east', 'wood', [0, 3, 1, 13]]] },
    ]

    // Cubo de bloque (las texturas de getFaceInfo, en orden +X,-X,+Y,-Y,+Z,-Z).
    const addCube = (cx: number, cy: number, cz: number, hs: number, tiles: string[]) => {
      const p = (sx: number, sy: number, sz: number): V3 => [cx + sx * hs, cy + sy * hs, cz + sz * hs]
      const faces: { t: string; q: [V3, V3, V3, V3] }[] = [
        { t: tiles[0], q: [p(1, -1, 1), p(1, -1, -1), p(1, 1, -1), p(1, 1, 1)] },
        { t: tiles[1], q: [p(-1, -1, -1), p(-1, -1, 1), p(-1, 1, 1), p(-1, 1, -1)] },
        { t: tiles[2], q: [p(-1, 1, 1), p(1, 1, 1), p(1, 1, -1), p(-1, 1, -1)] },
        { t: tiles[3], q: [p(-1, -1, -1), p(1, -1, -1), p(1, -1, 1), p(-1, -1, 1)] },
        { t: tiles[4], q: [p(-1, -1, 1), p(1, -1, 1), p(1, 1, 1), p(-1, 1, 1)] },
        { t: tiles[5], q: [p(1, -1, -1), p(-1, -1, -1), p(-1, 1, -1), p(1, 1, -1)] },
      ]
      for (const fa of faces) {
        const idx = this.atlas?.tileIndex(fa.t); if (idx === undefined) continue
        pushQuad(blkPos, fa.q[0], fa.q[1], fa.q[2], fa.q[3]); pushUv(blkUv, tileRect(idx))
      }
    }

    for (const fr of m.itemFrames) {
      if (fr.x < sx[0] || fr.x > sx[1] || fr.y < sy[0] || fr.y > sy[1] || fr.z < sz[0] || fr.z > sz[1]) continue
      const nor = NORMALS[fr.facing] ?? NORMALS[3]
      n.set(nor[0], nor[1], nor[2])
      up.set(0, 1, 0); if (Math.abs(n.y) > 0.9) up.set(0, 0, 1)
      U.crossVectors(up, n).normalize(); V.crossVectors(n, U).normalize()
      bx = fr.x + 0.5 - W / 2; by = fr.y + 0.5 - H / 2; bz = fr.z + 0.5 - L / 2

      // marco con su geometría y texturas reales (madera = birch_planks, fondo = item_frame)
      const backTile = fr.glow ? 'glow_item_frame' : 'item_frame'
      for (const el of ELEMENTS) for (const [dir, tex, uv] of el.faces) addFace(el.f, el.t, dir, tex === 'back' ? backTile : 'birch_planks', uv)

      // ítem dentro, justo delante del panel de fondo (z≈16/16 → frente del marco)
      if (fr.item) {
        const front = WALL + 1 / 16   // profundidad del frente del marco a lo largo de n
        const ir = itemRect(fr.item)
        if (ir) {
          const off = front + 0.02, hs = 0.20, th = (fr.rotation % 8) * (Math.PI / 4)
          const cs = Math.cos(th), sn = Math.sin(th)
          const Ux = U.x * cs + V.x * sn, Uy = U.y * cs + V.y * sn, Uz = U.z * cs + V.z * sn
          const Vx = -U.x * sn + V.x * cs, Vy = -U.y * sn + V.y * cs, Vz = -U.z * sn + V.z * cs
          const ic = (su: number, sv: number): V3 => [bx + n.x * off + Ux * su * hs + Vx * sv * hs, by + n.y * off + Uy * su * hs + Vy * sv * hs, bz + n.z * off + Uz * su * hs + Vz * sv * hs]
          pushQuad(iPos, ic(-1, -1), ic(1, -1), ic(1, 1), ic(-1, 1)); pushUv(iUv, ir)
        } else {
          const fi = getFaceInfo(fr.item)
          if (this.atlas && (this.atlas.tileIndex(fi.tiles[4]) !== undefined || this.atlas.tileIndex(fi.tiles[0]) !== undefined)) {
            // Bloque 3D dentro del marco: pequeño, casi todo hacia delante pero
            // metido un pelín (~5% de su altura) sin llegar a cruzar el borde de
            // la celda (-0.5), así no asoma por detrás del bloque de montaje.
            const hs = 0.14, off = WALL + hs - 0.014
            addCube(bx + n.x * off, by + n.y * off, bz + n.z * off, hs, fi.tiles)
          }
        }
      }
    }

    const group = new THREE.Group()
    const cp = this.clipPlanes
    const mk = (P: number[], Uv: number[], mat: THREE.Material) => {
      if (!P.length) return
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3))
      g.setAttribute('uv', new THREE.Float32BufferAttribute(Uv, 2))
      group.add(new THREE.Mesh(g, mat))
    }
    if (this.atlas) mk(blkPos, blkUv, new THREE.MeshBasicMaterial({ map: this.atlas.texture, side: THREE.DoubleSide, alphaTest: 0.5, clippingPlanes: cp }))
    if (this.itemAtlasTex) mk(iPos, iUv, new THREE.MeshBasicMaterial({ map: this.itemAtlasTex, side: THREE.DoubleSide, alphaTest: 0.5, clippingPlanes: cp, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }))
    this.framesGroup = group
    this.scene.add(group)
  }

  // ── Minecarts (vaina de entidad + bloque interior) ────────────────────────────
  private disposeMinecarts(): void {
    if (!this.minecartsGroup) return
    for (const c of this.minecartsGroup.children) {
      const m = c as THREE.Mesh
      m.geometry.dispose()
    }
    this.scene.remove(this.minecartsGroup)
    this.minecartsGroup = null
  }

  private buildMinecarts(): void {
    this.disposeMinecarts()
    const m = this.model
    const hayCarts  = !!m?.minecarts?.length
    const hayStands = !!m?.armorStands?.length
    const hayBoats  = !!m?.boats?.length
    if (!m || (!hayCarts && !hayStands && !hayBoats)) return
    // Necesita el atlas de entidades; si aún no cargó, se reconstruye al
    // terminar loadEntityAtlas (que llama a rebuild()).
    if (!this.entityAtlas) return
    const { width: W, height: H, length: L } = m
    const sx = this.slice.x, sy = this.slice.y, sz = this.slice.z
    const cx = W / 2, cy = H / 2, cz = L / 2

    // Geometría de la vaina (atlas de entidad) y del bloque interior (atlas de bloques).
    const ePos: number[] = [], eUv: number[] = [], eCol: number[] = []
    const bPos: number[] = [], bUv: number[] = []
    const raw = this.atlas?.getRawData()
    const tileRect = (idx: number): [number, number, number, number] => {
      const col = idx % raw!.cols, row = Math.floor(idx / raw!.cols), c = raw!.cell
      return [(col * c) / raw!.size.w, (row * c) / raw!.size.h, ((col + 1) * c) / raw!.size.w, ((row + 1) * c) / raw!.size.h]
    }

    // Helper: expande un quad (4 esquinas) a 2 triángulos en la geometría de entidad.
    const emitEntityQuad = (q: { pos: number[]; uv: number[]; r: number; g: number; b: number }, ox: number, oy: number, oz: number) => {
      const P = (k: number) => ePos.push(q.pos[k * 3] + ox, q.pos[k * 3 + 1] + oy, q.pos[k * 3 + 2] + oz)
      const U = (k: number) => eUv.push(q.uv[k * 2], q.uv[k * 2 + 1])
      const C = () => eCol.push(q.r, q.g, q.b)
      for (const k of [0, 1, 2, 0, 2, 3]) { P(k); U(k); C() }
    }

    for (const mc of (m.minecarts ?? [])) {
      const cellX = Math.floor(mc.x), cellY = Math.floor(mc.y), cellZ = Math.floor(mc.z)
      if (cellX < sx[0] || cellX > sx[1] || cellY < sy[0] || cellY > sy[1] || cellZ < sz[0] || cellZ > sz[1]) continue
      // Posición exacta: la geometría de la vaina está centrada en (0.5,·,0.5) de la
      // celda; se desplaza para que su centro X/Z caiga en el Pos real y su suelo
      // (px 3) en el Pos.y (fondo de la entidad).
      const ox = (mc.x - cx) - 0.5, oy = (mc.y - cy) - 3 / 16, oz = (mc.z - cz) - 0.5

      // Vaina: quads en espacio de celda [0,1] → mundo desplazando a la celda.
      for (const q of buildMinecart(mc.yaw, this.entityAtlas)) emitEntityQuad(q, ox, oy, oz)

      // Bloque interior (tolva/cofre/horno/TNT…) como cubo texturado dentro de la vaina.
      if (mc.content && raw) {
        const fi = getFaceInfo(mc.content)
        // Cubo de 10px (px 3..13 en X/Z, 5..13 en Y) centrado en la vaina.
        const x0 = 3 / 16 + ox, x1 = 13 / 16 + ox
        const y0 = 5 / 16 + oy, y1 = 13 / 16 + oy
        const z0 = 3 / 16 + oz, z1 = 13 / 16 + oz
        // dirs en orden de getFaceInfo.tiles: [+X,-X,+Y,-Y,+Z,-Z]
        const faces: { tile: string; q: number[] }[] = [
          { tile: fi.tiles[0], q: [x1, y0, z1, x1, y0, z0, x1, y1, z0, x1, y1, z1] }, // east +X
          { tile: fi.tiles[1], q: [x0, y0, z0, x0, y0, z1, x0, y1, z1, x0, y1, z0] }, // west -X
          { tile: fi.tiles[2], q: [x0, y1, z1, x1, y1, z1, x1, y1, z0, x0, y1, z0] }, // up +Y
          { tile: fi.tiles[3], q: [x0, y0, z0, x1, y0, z0, x1, y0, z1, x0, y0, z1] }, // down -Y
          { tile: fi.tiles[4], q: [x0, y0, z1, x1, y0, z1, x1, y1, z1, x0, y1, z1] }, // south +Z
          { tile: fi.tiles[5], q: [x1, y0, z0, x0, y0, z0, x0, y1, z0, x1, y1, z0] }, // north -Z
        ]
        for (const fa of faces) {
          const idx = this.atlas?.tileIndex(fa.tile); if (idx === undefined) continue
          const [u0, v0, u1, v1] = tileRect(idx)
          const p = fa.q
          bPos.push(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8], p[0], p[1], p[2], p[6], p[7], p[8], p[9], p[10], p[11])
          bUv.push(u0, v1, u1, v1, u1, v0, u0, v1, u1, v0, u0, v0)
        }
      }
    }

    // Armor stands (solo cuerpo, textura wood). Centrado X/Z en (0.5,0.5) y base
    // en y=0 → se coloca con el centro en el Pos real y los pies en Pos.y.
    for (const as of (m.armorStands ?? [])) {
      const cellX = Math.floor(as.x), cellY = Math.floor(as.y), cellZ = Math.floor(as.z)
      if (cellX < sx[0] || cellX > sx[1] || cellY < sy[0] || cellY > sy[1] || cellZ < sz[0] || cellZ > sz[1]) continue
      const ox = (as.x - cx) - 0.5, oy = as.y - cy, oz = (as.z - cz) - 0.5
      for (const q of buildArmorStand(as.yaw, this.entityAtlas)) emitEntityQuad(q, ox, oy, oz)
    }

    // Barcos (casco con textura de barco/barco-cofre). Centrado en (0,·,0) → se
    // coloca en el Pos; BOAT_Y ajusta la línea de flotación sobre Pos.y.
    const BOAT_Y = 0.375
    for (const bt of (m.boats ?? [])) {
      const cellX = Math.floor(bt.x), cellY = Math.floor(bt.y), cellZ = Math.floor(bt.z)
      if (cellX < sx[0] || cellX > sx[1] || cellY < sy[0] || cellY > sy[1] || cellZ < sz[0] || cellZ > sz[1]) continue
      const ox = bt.x - cx, oy = bt.y - cy + BOAT_Y, oz = bt.z - cz
      for (const q of buildBoat(bt.variant, bt.chest, bt.yaw, this.entityAtlas)) emitEntityQuad(q, ox, oy, oz)

      // Barco con cofre: un cofre (atlas de bloques) asentado en el casco.
      if (bt.chest && raw) {
        const fi = getFaceInfo('chest')
        const x0 = ox - 0.30, x1 = ox + 0.30, y0 = oy - 0.20, y1 = oy + 0.36, z0 = oz - 0.30, z1 = oz + 0.30
        const faces: { tile: string; q: number[] }[] = [
          { tile: fi.tiles[0], q: [x1, y0, z1, x1, y0, z0, x1, y1, z0, x1, y1, z1] }, // +X
          { tile: fi.tiles[1], q: [x0, y0, z0, x0, y0, z1, x0, y1, z1, x0, y1, z0] }, // -X
          { tile: fi.tiles[2], q: [x0, y1, z1, x1, y1, z1, x1, y1, z0, x0, y1, z0] }, // +Y
          { tile: fi.tiles[3], q: [x0, y0, z0, x1, y0, z0, x1, y0, z1, x0, y0, z1] }, // -Y
          { tile: fi.tiles[4], q: [x0, y0, z1, x1, y0, z1, x1, y1, z1, x0, y1, z1] }, // +Z
          { tile: fi.tiles[5], q: [x1, y0, z0, x0, y0, z0, x0, y1, z0, x1, y1, z0] }, // -Z
        ]
        for (const fa of faces) {
          const ti = this.atlas?.tileIndex(fa.tile); if (ti === undefined) continue
          const [u0, v0, u1, v1] = tileRect(ti)
          const p = fa.q
          bPos.push(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8], p[0], p[1], p[2], p[6], p[7], p[8], p[9], p[10], p[11])
          bUv.push(u0, v1, u1, v1, u1, v0, u0, v1, u1, v0, u0, v0)
        }
      }
    }

    const group = new THREE.Group()
    const cp = this.clipPlanes
    if (ePos.length && this.entityMat.map) {
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.Float32BufferAttribute(ePos, 3))
      g.setAttribute('uv', new THREE.Float32BufferAttribute(eUv, 2))
      g.setAttribute('color', new THREE.Float32BufferAttribute(eCol, 3))
      group.add(new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: this.entityMat.map, vertexColors: true, side: THREE.DoubleSide, alphaTest: 0.5, clippingPlanes: cp })))
    }
    if (bPos.length && this.atlas) {
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.Float32BufferAttribute(bPos, 3))
      g.setAttribute('uv', new THREE.Float32BufferAttribute(bUv, 2))
      group.add(new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: this.atlas.texture, side: THREE.DoubleSide, alphaTest: 0.5, clippingPlanes: cp })))
    }
    this.minecartsGroup = group
    this.scene.add(group)
  }

  private setGeometries(geos: MeshGeometries): void {
    this.opaqueMesh = this.applyGeometry(this.opaqueMesh, geos.opaque, this.matFor('opaque'), 0)
    this.entityMesh = this.applyGeometry(this.entityMesh, geos.entity, this.matFor('entity'), 0)
    // Emisiva: en showcase usa material realzado (brilla); en normal, el opaco
    // (se ve igual que cualquier bloque, sin emitir luz).
    this.emissiveMesh = this.applyGeometry(this.emissiveMesh, geos.emissive, this.showcase ? this.emissiveMat : this.opaqueMat, 0)
    this.transMesh = this.applyGeometry(this.transMesh, geos.transparent, this.matFor('trans'), 1)
    if (this.showcase) {
      this.ensureNormals(this.opaqueMesh)
      this.ensureNormals(this.entityMesh)
      this.ensureNormals(this.transMesh)
      this.applyShadowFlags(true)
      this.requestShadowUpdate()
    }
  }

  // Material activo para cada capa: Lambert (iluminado) en showcase, Basic normal si no.
  // La capa emisiva no entra aquí: usa siempre emissiveMat (no se ilumina ni sombrea).
  private matFor(slot: 'opaque' | 'trans' | 'entity'): THREE.Material {
    if (this.showcase) {
      if (slot === 'opaque') return this.opaqueLit!
      if (slot === 'trans')  return this.transLit!
      return this.entityLit!
    }
    if (slot === 'opaque') return this.opaqueMat
    if (slot === 'trans')  return this.transMat
    return this.entityMat
  }

  // La geometría del worker no trae normales (innecesarias para MeshBasic). El modo
  // showcase usa Lambert, que sí las necesita: cada cara es un quad plano con vértices
  // propios, así que computeVertexNormals da normales planas correctas por cara.
  private ensureNormals(mesh: THREE.Mesh | null): void {
    if (mesh && !mesh.geometry.getAttribute('normal')) mesh.geometry.computeVertexNormals()
  }

  private applyGeometry(mesh: THREE.Mesh | null, geo: THREE.BufferGeometry | null, mat: THREE.Material, order: number): THREE.Mesh | null {
    if (!geo) { if (mesh) mesh.visible = false; return mesh }
    if (!mesh) {
      mesh = new THREE.Mesh(geo, mat)
      mesh.renderOrder = order
      mesh.frustumCulled = false // un solo mega-mesh: no culling de frustum (no desaparece de cerca)
      this.scene.add(mesh)
    } else {
      mesh.geometry.dispose()
      mesh.geometry = geo
      mesh.visible = true
    }
    return mesh
  }

  private disposeMesh(mesh: THREE.Mesh | null): void {
    if (!mesh) return
    mesh.geometry.dispose()
    this.scene.remove(mesh)
  }

  // ── Bucle de render (continuo, para damping suave) ──────────────────────────────
  // near/far dinámicos: ajusta el plano de recorte a la distancia real a la escena.
  // Lejos -> near grande (z-buffer preciso, sin z-fighting); cerca -> near pequeño
  // (modo spectator, puedes meterte dentro). Mantiene el rango ajustado siempre.
  private updateNearFar(): void {
    const cam = this.activeCam as THREE.PerspectiveCamera | THREE.OrthographicCamera
    const r = this.boundingRadius
    // Profundidad del centro del modelo (origen) a lo largo del eje de vista, para
    // que el recorte siga al modelo aunque se haya hecho pan lejos del target
    // (antes usaba la distancia al target → el near se adelantaba y cortaba).
    const dir = this.tmpV.subVectors(this.controls.target, cam.position).normalize()
    const depth = -cam.position.dot(dir)
    cam.near = Math.max(0.005, depth - r * 1.4)
    cam.far = Math.max(cam.near + 0.1, depth + r * 1.4)
    cam.updateProjectionMatrix()
  }

  private animate = (): void => {
    this._needsRender = false

    if (this.tween) {
      const t = Math.min(1, (performance.now() - this.tween.start) / this.tween.dur)
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      const ang = e * (Math.PI / 2)
      const dir = this.tween.dir.clone().applyAxisAngle(Y_AXIS, ang)
      const up = this.tween.up.clone().applyAxisAngle(Y_AXIS, ang)
      this.positionOrtho(dir, up)
      if (t >= 1) { this.orthoDir.copy(dir); this.orthoUp.copy(up); this.tween = null }
      else this.scheduleRender() // tween en curso → seguir
    }

    if (this.updateFly()) this.scheduleRender()    // vuela y desliza hasta frenar del todo
    if (this.coastOrbit()) this.scheduleRender()   // inercia del orbit (der) al soltar
    if (this.coastLook())  this.scheduleRender()   // inercia del fps look (izq) al soltar

    // update() devuelve true mientras hay damping en curso
    if (this.controls.update()) this.scheduleRender()

    this.updateNearFar()
    if (this.endPortalMesh) this.drawEndPortal(performance.now())   // anima el portal antes de pintar
    if (this.showcase && this.composer) this.composer.render()
    else this.renderer.render(this.scene, this.activeCam)
    if (this.endPortalMesh) this.scheduleRender()                   // bucle continuo mientras haya portal
    if (this.showcase && this.controls.autoRotate) this.scheduleRender() // bucle continuo solo mientras rota
  }
}
