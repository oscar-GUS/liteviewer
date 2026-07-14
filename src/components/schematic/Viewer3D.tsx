'use client'

// Viewer 3D unificado — UI compartida por el visor integrado (tarjetas) y la herramienta standalone.
// Recibe el modelo YA cargado ({ model, atlas, db }); cada sitio se encarga de obtenerlo a su manera.
import { useEffect, useMemo, useRef, useState } from 'react'
import { Atlas } from '@/lib/litematic/atlas'
import { ModelDB } from '@/lib/litematic/models'
import { asset } from '@/lib/litematic/assets'
import { SchematicViewer, ViewName } from '@/lib/litematic/SchematicViewer'
import { computeMaterials, formatStacks, materialsToText, MaterialEntry } from '@/lib/litematic/materials'
import { displayName } from '@/lib/litematic/blockNames'
import { getFaceInfo } from '@/lib/litematic/blockTextures'
import { baseName, getBlockColor, toHex } from '@/lib/litematic/blockColors'
import { shulkerKey, skullKey, type EntityManifest } from '@/lib/litematic/blockEntities'
import { ensureItemAtlas, onItemAtlasLoad, itemIconStyle } from '@/lib/litematic/itemAtlas'
import { cellIndex } from '@/lib/litematic/types'
import { isTooLargeToRender } from '@/lib/litematic/limits'
import type { SchematicModel, ContainerInfo, ContainerItem, SignText } from '@/lib/litematic/types'

type ViewMode = 'free' | 'iso' | 'orto'

export interface Cargado { model: SchematicModel; atlas: Atlas; db: ModelDB }

const ORTO_SEQ: ViewName[] = ['top', 'north', 'east', 'south', 'west', 'bottom']
const ORTO_NAME: Record<string, string> = { top: 'Arriba', north: 'Norte', east: 'Este', south: 'Sur', west: 'Oeste', bottom: 'Abajo' }

const fmt = (n: number) => n.toLocaleString('es-ES')

// ─── Checklist persistence ────────────────────────────────────────────────────

function checklistKey(model: SchematicModel): string {
  return `lv:checklist:${model.name}|${model.width}x${model.height}x${model.length}|${model.totalBlocks}`
}
function loadChecked(model: SchematicModel): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(checklistKey(model)) ?? '[]') as string[]) } catch { return new Set() }
}
function saveChecked(model: SchematicModel, set: Set<string>) {
  try { localStorage.setItem(checklistKey(model), JSON.stringify([...set])) } catch { /* noop */ }
}

// ─── Campo numérico editable (un límite de corte) ───────────────────────────────

function NumField({ value, min, max, accent, onCommit }: {
  value: number; min: number; max: number; accent: string; onCommit: (v: number) => void
}) {
  const [draft, setDraft] = useState(String(value))
  useEffect(() => { setDraft(String(value)) }, [value])

  function commit() {
    let n = parseInt(draft, 10)
    if (isNaN(n)) n = value
    n = Math.max(min, Math.min(max, n))
    onCommit(n)
    setDraft(String(n))
  }

  return (
    <input
      value={draft}
      inputMode="numeric"
      aria-label="límite de corte"
      onChange={(e) => setDraft(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
      onFocus={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.select() }}
      onBlur={(e) => { commit(); e.currentTarget.style.borderColor = '#2A2A2E' }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
        else if (e.key === 'ArrowUp')   { e.preventDefault(); onCommit(Math.min(max, value + 1)) }
        else if (e.key === 'ArrowDown') { e.preventDefault(); onCommit(Math.max(min, value - 1)) }
      }}
      className="w-9 text-center text-[12px] tabular-nums rounded-md py-0.5 outline-none transition-colors"
      style={{ background: '#0F0F11', border: '1px solid #2A2A2E', color: '#F5F5F0' }}
    />
  )
}

// ─── Control de un eje: badge + inputs + slider doble ────────────────────────────

interface AxisSlicerProps {
  letter: string; name: string; color: string
  axisMax: number; minV: number; maxV: number
  onChange: (min: number, max: number) => void
}

