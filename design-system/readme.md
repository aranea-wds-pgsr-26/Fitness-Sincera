# Fitness Sincera - Design System

**"flux"** is the product wordmark; **Fitness Sincera** is the company. It is a dual-interface SaaS for
nutrition + training coaching, where a **professional** (nutricionista / personal trainer) plans the
client's day and the **aluno** (client) simply *executes* it. A self-developing agent reads the
student's situation and adapts the information - keeping it didactic and clear.

The product philosophy is **"Routine First, not Data First"**: traditional apps hand you a blank screen
and decision fatigue; Fitness Sincera shows you *"Coma 3 Ovos"* and a check button. A high-ticket
audience pays for **decisions already made**.

This design system is reverse-engineered from the live React/Vite/Tailwind build and its design docs.

---

## Sources (for whoever maintains this)

- **GitHub - `wesleyds71/Fitness-Sincera`** (private) - the React 19 + Wouter + Tailwind 4 + shadcn/ui app.
  Key reads: `client/src/features/client/*` (aluno screens), `client/src/features/nutritionist/*`
  (pro screens, incl. the Notion-style `meal-plans/MealPlanEditor.tsx`), `client/src/layout/*`
  (the dark "flux" shell + sidebar), `client/src/index.css` (token source), `client/src/lib/mockData.ts`.
- **In-repo design docs** under `attached_assets/`: `DESIGN_SYSTEM_SPECIFICATION.md`,
  `COLOR_REFERENCE_GUIDE.md`, `VISUAL_SPECIFICATIONS.md`, and the master `PRD`.
- Two visual generations exist in the repo. The **original spec** was a dark-mode neon dashboard
  (`#DFFF00` neon, Bebas Neue). The **shipped build evolved** into the lighter **"flux" aesthetic** - white rounded cards on a dark `#111` shell, a softer lime `#d4f54c`, purple `#7c69ef`, emerald green.
  **This system documents the shipped "flux" look** (the source of truth), and keeps the neon lineage in
  the tokens for reference.

> You can explore the `wesleyds71/Fitness-Sincera` repository further to design more faithfully against
> the real product - the `features/` and `layout/` folders are the highest-signal references.

---

## Content fundamentals - how Fitness Sincera writes

- **Language: Brazilian/European Portuguese.** UI copy is pt-BR/pt-PT (e.g. "Refeição", "Treino",
  "Substituir", "Gerir Planos"). Keep new copy in Portuguese.
- **Voice: direct, imperative, encouraging.** The app tells you what to do: *"Check Refeição"*,
  *"Confirmar"*, *"Tome o controlo da sua saúde hoje."* Short verb-first calls to action.
- **Address: warm second person.** Greets by name - *"Olá, Sofia."*, *"Bem-vindo"*. The pro side
  is collegial ("os seus clientes"), the client side is motivational.
- **Casing:** Page titles are **UPPERCASE** ("VISÃO GERAL DE SAÚDE", "NUTRIÇÃO"). Card titles are
  Title Case. Eyebrows/labels are uppercase with wide tracking ("A SEGUIR", "TOTAL DIÁRIO").
- **Numbers carry weight.** Calories, macros and times are first-class - set big and black, often
  in a mono face (`07:00 · 320 kcal`). Units are small and muted next to them.
- **No emoji in product UI.** Warmth comes from the copy, the lime accent and generous radii; status
  comes from **Lucide** icons (a check for on-track, a triangle for at-risk), never from emoji. Keep
  emoji out of greetings, alerts and labels.
- **Tone words:** "sincera" (honest), "rotina" (routine), "consistência", "didático". Avoid hype and
  jargon; the promise is *clarity*.

---

## Visual foundations

**Overall feel.** Premium, calm, confident. A **dark app shell** (`#111111` frame, `#1a1c1e` sidebar)
cradles **light work surfaces** (`#e9e9e9` for the client, `#f8fafc` for the pro) on which **white
cards float**. The contrast of dark chrome → bright workspace is the signature container move.

**Color.** One action color and two context colors:
- **Lime `#d4f54c`** = primary action, energy, the "flux" brand. CTAs, FAB, active nav, progress,
  highlights. Hover/pressed → `#c4e500`. Never a large background; it's an accent that pops.
- **Purple `#7c69ef`** = *Treino / personal* context (training, exercise, the trainer).
- **Green `#10b981`** (emerald) = *Nutrição* context (diet, meals, the nutritionist).
- Text rides the **slate** ramp (900 → 400). Macro pills use a fixed trio: protein=orange,
  carbs=lime/olive, fat=purple.

