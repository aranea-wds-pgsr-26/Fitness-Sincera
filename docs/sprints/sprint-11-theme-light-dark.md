# Sprint 11 - Theme Light/Dark

## Branch

`sprint-11-theme-light-dark`

## Tag planejada

`v0.14.0-theme-light-dark`

## Objetivo

Adicionar a base de tema claro/escuro com persistencia da preferencia do usuario.

## Entregas

- `ThemeProvider` usando `next-themes`.
- Tema escuro mantido como padrao inicial.
- Preferencia persistida em `localStorage` pela chave `fitness-sincera-theme`.
- `ThemeToggle` reutilizavel com icones de sol/lua.
- Alternador de tema adicionado em:
  - tela de login;
  - header mobile do cliente;
  - header padrao do cliente;
  - sidebar profissional.
- Tokens CSS base ajustados para diferenciar `:root` claro e `.dark`.

## Criterios de aceite

- `npm.cmd run check` deve passar.
- `npm.cmd run build` deve passar.
- Alternador deve trocar a classe `dark` no documento.
- Preferencia deve permanecer ao recarregar.

## Validacoes executadas

- `npm.cmd run check`

## Fora do escopo

- Refinar todas as telas manualmente para tema claro perfeito.
- Redesenhar componentes com cores fixas antigas.
- Criar configuracao de tema no perfil do usuario.

Esses ajustes visuais devem continuar em sprints menores por area.
