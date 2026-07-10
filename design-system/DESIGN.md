# DESIGN.md - Fitness Sincera

> Active visual constraint for **Fitness Sincera** (`builder` host). Synthesized by harness-auto-setup
> from `readme.md` + token CSS.
> Token **values** live in `tokens/*.css` (re-exported by root `styles.css`). This file is the
> interpretive layer. When this file disagrees with token CSS, **the CSS wins** - flag mismatches inline,
> then proceed with tokens.

Read `BOUND_DS.json` for the machine binding (`namespace`: `FitnessSinceraDesignSystem_06b67f`, 10 components).
Readme: `readme.md`.

---

## 1. Design Philosophy

**Tagline:** Routine First, not Data First - a high-ticket audience pays for **decisions already made**.

Fitness Sincera ("flux" is the product wordmark) is a dual-interface SaaS for nutrition + training
coaching. A **nutricionista / personal trainer** plans the client's day; the **aluno** simply *executes*
it. Where traditional apps hand you a blank screen and decision fatigue, this one shows *"Coma 3 Ovos"*
and a check button. The promise is **clarity**, not data.

The signature container move is **dark chrome cradling a bright workspace**: a `#111111` app shell and
`#1a1c1e` sidebar wrap light work surfaces on which **white cards float**. Premium, calm, confident.

**Surface registers**
- **Brand** - the lime Zap wordmark, auth screens, marketing (`Brand` lock-up)
- **Product** - the **Aluno** client app and **Nutricionista** pro panel (dashboards, meal editor)
- **System** - specimens, tokens, this design-system page

**Anti-references** (do not drift into):
- Gradients-as-decoration, textures, or glassmorphism
- Hard/dark drop shadows (the look is soft, low-opacity shadow on white)
- Generic SaaS card grids, decorative rows of emoji, invented metrics or filler copy
- Hand-drawn or substituted icons (Lucide only)

---

## 2. Core Principles

### Hierarchy & Scanning
A screen scans **number-first**. Calories, macros, and times are first-class - set big, black, often
in the mono face (`07:00 · 320 kcal`), units small and muted beside them. Page titles are **UPPERCASE
Archivo Black** with tight tracking ("VISÃO GERAL DE SAÚDE"); card titles are Title Case; eyebrows are
uppercase with wide tracking ("A SEGUIR", "TOTAL DIÁRIO").

### Spacing & Rhythm
4px base scale (`--space-1`…`--space-12`). The cornerstone is **generous radius**: buttons 12 - 16px
(`--radius-md`/`--radius-lg`), cards 16 - 24px (`--radius-lg`/`--radius-xl`), feature/meal/dialog cards
28 - 40px (`--radius-2xl`…`--radius-4xl`), pills and the FAB fully round (`--radius-pill`). When in doubt,
round more.

### Components
Namespace `FitnessSinceraDesignSystem_06b67f`. Compose bound components - never recreate markup.
Inventory: Avatar, Badge, Button, Card, IconTile, ProgressBar, RingGauge, StatCard, Brand, NavItem.

### Responsiveness
Mobile-first; touch targets ≥ 44px (the FAB and IconTile default to 44px). The dark sidebar collapses to
a mobile header on the client side. Document shell/nav collapse per surface.

### Accessibility
Respect contrast from token CSS - slate-900/700 text on white, white/black on the accent fills. Run the
accessibility audit before final; never claim WCAG certification.

---

## 3. Visual Language

Ground decisions in: `tokens/fonts.css`, `tokens/base.css`, `tokens/colors.css`, `tokens/typography.css`,
`tokens/spacing.css` (re-exported by `styles.css`).

