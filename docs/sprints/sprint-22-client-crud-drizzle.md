# Sprint 22 - CRUD Base com Drizzle

## Entrega

Rotas publicadas e persistidas para os CRUDs base da operacao profissional:

- alimentos: listar, criar, editar e excluir;
- refeicoes: listar, criar, editar e excluir;
- dietas: listar, criar, editar e excluir;
- treinos: listar, criar, editar e excluir.

## Regras

- Alimentos podem ser consultados por usuarios autenticados e alterados apenas por admin ou nutricionista.
- Dietas sao restritas a admin ou nutricionista.
- Treinos sao restritos a admin ou personal trainer.
- Refeicoes continuam vinculadas ao usuario autenticado.
- As rotas respondem no formato `{ success, data }`.

## Front-end

- A pagina de templates do personal usa `/api/workouts`.
- Biblioteca de alimentos e refeicoes utiliza o CRUD persistido em Supabase.

## Validacao

`manual:backend:functional-crud` cria, atualiza e remove dieta, treino, alimento e refeicao contra o Supabase.

## Proxima sprint

Migrar clientes e planos alimentares completos, removendo `MOCK_CLIENTS` e `MOCK_PLAN` da tela de nutricionista.