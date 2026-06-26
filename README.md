# Fitness Sincera

Plataforma web de acompanhamento fitness e saude. Permite que usuarios monitorem nutricao, treinos e progresso geral de bem-estar, com dashboards especializados para personal trainers e nutricionistas gerenciarem seus clientes.

## Tecnologias

| Camada | Tecnologias |
|--------|-------------|
| Frontend | React 19.2, Wouter 3.3.5, Tailwind CSS 4.1, Radix UI, shadcn/ui |
| Backend | Express 5.0.1, TypeScript 5.6.3 |
| Banco de dados | PostgreSQL + Drizzle ORM 0.39.3 |
| Gerenciamento de estado | TanStack Query 5.60.5 |
| Build | Vite 7.1.9 |
| Autenticacao | Passport.js + Express Session |

## Pre-requisitos

- Node.js 20+
- PostgreSQL com `DATABASE_URL` configurada

## Instalacao

```bash
# Instalar dependencias
npm install

# Configurar variavel de ambiente
export DATABASE_URL="postgresql://usuario:senha@localhost:5432/fitness_sincera"

# Aplicar schema no banco de dados
npm run db:push

# Iniciar servidor de desenvolvimento
npm run dev
```

## Comandos disponiveis

| Comando | Descricao |
|---------|-----------|
| `npm run dev` | Inicia o servidor completo (backend + frontend via Vite) |
| `npm run dev:client` | Inicia apenas o frontend |
| `npm run build` | Gera o build de producao |
| `npm start` | Inicia o servidor em modo producao |
| `npm run check` | Verifica os tipos TypeScript |
| `npm run db:push` | Aplica o schema Drizzle no banco de dados |

## Estrutura do Projeto

```
Fitness-Sincera/
├── client/               # Aplicacao frontend React
│   └── src/
│       ├── components/   # Componentes reutilizaveis (ui/, layout/, dashboard/, features/)
│       ├── pages/        # Paginas da aplicacao
│       ├── hooks/        # Custom hooks
│       └── lib/          # Utilitarios e configuracoes
├── server/               # API backend Express
│   ├── index.ts          # Ponto de entrada do servidor
│   ├── routes.ts         # Definicao das rotas da API
│   └── storage.ts        # Interface de persistencia de dados
├── shared/               # Codigo compartilhado entre cliente e servidor
│   └── schema.ts         # Schema Drizzle + tipos compartilhados
└── script/               # Scripts de build e deploy
```

## Documentacao

- [Visao Geral do Projeto](.context/docs/project-overview.md)
- [Arquitetura](.context/docs/architecture.md)
- [Fluxo de Dados](.context/docs/data-flow.md)
- [Estrategia de Testes](.context/docs/testing-strategy.md)
- [Seguranca](.context/docs/security.md)
- [Workflow de Desenvolvimento](.context/docs/development-workflow.md)

## Variaveis de Ambiente

| Variavel | Descricao | Obrigatoria |
|----------|-----------|-------------|
| `DATABASE_URL` | URL de conexao com o PostgreSQL | Sim |
| `SESSION_SECRET` | Chave secreta para as sessoes Express | Sim (producao) |
| `NODE_ENV` | Ambiente de execucao: `development` ou `production` | Nao |
