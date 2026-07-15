# Sprint 0.3 - Reorganizacao da casa

## Objetivo

Estabilizar o projeto antes da migracao arquitetural para o backend novo em `back-end/src`.

## Alteracoes

- Criada a branch `reorganizando-a-casa`.
- Corrigidas rotas modulares do backend novo:
  - `back-end/src/modules/diets/routes.ts`
  - `back-end/src/modules/workouts/routes.ts`
  - `back-end/src/modules/wearables/routes.ts`
- Corrigido import quebrado do modulo de wearables.
- Tipado o retorno do hook `useNutritionistClients`.
- Ajustado `vite.config.ts` para usar o frontend real em `client/`.
- Ajustado `script/build.ts` para carregar a configuracao Vite diretamente e funcionar no Windows/OneDrive.
- Removida a montagem das rotas profissionais protegidas antigas no servidor legado de demo, liberando os endpoints mockados usados pelo frontend.
- Compatibilizado o middleware legado `server/middleware/auth.ts` com a tipagem global de `req.user`.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run build`
- Teste manual em producao local:
  - Login por perfil demo.
  - Rotas de Cliente.
  - Rotas de Nutricionista.
  - Rotas de Personal Trainer.

## Resultado

A aplicacao ficou testavel em producao local, com frontend carregando corretamente e dashboards profissionais exibindo dados de demonstracao.

## Observacoes

- `server/` permanece como legado funcional para servir a aplicacao atual.
- `back-end/src` passa a ser o alvo da migracao arquitetural.
- O proximo ciclo deve iniciar a Sprint 1, focada em transformar `back-end/src` em backend funcional, testavel e documentado.
