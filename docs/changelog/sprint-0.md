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

# Sprint 9 - Chat Foundation

## Objetivo

Criar a primeira camada funcional do chat sem API externa.

## Alteracoes

- `ChatRepository` deixou de usar `store.ts`.
- Historico de chat passou a usar `fitness_chat_messages` via Drizzle.
- Criado responder interno contextual por papel:
  - cliente;
  - nutricionista;
  - personal trainer;
  - admin.
- Rota `POST /api/chatbot/message` passou a gerar respostas contextualizadas.
- Rota `GET /api/chatbot/history` passou a listar historico real em ordem cronologica.
- Criado script manual `manual:backend:chat`.
- Criado alias `test:backend:chat`.
- Documentada a Sprint 14 de site publico e captacao.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run manual:backend:chat`

## Resultado

O chat agora possui persistencia real no Supabase e uma primeira camada de inteligencia interna por perfil de usuario.

# Sprint 10 - Foods Foundation

## Objetivo

Criar a base de alimentos para apoiar a construcao de dietas.

## Alteracoes

- Criada tabela Drizzle `fitness_foods`.
- Gerada migration versionada `0001_sleepy_bill_hollister`.
- Criado `FoodRepository`.
- Criado seed inicial com 10 alimentos comuns.
- Criada API autenticada:
  - `GET /api/foods`
  - `GET /api/v1/foods`
- Criado script manual `manual:backend:foods`.
- Criados aliases `test:backend:foods` e `db:seed:foods`.
- Documentado caminho futuro para importacao de fonte externa de alimentos.

## Validacoes

- `npm.cmd run db:generate`
- `npm.cmd run manual:backend:foods`
- `npm.cmd run check`

## Resultado

O projeto agora possui um catalogo inicial de alimentos em banco, com seed idempotente e API de busca para futuras telas de dietas.

## Bug conhecido

- `npm.cmd run db:migrate` nao concluiu a migration `0001_sleepy_bill_hollister` nesta maquina. A tabela foi criada aplicando o SQL versionado diretamente no Supabase.

# Sprint 11 - Theme Light/Dark

## Objetivo

Adicionar suporte inicial a tema claro e escuro.

## Alteracoes

- Criado `ThemeProvider` com `next-themes`.
- Criado `ThemeToggle`.
- Tema escuro mantido como padrao.
- Preferencia persistida em `localStorage`.
- Alternador adicionado no login, header mobile, header do cliente e sidebar profissional.
- Tokens CSS base ajustados para tema claro e `.dark`.

## Validacoes

- `npm.cmd run check`

## Resultado

A aplicacao agora possui base persistente para alternar entre tema claro e escuro, pronta para refinamento visual por tela.

# Sprint 12 - Login Real

## Objetivo

Criar a tela de login real usando email e senha.

## Alteracoes

- Tela de login passou a ter formulario de credenciais.
- Login real chama `POST /api/auth/login`.
- Sessao do front-end passou a guardar token bearer.
- Requisicoes do front-end passam a enviar `Authorization` quando houver token salvo.
- Atalhos de teste dos quatro perfis foram mantidos.
- Servidor legado recebeu ponte temporaria para `POST /api/auth/login` e `GET /api/auth/me`.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run manual:backend:default-users`
- `npm.cmd run manual:backend:auth`
- `npm.cmd run build`

## Resultado

O sistema agora possui login real com os usuarios padrao do Supabase, mantendo agilidade para testes por perfil.

# Sprint 13 - Admin Foundation

## Objetivo

Criar a primeira base funcional do painel administrativo.

## Alteracoes

- Criado `AdminRepository` com Drizzle.
- Criadas APIs administrativas protegidas por admin:
  - `GET /api/admin/dashboard`
  - `GET /api/admin/professionals`
  - `POST /api/admin/professionals`
- Rotas admin tambem disponiveis em `/api/v1/admin`.
- Criada tela `/admin/dashboard`.
- Admin agora e redirecionado para o painel administrativo apos login.
- Painel exibe metricas gerais da plataforma.
- Painel permite cadastrar nutricionista ou personal trainer.
- Criado script manual `manual:backend:admin`.
- Criado alias `test:backend:admin`.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run manual:backend:admin`
- `npm.cmd run manual:backend:health`
- `npm.cmd run build`

## Resultado

O sistema agora possui uma fundacao administrativa real, com painel inicial e cadastro de profissionais conectado ao Supabase.

## Observacao

A seguranca forte do login, com expiracao de token, refresh token, cookies seguros e hash robusto, fica para uma sprint dedicada de Auth Hardening.

# Sprint 14 - Site Publico e Captacao

## Objetivo

Criar a primeira pagina publica da Fitness Sincera e conectar contatos ao painel administrativo.

## Alteracoes

- `/` passou a exibir o site publico.
- `/app` passou a ser o redirecionador interno por perfil logado.
- Criada pagina publica com hero, carrossel vertical, historia, relatos, avaliacoes, planos e formulario.
- Criada tabela `fitness_site_leads`.
- Criada migration `0002_public_site_leads`.
- Criado `SiteLeadRepository`.
- Criada API publica `POST /api/public/leads`.
- Criada API admin `GET /api/admin/site-leads`.
- Dashboard admin passou a exibir metricas e lista de leads do site.
- Criado script manual `manual:backend:public-site`.
- Criado alias `test:backend:public-site`.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run manual:backend:public-site`
- `npm.cmd run manual:backend:admin`
- `npm.cmd run build`

