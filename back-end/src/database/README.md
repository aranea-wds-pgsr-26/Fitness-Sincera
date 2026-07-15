# Database Layer

Esta pasta concentra a infraestrutura de acesso ao banco do backend novo.

## Arquivos

- `schema.ts`: schema Drizzle das tabelas reais `fitness_*`.
- `client.ts`: cliente Drizzle tipado usando o pool PostgreSQL existente.

## Direcao

Durante a Sprint 2, o Drizzle passou a ter schema e migracao versionada.

A migracao dos repositories para Drizzle acontece de forma incremental, modulo por modulo.

## Modulos ja migrados

- Auth/users/sessions.
- Meals.
- Diets.

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
npm.cmd run manual:backend:diets
```
