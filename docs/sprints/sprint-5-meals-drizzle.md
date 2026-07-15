# Sprint 5 - Meals com Drizzle

## Branch

`sprint-5-meals-drizzle`

## Tag planejada

`v0.8.0-meals-drizzle`

## Objetivo

Migrar o modulo de refeicoes do backend novo para Drizzle, mantendo o contrato atual de rotas e o script manual de validacao.

## Entregas

- `MealRepository` migrado de `store.ts` para Drizzle.
- CRUD de meals usando a tabela `fitness_meals`.
- Rotas de meals mantidas:
  - `GET /api/meals`
  - `POST /api/meals`
  - `PUT /api/meals/:id`
  - `DELETE /api/meals/:id`
- Formatação das rotas de meals normalizada.
- Script manual existente continua validando o ciclo completo:
  - `npm.cmd run manual:backend:meals`

## Criterios de aceite

- `npm.cmd run check` deve passar.
- `npm.cmd run manual:backend:meals` deve passar no Supabase.
- `npm.cmd run manual:backend:health` deve passar.
- `npm.cmd run build` deve passar.

## Validacoes executadas

- `npm.cmd run check`
- `npm.cmd run manual:backend:meals`
- `npm.cmd run manual:backend:health`
- `npm.cmd run build`

Observacao: `manual:backend:meals` precisou rodar fora do sandbox para acessar o Supabase.

## Fora do escopo

- Migrar diets/workouts/chat/wearables para Drizzle.
- Criar endpoints adicionais para dashboard nutricional.
- Mudar contrato das respostas atuais.

Esses pontos ficam para as proximas sprints.
