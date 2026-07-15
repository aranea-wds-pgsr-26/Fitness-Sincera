# Sprint 0.3 - Reorganizacao da casa

## Branch

`reorganizando-a-casa`

## Tag planejada

`v0.3.0-reorganizacao`

## Escopo

Esta sprint estabiliza a aplicacao existente antes da migracao arquitetural completa.

## Decisoes

- Manter `server/` como legado funcional durante a transicao.
- Usar `back-end/src` como backend novo.
- Evitar remover codigo legado antes de o frontend estar conectado ao backend novo.
- Trabalhar em sprints curtas, sempre com branch, testes, documentacao e tag.

## Criterios de aceite

- TypeScript sem erros.
- Build de producao concluido.
- Frontend principal apontando para `client/`.
- Telas principais testadas manualmente.
- Sem tela branca nas rotas de Cliente, Nutricionista e Personal Trainer.

## Validacoes executadas

- `npm.cmd run check`
- `npm.cmd run build`
- Teste manual em `http://localhost:3001`

## Proxima sprint

Sprint 1 - Fundacao do backend novo.