function AxisSlicer({ letter, name, color, axisMax, minV, maxV, onChange }: AxisSlicerProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pct = (v: number) => axisMax <= 0 ? 0 : (v / axisMax) * 100

  function valueAt(clientX: number): number {
    const rect = trackRef.current!.getBoundingClientRect()
    return Math.max(0, Math.min(axisMax, Math.round(((clientX - rect.left) / rect.width) * axisMax)))
  }
  function startDrag(isMax: boolean) {
    return (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault()
      const el = e.currentTarget
      el.setPointerCapture(e.pointerId)
      const move = (ev: PointerEvent) => {
        const v = valueAt(ev.clientX)
        if (isMax) onChange(minV, Math.max(minV, v)); else onChange(Math.min(maxV, v), maxV)
      }
      const up = () => {
        el.releasePointerCapture(e.pointerId)
        el.removeEventListener('pointermove', move as EventListener)
        el.removeEventListener('pointerup', up)
      }
      el.addEventListener('pointermove', move as EventListener)
      el.addEventListener('pointerup', up)
    }
  }

  const cut = minV !== 0 || maxV !== axisMax

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="flex items-center justify-center w-[18px] h-[18px] rounded-md text-[11px] font-bold"
            style={{ color, background: color + '22' }}>{letter}</span>
          <span className="text-[11px] text-[#71717A]">{name}</span>
        </div>
        <div className="flex items-center gap-1">
          <NumField value={minV} min={0} max={maxV} accent={color} onCommit={(v) => onChange(v, maxV)} />
          <span className="text-[#52525A] text-[11px]">–</span>
          <NumField value={maxV} min={minV} max={axisMax} accent={color} onCommit={(v) => onChange(minV, v)} />
        </div>
      </div>

      <div ref={trackRef} className="relative h-1.5 rounded-full" style={{ background: '#2A2A2E' }}>
        <div className="absolute h-full rounded-full"
          style={{ left: `${pct(minV)}%`, right: `${100 - pct(maxV)}%`, background: cut ? color : '#3F3F46' }} />
        <div className="absolute w-3.5 h-3.5 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 cursor-grab border-2"
          style={{ left: `${pct(minV)}%`, background: '#0D0D0F', borderColor: color, touchAction: 'none' }}
          onPointerDown={startDrag(false)} />
        <div className="absolute w-3.5 h-3.5 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 cursor-grab"
          style={{ left: `${pct(maxV)}%`, background: color, touchAction: 'none' }}
          onPointerDown={startDrag(true)} />
      </div>
    </div>
  )
}

