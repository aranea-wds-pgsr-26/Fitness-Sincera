# Handoff notes — Fitness Sincera design system → Claude Code

Read this before continuing work outside Claude Design Web.

## What actually exists vs. what CLAUDE.md describes

- `CLAUDE.md`'s "deterministic script pipeline" (`scripts/*.mjs`) is **not implemented** — `scripts/` is
  an empty folder in this project. Ignore instructions to "execute scripts/context-signals.mjs" etc.;
  there is nothing to run. The real design-system checks that happened were done manually by reading
  files and applying the `.skill.md` procedures directly.
- The `.skill.md` files under `skills/` are plain markdown procedures, not installed/native Skills.
  Claude Code can use them the same way this project's agent did: read the relevant file, apply its
  checklist. Three are wired up as Claude Code slash commands in `.claude/commands/` for convenience:
  `/mobile-audit`, `/a11y-audit`, `/guardian`.

## What's portable to a normal codebase vs. platform-specific

- `ui_kits/aluno/index.html` and `ui_kits/nutricionista/index.html` are plain HTML + React/Babel via
  CDN — no build step, run anywhere (Claude Code, any browser, any static host).
- `components/**/*.jsx` (the design-system component source) are compiled into `_ds_bundle.js` by
  Claude Design Web's own compiler automatically on every turn. That compiler does **not** exist
  outside this platform. Consequences for continuing in Claude Code:
  - Editing a `.jsx` under `components/` will NOT update `_ds_bundle.js` there.
  - Either (a) set up a real bundler (esbuild/vite) to recompile `components/**` → `_ds_bundle.js`
    before making further component-level changes, or (b) treat `_ds_bundle.js` as frozen build output
    and make any further UI changes directly in the `ui_kits/**` files that consume it.

## Work already completed (this session)

1. **Mobile-first pass** on `ui_kits/aluno` and `ui_kits/nutricionista`: sidebar collapses to a fixed,
   safe-area-aware bottom tab bar below 860px; dashboard grids stack to one column; the clients table
   scrolls horizontally instead of overflowing; FAB/toast reposition above the bottom bar; drag-and-drop
   meal reordering in the plan editor got an up/down-button fallback for touch.
2. **Accessibility pass** on the same two apps: restored visible `:focus-visible` rings (many inputs had
   inline `outline:none` with no replacement), converted icon-only `<div onClick>` controls (FAB,
   notification bell) to real `<button>`s with `aria-label`, added labels to previously-unlabeled inputs,
   gave the toast `role="status" aria-live="polite"`, darkened low-contrast interactive icon colors.

## Known open items (not yet fixed)

- Heading hierarchy skips `h1` → `h3` in several dashboard widgets (`Widget` component, both
  `screen-dashboard.jsx` files) — no `h2` in between.
- Several small (10–12px) text runs use `--slate-400` on white, under the 4.5:1 contrast minimum —
  needs a broader look at where that token is used for body/label text vs. truly decorative text,
  not a one-off color swap.

## Repo landing spot

This is a design-system/prototype project, not the production app. If pushing into
`wesleyds71/Fitness-Sincera`, land it as its own folder alongside `ref-html-dashboard/` (that folder
already holds prior HTML design references there) rather than merging into `client/`/`server/` —
recreate the reviewed pieces in the real app's existing stack, don't ship this HTML as-is.
