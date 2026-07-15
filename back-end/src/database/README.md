# Database Layer

Esta pasta concentra a infraestrutura de acesso ao banco do backend novo.

## Arquivos

- `schema.ts`: schema Drizzle das tabelas reais `fitness_*`.
- `client.ts`: cliente Drizzle tipado usando o pool PostgreSQL existente.

## Direcao

Durante a Sprint 2, o Drizzle passou a ter schema e migracao versionada, mas os repositories ainda usam o `store.ts` com SQL manual.

A migracao dos repositories para Drizzle deve acontecer de forma incremental nas proximas sprints, modulo por modulo.

## Comandos uteis

```powershell
npm.cmd run db:generate
npm.cmd run db:migrate
npm.cmd run db:studio
```

## Testes manuais relacionados

```powershell
npm.cmd run manual:backend:health
npm.cmd run manual:backend:meals
```