### Color
One action color, two context colors, on a slate text ramp:
- **Lime `--accent` (`--lime-400` #d4f54c)** - primary action, energy, the "flux" brand. CTAs, FAB, active
  nav, progress, highlights. Hover → `--accent-hover` (`--lime-500`). Never a large background; it pops.
- **Purple `--context-treino` (`--purple-500`)** - Treino / personal-trainer context.
- **Green `--context-nutricao` (`--green-400`)** - Nutrição / nutritionist context.
- Text rides slate: `--text-strong` / `--text-body` / `--text-muted` / `--text-faint`. Macro pills use a
  fixed trio: protein = orange, carbs = lime/olive, fat = purple. Never invent hexes when tokens exist.

### Typography
Body & UI is **Inter** (`--font-body`, Resolve Sans substitute). Display headings are **uppercase Archivo
Black** (`--font-display`, weight `--fw-black`) - an athletic grotesque that is the product's display voice.
**Anton** (`--font-poster`) is the explosive poster headline. Times/metrics use **JetBrains Mono**
(`--font-mono`). Scale: `--text-2xs`…`--text-display`. Use the size tokens only.
> Substitute note: *Gogh* and *Resolve Sans* are not bundled - Archivo/Anton and Inter stand in. Swap the
> `@font-face` src in `tokens/` to go pixel-true.

### Elevation & Depth
Soft, low-opacity shadows on white - the signature is `--shadow-card` (`0 8px 30px rgba(0,0,0,.04)`). No
hard or dark drops. Accent emphasis uses **colored glows** (`--glow-lime` / `--glow-purple` / `--glow-green`)
instead of heavier shadow. Cards lift (`translateY(-4px)` + `--shadow-lg`) on hover.

### Corner radii
Per the `--radius-*` scale (sm 8 → 4xl 40, plus `--radius-pill`). Do not invent radii outside the system.

### Motion
Calm and physical. Hover **lifts + grows to `--hover-scale` (1.02)**, press **shrinks to `--press-scale`
(0.98)**. Fills/gauges animate over `--dur-slow` (700ms) with `--ease-out`. The hallmark is the
**Apple-Watch meal scroll** - a scroll-snapping drum roll with a lime position-dot rail. Respect
`prefers-reduced-motion`.

### Iconography
**Lucide** throughout (stroke-based, ~2px, rounded joins) - via the `lucide` UMD in plain HTML or
`lucide-react` in React. Common glyphs: `Zap` (brand mark), `LayoutDashboard/Apple/Dumbbell/MessageSquare/User`
(nav), `Check/RefreshCw/Plus/Camera/Flame/Droplets/Sparkles` (actions). **Do not hand-draw SVG icons or
substitute another set.** No emoji in product UI - status reads through Lucide glyphs (check = on-track,
triangle = at-risk) and the lime accent, never through emoji.

---

## 4. Do / Don't

**Do**
- Compose `FitnessSinceraDesignSystem_06b67f.*` components via `<x-import>`; load the bundle once in `<helmet>`.
- Use `var(--*)` tokens for every visual decision.
- Keep copy in **Brazilian/European Portuguese** - direct, imperative, warm second person ("Olá, Sofia.",
  "Confirmar", "Tome o controlo da sua saúde hoje").
- Colour-code by section: lime = action, purple = Treino, green = Nutrição.
- Run `design-system-guardian` before generating or changing UI.

**Don't**
- Invent colors, type sizes, spacing, or radii outside the token graph.
- Restyle raw HTML to imitate bound components.
- Use gradients/textures as decoration, or hard dark shadows.
- Hand-draw icons or stack conflicting navigation layers on one screen.

---

## 5. Component Philosophy

All components mount from `FitnessSinceraDesignSystem_06b67f` after loading `_ds_bundle.js`.

- **Button** - pill/rounded action. `variant` primary(lime)/green/purple/dark/outline/ghost, `size` sm/md/lg,
  `block`, `uppercase`, `icon`/`iconRight` (Lucide nodes). Shrinks on press.
- **Badge** - fully-rounded status pill. `tone` neutral/lime/green/purple/amber/rose/protein/carbs/fat,
  `solid`, `dot`.
- **Avatar** - initials or `src` image; `tone`, `ring`, `size`.
- **IconTile** - the rounded-square icon container (logo, meal blocks, nav). `tone` lime/green/purple/dark/
  slate/white, `glow`, `size`. Pass a Lucide node as children.
- **Card** - the canonical white surface: `--shadow-card`, `--radius-xl`, hairline border. `pad`, `radius`,
  `interactive` (hover-lift).
- **StatCard** - dashboard metric tile: quiet `label` + chevron, big black `value`, optional `slot`.
- **RingGauge** - circular wellness gauge. `value`, `tone` purple/lime/green, `label`, `valueText`.
- **ProgressBar** - slim rounded track. `value`, `tone` (lime = energy, purple = activity, green = hydration).
- **Brand** - lime Zap tile + wordmark. `variant` wordmark("flux") / full("Fitness Sincera"), `onDark`.
- **NavItem** - dark-shell sidebar row. `active` fills with `context` (lime/purple), idle is muted slate,
  optional `count` badge. Takes a Lucide `icon`.

Specimen cards (Design System tab): App do Aluno, Wordmark & logo, Context accents, Neutrals - Slate,
App do Nutricionista, plus the Type and Spacing cards.

> `x-import` gotcha: `name` is a reserved attribute (it aliases the export), so it is **not** forwarded as a
> prop. Components are mounted as `component-from-global-scope="FitnessSinceraDesignSystem_06b67f.<Name>"`.

---

## 6. Reusable Patterns

Preserve named patterns through to code handoff:
- **Dark shell + bright workspace** - `--bg-app` frame, `--bg-sidebar`, light `--bg-work`, floating white cards.
- **Number-first metric tile** - StatCard / RingGauge with mono numerals and muted units.
- **Apple-Watch meal scroll** - scroll-snap drum roll, focused item full opacity/scale, lime dot rail.
- **Notion-style meal editor** - inline-editable, drag-to-reorder blocks; quiet rows reveal actions on hover.
- **Full-bleed meal card** - food photo under a bottom-up black gradient, title + lime kcal pill over it.

Surfaces from readme: **Aluno**, **Nutricionista**, **Brand**.

---

## 7. Framework Handoff

The live product is React 19 + Wouter + Tailwind 4 + shadcn/ui.

- **Astro** - marketing, editorial, mostly-static content
- **Vite** - interactive app/dashboard prototypes (matches the real build)
- **Next** - SSR / SEO-heavy routes / team conventions

Produce a framework-neutral component inventory first (`skills/framework-handoff.skill.md`); target a
framework only after the canvas direction is approved.
