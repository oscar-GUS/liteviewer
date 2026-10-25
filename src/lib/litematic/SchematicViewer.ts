// Motor del visor 3D (agnóstico de framework). three.js sobre un <canvas>.
// - Cámaras: libre (perspectiva, órbita) + ortográfica (iso y vistas planas).
// - Spectator: near-plane pequeño (no desaparece al acercarse); frustum culling por
//   trozo, con la caja de cada uno puesta a mano.
// - Zoom/órbita suaves (damping), render bajo demanda.
// - Malla por trozos (chunkMesher.ts): el corte en Y se enseña con drawRange y una
//   tapa de una capa, sin rehacer nada; X y Z rehacen solo los trozos que cruzan
//   el plano. Lo que llega del worker se sube a la GPU poco a poco, unos MB por
//   frame, en vez de toda la build en un frame.
// - Para construir: capa fantasma (capa a capa), resaltar dónde va un material
//   (entrada de paleta por vértice y una máscara, sin remallar), medida entre dos
//   bloques y el norte para la brújula (onHeading).

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { SchematicModel, BlockState, isAir } from './types'
import { baseName } from './blockColors'
import { getFaceInfo, GRASS } from './blockTextures'
import { RawBuffers, SliceRange, LeavesMode, MeshOptions, LK_NOSHADE, movesInShowcase } from './buildMesh'
import { ChunkMesher, ChunkOut, MesherIn, MesherOut, CHUNK_XZ, CHUNK_Y, capLayers } from './chunkMesher'
import { Atlas, AtlasData, strideOf } from './atlas'
import { ModelDB, ModelsData } from './models'
import { EntityAtlas, EntityManifest, makeEntityAtlas, buildMinecart, buildArmorStand, buildBoat, buildMob, MobModels } from './blockEntities'
import { asset, skinUrl } from './assets'
import { loadEntityManifest } from './resources'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { Showcase, ScQuality, lightQualityHint, HORA_MIN, HORA_MAX } from './showcase'
import { VanillaSky, HORA_NORMAL, luzDeDia } from './vanillaSky'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'

export type ViewName = 'free' | 'iso' | 'top' | 'bottom' | 'north' | 'south' | 'east' | 'west'
export type Axis = 'x' | 'y' | 'z'

const ISO_EL = Math.atan(1 / Math.SQRT2)
const BG_COLOR = 0x1c1c1f
// Modo exhibición: por encima de estos vértices no se mece nada (el vaivén cuesta
// en cada vértice de cada frame) y, mientras llega la malla, la sombra del sol se
// rehace como mucho cada SC_SHADOW_MS (en L son ~4 M de triángulos cada vez).
const SC_WAVES_MAX_VERTS = 24_000_000
const SC_SHADOW_MS = 250
// Hora del día: lo que se ve va hacia la pedida con un suavizado exponencial (tau,
// en ms: a los ~200 ms está al 95 %), así que arrastrar rápido no da saltos de luz.
// Mientras cambia, la sombra del sol se rehace en cada frame (L: 2,7 ms en una RTX
// 4060) o, con mucha malla, cada 2 o 3 (XL: 8,4 ms por mapa).
const TIME_TAU = 70
// Transición entre la vista normal y la exhibición (ver fadeSnapshot): lo que dura el
// fundido; al entrar, lo que tarda el bloom en encenderse. Y cada cuánto se mira si
// la malla con luz ya ha llegado entera al entrar.
const SC_FADE_MS = 1000
const SC_BLOOM_RAMP_MS = 450
const SC_READY_POLL_MS = 60
const TIME_SHADOW_TRIS = [6_000_000, 20_000_000]
// MSAA del showcase (ver showcaseSamples): sin él por encima de SC_MSAA_TRIS
// triángulos; por debajo, x4 hasta SC_MSAA4_PX píxeles de lienzo y x2 si hay más.
const SC_MSAA_TRIS = 4_000_000
const SC_MSAA4_PX = 4_000_000
// Versión alta en una GPU que no puede con ella (ver checkScSpeed): con el giro en
// marcha y la malla quieta, se miden SC_SPEED_N frames tras saltar SC_SPEED_SKIP y,
// si la mediana pasa de SC_SPEED_MS (menos de ~40 fps), se pasa a la ligera. Con el
// giro en pausa y algo que se mueve, se pinta cada SC_IDLE_MS (~30 fps).
const SC_SPEED_SKIP = 20
const SC_SPEED_N = 40
const SC_SPEED_MS = 24
const SC_IDLE_MS = 30
const Y_AXIS = new THREE.Vector3(0, 1, 0)
// Constante de tiempo (s) del suavizado del vuelo WASD: la velocidad se acerca
// exponencialmente a la objetivo, así acelera al pulsar y desliza/frena al soltar
// en vez de arrancar y parar de golpe. Menor = más directo, mayor = más flotante.
const FLY_TAU = 0.09
// Velocidad del vuelo con el multiplicador a 1 (1.00×), en radios de la build por
// segundo. Antes 0,9; dos veces un 25 % más rápido. El suavizado (FLY_TAU) no cambia.
const FLY_SPEED = 0.9 * 1.25 * 1.25
// Gestos: lo que tiene que moverse el puntero (px) para que deje de ser un clic,
// con ratón y con el dedo; ventana del doble clic/toque; duración de las
// transiciones de cámara; y cuánto dura la inercia al soltar (constante de
// tiempo en ms: a los 3τ casi se ha parado).
const DRAG_PX = 5, DRAG_PX_TOUCH = 10
export const DBL_MS = 350   // doble clic o doble toque (también lo usa Viewer3D)
const TWEEN_MS = 450
const ORBIT_TAU = 160, LOOK_TAU = 110
// Corte: tras este tiempo sin moverse se rehace lo del hilo principal (portal del
// End, marcos, vagonetas) aunque no se haya soltado. La malla va sola.
const SLICE_IDLE_MS = 150
// Subida a la GPU por frame de lo que manda el worker. Cuesta ~0,5 ms de CPU por
// MB en una RTX 4060 (Edge, ANGLE D3D11): 6 MB son ~3 ms por frame. Antes subía
// la build entera en un frame: 134-211 MB en L (65-155 ms) y hasta 780 en XL.
const UPLOAD_BYTES = 6 * 1048576
// Si la tapa del corte en Y no llega en este tiempo (worker ocupado con algo
// largo), se enseña el corte pedido con la malla que haya, aunque la capa de
// arriba salga con huecos, para que el corte no se quede atrás del ratón.
const CAP_WAIT_MS = 100
// Capas de malla (MESH_KINDS en buildMesh.ts): opaco, translúcido, entidades y emisivo.
const KINDS = 4
const KIND_TRANS = 1, KIND_ENTITY = 2, KIND_EMISSIVE = 3
// Malla de más de la tapa: su capa de abajo de lo translúcido, si lleva dos (ver splitCapTrans).
const CAP_TRANS_LO = KINDS
// Máscara del resaltado de materiales: un byte por entrada de paleta, hasta la
// 65.535 (PAL_NONE, el agua de los bloques anegados, nunca se marca).
const HI_W = 4096, HI_H = 16
// Capa fantasma (la de debajo en capa a capa): opacidad.
const GHOST_OPACITY = 0.32
// Suelo de césped: cuánto queda por debajo de la cara inferior de su capa (contra
// el z-fighting con las caras de abajo).
const FLOOR_EPS = 0.01
// Cielo de Minecraft (vista normal): cada cuánto se repinta con la build quieta para
// que avancen las nubes (más despacio con mucha malla o en móvil), y cuánto van como
// poco por encima del tope de la build (o 1,5 veces su lado mayor, ver syncSky). En
// el juego van a 192, unos 130 bloques sobre el terreno; a 96 se veían bajas.
const SKY_IDLE_MS = 250, SKY_IDLE_SLOW_MS = 1000, SKY_SLOW_VERTS = 4_000_000
const SKY_CLOUD_H = 160

// Trozo de malla en pantalla: celdas (enteras), una malla por capa y dónde empieza
// cada capa en Y de cada búfer (ver RegionMesh.layers).
interface ChunkRec { box: number[]; h: number; meshes: (THREE.Mesh | null)[]; layers: Uint32Array }
// Al abrir, la primera malla espera al manifiesto de entidades como mucho esto.
// Sin él los cofres y shulkers salen con el modelo de relleno y había que mallar
// otra vez en cuanto llegaba (dos builds completas en cada apertura).
const ENTITY_WAIT_MS = 300
const SIGN_FACING: Record<string, [number, number]> = { north: [0, -1], south: [0, 1], east: [1, 0], west: [-1, 0] }
// Texto de los carteles: hueco de cada uno en la página (el canvas que tenía cada
// cartel), margen arriba y abajo para que los mipmaps no mezclen textos vecinos, y
// textos por página: 8 x 12 caben en 2048 x 1920.
const SIGN_W = 256, SIGN_H = 144, SIGN_PAD = 8, SIGN_COLS = 8, SIGN_ROWS = 12

const VIEW_DIR: Record<Exclude<ViewName, 'free'>, { dir: [number, number, number]; up: [number, number, number] }> = {
  iso: { dir: [Math.cos(ISO_EL) * Math.cos(Math.PI / 4), Math.sin(ISO_EL), Math.cos(ISO_EL) * Math.sin(Math.PI / 4)], up: [0, 1, 0] },
  top: { dir: [0, 1, 0], up: [0, 0, -1] },
  bottom: { dir: [0, -1, 0], up: [0, 0, 1] },
  north: { dir: [0, 0, -1], up: [0, 1, 0] },
  south: { dir: [0, 0, 1], up: [0, 1, 0] },
  east: { dir: [1, 0, 0], up: [0, 1, 0] },
  west: { dir: [-1, 0, 0], up: [0, 1, 0] },
}

// Dirección (desde el centro) del encuadre de serie de la vista libre.
const FREE_DIR = new THREE.Vector3(1, 0.7, 1).normalize()
const ORIGIN = new THREE.Vector3()
const _m4 = new THREE.Matrix4()

// Orientación de una cámara que está en `dir` (desde su objetivo) con ese "arriba".
function lookQuat(dir: THREE.Vector3, up: THREE.Vector3): THREE.Quaternion {
  return new THREE.Quaternion().setFromRotationMatrix(_m4.lookAt(dir, ORIGIN, up))
}

// Quien pide menos movimiento en el sistema no tiene transiciones ni inercia.
// Capa más baja con algo que no sea aire (la capa 1 de capa a capa, ver rangoCapas
// en Viewer3D): si el schematic trae aire debajo, el suelo no se queda colgando.
function lowestLayer(m: SchematicModel): number {
  const air = new Uint8Array(m.palette.length)
  m.palette.forEach((p, i) => { air[i] = !p || isAir(p.name) ? 1 : 0 })
  const WL = m.width * m.length
  for (let y = 0; y < m.height; y++) {
    const o = y * WL
    for (let i = 0; i < WL; i++) if (!air[m.blocks[o + i]]) return y
  }
  return 0
}

