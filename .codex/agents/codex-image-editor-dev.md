---
name: codex-image-editor-dev
description: Codex agent guidance for this Vue/Vuetify/Pinia browser image editor. Use when changing the non-destructive editing pipeline, upload/crop/adjustment/export behavior, or the UI that drives those operations.
tools: Read, Edit, Write, Grep, Glob, Bash
---

Stack: Vue 3 with Composition API and `<script setup lang="ts">`, Vuetify 3/4 components, Pinia setup stores, TypeScript, Vite, Cropper.js.

Read and follow the root `AGENTS.md`, `docs/ai-engineering-rules.md`, and `.codex/rules.md` before editing.

## Task Description

# Test Task — Image Editor (Vue 3)

We work in the printing industry, where preparing and adjusting images for output is everyday work. This task is a small browser-based image editor in that spirit. We're mainly interested in how you model the edits, not just the pixels.

Plan for roughly a day. Get the requirements working first; the bonus section is optional.

## Stack & setup

- Expected technologies
  - Vue 3
  - Vuetify 3
  - Pinia
  - TypeScript
- Scaffold the app however you like.
- Using cropping library such as cropperjs is fine.
- It must run with `npm i && npm run dev`.

## Requirements

- [ ] Load an image via file upload.
- [ ] Crop uploaded image
- [ ] Adjust it with live sliders with a real-time preview.
  - [ ] brightness
  - [ ] contrast
  - [ ] saturation
- [ ] Reset / view original: a way back to the unedited image. Edits must stay non-destructive — keep the original and derive the preview rather than writing changes into the source.
- [ ] Export the result by downloading it.

## ★ Bonus (optional)

- [ ] Add at least one filter (greyscale, sepia, etc.).
- [ ] Export the operations as JSON alongside the image. It should describe applied operations so that that replaying them on the original image reproduces the result. You design the shape; be ready to explain it.

## Constraints & notes

- Editing must stay non-destructive;
- AI is allowed and encouraged. The design decisions (op model, pipeline, UX) are yours to explain.

## What to submit

- A git repository link or zip file that reviewers can run locally with `npm i && npm run dev`.
- Short notes on key decisions and trade-offs, including whether you attempted the bonus and how you modeled replayable operations.

## Prime Directive

The original uploaded image is immutable. Every edit must be represented as replayable operation data, and preview/export must render by applying those operations from the original source.

Do not introduce workflows that progressively bake edits into a working bitmap unless the result is stored only as an operation parameter and the original remains available for reset, preview, and export.

## Current App Shape

- `src/stores/image.ts` owns `originalImage`, `originalFileName`, `operations`, and `viewOriginal`.
- `src/components/ImageUploadDropzone.vue` loads image files through the store.
- `src/components/ImageCropper.vue` uses Cropper.js and stores crop output through `applyCrop`.
- `src/components/ImageAdjustments.vue` currently drives brightness through store operations.
- `src/components/ImagePreview.vue` renders the preview canvas and handles download/export.

Keep components thin. Prefer adding operation types and store methods first, then wiring controls and preview/export rendering around them.

## Non-Destructive Operation Rules

- Operation params must be self-contained and deterministic.
- Reset clears the operation list only.
- View Original temporarily renders the original with no operations; it must not discard pending edits.
- Sliders should update operation params live and re-render cheaply.
- Export should apply the operation list once from the original image at full available resolution.
- When replacing a singleton operation such as brightness, contrast, saturation, or crop, preserve ordering intentionally. If order matters, make that explicit in the store method.

## Implementation Preferences

- Use typed operation interfaces in `src/stores/image.ts`; avoid `any` for operation params.
- Use computed setters in Vue components for slider controls.
- Use canvas `ctx.filter` for simple brightness/contrast/saturation/filter effects when possible.
- Keep crop, filter, adjustment, and export behavior in one coherent replay path so preview and download do not diverge.
- Avoid storing viewport-relative crop coordinates unless they are converted to original-image coordinates or otherwise replayable.
- Do not add comments unless explaining a non-obvious design constraint.

## UI Guidance

- Use Vuetify controls already present in the app: `v-file-upload`, `v-slider`, `v-btn`, `v-icon`, `v-card`, grid/layout utilities.
- Keep the interface practical and compact; this is an editing tool, not a marketing page.
- Use icon buttons for reset/tool actions where clear, with accessible labels or recognizable Vuetify icon props.
- Ensure canvas/cropper containers have stable dimensions and do not shift when controls update.

## Verification

Run these after meaningful code changes:

- `npm run type-check`
- `npm run lint`
- `npm run build` when export/rendering paths or Vite config are touched

If dependencies are missing, use `npm i`. If dependency installation or network access is blocked, report that explicitly and verify as much as possible locally.
