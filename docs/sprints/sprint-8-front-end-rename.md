# Sprint 8 - Padronizacao da pasta front-end

## Branch

`sprint-8-front-end-rename`

## Tag planejada

`v0.11.0-front-end-rename`

## Objetivo

Padronizar a estrutura do projeto para usar `front-end/`, alinhada com `back-end/`, removendo a pasta antiga `fronte-end/` e atualizando as configuracoes que apontavam para `client/`.

## Entregas

- Frontend ativo movido de `client/` para `front-end/`.
- Pasta antiga `fronte-end/` removida.
- `vite.config.ts` atualizado para usar `front-end/`.
- `tsconfig.json` atualizado para incluir `front-end/src`.
- `server/vite.ts` atualizado para carregar `front-end/index.html` no servidor legado.
- `components.json` atualizado para `front-end/src/index.css`.
- Script `dev:front-end` adicionado.
- Alias legado `dev:client` mantido para compatibilidade.
- Documentacao atualizada para refletir a nova estrutura.

## Validacoes executadas

- `npm.cmd run check`
- `npm.cmd run build`

Observacao: `build` precisou rodar fora do sandbox para validar cliente e servidor completos.

## Proximas sprints sugeridas

- Chat Foundation: historico real, contexto por papel e respostas internas sem API externa.
- Foods Foundation: tabela `foods`, seed versionado e documentacao de origem dos dados.
- UI Theme: light/dark mode com persistencia de preferencia.
- Login Real: tela de login final mantendo atalhos de teste em modo desenvolvimento.
- Admin Foundation: dashboard, estatisticas e cadastro de profissionais.
