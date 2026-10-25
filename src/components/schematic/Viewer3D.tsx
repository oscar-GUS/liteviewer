'use client'

// Viewer 3D unificado — UI compartida por el visor integrado (tarjetas) y la herramienta standalone.
// Recibe el modelo YA cargado ({ model, atlas, db }); cada sitio se encarga de obtenerlo a su manera.
import { Fragment, useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Atlas } from '@/lib/litematic/atlas'
import { ModelDB } from '@/lib/litematic/models'
import { asset } from '@/lib/litematic/assets'
import { loadEntityManifest } from '@/lib/litematic/resources'
import { SchematicViewer, ViewName, DBL_MS } from '@/lib/litematic/SchematicViewer'
import { HORA_MIN, HORA_MAX, HORA_SERIE, momentoDelDia } from '@/lib/litematic/showcase'
import { HORA_NORMAL } from '@/lib/litematic/vanillaSky'
import { materialsOf, migrateChecked, formatStacks, materialsToText, materialsToCsv, type MaterialBox, type MaterialEntry } from '@/lib/litematic/materials'
import { displayName } from '@/lib/litematic/blockNames'
import { describeProps } from '@/lib/litematic/blockProps'
import { getFaceInfo } from '@/lib/litematic/blockTextures'
import { baseName, getBlockColor, toHex } from '@/lib/litematic/blockColors'
import { shulkerKey, skullKey, type EntityManifest } from '@/lib/litematic/blockEntities'
import { ensureItemAtlas, onItemAtlasLoad, itemIconStyle } from '@/lib/litematic/itemAtlas'
import { cellIndex, isAir } from '@/lib/litematic/types'
import { isTooLargeToRender } from '@/lib/litematic/limits'
import type { SchematicModel, ContainerInfo, ContainerItem, SignText } from '@/lib/litematic/types'

type ViewMode = 'free' | 'iso' | 'orto'

export interface Cargado { model: SchematicModel; atlas: Atlas; db: ModelDB }

const ORTO_SEQ: ViewName[] = ['top', 'north', 'east', 'south', 'west', 'bottom']
const ORTO_NAME: Record<string, string> = { top: 'Arriba', north: 'Norte', east: 'Este', south: 'Sur', west: 'Oeste', bottom: 'Abajo' }
const ORTO_ARIA: Record<string, string> = { top: 'Vista desde arriba', north: 'Vista desde el norte', east: 'Vista desde el este', south: 'Vista desde el sur', west: 'Vista desde el oeste', bottom: 'Vista desde abajo' }

// Foco visible con teclado en los controles del visor. MineLite ya lo pone global;
// el Lite Viewer no.
const FOCO = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4811F]'
// Lo mismo, por dentro, para los botones pegados de un grupo (Libre/Iso/Orto, las
// vistas planas): el grupo recorta lo que sale (overflow-hidden) y el de fuera solo
// asomaba por un lado. En el botón encendido (naranja) va oscuro, o no se vería.
const FOCO_DENTRO = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#F4811F] aria-pressed:focus-visible:outline-[#0d0d0f]'
// Botón encendido o apagado.
const ON  = { background: '#F4811F', color: '#0d0d0f', borderColor: '#F4811F' }
const OFF = { background: '#161618', color: '#A1A1AA', borderColor: '#2A2A2E' }

// Corte por ejes, de la celda mínima a la máxima (incluidas).
type Corte = { x: [number, number]; y: [number, number]; z: [number, number] }
const corteEntero = (m: SchematicModel): Corte => ({ x: [0, m.width - 1], y: [0, m.height - 1], z: [0, m.length - 1] })

const fmt = (n: number) => n.toLocaleString('es-ES')

// ─── Checklist persistence ────────────────────────────────────────────────────

// Lo que identifica a un schematic en este navegador (nombre, tamaño y bloques).
function modelId(model: SchematicModel): string {
  return `${model.name}|${model.width}x${model.height}x${model.length}|${model.totalBlocks}`
}
// La lista cuenta ítems desde la Fase 4 y se guarda en otra clave: la de antes
// (lv:checklist:, por bloque) se pasa una vez a la nueva y no se vuelve a leer.
// Si se leyera en cada carga, una fila desmarcada volvería a salir marcada.
function checklistKey(model: SchematicModel): string {
  return `lv:checklist2:${modelId(model)}`
}
function loadChecked(model: SchematicModel, entries: MaterialEntry[]): Set<string> {
  try {
    const nueva = localStorage.getItem(checklistKey(model))
    if (nueva !== null) return new Set(JSON.parse(nueva) as string[])
    const vieja = JSON.parse(localStorage.getItem(`lv:checklist:${modelId(model)}`) ?? '[]') as string[]
    const set = migrateChecked(model, entries, new Set(vieja))
    if (vieja.length) saveChecked(model, set)
    return set
  } catch { return new Set() }
}
function saveChecked(model: SchematicModel, set: Set<string>) {
  try { localStorage.setItem(checklistKey(model), JSON.stringify([...set])) } catch { /* noop */ }
}

// Capas hechas (capa a capa), por su altura y en el mismo sitio que la checklist.
function capasKey(model: SchematicModel): string {
  return `lv:capas:${modelId(model)}`
}
function loadHechas(model: SchematicModel): Set<number> {
  try { return new Set((JSON.parse(localStorage.getItem(capasKey(model)) ?? '[]') as unknown[]).filter((v): v is number => typeof v === 'number')) } catch { return new Set() }
}
function saveHechas(model: SchematicModel, set: Set<number>) {
  try { localStorage.setItem(capasKey(model), JSON.stringify([...set].sort((a, b) => a - b))) } catch { /* noop */ }
}

// Capas con bloques: de la primera a la última que no son solo aire. La capa 1 es
// la de abajo con algo (si el schematic trae aire debajo, no cuenta).
function rangoCapas(m: SchematicModel): [number, number] {
  const aire = new Uint8Array(m.palette.length)
  m.palette.forEach((p, i) => { aire[i] = !p || isAir(p.name) ? 1 : 0 })
  const WL = m.width * m.length
  const vacia = (y: number) => {
    const o = y * WL
    for (let i = 0; i < WL; i++) if (!aire[m.blocks[o + i]]) return false
    return true
  }
  let y0 = 0
  while (y0 < m.height - 1 && vacia(y0)) y0++
  let y1 = m.height - 1
  while (y1 > y0 && vacia(y1)) y1--
  return [y0, y1]
}

// El valor tras `ms` sin cambiar (la lista del corte no se rehace en cada tic del slider).
function useDiferido<T>(v: T, ms: number): T {
  const [d, setD] = useState(v)
  useEffect(() => {
    const t = setTimeout(() => setD(v), ms)
    return () => clearTimeout(t)
  }, [v, ms])
  return d
}

// Para nombres de archivo: sin acentos pero sin perder la letra ("España" → "espana").
function slug(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function descargar(texto: string, tipo: string, nombre: string) {
  const blob = new Blob([texto], { type: tipo })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = nombre
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url)
}

// Al portapapeles, con el respaldo de execCommand donde no hay API (http, iframes viejos).
async function copiar(texto: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(texto); return true } catch { /* respaldo */ }
  try {
    const ta = document.createElement('textarea')
    ta.value = texto
    ta.style.position = 'fixed'; ta.style.opacity = '0'
    document.body.appendChild(ta); ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  } catch { return false }
}

// ─── Campo numérico editable (un límite de corte) ───────────────────────────────

// `ya`: el valor es definitivo (Intro o salir del campo) y la malla se rehace al
// momento. Con las flechas no: se pueden pulsar seguidas y se espera a que paren.
function NumField({ value, min, max, accent, label, onCommit }: {
  value: number; min: number; max: number; accent: string; label: string; onCommit: (v: number, ya: boolean) => void
}) {
  const [draft, setDraft] = useState(String(value))
  useEffect(() => { setDraft(String(value)) }, [value])

  function commit() {
    let n = parseInt(draft, 10)
    if (isNaN(n)) n = value
    n = Math.max(min, Math.min(max, n))
    onCommit(n, true)
    setDraft(String(n))
  }

  return (
    <input
      value={draft}
      inputMode="numeric"
      aria-label={label}
      onChange={(e) => setDraft(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
      onFocus={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.select() }}
      onBlur={(e) => { commit(); e.currentTarget.style.borderColor = '#2A2A2E' }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
        else if (e.key === 'ArrowUp')   { e.preventDefault(); onCommit(Math.min(max, value + 1), false) }
        else if (e.key === 'ArrowDown') { e.preventDefault(); onCommit(Math.max(min, value - 1), false) }
      }}
      className="w-9 text-center text-[12px] tabular-nums rounded-md py-0.5 outline-none transition-colors"
      style={{ background: '#0F0F11', border: '1px solid #2A2A2E', color: '#F5F5F0' }}
    />
  )
}

// Paso de teclado de un control deslizante (rol slider): flechas de uno en uno,
// RePág/AvPág de diez, Inicio/Fin a los extremos. null = no es una tecla suya.
function sliderKey(e: React.KeyboardEvent, v: number, lo: number, hi: number, step = 1): number | null {
  let n: number
  switch (e.key) {
    case 'ArrowLeft': case 'ArrowDown': n = v - step; break
    case 'ArrowRight': case 'ArrowUp': n = v + step; break
    case 'PageDown': n = v - step * 10; break
    case 'PageUp': n = v + step * 10; break
    case 'Home': n = lo; break
    case 'End': n = hi; break
    default: return null
  }
  e.preventDefault()
  e.stopPropagation()   // las flechas también son atajos del visor (capa del corte)
  return Math.max(lo, Math.min(hi, n))
}

// ─── Control de un eje: badge + inputs + slider doble ────────────────────────────

interface AxisSlicerProps {
  letter: string; name: string; color: string
  axisMax: number; minV: number; maxV: number
  // `ya` = rehacer la malla ahora; si no, el visor espera a que el corte pare.
  onChange: (min: number, max: number, ya?: boolean) => void
  onCommit: () => void   // se soltó el tirador
}

function AxisSlicer({ letter, name, color, axisMax, minV, maxV, onChange, onCommit }: AxisSlicerProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pct = (v: number) => axisMax <= 0 ? 0 : (v / axisMax) * 100

  function valueAt(clientX: number): number {
    const rect = trackRef.current!.getBoundingClientRect()
    return Math.max(0, Math.min(axisMax, Math.round(((clientX - rect.left) / rect.width) * axisMax)))
  }
  // Toda la pista (32 px de alto, para el dedo) responde: el tirador más cercano al
  // punto pulsado salta ahí y se sigue arrastrando. Antes solo valían los tiradores
  // (14 px) y, con mínimo = máximo, el de arriba tapaba al otro y no se podía bajar
  // del mínimo. En ese empate decide hacia dónde se mueve.
  function startDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.preventDefault()
    const el = trackRef.current!
    el.setPointerCapture(e.pointerId)
    // Valores vivos durante el arrastre: las props llegan un render tarde.
    let lo = minV, hi = maxV
    const v0 = valueAt(e.clientX)
    const dMin = Math.abs(v0 - lo), dMax = Math.abs(v0 - hi)
    let cual: 'min' | 'max' | null = dMin < dMax ? 'min' : dMax < dMin ? 'max' : lo === hi ? null : v0 > hi ? 'max' : 'min'
    const mover = (v: number) => {
      if (cual === null) { if (v === lo) return; cual = v < lo ? 'min' : 'max' }
      if (cual === 'max') hi = Math.max(lo, v); else lo = Math.min(hi, v)
      onChange(lo, hi)
    }
    mover(v0)
    const move = (ev: PointerEvent) => mover(valueAt(ev.clientX))
    // Al soltar se rehace la malla. Mientras se arrastra, el visor solo mueve los
    // planos de recorte (ver SchematicViewer.setSlice).
    const up = () => {
      try { el.releasePointerCapture(e.pointerId) } catch { /* noop */ }
      el.removeEventListener('pointermove', move as EventListener)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
      onCommit()
    }
    el.addEventListener('pointermove', move as EventListener)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
  }

  const cut = minV !== 0 || maxV !== axisMax
  const thumb = 'absolute top-1/2 w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2 cursor-grab ' + FOCO

  // 10 px entre los campos y la pista: más pegados, el dedo que tocaba la parte de
  // arriba de la pista acababa en el campo (el navegador ajusta el toque al control
  // más cercano) y abría el teclado en vez de mover el tirador.
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="flex items-center justify-center w-[18px] h-[18px] rounded-md text-[11px] font-bold"
            style={{ color, background: color + '22' }} aria-hidden="true">{letter}</span>
          <span className="text-[11px] text-[#A1A1AA]">{name}</span>
        </div>
        <div className="flex items-center gap-1">
          <NumField value={minV} min={0} max={maxV} accent={color} label={`${name}: desde`} onCommit={(v, ya) => onChange(v, maxV, ya)} />
          <span className="text-[#8A8A93] text-[11px]" aria-hidden="true">–</span>
          <NumField value={maxV} min={minV} max={axisMax} accent={color} label={`${name}: hasta`} onCommit={(v, ya) => onChange(minV, v, ya)} />
        </div>
      </div>

      <div ref={trackRef} className="relative h-8 cursor-pointer select-none" style={{ touchAction: 'none' }} onPointerDown={startDrag}>
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full" style={{ background: '#2A2A2E' }} />
        <div className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full"
          style={{ left: `${pct(minV)}%`, right: `${100 - pct(maxV)}%`, background: cut ? color : '#3F3F46' }} />
        <div role="slider" tabIndex={0} aria-label={`${name}: desde`} aria-valuemin={0} aria-valuemax={maxV} aria-valuenow={minV}
          className={`${thumb} border-2`} style={{ left: `${pct(minV)}%`, background: '#0D0D0F', borderColor: color }}
          onKeyDown={(e) => { const v = sliderKey(e, minV, 0, maxV); if (v !== null) onChange(v, maxV) }} />
        <div role="slider" tabIndex={0} aria-label={`${name}: hasta`} aria-valuemin={minV} aria-valuemax={axisMax} aria-valuenow={maxV}
          className={thumb} style={{ left: `${pct(maxV)}%`, background: color }}
          onKeyDown={(e) => { const v = sliderKey(e, maxV, minV, axisMax); if (v !== null) onChange(minV, v) }} />
      </div>
    </div>
  )
}

