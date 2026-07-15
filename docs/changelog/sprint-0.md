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
- Ajustado `vite.config.ts` para usar o frontend real, hoje padronizado em `front-end/`.
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

# Sprint 1 - Fundacao do backend novo

## Objetivo

Criar a base funcional e testavel do backend novo em `back-end/src`.

## Alteracoes

- Adicionado middleware `requestId`.
- Adicionados endpoints publicos de health, readiness e meta.
- Adicionado router versionado `/api/v1`.
- Removido log de `DATABASE_URL`.
- Backend novo passa a subir health checks mesmo sem `DATABASE_URL`.
- Adicionado teste HTTP automatizado da fundacao do backend.
- Adicionado script `test:backend`.
- Criada documentacao da API de fundacao.
- Criado workflow de branches/tags por sprint.

## Validacoes

- `npm.cmd run test:backend`
- `npm.cmd run check`

## Resultado

O backend novo agora possui uma base publica verificavel sem depender da inicializacao do banco, pronta para receber os modulos reais nas proximas sprints.

# Sprint 2 - Banco de dados e Drizzle

## Objetivo

Criar a base versionada de banco do backend novo com Drizzle.

## Alteracoes

- Criado schema Drizzle real para as tabelas `fitness_*`.
- Criado cliente Drizzle do backend novo.
- Atualizado `drizzle.config.ts` para usar o schema do backend.
- Adicionado `DATABASE_URL` ao `.env.example`.
- `drizzle/` deixou de ser ignorado pelo Git.
- Gerada a primeira migracao versionada.
- Criados scripts manuais para testar health e meals pelo terminal.
- Limpas as mensagens do teste de meals.
- Documentados os scripts manuais de teste.

## Validacoes

- `npm.cmd run db:generate`
- `npm.cmd run manual:backend:health`
- `npm.cmd run test:backend:foundation`
- `npm.cmd run check`
- `npm.cmd run manual:backend:meals`

## Resultado

O projeto agora tem uma base Drizzle versionada e scripts manuais para validar APIs sem Postman.

# Sprint 3 - Auth e usuarios com Drizzle

## Objetivo

Migrar usuarios e sessoes do backend novo para Drizzle.

## Alteracoes

- Criado tipo compartilhado de usuario autenticado.
- `UserRepository` passou a usar Drizzle.
- `SessionRepository` passou a delegar para `UserRepository`.
- Middleware `requireAuth` deixou de depender diretamente de `store.ts`.
- Criado script manual de auth.
- Criado script `test:backend:auth`.
- Script de auth limpa a sessao e o usuario de teste ao final.

## Validacoes

- `npm.cmd run manual:backend:health`
- `npm.cmd run check`
- `npm.cmd run manual:backend:auth`

## Resultado

Os endpoints de auth do backend novo agora usam Drizzle para persistir usuarios e sessoes no Supabase.

# Sprint 4 - Usuarios padrao e login Admin

## Objetivo

Facilitar os testes manuais criando usuarios fixos no banco e adicionando o Admin ao login demo.

## Alteracoes

- Criado seed idempotente com quatro usuarios padrao.
- Adicionado script `manual:backend:default-users`.
- Adicionado alias `db:seed:users`.
- Adicionado papel `admin` ao schema de sessao do frontend.
- Adicionado card Admin na tela de login.
- Admin pode acessar rotas protegidas existentes enquanto nao ha dashboard administrativo dedicado.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run manual:backend:default-users`
- `npm.cmd run manual:backend:auth`
- `npm.cmd run manual:backend:health`
- `npm.cmd run build`

## Resultado

O banco agora possui quatro usuarios padrao para testes de modulos e o frontend atual permite entrar como Admin pela tela de login demo.

# Sprint 5 - Meals com Drizzle

## Objetivo

Migrar o modulo de refeicoes para Drizzle.

## Alteracoes

- `MealRepository` deixou de usar `store.ts`.
- CRUD de meals passou a usar `fitness_meals` via Drizzle.
- Rotas de meals foram formatadas sem alterar contrato.
- Script manual `manual:backend:meals` passou a validar o repository Drizzle.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run manual:backend:meals`
- `npm.cmd run manual:backend:health`
- `npm.cmd run build`

## Resultado

O primeiro modulo de dominio foi migrado para Drizzle com teste manual de ciclo completo passando no Supabase.

# Sprint 6 - Diets com Drizzle

## Objetivo

Migrar o modulo de dietas para Drizzle.

## Alteracoes

- `DietRepository` deixou de usar `store.ts`.
- CRUD de diets passou a usar `fitness_diet_plans` via Drizzle.
- Criado script manual `manual:backend:diets`.
- Criado alias `test:backend:diets`.
- Documentados o script manual e a sprint.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run manual:backend:diets`
- `npm.cmd run manual:backend:health`
- `npm.cmd run build`

## Resultado

O modulo de dietas agora usa Drizzle e possui teste manual de ciclo completo passando no Supabase.

# Sprint 7 - Workouts com Drizzle

## Objetivo

Migrar o modulo de treinos para Drizzle.

## Alteracoes

- `WorkoutRepository` deixou de usar `store.ts`.
- CRUD de workouts passou a usar `fitness_workout_plans` via Drizzle.
- Criado script manual `manual:backend:workouts`.
- Criado alias `test:backend:workouts`.
- Documentados o script manual e a sprint.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run manual:backend:workouts`
- `npm.cmd run manual:backend:health`
- `npm.cmd run build`

## Resultado

O modulo de treinos agora usa Drizzle e possui teste manual de ciclo completo passando no Supabase.

# Sprint 8 - Padronizacao da pasta front-end

## Objetivo

Padronizar a pasta do frontend para `front-end/`.

## Alteracoes

- Frontend ativo movido de `client/` para `front-end/`.
- Pasta antiga `fronte-end/` removida.
- Configuracoes de Vite, TypeScript, servidor legado e components atualizadas.
- Script `dev:front-end` adicionado.
- Alias `dev:client` mantido para compatibilidade.
- Documentacao atualizada com a nova estrutura.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run build`

## Resultado

O projeto agora segue a estrutura `front-end/` e `back-end/`, com build validado.
