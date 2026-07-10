A sidebar nav row for the dark app shell. Active rows get a filled tile (lime, or purple for the Treino context); idle rows are muted slate and lighten on hover.

```jsx
<NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active count={3} />
<NavItem icon={<Dumbbell size={20} />} label="Treino" context="purple" />
```

`context="purple"` colours the active/hover state for personal-trainer sections.
