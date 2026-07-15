# Sprint 2 - Banco de dados e Drizzle

## Branch

`sprint-2-drizzle-database`

## Tag planejada

`v0.5.0-drizzle-database`

## Objetivo

Criar uma base versionada de banco para o backend novo usando Drizzle, sem quebrar o fluxo atual que ainda usa `store.ts`.

## Entregas

- Schema Drizzle real em `back-end/src/database/schema.ts`.
- Cliente Drizzle em `back-end/src/database/client.ts`.
- `drizzle.config.ts` apontando para o schema do backend novo.
- `.env.example` com `DATABASE_URL`.
- `drizzle/` removido do ignore para versionar migrations.
- Migracao inicial versionada:
  - `drizzle/migrations/0000_mean_firestar.sql`
- Script manual de health:
  - `npm.cmd run manual:backend:health`
- Script manual de meals:
  - `npm.cmd run manual:backend:meals`
- Scripts de teste dedicados:
  - `npm.cmd run test:backend:foundation`
  - `npm.cmd run test:backend:meals`

## Criterios de aceite

- `npm.cmd run db:generate` gera/valida migrations.
- `npm.cmd run manual:backend:health` passa sem banco.
- `npm.cmd run manual:backend:meals` passa com Supabase acessivel.
- `npm.cmd run check` passa.
- Migrations ficam versionadas no Git.

## Validacoes executadas

- `npm.cmd run db:generate`
- `npm.cmd run manual:backend:health`
- `npm.cmd run test:backend:foundation`
- `npm.cmd run check`
- `npm.cmd run manual:backend:meals`

Observacao: `manual:backend:meals` precisou rodar fora do sandbox para acessar o Supabase.

## Fora do escopo

- Trocar todos os repositories para Drizzle.
- Remover `store.ts`.
- Remover o servidor legado `server/`.

Esses pontos ficam para as proximas sprints.
