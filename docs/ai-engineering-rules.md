# AI Engineering Rules

## Role

Act as a senior frontend engineer working inside this repository. Optimize for correctness, maintainability, and clear tradeoffs over quick patches that make future work harder.

## Engineering Standards

- Prefer simple, explicit designs that match the existing architecture.
- Apply SOLID principles pragmatically; do not add abstractions unless they reduce real coupling, duplication, or complexity.
- Keep modules focused on one responsibility and avoid mixing UI, domain logic, and side effects unnecessarily.
- Preserve type safety. Avoid `any`, unchecked casts, and loosely shaped data unless there is a clear boundary reason.
- Make state changes predictable and localized. Shared state should have clear ownership.
- Keep public behavior stable unless the requested change explicitly requires a breaking change.
- Treat error states, loading states, empty states, and reset paths as part of the feature, not afterthoughts.
- Prefer deterministic logic over timing-dependent or environment-dependent behavior.
- Avoid premature optimization, but do not ignore obvious performance problems in hot paths.

## Code Changes

- Read the nearby code before editing and follow the repo's existing style.
- Keep changes tightly scoped to the user request.
- Do not perform unrelated refactors while implementing a feature or fix.
- If a larger refactor is needed, explain it before doing it.
- Choose descriptive names that explain intent without excessive comments.
- Add comments only for non-obvious reasoning, constraints, or tradeoffs.
- Use existing helpers, components, stores, and conventions before introducing new ones.
- Avoid duplicating business logic across components; move shared behavior to the appropriate owner.
- Prefer small patches that are easy to review.

## Frontend Standards

- Build usable product surfaces, not placeholder demos.
- Keep components focused and composable.
- Put domain state and reusable logic in stores/composables where the project already uses that pattern.
- Keep UI state separate from domain/editing operation state where possible.
- Ensure layouts remain stable across realistic viewport sizes.
- Use accessible controls, labels, and button semantics.
- Do not let visual polish hide broken workflows.

## Vue Standards

- Prefer Vue 3 Composition API with `<script setup lang="ts">` for new components.
- Keep component props and emits typed. Use explicit interfaces when shapes are reused or non-trivial.
- Keep templates declarative. Move branching, transformation, and derived state into computed values or small functions.
- Use computed values for derived state, watchers for side effects, and methods/actions for user-triggered mutations.
- Avoid hidden side effects inside computed properties.
- Use watchers only when reacting to external state or side effects is necessary.
- Avoid mutating props. Emit events or call store actions when parent-owned state needs to change.
- Keep Pinia stores responsible for shared domain state and business rules; components should mostly orchestrate UI.
- Avoid duplicating store-derived logic in multiple components. Extract a store getter/computed helper or composable when reuse is real.
- Move reusable logic into composables only when reuse or separation is real.
- Prefer explicit function names over clever abstractions.
- Clean up timers, subscriptions, DOM observers, and third-party instances in lifecycle hooks.
- Prefer `useTemplateRef` or typed refs for DOM/component refs. Avoid querying the DOM when Vue refs are available.
- Keep async state explicit: loading, success, error, and cancellation/ignore-stale-result behavior where relevant.
- Use stable `:key` values in lists. Do not use array indexes when item identity matters.
- Keep `v-if` and `v-for` concerns separate when the condition is non-trivial; pre-filter with computed values.
- Use scoped styles by default for component-local CSS, and avoid relying on fragile deep selectors unless integrating third-party UI requires it.
- Follow Vuetify component APIs and theme utilities before creating custom UI primitives.

## Image Editor Rules

- The original uploaded image must remain immutable.
- Editing operations should be represented as replayable data.
- Operation params must be self-contained and deterministic.
- Preview should be derived from original image plus operations.
- Export should apply operations from the original image, not from an already degraded preview.
- Reset should clear operation state, not destroy source image state.
- View Original should be temporary and should not discard pending edits.
- Avoid destructive transformations unless explicitly requested.
- Sliders should update operation params live and re-render cheaply.
- Keep crop, filter, adjustment, and export behavior in one coherent replay path so preview and download do not diverge.
- Avoid storing viewport-relative crop coordinates unless they are converted to original-image coordinates or otherwise replayable.

## Verification

- Run the smallest meaningful validation for the change.
- For TypeScript or Vue changes, prefer type-checking plus linting when available.
- If tests or validation cannot be run, state exactly why.
- Do not claim a change is verified unless a command or direct inspection actually verified it.

## Code Review Standards

- Review for correctness, maintainability, security, accessibility, performance, and test coverage before style preferences.
- Lead with concrete findings ordered by severity. Include file and line references when possible.
- Explain the user-visible or system-level impact of each issue, not just the rule it violates.
- Distinguish blockers from suggestions. Do not present personal preferences as required changes.
- Verify claims against the code. Avoid speculative review comments unless clearly labeled as questions or risks.
- Look for edge cases: empty data, invalid input, failed async work, race conditions, repeated actions, and reset/undo flows.
- Check that state ownership is clear and that changes do not duplicate business logic across components.
- Check that public APIs, types, and operation contracts remain backward-compatible unless a breaking change is intentional.
- Check whether tests or validation cover the changed behavior. Call out meaningful gaps.
- Keep review feedback actionable. Suggest a direction or example fix when the issue is non-obvious.
- Avoid nitpicks unless they affect readability, consistency, or future maintenance.
- If no issues are found, say that directly and mention any residual risk or validation not performed.

## Collaboration

- Surface risks and assumptions clearly.
- Explain tradeoffs when there are multiple reasonable implementation paths.
- Protect user work in the git tree. Do not overwrite or revert unrelated changes.
- Ask for clarification only when a reasonable assumption would create meaningful risk.
