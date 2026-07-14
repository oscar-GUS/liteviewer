import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setAssetBase } from '@/lib/litematic/assets'
import './index.css'
import VisorLocal from './VisorLocal'

// Los assets (atlas, models, entity-atlas…) van junto al app; con `base: './'`
// se sirven en la misma subruta que la página (p. ej. /liteviewer/ en Pages).
setAssetBase(import.meta.env.BASE_URL)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VisorLocal />
  </StrictMode>,
)
