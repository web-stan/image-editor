# image-editor

Browser-based, non-destructive image editor. Vue 3, Vuetify, Pinia, TypeScript, Vite.

## Setup

```sh
npm i
npm run dev
```

## Commands

- `npm run dev` — start dev server
- `npm run build` — type-check + build
- `npm run lint` — oxlint + eslint --fix
- `npm run format` — prettier

## Implementation Notes

- I treated the original uploaded image as immutable state. Every visible edit is derived from that source instead of writing changes back into a working bitmap.
- Pinia owns the edit model: `originalImage`, `originalFileName`, `operations`, and `viewOriginal`. Components stay mostly as controls around that state.
- Edits are modeled as typed operations: crop, brightness, contrast, saturation, and filters. Each operation stores only the parameters needed to replay it.
- Crop, brightness, contrast, and saturation are treated as singleton operations; filters are repeatable so multiple presets can stack in the operation list.
- Operations are kept in the same deterministic order used by the renderer: crop, brightness, contrast, saturation, then filter. For the current edit types, that order is not technically significant to the result; it is kept as a stable replay contract for future configuration and operation types.
- I kept crop as replayable image-space coordinates, including the source dimensions, so it is not tied to the size of the cropper UI.
- Sliders update singleton adjustment operations live. If a brightness, contrast, or saturation operation already exists, its value is changed instead of adding a new duplicate operation.
- Preview and image export use the same canvas rendering path. That keeps the downloaded result aligned with what the user sees in the editor.
- The "view original" control is temporary. It hides the operation list during preview, but does not discard pending edits.
- Reset is intentionally simple: it clears the operation list and returns the editor to the original image.
- For adjustment rendering, I used the browser canvas `filter` API. It keeps the implementation small and fast enough for this scope, though it is less flexible than a pixel-processing pipeline.
- I kept the UI compact and tool-like with Vuetify controls instead of making a landing-style layout, since the main workflow is upload, crop, adjust, compare, and export.
- Bonus was attempted and implemented. The app includes grayscale and sepia filters as stackable operation data, not one-off visual effects.
- Bonus JSON export was also implemented. The exported payload has a `version`, the source file name, the render `pipeline`, and an ordered `operations` array so the same edits can be replayed against the original image.
