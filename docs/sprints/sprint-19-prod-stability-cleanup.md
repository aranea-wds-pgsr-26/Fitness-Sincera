# Sprint 19 - Estabilidade de Producao e Limpeza

## Objetivo

Reduzir ruido do projeto apos o deploy e melhorar o diagnostico de erros 500 em producao na Vercel.

## Analise do erro Vercel

O erro `FUNCTION_INVOCATION_FAILED` indica que a funcao serverless da Vercel falhou durante a execucao. No projeto atual, a causa mais provavel para rotas que gravam ou leem dados e a conexao com o Supabase:

- `DATABASE_URL` ausente no ambiente correto da Vercel;
- `DATABASE_URL` usando a URL direta do banco, que pode resolver para IPv6 e falhar em ambiente serverless;
- senha/host/porta incorretos;
- limite de conexoes do banco em ambiente serverless.

## Alteracoes

- Pool PostgreSQL ajustado para serverless:
  - `max` padrao reduzido para `1`;
  - timeout de conexao definido;
  - SSL habilitado para Supabase ou `sslmode=require`.
- `/api/readiness` agora testa a conexao real com o banco.
- Backend modular tambem recebeu readiness com teste real do banco.
- Removido alias Vite `@assets`, sem uso no app atual.
- Removida pasta vazia `fronte-end/`.
- Removidos arquivos legados nao montados:
  - rotas profissionais antigas em `server/routes/`;
  - controllers profissionais antigos em `server/controllers/`;
  - middleware legado `server/middleware/auth.ts`;
  - testes antigos de server profissional sem script ativo;
  - rota antiga `back-end/src/routes/meals/route.ts`;
  - schema antigo `back-end/src/schemas/meal.ts`.

## Como diagnosticar na Vercel

1. Testar `/api/health`.
   - Deve retornar `200`.
   - Se falhar, a function nem esta inicializando.

2. Testar `/api/readiness`.
   - Se retornar `200`, a conexao com Supabase esta ok.
   - Se retornar `503`, olhar `database.message` e `database.code`.

3. Se o problema for conexao com Supabase, usar preferencialmente a connection string do pooler do Supabase na Vercel.

## Recomendacao de DATABASE_URL para Vercel

Para Vercel, preferir a URL do Supabase Pooler/Supavisor, com SSL, em vez da conexao direta `db.<project>.supabase.co`.

Exemplo de formato:

```text
postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres?sslmode=require
```

## Validacoes

- `npm.cmd run check`
- `npm.cmd run manual:backend:health`
- `npm.cmd run manual:backend:client-signup`
- `npm.cmd run build`
- `npm.cmd run manual:deploy:vercel`
