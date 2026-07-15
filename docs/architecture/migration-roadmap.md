# Roadmap da migracao arquitetural

## Direcao

O projeto esta em migracao de um monolito React + Express em `server/` para uma arquitetura com frontend em `client/` e backend novo em `back-end/src`.

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

## Sequencia sugerida

1. Sprint 0.3 - Reorganizacao da casa.
2. Sprint 1 - Fundacao do backend novo.
3. Sprint 2 - Banco de dados e Drizzle.
4. Sprint 3 - Autenticacao.
5. Sprint 4 - Usuarios.
6. Sprint 5 - Trainer.
7. Sprint 6 - Nutritionist.
8. Sprint 7 - API publica, versionamento e OpenAPI.
9. Sprint 8 - Frontend conectado ao backend novo.
10. Sprint 9 - Testes ampliados.
11. Sprint 10 - Qualidade, CI/CD e observabilidade.
12. Sprint 11 - Remocao do legado.
13. Sprint 12 - Release 1.0.
