# Checklist de Release Candidate

## Antes do push

- Confirmar branch `release/final-candidate`.
- Confirmar workspace limpo.
- Rodar:
  - `npm.cmd run check`
  - `npm.cmd run db:generate`
  - `npm.cmd run build`

## GitHub

- Subir branch `release/final-candidate`.
- Subir tags das sprints.
- Abrir PR para a branch principal do repositorio.
- Conferir arquivos versionados:
  - `front-end/`
  - `back-end/`
  - `server/`
  - `drizzle/`
  - `docs/`
  - `package.json`
  - `README.md`

## Banco

- Configurar `DATABASE_URL`.
- Aplicar migrations Drizzle.
- Executar seeds essenciais:
  - `npm.cmd run db:seed:users`
  - `npm.cmd run db:seed:foods`

## Vercel ou ambiente de deploy

- Configurar variaveis:
  - `DATABASE_URL`
  - `NODE_ENV=production`
- Conferir `vercel.json`:
  - `/api/:path*` deve ir para `/api/index`;
  - `/:path*` deve ir para `/index.html`.
- Validar build em ambiente remoto.
- Confirmar que rotas SPA funcionam:
  - `/`
  - `/login`
  - `/app`
  - `/admin/dashboard`
- Confirmar que rotas API funcionam:
  - `/api/health`
  - `/api/public/leads`
  - `/api/admin/site-leads`

## Pos-release recomendado

- Sprint de Auth Hardening.
- Sprint de email/notificacoes.
- Sprint de anamnese do cliente.
- Sprint de perfis profissionais e documentos.
- Sprint de storage para fotos, documentos e videos.
- Sprint de pagamentos/planos.