// ─── Slider continuo de un thumb (mismo look que los cortes) ─────────────────────
// onCommit: al soltar (o con cada tecla), para lo que solo se rehace entonces.
function ThumbSlider({ value, min, max, label, valueText, color = '#F4811F', onChange, onCommit }: {
  value: number; min: number; max: number; label: string; valueText?: string; color?: string
  onChange: (v: number) => void; onCommit?: (v: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0

  function valueAt(clientX: number): number {
    const rect = trackRef.current!.getBoundingClientRect()
    const t = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    return min + t * (max - min)
  }
  function startDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.preventDefault()
    const el = trackRef.current!
    el.setPointerCapture(e.pointerId)
    onChange(valueAt(e.clientX))
    let last = valueAt(e.clientX)
    const move = (ev: PointerEvent) => { last = valueAt(ev.clientX); onChange(last) }
    const up = () => {
      onCommit?.(last)
      try { el.releasePointerCapture(e.pointerId) } catch { /* noop */ }
      el.removeEventListener('pointermove', move as EventListener)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
    }
    el.addEventListener('pointermove', move as EventListener)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
  }

  // Pista de 32 px de alto para el dedo; la barra se ve igual de fina.
  return (
    <div ref={trackRef} className="relative h-8 cursor-pointer select-none"
      style={{ touchAction: 'none' }} onPointerDown={startDrag}>
      <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full" style={{ background: '#2A2A2E' }} />
      <div className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full" style={{ width: `${pct}%`, background: color }} />
      <div role="slider" tabIndex={0} aria-label={label} aria-valuemin={min} aria-valuemax={max} aria-valuenow={Math.round(value * 100) / 100}
        aria-valuetext={valueText}
        className={`absolute top-1/2 w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2 cursor-grab ${FOCO}`}
        style={{ left: `${pct}%`, background: color }}
        onKeyDown={(e) => { const v = sliderKey(e, value, min, max, (max - min) / 50); if (v !== null) { onChange(v); onCommit?.(v) } }} />
    </div>
  )
}

// ─── Cortes (slicers) ──────────────────────────────────────────────────────────

const SLICE_AXES = [
  { axis: 'y' as const, letter: 'Y', name: 'Alto',  color: '#F4811F' },
  { axis: 'x' as const, letter: 'X', name: 'Ancho', color: '#F4811F' },
  { axis: 'z' as const, letter: 'Z', name: 'Largo', color: '#F4811F' },
]

// El corte vive en Viewer3D (los atajos de teclado suben y bajan la capa); aquí
// solo se enseña y se cambia. Abierto o minimizado también lo decide Viewer3D: en
// pantallas estrechas no caben dos paneles abiertos a la vez.
// `sinAlto`: en capa a capa la altura la lleva su panel y aquí solo quedan X y Z.
// `abajo`: lo que ocupa abajo el panel de capa a capa cuando llega a esta columna
// (el chip minimizado va encima; el panel abierto, centrado en lo que queda entre
// la barra y él, y con scroll si no cabe: en el móvil en horizontal lo tapaba).
// `arriba`: con el panel del bloque abierto encima (en la misma columna), Cortes va
// debajo de él en vez de centrado, para que no se solapen.
function SlicersPanel({ model, corte, abierto, onAbierto, estrecho, sinAlto = false, abajo = 0, arriba = 0, onCambio, onQuitar, onSoltar }: {
  model: SchematicModel; corte: Corte; abierto: boolean; onAbierto: (v: boolean) => void; estrecho: boolean
  sinAlto?: boolean; abajo?: number; arriba?: number
  onCambio: (axis: 'x' | 'y' | 'z', min: number, max: number, ya?: boolean) => void
  onQuitar: () => void; onSoltar: () => void
}) {
  const dimMax = { x: model.width - 1, y: model.height - 1, z: model.length - 1 }
  const ejes = sinAlto ? SLICE_AXES.filter((a) => a.axis !== 'y') : SLICE_AXES
  const active = ejes.some(({ axis: a }) => corte[a][0] !== 0 || corte[a][1] !== dimMax[a])
  const collapsed = !abierto

  return (
    <div className="absolute z-10 flex flex-col gap-3 p-4" role="group" aria-label="Cortes"
      // Minimizado en pantalla estrecha va abajo: en medio tapaba justo el centro,
      // que es donde queda la build (y el bloque al que te acercas con doble toque).
      style={{ left: 14, ...(collapsed && estrecho ? { bottom: 14 + abajo }
                 : arriba ? { top: arriba, maxHeight: `calc(100% - ${arriba + 16 + abajo}px)`, overflowY: 'auto' }
                 : abajo ? { top: `calc(28px + (100% - ${abajo}px) / 2)`, transform: 'translateY(-50%)', maxHeight: `calc(100% - ${64 + abajo}px)`, overflowY: 'auto' }
                 : { top: '50%', transform: 'translateY(-50%)' }), width: collapsed ? 'auto' : 'min(86vw, 236px)',
               background: 'rgba(22,22,24,.94)', backdropFilter: 'blur(8px)',
               border: '1px solid #2a2a2e', borderRadius: 16, boxShadow: '0 10px 34px rgba(0,0,0,.4)' }}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#A1A1AA]">Cortes</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] tabular-nums text-[#8A8A93]">{model.width}×{model.height}×{model.length}</span>
          <button type="button" onClick={() => onAbierto(collapsed)}
            className={`flex items-center justify-center w-6 h-6 rounded text-[#A1A1AA] hover:text-[#F5F5F0] transition-colors ${FOCO}`}
            aria-expanded={!collapsed} aria-label={collapsed ? 'Abrir los cortes' : 'Minimizar los cortes'} title={collapsed ? 'Abrir' : 'Minimizar'}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d={collapsed ? 'M2 4l4 4 4-4' : 'M2 8l4-4 4 4'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {!collapsed && (
        <>
          {/* Separados lo mismo que los campos de su pista (ver AxisSlicer). */}
          <div className="flex flex-col gap-2.5">
            {ejes.map(({ axis, letter, name, color }) => (
              <AxisSlicer key={axis} letter={letter} name={name} color={color}
                axisMax={dimMax[axis]} minV={corte[axis][0]} maxV={corte[axis][1]}
                onChange={(min, max, ya) => onCambio(axis, min, max, ya)} onCommit={onSoltar} />
            ))}
          </div>

          <button type="button" onClick={onQuitar} disabled={!active}
            className={`text-xs rounded-lg py-1.5 border transition-colors ${FOCO}`}
            style={active
              ? { color: '#F5F5F0', background: '#1C1C1F', borderColor: '#2A2A2E', cursor: 'pointer' }
              : { color: '#8A8A93', background: 'transparent', borderColor: '#232327', cursor: 'default' }}>
            Quitar cortes
          </button>
        </>
      )}
    </div>
  )
}

// ─── Panel de materiales ───────────────────────────────────────────────────────

// De qué parte de la build es la lista: toda, la capa (la de capa a capa, o la de
// arriba del corte) o lo que deja ver el corte.
type Alcance = 'todo' | 'capa' | 'corte'
const ALCANCES: { v: Alcance; label: string }[] = [
  { v: 'todo', label: 'Todo' }, { v: 'capa', label: 'Esta capa' }, { v: 'corte', label: 'Corte actual' },
]

// `grande`: build demasiado grande para dibujarla. Entonces es lo único que hay:
// sale abierto, en el centro y con el aviso arriba.
// Acaba por encima de la brújula y, en pantalla estrecha, del chip de Cortes, que va
// abajo y si no quedaba debajo de la lista sin poder pulsarse. `oculto`: escondido
// pero montado (la lista cuesta de calcular), mientras el panel del bloque o el
// inventario ocupan su sitio arriba. `abajo`: lo que ocupa abajo el panel de capa
// a capa en pantalla estrecha.
// Cada fila: la casilla de "preparado" (solo en Todo: lo preparado es de la build
// entera) y el resto, que resalta en 3D dónde va ese material. Sin `onResaltar`
// (build demasiado grande, sin 3D) no hay nada que resaltar: la fila entera es la
// casilla, como antes.
function MaterialsPanel({ model, atlas, db, entityManifest, abierto, onAbierto, grande = false, oculto = false,
  title, alcance, onAlcance, corte, capaY, capa, cortado, abajo = 0, resaltado, onResaltar }: {
  model: SchematicModel; atlas: Atlas; db: ModelDB | null; entityManifest: EntityManifest | null
  abierto: boolean; onAbierto: (v: boolean) => void; grande?: boolean; oculto?: boolean
  title: string; alcance: Alcance; onAlcance: (a: Alcance) => void
  corte: Corte; capaY: number; capa: { n: number; total: number }; cortado: boolean; abajo?: number
  resaltado: string | null; onResaltar?: (key: string | null, pals: number[]) => void
}) {
  const todo = useMemo(() => materialsOf(model), [model])
  const [checked, setChecked] = useState<Set<string>>(() => loadChecked(model, todo.entries))
  useEffect(() => { setChecked(loadChecked(model, todo.entries)) }, [model, todo])
  const [copiado, setCopiado] = useState<'si' | 'no' | null>(null)
  const collapsed = !abierto
  useItemAtlasReady()

  // La capa y el corte, cuando el corte lleva un rato quieto (recorrerlo entero en
  // L son ~70 ms). La altura de la capa va al momento: es una sola capa.
  const corteD = useDiferido(corte, 150)
  const lista = useMemo(() => {
    if (alcance === 'todo') return todo
    const box: MaterialBox = alcance === 'capa' ? { x: corteD.x, y: [capaY, capaY], z: corteD.z } : corteD
    return materialsOf(model, box)
  }, [alcance, todo, model, corteD, capaY])
  const entries = lista.entries
  const conCasillas = alcance === 'todo'
  // Dónde va un material: sus bloques en toda la build (aunque la lista sea de una capa).
  const palsDe = useMemo(() => new Map(todo.entries.map((e) => [e.key, e.pals])), [todo])
  const nombreResaltado = resaltado && onResaltar ? todo.entries.find((e) => e.key === resaltado)?.name ?? null : null

  function toggle(key: string) {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key); else next.add(key)
      saveChecked(model, next)
      return next
    })
  }
  function clearAll() { setChecked(new Set()); saveChecked(model, new Set()) }

  const dondeTxt = alcance === 'capa' ? `capa ${capa.n} de ${capa.total}` : alcance === 'corte' ? 'corte actual' : ''
  async function copiarLista() {
    const ok = await copiar(materialsToText(`Materiales de ${title || model.name || 'la build'}${dondeTxt ? ` (${dondeTxt})` : ''}`, entries))
    setCopiado(ok ? 'si' : 'no')
    setTimeout(() => setCopiado(null), 1800)
  }
  function descargarCsv() {
    const base = slug(title || model.name || '') || 'schematic'
    const sufijo = alcance === 'capa' ? `capa-${capa.n}` : alcance === 'corte' ? 'corte' : 'materiales'
    descargar(materialsToCsv(entries, conCasillas ? checked : undefined), 'text/csv;charset=utf-8', `${base}-${sufijo}.csv`)
  }

  const btn = `text-[11px] font-semibold text-[#F4811F] px-2 py-0.5 rounded-md border border-[#2A2A2E] bg-[#1C1C1F] hover:border-[#F4811F] transition-colors ${FOCO}`
  const dims = alcance === 'corte'
    ? `${corte.x[1] - corte.x[0] + 1} × ${corte.y[1] - corte.y[0] + 1} × ${corte.z[1] - corte.z[0] + 1}`
    : `${model.width} × ${model.height} × ${model.length}`

  return (
    <div className="absolute z-10 flex flex-col overflow-hidden" role="group" aria-label="Materiales"
      // Abajo deja sitio a la brújula (y, en pantalla estrecha, al chip de Cortes).
      style={{ top: 60, maxHeight: grande ? 'calc(100% - 76px)' : `calc(100% - ${148 + abajo}px)`, display: oculto ? 'none' : undefined,
               ...(grande ? { left: '50%', transform: 'translateX(-50%)', width: 'min(92vw, 420px)' } : { right: 12, width: collapsed ? 'auto' : 'min(86vw, 300px)' }),
               background: '#161618', border: '1px solid #2a2a2e', borderRadius: 14 }}>
      {grande && (
        <div className="flex items-start gap-2.5 px-3.5 pt-3.5 text-left">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F4811F] shrink-0 mt-0.5" aria-hidden="true">
            <path d="M12 2 2 7v10l10 5 10-5V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M2 7l10 5 10-5M12 12v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          <p className="text-[12px] leading-snug text-[#A1A1AA]">
            <span className="font-semibold text-[#F5F5F0]">Demasiado grande para verla en 3D.</span>{' '}
            El navegador no puede dibujar {fmt(model.totalBlocks)} bloques, pero aquí tienes todo lo que lleva.
          </p>
        </div>
      )}
      {/* Cabecera */}
      <div className="p-3.5 shrink-0" style={{ borderBottom: collapsed ? 'none' : '1px solid #2A2A2E' }}>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#A1A1AA]">Materiales</span>
          <div className="flex items-center gap-1.5">
            {!collapsed && (
              <>
                <button type="button" onClick={() => void copiarLista()} aria-live="polite"
                  title="Copiar la lista (Piedra: 3 stacks + 12) para pegarla en un bloc de notas o en Discord" className={btn}>
                  {copiado === 'si' ? 'Copiado' : copiado === 'no' ? 'No se pudo' : 'Copiar'}
                </button>
                <button type="button" onClick={descargarCsv} title="Descargar la lista en CSV (se abre con Excel o Google Sheets)"
                  aria-label="Descargar CSV" className={btn}>
                  CSV
                </button>
              </>
            )}
            <button type="button" onClick={() => onAbierto(collapsed)}
              className={`flex items-center justify-center w-6 h-6 rounded text-[#A1A1AA] hover:text-[#F5F5F0] transition-colors ${FOCO}`}
              aria-expanded={!collapsed} aria-label={collapsed ? 'Abrir los materiales' : 'Minimizar los materiales'} title={collapsed ? 'Abrir' : 'Minimizar'}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d={collapsed ? 'M2 4l4 4 4-4' : 'M2 8l4-4 4 4'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        {/* De qué parte es la lista (sin 3D no hay capas ni cortes que elegir). */}
        {!collapsed && !grande && (
          <div role="radiogroup" aria-label="Materiales de" className="flex mb-2.5 rounded-lg overflow-hidden border border-[#2A2A2E]" style={{ background: '#0F0F11' }}>
            {ALCANCES.map(({ v, label }, i) => {
              const off = v === 'corte' && !cortado
              return (
                <button key={v} type="button" role="radio" aria-checked={alcance === v} disabled={off}
                  title={off ? 'No hay corte: es lo mismo que Todo' : undefined}
                  onClick={() => onAlcance(v)}
                  className={`flex-1 px-1.5 py-1.5 text-[12px] font-medium whitespace-nowrap transition-colors disabled:opacity-40 ${i > 0 ? 'border-l border-[#2A2A2E]' : ''} ${FOCO_DENTRO}`}
                  style={alcance === v ? { background: '#F4811F', color: '#0d0d0f' } : { color: '#A1A1AA' }}>
                  {label}
                </button>
              )
            })}
          </div>
        )}
        <div className="text-lg font-bold tabular-nums text-[#F5F5F0]">
          {alcance === 'capa' ? `Capa ${capa.n} de ${capa.total}` : dims}
        </div>
        <div className="text-xs text-[#A1A1AA] mt-0.5">
          {alcance === 'todo' ? fmt(model.totalBlocks) : fmt(lista.blocks)} bloques · {entries.length} {entries.length === 1 ? 'tipo' : 'tipos'}
          {alcance === 'corte' && <> · corte</>}
        </div>
        {!collapsed && conCasillas && (
          <div className="flex items-center justify-between mt-2 text-xs text-[#A1A1AA]">
            <span>{entries.filter((e) => checked.has(e.key)).length} / {entries.length} preparados</span>
            <button type="button" onClick={clearAll} disabled={checked.size === 0}
              className={`px-2 py-0.5 rounded-md border border-[#2A2A2E] bg-[#1C1C1F] hover:text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors disabled:opacity-50 ${FOCO}`}>
              Desmarcar todo
            </button>
          </div>
        )}
        {nombreResaltado && (
          <div className="flex items-center justify-between gap-2 mt-2 text-xs">
            <span className="min-w-0 truncate text-[#F5F5F0]">
              <span className="text-[#A1A1AA]">Resaltado: </span>{nombreResaltado}
            </span>
            <button type="button" onClick={() => onResaltar?.(null, [])}
              className={`shrink-0 px-2 py-0.5 rounded-md border border-[#F4811F66] text-[#F4811F] bg-[#F4811F14] hover:bg-[#F4811F26] transition-colors ${FOCO}`}>
              Quitar
            </button>
          </div>
        )}
      </div>

      {/* Lista */}
      {!collapsed && <div className="overflow-y-auto p-1.5" style={{ scrollbarWidth: 'thin', scrollbarColor: '#2a2a2e transparent' }}>
        {entries.length === 0 && (
          <p className="px-2 py-3 text-xs text-[#8A8A93]">
            {alcance === 'capa' ? 'Esta capa no lleva nada que colocar.' : 'Aquí no hay nada que colocar.'}
          </p>
        )}
        {entries.map(m => {
          const done = conCasillas && checked.has(m.key)
          const stacks = formatStacks(m.count, m.stack)
          const hi = !!onResaltar && resaltado === m.key
          const casilla = (
            <span className={`w-[18px] h-[18px] shrink-0 rounded-[5px] border flex items-center justify-center transition-colors ${done ? 'bg-[#F4811F] border-[#F4811F]' : 'border-[#3A3A3F]'}`}>
              {done && (
                <svg viewBox="0 0 12 12" fill="none" stroke="#0d0d0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5" aria-hidden="true">
                  <path d="M2 6.5 5 9.5 10 3"/>
                </svg>
              )}
            </span>
          )
          const contenido = (
            <>
              <BlockIcon atlas={atlas} db={db} entityManifest={entityManifest} name={`minecraft:${m.key}`} px={20} />
              {/* Los stacks van debajo del nombre y no del número: con "shulkers" y
                  "stacks" escritos enteros la columna de la derecha dejaba el nombre en
                  cuatro letras. */}
              <span className="flex-1 min-w-0 flex flex-col leading-tight">
                <span className={`text-[13px] truncate ${done ? 'line-through' : 'text-[#F5F5F0]'}`}>{m.name}</span>
                {stacks && <span className="text-[11px] text-[#8A8A93] truncate">{stacks}</span>}
              </span>
              <span className="text-[13px] font-semibold tabular-nums text-[#F5F5F0]">{fmt(m.count)}</span>
            </>
          )
          // Sin 3D: toda la fila marca "preparado".
          if (!onResaltar) return (
            <button key={m.key} type="button" role="checkbox" aria-checked={done}
              aria-label={`${m.name}: ${fmt(m.count)}${stacks ? ` (${stacks})` : ''}`}
              onClick={() => toggle(m.key)}
              className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-left select-none transition-opacity hover:bg-[#1C1C1F] ${done ? 'opacity-50' : ''} ${FOCO}`}>
              {casilla}
              {contenido}
            </button>
          )
          return (
            <div key={m.key} className={`flex items-center rounded-lg transition-colors ${hi ? 'bg-[#F4811F1F]' : 'hover:bg-[#1C1C1F]'}`}
              style={hi ? { boxShadow: 'inset 2px 0 0 #F4811F' } : undefined}>
              {conCasillas && (
                <button type="button" role="checkbox" aria-checked={done} aria-label={`Preparado: ${m.name}`}
                  onClick={() => toggle(m.key)}
                  className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-lg ${FOCO}`}>
                  {casilla}
                </button>
              )}
              <button type="button" aria-pressed={hi}
                aria-label={`${m.name}: ${fmt(m.count)}${stacks ? ` (${stacks})` : ''}. ${hi ? 'Quitar el resaltado' : 'Resaltar dónde va'}`}
                title={hi ? 'Quitar el resaltado' : 'Resaltar dónde va'}
                onClick={() => onResaltar(hi ? null : m.key, palsDe.get(m.key) ?? m.pals)}
                className={`flex-1 min-w-0 flex items-center gap-2.5 py-1.5 pr-2 ${conCasillas ? 'pl-0.5' : 'pl-2'} rounded-lg text-left select-none transition-opacity ${done ? 'opacity-50' : ''} ${FOCO}`}>
                {contenido}
              </button>
            </div>
          )
        })}
      </div>}
    </div>
  )
}

// ─── Bloque seleccionado (clic para identificar) ────────────────────────────────

interface PickedBlock { x: number; y: number; z: number; name: string; properties?: Record<string, string>; content?: ContainerInfo; sign?: SignText; pair?: { x: number; y: number; z: number }; doubleSlots?: number }

// ─── Cofre doble: empareja las dos mitades y une sus inventarios ──────────────
const FACE_VEC: Record<string, [number, number]> = { north: [0, -1], south: [0, 1], west: [-1, 0], east: [1, 0] }
const ROT_CW:  Record<string, string> = { north: 'east', east: 'south', south: 'west', west: 'north' }
const ROT_CCW: Record<string, string> = { north: 'west', west: 'south', south: 'east', east: 'north' }

function blockNameAt(m: SchematicModel, x: number, y: number, z: number): string | null {
  if (x < 0 || y < 0 || z < 0 || x >= m.width || y >= m.height || z >= m.length) return null
  return m.palette[m.blocks[cellIndex(m.width, m.length, x, y, z)]]?.name ?? null
}

// La otra mitad de un cofre doble (Minecraft: left→facing girado en sentido horario,
// right→antihorario), o null si es un cofre simple/no es cofre.
function chestPairCell(m: SchematicModel, x: number, y: number, z: number, name: string, props?: Record<string, string>): { x: number; y: number; z: number } | null {
  const base = baseName(name)
  if (base !== 'chest' && base !== 'trapped_chest') return null
  const type = props?.type
  if (type !== 'left' && type !== 'right') return null
  const dir = type === 'left' ? ROT_CW[props?.facing ?? 'north'] : ROT_CCW[props?.facing ?? 'north']
  const v = FACE_VEC[dir]; if (!v) return null
  const nx = x + v[0], nz = z + v[1]
  if (baseName(blockNameAt(m, nx, y, nz) ?? '') !== base) return null
  return { x: nx, y, z: nz }
}

// Une los dos inventarios de un cofre doble en 54 huecos: mitad `left` 0-26, `right` 27-53.
function mergeDoubleChest(primaryType: string, primary?: ContainerInfo, pair?: ContainerInfo): ContainerInfo {
  const left  = primaryType === 'left' ? primary : pair
  const right = primaryType === 'left' ? pair : primary
  const items: ContainerItem[] = []
  let total = 0
  for (const it of left?.items ?? [])  { items.push(it); total += it.count }
  for (const it of right?.items ?? []) { items.push({ ...it, slot: it.slot + 27 }); total += it.count }
  return { items, total, slots: items.length }
}

const propValueColor = (v: string) => v === 'true' ? '#7BD88F' : v === 'false' ? '#8A8A90' : '#F5F5F0'

// Icono del bloque. El atlas de bloques indexa por nombre de TEXTURA, no de bloque,
// así que la heurística por nombre falla en muchos no-cubo. Orden: overrides
// puntuales → modelo real (cara 'up' del elemento más alto) → nombres habituales →
// color. Aparte: redstone (textura gris que se tiñe en runtime → rojo apagado fijo)
// y shulkers (atlas de entidad → recorte de su cara lateral).
const ICON_OVERRIDE: Record<string, string> = {
  composter: 'composter_side',
  repeater: 'repeater',
  comparator: 'comparator',
  tnt: 'tnt_side',
  piston: 'piston_top',                // cara frontal: tablones
  sticky_piston: 'piston_top_sticky',  // cara frontal: slime (diferencia del normal)
  bamboo: 'bamboo_stalk',              // el ítem no tiene tile propio en el atlas
}

// Ítems sin textura de bloque que se muestran con el icono de su bloque-carga.
const ITEM_ALIAS: Record<string, string> = {
  hopper_minecart: 'hopper',
  chest_minecart: 'chest',
  furnace_minecart: 'furnace',
  tnt_minecart: 'tnt',
  command_block_minecart: 'command_block',
}

// Vista lateral compuesta de una entidad-caja (cofre/ender/trapped/shulker): en la
// textura el lateral está partido en tapa y base (rects no contiguos), así que se
// apilan dos capas recortadas. dx/dy/w/h en px nativos (0-16); rot replica el giro
// de cara del unwrap (los cofres van a 180º). Cuerpo detrás, tapa delante.
interface IconLayer { sx: number; sy: number; w: number; h: number; dx: number; dy: number; rot: number }

function entityBoxIcon(base: string, name: string, m: EntityManifest, px: number) {
  let key: string
  let layers: IconLayer[]
  if (base.endsWith('shulker_box')) {
    key = shulkerKey(name)
    layers = [
      { sx: 16, sy: 44, w: 16, h: 8,  dx: 0, dy: 8, rot: 0 }, // base
      { sx: 16, sy: 16, w: 16, h: 12, dx: 0, dy: 0, rot: 0 }, // tapa
    ]
  } else if (base === 'chest' || base === 'trapped_chest' || base === 'ender_chest') {
    const v = base === 'ender_chest' ? 'ender' : base === 'trapped_chest' ? 'trapped' : 'normal'
    key = `chest/${v}`
    layers = [
      { sx: 42, sy: 33, w: 14, h: 10, dx: 1, dy: 5, rot: 180 }, // cuerpo (cara norte = frente con cerrojo)
      { sx: 42, sy: 14, w: 14, h: 5,  dx: 1, dy: 1, rot: 180 }, // tapa
      { sx: 1,  sy: 1,  w: 2,  h: 4,  dx: 7, dy: 4, rot: 180 }, // cerrojo
    ]
  } else if (skullKey(name)) {
    key = skullKey(name)!
    layers = [{ sx: 8, sy: 8, w: 8, h: 8, dx: 4, dy: 4, rot: 0 }] // cara frontal de la cabeza
  } else {
    return null
  }

  const r = m.tex[key]
  if (!r) return null
  const [AW, AH] = m.size
  const scale = px / 16

  return (
    <div style={{ position: 'relative', width: px, height: px }}>
      {layers.map((L, i) => (
        <div key={i} style={{
          position: 'absolute', left: L.dx * scale, top: L.dy * scale,
          width: L.w * scale, height: L.h * scale,
          transform: L.rot ? `rotate(${L.rot}deg)` : undefined,
          backgroundImage: `url(${asset('entity-atlas.png')}${m.v ? `?v=${m.v}` : ''})`,
          backgroundSize: `${AW * scale}px ${AH * scale}px`,
          backgroundPosition: `-${(r.x + L.sx) * scale}px -${(r.y + L.sy) * scale}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
        }} />
      ))}
    </div>
  )
}

// Color del polvo de redstone según señal (rampa de Minecraft): power 0 = rojo
// oscuro casi apagado, power 15 = rojo vivo.
function redstoneCss(power: number): string {
  const f = Math.max(0, Math.min(15, power)) / 15
  const r = Math.round((f * 0.6 + (f > 0 ? 0.4 : 0.3)) * 255)
  const g = Math.round(Math.max(0, Math.min(1, f * f * 0.7 - 0.5)) * 255)
  const b = Math.round(Math.max(0, Math.min(1, f * f * 0.6 - 0.7)) * 255)
  return `rgb(${r},${g},${b})`
}

// Carga el atlas de iconos de ítem y repinta cuando llega (para que aparezcan
// los iconos de ítems puros en materiales/contenedores sin recargar).
function useItemAtlasReady(): void {
  const [, force] = useState(0)
  useEffect(() => { ensureItemAtlas(); return onItemAtlasLoad(() => force((v) => v + 1)) }, [])
}

function blockIconStyle(atlas: Atlas, db: ModelDB | null, name: string, properties: Record<string, string> | undefined, px: number): Record<string, string> {
  const base = baseName(name)
  const inset = 'inset 0 0 0 1px rgba(255,255,255,.12)'

  // Redstone: la textura del polvo es gris (se tiñe en runtime). Se usa como
  // máscara sobre el color de la señal → el polvo en rojo en vez de un cuadro.
  if (base === 'redstone_wire' || base === 'redstone') {
    const power = base === 'redstone' ? 9 : (parseInt(properties?.power ?? '0', 10) || 0)
    const color = redstoneCss(power)
    const css = atlas.cssBackground('redstone_dust_dot', px)
    if (css) return {
      background: color,
      WebkitMaskImage: css.backgroundImage, maskImage: css.backgroundImage,
      WebkitMaskSize: css.backgroundSize, maskSize: css.backgroundSize,
      WebkitMaskPosition: css.backgroundPosition, maskPosition: css.backgroundPosition,
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
    }
    return { background: color, boxShadow: inset }
  }

  const candidates: string[] = []
  if (ICON_OVERRIDE[base]) candidates.push(ICON_OVERRIDE[base])
  const parts = db?.resolve(name, properties)
  if (parts) {
    const ups: { y: number; tile: string }[] = []
    for (const part of parts)
      for (const el of part.model.elements) {
        const up = el.faces['up']
        if (up) ups.push({ y: el.to[1], tile: up.tile })
      }
    ups.sort((a, b) => b.y - a.y)
    for (const u of ups) candidates.push(u.tile)
  }
  candidates.push(getFaceInfo(name, properties).tiles[2], `${base}_top`, base, `${base}_side`)
  for (const t of candidates) {
    const css = atlas.cssBackground(t, px)
    if (css) return css
  }
  // Ítem puro sin textura de bloque (espada, comida, redstone…): icono del atlas de ítems.
  const item = itemIconStyle(name, px)
  if (item) return item
  return { background: toHex(getBlockColor(name, properties)), boxShadow: inset }
}

// Vista cenital del modelo real: apila la cara superior de cada elemento en su
// huella (x,z). Para repetidor/comparador esto pone las antorchas sobre la losa.
function modelTopIcon(atlas: Atlas, db: ModelDB | null, name: string, properties: Record<string, string> | undefined, px: number) {
  const parts = db?.resolve(name, properties)
  if (!parts) return null
  const scale = px / 16
  interface UpFace { y: number; tile: string; uv: [number, number, number, number]; fx: number; fz: number; w: number; h: number }
  const faces: UpFace[] = []
  for (const part of parts)
    for (const el of part.model.elements) {
      const up = el.faces['up']
      if (!up) continue
      faces.push({ y: el.to[1], tile: up.tile, uv: up.uv, fx: el.from[0], fz: el.from[2], w: el.to[0] - el.from[0], h: el.to[2] - el.from[2] })
    }
  if (faces.length === 0) return null
  faces.sort((a, b) => a.y - b.y) // de abajo a arriba: lo alto se dibuja encima

  return (
    <div style={{ position: 'relative', width: px, height: px }}>
      {faces.map((f, i) => {
        const css = atlas.cssCrop(f.tile, f.uv[0], f.uv[1], f.uv[2], f.uv[3], f.w * scale, f.h * scale)
        if (!css) return null
        return <div key={i} style={{ position: 'absolute', left: f.fx * scale, top: f.fz * scale, width: f.w * scale, height: f.h * scale, ...css }} />
      })}
    </div>
  )
}

// Vista lateral del modelo (plano X-Y, cara sur): apila la cara lateral de cada
// elemento en su huella x,y. Para escaleras dibuja el perfil de escalón en L.
function modelSideIcon(atlas: Atlas, db: ModelDB | null, name: string, properties: Record<string, string> | undefined, px: number) {
  const parts = db?.resolve(name, properties)
  if (!parts) return null
  const scale = px / 16
  interface SideFace { z: number; tile: string; uv: [number, number, number, number]; fx: number; fy: number; w: number; h: number }
  const faces: SideFace[] = []
  for (const part of parts)
    for (const el of part.model.elements) {
      const face = el.faces['south'] ?? el.faces['north'] ?? el.faces['east'] ?? el.faces['west']
      if (!face) continue
      faces.push({ z: el.to[2], tile: face.tile, uv: face.uv, fx: el.from[0], fy: el.from[1], w: el.to[0] - el.from[0], h: el.to[1] - el.from[1] })
    }
  if (faces.length === 0) return null
  faces.sort((a, b) => a.z - b.z) // atrás primero

  return (
    <div style={{ position: 'relative', width: px, height: px }}>
      {faces.map((f, i) => {
        const css = atlas.cssCrop(f.tile, f.uv[0], f.uv[1], f.uv[2], f.uv[3], f.w * scale, f.h * scale)
        if (!css) return null
        const top = (16 - (f.fy + f.h)) * scale // y arriba en el mundo → top del icono
        return <div key={i} style={{ position: 'absolute', left: f.fx * scale, top, width: f.w * scale, height: f.h * scale, ...css }} />
      })}
    </div>
  )
}

function BlockIcon({ atlas, db, entityManifest, name, properties, px = 44 }: {
  atlas: Atlas; db: ModelDB | null; entityManifest: EntityManifest | null; name: string; properties?: Record<string, string>; px?: number
}) {
  const alias = ITEM_ALIAS[baseName(name)]
  const realName = alias ? `minecraft:${alias}` : name
  const base = baseName(realName)
  let inner = entityManifest ? entityBoxIcon(base, realName, entityManifest, px) : null
  if (!inner && (base === 'repeater' || base === 'comparator')) inner = modelTopIcon(atlas, db, realName, properties, px)
  if (!inner && base.endsWith('stairs')) inner = modelSideIcon(atlas, db, realName, properties, px)
  return (
    <div className="shrink-0 overflow-hidden"
      style={{ width: px, height: px, borderRadius: Math.max(3, Math.round(px * 0.18)), ...(inner ? {} : blockIconStyle(atlas, db, realName, properties, px)) }}>
      {inner}
    </div>
  )
}

// Distribución de huecos por contenedor (cols × total) para el HUD del inventario.
const CONTAINER_COLS: Record<string, { cols: number; size: number }> = {
  hopper: { cols: 5, size: 5 },
  brewing_stand: { cols: 5, size: 5 },
  dropper: { cols: 3, size: 9 },
  dispenser: { cols: 3, size: 9 },
  crafter: { cols: 3, size: 9 },
  furnace: { cols: 3, size: 3 },
  blast_furnace: { cols: 3, size: 3 },
  smoker: { cols: 3, size: 3 },
  chest: { cols: 9, size: 27 },
  trapped_chest: { cols: 9, size: 27 },
  barrel: { cols: 9, size: 27 },
}

function containerLayout(base: string, items: ContainerItem[]): { cols: number; size: number } {
  if (base.endsWith('shulker_box')) return { cols: 9, size: 27 }
  const l = CONTAINER_COLS[base]
  if (l) return l
  const size = Math.max(1, items.reduce((m, it) => Math.max(m, it.slot + 1), 0))
  return { cols: Math.min(9, size), size }
}

function ContainerInventory({ name, content, atlas, db, entityManifest, forceSize, onClose }: {
  name: string; content: ContainerInfo; atlas: Atlas; db: ModelDB | null; entityManifest: EntityManifest | null; forceSize?: number; onClose: () => void
}) {
  useItemAtlasReady()
  const base = baseName(name)
  const layout = containerLayout(base, content.items)
  const cols = layout.cols
  const size = forceSize ?? layout.size
  const total = Math.max(size, content.items.reduce((m, it) => Math.max(m, it.slot + 1), 0))
  const bySlot = new Map(content.items.map((it) => [it.slot, it]))
  const disabledSet = new Set(content.disabled ?? [])

  // Panel NO modal anclado a la izquierda: deja seguir moviendo el schematic detrás.
  return (
    <div className="absolute z-20 flex flex-col gap-3 p-4"
      style={{ left: 14, top: 56, maxWidth: 'min(92vw, 460px)', maxHeight: 'calc(100% - 72px)', overflowY: 'auto',
               background: 'rgba(22,22,24,.98)', border: '1px solid #2a2a2e', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,.5)' }}>
        <div className="flex items-center gap-2.5">
          <BlockIcon atlas={atlas} db={db} entityManifest={entityManifest} name={name} px={28} />
          <div className="flex flex-col leading-tight">
            <span className="text-[14px] font-semibold text-[#F5F5F0]">{displayName(name)}</span>
            <span className="text-[11px] text-[#A1A1AA]">
              {fmt(content.total)} ítems · {content.slots} {content.slots === 1 ? 'hueco' : 'huecos'}
              {content.disabled?.length ? ` · ${content.disabled.length} bloqueados` : ''}
            </span>
          </div>
          <div className="flex-1" />
          <button onClick={onClose} aria-label="Cerrar" className="flex items-center justify-center w-6 h-6 rounded text-[#A1A1AA] hover:text-[#F5F5F0] transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, 40px)` }}>
          {Array.from({ length: total }, (_, i) => {
            const it = bySlot.get(i)
            const blocked = disabledSet.has(i)
            return (
              <div key={i} className="relative flex items-center justify-center"
                style={{ width: 40, height: 40, borderRadius: 6,
                         background: blocked ? '#241719' : '#0F0F11',
                         border: `1px solid ${blocked ? '#5A2E2E' : '#2A2A2E'}` }}
                title={blocked ? 'Bloqueado' : it ? `${displayName(it.id)} ×${it.count}` : undefined}>
                {it && (
                  <>
                    <BlockIcon atlas={atlas} db={db} entityManifest={entityManifest} name={it.id} px={32} />
                    {it.count > 1 && (
                      <span className="absolute" style={{ right: 2, bottom: 0, fontSize: 11, fontWeight: 600, color: '#fff', textShadow: '1px 1px 0 #000' }}>{it.count}</span>
                    )}
                  </>
                )}
                {blocked && (
                  <svg className="absolute" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                    <path d="M12 12 28 28M28 12 12 28" stroke="#C0584F" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
            )
          })}
        </div>
    </div>
  )
}

function SignBox({ lines }: { lines: string[] }) {
  return (
    <div className="rounded-lg px-2.5 py-2 flex flex-col items-center gap-0.5" style={{ background: '#0F0F11', border: '1px solid #2A2A2E' }}>
      {lines.length
        ? lines.map((l, i) => <span key={i} className="text-[12px] text-center text-[#F5F5F0]" style={{ minHeight: 14, lineHeight: '14px' }}>{l || ' '}</span>)
        : <span className="text-[12px] italic text-[#8A8A93]">(vacío)</span>}
    </div>
  )
}

// Medida entre dos bloques: el de la selección (a) y el que se toca después (b).
interface Celda { x: number; y: number; z: number }
interface Medida { a: Celda; b: (Celda & { name: string }) | null }

const coordTxt = (c: Celda) => `${c.x}, ${c.y}, ${c.z}`

// `capaDe`: el número de capa de una altura (capa 1 = la de abajo con bloques).
// `abajo`: lo que ocupa abajo el panel de capa a capa (el del bloque no lo tapa).
function SelectedBlockPanel({ picked, atlas, db, entityManifest, capaDe, medida, onMedir, abajo = 0, panelRef, onOpenInventory, onClose }: {
  picked: PickedBlock; atlas: Atlas; db: ModelDB | null; entityManifest: EntityManifest | null
  capaDe: (y: number) => number; medida: Medida | null; onMedir: (on: boolean) => void; abajo?: number
  panelRef?: React.Ref<HTMLDivElement>
  onOpenInventory: () => void; onClose: () => void
}) {
  const props = describeProps(picked.name, picked.properties)
  // Recién salido no recoge el puntero: el segundo toque de un doble toque sobre un
  // bloque que queda donde sale el panel tiene que llegar al lienzo (que acerca la
  // cámara), no al panel ni a su X.
  const [frio, setFrio] = useState(true)
  useEffect(() => {
    setFrio(true)
    const t = setTimeout(() => setFrio(false), DBL_MS + 50)
    return () => clearTimeout(t)
  }, [picked])
  const b = medida?.b
  const d = b ? { x: Math.abs(b.x - picked.x), y: Math.abs(b.y - picked.y), z: Math.abs(b.z - picked.z) } : null
  const fila = 'flex items-center justify-between gap-4 text-[12px]'

  return (
    <div ref={panelRef} className="absolute z-10 flex flex-col gap-3 p-4"
      style={{ left: 14, top: 56, minWidth: 210, maxWidth: 'min(360px, calc(100% - 28px))', maxHeight: `calc(100% - ${72 + abajo}px)`, overflowY: 'auto', pointerEvents: frio ? 'none' : undefined,
               background: 'rgba(22,22,24,.94)', backdropFilter: 'blur(8px)',
               border: '1px solid #2a2a2e', borderRadius: 16, boxShadow: '0 10px 34px rgba(0,0,0,.4)' }}>
      <button onClick={onClose} aria-label="Cerrar"
        className="absolute top-2.5 right-2.5 flex items-center justify-center w-5 h-5 rounded text-[#8A8A93] hover:text-[#F5F5F0] transition-colors">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="flex items-center gap-3 pr-5">
        <BlockIcon atlas={atlas} db={db} entityManifest={entityManifest} name={picked.name} properties={picked.properties} />
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[15px] font-semibold text-[#F5F5F0] leading-tight truncate" title={displayName(picked.name)}>{displayName(picked.name)}</span>
          <span className="text-[11px] text-[#8A8A93] font-mono leading-tight truncate" title={picked.name}>{picked.name}</span>
        </div>
      </div>

      {/* Dónde está: coordenadas desde la esquina del schematic (0, 0, 0) y su capa. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] tabular-nums" title="Coordenadas desde la esquina del schematic">
        <span><span className="text-[#8A8A93]">x</span> <span className="text-[#F5F5F0] font-medium">{picked.x}</span></span>
        <span><span className="text-[#8A8A93]">y</span> <span className="text-[#F5F5F0] font-medium">{picked.y}</span></span>
        <span><span className="text-[#8A8A93]">z</span> <span className="text-[#F5F5F0] font-medium">{picked.z}</span></span>
        <span className="text-[#F4811F] font-medium">capa {capaDe(picked.y)}</span>
      </div>

      {picked.content && (
        <button onClick={onOpenInventory}
          className="flex items-center gap-1.5 self-start text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-colors hover:brightness-125"
          style={{ background: '#F4811F1A', border: '1px solid #F4811F40', color: '#F4811F' }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="1.5" y="3" width="11" height="9" rx="1" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M1.5 6.5h11M7 6.5v5.5" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
          Inventario · {fmt(picked.content.total)} ítems
        </button>
      )}

      {picked.sign && (
        <div className="flex flex-col gap-1.5 pt-3" style={{ borderTop: '1px solid #232327' }}>
          {picked.sign.back.length > 0 && <span className="text-[10px] uppercase tracking-wide text-[#8A8A93]">Frente</span>}
          <SignBox lines={picked.sign.front} />
          {picked.sign.back.length > 0 && (
            <>
              <span className="text-[10px] uppercase tracking-wide text-[#8A8A93] mt-1">Detrás</span>
              <SignBox lines={picked.sign.back} />
            </>
          )}
        </div>
      )}

      {props.length > 0 && (
        <div className="flex flex-col gap-2 pt-3" style={{ borderTop: '1px solid #232327' }}>
          {props.map((p) => (
            <div key={p.raw} className={fila} title={p.raw}>
              <span className="text-[#8A8A93] truncate">{p.label}</span>
              <span className="font-medium tabular-nums text-right" style={{ color: p.bool === undefined ? '#F5F5F0' : propValueColor(String(p.bool)) }}>{p.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Medir: desde este bloque hasta el que se toque después. */}
      <div className="flex flex-col gap-2 pt-3" style={{ borderTop: '1px solid #232327' }}>
        {!medida ? (
          <button type="button" onClick={() => onMedir(true)}
            className={`flex items-center gap-1.5 self-start text-[12px] font-medium px-2.5 py-1.5 rounded-lg border border-[#2A2A2E] bg-[#1C1C1F] text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors ${FOCO}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 17 17 3l4 4L7 21l-4-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M7 13l2 2M10 10l2 2M13 7l2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            Medir distancia
          </button>
        ) : (
          <>
            {!b ? (
              <span className="text-[12px] text-[#5EC8F2]" role="status">Ahora toca el otro bloque.</span>
            ) : (
              // Compacto: las cotas (por eje, contando los dos bloques, y en línea recta)
              // van dibujadas en la propia línea, en el visor.
              <div className="flex flex-col gap-1.5 text-[12px] tabular-nums" role="status">
                <div className={fila}>
                  <span className="text-[#8A8A93]">Hasta</span>
                  <span className="text-[#5EC8F2] font-medium truncate" title={b.name}>{displayName(b.name)} ({coordTxt(b)})</span>
                </div>
                <span className="text-[#F5F5F0] font-medium">
                  <span style={{ color: '#F0624D' }}>{d!.x + 1}</span> × <span style={{ color: '#5BCB6E' }}>{d!.y + 1}</span> × <span style={{ color: '#4E9BF7' }}>{d!.z + 1}</span> bloques
                  <span className="text-[#8A8A93] font-normal"> · {Math.hypot(d!.x, d!.y, d!.z).toLocaleString('es-ES', { maximumFractionDigits: 1 })} en línea recta</span>
                </span>
              </div>
            )}
            <button type="button" onClick={() => onMedir(false)}
              className={`self-start text-[12px] font-medium px-2.5 py-1.5 rounded-lg border border-[#2A2A2E] bg-[#1C1C1F] text-[#A1A1AA] hover:text-[#F5F5F0] transition-colors ${FOCO}`}>
              {b ? 'Terminar de medir' : 'Cancelar'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Ayuda de controles ─────────────────────────────────────────────────────────

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded border border-[#3A3A3F] bg-[#0F0F11] text-[11px] font-semibold text-[#F5F5F0] font-sans">
      {children}
    </kbd>
  )
}

// Sale sola la primera vez que se abre el visor completo; luego, con ? o desde el
// botón de ayuda. Con dedo o ratón según el aparato, y los atajos solo si hay teclado.
// En iso y orto arrastrar no gira, desplaza; y el vuelo solo está en la libre.
// En la libre, el izquierdo mira (primera persona) y el derecho gira alrededor del
// centro de lo que se ve.
function AyudaPanel({ tactil, teclado, vista, onClose }: { tactil: boolean; teclado: boolean; vista: ViewMode; onClose: () => void }) {
  const libre = vista === 'free'
  const fila = (k: React.ReactNode, v: string) => (
    <div className="flex items-baseline gap-3 text-[12px] leading-snug">
      <span className="w-[112px] shrink-0 font-medium text-[#F5F5F0]">{k}</span>
      <span className="text-[#A1A1AA]">{v}</span>
    </div>
  )
  return (
    <div role="dialog" aria-label="Cómo mover el visor" className="absolute z-20 flex flex-col gap-3 p-4"
      style={{ right: 16, bottom: 16, width: 'min(calc(100% - 32px), 410px)', maxHeight: 'calc(100% - 80px)', overflowY: 'auto',
               background: 'rgba(22,22,24,.97)', border: '1px solid #2a2a2e', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,.5)' }}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[13px] font-semibold text-[#F5F5F0]">Cómo moverte</span>
        <button type="button" onClick={onClose} aria-label="Cerrar la ayuda"
          className={`flex items-center justify-center w-6 h-6 rounded text-[#A1A1AA] hover:text-[#F5F5F0] transition-colors ${FOCO}`}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div className="flex flex-col gap-1.5">
        {tactil ? (
          <>
            {fila('Un dedo', libre ? 'Girar alrededor del centro de la build' : 'Desplazar')}
            {fila('Dos dedos', 'Acercar, alejar y desplazar')}
            {fila('Doble toque', 'Acercarte a un bloque')}
            {fila('Un toque', 'Ver qué bloque es')}
          </>
        ) : (
          <>
            {libre ? (
              <>
                {fila('Arrastrar', 'Mirar alrededor, sin moverte')}
                {fila('Botón derecho', 'Girar alrededor del centro de la build')}
                {fila(<span>Central o <span className="whitespace-nowrap">Mayús + derecho</span></span>, 'Desplazar')}
              </>
            ) : (
              <>
                {fila('Arrastrar', 'Desplazar')}
                {fila('Botón derecho', 'Desplazar')}
              </>
            )}
            {fila('Rueda', 'Acercar y alejar hacia el cursor')}
            {fila('Doble clic', 'Acercarte a un bloque')}
            {fila('Clic', 'Ver qué bloque es')}
          </>
        )}
      </div>
      {teclado && (
        <div className="flex flex-col gap-1.5 pt-3" style={{ borderTop: '1px solid #232327' }}>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#A1A1AA]">Atajos</span>
          {fila(<span className="inline-flex flex-wrap items-center gap-1"><Kbd>↑</Kbd><Kbd>↓</Kbd><span className="text-[#A1A1AA] font-normal">o</span><Kbd>[</Kbd><Kbd>]</Kbd></span>, 'Subir o bajar una capa (la del corte de altura, o la de capa a capa)')}
          {fila(<Kbd>C</Kbd>, 'Capa a capa: una capa entera, la de debajo en fantasma y lo de arriba oculto')}
          {fila(<span className="inline-flex items-center gap-1"><Kbd>1</Kbd><Kbd>2</Kbd><Kbd>3</Kbd></span>, 'Vista libre, isométrica y plana')}
          {fila(<Kbd>R</Kbd>, 'Reajustar la cámara')}
          {fila(<Kbd>P</Kbd>, 'Hacer una foto')}
          {fila(<Kbd>?</Kbd>, 'Abrir o cerrar esta ayuda')}
          {libre && fila('Vuelo WASD', 'Encendido de serie (se apaga con su botón): WASD te mueve y Espacio y Mayús suben y bajan')}
        </div>
      )}
      <button type="button" onClick={onClose}
        className={`self-end px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors hover:brightness-110 ${FOCO}`}
        style={{ background: '#F4811F', color: '#0d0d0f' }}>
        Entendido
      </button>
    </div>
  )
}

// ─── Capa a capa ───────────────────────────────────────────────────────────────

// Abajo y con botones grandes, para el dedo: se usa con el móvil al lado mientras
// se construye. `n` es la capa (1 = la de abajo con bloques) e `y` su altura en el
// schematic. El número se puede escribir para saltar a una capa.
// `derecha`: lo que ocupa la columna de la derecha (Materiales) cuando el panel,
// centrado en la pantalla, llegaría a ella (tableta en vertical, móvil en
// horizontal). Entonces va centrado en lo que queda a la izquierda.
function CapaPanel({ n, total, y, hecha, hechas, estrecho, derecha = 0, panelRef, onIr, onPaso, onHecha, onSalir }: {
  n: number; total: number; y: number; hecha: boolean; hechas: number; estrecho: boolean; derecha?: number
  panelRef: React.Ref<HTMLDivElement>
  onIr: (n: number) => void; onPaso: (d: number) => void; onHecha: () => void; onSalir: () => void
}) {
  const [draft, setDraft] = useState(String(n))
  useEffect(() => { setDraft(String(n)) }, [n])
  // Con el valor del campo y no el del estado: escribir y salir pueden ir en el mismo tic.
  // El campo enseña la capa ya acotada aunque no cambie (0 en la capa 1 se quedaba
  // en 0: sin cambio de `n` no se ponía al día).
  function commit(txt: string) {
    const v = parseInt(txt, 10)
    if (isNaN(v)) { setDraft(String(n)); return }
    const c = Math.max(1, Math.min(total, v))
    setDraft(String(c))
    onIr(c)
  }
  const paso = `flex items-center justify-center w-12 h-11 shrink-0 rounded-xl border border-[#2A2A2E] bg-[#1C1C1F] text-[#F5F5F0] transition-colors hover:border-[#3A3A3F] active:bg-[#26262A] disabled:opacity-35 ${FOCO}`
  const pct = total ? Math.min(100, (hechas / total) * 100) : 0

  return (
    <div ref={panelRef} role="group" aria-label="Capa a capa" className="absolute z-10 flex flex-col gap-2 p-2.5"
      style={{ bottom: 12, ...(estrecho ? { left: 8, right: 8 }
                : derecha ? { left: 8, right: derecha, marginLeft: 'auto', marginRight: 'auto', width: `min(400px, calc(100% - ${8 + derecha}px))` }
                : { left: '50%', transform: 'translateX(-50%)', width: 400 }),
               background: 'rgba(22,22,24,.96)', backdropFilter: 'blur(8px)',
               border: '1px solid #2a2a2e', borderRadius: 16, boxShadow: '0 10px 34px rgba(0,0,0,.45)' }}>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => onPaso(-1)} disabled={n <= 1} aria-label="Bajar una capa" title="Bajar una capa (↓)" className={paso}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4 9h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <div className="flex-1 min-w-0 flex flex-col items-center leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#A1A1AA]">Capa <span className="normal-case tracking-normal font-medium text-[#8A8A93]">· y {y}</span></span>
          <span className="flex items-baseline justify-center text-lg font-bold tabular-nums text-[#F5F5F0]">
            <input value={draft} inputMode="numeric" aria-label={`Capa, de 1 a ${total}`}
              onChange={(e) => setDraft(e.target.value.replace(/[^0-9]/g, '').slice(0, 5))}
              onFocus={(e) => e.currentTarget.select()}
              onBlur={(e) => commit(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
                else if (e.key === 'ArrowUp') { e.preventDefault(); onPaso(1) }
                else if (e.key === 'ArrowDown') { e.preventDefault(); onPaso(-1) }
              }}
              className="bg-transparent text-right outline-none rounded-md px-0.5 focus:bg-[#0F0F11] focus:outline focus:outline-1 focus:outline-[#F4811F]"
              style={{ width: `${Math.max(2, String(total).length) + 0.8}ch` }} />
            <span className="ml-1 text-[#8A8A93] font-semibold">/ {total}</span>
          </span>
        </div>
        <button type="button" onClick={() => onPaso(1)} disabled={n >= total} aria-label="Subir una capa" title="Subir una capa (↑)" className={paso}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4 9h10M9 4v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <button type="button" onClick={onSalir} aria-label="Salir de capa a capa" title="Salir de capa a capa (C)"
          className={`flex items-center justify-center w-9 h-9 shrink-0 rounded-lg text-[#A1A1AA] hover:text-[#F5F5F0] transition-colors ${FOCO}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div className="flex items-center gap-2.5">
        <button type="button" role="checkbox" aria-checked={hecha} onClick={onHecha}
          className={`h-10 px-3 shrink-0 flex items-center gap-2 rounded-xl border text-[13px] font-semibold transition-colors ${FOCO}`}
          style={hecha ? { background: '#F4811F', borderColor: '#F4811F', color: '#0d0d0f' } : { background: '#1C1C1F', borderColor: '#2A2A2E', color: '#F5F5F0' }}>
          <span className="w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center"
            style={hecha ? { borderColor: '#0d0d0f' } : { borderColor: '#52525A' }}>
            {hecha && (
              <svg viewBox="0 0 12 12" fill="none" stroke="#0d0d0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5" aria-hidden="true">
                <path d="M2 6.5 5 9.5 10 3"/>
              </svg>
            )}
          </span>
          Capa hecha
        </button>
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <span className="text-[12px] text-[#A1A1AA] tabular-nums truncate">{hechas} de {total} capas hechas</span>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#2A2A2E' }}
            role="progressbar" aria-label="Capas hechas" aria-valuemin={0} aria-valuemax={total} aria-valuenow={hechas}>
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#F4811F' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Brújula ───────────────────────────────────────────────────────────────────

// Norte, este, sur y oeste según hacia dónde mira la cámara: gira con ella. La
// mueve el visor directamente (onHeading) y no React, que en un giro repintaría
// todo el visor en cada frame. Las letras se quedan derechas.
const BR = 60, BR_R = 19
const BR_LETRAS = ['N', 'E', 'S', 'O']
const brPos = (a: number) => `translate(${(Math.sin(a) * BR_R).toFixed(1)}px, ${(-Math.cos(a) * BR_R).toFixed(1)}px)`

function Brujula({ registra, abajo }: { registra: (fn: ((h: number) => void) | null) => void; abajo: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    registra((h) => {
      const el = ref.current
      if (!el) return
      el.querySelectorAll<HTMLElement>('[data-rumbo]').forEach((s) => { s.style.transform = brPos(h + Number(s.dataset.rumbo) * Math.PI / 2) })
      const ag = el.querySelector<SVGSVGElement>('[data-aguja]')
      if (ag) ag.style.transform = `rotate(${h.toFixed(4)}rad)`
    })
    return () => registra(null)
  }, [registra])
  return (
    <div ref={ref} role="img" aria-label="Brújula: dónde quedan el norte, el este, el sur y el oeste" className="absolute z-10 pointer-events-none select-none"
      style={{ right: 14, bottom: 14 + abajo, width: BR, height: BR }}>
      <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(13,13,15,.72)', border: '1px solid #2A2A2E' }} />
      <svg data-aguja="" width={BR} height={BR} viewBox="0 0 60 60" className="absolute inset-0" aria-hidden="true">
        <path d="M30 20 33 30h-6Z" fill="#F4811F" />
        <path d="M30 40 33 30h-6Z" fill="#52525A" />
      </svg>
      {BR_LETRAS.map((l, i) => (
        <span key={l} data-rumbo={i} aria-hidden="true" className="absolute text-[11px] font-bold leading-none text-center"
          style={{ left: BR / 2 - 5, top: BR / 2 - 5.5, width: 10, height: 11, color: i === 0 ? '#F4811F' : '#D4D4D8', transform: brPos(i * Math.PI / 2) }}>
          {l}
        </span>
      ))}
    </div>
  )
}

// ─── Canvas del visor (reutilizable) ───────────────────────────────────────────

interface ViewerCanvasProps {
  cargado:    Cargado
  viewerRef:  React.MutableRefObject<SchematicViewer | null>
  onReady?:   () => void
  onRebuild?: (truncated: boolean) => void
  onTap?:     (clientX: number, clientY: number) => void
  onHeading?: (rad: number) => void
  className?: string
  style?:     React.CSSProperties
}

export function ViewerCanvas({ cargado, viewerRef, onReady, onRebuild, onTap, onHeading, className, style }: ViewerCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // De layout y no pasivo: su limpieza corre con el lienzo aún en la página. La de un
  // useEffect llegaba con él ya quitado, y OrbitControls no encontraba el document
  // para quitar su oyente de teclado, que retenía el visor entero (cientos de MB).
  useLayoutEffect(() => {
    const host = containerRef.current
    if (!host) return
    // Canvas nuevo en cada montaje: dispose() suelta el contexto WebGL a propósito
    // (forceContextLoss) y un canvas con el contexto perdido ya no le sirve al
    // siguiente visor. Pasa con el doble montaje de StrictMode y al cambiar `cargado`.
    const canvas = document.createElement('canvas')
    canvas.style.display = 'block'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    host.appendChild(canvas)
    const viewer = new SchematicViewer(canvas)
    viewerRef.current = viewer
    if (onRebuild) viewer.onRebuild = onRebuild
    if (onTap) viewer.onTap = onTap
    if (onHeading) viewer.onHeading = onHeading
    viewer.setAtlas(cargado.atlas)
    viewer.setModelDB(cargado.db)
    viewer.load(cargado.model)
    onReady?.()
    return () => {
      viewer.dispose()
      if (viewerRef.current === viewer) viewerRef.current = null
      canvas.remove()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cargado])

  useEffect(() => {
    const c = containerRef.current
    if (!c) return
    const ro = new ResizeObserver(() => viewerRef.current?.resize())
    ro.observe(c)
    return () => ro.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={containerRef} className={className} style={style} />
}

// ─── Ajustes de vista ───────────────────────────────────────────────────────────

// Lo que cambia cómo se ve la build pero no cómo se mueve: foto, fondo, suelo y
// texturas. Antes eran botones sueltos en la barra (y casi todos acababan en "Más
// opciones" en cuanto la pantalla estrechaba); aquí cada uno con su nombre y su
// estado a la vista. Solo el contenido: abrir, cerrar y colocar lo lleva Viewer3D.

// La pinta de un interruptor. El rol (switch) y el clic van en la fila entera.
function Interruptor({ on }: { on: boolean }) {
  return (
    <span aria-hidden="true" className="relative shrink-0 w-9 h-5 rounded-full transition-colors"
      style={{ background: on ? '#F4811F' : '#2A2A2E' }}>
      <span className="absolute top-0.5 w-4 h-4 rounded-full transition-[left]"
        style={{ left: on ? 18 : 2, background: on ? '#0d0d0f' : '#A1A1AA' }} />
    </span>
  )
}

const FILA = `flex items-center gap-3 w-full min-w-0 text-left px-2.5 py-2 rounded-lg transition-colors hover:bg-[#1F1F23] ${FOCO}`
const TITULO_FILA = 'block text-[13px] font-medium text-[#F5F5F0]'
const DESC_FILA = 'block text-[11px] leading-snug text-[#8A8A93]'
const SECCION = 'px-2.5 pt-3 pb-1 mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#8A8A93] border-t border-[#232327]'
// Botón pequeño al final de una fila (volver al color de serie, quitar la imagen).
const BOTON_FILA = `flex items-center justify-center shrink-0 w-8 h-8 rounded-lg border border-[#2A2A2E] text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors ${FOCO}`

function FilaInterruptor({ on, titulo, desc, ocupado = false, onClick }: {
  on: boolean; titulo: string; desc: string; ocupado?: boolean; onClick: () => void
}) {
  const id = useId()
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={titulo} aria-describedby={id} aria-busy={ocupado || undefined}
      onClick={onClick} className={FILA} style={ocupado ? { opacity: 0.6 } : undefined}>
      <span className="min-w-0 flex-1">
        <span className={TITULO_FILA}>{titulo}</span>
        <span id={id} className={DESC_FILA}>{desc}</span>
      </span>
      <Interruptor on={on} />
    </button>
  )
}

// Fondo de la vista normal: el cielo de día de Minecraft (de serie), un color o una imagen.
type FondoModo = 'cielo' | 'color' | 'imagen'
const FONDOS: { v: FondoModo; label: string }[] = [
  { v: 'cielo', label: 'Cielo de Minecraft' }, { v: 'color', label: 'Color' }, { v: 'imagen', label: 'Imagen' },
]

interface AjustesProps {
  teclado: boolean
  // En el modo exhibición la foto sale con el cielo del atardecer (y en JPG).
  exhibicion: boolean
  photoBusy: boolean; onFoto: () => void
  // Elegir 'imagen' sin ninguna puesta abre el selector de archivos (ver elegirFondo).
  fondo: FondoModo; onFondo: (m: FondoModo) => void
  // onColorSerie: vuelve al color de serie.
  bgColor: string; onColor: (c: string) => void; onColorSerie: () => void
  bgImage: string | null; onElegirImagen: () => void; onQuitarImagen: () => void
  suelo: boolean; onSuelo: () => void
  rt: boolean; rtCargando: boolean; onRt: () => void
  // Hojas: null si la build no tiene.
  hojas: { rapidas: boolean; caben: boolean; onCambia: (rapidas: boolean) => void } | null
}

function AjustesVista({ teclado, exhibicion, photoBusy, onFoto, fondo, onFondo, bgColor, onColor, onColorSerie, bgImage, onElegirImagen, onQuitarImagen,
  suelo, onSuelo, rt, rtCargando, onRt, hojas }: AjustesProps) {
  const id = useId()
  // Volver al de serie y quitar la imagen esconden su botón: el foco pasa a su fila.
  const colorRef = useRef<HTMLInputElement>(null)
  const imagenRef = useRef<HTMLButtonElement>(null)
  const deSerie = bgColor.toLowerCase() === BG_PREDET
  const conFondo = (fondo === 'imagen' && !!bgImage) || (fondo === 'color' && !deSerie)
  // Con demasiadas hojas para las detalladas la malla pasaría del tope y saldría
  // recortada: se quedan en rápidas y se dice por qué.
  const bloqueadas = !!hojas && hojas.rapidas && !hojas.caben
  return (
    <>
      {/* Foto: sin fondo propio sale en PNG transparente; con él, en JPG con el fondo.
          Con el cielo de Minecraft, en JPG con el cielo; en el modo exhibición, con el
          del atardecer (lo tapa todo). */}
      {/* aria-disabled y no disabled: con el teclado, el foco no se pierde mientras guarda. */}
      <button type="button" onClick={onFoto} aria-disabled={photoBusy} aria-describedby={`${id}-foto`}
        className={`${FILA} aria-disabled:opacity-60`}>
        <span className="flex items-center justify-center w-8 h-8 shrink-0 rounded-lg" style={{ background: '#F4811F', color: '#0d0d0f' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
            <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.7"/>
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className={TITULO_FILA}>{photoBusy ? 'Guardando…' : 'Hacer foto'}</span>
          <span id={`${id}-foto`} className={DESC_FILA}>{exhibicion ? 'JPG con el cielo del atardecer' : fondo === 'cielo' ? 'JPG con el cielo de Minecraft' : conFondo ? 'JPG con el fondo que has puesto' : 'PNG con fondo transparente'}</span>
        </span>
        {teclado && <Kbd>P</Kbd>}
      </button>

      <div className={SECCION} aria-hidden="true">Fondo</div>
      {/* El cielo tapa el fondo: que no parezca que el color o la imagen no van. */}
      {exhibicion && <span className={`${DESC_FILA} px-2.5 pb-1`}>En el modo exhibición se ve el cielo del atardecer; tu fondo vuelve al salir.</span>}
      <div role="group" aria-label="Fondo" className="flex flex-col">
        {/* Cielo, color o imagen. Flechas para cambiar, sin que suban o bajen la capa
            (atajo del visor). Elegir "Imagen" sin ninguna abre el selector. */}
        <div className="px-2.5 py-2">
          <div role="radiogroup" aria-label="Fondo de la vista normal"
            className="flex rounded-lg overflow-hidden border border-[#2A2A2E]" style={{ background: '#0F0F11' }}
            onKeyDown={(e) => {
              const d = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : 0
              if (!d) return
              e.preventDefault()
              e.stopPropagation()
              const i = FONDOS.findIndex((f) => f.v === fondo)
              const next = FONDOS[(i + d + FONDOS.length) % FONDOS.length].v
              onFondo(next)
              ;(e.currentTarget.querySelector(`[data-fondo="${next}"]`) as HTMLElement | null)?.focus()
            }}>
            {FONDOS.map((f, i) => {
              const on = fondo === f.v
              return (
                <button key={f.v} type="button" role="radio" aria-checked={on} tabIndex={on ? 0 : -1}
                  data-fondo={f.v} onClick={() => { if (!on) onFondo(f.v) }}
                  className={`${f.v === 'cielo' ? 'flex-[1.7]' : 'flex-1'} flex items-center justify-center px-1.5 py-1.5 text-[12px] font-medium whitespace-nowrap transition-colors ${i > 0 ? 'border-l border-[#2A2A2E]' : ''} ${FOCO_DENTRO}`}
                  style={on ? { background: '#F4811F', color: '#0d0d0f' } : { color: '#A1A1AA' }}>
                  {f.label}
                </button>
              )
            })}
          </div>
          {fondo === 'cielo' && <span className={`${DESC_FILA} mt-1.5`}>El de día del juego, con su sol y sus nubes.</span>}
        </div>

        {/* Volver al de serie devuelve la foto en PNG transparente, y en el selector del
            sistema no hay forma de dar con él. */}
        {fondo === 'color' && (
        <div className="flex items-center gap-1.5 pr-1">
          <label className={`${FILA} relative cursor-pointer focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#F4811F]`}>
            <span className="min-w-0 flex-1">
              <span className={TITULO_FILA}>Color de fondo</span>
              <span className={`${DESC_FILA} tabular-nums`}>{deSerie ? 'El de serie' : bgColor.toUpperCase()}</span>
            </span>
            <span className="w-7 h-7 shrink-0 rounded-md border border-white/20" style={{ background: bgColor }} aria-hidden="true" />
            <input ref={colorRef} type="color" value={bgColor} aria-label="Color de fondo"
              onChange={(e) => onColor(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          </label>
          {!deSerie && (
            <button type="button" onClick={() => { onColorSerie(); colorRef.current?.focus() }} aria-label="Volver al color de serie" title="Volver al color de serie" className={BOTON_FILA}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v4.5h4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
        )}

        {fondo === 'imagen' && (
        <div className="flex items-center gap-1.5 pr-1">
          <button ref={imagenRef} type="button" onClick={onElegirImagen} aria-describedby={`${id}-img`} className={FILA}>
            <span className="min-w-0 flex-1">
              <span className={TITULO_FILA}>Imagen de fondo</span>
              <span id={`${id}-img`} className={DESC_FILA}>{bgImage ? 'Puesta. Pulsa para cambiarla' : 'Ninguna. Pulsa para elegir una'}</span>
            </span>
            {bgImage ? (
              <span className="w-7 h-7 shrink-0 rounded-md border border-white/20 bg-cover bg-center" style={{ backgroundImage: `url("${bgImage}")` }} aria-hidden="true" />
            ) : (
              <span className="flex items-center justify-center w-7 h-7 shrink-0 rounded-md border border-dashed border-[#3A3A3F] text-[#A1A1AA]" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor"/>
                  <path d="M21 16l-5-5L5 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            )}
          </button>
          {bgImage && (
            <button type="button" onClick={() => { onQuitarImagen(); imagenRef.current?.focus() }} aria-label="Quitar la imagen de fondo" title="Quitar la imagen de fondo" className={BOTON_FILA}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
          )}
        </div>
        )}

        {/* Cada modo recuerda el suyo: de serie, encendido solo en exhibición. */}
        <FilaInterruptor on={suelo} onClick={onSuelo} titulo="Suelo"
          desc={exhibicion ? 'Césped bajo la build, con su sombra' : 'Césped bajo la build'} />
      </div>

      <div className={SECCION} aria-hidden="true">Texturas</div>
      <div role="group" aria-label="Texturas" className="flex flex-col">
        <FilaInterruptor on={rt} ocupado={rtCargando} onClick={onRt} titulo="Redstone Tweaks"
          desc={rtCargando ? 'Cargando las texturas…' : 'Texturas de RexxStone: la redstone se lee mejor'} />

        {hojas && (
          <div className="px-2.5 py-2">
            <span id={`${id}-hojas`} className={TITULO_FILA}>Hojas</span>
            {/* Como "Gráficos: Detallados / Rápidos" del juego. Flechas para cambiar,
                sin que suban o bajen la capa (atajo del visor). */}
            <div role="radiogroup" aria-labelledby={`${id}-hojas`} aria-describedby={`${id}-hojas-nota`}
              className="flex mt-1.5 rounded-lg overflow-hidden border border-[#2A2A2E]" style={{ background: '#0F0F11' }}
              onKeyDown={(e) => {
                if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return
                e.preventDefault()
                e.stopPropagation()
                if (bloqueadas) return
                const next = !hojas.rapidas
                hojas.onCambia(next)
                ;(e.currentTarget.querySelector(`[data-rapidas="${next}"]`) as HTMLElement | null)?.focus()
              }}>
              {[false, true].map((r, i) => {
                const on = hojas.rapidas === r
                const off = !r && bloqueadas
                return (
                  <button key={String(r)} type="button" role="radio" aria-checked={on} disabled={off} tabIndex={on ? 0 : -1}
                    data-rapidas={String(r)} onClick={() => { if (!on) hojas.onCambia(r) }}
                    className={`flex flex-1 items-center justify-center gap-1.5 px-2 py-1.5 text-[12px] font-medium transition-colors disabled:cursor-not-allowed ${i > 0 ? 'border-l border-[#2A2A2E]' : ''} ${FOCO_DENTRO}`}
                    style={on ? { background: '#F4811F', color: '#0d0d0f' } : { color: off ? '#5A5A62' : '#A1A1AA' }}>
                    {off && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                    {r ? 'Rápidas' : 'Detalladas'}
                  </button>
                )
              })}
            </div>
            <span id={`${id}-hojas-nota`} className={`${DESC_FILA} mt-1.5`}>
              {bloqueadas
                ? 'Esta build tiene demasiadas hojas para verlas detalladas: no cabría entera.'
                : hojas.rapidas
                  ? 'Opacas: más ligeras en builds grandes.'
                  : 'Con huecos, como en el juego: más pesadas en builds grandes.'}
            </span>
          </div>
        )}
      </div>
    </>
  )
}

// ─── Viewer 3D completo (toolbar + cortes + materiales + fondo) ─────────────────

interface Viewer3DProps {
  cargado: Cargado
  title:   string
  onClose?: () => void   // si se pasa → modo pantalla completa (overlay + botón Cerrar + ESC)
  // Vista integrada (ficha): solo el lienzo, sin barra ni paneles y sin seleccionar
  // bloques. Es el MISMO visor que la pantalla completa: LitematicViewer solo
  // alterna esta prop, así que al pasar de una a otra se conservan cámara, corte y
  // modo. Antes el modal montaba un segundo visor encima del integrado (otro
  // contexto WebGL, otro worker y otra malla) que empezaba de cero.
  embedded?: boolean
  // Lite Viewer: soltar otro archivo sobre el visor ya cargado lo abre en su lugar.
  onArchivo?: (file: File) => void
}

// Color de fondo de serie del visor. Sirve además para saber si el usuario ha
// puesto fondo suyo: si el color sigue siendo este y no hay imagen, la foto sale
// en PNG transparente; si lo ha cambiado, sale en JPG con el fondo montado.
const BG_PREDET = '#1c1c1f'

// Botones de la barra que se van al menú "Más opciones" cuando no caben: el orden
// en que salen en la barra y el orden en que se van (primero lo que menos se usa).
// Capa a capa es lo último que se va: es lo que más se usa construyendo con el móvil.
// Foto, fondo, suelo y texturas no están: van en "Ajustes de vista" (ver AjustesVista).
type BarItem = 'capas' | 'ctx' | 'vuelo' | 'exhib' | 'ayuda'
const BAR_ORDEN: BarItem[] = ['capas', 'ctx', 'vuelo', 'exhib', 'ayuda']
const BAR_SALE: BarItem[] = ['ayuda', 'vuelo', 'exhib', 'ctx', 'capas']

// Suelo de césped: uno por modo y solo para la sesión. De serie, encendido en
// los dos modos: la build se apoya en él (y en exhibición recibe su sombra).
const SUELO_KEY = { exhib: 'lv:suelo-exhib', normal: 'lv:suelo-normal' }
function leeSuelo(modo: 'exhib' | 'normal'): boolean {
  try {
    const v = sessionStorage.getItem(SUELO_KEY[modo])
    if (v === '1' || v === '0') return v === '1'
  } catch { /* noop */ }
  return true
}

const AYUDA_KEY = 'lv:ayuda-vista'
// El vuelo WASD apagado a mano: solo para la sesión.
const VUELO_KEY = 'lv:vuelo'
const VUELO_AVISO_KEY = 'lv:vuelo-aviso'   // el aviso de las teclas del vuelo ya salió
// Hora del día: una por modo (cada uno con la suya de serie: el atardecer en
// exhibición y el mediodía con el cielo de Minecraft), solo para la sesión.
const HORA_KEY = { exhib: 'lv:hora-exhib', normal: 'lv:hora-normal' }
function leeHora(modo: 'exhib' | 'normal'): number {
  try {
    const v = parseFloat(sessionStorage.getItem(HORA_KEY[modo]) ?? '')
    if (Number.isFinite(v)) return Math.max(HORA_MIN, Math.min(HORA_MAX, v))
  } catch { /* noop */ }
  return modo === 'exhib' ? HORA_SERIE : HORA_NORMAL
}
// 18.5 -> "18:30" (de 5 en 5 minutos).
function horaTexto(h: number): string {
  const m = Math.round(h * 12) * 5
  return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`
}

// Sin teclado físico (móvil, tableta sola): el puntero principal es un dedo y no
// hay ningún ratón. Si luego llega una tecla, es que sí lo hay.
function sinTeclado(): boolean {
  if (typeof matchMedia === 'undefined') return false
  return matchMedia('(pointer: coarse)').matches && !matchMedia('(any-pointer: fine)').matches
}

// Pantalla completa con el prefijo de Safari (iPad). En iPhone no hay ninguna de
// las dos para un div: se simula (ver fsSim).
type DocFs = Document & { webkitFullscreenElement?: Element | null; webkitExitFullscreen?: () => void; webkitFullscreenEnabled?: boolean }
type ElFs = HTMLElement & { webkitRequestFullscreen?: () => void }
const fsElement = () => document.fullscreenElement ?? (document as DocFs).webkitFullscreenElement ?? null

export function Viewer3D({ cargado, title, onClose, embedded = false, onArchivo }: Viewer3DProps) {
  const fullscreen = !!onClose && !embedded
  // Demasiado grande para dibujarla: no hay visor 3D, pero sí lista de materiales.
  const grande = isTooLargeToRender(cargado.model)
  const viewerRef  = useRef<SchematicViewer | null>(null)
  const [ready,    setReady]    = useState(false)
  // Primera malla de ESTE modelo (onRebuild). Hasta entonces el lienzo está vacío
  // aunque el visor ya esté "listo": se enseña "Construyendo modelo…". Se guarda
  // para qué `cargado` es, así un modelo nuevo vuelve a enseñarlo sin efectos.
  const [malla,    setMalla]    = useState<{ de: Cargado; truncada: boolean } | null>(null)
  const construida = malla?.de === cargado
  const truncada   = construida && malla!.truncada
  const [viewMode, setViewMode] = useState<ViewMode>('free')
  const [ortoIdx,  setOrtoIdx]  = useState(0)
  const [moreOpen, setMoreOpen] = useState(false)   // menú "Más opciones" (lo que no cabe en la barra)
  const [ajustesOpen, setAjustesOpen] = useState(false)   // desplegable "Ajustes de vista"
  const [bgColor,  setBgColor]  = useState(BG_PREDET)
  const [rt,       setRt]       = useState(false)
  const [rtCargando, setRtCargando] = useState(false)
  // Hojas rápidas (opacas): el visor las pone solas en builds con muchas hojas y
  // aquí se pueden cambiar a mano. El botón solo sale si la build tiene hojas.
  const [hojasRapidas, setHojasRapidas] = useState(false)
  // Si las detalladas caben sin truncar la malla (en la XL no: pasan del tope).
  const [hojasCaben, setHojasCaben] = useState(true)
  const hayHojas = useMemo(() => cargado.model.palette.some((p) => p && baseName(p.name).endsWith('_leaves')), [cargado])
  const [bgImage,  setBgImage]  = useState<string | null>(null)
  const [fondo,    setFondo]    = useState<FondoModo>('cielo')
  const bgImgInput = useRef<HTMLInputElement>(null)
  const resCache   = useRef<Record<string, { atlas: Atlas; db: ModelDB }>>({})
  const [picked,   setPicked]   = useState<PickedBlock | null>(null)
  const [invOpen,  setInvOpen]  = useState(false)
  const [showcase, setShowcase] = useState(false)
  const [scPaused, setScPaused] = useState(false)
  // Entrando en exhibición mientras llega la malla con la luz (ver SchematicViewer.setShowcase).
  const [scPrep,   setScPrep]   = useState(false)
  const [hora,     setHora]     = useState(() => leeHora('exhib'))
  const [horaNormal, setHoraNormal] = useState(() => leeHora('normal'))
  const [photoBusy, setPhotoBusy] = useState(false)
  const [flySpeed, setFlySpeed] = useState(1)
  const [flyHelp,  setFlyHelp]  = useState(false)   // vuelo WASD activado (y su panel de velocidad)
  const [flyHint,  setFlyHint]  = useState(false)   // el aviso de las teclas del vuelo (unos segundos)
  const [isFs,     setIsFs]     = useState(false)
  // Pantalla completa simulada (iPhone, o iframe sin permiso): el visor se fija
  // encima de todo con position: fixed.
  const [fsSim,    setFsSim]    = useState(false)
  const [fsApi]    = useState(() => typeof document !== 'undefined' && !!(document.fullscreenEnabled || (document as DocFs).webkitFullscreenEnabled))
  // Los paneles (cortes, materiales...) no se montan hasta la primera vez que se
  // sale de la vista integrada: la lista de materiales recorre todo el volumen y
  // baja el atlas de ítems, y en la ficha la mayoría no abre la pantalla completa.
  // Una vez montados se quedan (escondidos) para no perder su estado.
  const [paneles,  setPaneles]  = useState(!embedded)
  const [corte,    setCorte]    = useState<Corte>(() => corteEntero(cargado.model))
  // Paneles abiertos o minimizados. Cortes arranca minimizado en móvil y Materiales
  // siempre (salvo sin 3D, que es lo único que hay), para no tapar la build. En
  // pantallas estrechas solo cabe uno: abrir uno minimiza el otro y la selección.
  const [cortesAbierto, setCortesAbierto] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 640)
  const [matAbierto, setMatAbierto] = useState(grande)
  // Manifiesto del atlas de entidades para los iconos (cofres, shulkers, cabezas).
  // En estado: si se leyera del visor en el render, los iconos no se pondrían al
  // día hasta que algo repintara. Y con una build demasiado grande no hay visor.
  const [manifest, setManifest] = useState<EntityManifest | null>(null)
  const [teclado,  setTeclado]  = useState(() => !sinTeclado())
  const [tactil]   = useState(() => typeof matchMedia !== 'undefined' && matchMedia('(pointer: coarse)').matches)
  const [ayuda,    setAyuda]    = useState(false)
  // Vista integrada: el visor no se queda la rueda ni el dedo (la página tiene que
  // poder bajar) hasta que se pulsa encima. Vuelve a soltarlos al salir.
  const [interactivo, setInteractivo] = useState(false)
  const [soltando, setSoltando] = useState(false)   // arrastrando un archivo encima (Lite Viewer)
  const containerRef = useRef<HTMLDivElement>(null)
  const barRef     = useRef<HTMLDivElement>(null)
  const vistasRef  = useRef<HTMLDivElement>(null)
  const finRef     = useRef<HTMLDivElement>(null)
  const medirRef   = useRef<HTMLDivElement>(null)
  const menuRef    = useRef<HTMLDivElement>(null)
  const masRef     = useRef<HTMLButtonElement>(null)
  const ajustesRef = useRef<HTMLDivElement>(null)
  const ajBtnRef   = useRef<HTMLButtonElement>(null)
  // Dónde va el desplegable de ajustes (px desde la derecha de la barra), su ancho y
  // su alto máximo. Se mide al abrirlo.
  const [ajPos,    setAjPos]    = useState<{ top: number; right: number; width: number; maxH: number } | null>(null)
  const [barW,     setBarW]     = useState(0)
  const [desborde, setDesborde] = useState('')   // lo que va al menú, separado por comas

  // ── Capa a capa ──
  // Capas con bloques [primera, última]: la capa 1 es la de abajo con algo.
  const rango = useMemo(() => rangoCapas(cargado.model), [cargado])
  const [capaModo, setCapaModo] = useState(false)
  const [capaY,    setCapaY]    = useState(0)     // altura de la capa en capa a capa
  // La misma, al momento: dos pasos seguidos en el mismo tic (teclas repetidas) no
  // pueden partir los dos de la capa de antes.
  const capaYRef   = useRef(0)
  const yPrevio    = useRef<[number, number] | null>(null)   // corte en Y de antes de entrar
  const [hechas,   setHechas]   = useState<Set<number>>(() => loadHechas(cargado.model))
  const capaRef    = useRef<HTMLDivElement>(null)
  const [capaH,    setCapaH]    = useState(0)     // alto del panel de capa a capa
  // Lo de abajo a la izquierda (hora del día y vuelo): su alto, para que los cortes
  // abiertos se centren por encima y no queden debajo.
  const izqRef     = useRef<HTMLDivElement>(null)
  const [izqH,     setIzqH]     = useState(0)
  // Alto del panel del bloque seleccionado: Cortes va debajo (ver SlicersPanel).
  const bloqueRef  = useRef<HTMLDivElement>(null)
  const [bloqueH,  setBloqueH]  = useState(0)
  // Materiales de toda la build, de la capa o del corte, y el que se resalta en 3D.
  const [alcance,  setAlcance]  = useState<Alcance>('todo')
  const [resaltado, setResaltado] = useState<string | null>(null)
  // Medida desde el bloque seleccionado hasta el siguiente que se toque.
  const [medida,   setMedida]   = useState<Medida | null>(null)
  const [sueloExhib,  setSueloExhib]  = useState(() => leeSuelo('exhib'))
  const [sueloNormal, setSueloNormal] = useState(() => leeSuelo('normal'))
  const suelo = showcase ? sueloExhib : sueloNormal
  // La brújula se apunta aquí y el visor la mueve en cada frame (ver Brujula).
  const rumboRef   = useRef<((h: number) => void) | null>(null)
  const registraRumbo = useCallback((fn: ((h: number) => void) | null) => {
    rumboRef.current = fn
    if (fn) viewerRef.current?.requestHeading()
  }, [])

  const entityManifest = viewerRef.current?.getEntityManifest() ?? manifest

  useEffect(() => {
    let vivo = true
    loadEntityManifest().then((m) => { if (vivo) setManifest(m) }).catch(() => { /* iconos de entidad sin recorte */ })
    return () => { vivo = false }
  }, [])

  useEffect(() => { setCorte(corteEntero(cargado.model)) }, [cargado])

  // Otro modelo: fuera capa a capa, resaltado y medida (el visor nuevo empieza sin
  // ellos), y sus capas hechas.
  useEffect(() => {
    setCapaModo(false)
    yPrevio.current = null
    setHechas(loadHechas(cargado.model))
    setAlcance('todo')
    setResaltado(null)
    setMedida(null)
  }, [cargado])

  // Fondo y medida al visor (también al nuevo, si cambia el modelo).
  useEffect(() => {
    const v = viewerRef.current
    if (!v) return
    v.setSky(fondo === 'cielo')
    if (fondo === 'imagen' && bgImage) v.setBackgroundImage(bgImage)
    else v.setBackground(bgColor)
  }, [fondo, bgColor, bgImage, ready, cargado])
  useEffect(() => { viewerRef.current?.setFloor(suelo) }, [suelo, ready, cargado])
  useEffect(() => {
    const v = viewerRef.current
    if (!v) return
    v.onShowcasePrep = setScPrep
    return () => { v.onShowcasePrep = undefined; setScPrep(false) }
  }, [ready, cargado])
  // La hora elegida, también en el visor nuevo si cambia el modelo.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (showcase) viewerRef.current?.setTimeOfDay(hora) }, [showcase, ready, cargado])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { viewerRef.current?.setNormalTime(horaNormal) }, [ready, cargado])
  useEffect(() => { viewerRef.current?.setMeasure(medida?.a ?? null, medida?.b ?? null) }, [medida])

  // Lo que ocupa el panel de capa a capa: lo que va abajo (chip de cortes, brújula,
  // avisos) se pone encima.
  useEffect(() => {
    const el = capaRef.current
    if (!capaModo || !el) { setCapaH(0); return }
    const ro = new ResizeObserver(() => setCapaH(el.offsetHeight))
    ro.observe(el)
    setCapaH(el.offsetHeight)
    return () => ro.disconnect()
  }, [capaModo, ready, paneles, embedded])

  useEffect(() => {
    const el = izqRef.current
    if (!el) { setIzqH(0); return }
    const ro = new ResizeObserver(() => setIzqH(el.offsetHeight))
    ro.observe(el)
    setIzqH(el.offsetHeight)
    return () => ro.disconnect()
  }, [showcase, fondo, flyHelp, viewMode, ready])

  useEffect(() => {
    const el = bloqueRef.current
    if (!el) { setBloqueH(0); return }
    const ro = new ResizeObserver(() => setBloqueH(el.offsetHeight))
    ro.observe(el)
    setBloqueH(el.offsetHeight)
    return () => ro.disconnect()
  }, [picked, invOpen, ready])

  // Si llega una tecla, hay teclado aunque el aparato sea táctil (tableta con funda).
  useEffect(() => {
    if (teclado) return
    const h = () => setTeclado(true)
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [teclado])

  // Pantalla completa del navegador sobre el contenedor del visor. Sin la API (iPhone,
  // o un iframe sin permiso) se simula fijando el visor encima de todo.
  function toggleFullscreen() {
    const el = containerRef.current as ElFs | null
    if (!el) return
    if (fsSim) { setFsSim(false); return }
    if (fsElement()) {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => { /* noop */ })
      else (document as DocFs).webkitExitFullscreen?.()
      return
    }
    if (fsApi && el.requestFullscreen) el.requestFullscreen().catch(() => setFsSim(true))
    else if (fsApi && el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen()
      // La versión con prefijo no avisa si no entra: se mira al rato.
      setTimeout(() => { if (!fsElement()) setFsSim(true) }, 400)
    }
    else setFsSim(true)
  }
  // Dentro de un iframe (el Lite Viewer en MineLite) la simulada solo llena el
  // iframe: se avisa a la página de fuera para que lo ponga a toda la pantalla (ver
  // components/schematic/LiteViewerFrame). Solo dice si está puesta o no.
  useEffect(() => {
    if (!fsSim || window.parent === window) return
    const avisa = (on: boolean) => {
      try { window.parent.postMessage({ tipo: 'liteviewer:pantalla-completa', on }, '*') } catch { /* noop */ }
    }
    avisa(true)
    return () => avisa(false)
  }, [fsSim])
  useEffect(() => {
    const onFs = () => setIsFs(!!fsElement())
    document.addEventListener('fullscreenchange', onFs)
    document.addEventListener('webkitfullscreenchange', onFs)
    return () => {
      document.removeEventListener('fullscreenchange', onFs)
      document.removeEventListener('webkitfullscreenchange', onFs)
    }
  }, [])

  function toggleShowcase() {
    const next = !showcase
    setShowcase(next)
    // Entra quieta: el play de al lado la hace girar.
    setScPaused(true)
    if (next) { setViewMode('free'); setPicked(null); setInvOpen(false) }
    // El suelo del modo al que se pasa, ya en el primer frame (luego lo mantiene el
    // efecto), y la hora elegida.
    viewerRef.current?.setFloor(next ? sueloExhib : sueloNormal)
    if (next) viewerRef.current?.setTimeOfDay(hora)
    viewerRef.current?.setShowcase(next)
    if (next) alaCapa()
  }

  // Hora del día: arrastrando solo uniforms (y en exhibición la sombra con
  // limitación); al soltar, la sombra ya y se guarda para la sesión. La de la vista
  // normal es la del cielo de Minecraft.
  function cambiaHora(h: number, final: boolean) {
    if (showcase) {
      setHora(h)
      viewerRef.current?.setTimeOfDay(h, final)
    } else {
      setHoraNormal(h)
      viewerRef.current?.setNormalTime(h)
    }
    if (final) { try { sessionStorage.setItem(HORA_KEY[showcase ? 'exhib' : 'normal'], String(h)) } catch { /* noop */ } }
  }
  // El slider sale en exhibición y, fuera, con el cielo de Minecraft (con un color o
  // una imagen de fondo no hay cielo que cambiar).
  const conHora = showcase || fondo === 'cielo'
  const horaVista = showcase ? hora : horaNormal

  function toggleScRotation() {
    const paused = !scPaused
    setScPaused(paused)
    viewerRef.current?.setShowcaseRotation(!paused)
  }

  function toggleVuelo() {
    const v = !flyHelp
    setFlyHelp(v)
    viewerRef.current?.setFlyEnabled(v)
    // Apagado a mano, se queda apagado en la sesión (si no, vuelve al abrir otro visor).
    try { sessionStorage.setItem(VUELO_KEY, v ? '1' : '0') } catch { /* noop */ }
  }

  // El vuelo WASD, encendido de serie en el visor completo con teclado y en la vista
  // libre (en la ficha no: ahí las teclas son de la página). No roba las teclas con el
  // foco en un campo (lo mira el visor). Si se apagó en la sesión, no.
  useEffect(() => {
    if (embedded || !teclado || viewMode !== 'free' || !ready || flyHelp) return
    let apagado = false
    try { apagado = sessionStorage.getItem(VUELO_KEY) === '0' } catch { /* noop */ }
    if (apagado) return
    setFlyHelp(true)
    viewerRef.current?.setFlyEnabled(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [embedded, teclado, viewMode, ready, cargado])

  // El aviso de las teclas, unos segundos al encender el vuelo; luego queda la velocidad.
  // Solo la primera vez en este aparato, como la ayuda: el vuelo va encendido de serie
  // y salía en cada visor que se abría. Después las teclas siguen en la ayuda (?).
  useEffect(() => {
    if (!flyHelp) { setFlyHint(false); return }
    let visto = false
    try { visto = localStorage.getItem(VUELO_AVISO_KEY) === '1' } catch { /* noop */ }
    if (visto) return
    try { localStorage.setItem(VUELO_AVISO_KEY, '1') } catch { /* noop */ }
    setFlyHint(true)
    const t = setTimeout(() => setFlyHint(false), 7000)
    return () => clearTimeout(t)
  }, [flyHelp])

  async function takePhoto() {
    if (photoBusy || !viewerRef.current) return
    setPhotoBusy(true)
    try {
      // Si el usuario le puso fondo (imagen, o un color distinto del de serie), la
      // foto sale CON ese fondo y en JPG. Si no lo ha tocado, se mantiene el PNG
      // transparente para poder recortar la build sobre lo que sea. Volver a poner
      // el color de serie devuelve el PNG transparente. Con el cielo de Minecraft, el
      // visor la saca en JPG con el cielo (no hace falta pasarle nada).
      const conColor = fondo === 'color' && bgColor.toLowerCase() !== BG_PREDET
      const conImagen = fondo === 'imagen' && !!bgImage
      const deFondo = (conImagen || conColor) ? { color: bgColor, imagen: conImagen ? bgImage : null } : null
      const blob = await viewerRef.current?.capturePhoto(deFondo)
      if (blob) {
        // Sin acentos pero sin perder la letra ("España" → "espana", no "espa-a").
        const name = (title || 'schematic').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'schematic'
        const ext = blob.type === 'image/jpeg' ? 'jpg' : 'png'
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = `${name}.${ext}`
        a.click()
        URL.revokeObjectURL(url)
      }
    } finally {
      setPhotoBusy(false)
    }
  }

  function pickBgImage(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return
    const url = URL.createObjectURL(f)
    setBgImage(url)
    setFondo('imagen')
    // El mismo archivo otra vez también tiene que avisar.
    e.target.value = ''
  }
  // Quitar la imagen deja el color.
  function clearBgImage() {
    setBgImage(null)
    setFondo('color')
  }
  function cambiaColor(c: string) {
    setBgColor(c)
    setFondo('color')
  }
  function colorDeSerie() {
    setBgColor(BG_PREDET)
  }
  // "Imagen" sin ninguna puesta abre el selector; el fondo cambia cuando se elige una.
  function elegirFondo(m: FondoModo) {
    if (m === 'imagen' && !bgImage) { bgImgInput.current?.click(); return }
    setFondo(m)
  }

  // Si las texturas no cargan, el botón vuelve a como estaba (antes se quedaba
  // encendido con las texturas de siempre y un error sin capturar).
  async function toggleRt() {
    if (rtCargando) return
    const next = !rt
    const key = next ? 'rt' : 'van'
    let r = resCache.current[key]
    if (!r) {
      if (next) {
        setRtCargando(true)
        try {
          const [atlas, db] = await Promise.all([
            Atlas.load(asset('atlas-rt.png'), asset('atlas-rt.json')),
            ModelDB.load(asset('models-rt.json')),
          ])
          r = { atlas, db }
        } catch {
          return
        } finally {
          setRtCargando(false)
        }
      } else {
        r = { atlas: cargado.atlas, db: cargado.db }
      }
      resCache.current[key] = r
    }
    setRt(next)
    viewerRef.current?.setResources(r.atlas, r.db)
  }

  function cambiaHojas(rapidas: boolean) {
    if (rapidas === hojasRapidas || (!rapidas && !hojasCaben)) return
    setHojasRapidas(rapidas)
    viewerRef.current?.setLeavesMode(rapidas ? 'fast' : 'fancy')
  }

  const estrecho = () => (containerRef.current?.clientWidth ?? 1000) < 640
  function abreCortes(v: boolean) {
    setCortesAbierto(v)
    if (v && estrecho()) setMatAbierto(false)
  }
  function abreMateriales(v: boolean) {
    setMatAbierto(v)
    if (v && estrecho()) { setCortesAbierto(false); setPicked(null); setInvOpen(false) }
  }

  // ── Corte (también lo mueven los atajos de teclado) ──
  function cambiaCorte(axis: 'x' | 'y' | 'z', min: number, max: number, ya = false) {
    setCorte((c) => ({ ...c, [axis]: [min, max] }))
    viewerRef.current?.setSlice(axis, min, max, ya)
  }
  // Los tres ejes con una sola malla (antes eran tres rebuilds seguidos). En capa a
  // capa la altura es la de la capa.
  function quitaCortes() {
    const c = corteEntero(cargado.model)
    if (capaModo) c.y = [capaYRef.current, capaYRef.current]
    setCorte(c)
    viewerRef.current?.setSlices({ x: c.x, y: c.y, z: c.z })
  }
  // Una capa más o menos de altura: mueve el tope del corte en Y (o, en capa a
  // capa, la capa).
  function capa(d: number) {
    if (capaModo) { irACapa(capaYRef.current + d); return }
    const [lo, hi] = corte.y
    const n = Math.max(lo, Math.min(cargado.model.height - 1, hi + d))
    if (n !== hi) cambiaCorte('y', lo, n)
  }

  // ── Capa a capa ──
  // La capa entera y nada más en el corte en Y (la tapa del corte la malla en unos
  // ms, sin rehacer la build), la de debajo en fantasma y lo de arriba fuera.
  const capaTotal = rango[1] - rango[0] + 1
  const capaDe = (y: number) => y - rango[0] + 1
  // La cámara sigue a la capa: al entrar va a ella y al pasar de capa sube o baja
  // lo mismo, así la capa se queda en el mismo sitio de la pantalla.
  function irACapa(y: number, entrando = false) {
    const v = Math.max(rango[0], Math.min(rango[1], y))
    if (v === capaYRef.current && !entrando && capaModo) return
    capaYRef.current = v
    setCapaY(v)
    setCorte((c) => ({ ...c, y: [v, v] }))
    viewerRef.current?.setSlice('y', v, v, true)
    viewerRef.current?.setGhostLayer(v > rango[0] ? v - 1 : null)
    viewerRef.current?.followLayer(v, entrando)
  }
  function entraCapas() {
    yPrevio.current = corte.y
    // Se sigue donde se dejó: la primera capa sin hacer desde abajo.
    let y = rango[0]
    while (y <= rango[1] && hechas.has(y)) y++
    if (y > rango[1]) y = rango[0]
    setCapaModo(true)
    setAlcance('capa')
    irACapa(y, true)
  }
  function saleCapas() {
    const p = yPrevio.current ?? [0, cargado.model.height - 1]
    yPrevio.current = null
    setCapaModo(false)
    setAlcance((a) => (a === 'capa' ? 'todo' : a))
    viewerRef.current?.setGhostLayer(null)
    cambiaCorte('y', p[0], p[1], true)
  }
  function toggleCapas() { if (capaModo) saleCapas(); else entraCapas() }
  function toggleHecha() {
    setHechas((prev) => {
      const next = new Set(prev)
      if (next.has(capaY)) next.delete(capaY); else next.add(capaY)
      saveHechas(cargado.model, next)
      return next
    })
  }
  const hechasEnRango = useMemo(() => {
    let n = 0
    for (const y of hechas) if (y >= rango[0] && y <= rango[1]) n++
    return n
  }, [hechas, rango])

  // Resaltar dónde va un material (null = quitarlo).
  function resaltar(key: string | null, pals: number[]) {
    setResaltado(key)
    viewerRef.current?.setHighlightPalette(key ? pals : null)
  }

  function toggleSuelo() {
    const v = !suelo
    const modo = showcase ? 'exhib' : 'normal'
    if (showcase) setSueloExhib(v); else setSueloNormal(v)
    try { sessionStorage.setItem(SUELO_KEY[modo], v ? '1' : '0') } catch { /* noop */ }
  }

  function cerrarAyuda() {
    setAyuda(false)
    try { localStorage.setItem(AYUDA_KEY, '1') } catch { /* noop */ }
  }

  // La ayuda sale sola la primera vez que se ve el visor completo con la build ya hecha.
  useEffect(() => {
    if (embedded || grande || !construida) return
    let vista = false
    try { vista = localStorage.getItem(AYUDA_KEY) === '1' } catch { /* noop */ }
    if (vista) return
    setAyuda(true)
    // Vista ya al enseñarse: sale una sola vez aunque no se pulse Entendido
    // (se cierra la ficha, se navega a otra...). Luego, con ? o el botón.
    try { localStorage.setItem(AYUDA_KEY, '1') } catch { /* noop */ }
  }, [embedded, grande, construida])

  // Bloquear el scroll de la página con el visor a pantalla completa (la del modal
  // de la ficha o la simulada).
  useEffect(() => {
    if (!fullscreen && !fsSim) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [fullscreen, fsSim])

  // Al volver a la vista integrada se sale también de la pantalla completa del
  // navegador. Antes el modal se desmontaba y el navegador salía solo; ahora el
  // contenedor sigue vivo y se quedaría a pantalla completa sin barra.
  // El vuelo WASD también se apaga: escucha el teclado en toda la ventana y en la
  // ficha se comería el espacio y las teclas al bajar por la página. Y se quita la
  // selección: sin su panel, el contorno naranja quedaría suelto en la ficha.
  // El modo exhibición igual: en la ficha no hay barra para quitarlo y seguiría
  // girando con brillo y sombras.
  useEffect(() => {
    setInteractivo(false)
    if (!embedded) { setPaneles(true); return }
    if (fsElement() && fsElement() === containerRef.current) {
      document.exitFullscreen?.().catch(() => { /* noop */ })
    }
    setFsSim(false)
    setMoreOpen(false)
    setAjustesOpen(false)
    setAyuda(false)
    setFlyHelp(false)
    viewerRef.current?.setFlyEnabled(false)
    setPicked(null)
    setInvOpen(false)
    setShowcase(false)
    setScPaused(false)
    viewerRef.current?.setShowcase(false)
    // Sin la lista de materiales a mano no habría cómo quitar el resaltado. La capa
    // a capa sí se queda: es un corte más, y el corte se conserva.
    setResaltado(null)
    viewerRef.current?.setHighlightPalette(null)
  }, [embedded])

  // Sin selección no hay medida.
  useEffect(() => { if (!picked) setMedida(null) }, [picked])

  // Vista integrada ya activada: vuelve a soltar la rueda y el dedo al tocar fuera
  // del visor o cuando deja de verse (el ratón, al salir: ver onPointerLeave).
  useEffect(() => {
    if (!embedded || !interactivo) return
    const el = containerRef.current
    if (!el) return
    const fuera = (e: PointerEvent) => { if (!el.contains(e.target as Node)) setInteractivo(false) }
    document.addEventListener('pointerdown', fuera, true)
    const io = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((en) => { if (!en[en.length - 1].isIntersecting) setInteractivo(false) })
      : null
    io?.observe(el)
    return () => { document.removeEventListener('pointerdown', fuera, true); io?.disconnect() }
  }, [embedded, interactivo])

  // Resaltar en 3D la celda seleccionada (o quitar el contorno)
  useEffect(() => {
    viewerRef.current?.setHighlight(picked ? { x: picked.x, y: picked.y, z: picked.z } : null)
    viewerRef.current?.setHighlightPair(picked?.pair ?? null)
  }, [picked])

  // Clic o toque sin arrastre en el lienzo (lo decide el visor: ver onTap) =
  // identificar el bloque. En la vista integrada no, que no hay panel donde verlo.
  const tapRef = useRef<(x: number, y: number) => void>()
  tapRef.current = (x, y) => {
    if (embedded) return
    const r = viewerRef.current?.pick(x, y)
    // Midiendo, el toque elige el otro bloque (en el vacío no hace nada: un toque
    // fallido no debe tirar la medida).
    if (medida) {
      if (r) setMedida({ a: medida.a, b: { x: r.x, y: r.y, z: r.z, name: r.state.name } })
      return
    }
    setInvOpen(false)
    if (!r) { setPicked(null); return }
    const m = cargado.model
    const cell = cellIndex(m.width, m.length, r.x, r.y, r.z)
    let content = m.containers?.get(cell)
    let pair: { x: number; y: number; z: number } | undefined
    let doubleSlots: number | undefined
    // Cofre doble: selecciona ambas mitades y une sus inventarios (54 huecos).
    const pc = chestPairCell(m, r.x, r.y, r.z, r.state.name, r.state.properties)
    if (pc) {
      pair = pc
      doubleSlots = 54
      const pairContent = m.containers?.get(cellIndex(m.width, m.length, pc.x, pc.y, pc.z))
      content = mergeDoubleChest(r.state.properties?.type ?? 'left', content, pairContent)
    }
    setPicked({ x: r.x, y: r.y, z: r.z, name: r.state.name, properties: r.state.properties, content, sign: m.signs?.get(cell), pair, doubleSlots })
    // En pantalla estrecha la lista de materiales abierta taparía su panel.
    if (estrecho()) setMatAbierto(false)
  }

  // En capa a capa la cámara sigue a la capa. Un encuadre nuevo (otra vista,
  // Reajustar, la exhibición) apunta al centro de la build: se lleva a la altura de
  // la capa, y si va con transición, acaba ahí (ver followLayer). Si no, la capa
  // quedaba abajo, en el móvil detrás de su panel, y el siguiente paso saltaba
  // media build.
  function alaCapa() {
    if (capaModo) viewerRef.current?.followLayer(capaYRef.current, false)
  }
  function applyView(mode: ViewMode, idx: number) {
    if (mode === 'free')     viewerRef.current?.setView('free')
    else if (mode === 'iso') viewerRef.current?.setView('iso')
    else                     viewerRef.current?.setView(ORTO_SEQ[idx])
    alaCapa()
  }
  function reajustar() {
    viewerRef.current?.resetView()
    alaCapa()
  }
  function clickView(mode: ViewMode) {
    if (showcase) { setShowcase(false); viewerRef.current?.setShowcase(false) }
    let idx = ortoIdx
    if (mode === 'orto' && viewMode === 'orto') { idx = (ortoIdx + 1) % ORTO_SEQ.length; setOrtoIdx(idx) }
    else if (mode === 'orto') { idx = 0; setOrtoIdx(0) }
    setViewMode(mode)
    applyView(mode, idx)
  }

  // ── Teclado: Esc y atajos ──
  // Por referencia, para que el oyente (uno solo) vea siempre el estado actual.
  const teclaRef = useRef<(e: KeyboardEvent) => void>()
  teclaRef.current = (e) => {
    if (e.key === 'Escape') {
      if (ajustesOpen) { setAjustesOpen(false); ajBtnRef.current?.focus(); return }
      if (moreOpen) { setMoreOpen(false); masRef.current?.focus(); return }
      if (ayuda) { cerrarAyuda(); return }
      if (medida) { setMedida(null); return }
      if (invOpen) { setInvOpen(false); return }
      if (resaltado) { resaltar(null, []); return }
      if (fsSim) { setFsSim(false); return }
      if (fullscreen && onClose && !fsElement()) onClose()
      return
    }
    // Con Ctrl o Alt, nada (Ctrl+R no es reajustar). Salvo [ ] y ?, que en muchos
    // teclados (el español, en Windows con AltGr = Ctrl+Alt; en Mac con Opción) solo
    // se escriben así.
    if (embedded || grande || e.metaKey) return
    if ((e.ctrlKey || e.altKey) && !['[', ']', '?'].includes(e.key)) return
    const ae = document.activeElement as HTMLElement | null
    if (ae && (/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName) || ae.isContentEditable)) return
    const k = e.key.toLowerCase()
    if (e.key === '?') { e.preventDefault(); if (ayuda) cerrarAyuda(); else setAyuda(true); return }
    if (!viewerRef.current) return
    if (e.key === 'ArrowUp' || e.key === ']') { e.preventDefault(); capa(1) }
    else if (e.key === 'ArrowDown' || e.key === '[') { e.preventDefault(); capa(-1) }
    // Las cifras por la tecla física: en AZERTY sin Mayús dan & é ".
    else if (e.code === 'Digit1' || e.code === 'Numpad1') clickView('free')
    else if (e.code === 'Digit2' || e.code === 'Numpad2') clickView('iso')
    else if (e.code === 'Digit3' || e.code === 'Numpad3') clickView('orto')
    else if (k === 'r' && !e.repeat) reajustar()
    else if (k === 'p' && !e.repeat) void takePhoto()
    else if (k === 'c' && !e.repeat) toggleCapas()
  }
  useEffect(() => {
    const h = (e: KeyboardEvent) => teclaRef.current?.(e)
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  // ── Barra: lo que no cabe va al menú "Más opciones" ──
  const presentes: BarItem[] = grande ? [] : BAR_ORDEN.filter((k) => k !== 'vuelo' || (teclado && viewMode === 'free'))
  const fuera = new Set(desborde ? desborde.split(',') : [])
  const enMenu = presentes.filter((k) => fuera.has(k))
  const enBarra = presentes.filter((k) => !fuera.has(k))
  const ancha = barW >= 640
  // Pantalla estrecha para los paneles (no caben dos abiertos; ver estrecho()).
  const estrechoBar = barW > 0 && !ancha
  const GAP = ancha ? 8 : 6
  const PADX = ancha ? 14 : 8
  const conTitulo = barW >= 560
  // Lo que ocupa abajo el panel de capa a capa, con su margen.
  const abajoCapa = capaModo && capaH ? capaH + 12 : 0
  // Centrado (400 px) llegaría a la columna de la derecha (Materiales: 300 + 12 de
  // margen) por debajo de 1040 px: entonces va a su izquierda (ver CapaPanel), y
  // ahí, como en pantalla estrecha, lo que va abajo a la izquierda sube.
  const capaMedio = !estrechoBar && barW > 0 && barW < 1040
  const abajoIzq = estrechoBar || capaMedio ? abajoCapa : 0
  // "Esta capa" en materiales: la de capa a capa, o la de arriba del corte que
  // tenga bloques (con capas de aire encima salía "Capa 156 de 153", vacía).
  const capaMat = capaModo ? capaY : Math.max(rango[0], Math.min(rango[1], corte.y[1]))
  const md = cargado.model
  const cortado = corte.x[0] > 0 || corte.x[1] < md.width - 1 || corte.y[0] > 0 || corte.y[1] < md.height - 1 || corte.z[0] > 0 || corte.z[1] < md.length - 1

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setBarW(el.clientWidth))
    ro.observe(el)
    setBarW(el.clientWidth)
    return () => ro.disconnect()
  }, [embedded])

  // Con los anchos de la fila de medida (oculta, con todos los botones como irían
  // en la barra) se decide qué cabe. Si cambia, otro render.
  useLayoutEffect(() => {
    const row = medirRef.current
    if (!row || !barW || embedded) return
    const w: Record<string, number> = {}
    row.querySelectorAll<HTMLElement>('[data-ti]').forEach((el) => { w[el.dataset.ti!] = el.getBoundingClientRect().width })
    const fijo = (vistasRef.current?.offsetWidth ?? 0) + (finRef.current?.offsetWidth ?? 0) + GAP
    const titulo = conTitulo ? Math.min(w.titulo ?? 0, 120) + GAP : 0
    const disponible = barW - 2 * PADX - fijo - titulo
    const MAS = 32 + GAP
    let total = presentes.reduce((s, k) => s + (w[k] ?? 0) + GAP, 0)
    const sale: string[] = []
    for (const k of BAR_SALE) {
      if (total + (sale.length ? MAS : 0) <= disponible) break
      if (!presentes.includes(k)) continue
      sale.push(k)
      total -= (w[k] ?? 0) + GAP
    }
    const clave = sale.sort().join(',')
    if (clave !== desborde) setDesborde(clave)
  // Solo cuando cambia algo que mueve anchos (no en cada render: arrastrar un corte
  // repinta decenas de veces por segundo).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barW, embedded, desborde, presentes.join(), title, viewMode, ortoIdx, showcase, scPaused, flyHelp, isFs, fsSim, onClose, capaModo])

  // El menú se cierra al pulsar fuera.
  useEffect(() => {
    if (!moreOpen) return
    const h = (e: PointerEvent) => {
      const t = e.target as Node
      if (!menuRef.current?.contains(t) && !masRef.current?.contains(t)) setMoreOpen(false)
    }
    document.addEventListener('pointerdown', h, true)
    return () => document.removeEventListener('pointerdown', h, true)
  }, [moreOpen])
  useEffect(() => { if (!enMenu.length) setMoreOpen(false) }, [enMenu.length])

  // ── Ajustes de vista ──
  // Igual que el menú: se cierra al pulsar fuera (y con Esc, ver teclaRef).
  useEffect(() => {
    if (!ajustesOpen) return
    const h = (e: PointerEvent) => {
      const t = e.target as Node
      if (!ajustesRef.current?.contains(t) && !ajBtnRef.current?.contains(t)) setAjustesOpen(false)
    }
    document.addEventListener('pointerdown', h, true)
    return () => document.removeEventListener('pointerdown', h, true)
  }, [ajustesOpen])
  // Al abrirlo, el foco entra en él (con teclado se sigue con Tab; con Esc vuelve al botón).
  useEffect(() => {
    if (ajustesOpen) ajustesRef.current?.querySelector<HTMLElement>('button:not(:disabled), input')?.focus({ preventScroll: true })
  }, [ajustesOpen])
  // Debajo de su botón, sin salirse de la barra por la izquierda ni del visor por abajo
  // (con scroll si no cabe: el móvil en horizontal). Se vuelve a medir si cambia el
  // tamaño de la ventana.
  useLayoutEffect(() => {
    if (!ajustesOpen) return
    const medir = () => {
      const bar = barRef.current, btn = ajBtnRef.current, cont = containerRef.current
      if (!bar || !btn || !cont) return
      const rb = bar.getBoundingClientRect(), rbtn = btn.getBoundingClientRect(), rc = cont.getBoundingClientRect()
      const pad = rb.width >= 640 ? 14 : 8   // PADX
      const width = Math.min(320, rb.width - 2 * pad)
      const right = Math.max(pad, Math.min(rb.right - rbtn.right, rb.width - pad - width))
      setAjPos({ top: rbtn.bottom - rb.top + 6, right, width, maxH: Math.max(120, rc.bottom - rbtn.bottom - 16) })
    }
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [ajustesOpen, barW, isFs, fsSim])

  // Un botón de la barra, como va en la barra o como va en el menú (a lo ancho y
  // con su nombre aunque en la barra sea solo un icono).
  function boton(k: BarItem, menu: boolean): React.ReactNode {
    const base = `flex items-center gap-2 rounded-lg border text-[13px] font-medium whitespace-nowrap transition-colors hover:border-[#3A3A3F] ${FOCO}`
    const tam = menu ? 'w-full justify-start px-3 py-2' : 'px-3 py-1.5'
    const icono = menu ? 'w-full justify-start px-3 py-2' : 'justify-center w-8 h-8'
    switch (k) {
      case 'capas':
        return (
          <button type="button" onClick={toggleCapas} aria-pressed={capaModo}
            title={capaModo ? 'Salir de capa a capa (C)' : 'Capa a capa: una capa entera, la de debajo en fantasma y lo de arriba oculto (C)'}
            className={`${base} ${tam}`} style={capaModo ? ON : OFF}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
            Capa a capa
          </button>
        )
      case 'ctx':
        // Según la vista: libre → Reajustar · iso → girar 90° · orto → las seis vistas planas
        // En el menú, con el nombre entero en dos filas (en táctil no sale el title y
        // Arriba y Abajo serían dos "A"); en la barra, Ar y Ab.
        if (viewMode === 'orto') return (
          <div role="group" aria-label="Vistas planas"
            className={`${menu ? 'grid grid-cols-3' : 'flex'} rounded-lg overflow-hidden border border-[#2A2A2E]`} style={{ background: '#161618' }}>
            {ORTO_SEQ.map((v, i) => (
              <button key={v} type="button" onClick={() => { setOrtoIdx(i); viewerRef.current?.setView(v); alaCapa() }}
                aria-pressed={ortoIdx === i} aria-label={ORTO_ARIA[v]} title={ORTO_ARIA[v]}
                className={`flex-1 min-w-[26px] px-2 py-1.5 text-[12px] font-medium transition-colors ${menu ? `${i % 3 ? 'border-l' : ''} ${i >= 3 ? 'border-t' : ''} border-[#2A2A2E]` : i > 0 ? 'border-l border-[#2A2A2E]' : ''} ${FOCO_DENTRO}`}
                style={ortoIdx === i ? { background: '#F4811F', color: '#0d0d0f' } : { color: '#A1A1AA' }}>
                {menu ? ORTO_NAME[v] : v === 'top' ? 'Ar' : v === 'bottom' ? 'Ab' : ORTO_NAME[v].slice(0, 1)}
              </button>
            ))}
          </div>
        )
        if (viewMode === 'iso') return (
          <button type="button" onClick={() => viewerRef.current?.rotate90()} title="Girar la vista 90°" aria-label="Girar la vista 90°"
            className={`${base} ${icono}`} style={OFF}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7a5 5 0 0 1 9-3M12 1v3H9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {menu && 'Girar 90°'}
          </button>
        )
        return (
          <button type="button" onClick={reajustar} title="Volver a encuadrar la build (R)"
            className={`${base} ${tam}`} style={OFF}>
            Reajustar
          </button>
        )
      case 'vuelo':
        return (
          <button type="button" onClick={toggleVuelo} aria-pressed={flyHelp}
            title={flyHelp ? 'Quitar el vuelo' : 'Volar con WASD: las teclas te mueven y el ratón mira (izquierdo) y gira (derecho)'}
            className={`${base} ${tam}`} style={flyHelp ? ON : OFF}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2.5" y="6.5" width="19" height="11" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M6 10h.01M9 10h.01M12 10h.01M15 10h.01M18 10h.01M8 13.5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            Vuelo WASD
          </button>
        )
      case 'exhib': {
        const exhib = (
          <button type="button" onClick={toggleShowcase} aria-pressed={showcase}
            title="Modo exhibición: la build al atardecer, con sombras largas, luces y agua que refleja el cielo. El play de al lado la hace girar"
            className={`${base} ${tam}`} style={showcase ? ON : OFF}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3l1.9 4.7L19 9.5l-4.1 2.7L16 17l-4-2.6L8 17l1.1-4.8L5 9.5l5.1-1.8L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            Modo exhibición
          </button>
        )
        if (!showcase) return exhib
        // El giro solo tiene sentido en el modo exhibición.
        const pausa = (
          <button type="button" onClick={toggleScRotation} aria-label={scPaused ? 'Hacer girar la build' : 'Pausar el giro'}
            title={scPaused ? 'Hacer girar la build' : 'Pausar el giro'}
            className={`${base} ${icono}`} style={{ ...OFF, color: '#F5F5F0' }}>
            {scPaused ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 2l9 5-9 5V2z"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><rect x="3" y="2" width="3" height="10" rx="1"/><rect x="8" y="2" width="3" height="10" rx="1"/></svg>
            )}
            {menu && (scPaused ? 'Hacer girar la build' : 'Pausar el giro')}
          </button>
        )
        return menu ? <>{exhib}{pausa}</> : <div className="flex items-center" style={{ gap: GAP }}>{exhib}{pausa}</div>
      }
      case 'ayuda':
        return (
          <button type="button" onClick={() => ayuda ? cerrarAyuda() : setAyuda(true)} aria-pressed={ayuda}
            aria-label="Ayuda y atajos" title="Ayuda y atajos (?)"
            className={`${base} ${icono}`} style={ayuda ? ON : OFF}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M9.5 9.5a2.5 2.5 0 0 1 4.9.6c0 1.7-2.4 2.2-2.4 3.6M12 17h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {menu && 'Ayuda y atajos'}
          </button>
        )
    }
  }

  const contenedor = (fullscreen ? 'fixed inset-0 z-50' : fsSim ? 'fixed inset-0 z-[60]' : 'relative w-full h-full') + ' overflow-hidden'

  return (
    // touch-action: none fuera de la ficha: un pellizco sobre un panel ampliaba la
    // página entera en vez de nada. Las listas con scroll siguen deslizando (son
    // ellas las que hacen el scroll). En la ficha no: la página tiene que bajar.
    <div ref={containerRef} className={contenedor} style={{ background: bgColor, touchAction: embedded ? undefined : 'none' }}
      onContextMenu={(e) => e.preventDefault()}   // sin menú contextual del navegador en el visor
      onPointerLeave={(e) => { if (embedded && e.pointerType === 'mouse') setInteractivo(false) }}
      onDragOver={onArchivo ? (e) => { if (e.dataTransfer.types.includes('Files')) { e.preventDefault(); setSoltando(true) } } : undefined}
      onDragLeave={onArchivo ? (e) => { if (!containerRef.current?.contains(e.relatedTarget as Node)) setSoltando(false) } : undefined}
      onDrop={onArchivo ? (e) => {
        e.preventDefault(); setSoltando(false)
        const f = e.dataTransfer.files[0]
        if (f) onArchivo(f)
      } : undefined}>

      {/* Imagen de fondo como div separado — mejor calidad que CSS en canvas */}
      {fondo === 'imagen' && bgImage && (
        <div className="absolute inset-0" style={{
          backgroundImage: `url("${bgImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />
      )}

      {grande ? (
        // Fuera de la ficha la lista de materiales lleva el aviso (ver MaterialsPanel).
        // En la ficha (16:9, a veces de 343 px en móvil) solo el aviso corto.
        embedded ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center overflow-y-auto px-4 gap-1.5">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" className="text-[#F4811F] shrink-0" aria-hidden="true">
              <path d="M12 2 2 7v10l10 5 10-5V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M2 7l10 5 10-5M12 12v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <p className="text-[#F5F5F0] font-semibold text-sm">Build demasiado grande para previsualizar en 3D</p>
            <p className="text-xs text-[#A1A1AA]">
              {cargado.model.totalBlocks.toLocaleString('es-ES')} bloques. Su lista de materiales sí se puede ver.
            </p>
          </div>
        ) : null
      ) : (
        <>
          <ViewerCanvas cargado={cargado} viewerRef={viewerRef} onReady={() => setReady(true)}
            onRebuild={(t) => {
              setMalla({ de: cargado, truncada: t })
              setHojasRapidas(!!viewerRef.current?.leavesFast)
              setHojasCaben(viewerRef.current?.fancyLeavesFit ?? true)
            }}
            onTap={(x, y) => tapRef.current?.(x, y)}
            onHeading={(h) => rumboRef.current?.(h)}
            className="absolute inset-0" style={{ width: '100%', height: '100%' }} />

          {/* Hasta la primera malla el lienzo sale vacío: que se vea que está trabajando.
              No captura el puntero, así que la cámara ya se puede mover. */}
          {!construida && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none" role="status">
              <div className="w-8 h-8 rounded-full border-2 border-[#F4811F] border-t-transparent animate-spin" aria-hidden="true" />
              <span className="text-xs text-[#A1A1AA]">Construyendo modelo…</span>
            </div>
          )}

          {/* La malla llegó al tope de caras (MAX_QUADS) y se ha cortado: avisar, o
              parece que faltan bloques por un fallo. */}
          {/* Abajo a la izquierda, salvo donde algo ya ocupa ese sitio: en pantalla
              estrecha, el chip de Cortes (va encima); en la ficha, la píldora de
              "Haz clic para explorar en 3D" abajo en el centro (va arriba, a
              la izquierda de "Cerrar visor", y en el móvil solo la primera frase). */}
          {truncada && (
            <div className="absolute z-10 px-3 py-2 rounded-lg text-[11px] leading-snug text-[#F5F5F0] pointer-events-none"
              style={{ left: 12, ...(embedded ? { top: 12 } : { bottom: (estrechoBar ? 84 : 12) + abajoCapa }),
                       maxWidth: embedded ? 'min(420px, calc(100% - 140px))' : 'min(420px, calc(100% - 170px))',
                       background: 'rgba(22,22,24,.94)', border: '1px solid #5A2E2E' }}>
              {embedded
                ? <>Build demasiado grande: faltan caras.<span className="hidden sm:inline"> En el visor ampliado, los cortes la enseñan por partes.</span></>
                : 'La build es demasiado grande para dibujarla entera y faltan caras. Con los cortes puedes ver cada parte entera.'}
            </div>
          )}

          {/* Vista integrada: hasta que se pulsa, la rueda y el dedo son de la página
              (esta capa no los frena y el lienzo no los ve). */}
          {embedded && !interactivo && (
            <button type="button" onClick={() => setInteractivo(true)}
              className={`group absolute inset-0 z-[5] flex items-end justify-center pb-4 cursor-pointer ${FOCO}`}
              style={{ background: 'transparent', outlineOffset: -3 }}>
              {/* Velo que oscurece un poco el borde de abajo al pasar el ratón, para
                  que la invitación destaque sobre cualquier build. */}
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: 'linear-gradient(to top, rgba(13,13,15,.55), rgba(13,13,15,0) 45%)' }} />
              {construida && (
                <span className="pointer-events-none relative flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full text-[13px] font-semibold text-[#F5F5F0] transition-transform duration-200 group-hover:scale-[1.04]"
                  style={{ background: 'rgba(22,22,24,.82)', border: '1px solid rgba(244,129,31,.55)', boxShadow: '0 6px 24px rgba(0,0,0,.45)', backdropFilter: 'blur(6px)' }}>
                  {/* Cubo: dice "3D" sin parecer un botón de recargar. */}
                  <span className="flex items-center justify-center w-7 h-7 rounded-full" style={{ background: 'rgba(244,129,31,.16)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-[#F4811F]">
                      <path d="M12 2.8 20 7.2v9.6L12 21.2 4 16.8V7.2L12 2.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                      <path d="M4 7.2 12 11.6l8-4.4M12 11.6v9.6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="[@media(hover:none)]:hidden">Haz clic para explorar en 3D</span>
                  <span className="hidden [@media(hover:none)]:inline">Toca para explorar en 3D</span>
                </span>
              )}
              {!construida && <span className="sr-only">Explorar la build en 3D</span>}
            </button>
          )}
        </>
      )}

      {/* Barra. Una fila; lo que no cabe va al menú "Más opciones". Por encima de los
          paneles (z-30), o el menú desplegado quedaría debajo de Materiales. */}
      <div ref={barRef} className={`absolute top-0 left-0 right-0 z-30 ${embedded ? 'hidden' : 'flex'} items-center py-2.5`}
        style={{ gap: GAP, paddingLeft: PADX, paddingRight: PADX, background: 'linear-gradient(180deg, rgba(13,13,15,.92) 0%, rgba(13,13,15,0) 100%)' }}>

        {/* Con fondo propio: sobre el degradado, con un fondo claro detrás (color o
            imagen de fondo, o la build al acercarte) no se leía. */}
        {conTitulo && (
          <span className="min-w-0 flex-1 flex">
            <span className="min-w-0 truncate px-2 py-0.5 rounded-md text-sm font-semibold text-[#F5F5F0]"
              style={{ background: 'rgba(13,13,15,.72)' }} title={title}>{title}</span>
          </span>
        )}

        {/* Vistas (atajos 1, 2 y 3) */}
        {!grande && (
          <div ref={vistasRef} role="group" aria-label="Vista" className="flex shrink-0 rounded-xl overflow-hidden border border-[#2A2A2E]" style={{ background: '#161618' }}>
            {(['free','iso','orto'] as ViewMode[]).map((m, i) => (
              <button key={m} type="button" onClick={() => clickView(m)} aria-pressed={viewMode === m}
                title={m === 'free' ? 'Vista libre (1)' : m === 'iso' ? 'Vista isométrica (2)' : 'Vistas planas: desde arriba, norte, este, sur, oeste y abajo (3)'}
                className={`px-3 py-1.5 text-[13px] font-medium transition-colors whitespace-nowrap ${i > 0 ? 'border-l border-[#2A2A2E]' : ''} ${FOCO_DENTRO}`}
                style={viewMode === m ? { background: '#F4811F', color: '#0d0d0f' } : { color: '#A1A1AA' }}>
                {m === 'free' ? 'Libre' : m === 'iso' ? 'Iso' : viewMode === 'orto' ? ORTO_NAME[ORTO_SEQ[ortoIdx]] : 'Orto'}
              </button>
            ))}
          </div>
        )}

        {enBarra.map((k) => <Fragment key={k}>{boton(k, false)}</Fragment>)}

        {enMenu.length > 0 && (
          <div className="relative shrink-0">
            <button ref={masRef} type="button" onClick={() => setMoreOpen(v => !v)}
              aria-label="Más opciones" title="Más opciones" aria-expanded={moreOpen} aria-controls="visor-mas-opciones"
              className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-colors ${FOCO}`}
              style={moreOpen ? ON : OFF}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <circle cx="3" cy="8" r="1.4"/><circle cx="8" cy="8" r="1.4"/><circle cx="13" cy="8" r="1.4"/>
              </svg>
            </button>
            <div ref={menuRef} id="visor-mas-opciones"
              className={moreOpen ? 'absolute right-0 top-full mt-1.5 z-40 flex flex-col items-stretch gap-1.5 p-2 rounded-xl border border-[#2A2A2E] bg-[#161618] shadow-[0_12px_40px_rgba(0,0,0,.6)]' : 'hidden'}
              style={{ minWidth: 200, maxHeight: 'calc(100vh - 90px)', overflowY: 'auto' }}
              onClick={() => setMoreOpen(false)}>
              {enMenu.map((k) => <Fragment key={k}>{boton(k, true)}</Fragment>)}
            </div>
          </div>
        )}
        <input ref={bgImgInput} type="file" accept="image/*" className="hidden" onChange={pickBgImage} tabIndex={-1} aria-hidden="true" />

        <div ref={finRef} className="ml-auto flex shrink-0 items-center" style={{ gap: GAP }}>
          {/* Ajustes de vista: foto, fondo, suelo y texturas. Aquí, con lo que no se va
              nunca al menú: un desplegable dentro de otro no se encontraría. Con nombre
              en pantalla ancha; en el móvil, solo el icono. */}
          {!grande && (
            <button ref={ajBtnRef} type="button" onClick={() => setAjustesOpen((v) => !v)}
              aria-expanded={ajustesOpen} aria-controls="visor-ajustes" aria-haspopup="dialog"
              aria-label={ancha ? undefined : 'Ajustes de vista'} title={ancha ? undefined : 'Ajustes de vista'}
              className={`flex items-center justify-center gap-2 rounded-lg border text-[13px] font-medium whitespace-nowrap transition-colors hover:border-[#3A3A3F] ${ancha ? 'px-3 py-1.5' : 'w-8 h-8'} ${FOCO}`}
              style={ajustesOpen ? ON : OFF}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h9M17 7h3M4 17h3M11 17h9M4 12h3M11 12h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                <circle cx="15" cy="7" r="2" stroke="currentColor" strokeWidth="1.7"/>
                <circle cx="9" cy="12" r="2" stroke="currentColor" strokeWidth="1.7"/>
                <circle cx="9" cy="17" r="2" stroke="currentColor" strokeWidth="1.7"/>
              </svg>
              {ancha && 'Ajustes de vista'}
            </button>
          )}
          {/* Por encima de los paneles (va dentro de la barra, z-30) y justo detrás de su
              botón, para que Tab entre en él. Escondido y no desmontado: el selector de
              color del sistema o el de archivos pueden seguir abiertos. Se coloca
              respecto a la barra (ver ajPos). */}
          {!grande && (
            <div ref={ajustesRef} id="visor-ajustes" role="dialog" aria-label="Ajustes de vista"
              className={ajustesOpen ? 'absolute z-40 flex flex-col p-1.5 rounded-xl border border-[#2A2A2E] bg-[#161618] shadow-[0_12px_40px_rgba(0,0,0,.6)]' : 'hidden'}
              style={{ top: ajPos?.top ?? '100%', right: ajPos?.right ?? PADX, width: ajPos?.width ?? 300, maxHeight: ajPos?.maxH,
                       overflowY: 'auto', overscrollBehavior: 'contain', scrollbarWidth: 'thin', scrollbarColor: '#2a2a2e transparent' }}
              // Con Tab fuera (a otro control del visor) se cierra; sin destino (el
              // selector de archivos, otra ventana) no.
              onBlur={(e) => {
                const t = e.relatedTarget as Node | null
                if (t && !ajustesRef.current?.contains(t) && !ajBtnRef.current?.contains(t)) setAjustesOpen(false)
              }}>
              <AjustesVista teclado={teclado} exhibicion={showcase}
                photoBusy={photoBusy} onFoto={() => void takePhoto()}
                fondo={fondo} onFondo={elegirFondo}
                bgColor={bgColor} onColor={cambiaColor} onColorSerie={colorDeSerie}
                bgImage={bgImage} onElegirImagen={() => bgImgInput.current?.click()} onQuitarImagen={clearBgImage}
                suelo={suelo} onSuelo={toggleSuelo}
                rt={rt} rtCargando={rtCargando} onRt={() => void toggleRt()}
                hojas={hayHojas ? { rapidas: hojasRapidas, caben: hojasCaben, onCambia: cambiaHojas } : null} />
            </div>
          )}

          {/* Pantalla completa del navegador. En el visor ampliado de la ficha, sin la
              API (iPhone) no se enseña: la simulada sería lo mismo que ya se ve. */}
          {(fsApi || !fullscreen) && (
            <button type="button" onClick={toggleFullscreen} aria-pressed={isFs || fsSim}
              aria-label={isFs || fsSim ? 'Salir de pantalla completa' : 'Pantalla completa'}
              title={isFs || fsSim ? 'Salir de pantalla completa' : 'Pantalla completa'}
              className={`flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A2E] text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors ${FOCO}`}
              style={{ background: '#161618' }}>
              {isFs || fsSim ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 3v3a3 3 0 0 1-3 3H3M21 9h-3a3 3 0 0 1-3-3V3M3 15h3a3 3 0 0 1 3 3v3M15 21v-3a3 3 0 0 1 3-3h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          )}

          {/* Cerrar — solo en el visor ampliado de la ficha */}
          {onClose && (
            <button type="button" onClick={onClose} aria-label="Cerrar el visor ampliado" title="Cerrar el visor ampliado (Esc)"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A2E] text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] text-sm transition-colors ${FOCO}`}
              style={{ background: '#161618' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {ancha && <span>Cerrar</span>}
            </button>
          )}
        </div>
      </div>

      {/* Fila de medida: todos los botones como irían en la barra, invisibles (ni se
          ven ni se pueden enfocar), para saber cuánto ocupa cada uno. */}
      {/* (Dentro de una caja de alto 0 que recorta: si no, en pantallas estrechas la
          fila sobresale y la página entera gana scroll lateral.) */}
      {!embedded && (
        <div className="absolute inset-x-0 top-0 h-0 overflow-hidden" aria-hidden="true">
          <div ref={medirRef} className="flex items-center invisible pointer-events-none"
            style={{ width: 'max-content', gap: GAP }}>
            {presentes.map((k) => <div key={k} data-ti={k} className="flex shrink-0">{boton(k, false)}</div>)}
            <span data-ti="titulo" className="px-2 text-sm font-semibold whitespace-nowrap">{title}</span>
          </div>
        </div>
      )}

      {/* Paneles. En la vista integrada se esconden pero siguen montados (si ya se
          abrieron): guardan el estado (cortes, checklist) para cuando se vuelva a
          pantalla completa. */}
      <div className={embedded ? 'hidden' : 'contents'}>

      {/* Cortes */}
      {ready && paneles && !grande && (
        <SlicersPanel model={cargado.model} corte={corte} abierto={cortesAbierto} onAbierto={abreCortes} estrecho={estrechoBar}
          sinAlto={capaModo} abajo={izqH && !(estrechoBar && !cortesAbierto) ? 80 + abajoIzq + izqH + 8 : abajoIzq}
          arriba={picked && !invOpen && !estrechoBar && bloqueH ? 56 + bloqueH + 12 : 0}
          onCambio={cambiaCorte} onQuitar={quitaCortes}
          onSoltar={() => viewerRef.current?.commitSlice()} />
      )}

      {/* Materiales (con una build demasiado grande, es lo único que hay) */}
      {paneles && (ready || grande) && <MaterialsPanel model={cargado.model} atlas={cargado.atlas} db={cargado.db}
        entityManifest={entityManifest} abierto={matAbierto} onAbierto={abreMateriales} grande={grande}
        oculto={estrechoBar && !grande && !!picked}
        title={title} alcance={alcance} onAlcance={setAlcance} corte={corte} capaY={capaMat}
        capa={{ n: capaDe(capaMat), total: capaTotal }} cortado={cortado} abajo={estrechoBar ? abajoCapa : 0}
        resaltado={resaltado} onResaltar={grande ? undefined : resaltar} />}

      {/* Capa a capa */}
      {ready && paneles && !grande && capaModo && (
        <CapaPanel n={capaDe(capaY)} total={capaTotal} y={capaY} hecha={hechas.has(capaY)} hechas={hechasEnRango}
          estrecho={estrechoBar} derecha={capaMedio ? 320 : 0} panelRef={capaRef}
          onIr={(n) => irACapa(rango[0] + n - 1)} onPaso={(d) => irACapa(capaYRef.current + d)} onHecha={toggleHecha} onSalir={saleCapas} />
      )}

      {/* Brújula: siempre, abajo a la derecha */}
      {ready && paneles && !grande && <Brujula registra={registraRumbo} abajo={estrechoBar ? abajoCapa : 0} />}

      {/* Bloque seleccionado (clic) — se oculta mientras el inventario está abierto */}
      {ready && picked && !invOpen && <SelectedBlockPanel picked={picked} atlas={cargado.atlas} db={cargado.db}
        entityManifest={entityManifest} capaDe={capaDe} medida={medida} abajo={abajoCapa} panelRef={bloqueRef}
        onMedir={(on) => setMedida(on ? { a: { x: picked.x, y: picked.y, z: picked.z }, b: null } : null)}
        onOpenInventory={() => setInvOpen(true)}
        onClose={() => { setPicked(null); setInvOpen(false) }} />}

      {/* Inventario del contenedor: panel lateral no modal (se puede seguir moviendo el schematic) */}
      {ready && invOpen && picked?.content && (
        <ContainerInventory name={picked.name} content={picked.content}
          atlas={cargado.atlas} db={cargado.db} entityManifest={entityManifest}
          forceSize={picked.doubleSlots}
          onClose={() => setInvOpen(false)} />
      )}

      {/* Abajo a la izquierda: la hora del día (en exhibición o con el cielo de
          Minecraft) y, debajo, la velocidad del vuelo y sus teclas (en vista libre,
          con el vuelo activado). */}
      {ready && (conHora || (viewMode === 'free' && flyHelp)) && (
        <div ref={izqRef} className="absolute left-3 z-10 select-none text-[11px] text-[#A1A1AA] flex flex-col gap-2" style={{ bottom: 80 + abajoIzq, maxWidth: 280 }}>
          {conHora && (
            <div className="flex flex-col gap-1 pointer-events-auto" style={{ width: estrechoBar ? 200 : 230, background: 'rgba(13,13,15,.72)', padding: estrechoBar ? '6px 9px' : '8px 10px', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[#F5F5F0] font-semibold whitespace-nowrap">Hora del día</span>
                <span className="tabular-nums text-[#F4811F] whitespace-nowrap">{horaTexto(horaVista)} · {momentoDelDia(horaVista)}</span>
              </div>
              <ThumbSlider value={horaVista} min={HORA_MIN} max={HORA_MAX} label="Hora del día" valueText={`${horaTexto(horaVista)}, ${momentoDelDia(horaVista)}`}
                onChange={(v) => cambiaHora(v, false)} onCommit={(v) => cambiaHora(v, true)} />
            </div>
          )}
          {viewMode === 'free' && flyHelp && (
            <>
              <div className="flex flex-col gap-1 pointer-events-auto" style={{ width: 230, background: 'rgba(13,13,15,.72)', padding: '8px 10px', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#F5F5F0] font-semibold whitespace-nowrap">Velocidad de vuelo</span>
                  <span className="tabular-nums text-[#F4811F]">{flySpeed.toFixed(2)}×</span>
                </div>
                <ThumbSlider value={flySpeed} min={0.1} max={5} label="Velocidad de vuelo"
                  onChange={(v) => { setFlySpeed(v); viewerRef.current?.setFlySpeed(v) }} />
              </div>
              {flyHint && <div className="pointer-events-none"
                style={{ background: 'rgba(13,13,15,.72)', padding: '4px 8px', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
                <span className="text-[#F5F5F0] font-semibold">WASD</span> moverte · <span className="text-[#F5F5F0] font-semibold">Espacio / Mayús</span> subir y bajar · <span className="text-[#F5F5F0] font-semibold">Izquierdo</span> mirar · <span className="text-[#F5F5F0] font-semibold">Derecho</span> girar
              </div>}
            </>
          )}
        </div>
      )}

      {/* Entrando en exhibición: la luz se está horneando (el fundido sale al terminar). */}
      {ready && scPrep && showcase && (
        <div role="status" className="absolute z-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] text-[#F5F5F0] pointer-events-none"
          style={{ top: estrechoBar ? 176 : 64, background: 'rgba(13,13,15,.78)', border: '1px solid #2A2A2E', backdropFilter: 'blur(4px)' }}>
          <span className="w-3 h-3 rounded-full border-2 border-[#F4811F] border-t-transparent animate-spin motion-reduce:animate-none" aria-hidden="true" />
          Preparando exhibición…
        </div>
      )}

      {/* Ayuda de controles (la primera vez, con ? o desde su botón) */}
      {ayuda && ready && <AyudaPanel tactil={tactil} teclado={teclado} vista={viewMode} onClose={cerrarAyuda} />}

      </div>

      {/* Lite Viewer: soltar otro archivo encima lo abre */}
      {soltando && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
          style={{ background: 'rgba(13,13,15,.6)', border: '2px dashed #F4811F' }}>
          <span className="px-4 py-2 rounded-xl text-sm font-semibold text-[#F5F5F0]" style={{ background: '#161618', border: '1px solid #2A2A2E' }}>
            Suelta el archivo para abrirlo
          </span>
        </div>
      )}
    </div>
  )
}
