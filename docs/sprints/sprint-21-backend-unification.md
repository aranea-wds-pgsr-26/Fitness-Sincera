# Sprint 21 - Unificacao do Backend e Hospedagem

## Objetivo

Definir o backend modular em `back-end/src/` como a unica API publicada, reduzindo comportamentos diferentes entre desenvolvimento, Vercel e uma hospedagem Node persistente.

## Alteracoes

- `api/index.ts` passa a expor diretamente o app modular.
- O build de producao inicia em `back-end/src/server.ts`.
- O backend modular serve o front-end compilado somente no processo Node persistente de producao.
- O teste de deploy executa a mesma function exportada para a Vercel.
- `nanoid` passa a ser dependencia declarada, sem depender de instalacoes locais antigas.

## Limites conhecidos

- `server/` e legado de transicao e nao integra mais a API publicada.
- Rotas que ainda usam `server/storage.ts` ou `mockData` precisam ser migradas antes de serem consideradas persistidas no Supabase.
- Hash de senhas, expiracao de sessoes e renovacao de token pertencem a uma sprint de seguranca dedicada.

## Validacao

- `npm.cmd run check`
- `npm.cmd run build`
- `npm.cmd run manual:backend:health`
- `npm.cmd run manual:deploy:vercel`

## Hospedagem

Para validacao, Railway ou Render podem executar front-end e API juntos usando `npm.cmd run build` e `npm.cmd run start`. Vercel segue compativel para testes serverless usando a URL transaction pooler do Supabase na porta 6543.