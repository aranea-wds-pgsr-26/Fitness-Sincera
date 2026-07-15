# Sprint 13 - Admin Foundation

## Objetivo

Criar a primeira versao funcional do painel administrativo para acompanhamento geral da plataforma e cadastro inicial de profissionais.

## Branch e tag

- Branch: `sprint-13-admin-foundation`
- Tag planejada: `v0.16.0-admin-foundation`

## Entregas

- Criado `AdminRepository` usando Drizzle.
- Criadas rotas administrativas protegidas por admin:
  - `GET /api/admin/dashboard`
  - `GET /api/admin/professionals`
  - `POST /api/admin/professionals`
- As mesmas rotas foram disponibilizadas no router versionado `/api/v1/admin`.
- Servidor atual recebeu ponte temporaria para as rotas admin enquanto a migracao arquitetural continua.
- Criada tela `AdminDashboardPage` em `/admin/dashboard`.
- Admin passou a ser redirecionado para `/admin/dashboard` apos login.
- Tela admin exibe metricas de:
  - usuarios;
  - clientes;
  - nutricionistas;
  - personal trainers;
  - dietas;
  - treinos;
  - alimentos;
  - mensagens do chat.
- Tela admin permite cadastrar nutricionista ou personal trainer.
- Criado script manual `manual:backend:admin`.
- Criado alias `test:backend:admin`.

## Decisoes

- A receita/faturamento aparece como estrutura de placeholder, sem valor real, ate definirmos planos e pagamentos.
- Validacoes profissionais especificas, como CRM, CRN ou CREF, ficam para uma sprint de perfis profissionais.
- A tela admin foi criada como base operacional, sem landing page publica.
- A seguranca forte do login fica fora desta sprint.

## Fora do escopo

- Expiracao de token.
- Refresh token.
- Cookies seguros.
- Hash de senha robusto.
- Recuperacao de senha.
- MFA.
- Billing real.
- Leads do site publico.
- Validacao documental de nutricionista e personal trainer.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run manual:backend:admin`
- `npm.cmd run manual:backend:health`
- `npm.cmd run build`

## Resultado

O admin agora possui um painel inicial real para acompanhar a operacao e cadastrar profissionais, com API testavel pelo terminal e tela conectada ao login real.
