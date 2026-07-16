# Sprint 21.1 - Bundle da Function Vercel

## Problema corrigido

A function em `api/index.ts` importava diretamente `back-end/src/app`. A Vercel publicou somente a function compilada e o modulo TypeScript externo nao estava presente em `/var/task`, causando `ERR_MODULE_NOT_FOUND` antes de qualquer conexao com o Supabase.

## Solucao

- O build gera `dist/api.cjs`, contendo somente o backend modular, sem iniciar um servidor HTTP.
- A function carrega esse bundle no runtime.
- `vercel.json` inclui `dist/api.cjs` explicitamente no pacote da function.

## Validacao

- `npm.cmd run check`
- `npm.cmd run build`
- `npm.cmd run manual:deploy:vercel`

O teste valida health, readiness com Supabase, envio de lead e consulta administrativa usando a mesma entrada da function.