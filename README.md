# Fitness Sincera

Plataforma web para acompanhamento fitness, nutricao e treino, conectando clientes, nutricionistas, personal trainers e administradores em uma experiencia unica.

## Estado atual

O projeto esta em migracao arquitetural de um app React + Express legado para uma estrutura mais separada e escalavel:

- `front-end/`: aplicacao React.
- `back-end/`: novo backend modular com Express, Drizzle e PostgreSQL/Supabase.
- `server/`: legado de transicao, mantido como referencia; nao e a API publicada.
- `drizzle/`: migrations versionadas.
- `docs/`: documentacao de arquitetura, sprints e testes.

## Principais entregas

- Site publico em `/` com captacao de leads.
- Login real em `/login` com usuarios padrao de teste.
- Cadastro de cliente em `/cadastro` com anamnese inicial.
- Redirecionamento interno por perfil em `/app`.
- Painel admin em `/admin/dashboard`.
- Modulos com Drizzle:
  - usuarios e sessoes;
  - meals;
  - diets;
  - workouts;
  - chat;
  - foods;
  - site leads.
  - client profiles e anamneses.
- Tema claro/escuro.
- Scripts manuais para testar APIs sem Postman.

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Frontend | React, Wouter, TanStack Query, Tailwind CSS, Radix UI, shadcn/ui |
| Backend | Express modular + TypeScript |
| Banco | PostgreSQL/Supabase + Drizzle ORM |
| Build | Vite + esbuild |

## Requisitos

- Node.js 20+
- Supabase ou PostgreSQL compatÃƒÂ­vel
- `DATABASE_URL` configurada em `.env`

## InstalaÃƒÂ§ÃƒÂ£o

```bash
npm install
```

Crie um arquivo `.env` com base em `.env.example` e configure pelo menos:

```bash
DATABASE_URL="postgresql://..."
NODE_ENV=development
```

## Comandos

| Comando | Descricao |
|---|---|
| `npm.cmd run dev` | Inicia a aplicacao completa em desenvolvimento |
| `npm.cmd run dev:front-end` | Inicia apenas o front-end |
| `npm.cmd run dev:back` | Inicia o backend novo |
| `npm.cmd run build` | Gera build de producao |
| `npm.cmd run start` | Inicia build de producao |
| `npm.cmd run check` | Verifica TypeScript |
| `npm.cmd run db:generate` | Gera migrations Drizzle |
| `npm.cmd run db:migrate` | Aplica migrations Drizzle |
| `npm.cmd run db:studio` | Abre Drizzle Studio |
| `npm.cmd run manual:deploy:vercel` | Valida o fluxo local equivalente ao deploy Vercel + Supabase |

## Testes manuais

Os scripts abaixo sobem o app localmente e validam APIs sem Postman:

```bash
npm.cmd run manual:backend:health
npm.cmd run manual:backend:auth
npm.cmd run manual:backend:default-users
npm.cmd run manual:backend:meals
npm.cmd run manual:backend:diets
npm.cmd run manual:backend:workouts
npm.cmd run manual:backend:chat
npm.cmd run manual:backend:foods
npm.cmd run manual:backend:admin
npm.cmd run manual:backend:public-site
npm.cmd run manual:backend:functional-crud
npm.cmd run manual:backend:client-signup
npm.cmd run manual:deploy:vercel
```

Alguns scripts acessam o Supabase e precisam de `DATABASE_URL` valida.

## UsuÃƒÂ¡rios padrÃƒÂ£o

Crie ou atualize os usuarios de teste com:

```bash
npm.cmd run db:seed:users
```

| Papel | Email | Senha |
|---|---|---|
| admin | `admin@fitnesssincera.com` | `admin123` |
| client | `bennet02@gmail.com` | `client123` |
| nutritionist | `sofia.almeida@fitnesssincera.com` | `nutritionist123` |
| trainer | `ricardo@fitnesssincera.com` | `trainer123` |

## Rotas principais

| Rota | Uso |
|---|---|
| `/` | Site publico |
| `/login` | Login |
| `/cadastro` | Cadastro de cliente com anamnese |
| `/app` | Entrada interna com redirecionamento por perfil |
| `/admin/dashboard` | Painel administrativo |
| `/dashboard` | Painel cliente |
| `/nutritionist/dashboard` | Painel nutricionista |
| `/trainer/dashboard` | Painel personal trainer |

## DocumentaÃƒÂ§ÃƒÂ£o

- `docs/sprints/`: entregas por sprint.
- `docs/api/manual-test-scripts.md`: scripts de teste manual.
- `docs/changelog/sprint-0.md`: changelog consolidado.
- `docs/architecture/`: decisoes e estrutura arquitetural.

## LimitaÃƒÂ§ÃƒÂµes atuais

- Login ainda usa token bearer simples, sem expiraÃƒÂ§ÃƒÂ£o ou refresh token.
- Envio real de email ainda nao foi integrado.
- Pagamentos ainda nao foram definidos.
- A ficha de anamnese inicial existe para clientes; perfis profissionais detalhados ficam para proximas sprints.
- `server/` permanece apenas como referencia de transicao; producao usa o backend modular.

## Deploy

O projeto possui configuracao inicial para Vercel:

- `vercel.json` entrega o front-end estatico em `dist/public`.
- `api/index.ts` expoe o backend modular como funcao serverless para `/api/*`.
- `npm.cmd run start` executa a mesma API modular e serve o front-end compilado, adequado para Railway e Render.
- `/api/health` valida se a function esta respondendo.
- `/api/readiness` valida a conexao real com o Supabase.
- O teste `npm.cmd run manual:deploy:vercel` valida localmente API serverless, build estatico e Supabase.

Na Vercel, configure `DATABASE_URL` e use a URL transaction pooler/Supavisor do Supabase na porta `6543`, com `sslmode=require`. Para Railway ou Render, use `npm.cmd run build` como build command e `npm.cmd run start` como start command.

Variaveis como `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` sao usadas pelo Supabase SDK no frontend ou por fluxos de Auth/Storage. Elas nao substituem a connection string PostgreSQL usada pelo Drizzle. Para o backend atual funcionar, configure pelo menos uma destas variaveis na Vercel:

- `DATABASE_URL`
- `POSTGRES_URL`
- `SUPABASE_DB_URL`

O endpoint `/api/readiness` mostra qual delas foi encontrada e qual host/porta esta sendo usado, sem expor senha.
