# Project instructions

## Project

This is a browser-based image editor project for non-destructive image editing.

## Tech stack

- Vue 3 with Composition API
- TypeScript
- Vite
- Vuetify
- Pinia
- Cropper.js

## Commands

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Type check: `npm run type-check`
- Lint: `npm run lint`
- Format: `npm run format`

## Rules

- Do not change public behavior unless requested.
- Prefer minimal diffs.
- Keep existing file structure.
- Do not add new dependencies without approval.
- Run relevant checks before final answer.
- Keep the original uploaded image immutable.
- Represent edits as replayable operation data.
- Preview and export should render by applying operations from the original image.
- Reset clears the operation list only.
- View Original must not discard pending edits.

## Tool-specific rules

- Shared frontend and engineering rules are in `docs/ai-engineering-rules.md`.
- Codex-specific instructions are in `.codex/rules.md` and `.codex/`.
- Cursor-specific instructions are in `.cursor/rules/project.mdc`.
- Claude-specific instructions are in `CLAUDE.md` and `.claude/`.
