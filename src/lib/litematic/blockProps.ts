// Propiedades de un bloque en español para el panel del bloque: "mirando al
// norte", "mitad superior", "encendido"... Al colocar repetidores, observadores o
// escaleras lo que más se equivoca es hacia dónde miran, y "facing: north" no lo
// lee todo el mundo. Lo que no se conoce sale tal cual, con "sí" y "no".

import { baseName } from './blockColors'

export interface PropRow {
  /** Nombre de la propiedad en español. */
  label: string
  /** Valor en español. */
  value: string
  /** Clave y valor originales (para el title). */
  raw: string
  /** true/false: para el color (verde, gris). */
  bool?: boolean
}

const DIR_AL: Record<string, string> = { north: 'al norte', south: 'al sur', east: 'al este', west: 'al oeste', up: 'hacia arriba', down: 'hacia abajo' }
const DIR: Record<string, string> = { north: 'norte', south: 'sur', east: 'este', west: 'oeste', up: 'arriba', down: 'abajo' }
// Rotación de carteles, estandartes y cabezas de pie: 16 rumbos, 0 = mirando al sur.
const RUMBOS = ['sur', 'sur-suroeste', 'suroeste', 'oeste-suroeste', 'oeste', 'oeste-noroeste', 'noroeste', 'norte-noroeste',
  'norte', 'norte-noreste', 'noreste', 'este-noreste', 'este', 'este-sureste', 'sureste', 'sur-sureste']

const SI_NO = (v: string) => v === 'true' ? 'sí' : v === 'false' ? 'no' : v

