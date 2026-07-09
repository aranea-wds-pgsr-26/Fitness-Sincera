---
name: fitness-sincera-design
description: Use this skill to generate well-branded interfaces and assets for Fitness Sincera (the "flux" nutrition + training coaching app), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping its dual aluno (client) and nutricionista/personal (professional) interfaces.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create
static HTML files for the user to view. If working on production code, you can copy assets and read the
rules here to become an expert in designing with this brand.

Key things to know:
- This is the **"flux" / Fitness Sincera** system: a dark app shell (`#111`/`#1a1c1e`) holding light work
  surfaces and white, generously-rounded cards. One action color (**lime `#d4f54c`**) + two context
  colors (**purple `#7c69ef`** = treino, **green `#10b981`** = nutrição).
- Body type is **Inter**; headlines are **UPPERCASE Archivo Black**, with **Anton** for poster headlines. Icons are **Lucide**. Copy is **pt-BR**,
  direct and imperative. See `readme.md` → Content Fundamentals & Visual Foundations.
- Tokens live in `styles.css` (→ `tokens/`). Components compile to
  `window.FitnessSinceraDesignSystem_06b67f.*` via `_ds_bundle.js`. Reusable primitives are in
  `components/`; full screen recreations are in `ui_kits/aluno/` and `ui_kits/nutricionista/`.
- The two signature interactions to honor: the **Apple-Watch meal scroll wheel** (aluno) and the
  **Notion-style, agent-editable meal-plan editor** (nutricionista).

If the user invokes this skill without any other guidance, ask them what they want to build or design,
ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code,
depending on the need.
