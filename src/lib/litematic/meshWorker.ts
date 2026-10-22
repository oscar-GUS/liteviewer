// Web Worker: malla la build por trozos fuera del hilo principal (ver
// chunkMesher.ts). Se queda con el volumen y lo precalculado entre mensajes y
// devuelve los búferes como transferibles.

import { ChunkMesher, MesherIn } from './chunkMesher'

// El mesher trabaja a ratos y cede entre medias para atender los mensajes que
// lleguen (un corte nuevo no espera a que acabe la build). Con un MessageChannel
// y no con setTimeout(0), que tras unas cuantas vueltas seguidas espera 4 ms.
const canal = new MessageChannel()
let siguiente: (() => void) | null = null
canal.port1.onmessage = () => { const f = siguiente; siguiente = null; f?.() }

const mesher = new ChunkMesher(
  (m, transfer) => (self as unknown as Worker).postMessage(m, transfer),
  (fn) => { siguiente = fn; canal.port2.postMessage(0) },
)

self.addEventListener('message', (e: MessageEvent<MesherIn>) => mesher.handle(e.data))
