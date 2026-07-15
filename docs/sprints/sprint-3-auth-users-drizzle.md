# Sprint 3 - Auth e usuarios com Drizzle

## Branch

`sprint-3-auth-users-drizzle`

## Tag planejada

`v0.6.0-auth-users-drizzle`

## Objetivo

Migrar a camada de usuarios e sessoes do backend novo para Drizzle, mantendo os endpoints atuais de autenticacao funcionando.

## Entregas

- Tipo de usuario autenticado em `back-end/src/modules/auth/types.ts`.
- `UserRepository` migrado para Drizzle.
- `SessionRepository` usando `UserRepository`.
- Middleware `requireAuth` usando repository Drizzle em vez de `store.ts`.
- Script manual de auth:
  - `npm.cmd run manual:backend:auth`
- Script de teste dedicado:
  - `npm.cmd run test:backend:auth`
- Limpeza automatica do usuario de teste criado pelo script manual.

## Endpoints validados

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

## Criterios de aceite

- `npm.cmd run manual:backend:auth` deve registrar, logar, consultar `/me` e limpar o usuario de teste.
- `npm.cmd run check` deve passar.
- `npm.cmd run build` deve passar.
- Health checks da fundacao devem continuar passando.

## Validacoes executadas

- `npm.cmd run manual:backend:health`
- `npm.cmd run check`
- `npm.cmd run manual:backend:auth`

Observacao: `manual:backend:auth` precisou rodar fora do sandbox para acessar o Supabase.

## Fora do escopo

- Hash de senha.
- JWT real.
- Refresh token.
- Cookies seguros.
- Politicas completas de roles/permissoes.

Esses pontos ficam para a proxima sprint de seguranca/autenticacao avancada.
