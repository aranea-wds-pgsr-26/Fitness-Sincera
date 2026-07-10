# UI Kit - Aluno (Cliente)

The **client app**: a "Routine First" experience where the student executes a day already planned by
their professional. Dark **flux** shell (sidebar + lime upgrade card) wrapping a light `#e9e9e9` panel.

Open `index.html` - it's interactive: switch between **Dashboard** and **Nutrição** in the sidebar, and
tap the lime **camera FAB** to simulate the AI meal-identification flow.

## Screens
- **Dashboard** (`screen-dashboard.jsx`) - `Visão Geral de Saúde`: the **Next Activity** card (full-bleed meal
  photo + items + lime check), a **Goal** ring with macro bars, and mini metric cards.
- **Nutrição** (`screen-nutricao.jsx`) - the headline **Apple-Watch meal scroll wheel**: scroll-snapping
  "drum-roll" of the day's meals (focused meal full, neighbours faded/shrunk, lime dot rail). Each meal
  expands to editable items and a **"Sugerir com IA"** button that surfaces diet-matched swaps.

## Composition
`app-shell.jsx` provides the sidebar + work-area chrome and the work header. Screens pull primitives
(`Brand, NavItem, Avatar, Button, Badge, RingGauge, ProgressBar, Card`) from the design-system bundle.
Mock data is in `data.js` (mirrors the app's `mockData.ts`).
