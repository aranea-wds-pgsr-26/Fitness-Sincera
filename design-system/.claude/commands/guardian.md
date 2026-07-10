Run the design-system-guardian check on: $ARGUMENTS

Read `skills/design-system-guardian.skill.md`, `DESIGN.md`, and the token CSS under `tokens/` (re-exported by root `styles.css`). Verify the target file(s) use only `var(--*)` tokens from that graph for color/spacing/type/radius/motion — flag any hard-coded hex or invented values.

Notes specific to this project:
- There is no live `_ds_bundle.js` recompilation step available outside Claude Design Web. If you edit a component under `components/**/*.jsx`, `_ds_bundle.js` will NOT regenerate automatically here — either wire up a real bundler (esbuild/vite) before relying on further component edits, or treat `_ds_bundle.js` as frozen build output and make UI changes directly in the `ui_kits/**` consumer files instead.
- `scripts/*.mjs` referenced elsewhere in `CLAUDE.md` do not exist in this repo (empty `scripts/` folder) — do not try to invoke them; the guardian check here is a manual read-and-compare against `DESIGN.md` + token CSS.
