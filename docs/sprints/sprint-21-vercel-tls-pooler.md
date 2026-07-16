# Sprint 21.2 - TLS do Supabase Pooler na Vercel

## Problema corrigido

A function iniciava, mas `/api/readiness` retornava `SELF_SIGNED_CERT_IN_CHAIN`. O `sslmode=require` presente na URL do pooler tinha precedencia sobre a configuracao TLS explicita do driver `pg`.

## Solucao

- A URL usada pelo `pg` remove somente o parametro `sslmode`.
- A URL original permanece disponivel para diagnostico seguro.
- A conexao continua com TLS ativo e `rejectUnauthorized: false`, necessario para a cadeia apresentada pelo pooler.

## Operacao

Na Vercel, use a URL do Supabase transaction pooler na porta `6543` em `DATABASE_URL` com `sslmode=require`. Evite manter `POSTGRES_URL` e `SUPABASE_DB_URL` se nao forem necessarias; a API prioriza `DATABASE_URL`.

## Validacao

- `npm.cmd run check`
- `npm.cmd run build`
- `npm.cmd run manual:backend:health`
- `npm.cmd run manual:deploy:vercel`