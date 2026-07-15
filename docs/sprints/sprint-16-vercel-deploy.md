# Sprint 16 - Deploy Vercel + Supabase

## Objetivo

Preparar o projeto para rodar na Vercel com front-end estatico e API Express em funcao serverless, usando Supabase como banco.

## Branch e tag

- Branch: `sprint-16-vercel-deploy`
- Tag planejada: `v0.19.0-vercel-deploy`

## Entregas

- Criado `server/app.ts` para reutilizar o mesmo Express em:
  - servidor local;
  - build local de producao;
  - funcao serverless da Vercel.
- `server/index.ts` passou a apenas iniciar o servidor local/producao.
- Criado `api/index.ts` como entrada serverless da Vercel.
- Atualizado `vercel.json` para:
  - publicar `dist/public`;
  - enviar `/api/*` para a funcao serverless;
  - manter fallback SPA para as demais rotas.
- Adicionadas rotas de saude na camada de transicao:
  - `GET /api/health`
  - `GET /api/readiness`
- Criado script `manual:deploy:vercel`.
- Criado alias `test:deploy:vercel`.
- README atualizado com informacoes de deploy.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run build`
- `npm.cmd run manual:deploy:vercel`

## Resultado

O fluxo local equivalente a Vercel + Supabase foi validado:

- build estatico encontrado em `dist/public`;
- API serverless respondeu `/api/health`;
- API publica gravou lead no Supabase;
- API admin leu o lead do Supabase.

## Bloqueio de publicacao real

A Vercel CLI nao esta instalada nesta maquina e `VERCEL_TOKEN` nao esta configurado no ambiente. Por isso, o deploy hospedado nao foi publicado diretamente por esta sprint.

## Como publicar

Pelo painel da Vercel:

1. Importar o repositorio `pgsr-mrdw/Fitness-Sincera`.
2. Selecionar a branch `sprint-16-vercel-deploy` ou mergear esta branch antes em `main`.
3. Configurar variavel `DATABASE_URL`.
4. Usar:
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
5. Deployar e testar:
   - `/`
   - `/login`
   - `/api/health`
   - envio de lead publico;
   - login admin;
   - `/admin/dashboard`.

Via CLI, com token:

```bash
npx vercel --prod --token "$VERCEL_TOKEN"
```

## Observacoes

- O teste local confirma a compatibilidade com Supabase.
- A confirmacao final do dominio Vercel depende do deploy real no painel ou CLI autenticada.
- Email, auth hardening, pagamentos e storage continuam como sprints posteriores.
