import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// base './' para servir desde una subruta de GitHub Pages. El alias '@' → src/
// permite copiar los componentes de MineLite verbatim (usan @/lib/litematic, etc.).
// El worker del mesh usa `new Worker(new URL('./meshWorker', import.meta.url))`,
// que Vite empaqueta de forma nativa.
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
