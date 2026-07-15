# Sprint 1 - Fundacao do backend novo

## Branch

`sprint-1-backend-foundation`

## Tag planejada

`v0.4.0-backend-foundation`

## Objetivo

Transformar `back-end/src` em uma API com base funcional, versionada e testavel sem depender imediatamente do Supabase.

## Entregas

- Middleware `requestId` para rastrear todas as respostas.
- Remocao de exposicao acidental de `DATABASE_URL` em logs.
- Inicializacao tolerante a ambiente sem `DATABASE_URL`, mantendo health checks disponiveis.
- Endpoints publicos de fundacao:
  - `GET /api/health`
  - `GET /api/readiness`
  - `GET /api/v1/health`
  - `GET /api/v1/readiness`
  - `GET /api/v1/system/health`
  - `GET /api/v1/system/readiness`
  - `GET /api/v1/system/meta`
- Router versionado em `back-end/src/routes/v1.ts`.
- Teste HTTP automatizado em `back-end/src/tests/backend-foundation.test.ts`.
- Script `npm.cmd run test:backend`.

## Criterios de aceite

- `npm.cmd run test:backend` deve passar.
- `npm.cmd run check` deve passar.
- Endpoints de fundacao devem responder sem inicializar banco.
- `npm.cmd run dev:back` deve conseguir subir para health checks mesmo sem `DATABASE_URL`.
- Respostas de erro devem incluir `requestId`.

## Validacoes executadas

- `npm.cmd run test:backend`
- `npm.cmd run check`

## Fora do escopo

- Migrar repositories para Drizzle.
- Criar migracoes versionadas.
- Implementar JWT real.
- Conectar frontend ao backend novo.

Esses pontos seguem para as proximas sprints.
