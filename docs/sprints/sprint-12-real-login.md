# Sprint 12 - Login Real

## Branch

`sprint-12-real-login`

## Tag planejada

`v0.15.0-real-login`

## Objetivo

Substituir a tela de login baseada apenas em selecao de perfil por um fluxo real de email e senha, mantendo atalhos de teste para acelerar a validacao dos quatro perfis padrao.

## Entregas

- Tela de login redesenhada com formulario de email e senha.
- Login real usando `POST /api/auth/login`.
- Sessao do front-end passa a guardar:
  - dados do usuario;
  - token bearer retornado pelo backend.
- `apiRequest` e queries passam a enviar `Authorization: Bearer <token>` quando houver token salvo.
- Atalhos rapidos mantidos para:
  - admin;
  - cliente;
  - nutricionista;
  - personal trainer.
- Ponte temporaria no servidor legado para:
  - `POST /api/auth/login`;
  - `GET /api/auth/me`.

## Criterios de aceite

- `npm.cmd run check` deve passar.
- `npm.cmd run manual:backend:default-users` deve passar.
- `npm.cmd run manual:backend:auth` deve passar.
- `npm.cmd run build` deve passar.

## Validacoes executadas

- `npm.cmd run check`
- `npm.cmd run manual:backend:default-users`
- `npm.cmd run manual:backend:auth`
- `npm.cmd run build`

## Observacoes

- Os atalhos rapidos usam as credenciais padrao sempre que o backend estiver disponivel.
- Se o backend real estiver indisponivel, os atalhos ainda conseguem cair no modo demo para nao bloquear testes visuais.
- A ponte no servidor legado deve ser removida quando o deploy separar corretamente front-end e backend novo.
