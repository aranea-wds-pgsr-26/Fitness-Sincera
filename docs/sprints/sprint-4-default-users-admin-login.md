# Sprint 4 - Usuarios padrao e login Admin

## Branch

`sprint-4-default-users-admin-login`

## Tag planejada

`v0.7.0-default-users-admin-login`

## Objetivo

Facilitar os testes manuais dos modulos criando usuarios padrao no banco e adicionando o perfil Admin na tela de login demo.

## Entregas

- Usuario Admin adicionado ao login demo.
- Admin pode acessar as rotas protegidas existentes durante a fase de migracao.
- Seed idempotente com quatro usuarios padrao:
  - admin
  - client
  - nutritionist
  - trainer
- Script manual:
  - `npm.cmd run manual:backend:default-users`
- Alias de banco:
  - `npm.cmd run db:seed:users`

## Usuarios padrao

| Papel | Email | Senha |
|---|---|---|
| admin | `admin@fitnesssincera.com` | `admin123` |
| client | `bennet02@gmail.com` | `client123` |
| nutritionist | `sofia.almeida@fitnesssincera.com` | `nutritionist123` |
| trainer | `ricardo@fitnesssincera.com` | `trainer123` |

## Criterios de aceite

- `npm.cmd run manual:backend:default-users` deve criar/atualizar os quatro usuarios.
- `npm.cmd run manual:backend:auth` deve continuar passando.
- `npm.cmd run check` deve passar.
- `npm.cmd run build` deve passar.
- Login demo deve exibir o card Admin.

## Validacoes executadas

- `npm.cmd run check`
- `npm.cmd run manual:backend:default-users`
- `npm.cmd run manual:backend:auth`
- `npm.cmd run manual:backend:health`
- `npm.cmd run build`

Observacao: scripts que acessam Supabase rodaram fora do sandbox.

## Fora do escopo

- Criar dashboard administrativo dedicado.
- Implementar hash de senha.
- Implementar permissoes finas por recurso.

Esses pontos ficam para as proximas sprints de auth forte e administracao.