function reducedMotion(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
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
  // Malla de bloques por trozos (ver chunkMesher.ts) y tapa del corte en Y.
  private chunkRoot = new THREE.Group()
  private chunks = new Map<number, ChunkRec>()
  private capMeshes: (THREE.Mesh | null)[] = [null, null, null, null, null]

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

  // Mobs: atlas y modelos van APARTE del entity-atlas y se bajan solo si la build
  // trae mobs, que es la excepción. Juntarlo todo obligaba a bajar 240 KB de
  // vacas y guardianes en cada schematic aunque no hubiera ni uno.
  private mobTex: THREE.Texture | null = null
  private mobAtlas: EntityAtlas | null = null
  private mobModels: MobModels | null = null
  private mobLoadP: Promise<void> | null = null
  private mobMat: THREE.MeshBasicMaterial | null = null

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
  // Sin workers, el mismo mallado por trozos en el hilo principal (más lento, pero se ve).
  private localMesher: ChunkMesher | null = null
  // Lo que el worker ya tiene guardado (undefined = aún no se le ha mandado). Se le
  // manda de nuevo solo cuando cambia: ver rebuildMesh y chunkMesher.ts.
  private sentAtlas: AtlasData | null | undefined = undefined
  private sentDb: ModelsData | null | undefined = undefined
  private sentManifest: EntityManifest | null | undefined = undefined
  // Modelo que tiene el worker (se le manda una copia de los bloques una vez).
  private workerModel: SchematicModel | null = null
  // Builds pedidas (gen) y cambios de corte (seq). Lo que llegue de una build
  // anterior a `modelGen` es de otro modelo y se tira.
  private meshGen = 0
  private modelGen = 1
  private sliceSeq = 0
  private doneGen = -1
  private doneSeq = -1
  private reportedGen = -1
  // truncated y fancyLeavesFit que se le dieron a la UI la última vez (onRebuild).
  private reported: [boolean, boolean] = [false, true]
  private shownFirst = false
  // Trozos que han llegado y esperan su turno para subir a la GPU (ver flushUploads).
  // `queued` guarda la versión más nueva de cada trozo: las viejas se saltan.
  private uploadQ: ChunkOut[] = []
  private uploadHead = 0
  private queued = new Map<number, ChunkOut>()
  // Trozos que se suben en este frame. Sus mallas se pintan sí o sí este frame
  // (sin frustum culling y, si el corte las oculta, con 0 triángulos), para que se
  // suban ya y no de golpe cuando la cámara o el corte las enseñen.
  private fresh: ChunkRec[] = []

  // Corte en Y que se enseña. Puede ir uno o dos frames por detrás del pedido
  // (`slice`): es el de la última tapa que ha llegado, y así lo que se ve es
  // siempre la malla exacta. `capY` son las capas que lleva esa tapa, que los
  // trozos no dibujan; null = sin tapa (no hace falta, o no ha llegado a tiempo).
  private dispY: [number, number] = [0, 0]
  private dispSeq = 0
  private capY: number[] | null = null
  private capGen = -1
  private capTimer: ReturnType<typeof setTimeout> | null = null

  // Lo del hilo principal que depende del corte (portal, marcos, vagonetas) se
  // rehace cuando el corte se queda quieto (ver setSlice): temporizador y corte
  // con el que se hizo, para no rehacerlo si al soltar no ha cambiado.
  private sliceTimer: ReturnType<typeof setTimeout> | null = null
  private builtSliceKey = ''
  // Primera malla de un modelo esperando al manifiesto de entidades (ver load).
  private deferredBuild: ReturnType<typeof setTimeout> | null = null
  private manifestSettled = false

  // Lo que se anima por sí solo (portal del End, autorrotación) solo pide frames
  // mientras el visor se ve: con la pestaña oculta o el lienzo fuera de pantalla
  // no se pinta nada.
  private onScreen = true
  private io: IntersectionObserver | null = null
  // Tras dispose() pueden seguir llegando cargas asíncronas (manifiesto, skins,
  // texturas): sin esto, sin worker ya, malla entera en el hilo principal para un
  // visor que nadie ve (pasaba con el doble montaje de StrictMode).
  private disposed = false

  // Celdas de portal/gateway del End del modelo, buscadas una vez en load().
  private portalCells: { x: number; y: number; z: number; gateway: boolean }[] = []
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

  // Sombra suave (AO por vértice) en la malla. La miniatura del catálogo la apaga
  // (capture.ts) para que las del catálogo no cambien de estilo.
  private readonly ao: boolean
  // Hojas: 'auto' las pone rápidas (opacas) solo en builds con muchas. La UI deja
  // forzarlas; `leavesFast` dice cómo salió la última malla.
  private leavesMode: LeavesMode = 'auto'
  private _leavesFast = false
  private _fancyLeavesFit = true

  private rafId = 0
  // Transición suave de la cámara (vistas, reajustar, rotar 90°, enfocar un bloque).
  // Libre: el objetivo va en línea recta y la cámara gira a su alrededor (dirección
  // y distancia). La dirección va en esféricas, acimut y elevación por separado: por
  // el arco más corto, media vuelta pasaba por encima de la build, y ahí la cámara
  // (con el "arriba" fijo en Y) volteaba la imagen de golpe. Orto: orientación
  // completa (arriba incluido) y zoom.
  private camTween: {
    t0: number; dur: number
    tgtFrom: THREE.Vector3; tgtTo: THREE.Vector3
    sphFrom: THREE.Spherical; sphTo: THREE.Spherical; distFrom: number; distTo: number
    qFrom: THREE.Quaternion; qTo: THREE.Quaternion; zoomFrom: number; zoomTo: number
  } | null = null
  private _needsRender = false

  // Modo exhibición (showcase): autorrotación y la build al atardecer (showcase.ts).
  // Sus materiales sustituyen a los de siempre mientras dura, y la malla se pide con
  // la luz por vértice (MeshOptions.light). Al salir, el worker deja de calcularla y
  // de mandarla en lo que malle (mensaje 'light') y se sueltan el composer y el mapa
  // de sombras: el modo normal cuesta lo mismo que sin haber entrado.
  private showcase = false
  private sc: Showcase | null = null
  private scOpaque: THREE.MeshBasicMaterial | null = null
  private scTrans: THREE.MeshBasicMaterial | null = null
  private scEntity: THREE.MeshBasicMaterial | null = null
  private scEmit: THREE.MeshBasicMaterial | null = null
  private composer: EffectComposer | null = null
  private bloomPass: UnrealBloomPass | null = null
  private gradePass: ShaderPass | null = null
  private scT0 = 0
  // El worker tiene la luz de la exhibición de la build actual (la última build se
  // pidió en exhibición). Al volver a entrar no hay que rehacer la build: solo los
  // trozos que se mallaron sin luz mientras tanto.
  private builtLight = false
  // Si la build tiene algo que se mueve solo en la versión alta (agua, lava, hojas,
  // plantas): sin ello y con el giro en pausa, la imagen está quieta.
  private scMoving = false
  // Medida de los primeros frames en la versión alta (ver checkScSpeed).
  private scSpeed: { last: number; n: number; dts: number[] } | null = null
  private scIdleTimer: ReturnType<typeof setTimeout> | null = null
  // Entrando en exhibición: se espera a la malla con la luz entera con el aspecto de
  // siempre (si se cambiara antes, los trozos con y sin luz se mezclan y parpadean), y
  // luego se funde. onShowcasePrep avisa de la espera (para "Preparando…").
  private scPending = false
  private scReadyTimer: ReturnType<typeof setTimeout> | null = null
  // El fundido en curso (ver fadeSnapshot) y cuándo empezó a encenderse el bloom.
  private fadeEl: HTMLCanvasElement | null = null
  private fadeTimer: ReturnType<typeof setTimeout> | null = null
  private bloomRampAt = 0
  onShowcasePrep?: (preparando: boolean) => void
  // Hora del día pedida y la que se ve (exhibición), ver stepTime.
  private scTimeTarget = 18.5
  private scTimeShown = 18.5
  private timeStepAt = 0
  private timeFrames = 0
  // Cielo de Minecraft de la vista normal (opcional; en exhibición va el suyo).
  private vsky: VanillaSky | null = null
  private skyOn = false
  private skyTimer: ReturnType<typeof setTimeout> | null = null
  // Hora del cielo de Minecraft y la luz de vanilla que da: de día la build se ve como
  // siempre; al caer la tarde se apaga según su luz de cielo y alumbran las antorchas
  // (luz de bloque horneada; la malla la pide una vez, al hacerse de noche, ver
  // syncNormalLight). lvNight: cuánto de noche (0 = la de siempre); lvSkyK: lo que
  // vale la luz de cielo a esa hora.
  private normalHour = HORA_NORMAL    // la pedida
  private normalShown = HORA_NORMAL   // la que se ve (ver stepTime)
  private nightLatch = false
  private lvU = { lvNight: { value: 0 }, lvSkyK: { value: 1 } }

  // Free-cam WASD (solo vista libre): mover cámara+target juntos.
  private keys = new Set<string>()
  private hovering = false
  private flyEnabled = false   // free-cam activado por el usuario (botón); si no, WASD no mueve
  private lastFlyT = 0
  private flySpeedMul = 1   // multiplicador regulable de la velocidad de vuelo (slider)
  private _flyVel = new THREE.Vector3()      // velocidad de vuelo actual (suavizada)
  private _flyDesired = new THREE.Vector3()  // velocidad objetivo según teclas
  private _flyMove = new THREE.Vector3()     // desplazamiento del frame
  // Gestos sobre el lienzo (ver onPtrDown). Botón izquierdo o un dedo: en vista
  // libre orbita alrededor del bloque que había bajo el puntero al empezar ('orbit')
  // o, con el vuelo activado, mira en primera persona ('look'); en iso/orto desplaza
  // ('pan'). Derecho y dos dedos (zoom y desplazar) y la rueda son de
  // OrbitControls. Hasta pasar DRAG_PX no es un arrastre: así un clic que tiembla
  // un poco sigue siendo un clic (inspector de bloque) y no mueve la cámara.
  private ptrs = new Set<number>()
  private gesture: {
    id: number; x0: number; y0: number; t0: number; touch: boolean; button: number
    moved: boolean; multi: boolean; mode: 'orbit' | 'look' | 'pan' | 'other'
  } | null = null
  private lookPX = 0
  private lookPY = 0
  private lookMoveT = 0
  private coastT = 0
  private pivot = new THREE.Vector3()
  // Inercia al soltar, en rad/ms: sigue girando y frena (ver coast).
  private orbitVel = { yaw: 0, pitch: 0 }
  private lookVel  = { yaw: 0, pitch: 0 }
  private lastTap: { t: number; x: number; y: number } | null = null
  /** Clic o toque sin arrastre (botón izquierdo o dedo): la UI identifica el bloque. */
  onTap?: (clientX: number, clientY: number) => void

  private raycaster = new THREE.Raycaster()
  private pickNdc = new THREE.Vector2()
  private highlight: THREE.LineSegments | null = null
  private highlightPair: THREE.LineSegments | null = null   // 2ª mitad (cofre doble)
  private highlightMat: THREE.LineBasicMaterial
  private signGroup: THREE.Group | null = null
  private tmpV = new THREE.Vector3()

  // Capa a capa: la capa de debajo de la que se construye, semitransparente y sin
  // sombra suave. La malla la hace el worker aparte (ver chunkMesher, 'ghost') y no
  // la recorta el corte en Y, que justo la deja fuera: solo X y Z.
  private ghostY: number | null = null
  private ghostMeshes: (THREE.Mesh | null)[] = [null, null, null, null]
  private ghostMat: THREE.MeshBasicMaterial
  // Lo mismo para la malla de entidades (cofres, cabezas, shulkers), que lleva las
  // UV del atlas de entidades y no del de bloques. Su textura es la de entityMat
  // (la base o la de skins), y se pone al día con ella en syncLitMaps.
  private ghostEntMat: THREE.MeshBasicMaterial

  // Resaltar dónde va un material: cada vértice lleva su entrada de paleta (atributo
  // palIdx) y una textura de 4096 x 16 dice cuáles se resaltan. El resto se dibuja
  // como fantasma (una trama, sin ordenar transparencias) y deja ver lo resaltado
  // que queda detrás. Cambiarlo es subir 64 KB, sin rehacer la malla.
  private hiData = new Uint8Array(HI_W * HI_H)
  private hiTex: THREE.DataTexture
  private hiUniforms: { hiOn: { value: number }; hiMask: { value: THREE.DataTexture } }

  // Suelo de césped (opcional) bajo la capa más baja con bloques, hasta el
  // horizonte, para que la build se apoye en algo; en exhibición recibe la sombra del
  // sol. Es macizo: por debajo es tierra y no deja ver nada. Es un triángulo a pantalla completa que corta el rayo de cada píxel con el
  // plano (ver floorPatch), con dos materiales: el plano de siempre y el de
  // exhibición. No entra en el corte, en el pick ni en la miniatura (captureIso).
  private floor: THREE.Mesh | null = null
  private floorFor: SchematicModel | null = null
  private floorOn = false
  private floorBase = 0                       // capa más baja con bloques del modelo
  private floorTex: THREE.Texture | null = null      // cara de arriba: césped
  private floorDirtTex: THREE.Texture | null = null  // por debajo: tierra
  private floorTexAtlas: Atlas | null = null  // de qué atlas salieron las dos
  private floorMat: THREE.MeshBasicMaterial | null = null
  private floorLit: THREE.MeshBasicMaterial | null = null
  // Uniforms del suelo: semilado de la build en X y Z (para alinear la textura con los
  // bloques), su altura y la cámara con la que se pinta.
  private floorU = {
    flHalf: { value: new THREE.Vector2() },
    flY: { value: 0 },
    flInvProj: { value: new THREE.Matrix4() },
    flCamWorld: { value: new THREE.Matrix4() },
    flProj: { value: new THREE.Matrix4() },
    flDirt: { value: null as THREE.Texture | null },
  }

  // Medida entre dos bloques: el segundo con su contorno y una línea entre centros.
  private measureBox: THREE.LineSegments | null = null
  private measureMat: THREE.LineBasicMaterial
  // La medida acotada como en un plano: la recta entre los dos bloques y sus tres
  // cotas por eje (X, Y, Z), con topes en los extremos y su número en una etiqueta
  // (HTML encima del lienzo, siempre de cara). Líneas de grosor en píxeles: enteras
  // donde se ven y tenues donde algo las tapa (dos pasadas con la misma geometría).
  private cota: { a: THREE.Vector3; b: THREE.Vector3 } | null = null
  private cotaGeo: LineSegmentsGeometry | null = null
  private cotaLines: LineSegments2[] = []
  private cotaMats: LineMaterial[] = []
  private cotaLabels: HTMLDivElement | null = null

  /** Hacia dónde queda el norte en pantalla (radianes, en el sentido de las agujas desde arriba), para la brújula. */
  onHeading?: (rad: number) => void
  private lastHeading = NaN
  private _hq = new THREE.Vector3()
  private _hu = new THREE.Vector3()

  constructor(canvas: HTMLCanvasElement, opts?: { ao?: boolean }) {
    THREE.ColorManagement.enabled = false
    this.ao = opts?.ao ?? true

    this.canvas = canvas
    // Sin preserveDrawingBuffer para máximo rendimiento; captureIso usa un renderer temporal.
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    this.renderer.localClippingEnabled = true
    this.renderer.setClearColor(0x000000, 0) // transparente cuando scene.background = null

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(BG_COLOR)
    this.chunkRoot.matrixAutoUpdate = false
    this.scene.add(this.chunkRoot)

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
    this.highlightMat = new THREE.LineBasicMaterial({ color: 0xF4811F, depthTest: false, transparent: true, clippingPlanes: this.clipPlanes })
    this.measureMat = new THREE.LineBasicMaterial({ color: 0x5EC8F2, depthTest: false, transparent: true })
    this.hiTex = new THREE.DataTexture(this.hiData, HI_W, HI_H, THREE.RedFormat, THREE.UnsignedByteType)
    this.hiTex.magFilter = THREE.NearestFilter
    this.hiTex.minFilter = THREE.NearestFilter
    this.hiTex.generateMipmaps = false
    this.hiTex.needsUpdate = true
    this.hiUniforms = { hiOn: { value: 0 }, hiMask: { value: this.hiTex } }
    for (const m of [this.opaqueMat, this.transMat, this.entityMat]) this.patchHighlight(m)
    // La capa fantasma queda por debajo del corte en Y: solo los planos de X y Z.
    const xz = [this.clipPlanes[0], this.clipPlanes[1], this.clipPlanes[4], this.clipPlanes[5]]
    // alphaTest bajo: compara el alfa ya multiplicado por la opacidad. Escribe
    // profundidad: de una capa se ve la cara de delante y no todas las de detrás.
    this.ghostMat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: GHOST_OPACITY, alphaTest: 0.05, clippingPlanes: xz })
    this.ghostEntMat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: GHOST_OPACITY, alphaTest: 0.05, clippingPlanes: xz })
    for (const m of [this.ghostMat, this.ghostEntMat]) {
      m.onBeforeCompile = this.lvPatch
      m.customProgramCacheKey = () => 'lv-noche'
      this.lvDefaults(m)
    }
    this.loadEntityAtlas()

    this.controls = this.makeControls()
    this.resize()
    this.scheduleRender()
    this.setupInput()

    document.addEventListener('visibilitychange', this.onVisibility)
    if (typeof IntersectionObserver !== 'undefined') {
      this.io = new IntersectionObserver((entries) => {
        this.onScreen = entries[entries.length - 1].isIntersecting
        if (this.isLive()) this.scheduleRender()   // vuelve a verse: reanuda lo animado
      })
      this.io.observe(canvas)
    }

    // Sin red de seguridad, un fallo aquí se lleva por delante el constructor
    // entero y el visor no llega ni a pintarse. Ya hay un camino síncrono para
    // cuando no hay worker (ver rebuild), así que lo peor que puede pasar es que
    // la malla se construya en el hilo principal: más lento, pero se ve.
    //
    // El caso real fue el CDN: con assetPrefix, la URL del worker apuntaba a otro
    // dominio y el constructor lanzaba SecurityError, porque un Worker tiene que
    // ser del mismo origen. Eso se corrige en next.config.js con
    // `output.workerPublicPath`; esto es solo para que no vuelva a tumbar nada.
    //
    // OJO: la expresión `new Worker(new URL('./meshWorker', import.meta.url))` va
    // literal y sin envolver. Webpack y Vite la detectan por su forma para emitir
    // el chunk del worker; si se mete dentro de una función o se parte en una
    // variable, dejan de reconocerla y el worker no se empaqueta.
    if (typeof Worker !== 'undefined') {
      try {
        this.worker = new Worker(new URL('./meshWorker', import.meta.url))
        this.worker.addEventListener('message', this.onWorkerMessage)
      } catch {
        this.worker = null
      }
    }
  }

  // ── API ─────────────────────────────────────────────────────────────────────
  load(model: SchematicModel): void {
    this.model = model
    this.boundingRadius = 0.5 * Math.hypot(model.width, model.height, model.length)
    this.slice = { x: [0, model.width - 1], y: [0, model.height - 1], z: [0, model.length - 1] }
    // Si ya es de noche, la primera malla sale con la luz (y no hace falta otra).
    this.nightLatch = this.wantsNight()
    this.clearSliceTimer()
    this.builtSliceKey = ''
    // Lo del modelo anterior fuera (malla, tapa y lo que esperaba a subirse), y
    // lo que aún llegue del worker para él se tira (modelGen).
    this.clearChunks()
    // Capa fantasma, resaltado y medida eran del modelo anterior.
    this.ghostY = null
    this.disposeGhost()
    this.setHighlightPalette(null)
    this.setMeasure(null, null)
    this.lastHeading = NaN
    this.workerModel = null
    this.modelGen = this.meshGen + 1
    this.sliceSeq++
    this.dispY = [0, model.height - 1]
    this.dispSeq = this.sliceSeq
    this.truncated = false
    this.shownFirst = false
    this.findEndPortals(model)
    this.scMoving = model.palette.some((bs) => !!bs && movesInShowcase(bs))
    this.updateClip()
    // La cámara antes que la malla: el worker malla primero lo más cercano a ella.
    this.setView(this.view, false)
    // Una sola malla al abrir: si el manifiesto de entidades aún no ha llegado se
    // espera (como mucho ENTITY_WAIT_MS) en vez de mallar ya y tirarlo al llegar.
    // Es lo mismo que hace capture.ts con whenEntityReady() antes de load().
    if (this.deferredBuild) { clearTimeout(this.deferredBuild); this.deferredBuild = null }
    if (this.manifestSettled) this.rebuild()
    else this.deferredBuild = setTimeout(() => this.flushDeferredBuild(), ENTITY_WAIT_MS)
    this.buildSignText()
    this.syncSky()
    this.scheduleRender()
    if (model.mobs?.length) void this.ensureMobAssets()
    void this.applySkins(model)   // cabezas con skin propio: async, rehace el mesh al terminar
  }

  // Lanza ya la primera malla si estaba esperando al manifiesto de entidades.
  private flushDeferredBuild(): void {
    if (!this.deferredBuild) return
    clearTimeout(this.deferredBuild)
    this.deferredBuild = null
    this.rebuild()
  }

  setAtlas(atlas: Atlas): void {
    this.atlas = atlas
    this.opaqueMat.map = atlas.texture
    this.transMat.map = atlas.texture
    this.ghostMat.map = atlas.texture
    this.opaqueMat.needsUpdate = true
    this.transMat.needsUpdate = true
    this.ghostMat.needsUpdate = true
    this.syncLitMaps()
    if (this.floorOn) this.syncFloor()   // el césped del atlas nuevo
    this.rebuild()
  }

  // Atlas de texturas de entidad (cofres, shulkers, cabezas…) apiladas, + su
  // manifiesto JSON. Independiente del atlas de bloques. El manifiesto se pasa al
  // worker para mapear los UV; aquí solo cargamos la textura y guardamos el atlas
  // para el fallback síncrono.
  private loadEntityAtlas(): void {
    // El manifiesto va primero y sin caché, y la textura cuelga de la huella que
    // trae dentro. Si se pide el PNG a pelo, el navegador sirve el que tenga
    // guardado (30 días, ver next.config.js) mientras el manifiesto llega fresco
    // en cada carga, y el visor pinta las UV nuevas sobre la textura anterior.
    // Es el mismo tratamiento que ya tenía el atlas de mobs (ver ensureMobAssets).
    const cargarTex = (v: string) => {
      if (this.disposed) return   // visor ya cerrado: nadie va a usar la textura
      new THREE.TextureLoader().load(asset('entity-atlas.png') + (v ? `?v=${v}` : ''),
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
          if (this.model?.minecarts?.length || this.model?.armorStands?.length || this.model?.boats?.length || this.model?.mobs?.length) this.buildMinecarts()
          this.scheduleRender()
          this.markEntityReady('tex')
        },
        undefined,
        () => this.markEntityReady('tex'), // si falla la textura, no colgamos la captura
      )
    }

    // El manifiesto es uno por página (resources.ts): LitematicViewer lo pide en
    // paralelo con el archivo, así que al abrir una ficha suele estar ya aquí.
    loadEntityManifest()
      .then((m: EntityManifest) => {
        this.baseEntityManifest = m
        // No pisar un manifiesto extendido (con skins) ya aplicado al modelo actual.
        if (!this.customEntityTex) {
          this.entityManifest = m
          this.entityAtlas = makeEntityAtlas(m)
        }
        this.manifestSettled = true
        // Si la primera malla lo estaba esperando, sale ahora y ya con cofres. Si
        // ya se había mallado sin él (tardó más de ENTITY_WAIT_MS), hay que rehacer.
        if (this.deferredBuild) this.flushDeferredBuild()
        else if (this.model) this.rebuild()
        return m.v ?? ''
      })
      // Sin manifiesto no hay huella, pero la textura se pide igual: peor es
      // quedarse sin cofres por no saber qué versión pedir.
      .catch(() => {
        this.manifestSettled = true
        this.flushDeferredBuild()   // no esperar a algo que no va a llegar
        return ''
      })
      .then((v) => cargarTex(v))
      .finally(() => this.markEntityReady('manifest'))
  }

  // Atlas + modelos de mobs, bajo demanda: solo la primera vez que se carga una
  // build con mobs. `waitForIdle` espera esta promesa, así que la miniatura no
  // se saca con la vaca a medio llegar.
  private ensureMobAssets(): Promise<void> {
    if (this.mobLoadP) return this.mobLoadP

    // Los manifiestos se piden revalidando (`no-cache`) y el PNG cuelga de la
    // huella que trae el manifiesto: si no, un atlas nuevo se queda tapado por el
    // que el navegador tenga guardado y el visor pinta las UV nuevas sobre la
    // textura vieja. Con GitHub Pages (10 min de caché) eso era media hora de
    // "pero si ya lo he subido".
    const noCache: RequestInit = { cache: 'no-cache' }
    const cargarTex = (v: string) => new Promise<void>((res) => {
      new THREE.TextureLoader().load(asset('mob-atlas.png') + (v ? `?v=${v}` : ''), (t) => {
        t.magFilter = THREE.NearestFilter
        t.minFilter = THREE.NearestFilter
        t.generateMipmaps = false
        t.flipY = false
        this.mobTex = t
        res()
      }, undefined, () => res())
    })

    this.mobLoadP = Promise.all([
      fetch(asset('mob-atlas.json'), noCache).then(r => r.json())
        .then((m: EntityManifest & { v?: string }) => { this.mobAtlas = makeEntityAtlas(m); return cargarTex(m.v ?? '') }),
      fetch(asset('mob-models.json'), noCache).then(r => r.json()).then((m: MobModels) => { this.mobModels = m }),
    ])
      .catch(() => { /* sin mobs si no cargan */ })
      .then(() => {
        if (this.model?.mobs?.length) { this.buildMinecarts(); this.scheduleRender() }
      })
    return this.mobLoadP
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
    // Con la misma huella que el atlas base: si se pide a pelo, esta segunda carga
    // es OTRA entrada de cache y puede traer el PNG viejo, componiendo las skins
    // sobre una textura que no cuadra con el manifiesto.
    try { baseImg = await this.loadImage(asset('entity-atlas.png') + (base.v ? `?v=${base.v}` : '')) } catch { return }
    const imgs = await Promise.all(entries.map(([, hash]) =>
      this.loadImage(skinUrl(hash)).catch(() => null)))
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
    this.ghostMat.map = atlas.texture
    this.opaqueMat.needsUpdate = true
    this.transMat.needsUpdate = true
    this.ghostMat.needsUpdate = true
    this.syncLitMaps()
    if (this.floorOn) this.syncFloor()   // el césped del atlas nuevo
    this.db = db
    this.rebuild()
  }

  /**
   * Cambia de vista. Con `animado` la cámara llega con una transición desde donde
   * está, también entre la libre (perspectiva) y las planas (ortográfica): la
   * nueva cámara arranca con el mismo punto de vista y el mismo tamaño aparente
   * que la otra y de ahí va a su encuadre. `mantener` (solo libre): se queda en
   * ese punto de vista en vez de ir al encuadre de serie (lo usa el modo exhibición).
   */
  setView(view: ViewName, animado = true, mantener = false): void {
    const from = this.camPose()
    const prevView = this.view
    this.view = view
    this.camTween = null
    this.activeCam = view === 'free' ? this.perspCam : this.orthoCam
    this.controls.dispose()
    this.controls = this.makeControls()
    if (view !== 'free') {
      const v = VIEW_DIR[view]
      this.orthoDir.set(v.dir[0], v.dir[1], v.dir[2]).normalize()
      this.orthoUp.set(v.up[0], v.up[1], v.up[2])
    }
    const anim = animado && !!this.model && !reducedMotion()
    if (!anim && !mantener) {
      if (view === 'free') this.frameFree(); else this.frameOrtho()
      this.updateCursor()
      this.scheduleRender()
      return
    }
    // Punto de partida: la cámara nueva donde estaba la vieja.
    if (view === 'free') {
      if (prevView === 'free') {
        this.perspCam.position.copy(this.controls.target.copy(from.target)).addScaledVector(from.dir, from.dist)
      } else {
        // Desde una vista plana: misma dirección y la distancia a la que se ve igual
        // de grande. Desde arriba o abajo se inclina un poco: la cámara libre lleva
        // el "arriba" fijo en Y y mirando en vertical no sabría hacia dónde girar.
        const dir = from.dir.clone()
        if (Math.abs(dir.y) > 0.99) dir.addScaledVector(from.up, -0.15).normalize()
        const d = from.halfH / Math.tan(THREE.MathUtils.degToRad(this.perspCam.fov) / 2)
        this.controls.target.copy(from.target)
        this.perspCam.position.copy(from.target).addScaledVector(dir, d)
      }
      this.perspCam.up.set(0, 1, 0)
      this.perspCam.lookAt(this.controls.target)
      if (mantener) { this.controls.update(); this.updateCursor(); this.scheduleRender(); return }
      const fov = THREE.MathUtils.degToRad(this.perspCam.fov)
      this.tweenFree(new THREE.Vector3(), FREE_DIR, (this.boundingRadius / Math.sin(fov / 2)) * 1.1)
    } else {
      // Orto: misma distancia y semialtura que frameOrtho; el zoom da el tamaño.
      const r = this.boundingRadius
      this.orthoDist = r * 4
      this.viewHalfHeight = r * 1.05
      this.orthoCam.zoom = Math.max(1e-3, this.viewHalfHeight / Math.max(1e-3, from.halfH))
      this.updateOrtho()
      this.controls.target.copy(from.target)
      this.orthoCam.up.copy(from.up)
      this.orthoCam.position.copy(from.target).addScaledVector(from.dir, this.orthoDist)
      this.orthoCam.lookAt(from.target)
      this.tweenOrtho(new THREE.Vector3(), this.orthoDir, this.orthoUp, 1)
    }
    this.updateCursor()
    this.scheduleRender()
  }

  rotate90(): void {
    if (this.view === 'free') return
    // Desde el final de la transición en curso, si la hay (dos clics seguidos = 180°).
    const p = this.camTween ? this.tweenEnd() : null
    const dir = (p?.dir ?? this.orthoDir).clone().applyAxisAngle(Y_AXIS, Math.PI / 2)
    const up = (p?.up ?? this.orthoUp).clone().applyAxisAngle(Y_AXIS, Math.PI / 2)
    this.tweenOrtho(p?.target ?? this.controls.target.clone(), dir, up, p?.zoom ?? this.orthoCam.zoom, 300)
    this.scheduleRender()
  }

  // ── Transiciones de cámara ──────────────────────────────────────────────────
  // Pose de la cámara activa: objetivo, dirección (del objetivo a la cámara),
  // distancia, "arriba" y la semialtura que se ve a la distancia del objetivo.
  private camPose(): { target: THREE.Vector3; dir: THREE.Vector3; dist: number; up: THREE.Vector3; halfH: number } {
    const cam = this.activeCam
    const target = this.controls.target.clone()
    const off = cam.position.clone().sub(target)
    const dist = off.length() || 1
    const dir = off.divideScalar(dist)
    const halfH = this.view === 'free'
      ? dist * Math.tan(THREE.MathUtils.degToRad(this.perspCam.fov) / 2)
      : this.viewHalfHeight / (this.orthoCam.zoom || 1)
    return { target, dir, dist, up: cam.up.clone(), halfH }
  }

  // Cámara libre: el objetivo va a `tgt` y la cámara acaba en la dirección `dir`
  // (desde el objetivo) a `dist`.
  private tweenFree(tgt: THREE.Vector3, dir: THREE.Vector3, dist: number, dur = TWEEN_MS): void {
    const p = this.camPose()
    this.stopMotion()
    const to = dir.clone().normalize()
    const sphFrom = new THREE.Spherical().setFromVector3(p.dir)
    const sphTo = new THREE.Spherical().setFromVector3(to)
    // Mirando en vertical el acimut no está definido: vale el del otro extremo.
    if (Math.abs(p.dir.y) > 0.9999) sphFrom.theta = sphTo.theta
    if (Math.abs(to.y) > 0.9999) sphTo.theta = sphFrom.theta
    // El acimut, por el lado más corto.
    const dTh = sphTo.theta - sphFrom.theta
    sphTo.theta = sphFrom.theta + Math.atan2(Math.sin(dTh), Math.cos(dTh))
    this.camTween = {
      t0: performance.now(), dur: reducedMotion() ? 0 : dur,
      tgtFrom: p.target, tgtTo: tgt.clone(),
      sphFrom, sphTo, distFrom: p.dist, distTo: Math.max(0.05, dist),
      qFrom: new THREE.Quaternion(), qTo: new THREE.Quaternion(), zoomFrom: 1, zoomTo: 1,
    }
    this.scheduleRender()
  }

  // Cámara ortográfica: objetivo, orientación (dirección + arriba) y zoom finales.
  private tweenOrtho(tgt: THREE.Vector3, dir: THREE.Vector3, up: THREE.Vector3, zoom: number, dur = TWEEN_MS): void {
    const p = this.camPose()
    this.stopMotion()
    this.camTween = {
      t0: performance.now(), dur: reducedMotion() ? 0 : dur,
      tgtFrom: p.target, tgtTo: tgt.clone(),
      sphFrom: new THREE.Spherical(), sphTo: new THREE.Spherical(), distFrom: 1, distTo: 1,
      qFrom: lookQuat(p.dir, p.up), qTo: lookQuat(dir.clone().normalize(), up), zoomFrom: this.orthoCam.zoom, zoomTo: zoom,
    }
    this.scheduleRender()
  }

  // Dónde acaba la transición en curso (para encadenar dos rotaciones de 90°).
  private tweenEnd(): { target: THREE.Vector3; dir: THREE.Vector3; up: THREE.Vector3; zoom: number } | null {
    const t = this.camTween
    if (!t || this.view === 'free') return null
    return {
      target: t.tgtTo.clone(),
      dir: new THREE.Vector3(0, 0, 1).applyQuaternion(t.qTo),
      up: new THREE.Vector3(0, 1, 0).applyQuaternion(t.qTo),
      zoom: t.zoomTo,
    }
  }

  // Un paso de la transición. Devuelve true mientras siga.
  private stepTween(): boolean {
    const t = this.camTween
    if (!t) return false
    const k = t.dur > 0 ? Math.min(1, (performance.now() - t.t0) / t.dur) : 1
    const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2   // ease in-out cúbica
    const tgt = this.controls.target.lerpVectors(t.tgtFrom, t.tgtTo, e)
    if (this.view === 'free') {
      const lerp = THREE.MathUtils.lerp
      const dir = new THREE.Vector3().setFromSphericalCoords(1, lerp(t.sphFrom.phi, t.sphTo.phi, e), lerp(t.sphFrom.theta, t.sphTo.theta, e))
      const dist = t.distFrom * Math.pow(t.distTo / t.distFrom, e)
      this.perspCam.position.copy(tgt).addScaledVector(dir, dist)
      this.perspCam.lookAt(tgt)
    } else {
      const q = t.qFrom.clone().slerp(t.qTo, e)
      const dir = new THREE.Vector3(0, 0, 1).applyQuaternion(q)
      const up = new THREE.Vector3(0, 1, 0).applyQuaternion(q)
      this.orthoCam.zoom = t.zoomFrom * Math.pow(t.zoomTo / t.zoomFrom, e)
      this.orthoCam.updateProjectionMatrix()
      this.orthoCam.up.copy(up)
      this.orthoCam.position.copy(tgt).addScaledVector(dir, this.orthoDist)
      this.orthoCam.lookAt(tgt)
      if (k >= 1) { this.orthoDir.copy(dir); this.orthoUp.copy(up) }
    }
    if (k >= 1) this.camTween = null
    return k < 1
  }

  // Corta lo que la cámara traiga en marcha (inercia propia y la de OrbitControls).
  private stopMotion(): void {
    this.orbitVel.yaw = this.orbitVel.pitch = 0
    this.lookVel.yaw = this.lookVel.pitch = 0
    // Campos internos de OrbitControls (three 0.184): lo que le queda de damping.
    const c = this.controls as unknown as { _sphericalDelta?: THREE.Spherical; _panOffset?: THREE.Vector3 }
    c._sphericalDelta?.set(0, 0, 0)
    c._panOffset?.set(0, 0, 0)
  }

  /**
   * Doble clic / doble toque: acerca la cámara al bloque bajo el puntero, con
   * transición, y lo deja como centro de giro. Devuelve false si no hay bloque.
   */
  focusAt(clientX: number, clientY: number): boolean {
    const hit = this.castRay(clientX, clientY)
    if (!hit || !this.model) return false
    const { width: W, height: H, length: L } = this.model
    const c = new THREE.Vector3(hit.x + 0.5 - W / 2, hit.y + 0.5 - H / 2, hit.z + 0.5 - L / 2)
    this.pivot.copy(c)
    if (this.view === 'free') {
      const cam = this.perspCam.position
      const d = cam.distanceTo(c)
      const dist = Math.min(d, Math.max(2.5, Math.min(d * 0.55, 12 + this.boundingRadius * 0.1)))
      this.tweenFree(c, cam.clone().sub(c), dist)
    } else {
      const p = this.camPose()
      // Hasta el doble, con tope; si ya se estaba más cerca que el tope, no se aleja.
      const zoom = this.orthoCam.zoom
      this.tweenOrtho(c, p.dir, p.up, Math.max(zoom, Math.min(zoom * 2, this.boundingRadius / 3 + 2)))
    }
    return true
  }

  /**
   * Modo exhibición: la build al atardecer con el aspecto de un pack de shaders (ver
   * showcase.ts), con autorrotación opcional (entra quieta, ver setShowcaseRotation).
   * Al entrar se espera a la malla con la luz por vértice entera, viéndose como
   * siempre, y se pasa con un fundido; al salir, igual de suave.
   */
  setShowcase(on: boolean): void {
    if (on) {
      if (this.showcase || this.scPending) return
      this.ensureShowcase()
      this.scPending = true
      // La malla con la luz por vértice, si la que hay no la lleva. Si el worker ya
      // tiene la luz, solo remalla lo que se malló sin ella.
      if (!this.deferredBuild) {
        if (!this.builtLight) this.rebuildMesh()
        else this.sendLight(true)
      }
      this.checkScReady(true)
      return
    }
    if (this.scPending) {
      // Aún esperando la luz: se queda como estaba.
      this.scPending = false
      if (this.scReadyTimer) { clearTimeout(this.scReadyTimer); this.scReadyTimer = null }
      this.onShowcasePrep?.(false)
      if (this.builtLight && !this.deferredBuild && !this.nightLatch) this.sendLight(false)
      this.releaseShowcaseGpu()
      return
    }
    if (!this.showcase) return
    const snap = this.fadeSnapshot(() => this.renderShowcase(true))
    this.showcase = false
    this.updateClip()
    this.controls.autoRotate = false
    this.controls.zoomToCursor = true
    if (this.sc) this.scene.remove(this.sc.sky)
    this.swapShowcaseMaterials(false)
    if (this.floorOn) this.syncFloor()
    this.syncSky()
    // Lo que se malle desde ahora, sin la luz (ni su cálculo ni su atributo). Lo
    // ya mallado se queda como está: con los materiales de siempre se ve igual.
    if (this.builtLight && !this.deferredBuild && !this.nightLatch) this.sendLight(false)
    this.releaseShowcaseGpu()
    this.scSpeed = null
    this.bloomRampAt = 0
    this.startFade(snap)
    this.scheduleRender()
  }

  // ¿Ha llegado ya la malla con luz entera? Si no, se vuelve a mirar al rato; si sí,
  // se entra. `primera`: la llamada de setShowcase (si ya está, no hay "Preparando").
  private checkScReady = (primera = false): void => {
    this.scReadyTimer = null
    if (!this.scPending || this.disposed) return
    const lista = !this.model || (!this.deferredBuild && this.workerModel === this.model && this.meshIdle)
    if (!lista) {
      if (primera) this.onShowcasePrep?.(true)
      this.scReadyTimer = setTimeout(() => this.checkScReady(), SC_READY_POLL_MS)
      return
    }
    this.scPending = false
    this.onShowcasePrep?.(false)
    this.enterShowcase()
  }

  private enterShowcase(): void {
    this.ensureShowcase()
    const snap = this.fadeSnapshot(() => this.renderer.render(this.scene, this.activeCam))
    this.showcase = true
    this.updateClip()
    // La autorrotación va con la cámara libre. Si ya lo está, la cámara no se toca;
    // desde una vista plana pasa a la libre desde ese mismo punto de vista.
    if (this.view !== 'free') this.setView('free', false, true)
    this.camTween = null
    this.stopMotion()
    this.controls.zoomToCursor = false
    this.scene.add(this.sc!.sky)
    this.swapShowcaseMaterials(true)
    if (this.floorOn) this.syncFloor()
    this.syncSky()
    this.syncScWaves()
    this.requestShadowUpdate()
    this.scT0 = performance.now()
    // Entra quieta: girar es cosa del botón de play (setShowcaseRotation).
    this.controls.autoRotate = false
    this.controls.autoRotateSpeed = 1.1
    this.scSpeed = null
    // El bloom se enciende poco a poco, por debajo del fundido.
    this.applyScTone()
    this.bloomRampAt = performance.now()
    this.startFade(snap)
    this.scheduleRender()
  }

  /** Si está esperando la malla con luz para entrar en exhibición. */
  get showcasePending(): boolean { return this.scPending }

  // ── Transición ──
  // Fundido: una copia de lo que se ve ahora (pintado con `pintar`) en un lienzo 2D
  // encima del visor, que se desvanece mientras debajo ya se ve lo nuevo. Solo existe
  // durante el fundido; con "reducir movimiento", corte directo (null). Si ya había
  // uno a medias (se ha pulsado otra vez), la copia nueva lleva encima la vieja con
  // la opacidad que tenía: arranca justo con lo que se estaba viendo, sin salto.
  private fadeSnapshot(pintar: () => void): HTMLCanvasElement | null {
    const c = this.canvas, parent = c.parentElement
    if (reducedMotion() || !parent || !c.width || !c.height || !c.clientWidth) { this.endFade(); return null }
    const vieja = this.fadeEl
    const op = vieja ? parseFloat(getComputedStyle(vieja).opacity) : 0
    pintar()
    const o = document.createElement('canvas')
    o.width = c.width; o.height = c.height
    const ctx = o.getContext('2d')
    if (!ctx) { this.endFade(); return null }
    // El búfer del lienzo WebGL vale hasta que el navegador lo componga: en la misma tarea.
    ctx.drawImage(c, 0, 0)
    if (vieja && op > 0) { ctx.globalAlpha = op; ctx.drawImage(vieja, 0, 0); ctx.globalAlpha = 1 }
    this.endFade()
    Object.assign(o.style, {
      position: 'absolute', left: `${c.offsetLeft}px`, top: `${c.offsetTop}px`,
      width: `${c.clientWidth}px`, height: `${c.clientHeight}px`, pointerEvents: 'none',
      opacity: '1', transition: `opacity ${SC_FADE_MS}ms cubic-bezier(.4,0,.2,1)`,
    })
    o.setAttribute('aria-hidden', 'true')
    parent.insertBefore(o, c.nextSibling)
    return o
  }

  private startFade(o: HTMLCanvasElement | null): void {
    if (!o) return
    this.fadeEl = o
    // Primero se pinta lo nuevo debajo (el frame pedido) y después empieza a irse la copia.
    requestAnimationFrame(() => requestAnimationFrame(() => { if (this.fadeEl === o) o.style.opacity = '0' }))
    this.fadeTimer = setTimeout(() => this.endFade(), SC_FADE_MS + 120)
  }

  private endFade(): void {
    if (this.fadeTimer) { clearTimeout(this.fadeTimer); this.fadeTimer = null }
    this.fadeEl?.remove()
    this.fadeEl = null
  }

  // Le dice al worker si lo que malle lleva la luz de la exhibición. Va como un
  // corte (con su seq) para que meshIdle espere a lo que remalle.
  private sendLight(on: boolean): void {
    if (!this.model || this.workerModel !== this.model) return
    this.send({ type: 'light', seq: ++this.sliceSeq, on })
  }

  // Lo de la GPU que solo sirve en exhibición: el composer (MSAA en HDR, bloom y
  // tono) y el mapa de sombras. Se vuelven a crear al entrar (ensureShowcase).
  private releaseShowcaseGpu(): void {
    this.composer?.dispose()
    this.bloomPass?.dispose()
    this.gradePass?.dispose()
    this.composer = null
    this.bloomPass = null
    this.gradePass = null
    this.sc?.releaseShadow()
  }

  /**
   * Gira el sol del modo exhibición alrededor de la vertical, en grados desde donde
   * sale de serie (hasta ±60): sigue siendo el de un atardecer, desde otro lado.
   */
  setSunAngle(deg: number): void {
    this.ensureShowcase(false)
    this.sc!.setSunAngle(deg)
    this.scheduleRender()
  }
  get sunAngle(): number { return this.sc?.sunAngle ?? 0 }

  /**
   * Hora del día del modo exhibición (de 5:30 a 22:30; ver Showcase.setTime). Solo
   * cambia uniforms, y en exhibición lo que se ve la sigue suave (ver stepTime); fuera
   * de ella se pone ya. `final` se queda por compatibilidad: la sombra va sola.
   */
  setTimeOfDay(h: number, _final = true): void {
    this.ensureShowcase(false)
    this.scTimeTarget = h
    if (!this.showcase || reducedMotion()) {
      this.scTimeShown = h
      this.sc!.setTime(h)
      this.applyScTone()
    }
    this.scheduleRender()
  }
  get timeOfDay(): number { return this.scTimeTarget }

  // Un paso del suavizado de las horas del día (exhibición y cielo de Minecraft).
  // Devuelve true mientras siga moviéndose.
  private stepTime(): boolean {
    const scMov = !!this.sc && this.scTimeShown !== this.scTimeTarget
    const nMov = this.normalShown !== this.normalHour
    if (!scMov && !nMov) { this.timeStepAt = 0; return false }
    const now = performance.now()
    const dt = this.timeStepAt ? Math.min(100, now - this.timeStepAt) : 16
    this.timeStepAt = now
    const k = 1 - Math.exp(-dt / TIME_TAU)
    const paso = (from: number, to: number) => Math.abs(to - from) < 0.004 ? to : from + (to - from) * k
    let sigue = false
    if (scMov) {
      const sc = this.sc!
      this.scTimeShown = paso(this.scTimeShown, this.scTimeTarget)
      sc.setTime(this.scTimeShown)   // deja la sombra por rehacer
      this.applyScTone()
      const tris = this.vertexCount / 2
      const cada = tris < TIME_SHADOW_TRIS[0] ? 1 : tris < TIME_SHADOW_TRIS[1] ? 2 : 3
      // Con mucha malla, la sombra no en todos los frames (la última sí).
      if (this.scTimeShown !== this.scTimeTarget && (++this.timeFrames % cada) !== 0) sc.shadowDirty = false
      sigue = this.scTimeShown !== this.scTimeTarget
    }
    if (nMov) {
      this.normalShown = paso(this.normalShown, this.normalHour)
      this.vsky?.setTime(this.normalShown)
      this.syncNormalLight()
      sigue ||= this.normalShown !== this.normalHour
    }
    return sigue
  }

  // Exposición y bloom de la hora, en sus pases.
  private applyScTone(): void {
    const sc = this.sc
    if (!sc) return
    if (this.gradePass) this.gradePass.uniforms.scExposure.value = sc.exposure
    if (this.bloomPass) this.bloomPass.strength = sc.bloom
  }

  // El modelo no se mueve (solo orbita la cámara), así que la sombra del sol se
  // rehace solo a petición: al entrar, al cambiar la malla o el corte.
  private requestShadowUpdate(): void {
    if (this.sc) this.sc.shadowDirty = true
  }

  // El vaivén de hojas y plantas, solo si la build no es enorme.
  private syncScWaves(): void {
    this.sc?.setWaves(this.vertexCount <= SC_WAVES_MAX_VERTS)
  }

  // Todas las mallas de bloques: las de los trozos y las de la tapa del corte.
  private forEachMesh(fn: (m: THREE.Mesh, kind: number) => void): void {
    for (const rec of this.chunks.values()) for (let k = 0; k < KINDS; k++) { const m = rec.meshes[k]; if (m) fn(m, k) }
    this.capMeshes.forEach((m, k) => { if (m) fn(m, k === CAP_TRANS_LO ? KIND_TRANS : k) })
  }

  get isShowcase(): boolean { return this.showcase }

  /** Pausa/reanuda la autorrotación sin salir del modo showcase. */
  setShowcaseRotation(on: boolean): void {
    if (!this.showcase) return
    // Gira solo alrededor del objetivo de la cámara. Si no está en el centro de la
    // build (desplazar, mirar o acercar con la rueda lo mueven), la build daría vueltas
    // por la pantalla: se lleva al centro con la misma dirección y a la distancia que
    // haya hasta él.
    if (on && this.model && this.controls.target.lengthSq() > 1e-4) {
      this.tweenFree(new THREE.Vector3(), this.camPose().dir, Math.max(1, this.perspCam.position.length()))
    }
    this.controls.autoRotate = on
    if (on && this.sc?.quality === 'alta') this.scSpeed = { last: 0, n: 0, dts: [] }
    this.scheduleRender()
  }

  /** Hojas detalladas ('fancy'), rápidas ('fast') o según el tamaño ('auto'). */
  setLeavesMode(mode: LeavesMode): void {
    if (mode === this.leavesMode) return
    this.leavesMode = mode
    // Solo la malla: lo del hilo principal (portal, marcos...) no depende de esto.
    // Si la primera malla aún espera al manifiesto, ya saldrá con el modo nuevo.
    if (!this.deferredBuild) this.rebuildMesh()
  }
  /** Si la malla actual lleva las hojas rápidas (opacas). */
  get leavesFast(): boolean { return this._leavesFast }
  /** Si con hojas detalladas la malla cabría sin truncarse (estimado; con detalladas, siempre true). */
  get fancyLeavesFit(): boolean { return this._fancyLeavesFit }

  /** Multiplicador de velocidad del vuelo WASD (1 = por defecto). */
  setFlySpeed(mult: number): void { this.flySpeedMul = Math.max(0.05, mult) }
  // Activa/desactiva el free-cam (WASD). Al desactivar, suelta las teclas.
  // Con el vuelo, arrastrar mira en primera persona en vez de orbitar.
  setFlyEnabled(v: boolean): void { this.flyEnabled = v; if (!v) this.keys.clear(); this.updateCursor(); this.scheduleRender() }
  get flySpeed(): number { return this.flySpeedMul }

  /**
   * Captura la vista actual leyendo el backbuffer del propio renderer → no necesita
   * preserveDrawingBuffer ni un contexto aparte. Resolución = la del canvas.
   *
   * En exhibición: JPG con todo (cielo, sombras, agua, bloom y tono). Si no, sin
   * `fondo`: PNG con fondo TRANSPARENTE, para recortar la build sobre lo que sea.
   * Con `fondo` (el usuario eligió color o imagen en el visor): se compone ese
   * fondo debajo y sale en JPG — una foto ya montada, que es lo que se espera al
   * haberte molestado en ponerle fondo.
   *
   * `soloBuild` (fondo «Sin fondo» del visor): el PNG transparente sale sin el
   * suelo aunque esté puesto en pantalla, para que quede solo la estructura.
   */
  async capturePhoto(fondo?: { color?: string | null; imagen?: string | null } | null, soloBuild = false): Promise<Blob | null> {
    const w = this.renderer.domElement.width, h = this.renderer.domElement.height
    if (!w || !h) return null
    const gl = this.renderer.getContext()
    const rgb = new Uint8Array(w * h * 4)   // color (premultiplicado por su alfa)
    const showcase = this.showcase && !!this.composer
    // Con el cielo de Minecraft, igual: la foto es opaca y lo lleva.
    const conCielo = !showcase && !!this.vsky?.visible
    const opaca = showcase || conCielo

    if (showcase) {
      // El cielo del atardecer es parte de la foto: opaca, con todos los efectos.
      this.renderShowcase(true)
      gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, rgb)
    } else if (conCielo) {
      this.renderer.render(this.scene, this.activeCam)
      gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, rgb)
    } else {
      // Fondo transparente: quitamos el color/imagen de fondo solo durante la captura.
      const prevBg = this.scene.background
      this.scene.background = null
      // Con «Sin fondo», el suelo tampoco sale: solo la build.
      const prevSuelo = this.floor?.visible ?? false
      if (soloBuild && this.floor) this.floor.visible = false
      this.renderer.render(this.scene, this.activeCam)
      gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, rgb)
      this.scene.background = prevBg
      if (this.floor) this.floor.visible = prevSuelo
    }

    const out = document.createElement('canvas')
    out.width = w; out.height = h
    const ctx = out.getContext('2d')!
    const img = ctx.createImageData(w, h)
    const dst = img.data
    const row = w * 4
    // El contexto WebGL es premultiplicado: hay que des-premultiplicar el RGB por
    // el alfa o los bordes semitransparentes salen con halo oscuro en el PNG. En
    // exhibición la imagen es opaca.
    for (let y = 0; y < h; y++) {            // readPixels viene con el eje Y invertido
      const src = (h - 1 - y) * row
      const d   = y * row
      for (let x = 0; x < row; x += 4) {
        const a = opaca ? 255 : rgb[src + x + 3]
        if (a === 0 || a === 255) {
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

    // En exhibición o con el cielo de Minecraft, JPG con el cielo: el fondo propio no
    // se ve, lo tapa el cielo.
    if (opaca) {
      const blob = await new Promise<Blob | null>(res => out.toBlob(b => res(b), 'image/jpeg', 0.92))
      this.scheduleRender()
      return blob
    }

    const conFondo = !!(fondo && (fondo.imagen || fondo.color))
    if (!conFondo) {
      const blob = await new Promise<Blob | null>(res => out.toBlob(b => res(b), 'image/png'))
      this.scheduleRender()
      return blob
    }

    // Con fondo: se pinta debajo del render y se saca JPG (que no lleva alfa).
    // `out` tiene el render con su transparencia; se vuelca ENCIMA del fondo con
    // drawImage, que sí respeta el alfa (putImageData lo machacaría).
    const fin = document.createElement('canvas')
    fin.width = w; fin.height = h
    const fctx = fin.getContext('2d')!

    if (fondo!.color) {
      fctx.fillStyle = fondo!.color
      fctx.fillRect(0, 0, w, h)
    }
    if (fondo!.imagen) {
      try {
        const bg = await new Promise<HTMLImageElement>((res, rej) => {
          const im = new Image()
          im.crossOrigin = 'anonymous'
          im.onload = () => res(im); im.onerror = rej
          im.src = fondo!.imagen as string
        })
        // Mismo encuadre que en pantalla: cover + centrado (ver Viewer3D).
        const escala = Math.max(w / bg.width, h / bg.height)
        const dw = bg.width * escala, dh = bg.height * escala
        fctx.drawImage(bg, (w - dw) / 2, (h - dh) / 2, dw, dh)
      } catch {
        // Si la imagen no carga, queda el color de fondo (o negro): mejor eso que
        // no dar foto.
      }
    }
    fctx.drawImage(out, 0, 0)

    const blob = await new Promise<Blob | null>(res => fin.toBlob(b => res(b), 'image/jpeg', 0.92))
    this.scheduleRender()
    return blob
  }

  private swapShowcaseMaterials(lit: boolean): void {
    // matFor/kindMat ya miran this.showcase, que se cambia antes de llamar aquí.
    this.forEachMesh((m, k) => { m.material = this.kindMat(k) })
    this.litGroup(this.framesGroup, lit)
    this.litGroup(this.minecartsGroup, lit)
    this.litGroup(this.signGroup, lit, false)
  }

  // Marcos, vagonetas, barcos, soportes, mobs y carteles: en exhibición se iluminan
  // como los bloques (si no, parecían pegados encima). Cada malla guarda su material
  // de siempre en userData.basicMat y el de exhibición en userData.litMat; los dos
  // se liberan con el grupo (disposeMats). cast = false en el texto de los
  // carteles: su plano es transparente sin alphaTest y en el mapa de sombras salía
  // como un rectángulo oscuro entero (la tabla ya proyecta la suya desde la malla
  // de entidades).
  private litGroup(group: THREE.Group | null, lit: boolean, cast = true): void {
    if (!group) return
    for (const o of group.children) {
      const m = o as THREE.Mesh
      if (!m.isMesh) continue
      const ud = m.userData as { basicMat?: THREE.Material; litMat?: THREE.Material; noCast?: boolean }
      if (lit) {
        ud.basicMat ??= m.material as THREE.Material
        ud.litMat ??= this.toShowcase(ud.basicMat as THREE.MeshBasicMaterial)
        m.material = ud.litMat
      } else if (ud.basicMat) {
        m.material = ud.basicMat
      }
      ud.noCast = !cast
    }
  }

  // Material de exhibición de una malla de grupo. Sin el atributo `lit`: luz de
  // cielo plena, y sin el sombreado por cara de vanilla si no lleva color de
  // vértice (los marcos; las vagonetas y los mobs sí lo llevan horneado).
  private toShowcase(b: THREE.MeshBasicMaterial): THREE.MeshBasicMaterial {
    return this.sc!.material(b.transparent ? 'trans' : 'solid', {
      map: b.map, vertexColors: b.vertexColors, side: b.side, alphaTest: b.alphaTest,
      transparent: b.transparent, opacity: b.opacity, depthWrite: b.depthWrite,
      clippingPlanes: b.clippingPlanes,
      polygonOffset: b.polygonOffset, polygonOffsetFactor: b.polygonOffsetFactor, polygonOffsetUnits: b.polygonOffsetUnits,
    }, undefined, b.vertexColors ? 0 : LK_NOSHADE)
  }

  // Suelta los materiales de una malla de grupo (el de siempre y el de exhibición),
  // menos `keep` (el de mobs es fijo y se suelta en dispose()).
  private disposeMats(m: THREE.Mesh, keep?: THREE.Material | null): void {
    const ud = m.userData as { basicMat?: THREE.Material; litMat?: THREE.Material }
    const mats = new Set([m.material as THREE.Material, ud.basicMat, ud.litMat])
    for (const mat of mats) if (mat && mat !== keep) { this.sc?.forget(mat); mat.dispose() }
  }

  private syncLitMaps(): void {
    if (this.ghostEntMat.map !== this.entityMat.map) { this.ghostEntMat.map = this.entityMat.map; this.ghostEntMat.needsUpdate = true }
    if (!this.scOpaque) return
    this.scOpaque.map = this.opaqueMat.map;  this.scOpaque.needsUpdate = true
    this.scTrans!.map = this.transMat.map;   this.scTrans!.needsUpdate = true
    this.scEntity!.map = this.entityMat.map; this.scEntity!.needsUpdate = true
    this.scEmit!.map = this.opaqueMat.map;   this.scEmit!.needsUpdate = true
  }

  // Versión del modo exhibición: la ligera en móvil o con una GPU floja.
  private scQuality(): ScQuality {
    return lightQualityHint(this.renderer) ? 'ligera' : 'alta'
  }

  // Showcase y sus materiales (se quedan entre visitas: así no se recompilan) y,
  // con `gpu`, el composer.
  private ensureShowcase(gpu = true): void {
    if (this.sc) this.syncLitMaps()
    else this.makeShowcase()
    if (gpu && !this.composer) this.makeComposer()
  }

  private makeShowcase(): void {
    const sc = new Showcase(this.renderer, this.scQuality())
    this.sc = sc
    const cp = this.clipPlanes
    // Los cuatro de la malla de bloques, con el resaltado de materiales delante.
    this.scOpaque = sc.material('solid', { vertexColors: true, alphaTest: 0.5, clippingPlanes: cp }, this.hlPatch)
    this.scEntity = sc.material('solid', { vertexColors: true, alphaTest: 0.5, clippingPlanes: cp }, this.hlPatch)
    this.scTrans = sc.material('trans', { vertexColors: true, transparent: true, opacity: 0.8, depthWrite: false, clippingPlanes: cp }, this.hlPatch)
    // polygonOffset: lo que da luz va un pelín por delante, contra el z-fighting de
    // los bloques planos coplanares (los líquenes luminosos parpadeaban).
    this.scEmit = sc.material('emit', { vertexColors: true, alphaTest: 0.5, clippingPlanes: cp, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }, this.hlPatch)
    this.syncLitMaps()
  }

  private makeComposer(): void {
    const sc = this.sc!
    const w = this.canvas.clientWidth || 1, h = this.canvas.clientHeight || 1
    // Render target con MSAA y HDR: el que crea el composer por defecto no lleva
    // `samples` y se perdía el antialias (bordes de sierra). Las muestras van según
    // la carga (syncShowcaseSamples). setSize lo deja a la medida; solo se llega a
    // usar uno de los dos (los pases no alternan).
    const rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: this.showcaseSamples() })
    rt.texture.name = 'Showcase.rt'
    this.composer = new EffectComposer(this.renderer, rt)
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.composer.setSize(w, h)
    this.composer.addPass(new RenderPass(this.scene, this.perspCam))
    // Bloom en HDR: solo pasa lo que de verdad brilla (el sol, lo que da luz, los
    // destellos del agua). Umbral alto y radio corto: con 3,5 lo pasaban también
    // las paredes claras al sol con un farolillo al lado (salían en manchas) y los
    // mips grandes echaban un velo lechoso cerca de la piedra luminosa. En la
    // versión ligera, sin él.
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.25, 0.2, 5.0)
    this.bloomPass.enabled = sc.quality === 'alta'
    this.composer.addPass(this.bloomPass)
    // Tono (AgX), color y viñeta: lo último, a la pantalla.
    this.gradePass = new ShaderPass(sc.grade)
    this.composer.addPass(this.gradePass)
    this.applyScTone()
  }

  // MSAA del showcase según la carga. Con muchos triángulos de menos de un píxel
  // sale caro. Medido en una RTX 4060 (Edge, composer.render con la cámara quieta):
  // - Lschem (9,6 M triángulos), 1280x720: 16,7 ms sin MSAA, 21,3 con x2 y 25,4 con
  //   x4; a 2560x1440, 33,3 / 43,1 / 47,1. XL (16 M): 24,5 / 29,8 / 36,2.
  // - L (3,8 M): 4,3 ms sin MSAA y 4,8 con x2 o x4; a 2560x1440, 4,7 / 6,4 / 6,7.
  // - M (0,3 M): 1,8 / 2,5 / 2,7 ms; a 2560x1440, 4,2 sin MSAA y 6,4 con x4.
  // Memoria: cada muestra son 12 B por píxel (color HalfFloat + profundidad); x4 a
  // 2560x1440 son unos 180 MB de GPU, de ahí el x2 en lienzos más grandes.
  private showcaseSamples(): number {
    if (this.vertexCount / 2 > SC_MSAA_TRIS) return 0
    const px = this.renderer.domElement.width * this.renderer.domElement.height
    return px <= SC_MSAA4_PX ? 4 : 2
  }

  // Rehace el render target si la carga pide otras muestras (nueva malla, otro
  // tamaño o un corte que cruza el umbral). Solo cuando cambian: cada uno reserva
  // su memoria de GPU de nuevo.
  private syncShowcaseSamples(): void {
    const c = this.composer
    if (!c) return
    const s = this.showcaseSamples()
    if (c.renderTarget1.samples === s) return
    const rt = c.renderTarget1.clone()
    rt.samples = s
    c.reset(rt)
  }

  /**
   * Corte. La malla sigue al corte mientras se arrastra, sin esperar a soltar:
   * - En Y, al momento con drawRange sobre los trozos, y en cuanto llega del worker
   *   la tapa (la capa del corte con sus caras y su sombra, 5-15 ms) se ve la malla
   *   exacta. Lo que se ve puede ir uno o dos frames por detrás del ratón.
   * - En X y Z, los planos de recorte al momento y los trozos que cruza el plano
   *   se rehacen en el worker (pueden verse huecos hasta que llegan).
   * Lo del hilo principal que depende del corte (portal, marcos, vagonetas) se
   * rehace cuando lleva SLICE_IDLE_MS quieto o al soltar (`commitSlice`). Con `now`
   * se rehace ya (campos numéricos).
   */
  setSlice(axis: Axis, min: number, max: number, now = false): void {
    const lo = Math.min(min, max), hi = Math.max(min, max)
    if (this.slice[axis][0] !== lo || this.slice[axis][1] !== hi) {
      this.slice[axis] = [lo, hi]
      this.sliceChanged()
    }
    if (now) { this.commitSlice(); return }
    this.clearSliceTimer()
    this.sliceTimer = setTimeout(() => { this.sliceTimer = null; this.commitSlice() }, SLICE_IDLE_MS)
  }

  /** Los tres ejes de golpe (p. ej. restablecer los cortes). */
  setSlices(s: SliceRange): void {
    for (const a of ['x', 'y', 'z'] as const) this.slice[a] = [Math.min(s[a][0], s[a][1]), Math.max(s[a][0], s[a][1])]
    this.sliceChanged()
    this.commitSlice()
  }

  /** Rehace lo que depende del corte en el hilo principal si ha cambiado (al soltar el slider). */
  commitSlice(): void {
    this.clearSliceTimer()
    if (!this.model || this.sliceKey() === this.builtSliceKey) return
    this.builtSliceKey = this.sliceKey()
    this.buildEndPortal()
    this.buildItemFrames()
    this.buildMinecarts()
    this.scheduleRender()
  }

  // El corte pedido ha cambiado: se le pasa al worker y se enseña lo que se pueda ya.
  private sliceChanged(): void {
    const seq = ++this.sliceSeq
    if (this.model && this.workerModel === this.model) this.send({ type: 'slice', seq, slice: this.copySlice() })
    if (!this.model || !capLayers(this.slice, this.model.height).length) {
      // Sin corte en Y no hace falta tapa: los trozos enteros ya son la malla exacta.
      // La que hubiera se suelta (solo se oculta mientras se espera a la siguiente).
      this.showSliceY(seq, null)
      this.disposeCap()
    } else if (this.slice.y[0] !== this.dispY[0] || this.slice.y[1] !== this.dispY[1]) {
      // Se espera a la tapa, pero no más de CAP_WAIT_MS desde lo último que se enseñó.
      if (!this.capTimer) this.capTimer = setTimeout(this.capTimeout, CAP_WAIT_MS)
    }
    this.placeAll()
    this.updateClip()
    this.scheduleRender()
  }

  private capTimeout = (): void => {
    this.capTimer = null
    if (this.disposed || !this.model) return
    if (this.slice.y[0] === this.dispY[0] && this.slice.y[1] === this.dispY[1]) return
    // Sin tapa: la capa de arriba sale de los trozos, con los huecos de las caras
    // que tapaba lo de encima, hasta que llegue la buena.
    this.showSliceY(this.sliceSeq, null)
    this.placeAll()
    this.updateClip()
    this.scheduleRender()
  }

  // Pasa a enseñar el corte en Y de `seq`: el pedido sin tapa (cap = null) o el de
  // la tapa que acaba de llegar.
  private showSliceY(seq: number, cap: { slice: SliceRange; layers: number[] } | null): void {
    const y = cap ? cap.slice.y : this.slice.y
    this.dispY = [y[0], y[1]]
    this.dispSeq = seq
    this.capY = cap ? cap.layers : null
    for (const m of this.capMeshes) if (m) m.visible = !!cap
    if (this.capTimer && (!this.model || (this.slice.y[0] === this.dispY[0] && this.slice.y[1] === this.dispY[1]))) {
      clearTimeout(this.capTimer); this.capTimer = null
    }
  }

  private copySlice(): SliceRange {
    const s = this.slice
    return { x: [s.x[0], s.x[1]], y: [s.y[0], s.y[1]], z: [s.z[0], s.z[1]] }
  }

  private clearSliceTimer(): void {
    if (this.sliceTimer) { clearTimeout(this.sliceTimer); this.sliceTimer = null }
  }

  private sliceKey(): string {
    const s = this.slice
    return `${s.x[0]},${s.x[1]},${s.y[0]},${s.y[1]},${s.z[0]},${s.z[1]}`
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

  /** Vuelve al encuadre de la vista actual, con transición. */
  resetView(): void {
    if (!this.model || reducedMotion()) {
      if (this.view === 'free') this.frameFree(); else this.frameOrtho()
    } else if (this.view === 'free') {
      const fov = THREE.MathUtils.degToRad(this.perspCam.fov)
      this.tweenFree(new THREE.Vector3(), FREE_DIR, (this.boundingRadius / Math.sin(fov / 2)) * 1.1)
    } else {
      const p = this.tweenEnd()
      this.tweenOrtho(new THREE.Vector3(), p?.dir ?? this.orthoDir, p?.up ?? this.orthoUp, 1)
    }
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
    const h = this.castRay(clientX, clientY)
    return h && { x: h.x, y: h.y, z: h.z, state: h.state }
  }

  // El rayo de pick, con el punto donde entra en la celda (en el mundo): es el
  // centro de giro al orbitar.
  private castRay(clientX: number, clientY: number): { x: number; y: number; z: number; state: BlockState; point: THREE.Vector3 } | null {
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
    let tCell = tEnter   // distancia a la que el rayo entra en la celda actual
    for (let i = 0; i <= W + H + L; i++) {
      if (cx >= sx[0] && cx <= sx[1] && cy >= sy[0] && cy <= sy[1] && cz >= sz[0] && cz <= sz[1]) {
        const state = palette[blocks[(cy * L + cz) * W + cx]]
        if (state && !isAir(state.name)) return { x: cx, y: cy, z: cz, state, point: ray.at(tCell, new THREE.Vector3()) }
      }
      if (tMaxX < tMaxY && tMaxX < tMaxZ) { cx += stepX; if (cx < 0 || cx >= W) break; tCell = tMaxX; tMaxX += tDeltaX }
      else if (tMaxY < tMaxZ) { cy += stepY; if (cy < 0 || cy >= H) break; tCell = tMaxY; tMaxY += tDeltaY }
      else { cz += stepZ; if (cz < 0 || cz >= L) break; tCell = tMaxZ; tMaxZ += tDeltaZ }
    }
    return null
  }

  // ── Texto de carteles (planos con textura de canvas pegados a la cara) ──────────
  // Texto de un cartel en su hueco (SIGN_W x SIGN_H) de la página, desde (x0, y0).
  private drawSignText(ctx: CanvasRenderingContext2D, lines: string[], x0: number, y0: number): void {
    const w = SIGN_W, h = SIGN_H
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
      ctx.translate(x0 + w / 2, y0 + rowH * (i + 0.5))
      ctx.scale(scale, 1)
      ctx.fillText(text, 0, 0)
      ctx.restore()
    }
  }

  private disposeSignGroup(): void {
    if (!this.signGroup) return
    for (const c of this.signGroup.children) {
      const m = c as THREE.Mesh
      m.geometry.dispose()
      ;((m.userData.basicMat ?? m.material) as THREE.MeshBasicMaterial).map?.dispose()   // textura del texto (compartida)
      this.disposeMats(m)
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

    // Antes cada texto era un plano con su textura y su material: dos draw calls
    // por cartel (transparente y de doble cara). XL tiene 311 carteles, 627 draw
    // calls y 6,4 ms de CPU en cada frame solo en ellos. Ahora van juntos en
    // páginas de hasta SIGN_COLS x SIGN_ROWS textos, con una malla por página.
    const planes: { lines: string[]; x: number; y: number; z: number; rot: number }[] = []
    const addPlane = (lines: string[], wx: number, wy: number, wz: number, faceX: number, faceZ: number) => {
      if (!lines.some((l) => l)) return
      planes.push({ lines, x: wx, y: wy, z: wz, rot: Math.atan2(faceX, faceZ) })
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

    // Cada texto, un plano de 0,82 x 0,46 girado en Y hacia su cara (lo que antes
    // hacían PlaneGeometry, position y rotation.y), con la UV de su hueco. La
    // página va con flipY, como cualquier CanvasTexture: v = 1 arriba del canvas.
    const hw = 0.41, hh = 0.23, stride = SIGN_H + 2 * SIGN_PAD, per = SIGN_COLS * SIGN_ROWS
    for (let p0 = 0; p0 < planes.length; p0 += per) {
      const batch = planes.slice(p0, p0 + per)
      const cw = SIGN_COLS * SIGN_W, ch = Math.ceil(batch.length / SIGN_COLS) * stride
      const cv = document.createElement('canvas')
      cv.width = cw; cv.height = ch
      const ctx = cv.getContext('2d')!
      const pos = new Float32Array(batch.length * 12), uv = new Float32Array(batch.length * 8)
      const idx = new Uint16Array(batch.length * 6)
      batch.forEach((pl, i) => {
        const tx = (i % SIGN_COLS) * SIGN_W, ty = Math.floor(i / SIGN_COLS) * stride + SIGN_PAD
        this.drawSignText(ctx, pl.lines, tx, ty)
        const c = Math.cos(pl.rot), s = Math.sin(pl.rot)
        const u0 = tx / cw, u1 = (tx + SIGN_W) / cw, vt = 1 - ty / ch, vb = 1 - (ty + SIGN_H) / ch
        // Esquinas en el orden de PlaneGeometry: arriba izq., arriba der., abajo izq., abajo der.
        for (let k = 0; k < 4; k++) {
          const lx = k & 1 ? hw : -hw, ly = k < 2 ? hh : -hh
          pos[i * 12 + k * 3] = pl.x + lx * c
          pos[i * 12 + k * 3 + 1] = pl.y + ly
          pos[i * 12 + k * 3 + 2] = pl.z - lx * s
          uv[i * 8 + k * 2] = k & 1 ? u1 : u0
          uv[i * 8 + k * 2 + 1] = k < 2 ? vt : vb
        }
        const b = i * 4
        idx.set([b, b + 2, b + 1, b + 2, b + 3, b + 1], i * 6)
      })
      const tex = new THREE.CanvasTexture(cv)
      tex.anisotropy = 4
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
      geo.setIndex(new THREE.BufferAttribute(idx, 1))
      const mat = new THREE.MeshBasicMaterial({
        map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide,
        clippingPlanes: this.clipPlanes, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.renderOrder = 5
      group.add(mesh)
    }

    this.scene.add(group)
    this.signGroup = group
    this.lvGroup(group)
    if (this.showcase) { this.litGroup(group, true, false); this.requestShadowUpdate() }
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

  // ── Capa a capa, resaltado, medida, cielo y suelo ────────────────────────────
  /**
   * Capa a capa: sube o baja la cámara (y su objetivo) hasta la capa `y`, sin
   * girarla. Al entrar, con transición, para que la capa quede en el centro; al
   * pasar de capa, de golpe, para que la capa se quede donde estaba en pantalla.
   */
  followLayer(y: number, animado: boolean): void {
    if (!this.model) return
    const wy = y - this.model.height / 2 + 0.5
    const t = this.camTween
    const dy = wy - (t ? t.tgtTo.y : this.controls.target.y)
    if (Math.abs(dy) < 1e-6) return
    if (animado && !reducedMotion()) {
      const p = this.camPose()
      const tgt = p.target.clone().setY(wy)
      if (this.view === 'free') this.tweenFree(tgt, p.dir, p.dist)
      else this.tweenOrtho(tgt, p.dir, p.up, this.orthoCam.zoom)
    } else if (t) {
      // En plena transición: que acabe a la altura nueva.
      t.tgtTo.y += dy
    } else {
      this.activeCam.position.y += dy
      this.controls.target.y += dy
      this.controls.update()
    }
    this.scheduleRender()
  }

  /**
   * Capa fantasma (capa a capa): la capa `y` entera dentro del corte en X/Z,
   * semitransparente y sin sombra suave, o ninguna. La de antes se queda hasta
   * que llega la nueva (unos ms), para que al pasar de capa no parpadee.
   */
  setGhostLayer(y: number | null): void {
    if (y === this.ghostY) return
    this.ghostY = y
    if (y === null) this.disposeGhost()
    // El suelo va bajo la capa fantasma (ver floorLayer).
    if (this.floorOn) { this.syncFloor(); this.requestShadowUpdate() }
    if (this.model && this.workerModel === this.model) this.send({ type: 'ghost', y })
    this.scheduleRender()
  }

  private applyGhost(o: Extract<MesherOut, { type: 'ghost' }>): void {
    if (o.y !== this.ghostY) return   // ya se ha pedido otra
    if (o.y === null) { this.disposeGhost(); this.scheduleRender(); return }
    const s = o.slice
    for (let k = 0; k < KINDS; k++) {
      const g = o.geo[k]
      let m = this.ghostMeshes[k]
      if (!g) {
        if (m) { m.geometry.dispose(); this.chunkRoot.remove(m); this.ghostMeshes[k] = null }
        continue
      }
      const geo = this.rawToGeo(g, [s.x[0], o.y, s.z[0], s.x[1], o.y, s.z[1]])
      if (m) { m.geometry.dispose(); m.geometry = geo }
      else {
        m = new THREE.Mesh(geo, k === KIND_ENTITY ? this.ghostEntMat : this.ghostMat)
        m.matrixAutoUpdate = false
        // Lo primero de lo transparente (todo lo opaco va antes): el agua o el
        // cristal de la capa de encima se mezclan sobre ella y no al revés.
        m.renderOrder = 0.25
        this.chunkRoot.add(m)
        this.ghostMeshes[k] = m
      }
    }
    this.scheduleRender()
  }

  private disposeGhost(): void {
    for (let k = 0; k < this.ghostMeshes.length; k++) {
      const m = this.ghostMeshes[k]
      if (m) { m.geometry.dispose(); this.chunkRoot.remove(m); this.ghostMeshes[k] = null }
    }
  }

  /**
   * Resalta los bloques de estas entradas de paleta y deja el resto en fantasma
   * (null o vacío = nada). Vale para lo que se vea con el corte que haya.
   */
  setHighlightPalette(pals: readonly number[] | null): void {
    this.hiData.fill(0)
    let any = false
    if (pals) for (const p of pals) if (p >= 0 && p < HI_W * HI_H - 1) { this.hiData[p] = 255; any = true }
    if (!any && this.hiUniforms.hiOn.value === 0) return
    this.hiUniforms.hiOn.value = any ? 1 : 0
    this.hiTex.needsUpdate = true
    this.scheduleRender()
  }

  // El resaltado en el shader de las mallas de bloques: lo no resaltado pierde el
  // color, se oscurece y se queda en uno de cada cuatro píxeles (una trama que deja
  // ver lo de detrás sin ordenar transparencias ni dibujar dos veces); lo resaltado
  // tira a naranja, que la piedra gris no se distinguía de la trama gris. Sin
  // resaltado (hiOn 0) no cambia nada: las miniaturas salen igual.
  private patchHighlight(mat: THREE.Material): void {
    mat.onBeforeCompile = (sh) => { this.hlPatch(sh); this.lvPatch(sh) }
    mat.customProgramCacheKey = () => 'lv-resaltar-noche'
    this.lvDefaults(mat)
  }

  // Sin el atributo `lit` (malla sin luz, marcos, vagonetas...): luz de cielo plena,
  // sin luz de bloque.
  private lvDefaults(mat: THREE.Material): void {
    ;(mat as unknown as { defaultAttributeValues: Record<string, number[]> }).defaultAttributeValues = { lit: [0, 1, 1, 0] }
  }

  // Luz de vanilla de la vista normal (ver lvU): la curva de brillo del juego con el
  // brillo al 50 %, la luz de cielo según la hora (algo azulada de noche) más la de
  // bloque, cálida. De día (lvNight 0) no cambia nada: las miniaturas salen igual.
  private lvPatch = (sh: THREE.WebGLProgramParametersWithUniforms): void => {
    sh.uniforms.lvNight = this.lvU.lvNight
    sh.uniforms.lvSkyK = this.lvU.lvSkyK
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>
attribute vec4 lit;
varying vec2 vLvLit;`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
vLvLit = lit.xy;`)
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
uniform float lvNight;
uniform float lvSkyK;
varying vec2 vLvLit;
float lvCurva(float f) {
  float c = f / (4.0 - 3.0 * f);
  return mix(c, 1.0 - pow(1.0 - c, 4.0), 0.5);
}
vec3 lvLuz() {
  if (lvNight <= 0.0) return vec3(1.0);
  vec3 sky = lvCurva(clamp(vLvLit.y * lvSkyK, 0.0, 1.0)) * mix(vec3(1.0), vec3(0.72, 0.78, 1.0), lvNight);
  vec3 blk = lvCurva(clamp(vLvLit.x, 0.0, 1.0)) * vec3(1.0, 0.86, 0.66);
  return mix(vec3(1.0), max(min(sky + blk, vec3(1.0)), vec3(0.03)), lvNight);
}`)
      .replace('vec3 outgoingLight = reflectedLight.indirectDiffuse;', 'vec3 outgoingLight = reflectedLight.indirectDiffuse * lvLuz();')
  }

  // La luz de vanilla también en los marcos, vagonetas, mobs y carteles (sus
  // materiales de siempre; los de exhibición van aparte).
  private lvGroup(group: THREE.Group | null): void {
    for (const o of group?.children ?? []) {
      const m = (o as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined
      if (!m || !(m as THREE.MeshBasicMaterial).isMeshBasicMaterial || m.userData.lv) continue
      m.userData.lv = true
      const prev = m.onBeforeCompile
      m.onBeforeCompile = (sh, r) => { prev.call(m, sh, r); this.lvPatch(sh) }
      const key = m.customProgramCacheKey.bind(m)
      m.customProgramCacheKey = () => key() + '-noche'
      this.lvDefaults(m)
      m.needsUpdate = true
    }
  }
  // El parche en sí: también va delante del de los materiales de exhibición.
  private hlPatch = (sh: THREE.WebGLProgramParametersWithUniforms): void => {
    const u = this.hiUniforms
    sh.uniforms.hiOn = u.hiOn
    sh.uniforms.hiMask = u.hiMask
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>
attribute float palIdx;
uniform float hiOn;
uniform sampler2D hiMask;
varying float vHi;`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
vHi = 1.0;
if (hiOn > 0.5) {
  int hp = int(palIdx + 0.5);
  vHi = texelFetch(hiMask, ivec2(hp % ${HI_W}, hp / ${HI_W}), 0).r;
}`)
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
uniform float hiOn;
varying float vHi;`)
      .replace('#include <color_fragment>', `#include <color_fragment>
if (hiOn > 0.5) {
  if (vHi < 0.5) {
    ivec2 hq = ivec2(gl_FragCoord.xy);
    if (((hq.x | hq.y) & 1) != 0) discard;
    float hl = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
    diffuseColor.rgb = vec3(hl * 0.4 + 0.08);
  } else {
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(1.0, 0.56, 0.18), 0.3);
  }
}`)
  }

  /**
   * Cielo de día de Minecraft detrás de la build en la vista normal (tapa el color de
   * fondo). En exhibición no se ve: va el cielo del atardecer.
   */
  setSky(on: boolean): void {
    if (on === this.skyOn) return
    this.skyOn = on
    this.syncSky()
    this.scheduleRender()
  }

  /**
   * Hora del cielo de Minecraft (horas, 12 = mediodía): el cielo y la luz de la build
   * como en el juego. Solo uniforms; la primera vez que se hace de noche, la malla se
   * pide con la luz de bloque (una vez, en el worker).
   */
  setNormalTime(h: number): void {
    this.normalHour = h
    // Con el cielo a la vista, lo que se ve la sigue suave (ver stepTime).
    if (!this.vsky?.visible || reducedMotion()) {
      this.normalShown = h
      this.vsky?.setTime(h)
    }
    this.syncNormalLight()
    this.scheduleRender()
  }
  get normalTime(): number { return this.normalHour }

  // Si a la hora del cielo de Minecraft ya hace falta la luz de bloque.
  private wantsNight(): boolean {
    return this.skyOn && !this.showcase && luzDeDia(this.normalHour) < 0.95
  }

  // La luz, la de la hora que se ve; la malla con luz de bloque se pide ya con la
  // pedida (wantsNight), para que llegue antes.
  private syncNormalLight(): void {
    const b = this.skyOn && !this.showcase ? luzDeDia(this.normalShown) : 1
    this.lvU.lvNight.value = 1 - b
    this.lvU.lvSkyK.value = 0.33 + 0.67 * b
    if (this.wantsNight() && !this.nightLatch && this.model) {
      this.nightLatch = true
      if (!this.deferredBuild) {
        if (!this.builtLight) this.rebuildMesh()
        else this.sendLight(true)
      }
    }
  }

  private syncSky(): void {
    this.syncNormalLight()
    const vis = this.skyOn && !this.showcase
    if (vis && !this.vsky) {
      this.vsky = new VanillaSky(() => this.scheduleRender())
      this.vsky.setTime(this.normalShown)
      this.scene.add(this.vsky.mesh, this.vsky.clouds)
    }
    if (!this.vsky) return
    this.vsky.visible = vis
    if (this.model) {
      // Por encima del tope, tanto más cuanto más grande es la build: así a esa
      // distancia las celdas se ven del tamaño que en el juego.
      const m = this.model
      const sobre = Math.max(SKY_CLOUD_H, 1.5 * Math.max(m.width, m.length))
      // Más altas, más lejos tienen que llegar para seguir llenando el cielo.
      this.vsky.setClouds(m.height / 2 + sobre, Math.max(800, this.boundingRadius * 8, sobre * 8))
    }
  }

  /**
   * Suelo de césped bajo la build, hasta el horizonte. En exhibición recibe la
   * sombra del sol y la luz como los bloques; no proyecta sombra.
   */
  setFloor(on: boolean): void {
    if (on === this.floorOn) return
    this.floorOn = on
    this.syncFloor()
    this.requestShadowUpdate()   // con el suelo, el mapa del sol llega más lejos (renderScShadow)
    this.scheduleRender()
  }
  get floorVisible(): boolean { return !!this.floor?.visible }

  // Capa sobre la que se apoya el suelo: la más baja con bloques, o la de abajo del
  // corte en Y si se corta por abajo (sube con lo que se ve). En capa
  // a capa, bajo la capa fantasma: encima taparía la fantasma.
  private floorLayer(): number {
    let y = Math.max(this.floorBase, this.dispY[0])
    if (this.ghostY !== null) y = Math.min(y, this.ghostY)
    return y
  }

  private syncFloor(): void {
    const m = this.model
    if (!this.floorOn || !m) { if (this.floor) this.floor.visible = false; return }
    if (this.floorTexAtlas !== this.atlas || !this.floorTex) this.makeFloorTex()
    if (this.floorFor !== m) {
      this.floorBase = lowestLayer(m)
      this.floorU.flHalf.value.set(m.width / 2, m.length / 2)
      this.floorFor = m
    }
    if (!this.floor) {
      // Triángulo que cubre la pantalla (como el cielo): el plano lo pone el shader.
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3))
      geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(6), 2))
      this.floor = new THREE.Mesh(geo, this.floorMaterial())
      this.floor.frustumCulled = false
      // Lo primero de lo transparente: el agua, el cristal y la capa fantasma van
      // encima.
      this.floor.renderOrder = -1
      const u = this.floorU
      this.floor.onBeforeRender = (_r, _s, cam) => {
        u.flInvProj.value.copy(cam.projectionMatrixInverse)
        u.flCamWorld.value.copy(cam.matrixWorld)
        u.flProj.value.copy(cam.projectionMatrix)
      }
      this.scene.add(this.floor)
    }
    this.floor.material = this.floorMaterial()
    this.floorU.flY.value = this.floorLayer() - m.height / 2 - FLOOR_EPS
    this.floor.visible = true
  }

  // Material del suelo para el modo actual. El de exhibición, el de los bloques con
  // la textura del césped (cara de arriba: sin el sombreado por cara que deshacer).
  // Escribe profundidad: por debajo tapa también el agua, el cristal y la capa
  // fantasma, que se pintan después.
  private floorMaterial(): THREE.MeshBasicMaterial {
    const params: THREE.MeshBasicMaterialParameters = { map: this.floorTex, transparent: true, depthWrite: true }
    if (this.showcase && this.sc) {
      if (!this.floorLit) {
        const mat = this.sc.material('solid', params, (sh) => this.floorPatch(sh))
        const key = mat.customProgramCacheKey.bind(mat)
        mat.customProgramCacheKey = () => key() + '-suelo'
        // Detrás del parche de exhibición: su posición (vScPos) es la del plano en
        // ese píxel, no la del triángulo.
        const ob = mat.onBeforeCompile.bind(mat)
        mat.onBeforeCompile = (sh, r) => {
          ob(sh, r)
          sh.fragmentShader = sh.fragmentShader
            .replace('varying vec3 vScPos;', 'vec3 vScPos;')
            .replace('vec3 outgoingLight = scShade(diffuseColor);', 'vScPos = flP;\n\tvec3 outgoingLight = scShade(diffuseColor);')
        }
        this.floorLit = mat
      }
      return this.floorLit
    }
    if (!this.floorMat) {
      this.floorMat = new THREE.MeshBasicMaterial(params)
      this.floorMat.onBeforeCompile = (sh) => { this.floorPatch(sh); this.lvPatch(sh) }
      this.floorMat.customProgramCacheKey = () => 'lv-suelo'
      this.lvDefaults(this.floorMat)
    }
    return this.floorMat
  }

  // El suelo en el shader. Cada píxel corta su rayo con el plano y pinta ese punto con
  // la profundidad que le toca (gl_FragDepth): llega hasta el horizonte sin abrir el
  // near y el far, que van ajustados a la build (ver updateNearFar) y perderían
  // precisión. Lo que cae más allá del far va al fondo y lo que queda antes del near,
  // delante: es lo que hay. La textura va en coordenadas del mundo, una por bloque y
  // alineada con ellos; de lejos, sus mipmaps la dejan en su color medio (sin
  // moiré). Es opaco hasta el horizonte, que queda como una línea nítida contra el
  // cielo o el fondo, suavizada solo en su píxel (la MSAA no llega a lo que corta el
  // shader).
  //
  // Es macizo, como el terreno del juego: con la cámara por debajo, mirando hacia
  // arriba se ve su cara de abajo, de tierra y a la sombra, y en cualquier otra
  // dirección se está dentro de la tierra y la pantalla entera es tierra, delante de
  // todo. En las vistas planas no: con la de abajo no se vería la build.
  private floorPatch(sh: THREE.WebGLProgramParametersWithUniforms): void {
    Object.assign(sh.uniforms, this.floorU)
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>
varying vec2 vFlNdc;`)
      .replace('#include <project_vertex>', `#include <project_vertex>
gl_Position = vec4(position.xy, 0.0, 1.0);
vFlNdc = position.xy;`)
    // Esto va delante de <common>: el parche de exhibición mete su GLSL justo detrás,
    // y su luz y su niebla miran si es el suelo (SC_SUELO, ver scShade y scAerial).
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#define SC_SUELO
#define SC_SUELO_ALB 1.0
#define SC_SUELO_FILL scSueloFill
uniform vec2 flHalf;
uniform float flY;
uniform mat4 flInvProj;
uniform mat4 flCamWorld;
uniform mat4 flProj;
uniform sampler2D flDirt;
varying vec2 vFlNdc;
vec3 flP;     // el punto del plano en este píxel
float flCov;  // cuánto del píxel es suelo (1 salvo en la línea del horizonte)
bool flBajo;  // la cámara está por debajo del suelo
bool flDentro;  // y este píxel no mira a la cara de abajo: dentro de la tierra
#include <common>`)
      .replace('#include <clipping_planes_fragment>', `{
  vec4 fa = flInvProj * vec4(vFlNdc, -1.0, 1.0);
  vec4 fb = flInvProj * vec4(vFlNdc, 1.0, 1.0);
  vec3 pa = (flCamWorld * vec4(fa.xyz / fa.w, 1.0)).xyz;
  vec3 pb = (flCamWorld * vec4(fb.xyz / fb.w, 1.0)).xyz;
  vec3 rd = normalize(pb - pa);
  vec3 ro = isOrthographic ? pa : cameraPosition;
  flBajo = ro.y <= flY;
  if (flBajo) {
    // Toda la build queda por encima del suelo, así que desde debajo no se ve nada
    // más: delante de todo (también de las nubes, que se colaban por el horizonte).
    if (isOrthographic) discard;
    flCov = 1.0;
    flDentro = rd.y <= 1e-6;
    flP = flDentro ? ro : ro + rd * ((flY - ro.y) / rd.y);
    gl_FragDepth = 0.0;
  } else {
    flDentro = false;
    flCov = clamp(0.5 - rd.y / max(fwidth(rd.y), 1e-7), 0.0, 1.0);
    // En las vistas planas de lado queda de canto.
    if (flCov <= 0.0 || (isOrthographic && rd.y > -1e-4)) discard;
    flP = ro + rd * ((flY - ro.y) / min(rd.y, -1e-6));
    vec4 fc = flProj * viewMatrix * vec4(flP, 1.0);
    gl_FragDepth = clamp(fc.z / fc.w * 0.5 + 0.5, 0.0, 1.0);
  }
}
#include <clipping_planes_fragment>`)
      // Dentro de la tierra, su color medio (el último mipmap): con el texel de donde
      // está la cámara, toda la pantalla cambiaba de tono al moverse y parpadeaba.
      .replace('#include <map_fragment>', `vec3 flTierra = flDentro ? texture2D(flDirt, vec2(0.5), 16.0).rgb : texture2D(flDirt, flP.xz + flHalf).rgb;
diffuseColor *= flBajo ? vec4(flTierra * 0.45, 1.0) : texture2D(map, flP.xz + flHalf);
diffuseColor.a *= flCov;`)
      // Por debajo, la tierra a la sombra tal cual: sin el sol ni la hora que le
      // pondría la luz de su cara de arriba.
      .replace('#include <opaque_fragment>', `#include <opaque_fragment>
if (flBajo) gl_FragColor.rgb = diffuseColor.rgb;`)
  }

  // Las texturas del suelo, sacadas del atlas (las del pack de texturas que haya) a
  // texturas suyas que se repiten una vez por bloque: pixeladas de cerca y con sus
  // mipmaps (las del atlas no valen para repetir). Arriba, la del césped con el tinte
  // de llanura, como el bloque de césped; por debajo, la de la tierra.
  private makeFloorTex(): void {
    this.floorTex?.dispose()
    this.floorDirtTex?.dispose()
    this.floorTexAtlas = this.atlas
    this.floorTex = this.floorTile('grass_block_top', GRASS, '#5f8a3a', 'Suelo.cesped')
    this.floorDirtTex = this.floorTile('dirt', null, '#79553a', 'Suelo.tierra')
    this.floorU.flDirt.value = this.floorDirtTex
    for (const mat of [this.floorMat, this.floorLit]) if (mat) { mat.map = this.floorTex; mat.needsUpdate = true }
  }

  // Una casilla del atlas como textura que se repite, teñida si hace falta. Sin
  // atlas, su color medio en vanilla.
  private floorTile(tile: string, tint: readonly [number, number, number] | null, fallback: string, name: string): THREE.Texture {
    const a = this.atlas
    const d = a?.getRawData()
    const idx = a?.tileIndex(tile)
    const cell = d?.cell ?? 16
    const cv = document.createElement('canvas')
    cv.width = cv.height = cell
    const ctx = cv.getContext('2d')!
    const img = a?.texture.image as CanvasImageSource | undefined
    if (a && d && idx !== undefined && img) {
      const st = strideOf(d)
      ctx.drawImage(img, (idx % d.cols) * st + d.pad, Math.floor(idx / d.cols) * st + d.pad, cell, cell, 0, 0, cell, cell)
      if (tint) {
        const px = ctx.getImageData(0, 0, cell, cell)
        for (let i = 0; i < px.data.length; i += 4) {
          px.data[i] *= tint[0]; px.data[i + 1] *= tint[1]; px.data[i + 2] *= tint[2]
        }
        ctx.putImageData(px, 0, 0)
      }
    } else {
      ctx.fillStyle = fallback
      ctx.fillRect(0, 0, cell, cell)
    }
    const t = new THREE.CanvasTexture(cv)
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.magFilter = THREE.NearestFilter
    t.minFilter = THREE.LinearMipmapLinearFilter
    t.generateMipmaps = true
    t.flipY = false
    t.anisotropy = 8
    t.name = name
    return t
  }

  private disposeFloorMesh(): void {
    if (!this.floor) return
    this.floor.geometry.dispose()
    this.scene.remove(this.floor)
    this.floor = null
    this.floorFor = null
  }

  /** Medida entre dos celdas: contorno en la segunda y una línea entre centros (null = quitarla). */
  setMeasure(a: { x: number; y: number; z: number } | null, b: { x: number; y: number; z: number } | null): void {
    if (!a || !b || !this.model) {
      if (this.measureBox) this.measureBox.visible = false
      this.cota = null
      for (const l of this.cotaLines) l.visible = false
      if (this.cotaLabels) this.cotaLabels.style.display = 'none'
      this.scheduleRender()
      return
    }
    const { width: W, height: H, length: L } = this.model
    const ca = new THREE.Vector3(a.x - W / 2 + 0.5, a.y - H / 2 + 0.5, a.z - L / 2 + 0.5)
    const cb = new THREE.Vector3(b.x - W / 2 + 0.5, b.y - H / 2 + 0.5, b.z - L / 2 + 0.5)
    if (!this.measureBox) {
      const box = new THREE.BoxGeometry(1.001, 1.001, 1.001)
      this.measureBox = new THREE.LineSegments(new THREE.EdgesGeometry(box), this.measureMat)
      box.dispose()
      this.measureBox.renderOrder = 999
      this.measureBox.frustumCulled = false
      this.scene.add(this.measureBox)
    }
    this.measureBox.position.copy(cb)
    this.measureBox.visible = true
    this.cota = { a: ca, b: cb }
    if (!this.cotaGeo) {
      this.cotaGeo = new LineSegmentsGeometry()
      // Tenue donde algo la tapa (sin prueba de profundidad) y entera donde se ve.
      const tenue = new LineMaterial({ vertexColors: true, linewidth: 2, transparent: true, opacity: 0.35, depthTest: false, depthWrite: false })
      const entera = new LineMaterial({ vertexColors: true, linewidth: 3, transparent: true, depthWrite: false })
      this.cotaMats = [tenue, entera]
      this.cotaLines = this.cotaMats.map((m, i) => {
        const l = new LineSegments2(this.cotaGeo!, m)
        l.renderOrder = 997 + i
        l.frustumCulled = false
        this.scene.add(l)
        return l
      })
    }
    for (const l of this.cotaLines) l.visible = true
    this.buildCotaLabels()
    this.updateCota()
    this.scheduleRender()
  }

  // Colores de los ejes de las cotas y de la recta.
  private static COTA_COL = { x: '#F0624D', y: '#5BCB6E', z: '#4E9BF7', d: '#5EC8F2' }

  // Las etiquetas: la de la recta (bloques en línea recta) y las de cada eje con su
  // cuenta contando los dos bloques. Las de los ejes que no cambian, fuera.
  private buildCotaLabels(): void {
    const c = this.cota
    if (!c) return
    const host = this.canvas.parentElement
    if (!host) return
    if (!this.cotaLabels) {
      const box = document.createElement('div')
      box.setAttribute('aria-hidden', 'true')
      Object.assign(box.style, { position: 'absolute', pointerEvents: 'none', overflow: 'hidden', zIndex: '1' })
      host.insertBefore(box, this.canvas.nextSibling)
      this.cotaLabels = box
    }
    const box = this.cotaLabels
    box.style.display = ''
    box.textContent = ''
    const d = { x: Math.abs(c.b.x - c.a.x), y: Math.abs(c.b.y - c.a.y), z: Math.abs(c.b.z - c.a.z) }
    const ejes = (['x', 'y', 'z'] as const).filter((k) => d[k] > 0.5)
    const col = SchematicViewer.COTA_COL
    const add = (key: string, txt: string, color: string, grande: boolean) => {
      const el = document.createElement('span')
      el.dataset.cota = key
      el.textContent = txt
      Object.assign(el.style, {
        position: 'absolute', left: '0', top: '0', whiteSpace: 'nowrap', willChange: 'transform',
        font: `${grande ? 700 : 600} ${grande ? 13 : 12}px/1 system-ui, -apple-system, Segoe UI, sans-serif`,
        color: grande ? '#F5F5F0' : color, padding: grande ? '4px 7px' : '3px 6px', borderRadius: '6px',
        background: 'rgba(13,13,15,.86)', border: `1.5px solid ${color}`, boxShadow: '0 2px 8px rgba(0,0,0,.45)',
        fontVariantNumeric: 'tabular-nums',
      })
      box.appendChild(el)
    }
    for (const k of ejes) add(k, String(Math.round(d[k]) + 1), col[k], false)
    // La recta: si solo cambia un eje, coincide con su cota y no hace falta.
    if (ejes.length > 1) {
      const n = Math.hypot(d.x, d.y, d.z)
      add('d', `${n.toLocaleString('es-ES', { maximumFractionDigits: 1 })} bloques`, col.d, true)
    }
  }

  // Cada frame con medida: los topes, del mismo tamaño en pantalla a cualquier
  // distancia, y las etiquetas en su sitio.
  private updateCota(): void {
    const c = this.cota, geo = this.cotaGeo
    if (!c || !geo) return
    const cam = this.activeCam
    cam.updateMatrixWorld()
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight
    // Bloques por píxel a la distancia de p (para que los topes midan ~9 px).
    const bpp = (p: THREE.Vector3) => this.view === 'free'
      ? 2 * p.distanceTo(this.perspCam.position) * Math.tan(THREE.MathUtils.degToRad(this.perspCam.fov) / 2) / Math.max(1, h)
      : (this.orthoCam.top - this.orthoCam.bottom) / (this.orthoCam.zoom || 1) / Math.max(1, h)
    const { a, b } = c
    const p1 = new THREE.Vector3(b.x, a.y, a.z), p2 = new THREE.Vector3(b.x, b.y, a.z)
    const segs: [THREE.Vector3, THREE.Vector3, 'x' | 'y' | 'z'][] = []
    if (Math.abs(b.x - a.x) > 0.5) segs.push([a, p1, 'x'])
    if (Math.abs(b.y - a.y) > 0.5) segs.push([p1, p2, 'y'])
    if (Math.abs(b.z - a.z) > 0.5) segs.push([p2, b, 'z'])
    // Los topes: en vertical para X y Z; para Y, en el eje horizontal que mejor se vea.
    const fwd = new THREE.Vector3(); cam.getWorldDirection(fwd)
    const tickY = Math.abs(fwd.x) < Math.abs(fwd.z) ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 0, 1)
    const pos: number[] = [], cols: number[] = []
    const colOf = (hex: string) => { const k = parseInt(hex.slice(1), 16); return [(k >> 16 & 255) / 255, (k >> 8 & 255) / 255, (k & 255) / 255] }
    const col = SchematicViewer.COTA_COL
    const line = (p: THREE.Vector3, q: THREE.Vector3, rgb: number[]) => { pos.push(p.x, p.y, p.z, q.x, q.y, q.z); cols.push(...rgb, ...rgb) }
    for (const [p, q, k] of segs) {
      const rgb = colOf(col[k])
      line(p, q, rgb)
      const t = k === 'y' ? tickY : new THREE.Vector3(0, 1, 0)
      for (const e of [p, q]) {
        const len = bpp(e) * 9
        line(e.clone().addScaledVector(t, -len), e.clone().addScaledVector(t, len), rgb)
      }
    }
    if (segs.length > 1) line(a, b, colOf(col.d))
    geo.setPositions(pos)
    geo.setColors(cols)
    // Grosor en píxeles CSS (con la pantalla a 2x, igual de gruesas).
    for (const m of this.cotaMats) m.resolution.set(Math.max(1, w), Math.max(1, h))
    // Etiquetas: en el centro de cada segmento, proyectado a pantalla.
    const box = this.cotaLabels
    if (!box) return
    const cv = this.canvas
    Object.assign(box.style, { left: `${cv.offsetLeft}px`, top: `${cv.offsetTop}px`, width: `${w}px`, height: `${h}px` })
    const v = new THREE.Vector3()
    for (const el of Array.from(box.children) as HTMLElement[]) {
      const k = el.dataset.cota as 'x' | 'y' | 'z' | 'd'
      const seg = segs.find((sg) => sg[2] === k)
      if (k === 'd') v.copy(a).add(b).multiplyScalar(0.5)
      else if (seg) v.copy(seg[0]).add(seg[1]).multiplyScalar(0.5)
      else { el.style.display = 'none'; continue }
      v.project(cam)
      if (v.z > 1 || v.z < -1) { el.style.display = 'none'; continue }
      el.style.display = ''
      el.style.transform = `translate(${((v.x + 1) / 2 * w).toFixed(1)}px, ${((1 - v.y) / 2 * h).toFixed(1)}px) translate(-50%, -50%)`
    }
  }


  /** Vuelve a avisar del norte (onHeading) en el próximo frame aunque la cámara no se mueva. */
  requestHeading(): void {
    this.lastHeading = NaN
    this.scheduleRender()
  }

  // Norte en pantalla para la brújula: la dirección de la mirada en el suelo (más
  // el "arriba" de la cámara, que es lo que vale mirando en vertical).
  private emitHeading(): void {
    const q = this.activeCam.quaternion
    const f = this._hq.set(0, 0, -1).applyQuaternion(q)
    const u = this._hu.set(0, 1, 0).applyQuaternion(q)
    const vx = f.x + u.x, vz = f.z + u.z
    if (vx * vx + vz * vz < 1e-10) return
    const h = Math.atan2(-vx, -vz)
    if (Math.abs(h - this.lastHeading) < 1e-3) return
    this.lastHeading = h
    this.onHeading!(h)
  }

  /** Resuelve cuando no hay ningún rebuild en curso ni pendiente. */
  async waitForIdle(): Promise<void> {
    // Los assets de mobs se bajan aparte y al vuelo: hay que esperarlos o la
    // miniatura sale sin ellos.
    if (this.mobLoadP) await this.mobLoadP
    // Lo que está en espera (primera malla aguardando el manifiesto, corte aún sin
    // asentar) se lanza ya: si no, aquí no habría nada "en curso" y la captura
    // saldría sin malla.
    this.flushDeferredBuild()
    this.commitSlice()
    // El worker ha terminado la última build y el último corte (la tapa llega
    // antes que su 'done'), y lo que esperaba a subirse se pone ya, sin repartir.
    const idle = () => this.disposed || !this.model || this.workerModel !== this.model ||
      (this.doneGen >= this.meshGen && this.doneSeq >= this.sliceSeq)
    while (!idle()) await new Promise((r) => setTimeout(r, 16))
    this.flushUploads(Infinity)
    this.scheduleRender()
  }

  /** Si no queda nada por mallar ni por subir a la GPU. */
  get meshIdle(): boolean {
    return !this.model || this.workerModel !== this.model ||
      (this.doneGen >= this.meshGen && this.doneSeq >= this.sliceSeq && this.uploadHead >= this.uploadQ.length)
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
    // Las miniaturas del catálogo, sin suelo ni cielo.
    const floorVis = this.floor?.visible ?? false
    if (this.floor) this.floor.visible = false
    const skyVis = this.vsky?.visible ?? false
    if (this.vsky) this.vsky.visible = false
    const night = this.lvU.lvNight.value
    this.lvU.lvNight.value = 0

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

    this.flushUploads(Infinity)   // todos los trozos, aunque no les haya tocado subir aún
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

    // Restaurar. La imagen ya está copiada en `out` (2D), así que el contexto WebGL
    // temporal se suelta del todo: dispose() solo no lo libera, y con varias
    // capturas seguidas el navegador acaba expulsando contextos.
    this.scene.background = prevBg
    if (this.floor) this.floor.visible = floorVis
    if (this.vsky) this.vsky.visible = skyVis
    this.lvU.lvNight.value = night
    tmpRenderer.dispose()
    tmpRenderer.forceContextLoss()
    this.scheduleRender()
    return blob
  }
  /** Vértices que se dibujan (los de las capas que enseña el corte en Y, sin frustum culling). */
  get vertexCount(): number {
    let n = 0
    this.forEachMesh((m) => {
      if (!m.visible) return
      const g = m.geometry
      const idx = g.index?.count ?? 0
      n += (Math.min(g.drawRange.count, idx - g.drawRange.start) / 6) * 4
    })
    return n
  }

  /** Bytes de los búferes de la malla de bloques (lo que ocupa en la GPU). */
  get meshBytes(): number {
    // Una vez cada búfer: las dos mallas de lo translúcido de la tapa los comparten.
    const seen = new Set<unknown>()
    let n = 0
    const add = (a: THREE.BufferAttribute | THREE.InterleavedBufferAttribute | null) => {
      if (!a || seen.has(a)) return
      seen.add(a)
      n += (a as THREE.BufferAttribute).array.byteLength
    }
    this.forEachMesh((m) => {
      const g = m.geometry
      for (const a of Object.values(g.attributes)) add(a)
      add(g.index)
    })
    return n
  }

  /** Número de mallas de bloques (cada una es una draw call si se ve). */
  get meshCount(): number {
    let n = 0
    this.forEachMesh(() => { n++ })
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
    this.disposed = true
    cancelAnimationFrame(this.rafId)
    this.clearSliceTimer()
    if (this.deferredBuild) { clearTimeout(this.deferredBuild); this.deferredBuild = null }
    this.io?.disconnect()
    document.removeEventListener('visibilitychange', this.onVisibility)
    this.disposeEndPortal()
    this.disposeItemFrames()
    this.disposeMinecarts()
    // Texturas propias del visor (el atlas de bloques NO: es compartido, ver
    // resources.ts). entityMat.map es la base o la de skins; se juntan en un Set
    // para no liberar dos veces la misma.
    const texs = new Set([this.itemAtlasTex, this.customEntityTex, this.baseEntityTex, this.entityMat.map, this.mobTex])
    for (const t of texs) t?.dispose()
    this.mobMat?.dispose()
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
    window.removeEventListener('blur', this.onWindowBlur)
    this.canvas.removeEventListener('pointerdown', this.onPtrDown)
    this.canvas.removeEventListener('pointermove', this.onPtrMove)
    this.canvas.removeEventListener('pointerup', this.onPtrUp)
    this.canvas.removeEventListener('pointercancel', this.onPtrUp)
    this.canvas.removeEventListener('wheel', this.onWheel)
    this.canvas.removeEventListener('pointerenter', this.onPtrEnter)
    this.canvas.removeEventListener('pointerleave', this.onPtrLeave)
    this.canvas.removeEventListener('contextmenu', this.onContextMenu)
    // OrbitControls quita su keydown de canvas.getRootNode(), que con el lienzo ya
    // fuera de la página no es el document: se quedaba puesto y retenía el visor.
    const ic = (this.controls as unknown as { _interceptControlDown?: EventListener })._interceptControlDown
    if (ic) this.canvas.ownerDocument.removeEventListener('keydown', ic, { capture: true })
    this.controls.dispose()
    this.onTap = undefined
    this.onRebuild = undefined
    this.worker?.terminate()
    this.worker = null
    // Sin worker seguiría mallando a ratos en el hilo principal hasta acabar la build.
    this.localMesher?.stop()
    this.localMesher = null
    this.clearChunks()
    if (this.highlight) { this.highlight.geometry.dispose(); this.scene.remove(this.highlight) }
    if (this.highlightPair) { this.highlightPair.geometry.dispose(); this.scene.remove(this.highlightPair) }
    this.highlightMat.dispose()
    if (this.measureBox) { this.measureBox.geometry.dispose(); this.scene.remove(this.measureBox) }
    this.measureMat.dispose()
    for (const l of this.cotaLines) this.scene.remove(l)
    this.cotaGeo?.dispose()
    for (const m of this.cotaMats) m.dispose()
    this.cotaLabels?.remove()
    this.cotaLabels = null
    this.disposeGhost()
    this.ghostMat.dispose()
    this.ghostEntMat.dispose()   // su textura es la de entityMat: se suelta arriba
    this.hiTex.dispose()
    this.disposeFloorMesh()
    this.floorTex?.dispose()
    this.floorDirtTex?.dispose()
    this.floorMat?.dispose()   // el de exhibición se suelta con los de Showcase (sc.dispose)
    this.onHeading = undefined
    this.disposeSignGroup()
    this.opaqueMat.dispose()
    this.transMat.dispose()
    this.entityMat.dispose()
    if (this.scIdleTimer) { clearTimeout(this.scIdleTimer); this.scIdleTimer = null }
    if (this.skyTimer) { clearTimeout(this.skyTimer); this.skyTimer = null }
    if (this.scReadyTimer) { clearTimeout(this.scReadyTimer); this.scReadyTimer = null }
    this.endFade()
    this.onShowcasePrep = undefined
    if (this.vsky) { this.scene.remove(this.vsky.mesh, this.vsky.clouds); this.vsky.dispose(); this.vsky = null }
    this.composer?.dispose()
    this.bloomPass?.dispose()
    this.gradePass?.dispose()
    // Los materiales de exhibición (también los de los grupos), el cielo y la sombra.
    this.sc?.dispose()
    this.renderer.dispose()
    // dispose() de three no suelta el contexto WebGL: se queda vivo hasta que el
    // recolector se lleva el canvas, y abriendo y cerrando visores el navegador
    // llegaba a su tope y expulsaba contextos. Ojo: el canvas queda inservible, el
    // siguiente visor necesita uno nuevo (ViewerCanvas lo crea en cada montaje).
    this.renderer.forceContextLoss()
  }

  // ── Recorte (clipping) ────────────────────────────────────────────────────────
  private updateClip(): void {
    if (!this.model) return
    const { width: W, height: H, length: L } = this.model
    const s = this.slice
    // En Y, el corte que se enseña (el de la última tapa, ver dispY), no el pedido.
    const y = this.dispY
    const e = 0.002 // margen para que el plano no roce las caras del borde (evita parpadeo)
    // En la exhibición, en un lado sin corte (el corte llega al límite del volumen) no
    // hay nada que recortar: el plano se aparta un bloque hacia fuera para que no
    // toque lo que se mece cerca del borde. Fuera de la exhibición nada se mece y los
    // planos quedan como siempre (también para la miniatura, captureIso).
    const m = (cortado: boolean) => cortado || !this.showcase ? e : 1
    this.clipPlanes[0].set(new THREE.Vector3(1, 0, 0), -(s.x[0] - W / 2) + m(s.x[0] > 0))
    this.clipPlanes[1].set(new THREE.Vector3(-1, 0, 0), (s.x[1] + 1 - W / 2) + m(s.x[1] < W - 1))
    this.clipPlanes[2].set(new THREE.Vector3(0, 1, 0), -(y[0] - H / 2) + m(y[0] > 0))
    this.clipPlanes[3].set(new THREE.Vector3(0, -1, 0), (y[1] + 1 - H / 2) + m(y[1] < H - 1))
    this.clipPlanes[4].set(new THREE.Vector3(0, 0, 1), -(s.z[0] - L / 2) + m(s.z[0] > 0))
    this.clipPlanes[5].set(new THREE.Vector3(0, 0, -1), (s.z[1] + 1 - L / 2) + m(s.z[1] < L - 1))
    // Con clipShadows la sombra depende del corte: hay que rehacerla al moverlo.
    if (this.showcase) this.requestShadowUpdate()
    if (this.floorOn) this.syncFloor()
  }

  // ── Cámaras / encuadre ─────────────────────────────────────────────────────────
  private makeControls(): OrbitControls {
    // El objetivo pasa de unos controles a los siguientes (al cambiar de vista).
    const prev = (this.controls as OrbitControls | undefined)?.target.clone()
    const c = new OrbitControls(this.activeCam, this.canvas)
    c.enableDamping = true
    c.dampingFactor = 0.08
    // En el modo exhibición la rueda acerca hacia el centro: hacia el cursor movería
    // el objetivo, que es alrededor de lo que gira solo.
    c.zoomToCursor = !this.showcase
    c.enablePan = true
    c.enableZoom = true
    // Mirar y girar son propios (ver onPtrDown) y iso/orto no giran.
    c.enableRotate = false
    // Izquierdo, derecho y un dedo: nada (null), los lleva onPtrDown (en la libre el
    // izquierdo mira, el derecho gira alrededor del centro y Mayús + derecho desplaza;
    // en iso y orto los dos desplazan, pero solo pasado el umbral del clic). Central:
    // desplazar. Dos dedos: zoom y desplazar. Ojo: dejarlos en ROTATE con el giro
    // apagado no vale como "nada": al levantar un dedo de dos, OrbitControls se
    // quedaría en el estado de pellizco con un dedo solo.
    c.mouseButtons = { LEFT: null, MIDDLE: THREE.MOUSE.PAN, RIGHT: null }
    c.touches = { ONE: null, TWO: THREE.TOUCH.DOLLY_PAN }
    c.minDistance = 0.01            // permite acercarse mucho (modo spectator, meterse dentro)
    c.maxDistance = this.boundingRadius * 12
    if (prev) c.target.copy(prev)
    c.addEventListener('change', () => this.scheduleRender())
    c.addEventListener('start',  () => { this.camTween = null; this.scheduleRender() })
    return c
  }

  // ── Puntero y teclado ─────────────────────────────────────────────────────────
  // El vuelo WASD se controla con el ratón sobre el visor (estilo juego): no roba
  // el foco a los campos ni el scroll ni la escritura de la página fuera del visor.
  private setupInput(): void {
    this.canvas.addEventListener('pointerenter', this.onPtrEnter)
    // No soltamos las teclas al salir del canvas: el vuelo sigue aunque el ratón
    // pase por la lista de materiales, los cortes o fuera del visor.
    this.canvas.addEventListener('pointerleave', this.onPtrLeave)
    this.canvas.addEventListener('pointerdown', this.onPtrDown)
    this.canvas.addEventListener('pointermove', this.onPtrMove)
    this.canvas.addEventListener('pointerup', this.onPtrUp)
    this.canvas.addEventListener('pointercancel', this.onPtrUp)
    this.canvas.addEventListener('wheel', this.onWheel, { passive: true })
    this.canvas.addEventListener('contextmenu', this.onContextMenu)
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
    window.addEventListener('blur', this.onWindowBlur)
    this.updateCursor()
  }

  // Con nombre (y no anónimos) para poder quitarlos en dispose(): el lienzo puede
  // seguir vivo después (lo retiene el contexto WebGL) y con ellos, el visor entero.
  private onPtrEnter = (): void => { this.hovering = true }
  private onPtrLeave = (): void => { this.hovering = false }
  private onContextMenu = (e: Event): void => { e.preventDefault() }   // el derecho gira

  // Coger la cámara (o mover la rueda) corta la transición que esté en curso.
  private onWheel = (): void => { this.camTween = null }

  private onPtrDown = (e: PointerEvent): void => {
    this.camTween = null
    // El primero de un gesto: lo que quedara de otro (un pointerup perdido) fuera.
    if (e.isPrimary) this.ptrs.clear()
    this.ptrs.add(e.pointerId)
    if (this.ptrs.size > 1) {
      // Segundo dedo: zoom y desplazar (OrbitControls). El giro de un dedo se corta y
      // no vuelve hasta levantarlos todos, o daría un salto al soltar uno.
      if (this.gesture) { this.gesture.multi = true; this.gesture.mode = 'other' }
      this.orbitVel.yaw = this.orbitVel.pitch = 0
      this.lookVel.yaw = this.lookVel.pitch = 0
      return
    }
    // Libre: izquierdo mira (primera persona), derecho gira alrededor del centro de lo
    // que se ve y Mayús + derecho desplaza; un dedo gira. Iso y orto: desplazar (no
    // giran). El central lo lleva OrbitControls (desplazar).
    const touch = e.pointerType === 'touch'
    const libre = this.view === 'free'
    const mode: 'orbit' | 'look' | 'pan' | 'other' = touch ? (libre ? 'orbit' : 'pan')
      : e.button === 0 ? (libre ? 'look' : 'pan')
      : e.button === 2 ? (libre && !e.shiftKey ? 'orbit' : 'pan')
      : 'other'
    this.gesture = { id: e.pointerId, x0: e.clientX, y0: e.clientY, t0: performance.now(), touch, button: e.button, moved: false, multi: false, mode }
    this.lookPX = e.clientX; this.lookPY = e.clientY
    // Agarrar corta la inercia que hubiera.
    this.orbitVel.yaw = this.orbitVel.pitch = 0
    this.lookVel.yaw = this.lookVel.pitch = 0
    if (mode !== 'other') { try { this.canvas.setPointerCapture(e.pointerId) } catch { /* noop */ } }
  }

  private onPtrMove = (e: PointerEvent): void => {
    const g = this.gesture
    if (!g || g.id !== e.pointerId || g.multi) return
    if (!g.moved) {
      // Hasta pasar el umbral sigue siendo un clic.
      if (Math.hypot(e.clientX - g.x0, e.clientY - g.y0) < (g.touch ? DRAG_PX_TOUCH : DRAG_PX)) return
      g.moved = true
      if (g.mode === 'orbit') this.centerPivot()
      this.updateCursor()
    }
    if (g.mode === 'other') return
    const dx = e.clientX - this.lookPX, dy = e.clientY - this.lookPY
    this.lookPX = e.clientX; this.lookPY = e.clientY
    if (!dx && !dy) return
    if (g.mode === 'orbit') this.orbitBy(dx, dy)
    else if (g.mode === 'pan') this.panBy(dx, dy)
    else this.lookBy(dx, dy)
  }

  // Desplazar: en iso y orto con el izquierdo o un dedo, en la libre con Mayús +
  // derecho. El punto cogido se queda bajo el puntero (unidades del mundo por píxel:
  // en la libre, a la distancia del objetivo).
  private panBy(dx: number, dy: number): void {
    const cam = this.activeCam
    const h = Math.max(1, this.canvas.clientHeight)
    const wpp = this.view === 'free'
      ? 2 * this.perspCam.position.distanceTo(this.controls.target) * Math.tan(THREE.MathUtils.degToRad(this.perspCam.fov) / 2) / h
      : (this.orthoCam.top - this.orthoCam.bottom) / (this.orthoCam.zoom || 1) / h
    const off = new THREE.Vector3(-dx * wpp, dy * wpp, 0).applyQuaternion(cam.quaternion)
    cam.position.add(off)
    this.controls.target.add(off)
    this.scheduleRender()
  }

  private onPtrUp = (e: PointerEvent): void => {
    this.ptrs.delete(e.pointerId)
    const g = this.gesture
    if (g && g.id === e.pointerId) {
      if (g.mode !== 'other') {
        try { this.canvas.releasePointerCapture(e.pointerId) } catch { /* noop */ }
        // Soltar tras una pausa (más de 80 ms quieto) no lanza la inercia.
        if (performance.now() - this.lookMoveT > 80 || reducedMotion()) {
          this.orbitVel.yaw = this.orbitVel.pitch = 0
          this.lookVel.yaw = this.lookVel.pitch = 0
        }
        this.coastT = performance.now()
      }
      if (e.type === 'pointerup' && !g.moved && !g.multi && (g.touch || g.button === 0) && performance.now() - g.t0 < 600) {
        this.handleTap(e.clientX, e.clientY, g.touch)
      }
      g.mode = 'other'
    }
    if (this.ptrs.size === 0) this.gesture = null
    this.updateCursor()
    this.scheduleRender()   // arranca la inercia si quedó velocidad
  }

  // Clic o toque sin arrastre: la UI identifica el bloque (onTap); dos seguidos en el
  // mismo sitio, además, acercan la cámara a ese bloque.
  private handleTap(x: number, y: number, touch: boolean): void {
    const now = performance.now()
    const lt = this.lastTap
    if (lt && now - lt.t < DBL_MS && Math.hypot(x - lt.x, y - lt.y) < (touch ? 30 : 8)) {
      this.lastTap = null
      this.focusAt(x, y)
    } else {
      this.lastTap = { t: now, x, y }
    }
    this.onTap?.(x, y)
  }

  private updateCursor(): void {
    const g = this.gesture
    this.canvas.style.cursor = this.view === 'free' && this.flyEnabled
      ? 'crosshair'
      : g?.moved && g.mode !== 'other' ? 'grabbing' : 'grab'
  }

  // Centro de giro: el centro de lo que se ve (el de la caja del corte), no el
  // bloque cogido. La cámara y su objetivo giran juntos alrededor de él.
  private centerPivot(): void {
    const m = this.model
    if (!m) { this.pivot.copy(this.controls.target); return }
    const s = this.slice, y = this.dispY
    this.pivot.set((s.x[0] + s.x[1] + 1) / 2 - m.width / 2, (y[0] + y[1] + 1) / 2 - m.height / 2, (s.z[0] + s.z[1] + 1) / 2 - m.length / 2)
  }

  // Velocidad para la inercia (rad/ms), suavizada entre eventos del puntero.
  private trackVel(v: { yaw: number; pitch: number }, yaw: number, pitch: number): void {
    const now = performance.now()
    const quieto = now - this.lookMoveT > 80
    const dt = Math.min(50, Math.max(4, now - this.lookMoveT))
    const k = quieto ? 1 : 0.4
    v.yaw += (yaw / dt - v.yaw) * k
    v.pitch += (pitch / dt - v.pitch) * k
    this.lookMoveT = now
  }

  // Primera persona (izquierdo): gira la mirada alrededor de la cámara, que no se
  // mueve. Mueve el objetivo girándolo en torno a ella; OrbitControls.update()
  // recalcula el resto y la cámara se queda en su sitio mirando al nuevo objetivo.
  private lookBy(dx: number, dy: number): void {
    const sens = 0.0024   // sensibilidad del mirar (más bajo = más lento)
    const yaw = -dx * sens, pitch = -dy * sens
    this.applyLook(yaw, pitch)
    this.trackVel(this.lookVel, yaw, pitch)
    this.scheduleRender()
  }
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

  // Órbita alrededor del centro de giro (pivot, el centro de lo que se ve): cámara y
  // objetivo giran juntos en torno a él. Arrastrar a la derecha
  // gira la build a la derecha; hacia abajo, la cámara sube. Un arrastre de toda la
  // altura del lienzo son unos 290°.
  private orbitBy(dx: number, dy: number): void {
    const sens = (Math.PI * 1.6) / Math.max(300, this.canvas.clientHeight)
    const yaw = -dx * sens, pitch = -dy * sens
    this.applyOrbit(yaw, pitch)
    this.trackVel(this.orbitVel, yaw, pitch)
    this.scheduleRender()
  }
  private applyOrbit(yaw: number, pitch: number): void {
    const cam = this.perspCam.position, t = this.controls.target, p = this.pivot
    const fwd = new THREE.Vector3().subVectors(t, cam).normalize()
    const qYaw = new THREE.Quaternion().setFromAxisAngle(Y_AXIS, yaw)
    const fwdY = fwd.applyQuaternion(qYaw)
    const right = new THREE.Vector3().crossVectors(fwdY, Y_AXIS)
    let q = qYaw
    if (right.lengthSq() > 1e-8) {
      const qPitch = new THREE.Quaternion().setFromAxisAngle(right.normalize(), pitch)
      // Tope para no voltear: la mirada no llega a la vertical.
      if (Math.abs(fwdY.clone().applyQuaternion(qPitch).y) < 0.995) q = qPitch.multiply(qYaw)
    }
    cam.sub(p).applyQuaternion(q).add(p)
    t.sub(p).applyQuaternion(q).add(p)
  }

  // Inercia al soltar: sigue girando a la velocidad del final del arrastre y frena
  // (igual a cualquier fps). Devuelve true mientras siga.
  private coast(): boolean {
    const g = this.gesture
    if (g && g.mode !== 'other') return false   // aún agarrando
    const now = performance.now()
    const dt = Math.min(50, Math.max(0, now - this.coastT))
    this.coastT = now
    let sigue = false
    const o = this.orbitVel, l = this.lookVel
    if (o.yaw || o.pitch) {
      if (this.view === 'free') this.applyOrbit(o.yaw * dt, o.pitch * dt)
      const f = Math.exp(-dt / ORBIT_TAU)
      o.yaw *= f; o.pitch *= f
      if (Math.abs(o.yaw) + Math.abs(o.pitch) < 1e-5) o.yaw = o.pitch = 0
      else sigue = true
    }
    if (l.yaw || l.pitch) {
      if (this.view === 'free') this.applyLook(l.yaw * dt, l.pitch * dt)
      const f = Math.exp(-dt / LOOK_TAU)
      l.yaw *= f; l.pitch *= f
      if (Math.abs(l.yaw) + Math.abs(l.pitch) < 1e-5) l.yaw = l.pitch = 0
      else sigue = true
    }
    return sigue
  }

  // Por la tecla física (e.code), no por la letra: en un teclado AZERTY el WASD de
  // Minecraft está en ZQSD, y con e.key no se podía volar.
  private flyKey(e: KeyboardEvent): string | null {
    switch (e.code) {
      case 'KeyW': return 'w'
      case 'KeyA': return 'a'
      case 'KeyS': return 's'
      case 'KeyD': return 'd'
      case 'Space': return 'up'
      case 'ShiftLeft': case 'ShiftRight': return 'down'
      default: return null
    }
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    const ae = document.activeElement as HTMLElement | null
    if (ae && (/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName) || ae.isContentEditable)) return
    // Con el ratón sobre el visor, espacio/flechas no deben hacer scroll de la página
    // (aunque el vuelo WASD esté desactivado).
    if (this.hovering && (e.code === 'Space' || e.key.startsWith('Arrow'))) e.preventDefault()
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
    // Mayús es bajar, salvo mientras desplaza con Mayús + derecho.
    if (this.keys.has('down') && this.gesture?.mode !== 'pan') this._flyDesired.addScaledVector(Y_AXIS, -1)
    if (this._flyDesired.lengthSq() > 0) {
      this._flyDesired.normalize().multiplyScalar(this.boundingRadius * FLY_SPEED * this.flySpeedMul)
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
    if (this._needsRender || this.disposed) return
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

  // ── Mallado por trozos (worker) ─────────────────────────────────────────────
  private onWorkerMessage = (e: MessageEvent<MesherOut>): void => { this.onMesherOut(e.data) }

  // Al worker, o al mesher del hilo principal si no hay workers.
  private send(m: MesherIn, transfer: Transferable[] = []): void {
    if (this.disposed) return
    if (this.worker) { this.worker.postMessage(m, transfer); return }
    this.localMesher ??= new ChunkMesher((o) => this.onMesherOut(o), (fn) => { setTimeout(fn, 0) })
    this.localMesher.handle(m)
  }

  private onMesherOut(o: MesherOut): void {
    // Lo de una build anterior al modelo actual es de otro modelo.
    if (this.disposed || o.gen < this.modelGen) return
    if (o.type === 'chunks') {
      this._leavesFast = o.fastLeaves
      for (const it of o.items) { this.uploadQ.push(it); this.queued.set(it.id, it) }
      this.scheduleRender()
    } else if (o.type === 'cap') {
      this.applyCap(o)
    } else if (o.type === 'ghost') {
      this.applyGhost(o)
    } else {
      this.doneGen = o.gen
      this.doneSeq = o.seq
      this.truncated = o.truncated
      this._leavesFast = o.fastLeaves
      this._fancyLeavesFit = o.fancyLeavesFit
      // Otra build (u otro corte) en exhibición: el vaivén según lo que pese ahora.
      if (this.showcase) this.syncScWaves()
      // A la UI, al acabar cada build y cada vez que cambie si se trunca o si caben
      // las hojas detalladas (con la build truncada, cada corte se malla aparte).
      if (o.gen === this.meshGen && (this.reportedGen !== o.gen || this.reported[0] !== o.truncated || this.reported[1] !== o.fancyLeavesFit)) {
        this.reportedGen = o.gen
        this.reported = [o.truncated, o.fancyLeavesFit]
        this.onRebuild?.(this.truncated)
      }
      this.scheduleRender()
    }
  }

  // Tapa del corte en Y. Llega en orden y siempre es la del último corte que el
  // worker conocía, así que se enseña en cuanto llega aunque el ratón ya vaya por
  // otra capa: lo que se ve va uno o dos frames por detrás, pero es exacto.
  private applyCap(o: Extract<MesherOut, { type: 'cap' }>): void {
    if (o.seq < this.dispSeq || (o.seq === this.dispSeq && this.capY && o.gen <= this.capGen)) return
    for (let k = 0; k < KINDS; k++) {
      const g = o.geo[k]
      let m = this.capMeshes[k]
      if (!g) {
        if (m) { m.geometry.dispose(); this.chunkRoot.remove(m); this.capMeshes[k] = null }
        continue
      }
      const s = o.slice, y0 = o.layers[0], y1 = o.layers[o.layers.length - 1]
      const geo = this.rawToGeo(g, [s.x[0], y0, s.z[0], s.x[1], y1, s.z[1]])
      if (m) { m.geometry.dispose(); m.geometry = geo }
      else { m = this.makeMesh(geo, k); this.capMeshes[k] = m }
    }
    this.splitCapTrans(o)
    this.capGen = o.gen
    this.showSliceY(o.seq, o)
    // Si el corte pedido ya es otro, se sigue esperando a la tapa siguiente, pero
    // como mucho CAP_WAIT_MS desde esta.
    if (this.slice.y[0] !== this.dispY[0] || this.slice.y[1] !== this.dispY[1]) {
      if (this.capTimer) clearTimeout(this.capTimer)
      this.capTimer = setTimeout(this.capTimeout, CAP_WAIT_MS)
    }
    if (this.showcase) this.requestShadowUpdate()
    this.placeAll()
    this.updateClip()
    this.scheduleRender()
  }

  // Lo translúcido no escribe profundidad y se pinta por orden: tras los que tienen
  // menos renderOrder y, a igual renderOrder, de lejos a cerca según el centro de su
  // caja. La tapa ocupa todo el corte, así que su centro queda en medio y los trozos
  // más cerca de la cámara se pintaban encima de ella (el cristal bajo el agua
  // cortada salía por encima del agua). Como en la malla única de antes, que iba por
  // y creciente: la capa de abajo del corte antes que los trozos (renderOrder 0,5) y
  // la de arriba después (2). Si la tapa lleva las dos, la de abajo va en otra malla
  // con los mismos búferes (no se suben dos veces) y su propio drawRange.
  private splitCapTrans(o: Extract<MesherOut, { type: 'cap' }>): void {
    const t = this.capMeshes[KIND_TRANS]
    let lo = this.capMeshes[CAP_TRANS_LO]
    const n = o.layers.length
    const base = KIND_TRANS * (n + 1), mid = n > 1 ? o.starts[base + 1] : 0, end = o.starts[base + n]
    if (!t || mid === 0) {
      if (lo) { lo.geometry.dispose(); this.chunkRoot.remove(lo); this.capMeshes[CAP_TRANS_LO] = null }
      // Una sola capa con algo: la de arriba si hay corte por arriba.
      if (t) t.renderOrder = n > 1 || o.slice.y[1] < this.model!.height - 1 ? 2 : 0.5
      return
    }
    const g = t.geometry
    g.setDrawRange(mid * 6, (end - mid) * 6)
    t.renderOrder = 2
    const gl = new THREE.BufferGeometry()
    for (const [name, a] of Object.entries(g.attributes)) gl.setAttribute(name, a)
    gl.setIndex(g.index)
    gl.setDrawRange(0, mid * 6)
    gl.boundingBox = g.boundingBox!.clone()
    gl.boundingSphere = g.boundingSphere!.clone()
    // La geometría vieja comparte búferes con la de `t` de antes, ya soltada.
    if (lo) { lo.geometry.dispose(); lo.geometry = gl }
    else { lo = this.makeMesh(gl, KIND_TRANS); this.capMeshes[CAP_TRANS_LO] = lo }
    lo.renderOrder = 0.5
  }

  // Sube los trozos que han llegado, unos MB por frame (UPLOAD_BYTES). El primero
  // siempre, aunque solo él pase del presupuesto.
  private flushUploads(budget: number): void {
    let used = 0, n = 0
    while (this.uploadHead < this.uploadQ.length && (n === 0 || used < budget)) {
      const it = this.uploadQ[this.uploadHead]
      this.uploadQ[this.uploadHead++] = undefined as unknown as ChunkOut
      if (this.queued.get(it.id) !== it) continue   // ya hay una versión más nueva en la cola
      this.queued.delete(it.id)
      used += this.applyChunk(it)
      n++
    }
    if (this.uploadHead >= this.uploadQ.length) { this.uploadQ = []; this.uploadHead = 0 }
    if (!n) return
    if (this.showcase) this.requestShadowUpdate()
    if (!this.shownFirst) {
      // La build aparece por partes: fuera el "Construyendo modelo…" con lo primero.
      this.shownFirst = true
      if (this.reportedGen !== this.meshGen) this.onRebuild?.(false)
    }
  }

  // Pone en escena la versión nueva de un trozo. Devuelve los bytes que sube.
  private applyChunk(it: ChunkOut): number {
    let rec = this.chunks.get(it.id)
    if (it.geo.every((g) => !g)) {
      if (rec) { this.disposeChunk(rec); this.chunks.delete(it.id) }
      return 0
    }
    if (!rec) {
      rec = { box: it.box, h: it.box[4] - it.box[1] + 1, meshes: [null, null, null, null], layers: it.layers }
      this.chunks.set(it.id, rec)
    }
    rec.layers = it.layers
    let bytes = 0
    for (let k = 0; k < KINDS; k++) {
      const g = it.geo[k]
      let m = rec.meshes[k]
      if (!g) {
        if (m) { m.geometry.dispose(); this.chunkRoot.remove(m); rec.meshes[k] = null }
        continue
      }
      bytes += g.pos.byteLength + g.uv.byteLength + g.col.byteLength + g.idx.byteLength + (g.lit?.byteLength ?? 0)
      const geo = this.rawToGeo(g, it.box)
      if (m) { m.geometry.dispose(); m.geometry = geo }
      else { m = this.makeMesh(geo, k); rec.meshes[k] = m }
    }
    this.placeChunk(rec)
    for (const m of rec.meshes) {
      if (!m) continue
      m.frustumCulled = false
      if (!m.visible) { m.visible = true; m.geometry.setDrawRange(0, 0) }
    }
    this.fresh.push(rec)
    return bytes
  }

  private makeMesh(geo: THREE.BufferGeometry, kind: number): THREE.Mesh {
    const m = new THREE.Mesh(geo, this.kindMat(kind))
    m.renderOrder = kind === KIND_TRANS ? 1 : 0
    m.matrixAutoUpdate = false
    this.chunkRoot.add(m)
    return m
  }

  // Material de cada capa de malla. Emisiva: la que brilla en exhibición; el opaco
  // normal fuera de ella.
  private kindMat(kind: number): THREE.Material {
    if (kind === KIND_EMISSIVE) return this.showcase ? this.scEmit! : this.opaqueMat
    return this.matFor(kind === KIND_TRANS ? 'trans' : kind === KIND_ENTITY ? 'entity' : 'opaque')
  }

  // Sin copiar: los arrays vienen transferidos del worker y no los usa nadie más.
  // Antes se copiaban todos (Float32BufferAttribute hace new Float32Array): un
  // 13-18 % del tirón al subir la malla. La caja va a mano (celdas + 1 de margen
  // por los modelos que asoman): calcularla recorre todos los vértices.
  private rawToGeo(b: RawBuffers, box: number[]): THREE.BufferGeometry {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(b.pos, 3))
    g.setAttribute('uv', new THREE.BufferAttribute(b.uv, 2))
    g.setAttribute('color', new THREE.BufferAttribute(b.col, 3, true))
    g.setAttribute('palIdx', new THREE.BufferAttribute(b.pal, 1))
    // Luz de la exhibición (solo si la malla se pidió con ella, ver MeshOptions.light).
    if (b.lit) g.setAttribute('lit', new THREE.BufferAttribute(b.lit, 4, true))
    g.setIndex(new THREE.BufferAttribute(b.idx, 1))
    const m = this.model!
    const ox = m.width / 2, oy = m.height / 2, oz = m.length / 2
    g.boundingBox = new THREE.Box3(
      new THREE.Vector3(box[0] - ox - 1, box[1] - oy - 1, box[2] - oz - 1),
      new THREE.Vector3(box[3] + 1 - ox + 1, box[4] + 1 - oy + 1, box[5] + 1 - oz + 1),
    )
    g.boundingSphere = g.boundingBox.getBoundingSphere(new THREE.Sphere())
    return g
  }

  // Qué capas de un trozo se dibujan con el corte que se enseña: las de dispY,
  // menos las que lleva la tapa. Fuera del corte en X/Z, nada.
  private placeChunk(rec: ChunkRec): void {
    const s = this.slice, b = rec.box
    const inXZ = !(s.x[1] < b[0] || s.x[0] > b[3] || s.z[1] < b[2] || s.z[0] > b[5])
    let lo = this.dispY[0], hi = this.dispY[1]
    if (this.capY) { if (this.capY.includes(lo)) lo++; if (this.capY.includes(hi)) hi-- }
    const h = rec.h
    const a = Math.max(0, Math.min(h, lo - b[1])), z = Math.max(0, Math.min(h, hi - b[1] + 1))
    for (let k = 0; k < KINDS; k++) {
      const m = rec.meshes[k]
      if (!m) continue
      const st = rec.layers[k * (h + 1) + a], en = rec.layers[k * (h + 1) + z]
      if (!inXZ || z <= a || en <= st) { m.visible = false; continue }
      m.geometry.setDrawRange(st * 6, (en - st) * 6)
      m.visible = true
    }
  }

  private settleFresh(): void {
    for (const rec of this.fresh) {
      for (const m of rec.meshes) if (m) m.frustumCulled = true
      this.placeChunk(rec)
    }
    this.fresh = []
  }

  private placeAll(): void {
    for (const rec of this.chunks.values()) this.placeChunk(rec)
  }

  private disposeChunk(rec: ChunkRec): void {
    for (const m of rec.meshes) if (m) { m.geometry.dispose(); this.chunkRoot.remove(m) }
  }

  private disposeCap(): void {
    for (let k = 0; k < this.capMeshes.length; k++) {
      const m = this.capMeshes[k]
      if (m) { m.geometry.dispose(); this.chunkRoot.remove(m); this.capMeshes[k] = null }
    }
  }

  // Fuera la malla entera (otro modelo o dispose).
  private clearChunks(): void {
    for (const rec of this.chunks.values()) this.disposeChunk(rec)
    this.chunks.clear()
    this.disposeCap()
    this.capY = null
    this.uploadQ = []
    this.uploadHead = 0
    this.queued.clear()
    this.fresh = []
    if (this.capTimer) { clearTimeout(this.capTimer); this.capTimer = null }
  }

  // ── Mallas ───────────────────────────────────────────────────────────────────
  // Rehace todo lo que depende de los recursos: lo del hilo principal (portal del
  // End, marcos, vagonetas...) y la malla del worker.
  private rebuild(): void {
    if (!this.model || this.disposed) return
    // La primera malla del modelo está esperando al manifiesto de entidades: ya
    // saldrá con el estado de ese momento (recursos y corte incluidos).
    if (this.deferredBuild) return
    this.builtSliceKey = this.sliceKey()
    this.buildEndPortal()   // malla animada del end portal/gateway (respeta el corte)
    this.buildItemFrames()  // marcos + ítems (respeta el corte)
    this.buildMinecarts()   // minecarts (vaina + bloque interior)
    this.rebuildMesh()
  }

  // Solo la malla de bloques: la build entera de nuevo (otros recursos u opciones).
  // Lo que hay en pantalla se queda hasta que llega lo nuevo de cada trozo.
  private rebuildMesh(): void {
    if (!this.model || this.disposed) return
    const m = this.model
    if (this.workerModel !== m) {
      // El worker se queda con su copia de los bloques: el corte en Y se malla en
      // cada frame del arrastre y mandarle 140 MB (L) cada vez no es una opción.
      // Sin worker no hace falta copia (mismo hilo, no se modifican).
      const blocks = this.worker ? m.blocks.slice() : m.blocks
      this.send({ type: 'model', width: m.width, height: m.height, length: m.length, blocks, palette: m.palette, chunk: [CHUNK_XZ, CHUNK_Y] },
        this.worker ? [blocks.buffer] : [])
      this.workerModel = m
      this.modelGen = this.meshGen + 1
      // Con el modelo nuevo el mesher olvida la capa fantasma: si ya se pidió, otra vez.
      if (this.ghostY !== null) this.send({ type: 'ghost', y: this.ghostY })
    }
    const gen = ++this.meshGen
    // Atlas, modelos y manifiesto solo si han cambiado desde el último mensaje
    // (el worker los guarda).
    const atlasRaw = this.atlas?.getRawData() ?? null
    const dbRaw = this.db?.getRawData() ?? null
    const manifest = this.entityManifest
    const opts = this.meshOptions()
    this.builtLight = !!opts.light
    const msg: Extract<MesherIn, { type: 'build' }> = { type: 'build', gen, seq: this.sliceSeq, slice: this.copySlice(), opts, eye: this.eyeCell() }
    if (atlasRaw !== this.sentAtlas) msg.atlasRaw = atlasRaw
    if (dbRaw !== this.sentDb) msg.dbRaw = dbRaw
    if (manifest !== this.sentManifest) msg.entityManifest = manifest
    this.sentAtlas = atlasRaw; this.sentDb = dbRaw; this.sentManifest = manifest
    this.send(msg)
  }

  // Posición de la cámara en celdas del modelo.
  private eyeCell(): [number, number, number] | null {
    if (!this.model) return null
    const p = this.activeCam.position
    return [p.x + this.model.width / 2, p.y + this.model.height / 2, p.z + this.model.length / 2]
  }

  // Con la luz por vértice en exhibición, o en la vista normal desde que se hizo de
  // noche con el cielo de Minecraft: si no, la malla es la de siempre.
  private meshOptions(): MeshOptions {
    return { ao: this.ao, leaves: this.leavesMode, light: this.showcase || this.scPending || this.nightLatch }
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

  // Busca los portales y gateways del End UNA vez por modelo. Primero en la paleta:
  // casi ninguna build tiene, y entonces no se recorre nada. Antes se recorría el
  // volumen entero en cada rebuild, aire incluido y con baseName() por celda: 0,5-
  // 1,6 s en el hilo principal en builds grandes aunque no hubiera ni un portal.
  private findEndPortals(m: SchematicModel): void {
    this.portalCells = []
    const kind = new Uint8Array(m.palette.length)   // 0 = nada, 1 = portal, 2 = gateway
    let any = false
    m.palette.forEach((st, i) => {
      const bn = st ? baseName(st.name) : ''
      if (bn === 'end_portal') { kind[i] = 1; any = true }
      else if (bn === 'end_gateway') { kind[i] = 2; any = true }
    })
    if (!any) return
    const { width: W, height: H, length: L, blocks } = m
    const n = Math.min(blocks.length, W * H * L)
    for (let i = 0; i < n; i++) {
      const k = kind[blocks[i]]
      if (!k) continue
      this.portalCells.push({ x: i % W, y: Math.floor(i / (W * L)), z: Math.floor(i / W) % L, gateway: k === 2 })
    }
  }

  private buildEndPortal(): void {
    this.disposeEndPortal()
    const m = this.model
    if (!m || !this.portalCells.length) return
    const { width: W, height: H, length: L } = m
    const sx = this.slice.x, sy = this.slice.y, sz = this.slice.z
    const pos: number[] = [], uv: number[] = []
    const addQuad = (a: number[], b: number[], c: number[], d: number[]) => {
      pos.push(...a, ...b, ...c, ...a, ...c, ...d)
      uv.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1)
    }
    let any = false
    for (const { x, y, z, gateway } of this.portalCells) {
      if (x < sx[0] || x > sx[1] || y < sy[0] || y > sy[1] || z < sz[0] || z > sz[1]) continue
      any = true
      const ox = x - W / 2, oy = y - H / 2, oz = z - L / 2
      if (!gateway) {
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
      this.disposeMats(m)
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

    // Rect del tile en el atlas de bloques, para las sub-UVs del modelo.
    // Delega en Atlas.uv() a propósito: el atlas lleva margen por textura y
    // recalcular aquí la posición de la celda ya rompió esto una vez.
    const tileRect = (idx: number): [number, number, number, number] =>
      this.atlas!.uv(idx) as unknown as [number, number, number, number]
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
    this.lvGroup(group)
    if (this.showcase) { this.litGroup(group, true); this.requestShadowUpdate() }
  }

  // ── Minecarts (vaina de entidad + bloque interior) ────────────────────────────
  private disposeMinecarts(): void {
    if (!this.minecartsGroup) return
    for (const c of this.minecartsGroup.children) {
      const m = c as THREE.Mesh
      m.geometry.dispose()
      // Los materiales de vaina y bloque interior se crean en cada build (y antes no
      // se liberaban nunca). El de mobs es fijo (mobMat) y se suelta en dispose().
      this.disposeMats(m, this.mobMat)
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
    const hayMobs   = !!m?.mobs?.length
    if (!m || (!hayCarts && !hayStands && !hayBoats && !hayMobs)) return
    // Necesita el atlas de entidades; si aún no cargó, se reconstruye al
    // terminar loadEntityAtlas (que llama a rebuild()).
    if (!this.entityAtlas) return
    const { width: W, height: H, length: L } = m
    const sx = this.slice.x, sy = this.slice.y, sz = this.slice.z
    const cx = W / 2, cy = H / 2, cz = L / 2

    // Geometría de la vaina (atlas de entidad), del bloque interior (atlas de
    // bloques) y de los mobs (atlas de mobs, que es otra textura → otra malla).
    const ePos: number[] = [], eUv: number[] = [], eCol: number[] = []
    const bPos: number[] = [], bUv: number[] = []
    const mPos: number[] = [], mUv: number[] = [], mCol: number[] = []
    // Ver nota en la otra tileRect: siempre por Atlas.uv(), nunca recalculando.
    const tileRect = (idx: number): [number, number, number, number] =>
      this.atlas!.uv(idx) as unknown as [number, number, number, number]

    // Helper: expande un quad (4 esquinas) a 2 triángulos en la geometría de entidad.
    const emitEntityQuad = (q: { pos: number[]; uv: number[]; r: number; g: number; b: number }, ox: number, oy: number, oz: number) => {
      const P = (k: number) => ePos.push(q.pos[k * 3] + ox, q.pos[k * 3 + 1] + oy, q.pos[k * 3 + 2] + oz)
      const U = (k: number) => eUv.push(q.uv[k * 2], q.uv[k * 2 + 1])
      const C = () => eCol.push(q.r, q.g, q.b)
      for (const k of [0, 1, 2, 0, 2, 3]) { P(k); U(k); C() }
    }

    const emitMobQuad = (q: { pos: number[]; uv: number[]; r: number; g: number; b: number }, ox: number, oy: number, oz: number) => {
      const P = (k: number) => mPos.push(q.pos[k * 3] + ox, q.pos[k * 3 + 1] + oy, q.pos[k * 3 + 2] + oz)
      const U = (k: number) => mUv.push(q.uv[k * 2], q.uv[k * 2 + 1])
      const C = () => mCol.push(q.r, q.g, q.b)
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
      if (mc.content && this.atlas) {
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
      if (bt.chest && this.atlas) {
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

    // Las setas del mooshroom NO son parte de su modelo: vanilla le dibuja
    // encima bloques de seta de verdad, así que salen del atlas de BLOQUES y no
    // del de mobs. Cada una es la cruz de dos planos del modelo `red_mushroom`.
    const emitSeta = (tile: string, cx0: number, cy0: number, cz0: number, lado: number, giro: number) => {
      const idx = this.atlas?.tileIndex(tile)
      if (idx === undefined) return
      const [u0, v0, u1, v1] = tileRect(idx)
      const h = lado / 2
      const cos = Math.cos(giro), sen = Math.sin(giro)
      const gira = (dx: number, dz: number): [number, number] => [dx * cos - dz * sen, dx * sen + dz * cos]
      for (const [ax, az] of [[1, 1], [1, -1]] as [number, number][]) {
        const [ux, uz] = gira(h * ax, h * az)
        const q = [
          cx0 - ux, cy0,         cz0 - uz,
          cx0 + ux, cy0,         cz0 + uz,
          cx0 + ux, cy0 + lado,  cz0 + uz,
          cx0 - ux, cy0 + lado,  cz0 - uz,
        ]
        bPos.push(q[0], q[1], q[2], q[3], q[4], q[5], q[6], q[7], q[8], q[0], q[1], q[2], q[6], q[7], q[8], q[9], q[10], q[11])
        bUv.push(u0, v1, u1, v1, u1, v0, u0, v1, u1, v0, u0, v0)
      }
    }

    // Mobs: pose de reposo, con los pies apoyados en Pos.y (no flotan como el barco).
    // Van a su propia malla porque usan el atlas de mobs, no el de entidades.
    if (this.mobAtlas && this.mobModels) {
      for (const mb of (m.mobs ?? [])) {
        const cellX = Math.floor(mb.x), cellY = Math.floor(mb.y), cellZ = Math.floor(mb.z)
        if (cellX < sx[0] || cellX > sx[1] || cellY < sy[0] || cellY > sy[1] || cellZ < sz[0] || cellZ > sz[1]) continue
        const ox = mb.x - cx, oy = mb.y - cy, oz = mb.z - cz
        for (const q of buildMob(this.mobModels[mb.model], mb.texs, mb.yaw, this.mobAtlas)) emitMobQuad(q, ox, oy, oz)

        // Dos setas en el lomo y una en la cabeza, como en vanilla. Van con la
        // textura del bloque que le toque a la variante.
        const seta = mb.texs[0] === 'mooshroom_brown' ? 'brown_mushroom'
          : mb.texs[0] === 'mooshroom' ? 'red_mushroom' : null
        if (seta) {
          const rad = (-mb.yaw * Math.PI) / 180
          const cos = Math.cos(rad), sen = Math.sin(rad)
          // px del modelo → mundo, girando con el mob sobre su eje.
          const punto = (px: number, py: number, pz: number): [number, number, number] => {
            const dx = (px - 8) / 16, dz = (pz - 8) / 16
            return [ox + dx * cos + dz * sen, oy + py / 16, oz - dx * sen + dz * cos]
          }
          const setas: [number, number, number, number][] = [
            [5.5, 21.5, 3,  20],   // lomo, lado izquierdo
            [10.5, 21.5, 7, -35],  // lomo, lado derecho
            [8, 23.5, 18,  10],    // cabeza
          ]
          for (const [px, py, pz, g] of setas) {
            const [wx, wy, wz] = punto(px, py, pz)
            emitSeta(seta, wx, wy, wz, 0.55, rad + (g * Math.PI) / 180)
          }
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
    if (mPos.length && this.mobTex) {
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.Float32BufferAttribute(mPos, 3))
      g.setAttribute('uv', new THREE.Float32BufferAttribute(mUv, 2))
      g.setAttribute('color', new THREE.Float32BufferAttribute(mCol, 3))
      this.mobMat ??= new THREE.MeshBasicMaterial({ map: this.mobTex, vertexColors: true, side: THREE.DoubleSide, alphaTest: 0.5, clippingPlanes: cp })
      group.add(new THREE.Mesh(g, this.mobMat))
    }
    this.minecartsGroup = group
    this.scene.add(group)
    this.lvGroup(group)
    if (this.showcase) { this.litGroup(group, true); this.requestShadowUpdate() }
  }

  // Material activo para cada capa: el de exhibición o el de siempre.
  private matFor(slot: 'opaque' | 'trans' | 'entity'): THREE.Material {
    if (this.showcase) {
      if (slot === 'opaque') return this.scOpaque!
      if (slot === 'trans')  return this.scTrans!
      return this.scEntity!
    }
    if (slot === 'opaque') return this.opaqueMat
    if (slot === 'trans')  return this.transMat
    return this.entityMat
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

    if (this.stepTime()) this.scheduleRender()     // la hora del día va hacia la pedida
    if (this.stepTween()) this.scheduleRender()    // transición de cámara en curso
    if (this.updateFly()) this.scheduleRender()    // vuela y desliza hasta frenar del todo
    if (this.coast()) this.scheduleRender()        // inercia del giro al soltar

    // Lo que se anima solo (portal del End, autorrotación) pide frames sin parar,
    // así que se para cuando el visor no se ve; al volver a verse se reanuda (ver
    // onVisibility y el IntersectionObserver del constructor).
    const live = this.isLive()

    // update() devuelve true mientras hay damping en curso, y con autoRotate en
    // TODOS los frames (gira y además lanza 'change', que también pide frame).
    // Fuera de la vista se apaga el giro solo durante esta llamada: si no, el
    // Showcase seguiría pintando con bloom y sombras aunque no se vea.
    // Tampoco mientras el usuario gira a mano o la cámara está en una transición.
    const giro = this.controls.autoRotate
    if (!live || this.gesture?.moved || this.camTween) this.controls.autoRotate = false
    if (this.controls.update()) this.scheduleRender()
    this.controls.autoRotate = giro

    // Trozos que esperan a subirse a la GPU: unos MB en este frame y el resto en
    // los siguientes (la build aparece por partes y el frame no se congela).
    this.flushUploads(UPLOAD_BYTES)
    if (this.uploadHead < this.uploadQ.length) this.scheduleRender()

    this.updateNearFar()
    if (this.onHeading) this.emitHeading()
    if (this.cota) this.updateCota()   // topes y etiquetas de la medida, a la cámara de este frame
    if (this.endPortalMesh && live) this.drawEndPortal(performance.now())   // anima el portal antes de pintar
    if (this.showcase && this.composer) { this.checkScSpeed(); this.renderShowcase(false) }
    else this.renderer.render(this.scene, this.activeCam)
    // Las recién subidas vuelven a lo normal (frustum culling y las capas del corte).
    if (this.fresh.length) this.settleFresh()
    if (this.endPortalMesh && live) this.scheduleRender()                   // bucle continuo mientras haya portal
    // Con el cielo de Minecraft, las nubes avanzan: un frame cada poco (no a 60 fps,
    // que con la build quieta sería repintarla entera sin parar).
    if (!this.showcase && live && this.vsky?.visible && this.vsky.moving && !this.skyTimer) {
      const ms = this.vertexCount > SKY_SLOW_VERTS || (typeof matchMedia !== 'undefined' && matchMedia('(pointer: coarse)').matches) ? SKY_IDLE_SLOW_MS : SKY_IDLE_MS
      this.skyTimer = setTimeout(() => { this.skyTimer = null; this.scheduleRender() }, ms)
    }
    // En exhibición, sin parar mientras gira. Con el giro en pausa, solo si algo se
    // mueve (agua, lava, hojas, plantas; en la versión alta) y a ~30 fps.
    if (this.showcase && live) {
      if (this.controls.autoRotate) this.scheduleRender()
      else if (this.sc?.waves && this.scMoving && !this.scIdleTimer) {
        this.scIdleTimer = setTimeout(() => { this.scIdleTimer = null; this.scheduleRender() }, SC_IDLE_MS)
      }
    }
  }

  // La versión alta se elige por el nombre de la GPU (lightQualityHint) y alguna
  // floja se escapa. Se miden los frames del giro (con la malla quieta, sin tocar
  // la cámara ni rehacer la sombra) y, si van lentos, se pasa a la ligera una vez.
  private checkScSpeed(): void {
    const m = this.scSpeed
    if (!m) return
    const t = performance.now()
    const steady = this.controls.autoRotate && this.isLive() && this.meshIdle && !this.gesture && !this.camTween && !this.sc!.shadowDirty
    if (!steady) { m.last = 0; return }
    if (m.last && ++m.n > SC_SPEED_SKIP) m.dts.push(t - m.last)
    m.last = t
    if (m.dts.length < SC_SPEED_N) return
    this.scSpeed = null
    m.dts.sort((a, b) => a - b)
    if (m.dts[m.dts.length >> 1] <= SC_SPEED_MS) return
    this.sc!.setQuality('ligera', this.renderer)
    if (this.bloomPass) this.bloomPass.enabled = false
    this.syncScWaves()
  }

  // Un frame del modo exhibición: la sombra del sol si toca y el composer (cielo,
  // bloques, bloom y tono). `ya`: la sombra se rehace ahora aunque la malla aún
  // esté llegando (la foto).
  private renderShowcase(ya: boolean): void {
    const sc = this.sc!
    sc.u.scTime.value = ((performance.now() - this.scT0) / 1000) % 3600
    if (sc.shadowDirty) {
      if (ya || this.meshIdle || performance.now() - sc.shadowAt > SC_SHADOW_MS) this.renderScShadow()
      else this.scheduleRender()   // se vuelve a mirar en el frame siguiente
    }
    if (this.bloomRampAt && this.bloomPass) {
      const k = Math.min(1, (performance.now() - this.bloomRampAt) / SC_BLOOM_RAMP_MS)
      this.bloomPass.strength = sc.bloom * k
      if (k < 1) this.scheduleRender(); else this.bloomRampAt = 0
    }
    this.syncShowcaseSamples()
    this.composer!.render()
  }

  // Mapa de sombras del sol: lo que se ve con el corte (sin lo translúcido ni el
  // texto de los carteles), encajado en la caja del corte. La niebla, a la misma caja.
  private renderScShadow(): void {
    const sc = this.sc!
    const box = new THREE.Box3()
    const casters = new Set<THREE.Object3D>()
    const m = this.model
    if (m) {
      const s = this.slice, y = this.dispY
      box.min.set(s.x[0] - m.width / 2, y[0] - m.height / 2, s.z[0] - m.length / 2)
      box.max.set(s.x[1] + 1 - m.width / 2, y[1] + 1 - m.height / 2, s.z[1] + 1 - m.length / 2)
      this.forEachMesh((mesh, k) => { if (k !== KIND_TRANS) casters.add(mesh) })
      for (const g of [this.framesGroup, this.minecartsGroup]) {
        for (const o of g?.children ?? []) if (!(o.userData as { noCast?: boolean }).noCast) casters.add(o)
      }
      if (this.endPortalMesh) casters.add(this.endPortalMesh)
    }
    sc.setFog(box, this.boundingRadius)
    // Con el suelo, el mapa llega hasta donde cae en él la sombra de lo más alto: si
    // no, lo que queda más allá de la caja (casi toda la sombra larga del atardecer)
    // saldría al sol. Solo crece la profundidad; el ancho del mapa y su detalle no.
    let reach = 0
    if (this.floor?.visible && !box.isEmpty()) {
      reach = Math.max(0, box.max.y - this.floorU.flY.value) / Math.max(0.05, sc.u.scSunDir.value.y)
    }
    sc.renderShadow(this.renderer, this.scene, casters, box, reach)
  }

  private isLive(): boolean {
    return this.onScreen && !document.hidden
  }

  private onVisibility = (): void => {
    if (this.isLive()) this.scheduleRender()
  }
}
