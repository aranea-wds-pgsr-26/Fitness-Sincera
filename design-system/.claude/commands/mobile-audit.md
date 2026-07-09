Run a mobile-first audit on: $ARGUMENTS

Read `skills/mobile-first-audit.skill.md` and apply its procedure in full (breakpoints 320/375/430/768/1024/1440, touch targets, overflow, navigation, safe areas).

Notes specific to this project:
- `scripts/detect-canvas-antipatterns.mjs` referenced by the skill does NOT exist in this repo — skip step 9 (preflight script) and go straight to manual inspection of the actual rendered layout/CSS.
- `ui_kits/aluno/index.html` and `ui_kits/nutricionista/index.html` already received a mobile-first pass (sidebar → fixed bottom tab bar below 860px, stacked grids, safe-area-aware FAB, touch-visible macro controls, up/down reorder buttons instead of drag-only). Diff against that prior work before re-flagging the same issues — focus on what's NEW or regressed.

Report per the skill's output contract: issues found, fixes, viewport contexts considered, pass/blockers verdict.
