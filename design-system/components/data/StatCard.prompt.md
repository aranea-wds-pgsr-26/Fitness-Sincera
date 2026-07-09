Dashboard metric tile: quiet label + chevron, a big black number, and an optional bottom-right slot (avatar stack, badge, sparkline). Lifts on hover.

```jsx
<StatCard label="Total de Clientes" value="24" slot={<AvatarStack />} />
<StatCard label="Clientes em risco" value="3" slot={<Badge tone="amber">+2</Badge>} />
```
