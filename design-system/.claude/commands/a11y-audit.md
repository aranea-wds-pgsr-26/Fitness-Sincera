Run an accessibility audit on: $ARGUMENTS

Read `skills/accessibility-audit.skill.md` and apply its procedure in full (contrast, semantic structure, keyboard nav, forms, motion, screen-reader, document basics).

Notes specific to this project:
- `scripts/detect-canvas-antipatterns.mjs` referenced by the skill does NOT exist in this repo — skip the automated preflight step and inspect the real DOM/CSS by hand.
- A first pass already fixed: visible `:focus-visible` rings (many inputs reset `outline:none` inline), icon-only interactive elements (FAB, notification bell, chevrons, delete/reorder buttons) converted to real `<button>` with `aria-label`, unlabeled inputs given `aria-label`/`sr-only` labels, toast given `role="status" aria-live="polite"`.
- Known open blockers (not yet fixed, don't re-discover from scratch — verify and finish these): heading hierarchy skips from `h1` to `h3` in several dashboard widgets (`Widget` component in both `screen-dashboard.jsx` files); several small (`10-12px`) text runs in `--slate-400` fall below 4.5:1 contrast on white — needs a broader token-usage pass, not a one-off color swap.

Include the mandatory disclaimer: this is a design/code review, not a WCAG compliance certification — real compliance needs manual keyboard/screen-reader testing.
