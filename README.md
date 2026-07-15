# Fitness Sincera

Plataforma web para acompanhamento fitness, nutricao e treino, conectando clientes, nutricionistas, personal trainers e administradores em uma experiencia unica.

## Estado atual

O projeto esta em migracao arquitetural de um app React + Express legado para uma estrutura mais separada e escalavel:

- `front-end/`: aplicacao React.
- `back-end/`: novo backend modular com Express, Drizzle e PostgreSQL/Supabase.
- `server/`: servidor atual de transicao, ainda usado para servir a aplicacao e pontes temporarias.
- `drizzle/`: migrations versionadas.
- `docs/`: documentacao de arquitetura, sprints e testes.

## Principais entregas

- Site publico em `/` com captacao de leads.
- Login real em `/login` com usuarios padrao de teste.
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
- Tema claro/escuro.
- Scripts manuais para testar APIs sem Postman.

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Frontend | React, Wouter, TanStack Query, Tailwind CSS, Radix UI, shadcn/ui |
| Backend atual | Express + Vite middleware |
| Backend novo | Express modular + TypeScript |
| Banco | PostgreSQL/Supabase + Drizzle ORM |
| Build | Vite + esbuild |

## Requisitos

- Node.js 20+
- Supabase ou PostgreSQL compatível
- `DATABASE_URL` configurada em `.env`

## Instalação

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
```

Alguns scripts acessam o Supabase e precisam de `DATABASE_URL` valida.

## Usuários padrão

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
| `/app` | Entrada interna com redirecionamento por perfil |
| `/admin/dashboard` | Painel administrativo |
| `/dashboard` | Painel cliente |
| `/nutritionist/dashboard` | Painel nutricionista |
| `/trainer/dashboard` | Painel personal trainer |

## Documentação

- `docs/sprints/`: entregas por sprint.
- `docs/api/manual-test-scripts.md`: scripts de teste manual.
- `docs/changelog/sprint-0.md`: changelog consolidado.
- `docs/architecture/`: decisoes e estrutura arquitetural.

## Limitações atuais

- Login ainda usa token bearer simples, sem expiração ou refresh token.
- Envio real de email ainda nao foi integrado.
- Pagamentos ainda nao foram definidos.
- Ficha de anamnese e perfis profissionais detalhados ficam para proximas sprints.
- `server/` ainda existe como camada de transicao ate a migracao completa para `back-end/`.
