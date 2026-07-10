# UI Kit - Nutricionista

The **professional panel**. Dark **flux** sidebar (emerald-accented) wrapping a light `#f8fafc`
workspace. Open `index.html` - click **Gerir Planos** (or a client row) to jump from the dashboard into
the editor, and back via "Voltar aos clientes".

## Screens
- **Dashboard** (`screen-dashboard.jsx`) - "Visão Geral": KPI stat tiles (total / active / at-risk clients),
  a **Nutritional Alerts** widget, a **compliance** bar chart, and a searchable **client table** with
  adesão bars and status badges.
- **Plano Editor** (`plano-editor.jsx`) - the headline **Notion-style meal-plan editor**: inline-editable
  plan title, daily macro totals, and **draggable meal blocks** whose items are click-to-edit (name, qty,
  macros reveal on hover; add/delete rows; dashed "Adicionar" affordances). Crucially, it shows the
  **agent editing on the student's behalf**: a "Pedido do aluno" banner whose **"Aplicar com IA"** button
  applies the requested swap into the plan with a highlight - the same blocks the nutritionist edits, the
  agent can edit from a student request.

## Composition
`nutri-shell.jsx` provides the chrome. Screens pull primitives (`Brand, NavItem, Avatar, Button, Badge,
StatCard, IconTile`) from the bundle. Mock data + the pending student request are in `data.js`.
