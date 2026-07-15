# Sprint 20 - Diagnostico de Variaveis Supabase

## Objetivo

Eliminar ambiguidade entre variaveis do Supabase SDK e variaveis de conexao PostgreSQL usadas pelo backend com Drizzle.

## Decisao

A sugestao abaixo e valida para uso do Supabase SDK:

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Porem, ela nao resolve o backend atual, porque a persistencia do projeto usa Drizzle conectado ao PostgreSQL. Para isso, a Vercel precisa ter uma connection string de banco.

## Variaveis aceitas pelo backend

O backend passa a procurar a primeira variavel disponivel nesta ordem:

1. `DATABASE_URL`
2. `POSTGRES_URL`
3. `SUPABASE_DB_URL`

## Variaveis de SDK

Estas variaveis podem ser usadas no futuro para Auth, Storage ou chamadas via SDK, mas nao substituem a connection string PostgreSQL:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Diagnostico em producao

O endpoint `/api/readiness` agora retorna:

- se encontrou uma connection string PostgreSQL;
- qual variavel esta sendo usada;
- host/porta/database sem senha;
- quais variaveis Supabase estao presentes;
- erro de conexao, quando houver.

## Recomendacao para Vercel

Usar a connection string do Supabase Pooler/Supavisor:

```text
postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres?sslmode=require
```

Depois de alterar variaveis na Vercel, e necessario fazer redeploy.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run manual:backend:health`
- `npm.cmd run build`
- `npm.cmd run manual:deploy:vercel`