**Type.** Body & UI is **Inter** (substitute for the brand's *Resolve Sans*). Headlines are
**uppercase Archivo Black** with tight tracking - an athletic grotesque that carries the gym/nutrition
energy; that's the product's display voice. **Anton** is the explosive poster headline ("LEG DAY EXPLOSIVO").
Times and metrics use a **mono** face. Note: *Gogh* and *Resolve Sans* are not bundled - Archivo/Anton and
Inter stand in. Drop the real binaries into `tokens/` and swap `@font-face` to go pixel-true.

**Radius - the cornerstone.** Everything is generously rounded: buttons 12 - 16px, cards 16 - 24px,
feature/meal/dialog cards 28 - 40px, pills and the FAB fully round. When in doubt, round more.

**Shadows.** Soft and low-opacity on white - the signature is `0 8px 30px rgba(0,0,0,.04)`. No hard
or dark drop shadows. Accent emphasis uses **colored glows** (lime/purple/green) instead of heavier
shadow. Cards lift (`translateY(-4px)` + a slightly stronger shadow) on hover.

**Backgrounds & imagery.** Meal cards are **full-bleed food photography** under a bottom-up black
gradient, with the title + a lime kcal pill over it. Photography is warm and appetising (Unsplash food
shots in the prototypes - swap for the brand's own). No gradients-as-decoration, no textures.

**Motion.** Calm and physical. Hover **lifts + grows to 1.02**, press **shrinks to 0.98**. Fills and
gauges animate over ~0.7s with an ease-out curve. The hallmark interaction is the **Apple-Watch-style
meal scroll** - a scroll-snapping "drum roll" where the focused meal is full opacity/scale and
neighbours fade and shrink, with a lime position-dot rail.

**Hover / press states.** Idle nav is muted slate → lightens to white on hover → fills with the
context color when active. Buttons darken their fill slightly and shrink on press. Quiet controls
(Notion rows) reveal their actions (macros, delete) only on hover.

**Borders.** Hairline `--border-card` (slate-100) on white cards; `2px dashed` slate-200 for "add"
affordances. Dark shell dividers are `rgba(255,255,255,.06)`.

---

## Iconography

- **Lucide** is the icon system throughout (the app uses `lucide-react`). Stroke-based, ~2px weight,
  rounded joins. Use Lucide everywhere - via `lucide-react` (UMD global `LucideReact`) in React, or the
  `lucide` UMD in plain HTML. **Do not hand-draw SVG icons or substitute another set.**
- Common glyphs: `Zap` (brand mark, fill black on lime), `LayoutDashboard, Apple, Dumbbell,
  MessageSquare, User` (nav), `Check, RefreshCw, Plus, Camera, Flame, Droplets, Sparkles` (actions/
  metrics), `GripVertical, Trash2, ChevronUp/Down` (the Notion editor).
- The **brand mark** is a lime rounded-square tile holding a black `Zap` glyph + the lowercase
  wordmark "flux" - see `components/nav/Brand.jsx`.
- **Status uses Lucide**, never emoji: a check glyph for on-track, a warning triangle for at-risk.
  No emoji anywhere in product UI.
- `assets/favicon.png` and `assets/opengraph.jpg` are the real product marks pulled from the repo.

---

## Index / manifest

**Foundations** - `styles.css` (the entry consumers link) → `tokens/`:
`fonts.css`, `colors.css`, `typography.css`, `spacing.css` (radius/shadow/motion), `base.css`.

**Components** (`window.FitnessSinceraDesignSystem_06b67f.*`):
- `components/core/` - **Button, Badge, Avatar, IconTile, Card**
- `components/data/` - **ProgressBar, RingGauge, StatCard**
- `components/nav/` - **Brand, NavItem**

**UI kits** (full, interactive product recreations):
- `ui_kits/aluno/` - the **client app**: routine-first dashboard + the **Apple-Watch meal scroll wheel**
  with per-meal **AI suggestions**, FAB camera, dark flux shell. Open `index.html`.
- `ui_kits/nutricionista/` - the **pro panel**: client dashboard (stats, alerts, compliance, client
  table) + the **Notion-style meal-plan editor** (inline-editable, drag-to-reorder blocks) that an
  **agent can edit on the student's behalf**. Open `index.html`.

**Design System tab** renders every `@dsCard` (Colors, Type, Spacing, Brand, Components, Aluno,
Nutricionista). **SKILL.md** makes this folder usable as a downloadable Agent Skill.