// ─── Slider continuo de un thumb (mismo look que los cortes) ─────────────────────
function ThumbSlider({ value, min, max, color = '#F4811F', onChange }: {
  value: number; min: number; max: number; color?: string; onChange: (v: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0

  function valueAt(clientX: number): number {
    const rect = trackRef.current!.getBoundingClientRect()
    const t = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    return min + t * (max - min)
  }
  function startDrag(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault()
    const el = trackRef.current!
    el.setPointerCapture(e.pointerId)
    onChange(valueAt(e.clientX))
    const move = (ev: PointerEvent) => onChange(valueAt(ev.clientX))
    const up = () => {
      el.releasePointerCapture(e.pointerId)
      el.removeEventListener('pointermove', move as EventListener)
      el.removeEventListener('pointerup', up)
    }
    el.addEventListener('pointermove', move as EventListener)
    el.addEventListener('pointerup', up)
  }

  return (
    <div ref={trackRef} className="relative h-1.5 rounded-full cursor-pointer"
      style={{ background: '#2A2A2E', touchAction: 'none' }} onPointerDown={startDrag}>
      <div className="absolute h-full rounded-full" style={{ left: 0, width: `${pct}%`, background: color }} />
      <div className="absolute w-3.5 h-3.5 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 cursor-grab"
        style={{ left: `${pct}%`, background: color, touchAction: 'none' }} />
    </div>
  )
}

// ─── Cortes (slicers) ──────────────────────────────────────────────────────────

const SLICE_AXES = [
  { axis: 'y' as const, letter: 'Y', name: 'Alto',  color: '#F4811F' },
  { axis: 'x' as const, letter: 'X', name: 'Ancho', color: '#F4811F' },
  { axis: 'z' as const, letter: 'Z', name: 'Largo', color: '#F4811F' },
]

function SlicersPanel({ model, viewer }: { model: SchematicModel; viewer: SchematicViewer | null }) {
  const dimMax = { x: model.width - 1, y: model.height - 1, z: model.length - 1 }
  const [x, setX] = useState<[number, number]>([0, dimMax.x])
  const [y, setY] = useState<[number, number]>([0, dimMax.y])
  const [z, setZ] = useState<[number, number]>([0, dimMax.z])
  const slice = { x, y, z }
  const setSlice = { x: setX, y: setY, z: setZ }

  function change(axis: 'x'|'y'|'z') {
    return (min: number, max: number) => { setSlice[axis]([min, max]); viewer?.setSlice(axis, min, max) }
  }
  function reset() {
    (['x','y','z'] as const).forEach((a) => { setSlice[a]([0, dimMax[a]]); viewer?.setSlice(a, 0, dimMax[a]) })
  }

  const active = (['x','y','z'] as const).some((a) => slice[a][0] !== 0 || slice[a][1] !== dimMax[a])
  // En móvil arranca colapsado para no tapar el visor.
  const [collapsed, setCollapsed] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640)

  return (
    <div className="absolute z-10 flex flex-col gap-3.5 p-4"
      style={{ left: 14, top: '50%', transform: 'translateY(-50%)', width: 'min(86vw, 236px)',
               background: 'rgba(22,22,24,.94)', backdropFilter: 'blur(8px)',
               border: '1px solid #2a2a2e', borderRadius: 16, boxShadow: '0 10px 34px rgba(0,0,0,.4)' }}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#A1A1AA]">Cortes</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] tabular-nums text-[#52525A]">{model.width}×{model.height}×{model.length}</span>
          <button onClick={() => setCollapsed(c => !c)}
            className="flex items-center justify-center w-5 h-5 rounded text-[#A1A1AA] hover:text-[#F5F5F0] transition-colors"
            title={collapsed ? 'Expandir' : 'Minimizar'}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d={collapsed ? 'M2 4l4 4 4-4' : 'M2 8l4-4 4 4'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {!collapsed && (
        <>
          <div className="flex flex-col gap-3.5">
            {SLICE_AXES.map(({ axis, letter, name, color }) => (
              <AxisSlicer key={axis} letter={letter} name={name} color={color}
                axisMax={dimMax[axis]} minV={slice[axis][0]} maxV={slice[axis][1]} onChange={change(axis)} />
            ))}
          </div>

          <button onClick={reset} disabled={!active}
            className="text-xs rounded-lg py-1.5 border transition-colors"
            style={active
              ? { color: '#F5F5F0', background: '#1C1C1F', borderColor: '#2A2A2E', cursor: 'pointer' }
              : { color: '#52525A', background: 'transparent', borderColor: '#232327', cursor: 'default' }}>
            Restablecer
          </button>
        </>
      )}
    </div>
  )
}

// ─── Panel de materiales ───────────────────────────────────────────────────────

function MaterialsPanel({ model, atlas, db, entityManifest }: { model: SchematicModel; atlas: Atlas; db: ModelDB | null; entityManifest: EntityManifest | null }) {
  const entries: MaterialEntry[] = useMemo(() => computeMaterials(model), [model])
  const [checked,   setChecked]   = useState<Set<string>>(() => loadChecked(model))
  // Arranca minimizada por defecto (en cualquier tamaño) para no tapar el visor.
  const [collapsed, setCollapsed] = useState(true)
  useItemAtlasReady()

  function toggle(key: string) {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key); else next.add(key)
      saveChecked(model, next)
      return next
    })
  }
  function clearAll() { setChecked(new Set()); saveChecked(model, new Set()) }
  function downloadTxt() {
    const text = materialsToText(model, entries)
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = `${(model.name || 'materiales').replace(/[^\w-]+/g, '_')}.txt`
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url)
  }

  return (
    <div className="absolute z-10 flex flex-col overflow-hidden"
      style={{ top: 60, right: 12, width: 'min(86vw, 300px)', maxHeight: 'calc(100% - 76px)',
               background: '#161618', border: '1px solid #2a2a2e', borderRadius: 14 }}>
      {/* Cabecera */}
      <div className="p-3.5 shrink-0" style={{ borderBottom: collapsed ? 'none' : '1px solid #2A2A2E' }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#A1A1AA]">Materiales</span>
          <div className="flex items-center gap-1.5">
            {!collapsed && (
              <button onClick={downloadTxt}
                className="text-[11px] font-semibold text-[#F4811F] px-2 py-0.5 rounded-md border border-[#2A2A2E] bg-[#1C1C1F] hover:border-[#F4811F] transition-colors">
                .txt
              </button>
            )}
            <button onClick={() => setCollapsed(c => !c)}
              className="flex items-center justify-center w-5 h-5 rounded text-[#A1A1AA] hover:text-[#F5F5F0] transition-colors"
              title={collapsed ? 'Expandir' : 'Minimizar'}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d={collapsed ? 'M2 4l4 4 4-4' : 'M2 8l4-4 4 4'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="text-lg font-bold tabular-nums text-[#F5F5F0]">
          {model.width} × {model.height} × {model.length}
        </div>
        <div className="text-xs text-[#A1A1AA] mt-0.5">
          {fmt(model.totalBlocks)} bloques · {entries.length} tipos
        </div>
        {!collapsed && (
          <div className="flex items-center justify-between mt-2 text-xs text-[#A1A1AA]">
            <span>{checked.size} / {entries.length} preparados</span>
            <button onClick={clearAll} className="px-2 py-0.5 rounded-md border border-[#2A2A2E] bg-[#1C1C1F] hover:text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors">
              limpiar
            </button>
          </div>
        )}
      </div>

      {/* Lista */}
      {!collapsed && <div className="overflow-y-auto p-1.5" style={{ scrollbarWidth: 'thin', scrollbarColor: '#2a2a2e transparent' }}>
        {entries.map(m => {
          const done = checked.has(m.key)
          const stacks = formatStacks(m.count)
          return (
            <div key={m.key} onClick={() => toggle(m.key)}
              className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer select-none transition-opacity ${done ? 'opacity-50' : ''} hover:bg-[#1C1C1F]`}>
              <div className={`w-[18px] h-[18px] shrink-0 rounded-[5px] border flex items-center justify-center transition-colors ${done ? 'bg-[#F4811F] border-[#F4811F]' : 'border-[#2A2A2E]'}`}>
                {done && (
                  <svg viewBox="0 0 12 12" fill="none" stroke="#0d0d0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                    <path d="M2 6.5 5 9.5 10 3"/>
                  </svg>
                )}
              </div>
              <BlockIcon atlas={atlas} db={db} entityManifest={entityManifest} name={`minecraft:${m.key}`} px={20} />
              <span className={`flex-1 text-[13px] truncate ${done ? 'line-through' : 'text-[#F5F5F0]'}`}>{m.name}</span>
              <div className="flex flex-col items-end leading-tight">
                <span className="text-[13px] font-semibold tabular-nums text-[#F5F5F0]">{fmt(m.count)}</span>
                {stacks && <span className="text-[11px] text-[#52525A]">{stacks}</span>}
              </div>
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
          backgroundImage: 'url(/entity-atlas.png)',
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
        : <span className="text-[12px] italic text-[#52525A]">(vacío)</span>}
    </div>
  )
}

function SelectedBlockPanel({ picked, atlas, db, entityManifest, onOpenInventory, onClose }: { picked: PickedBlock; atlas: Atlas; db: ModelDB | null; entityManifest: EntityManifest | null; onOpenInventory: () => void; onClose: () => void }) {
  const props = picked.properties ? Object.entries(picked.properties) : []

  return (
    <div className="absolute z-10 flex flex-col gap-3 p-4"
      style={{ left: 14, top: 56, minWidth: 210, maxWidth: 360,
               background: 'rgba(22,22,24,.94)', backdropFilter: 'blur(8px)',
               border: '1px solid #2a2a2e', borderRadius: 16, boxShadow: '0 10px 34px rgba(0,0,0,.4)' }}>
      <button onClick={onClose} aria-label="Cerrar"
        className="absolute top-2.5 right-2.5 flex items-center justify-center w-5 h-5 rounded text-[#71717A] hover:text-[#F5F5F0] transition-colors">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="flex items-center gap-3 pr-5">
        <BlockIcon atlas={atlas} db={db} entityManifest={entityManifest} name={picked.name} properties={picked.properties} />
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[15px] font-semibold text-[#F5F5F0] leading-tight truncate" title={displayName(picked.name)}>{displayName(picked.name)}</span>
          <span className="text-[11px] text-[#52525A] font-mono leading-tight truncate" title={picked.name}>{picked.name}</span>
        </div>
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
          {picked.sign.back.length > 0 && <span className="text-[10px] uppercase tracking-wide text-[#71717A]">Frente</span>}
          <SignBox lines={picked.sign.front} />
          {picked.sign.back.length > 0 && (
            <>
              <span className="text-[10px] uppercase tracking-wide text-[#71717A] mt-1">Detrás</span>
              <SignBox lines={picked.sign.back} />
            </>
          )}
        </div>
      )}

      {props.length > 0 && (
        <div className="flex flex-col gap-2 pt-3" style={{ borderTop: '1px solid #232327' }}>
          {props.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-4 text-[12px]">
              <span className="text-[#71717A] truncate">{k}</span>
              <span className="font-medium tabular-nums whitespace-nowrap" style={{ color: propValueColor(v) }}>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Canvas del visor (reutilizable) ───────────────────────────────────────────

interface ViewerCanvasProps {
  cargado:    Cargado
  viewerRef:  React.MutableRefObject<SchematicViewer | null>
  onReady?:   () => void
  onRebuild?: (truncated: boolean) => void
  className?: string
  style?:     React.CSSProperties
}

export function ViewerCanvas({ cargado, viewerRef, onReady, onRebuild, className, style }: ViewerCanvasProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const viewer = new SchematicViewer(canvas)
    viewerRef.current = viewer
    if (onRebuild) viewer.onRebuild = onRebuild
    viewer.setAtlas(cargado.atlas)
    viewer.setModelDB(cargado.db)
    viewer.load(cargado.model)
    onReady?.()
    return () => { viewer.dispose(); if (viewerRef.current === viewer) viewerRef.current = null }
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

  return (
    <div ref={containerRef} className={className} style={style}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}

// ─── Viewer 3D completo (toolbar + cortes + materiales + fondo) ─────────────────

interface Viewer3DProps {
  cargado: Cargado
  title:   string
  onClose?: () => void   // si se pasa → modo pantalla completa (overlay + botón Cerrar + ESC)
}

export function Viewer3D({ cargado, title, onClose }: Viewer3DProps) {
  const fullscreen = !!onClose
  const viewerRef  = useRef<SchematicViewer | null>(null)
  const [ready,    setReady]    = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('free')
  const [ortoIdx,  setOrtoIdx]  = useState(0)
  const [moreOpen, setMoreOpen] = useState(false)   // menú ⋯ de controles secundarios (móvil)
  const [bgColor,  setBgColor]  = useState('#1c1c1f')
  const [rt,       setRt]       = useState(false)
  const [bgImage,  setBgImage]  = useState<string | null>(null)
  const bgImgInput = useRef<HTMLInputElement>(null)
  const resCache   = useRef<Record<string, { atlas: Atlas; db: ModelDB }>>({})
  const [picked,   setPicked]   = useState<PickedBlock | null>(null)
  const [invOpen,  setInvOpen]  = useState(false)
  const [showcase, setShowcase] = useState(false)
  const [scPaused, setScPaused] = useState(false)
  const [photoBusy, setPhotoBusy] = useState(false)
  const [flySpeed, setFlySpeed] = useState(1)
  const [flyHelp,  setFlyHelp]  = useState(false)   // panel de free-cam (velocidad + WASD)
  const [isFs,     setIsFs]     = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const downRef    = useRef<{ x: number; y: number; t: number } | null>(null)

  // Pantalla completa real (del navegador) sobre el contenedor del visor.
  function toggleFullscreen() {
    const el = containerRef.current
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen?.()
    else el.requestFullscreen?.()
  }
  useEffect(() => {
    const onFs = () => setIsFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  function toggleShowcase() {
    const next = !showcase
    setShowcase(next)
    setScPaused(false)
    if (next) { setViewMode('free'); setPicked(null); setInvOpen(false) }
    viewerRef.current?.setShowcase(next)
  }

  function toggleScRotation() {
    const paused = !scPaused
    setScPaused(paused)
    viewerRef.current?.setShowcaseRotation(!paused)
  }

  async function takePhoto() {
    if (photoBusy) return
    setPhotoBusy(true)
    try {
      const blob = await viewerRef.current?.capturePhoto()
      if (blob) {
        const name = (title || 'schematic').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'schematic'
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = `${name}.png`
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
    viewerRef.current?.setBackgroundImage(url)
  }
  function clearBgImage() {
    setBgImage(null)
    viewerRef.current?.setBackground(bgColor)
  }

  async function toggleRt() {
    const next = !rt
    setRt(next)
    const key = next ? 'rt' : 'van'
    let r = resCache.current[key]
    if (!r) {
      if (next) {
        const [atlas, db] = await Promise.all([
          Atlas.load(asset('atlas-rt.png'), asset('atlas-rt.json')),
          ModelDB.load(asset('models-rt.json')),
        ])
        r = { atlas, db }
      } else {
        r = { atlas: cargado.atlas, db: cargado.db }
      }
      resCache.current[key] = r
    }
    viewerRef.current?.setResources(r.atlas, r.db)
  }

  // ESC + bloquear scroll (solo en pantalla completa)
  useEffect(() => {
    if (!onClose) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') { if (invOpen) setInvOpen(false); else onClose() } }
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose, invOpen])

  // Resaltar en 3D la celda seleccionada (o quitar el contorno)
  useEffect(() => {
    viewerRef.current?.setHighlight(picked ? { x: picked.x, y: picked.y, z: picked.z } : null)
    viewerRef.current?.setHighlightPair(picked?.pair ?? null)
  }, [picked])

  // Clic en el canvas = identificar bloque; se descarta si fue arrastre (órbita/pan)
  function onScenePointerDown(e: React.PointerEvent) {
    if ((e.target as HTMLElement).tagName !== 'CANVAS') { downRef.current = null; return }
    downRef.current = { x: e.clientX, y: e.clientY, t: performance.now() }
  }
  function onScenePointerUp(e: React.PointerEvent) {
    const d = downRef.current
    downRef.current = null
    if (e.button !== 0 && e.pointerType !== 'touch') return  // clic izquierdo (o toque) selecciona
    if (!d || (e.target as HTMLElement).tagName !== 'CANVAS') return
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6 || performance.now() - d.t > 400) return
    const r = viewerRef.current?.pick(e.clientX, e.clientY)
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
  }

  function applyView(mode: ViewMode, idx: number) {
    if (mode === 'free')     viewerRef.current?.setView('free')
    else if (mode === 'iso') viewerRef.current?.setView('iso')
    else                     viewerRef.current?.setView(ORTO_SEQ[idx])
  }
  function clickView(mode: ViewMode) {
    if (showcase) { setShowcase(false); viewerRef.current?.setShowcase(false) }
    let idx = ortoIdx
    if (mode === 'orto' && viewMode === 'orto') { idx = (ortoIdx + 1) % ORTO_SEQ.length; setOrtoIdx(idx) }
    else if (mode === 'orto') { idx = 0; setOrtoIdx(0) }
    setViewMode(mode)
    applyView(mode, idx)
  }

  return (
    <div ref={containerRef} className={fullscreen ? 'fixed inset-0 z-50' : 'relative w-full h-full'} style={{ background: bgColor }}
      onPointerDown={onScenePointerDown} onPointerUp={onScenePointerUp}
      onContextMenu={(e) => e.preventDefault()}>   {/* sin menú contextual del navegador en el visor */}

      {/* Imagen de fondo como div separado — mejor calidad que CSS en canvas */}
      {bgImage && (
        <div className="absolute inset-0" style={{
          backgroundImage: `url("${bgImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />
      )}

      {isTooLargeToRender(cargado.model) ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-3">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-[#F4811F]" aria-hidden="true">
            <path d="M12 2 2 7v10l10 5 10-5V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M2 7l10 5 10-5M12 12v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          <p className="text-[#F5F5F0] font-semibold">Build demasiado grande para previsualizar en 3D</p>
          <p className="text-sm text-[#A1A1AA] max-w-sm">
            {cargado.model.totalBlocks.toLocaleString('es-ES')} bloques ·{' '}
            {cargado.model.width}×{cargado.model.height}×{cargado.model.length}. El navegador no puede
            renderizarla entera; descárgala para verla en Minecraft.
          </p>
        </div>
      ) : (
        <ViewerCanvas cargado={cargado} viewerRef={viewerRef} onReady={() => setReady(true)}
          className="absolute inset-0" style={{ width: '100%', height: '100%' }} />
      )}

      {/* Toolbar — una fila; en móvil los controles secundarios van a un menú ⋯ */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3.5 py-2.5"
        style={{ background: 'linear-gradient(180deg, rgba(13,13,15,.92) 0%, rgba(13,13,15,0) 100%)' }}>

        <span className="hidden sm:block text-sm font-semibold text-[#F5F5F0] whitespace-nowrap">{title}</span>
        <div className="hidden sm:block sm:flex-1 sm:min-w-[12px]" />

        {/* Vistas */}
        <div className="flex rounded-xl overflow-hidden border border-[#2A2A2E]" style={{ background: '#161618' }}>
          {(['free','iso','orto'] as ViewMode[]).map((m, i) => (
            <button key={m} onClick={() => clickView(m)}
              className={`px-3 py-1.5 text-[13px] font-medium transition-colors ${i > 0 ? 'border-l border-[#2A2A2E]' : ''}`}
              style={viewMode === m ? { background: '#F4811F', color: '#0d0d0f' } : { color: '#A1A1AA' }}>
              {m === 'free' ? 'Libre' : m === 'iso' ? 'Iso' : viewMode === 'orto' ? ORTO_NAME[ORTO_SEQ[ortoIdx]] : 'Orto'}
            </button>
          ))}
        </div>

        {/* Controles secundarios: en línea en desktop, menú ⋯ desplegable en móvil */}
        <div
          onClick={() => setMoreOpen(false)}
          className={`sm:contents ${moreOpen ? 'absolute right-2 top-full mt-1.5 z-20 flex flex-col items-stretch gap-1.5 p-2 rounded-xl border border-[#2A2A2E] bg-[#161618] shadow-[0_12px_40px_rgba(0,0,0,.6)]' : 'hidden'}`}
        >

        {/* Slot contextual: Libre → Reajustar · Iso → rotar 90° · Orto → vistas orto */}
        {viewMode === 'orto' ? (
          <div className="flex rounded-lg overflow-hidden border border-[#2A2A2E]" style={{ background: '#161618' }}>
            {ORTO_SEQ.map((v, i) => (
              <button key={v} onClick={() => { setOrtoIdx(i); viewerRef.current?.setView(v) }}
                className={`px-2 py-1.5 text-[12px] font-medium transition-colors ${i > 0 ? 'border-l border-[#2A2A2E]' : ''}`}
                style={ortoIdx === i ? { background: '#F4811F', color: '#0d0d0f' } : { color: '#A1A1AA' }}
                title={ORTO_NAME[v]}>
                {ORTO_NAME[v].slice(0, 1)}
              </button>
            ))}
          </div>
        ) : viewMode === 'iso' ? (
          <button onClick={() => viewerRef.current?.rotate90()}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A2E] text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors"
            style={{ background: '#161618' }} title="Rotar 90°">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7a5 5 0 0 1 9-3M12 1v3H9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <button onClick={() => viewerRef.current?.resetView()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A2E] text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] text-[13px] font-medium transition-colors"
            style={{ background: '#161618' }} title="Restablecer cámara">
            Reajustar
          </button>
        )}

        {/* Ayuda de free-cam (velocidad + WASD): activable, solo en modo Libre */}
        {viewMode === 'free' && (
          <button onClick={() => { const v = !flyHelp; setFlyHelp(v); viewerRef.current?.setFlyEnabled(v) }}
            title={flyHelp ? 'Desactivar vuelo libre (WASD)' : 'Activar vuelo libre con WASD para moverte por la build'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors"
            style={flyHelp
              ? { background: '#F4811F', color: '#0d0d0f', borderColor: '#F4811F' }
              : { background: '#161618', color: '#A1A1AA', borderColor: '#2A2A2E' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2.5" y="6.5" width="19" height="11" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M6 10h.01M9 10h.01M12 10h.01M15 10h.01M18 10h.01M8 13.5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            Vuelo WASD
          </button>
        )}

        {/* Modo Showcase — rotación automática + iluminación/bloom */}
        <button onClick={toggleShowcase}
          title="Showcase — rotación automática e iluminación cinemática"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors"
          style={showcase
            ? { background: '#F4811F', color: '#0d0d0f', borderColor: '#F4811F' }
            : { background: '#161618', color: '#A1A1AA', borderColor: '#2A2A2E' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 3l1.9 4.7L19 9.5l-4.1 2.7L16 17l-4-2.6L8 17l1.1-4.8L5 9.5l5.1-1.8L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          Showcase
        </button>

        {/* Pausa de rotación: solo tiene sentido en showcase (autorrotación activa) */}
        {showcase && (
          <button onClick={toggleScRotation}
            title={scPaused ? 'Reanudar rotación' : 'Pausar rotación'}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A2E] text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors"
            style={{ background: '#161618' }}>
            {scPaused ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 2l9 5-9 5V2z"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="3" y="2" width="3" height="10" rx="1"/><rect x="8" y="2" width="3" height="10" rx="1"/></svg>
            )}
          </button>
        )}

        {/* Foto: PNG con fondo transparente de la vista actual (sin necesitar showcase) */}
        <button onClick={takePhoto} disabled={photoBusy}
          title="Hacer foto (PNG con fondo transparente) y descargar"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A2E] text-[#F5F5F0] hover:border-[#3A3A3F] text-[13px] font-medium transition-colors disabled:opacity-50"
          style={{ background: '#161618' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.6"/>
          </svg>
          {photoBusy ? 'Guardando…' : 'Foto'}
        </button>

        {/* Toggle Redstone Tweaks */}
        <button onClick={toggleRt}
          title="Redstone Tweaks — texturas técnicas (by RexxStone)"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors"
          style={rt
            ? { background: '#F4811F', color: '#0d0d0f', borderColor: '#F4811F' }
            : { background: '#161618', color: '#A1A1AA', borderColor: '#2A2A2E' }}>
          Redstone Tweaks
        </button>

        {/* Color de fondo */}
        <label title="Color de fondo"
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A2E] cursor-pointer hover:border-[#3A3A3F] transition-colors overflow-hidden relative"
          style={{ background: '#161618' }}>
          <div className="w-4 h-4 rounded-sm border border-white/20" style={{ background: bgColor }} />
          <input type="color" value={bgColor}
            onChange={(e) => { setBgColor(e.target.value); setBgImage(null); viewerRef.current?.setBackground(e.target.value) }}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
        </label>

        {/* Imagen de fondo */}
        <button onClick={() => bgImage ? clearBgImage() : bgImgInput.current?.click()}
          title={bgImage ? 'Quitar imagen de fondo' : 'Imagen de fondo'}
          className="flex items-center justify-center w-8 h-8 rounded-lg border transition-colors"
          style={bgImage
            ? { background: '#F4811F', color: '#0d0d0f', borderColor: '#F4811F' }
            : { background: '#161618', color: '#A1A1AA', borderColor: '#2A2A2E' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
            <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor"/>
            <path d="M21 16l-5-5L5 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <input ref={bgImgInput} type="file" accept="image/*" className="hidden" onChange={pickBgImage} />
        </div>

        {/* Botón ⋯ (abre los controles secundarios en móvil) */}
        <button onClick={() => setMoreOpen(v => !v)}
          title="Más opciones"
          className="sm:hidden flex items-center justify-center w-8 h-8 rounded-lg border transition-colors"
          style={moreOpen
            ? { background: '#F4811F', color: '#0d0d0f', borderColor: '#F4811F' }
            : { background: '#161618', color: '#A1A1AA', borderColor: '#2A2A2E' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="3" cy="8" r="1.4"/><circle cx="8" cy="8" r="1.4"/><circle cx="13" cy="8" r="1.4"/>
          </svg>
        </button>

        {/* Pantalla completa real (del navegador) */}
        <button onClick={toggleFullscreen}
          title={isFs ? 'Salir de pantalla completa' : 'Pantalla completa'}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A2E] text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors"
          style={{ background: '#161618' }}>
          {isFs ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 3v3a3 3 0 0 1-3 3H3M21 9h-3a3 3 0 0 1-3-3V3M3 15h3a3 3 0 0 1 3 3v3M15 21v-3a3 3 0 0 1 3-3h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {/* Cerrar — solo en pantalla completa */}
        {onClose && (
          <button onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2A2A2E] text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] text-sm transition-colors"
            style={{ background: '#161618' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="hidden sm:inline">Cerrar</span>
          </button>
        )}
      </div>

      {/* Cortes */}
      {ready && <SlicersPanel model={cargado.model} viewer={viewerRef.current} />}

      {/* Materiales */}
      {ready && <MaterialsPanel model={cargado.model} atlas={cargado.atlas} db={cargado.db}
        entityManifest={viewerRef.current?.getEntityManifest() ?? null} />}

      {/* Bloque seleccionado (clic) — se oculta mientras el inventario está abierto */}
      {ready && picked && !invOpen && <SelectedBlockPanel picked={picked} atlas={cargado.atlas} db={cargado.db}
        entityManifest={viewerRef.current?.getEntityManifest() ?? null}
        onOpenInventory={() => setInvOpen(true)}
        onClose={() => { setPicked(null); setInvOpen(false) }} />}

      {/* Inventario del contenedor: panel lateral no modal (se puede seguir moviendo el schematic) */}
      {ready && invOpen && picked?.content && (
        <ContainerInventory name={picked.name} content={picked.content}
          atlas={cargado.atlas} db={cargado.db} entityManifest={viewerRef.current?.getEntityManifest() ?? null}
          forceSize={picked.doubleSlots}
          onClose={() => setInvOpen(false)} />
      )}

      {/* Velocidad de vuelo + hint de free-cam (solo en vista libre, si está activado) */}
      {ready && viewMode === 'free' && flyHelp && (
        <div className="absolute bottom-20 left-3 z-10 select-none text-[11px] text-[#A1A1AA] flex flex-col gap-2" style={{ maxWidth: 280 }}>
          <div className="flex flex-col gap-2 pointer-events-auto" style={{ width: 230, background: 'rgba(13,13,15,.6)', padding: '8px 10px', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[#F5F5F0] font-semibold whitespace-nowrap">Velocidad de free cam</span>
              <span className="tabular-nums text-[#F4811F]">{flySpeed.toFixed(2)}×</span>
            </div>
            <ThumbSlider value={flySpeed} min={0.1} max={5}
              onChange={(v) => { setFlySpeed(v); viewerRef.current?.setFlySpeed(v) }} />
          </div>
          <div className="pointer-events-none"
            style={{ background: 'rgba(13,13,15,.6)', padding: '4px 8px', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
            <span className="text-[#F5F5F0] font-semibold">WASD</span> moverte · <span className="text-[#F5F5F0] font-semibold">Espacio/Shift</span> subir/bajar
          </div>
        </div>
      )}

    </div>
  )
}
