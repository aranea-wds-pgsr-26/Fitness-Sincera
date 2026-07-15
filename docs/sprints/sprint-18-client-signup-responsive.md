# Sprint 18 - Cadastro de Cliente e Anamnese

## Objetivo

Tornar o cadastro inicial do cliente funcional em producao, com ficha de anamnese salva no Supabase e acesso imediato ao painel do cliente.

## Alteracoes

- Criada rota publica `/cadastro`.
- Landing page passa a enviar "Se inscreva" para o cadastro real.
- Login ganhou atalho para criar conta de cliente.
- Criadas tabelas Drizzle:
  - `fitness_client_profiles`;
  - `fitness_client_anamneses`.
- Gerada migration versionada `0003_glorious_human_fly`.
- Criado `ClientOnboardingRepository`.
- Criada API publica `POST /api/public/client-signup`.
- API cria usuario `client`, salva perfil/anamnese e retorna token de sessao.
- Backend modular tambem recebeu `/api/public/client-signup`.
- Criado script manual `manual:backend:client-signup`.
- Criado alias `test:backend:client-signup`.

## Fluxo validavel

1. Usuario acessa `/cadastro`.
2. Preenche dados de acesso, objetivo, plano e anamnese inicial.
3. Sistema cria usuario cliente no Supabase.
4. Sistema salva perfil e anamnese.
5. Sistema grava a sessao local e redireciona para `/dashboard`.

## Validacoes

- `npm.cmd run db:generate`
- `npm.cmd run check`
- `npm.cmd run manual:backend:client-signup`
- `npm.cmd run build`
- `npm.cmd run manual:deploy:vercel`

## Resultado

O cadastro de cliente deixou de ser apenas captacao e passou a ser um fluxo real de onboarding, pronto para testar em Vercel + Supabase apos aplicar a migration no banco.

## Observacoes

- O token continua sendo bearer simples, sem expiracao/refresh token. A seguranca forte permanece planejada para sprint dedicada.
- A anamnese ainda e inicial; campos clinicos, documentos e revisao profissional podem evoluir em sprints futuras.
- A validacao visual responsiva foi considerada no layout da tela nova, mas telas legadas profissionais ainda merecem QA fino em celular.