// Propiedad → [nombre, traducción del valor].
const PROPS: Record<string, [string, (v: string, base: string) => string]> = {
  facing: ['Orientación', (v) => DIR_AL[v] ? `mirando ${DIR_AL[v]}` : v],
  horizontal_facing: ['Orientación', (v) => DIR_AL[v] ? `mirando ${DIR_AL[v]}` : v],
  rotation: ['Orientación', (v) => { const r = RUMBOS[parseInt(v, 10) & 15]; return r ? `mirando al ${r}` : v }],
  axis: ['Eje', (v) => v === 'y' ? 'vertical' : v === 'x' ? 'este-oeste' : v === 'z' ? 'norte-sur' : v],
  half: ['Mitad', (v) => v === 'upper' || v === 'top' ? 'mitad superior' : v === 'lower' || v === 'bottom' ? 'mitad inferior' : v],
  type: ['Tipo', (v, base) => {
    if (base.endsWith('_slab')) return v === 'top' ? 'losa de arriba' : v === 'bottom' ? 'losa de abajo' : v === 'double' ? 'losa doble' : v
    if (base.endsWith('chest')) return v === 'single' ? 'cofre simple' : v === 'left' ? 'mitad izquierda de un cofre doble' : v === 'right' ? 'mitad derecha de un cofre doble' : v
    if (base === 'piston_head' || base === 'moving_piston') return v === 'sticky' ? 'pegajoso' : v === 'normal' ? 'normal' : v
    return v
  }],
  lit: ['Estado', (v) => v === 'true' ? 'encendido' : v === 'false' ? 'apagado' : v],
  powered: ['Corriente', (v) => v === 'true' ? 'con corriente' : v === 'false' ? 'sin corriente' : v],
  power: ['Potencia', (v) => v],
  delay: ['Retardo', (v) => `${v} ${v === '1' ? 'tick' : 'ticks'} de redstone`],
  locked: ['Bloqueado', SI_NO],
  mode: ['Modo', (v) => ({ compare: 'comparar', subtract: 'restar', save: 'guardar', load: 'cargar', corner: 'esquina', data: 'datos' } as Record<string, string>)[v] ?? v],
  waterlogged: ['Anegado', SI_NO],
  open: ['Abierta', SI_NO],
  hinge: ['Bisagra', (v) => v === 'left' ? 'a la izquierda' : v === 'right' ? 'a la derecha' : v],
  part: ['Parte', (v) => v === 'head' ? 'cabecera' : v === 'foot' ? 'pies' : v],
  occupied: ['Ocupada', SI_NO],
  extended: ['Extendido', SI_NO],
  short: ['Corto', SI_NO],
  enabled: ['Activa', SI_NO],
  triggered: ['Disparado', SI_NO],
  attached: ['Enganchado', SI_NO],
  disarmed: ['Desarmado', SI_NO],
  inverted: ['Invertido', SI_NO],
  conditional: ['Condicional', SI_NO],
  persistent: ['Persistente', SI_NO],
  distance: ['Distancia al tronco', (v) => v],
  snowy: ['Nevado', SI_NO],
  hanging: ['Colgando', SI_NO],
  signal_fire: ['Señal de humo', SI_NO],
  has_book: ['Con libro', SI_NO],
  has_record: ['Con disco', SI_NO],
  has_bottle_0: ['Frasco 1', SI_NO], has_bottle_1: ['Frasco 2', SI_NO], has_bottle_2: ['Frasco 3', SI_NO],
  bottom: ['Apoyado en el suelo', SI_NO],
  age: ['Crecimiento', (v) => v],
  level: ['Nivel', (v) => v],
  layers: ['Capas', (v) => v],
  candles: ['Velas', (v) => v],
  pickles: ['Pepinos', (v) => v],
  eggs: ['Huevos', (v) => v],
  hatch: ['Eclosión', (v) => v],
  bites: ['Mordiscos', (v) => v],
  charges: ['Cargas', (v) => v],
  honey_level: ['Miel', (v) => v],
  note: ['Nota', (v) => v],
  flower_amount: ['Flores', (v) => v],
  segment_amount: ['Hojas', (v) => v],
  // Con una cabeza encima, el bloque musical suena a ella.
  instrument: ['Instrumento', (v) => ({ harp: 'arpa', basedrum: 'bombo', snare: 'caja', hat: 'charles', bass: 'bajo', flute: 'flauta', bell: 'campana', guitar: 'guitarra', chime: 'carillón', xylophone: 'xilófono', iron_xylophone: 'vibráfono', cow_bell: 'cencerro', didgeridoo: 'didgeridoo', bit: 'bit', banjo: 'banjo', pling: 'pling',
    zombie: 'cabeza de zombi', skeleton: 'calavera de esqueleto', creeper: 'cabeza de creeper', dragon: 'cabeza de dragón',
    wither_skeleton: 'calavera de esqueleto wither', piglin: 'cabeza de piglin', custom_head: 'cabeza de jugador' } as Record<string, string>)[v] ?? v],
  in_wall: ['Junto a un muro', SI_NO],
  moisture: ['Humedad', (v) => `${v} de 7`],
  berries: ['Con bayas', SI_NO],
  stage: ['Fase', (v) => v],
  drag: ['Arrastra hacia abajo', SI_NO],
  tip: ['Punta', SI_NO],
  unstable: ['Inestable', SI_NO],
  crafting: ['Fabricando', SI_NO],
  bloom: ['Floreciendo', SI_NO],
  hydration: ['Hidratación', (v) => `${v} de 3`],
  dusted: ['Cepillado', (v) => v],
  active: ['Activo', SI_NO],
  natural: ['Natural', SI_NO],
  cracked: ['Agrietada', SI_NO],
  ominous: ['Ominoso', SI_NO],
  // Estantes puestos en fila.
  side_chain: ['En fila', (v) => ({ unconnected: 'suelto', left: 'a la izquierda', center: 'en medio', right: 'a la derecha' } as Record<string, string>)[v] ?? v],
  face: ['Colocado', (v) => v === 'floor' ? 'en el suelo' : v === 'wall' ? 'en la pared' : v === 'ceiling' ? 'en el techo' : v],
  attachment: ['Colocada', (v) => ({ floor: 'en el suelo', ceiling: 'en el techo', single_wall: 'en una pared', double_wall: 'entre dos paredes' } as Record<string, string>)[v] ?? v],
  shape: ['Forma', (v) => SHAPE[v] ?? v],
  thickness: ['Grosor', (v) => ({ tip: 'punta', tip_merge: 'punta unida', frustum: 'tramo', middle: 'medio', base: 'base' } as Record<string, string>)[v] ?? v],
  vertical_direction: ['Sentido', (v) => v === 'up' ? 'hacia arriba' : v === 'down' ? 'hacia abajo' : v],
  tilt: ['Inclinación', (v) => ({ none: 'ninguna', unstable: 'inestable', partial: 'a medias', full: 'del todo' } as Record<string, string>)[v] ?? v],
  leaves: ['Hojas', (v) => ({ none: 'ninguna', small: 'pequeñas', large: 'grandes' } as Record<string, string>)[v] ?? v],
  orientation: ['Orientación', (v) => { const [a, b] = v.split('_'); return DIR[a] && DIR[b] ? `${DIR[a]}, con arriba al ${DIR[b]}` : v }],
  sculk_sensor_phase: ['Fase', (v) => ({ inactive: 'inactivo', active: 'activo', cooldown: 'recargando' } as Record<string, string>)[v] ?? v],
  // Lados de vallas, muros, paneles y polvo de redstone.
  north: ['Norte', (v, b) => side(v, b)], south: ['Sur', (v, b) => side(v, b)],
  east: ['Este', (v, b) => side(v, b)], west: ['Oeste', (v, b) => side(v, b)],
  up: ['Arriba', (v, b) => side(v, b)], down: ['Abajo', (v, b) => side(v, b)],
}

