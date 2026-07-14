# Lite Viewer

Visor 3D de schematics de Minecraft (`.litematic` / `.schem`) — versión standalone
de la herramienta de [MineLite](https://minelite.es). El archivo nunca sale del
navegador. Se despliega en GitHub Pages y MineLite lo embebe por `<iframe>`.

## Estructura

- `src/lib/litematic/` — **motor de render** (parseo NBT + generación de mesh + three.js).
  Es la MISMA fuente que usa el visor de producción de MineLite; **no editar aquí a mano**:
  MineLite es la fuente de verdad y sincroniza este directorio con `tools/sync-liteviewer.mjs`.
- `src/components/schematic/Viewer3D.tsx` — UI del visor (también sincronizada desde MineLite).
- `src/VisorLocal.tsx` — shell standalone (soltar archivo → render). Propio de este repo.
- `public/` — atlas y modelos horneados (`atlas*.png/json`, `models*.json`, `entity-atlas`, `item-atlas`).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
```

El deploy es automático: push a `main` → Action construye y publica `dist/` en la rama
`gh-pages` → live en https://oscar-gus.github.io/liteviewer/.
