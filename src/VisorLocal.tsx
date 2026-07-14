// Herramienta standalone (repo oscar-GUS/liteviewer): el usuario suelta un
// .litematic/.schem local y se visualiza en 3D con la UI compartida Viewer3D.
// El archivo NUNCA sale del navegador. Se embebe en MineLite por iframe.
import { useCallback, useRef, useState } from 'react'
import { parseSchematicBuffer } from '@/lib/litematic/parse'
import { Atlas } from '@/lib/litematic/atlas'
import { ModelDB } from '@/lib/litematic/models'
import { Viewer3D, type Cargado } from '@/components/schematic/Viewer3D'

type Estado = 'idle' | 'loading' | 'loaded' | 'error'

function DropZone({ onFile }: { onFile: (file: File) => void }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) onFile(file)
  }, [onFile])

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`w-full max-w-lg mx-auto flex flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 py-16 px-8 ${
        dragging ? 'border-[#F4811F] bg-[#F4811F]/5' : 'border-[#2A2A2E] hover:border-[#3A3A3F] bg-[#161618] hover:bg-[#1A1A1D]'
      }`}
    >
      <input ref={inputRef} type="file" accept=".litematic,.schem" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f) }} />

      <div className="w-16 h-16 rounded-2xl bg-[#1C1C1F] border border-[#2A2A2E] flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#F4811F]">
          <path d="M21 7l-9-5-9 5v10l9 5 9-5V7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M12 2v20M3 7l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="text-center">
        <p className="font-semibold text-[#F5F5F0]">Arrastra tu schematic aquí</p>
        <p className="mt-1 text-sm text-[#71717A]">o haz click para seleccionar</p>
        <p className="mt-3 text-xs text-[#52525A]">
          Soporta <span className="text-[#A1A1AA]">.litematic</span> y <span className="text-[#A1A1AA]">.schem</span>
          {' '}— el archivo nunca sale de tu navegador
        </p>
      </div>
    </div>
  )
}

export default function VisorLocal() {
  const [estado,   setEstado]   = useState<Estado>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [cargado,  setCargado]  = useState<Cargado | null>(null)
  const [fileName, setFileName] = useState('')

  const handleFile = useCallback(async (file: File) => {
    setEstado('loading'); setErrorMsg(''); setCargado(null)
    setFileName(file.name)
    try {
      const buffer = await file.arrayBuffer()
      const model  = await parseSchematicBuffer(buffer, file.name)
      const [atlas, db] = await Promise.all([
        Atlas.load(),
        ModelDB.load(),
      ])
      setCargado({ model, atlas, db })
      setEstado('loaded')
    } catch (e) {
      setErrorMsg(e instanceof Error && e.message === 'SCHEMATIC_TOO_LARGE'
        ? 'Build demasiado grande para previsualizar en 3D. Descárgala para verla en Minecraft.'
        : (e instanceof Error ? e.message : 'Error desconocido'))
      setEstado('error')
    }
  }, [])

  const nameNoExt = fileName.replace(/\.(litematic|schem)$/i, '')

  return (
    <main className="min-h-screen bg-[#0D0D0F]">
      <div className="w-full px-4 sm:px-8 py-4 border-b border-[#1E1E21] flex items-center gap-2 text-sm">
        <span className="text-[#F5F5F0] font-medium">Lite Viewer</span>
        {fileName && (
          <>
            <span className="text-[#3A3A3F]">/</span>
            <span className="text-[#A1A1AA] truncate max-w-xs">{nameNoExt}</span>
          </>
        )}
        {estado === 'loaded' && (
          <button
            onClick={() => { setEstado('idle'); setCargado(null); setFileName('') }}
            className="ml-auto flex items-center gap-1.5 text-xs text-[#71717A] hover:text-[#F5F5F0] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Cargar otro
          </button>
        )}
      </div>

      {estado === 'idle' && (
        <div className="flex flex-col items-center justify-center py-24 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#F5F5F0]">Lite Viewer</h1>
            <p className="mt-2 text-sm text-[#71717A]">Visualiza tus schematics en 3D sin subirlos a ningún servidor</p>
          </div>
          <DropZone onFile={handleFile} />
        </div>
      )}

      {estado === 'loading' && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-[#F4811F] border-t-transparent animate-spin" />
          <p className="text-sm text-[#A1A1AA]">Procesando schematic…</p>
          <p className="text-xs text-[#52525A]">{fileName}</p>
        </div>
      )}

      {estado === 'error' && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[#71717A]">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p className="text-sm text-[#71717A]">No se pudo procesar el archivo</p>
          {errorMsg && <p className="text-xs text-[#52525A] max-w-sm text-center">{errorMsg}</p>}
          <button onClick={() => setEstado('idle')}
            className="mt-2 px-4 py-2 rounded-lg bg-[#161618] border border-[#2A2A2E] text-sm text-[#A1A1AA] hover:text-[#F5F5F0] hover:border-[#3A3A3F] transition-colors">
            Intentar con otro archivo
          </button>
        </div>
      )}

      {estado === 'loaded' && cargado && (
        <div className="relative w-full" style={{ height: 'calc(100vh - 57px)' }}>
          <Viewer3D cargado={cargado} title={nameNoExt} />
        </div>
      )}
    </main>
  )
}