const SHAPE: Record<string, string> = {
  straight: 'recta', inner_left: 'esquina interior izquierda', inner_right: 'esquina interior derecha',
  outer_left: 'esquina exterior izquierda', outer_right: 'esquina exterior derecha',
  north_south: 'norte-sur', east_west: 'este-oeste',
  ascending_north: 'subiendo hacia el norte', ascending_south: 'subiendo hacia el sur',
  ascending_east: 'subiendo hacia el este', ascending_west: 'subiendo hacia el oeste',
  north_east: 'curva norte-este', north_west: 'curva norte-oeste', south_east: 'curva sur-este', south_west: 'curva sur-oeste',
}

function side(v: string, base: string): string {
  if (base === 'redstone_wire') return v === 'side' ? 'conectado' : v === 'up' ? 'conectado y sube' : v === 'none' ? 'no' : v
  if (base.endsWith('_wall')) return v === 'low' ? 'muro bajo' : v === 'tall' ? 'muro alto' : v === 'none' ? 'no' : v === 'true' ? 'sí' : v === 'false' ? 'no' : v
  if (v === 'true') return 'conectado'
  if (v === 'false') return 'no'
  return v
}

/** Las propiedades del bloque, traducidas y en el orden en que vienen. */
export function describeProps(name: string, props?: Record<string, string>): PropRow[] {
  if (!props) return []
  const base = baseName(name)
  const out: PropRow[] = []
  for (const [k, v] of Object.entries(props)) {
    const t = PROPS[k]
    const raw = `${k}=${v}`
    const bool = v === 'true' || v === 'false' ? v === 'true' : undefined
    // Huecos de la estantería cincelada: slot_0_occupied... (el primero es el 1).
    const hueco = /^slot_(\d+)_occupied$/.exec(k)
    if (hueco) out.push({ label: `Hueco ${+hueco[1] + 1}`, value: v === 'true' ? 'ocupado' : v === 'false' ? 'vacío' : v, raw, bool })
    else if (t) out.push({ label: t[0], value: t[1](v, base), raw, bool })
    else out.push({ label: k.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase()), value: SI_NO(v), raw, bool })
  }
  return out
}
