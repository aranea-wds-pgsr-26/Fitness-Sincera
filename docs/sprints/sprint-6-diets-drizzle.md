# Sprint 6 - Diets com Drizzle

## Branch

`sprint-6-diets-drizzle`

## Tag planejada

`v0.9.0-diets-drizzle`

## Objetivo

Migrar o modulo de dietas do backend novo para Drizzle, mantendo o contrato atual de rotas e criando um script manual de validacao para testes sem Postman.

## Entregas

- `DietRepository` migrado de `store.ts` para Drizzle.
- CRUD de diets usando a tabela `fitness_diet_plans`.
- Rotas de diets mantidas:
  - `GET /api/diets`
  - `POST /api/diets`
  - `PUT /api/diets/:id`
  - `DELETE /api/diets/:id`
- Novo script manual validando o ciclo completo:
  - `npm.cmd run manual:backend:diets`
- Alias de teste adicionado:
  - `npm.cmd run test:backend:diets`

## Criterios de aceite

- `npm.cmd run check` deve passar.
- `npm.cmd run manual:backend:diets` deve passar no Supabase.
- `npm.cmd run manual:backend:health` deve passar.
- `npm.cmd run build` deve passar.

## Validacoes executadas

- `npm.cmd run check`
- `npm.cmd run manual:backend:diets`
- `npm.cmd run manual:backend:health`
- `npm.cmd run build`

Observacao: `manual:backend:diets` e `build` precisaram rodar fora do sandbox para acessar recursos bloqueados pelo ambiente local de execucao.

## Fora do escopo

- Migrar workouts/chat/wearables para Drizzle.
- Criar endpoints adicionais para dashboard nutricional.
- Alterar o contrato das respostas atuais.

Esses pontos ficam para as proximas sprints.
