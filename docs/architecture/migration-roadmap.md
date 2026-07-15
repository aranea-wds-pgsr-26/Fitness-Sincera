# Roadmap da migracao arquitetural

## Direcao

O projeto esta em migracao de um monolito React + Express em `server/` para uma arquitetura com front-end em `front-end/` e backend novo em `back-end/src`.

Durante a transicao:

- `server/` continua servindo a experiencia atual e endpoints mockados.
- `back-end/src` evolui como API real, modular, testavel e integrada ao PostgreSQL/Supabase.
- Drizzle substituira gradualmente o SQL manual em `back-end/src/lib/store.ts`.

## Regras por sprint

- Criar uma branch por sprint.
- Documentar alteracoes em `docs/sprints/` e `docs/changelog/`.
- Rodar validacoes antes de fechar.
- Criar tag local ao final de cada sprint.
- Evitar grandes refatores sem criterio de aceite testavel.

## Sequencia atualizada

1. Sprint 0.3 - Reorganizacao da casa.
2. Sprint 1 - Fundacao do backend novo.
3. Sprint 2 - Banco de dados e Drizzle.
4. Sprint 3 - Auth e usuarios com Drizzle.
5. Sprint 4 - Usuarios padrao e login Admin.
6. Sprint 5 - Meals com Drizzle.
7. Sprint 6 - Diets com Drizzle.
8. Sprint 7 - Workouts com Drizzle.
9. Sprint 8 - Padronizacao da pasta `front-end/`.
10. Sprint 9 - Chat Foundation sem API externa.
11. Sprint 10 - Foods Foundation e seed de alimentos.
12. Sprint 11 - Tema light/dark.
13. Sprint 12 - Login real e cadastro inicial.
14. Sprint 13 - Admin Foundation.
15. Sprint 14 - Site publico, captacao, leads, planos e anamnese.
