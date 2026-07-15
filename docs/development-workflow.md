# Workflow de desenvolvimento

## Regra de sprints

Cada sprint deve ter:

- Uma branch propria.
- Documentacao em `docs/sprints/`.
- Atualizacao de changelog quando aplicavel.
- Testes executados antes do fechamento.
- Uma tag local ao final.

## Padrao de branch

```text
sprint-N-descricao-curta
```

Exemplos:

```text
sprint-1-backend-foundation
sprint-2-drizzle-database
sprint-3-auth
```

## Padrao de tags

```text
vX.Y.Z-descricao-curta
```

Exemplos:

```text
v0.3.0-reorganizacao
v0.4.0-backend-foundation
v0.5.0-drizzle-database
```

## Validacoes minimas

```powershell
npm.cmd run check
npm.cmd run test:backend
npm.cmd run manual:backend:health
```

Quando houver alteracao no frontend ou no servidor legado de producao:

```powershell
npm.cmd run build
```

Quando a sprint tocar banco ou repositories:

```powershell
npm.cmd run db:generate
npm.cmd run db:seed:users
npm.cmd run manual:backend:auth
npm.cmd run manual:backend:meals
```
