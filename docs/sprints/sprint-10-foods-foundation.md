# Sprint 10 - Foods Foundation

## Branch

`sprint-10-foods-foundation`

## Tag planejada

`v0.13.0-foods-foundation`

## Objetivo

Criar a fundacao do banco de alimentos para apoiar a criacao de dietas, com tabela propria, seed inicial, API de busca e caminho preparado para importacao futura a partir de fontes externas.

## Entregas

- Tabela Drizzle `fitness_foods`.
- Migration versionada:
  - `drizzle/migrations/0001_sleepy_bill_hollister.sql`
- `FoodRepository` com:
  - listagem;
  - busca;
  - criacao;
  - upsert por nome.
- Seed inicial com 10 alimentos comuns:
  - arroz;
  - feijao;
  - frango;
  - ovo;
  - batata doce;
  - aveia;
  - banana;
  - brocolis;
  - azeite;
  - iogurte natural.
- API autenticada:
  - `GET /api/foods`
  - `GET /api/v1/foods`
- Script manual:
  - `npm.cmd run manual:backend:foods`
- Alias:
  - `npm.cmd run test:backend:foods`
  - `npm.cmd run db:seed:foods`

## Criterios de aceite

- `npm.cmd run check` deve passar.
- `npm.cmd run manual:backend:foods` deve passar no Supabase.
- `npm.cmd run manual:backend:health` deve passar.
- `npm.cmd run build` deve passar.

## Validacoes executadas

- `npm.cmd run db:generate`
- `npm.cmd run manual:backend:foods`
- `npm.cmd run check`

Observacao: `drizzle-kit migrate` falhou nesta execucao sem mensagem util e `drizzle-kit push` exigiu prompt interativo. Para validar o ambiente, o SQL versionado da migration foi aplicado diretamente no Supabase e o seed/API foram executados com sucesso.

## Bug conhecido

- `npm.cmd run db:migrate` nao concluiu a aplicacao da migration `0001_sleepy_bill_hollister` nesta maquina. A tabela foi criada aplicando o SQL versionado diretamente, mas o fluxo do Drizzle migrate precisa ser revisado antes das proximas migrations.

## Fontes externas futuras

A tabela ja possui `source` e `externalId` para permitir importacao futura de uma base externa de alimentos. A recomendacao e usar API externa apenas para gerar/importar seeds controlados, mantendo o app dependente do nosso banco em tempo de uso.

## Fora do escopo

- Integrar uma API externa de alimentos nesta sprint.
- Criar tela de gerenciamento de alimentos.
- Conectar o editor de dietas ao catalogo de alimentos.
