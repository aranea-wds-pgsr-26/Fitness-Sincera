# Sprint 7 - Workouts com Drizzle

## Branch

`sprint-7-workouts-drizzle`

## Tag planejada

`v0.10.0-workouts-drizzle`

## Objetivo

Migrar o modulo de treinos do backend novo para Drizzle, mantendo o contrato atual de rotas e criando um script manual de validacao para testes sem Postman.

## Entregas

- `WorkoutRepository` migrado de `store.ts` para Drizzle.
- CRUD de workouts usando a tabela `fitness_workout_plans`.
- Rotas de workouts mantidas:
  - `GET /api/workouts`
  - `POST /api/workouts`
  - `PUT /api/workouts/:id`
  - `DELETE /api/workouts/:id`
- Novo script manual validando o ciclo completo:
  - `npm.cmd run manual:backend:workouts`
- Alias de teste adicionado:
  - `npm.cmd run test:backend:workouts`

## Criterios de aceite

- `npm.cmd run check` deve passar.
- `npm.cmd run manual:backend:workouts` deve passar no Supabase.
- `npm.cmd run manual:backend:health` deve passar.
- `npm.cmd run build` deve passar.

## Validacoes executadas

- `npm.cmd run check`
- `npm.cmd run manual:backend:workouts`
- `npm.cmd run manual:backend:health`
- `npm.cmd run build`

Observacao: `manual:backend:workouts` e `build` precisaram rodar fora do sandbox para acessar recursos bloqueados pelo ambiente local de execucao.

## Fora do escopo

- Migrar chat/wearables para Drizzle.
- Criar endpoints adicionais para dashboards profissionais.
- Alterar o contrato das respostas atuais.

Esses pontos ficam para as proximas sprints.