## Resultado

O sistema agora tem uma camada publica de divulgacao e captacao, com solicitacoes chegando ao painel administrativo.

## Observacao

Email real, notificacao em tempo real, ficha de anamnese, validacao documental profissional e monetizacao ficam para sprints dedicadas.

# Sprint 15 - Release Candidate

## Objetivo

Preparar o projeto para subir ao GitHub como candidato de release.

## Alteracoes

- Criada branch final `release/final-candidate`.
- README atualizado para refletir a arquitetura atual.
- Criada documentacao de checklist de release/deploy.
- Criada documentacao da Sprint 15.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run db:generate`
- `npm.cmd run build`

## Resultado

O projeto ficou pronto para publicacao no GitHub e para uma proxima sprint de deploy.

# Sprint 16 - Deploy Vercel + Supabase

## Objetivo

Preparar a aplicacao para deploy na Vercel usando Supabase.

## Alteracoes

- Criado `server/app.ts` para reutilizar o Express sem acoplar ao `listen`.
- `server/index.ts` passou a iniciar apenas o servidor local/producao.
- Criado `api/index.ts` como funcao serverless da Vercel.
- Atualizado `vercel.json` para rotear `/api/*` para a funcao e manter fallback SPA.
- Adicionadas rotas `GET /api/health` e `GET /api/readiness` na camada de transicao.
- Criado script `manual:deploy:vercel`.
- Criado alias `test:deploy:vercel`.
- README e checklist de deploy atualizados.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run build`
- `npm.cmd run manual:deploy:vercel`

## Resultado

O fluxo local equivalente a Vercel + Supabase passou, incluindo API serverless, escrita de lead no Supabase e leitura pelo admin.

## Bloqueio

Deploy hospedado nao foi publicado porque a Vercel CLI nao esta instalada e `VERCEL_TOKEN` nao esta configurado nesta maquina.

# Sprint 17 - CRUD Funcional com Supabase

## Objetivo

Conectar botoes importantes das telas profissionais ao Supabase.

## Alteracoes

- Adicionadas rotas CRUD reais para dietas, treinos, alimentos e refeicoes na camada de transicao.
- `FoodRepository` ganhou update e delete.
- Tela de templates do personal trainer passou a usar `/api/workout-plans`.
- Tela de alimentos/refeicoes do nutricionista passou a usar `/api/foods` e `/api/meals`.
- Criado script manual `manual:backend:functional-crud`.
- Criado alias `test:backend:functional-crud`.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run manual:backend:functional-crud`
- `npm.cmd run build`
- `npm.cmd run manual:deploy:vercel`

## Resultado

Criar, editar, duplicar e excluir templates de treino; criar, editar e excluir alimentos; e criar, editar e excluir refeicoes agora persistem no Supabase.

## Observacao

O editor avancado de plano alimentar por blocos ricos continua pendente de modelagem especifica.

# Sprint 18 - Cadastro de Cliente e Anamnese

## Objetivo

Criar onboarding real de cliente com cadastro, anamnese inicial e sessao pronta para teste.

## Alteracoes

- Criada pagina `/cadastro`.
- Landing page envia "Se inscreva" para o cadastro real.
- Login ganhou link para criar conta de cliente.
- Criadas tabelas `fitness_client_profiles` e `fitness_client_anamneses`.
- Gerada migration versionada `0003_glorious_human_fly`.
- Criado `ClientOnboardingRepository`.
- Criada API `POST /api/public/client-signup`.
- Backend modular e servidor de transicao receberam a mesma rota.
- Criado script manual `manual:backend:client-signup`.
- Criado alias `test:backend:client-signup`.

## Validacoes

- `npm.cmd run db:generate`
- `npm.cmd run check`
- `npm.cmd run manual:backend:client-signup`
- `npm.cmd run build`
- `npm.cmd run manual:deploy:vercel`

## Resultado

Clientes podem se cadastrar, preencher a ficha inicial e acessar o painel com dados persistidos no Supabase.

# Sprint 19 - Estabilidade de Producao e Limpeza

## Objetivo

Melhorar o diagnostico do erro 500 em producao na Vercel e remover arquivos legados comprovadamente fora do fluxo atual.

## Alteracoes

- Pool PostgreSQL ajustado para ambiente serverless.
- `/api/readiness` passou a testar conexao real com Supabase.
- Readiness do backend modular tambem passou a testar conexao real.
- Removido alias Vite `@assets` sem uso.
- Removida pasta vazia `fronte-end/`.
- Removidos arquivos legados nao montados de rotas/controladores profissionais antigos.
- Removida rota antiga de meals fora do router modular.

## Resultado

O deploy passa a ter um endpoint de diagnostico mais claro para separar erro de function, erro de variavel de ambiente e erro de conexao com Supabase.
