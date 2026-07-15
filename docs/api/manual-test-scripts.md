# Scripts manuais de teste

Estes scripts permitem validar APIs pelo terminal, sem Postman.

## Health do backend novo

```powershell
npm.cmd run manual:backend:health
```

O script sobe o app em uma porta aleatoria local e valida:

- `GET /api/health`
- `GET /api/readiness`
- `GET /api/v1/health`
- `GET /api/v1/system/meta`

Nao precisa de banco.

## Meals com Supabase

```powershell
npm.cmd run manual:backend:meals
```

O script usa `DATABASE_URL` e valida o fluxo completo:

- inicializa tabelas atuais;
- busca o admin;
- cria uma refeicao;
- lista refeicoes;
- atualiza calorias;
- valida a atualizacao;
- remove a refeicao de teste;
- valida a remocao.

Este script acessa o Supabase e pode precisar ser executado fora de ambientes com rede bloqueada.

## Diets com Supabase

```powershell
npm.cmd run manual:backend:diets
```

O script usa `DATABASE_URL` e valida o fluxo completo:

- inicializa tabelas atuais;
- busca o admin;
- cria um plano alimentar;
- lista planos alimentares;
- atualiza descricao e refeicoes vinculadas;
- valida a atualizacao;
- remove o plano de teste;
- valida a remocao.

Este script acessa o Supabase e pode precisar ser executado fora de ambientes com rede bloqueada.

## Workouts com Supabase

```powershell
npm.cmd run manual:backend:workouts
```

O script usa `DATABASE_URL` e valida o fluxo completo:

- inicializa tabelas atuais;
- busca o admin;
- cria um plano de treino;
- lista planos de treino;
- atualiza descricao e exercicios;
- valida a atualizacao;
- remove o plano de teste;
- valida a remocao.

Este script acessa o Supabase e pode precisar ser executado fora de ambientes com rede bloqueada.

## Foods com Supabase

```powershell
npm.cmd run manual:backend:foods
```

Alias:

```powershell
npm.cmd run db:seed:foods
```

O script usa `DATABASE_URL` e valida o fluxo completo:

- cria ou atualiza o seed inicial de alimentos;
- lista alimentos do banco;
- valida alimentos principais do seed;
- busca alimentos por categoria;
- sobe o backend novo localmente;
- valida a rota autenticada `GET /api/foods`.

Este script acessa o Supabase e pode precisar ser executado fora de ambientes com rede bloqueada.

## Chat com Supabase

```powershell
npm.cmd run manual:backend:chat
```

O script usa `DATABASE_URL` e valida o fluxo completo:

- cria usuarios temporarios para cada papel;
- autentica cliente, nutricionista, personal trainer e admin;
- envia uma mensagem para `POST /api/chatbot/message`;
- valida resposta contextual por papel;
- consulta `GET /api/chatbot/history`;
- remove os dados temporarios ao final.

Este script acessa o Supabase e pode precisar ser executado fora de ambientes com rede bloqueada.

## Admin com Supabase

```powershell
npm.cmd run manual:backend:admin
```

O script usa `DATABASE_URL` e valida o fluxo administrativo:

- busca o usuario admin padrao;
- cria uma sessao temporaria;
- valida `GET /api/admin/dashboard`;
- valida `GET /api/admin/professionals`;
- cria um profissional temporario com `POST /api/admin/professionals`;
- revoga a sessao e remove o profissional temporario ao final.

Este script acessa o Supabase e pode precisar ser executado fora de ambientes com rede bloqueada.

## Site publico com Supabase

```powershell
npm.cmd run manual:backend:public-site
```

O script usa `DATABASE_URL` e valida o fluxo publico:

- cria a tabela de leads se necessario;
- envia um lead por `POST /api/public/leads`;
- cria uma sessao temporaria do admin;
- valida `GET /api/admin/site-leads`;
- confirma que o lead enviado aparece para o admin;
- revoga a sessao e remove o lead temporario ao final.

Este script acessa o Supabase e pode precisar ser executado fora de ambientes com rede bloqueada.

## Deploy Vercel com Supabase

```powershell
npm.cmd run manual:deploy:vercel
```

O script valida o fluxo local equivalente ao deploy:

- confirma que `dist/public/index.html` existe;
- sobe o Express no modo serverless;
- valida `GET /api/health`;
- envia um lead por `POST /api/public/leads`;
- autentica o admin;
- valida `GET /api/admin/site-leads`;
- remove os dados temporarios ao final.

Este script acessa o Supabase e pode precisar ser executado fora de ambientes com rede bloqueada.

## Auth com Supabase

```powershell
npm.cmd run manual:backend:auth
```

O script sobe o app em uma porta aleatoria local e valida:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

No final, o script revoga a sessao e remove o usuario de teste criado.

Este script acessa o Supabase e pode precisar ser executado fora de ambientes com rede bloqueada.

## Usuarios padrao

```powershell
npm.cmd run manual:backend:default-users
```

Alias:

```powershell
npm.cmd run db:seed:users
```

O script cria ou atualiza quatro usuarios fixos para testes:

| Papel | Email | Senha |
|---|---|---|
| admin | `admin@fitnesssincera.com` | `admin123` |
| client | `bennet02@gmail.com` | `client123` |
| nutritionist | `sofia.almeida@fitnesssincera.com` | `nutritionist123` |
| trainer | `ricardo@fitnesssincera.com` | `trainer123` |

## Testes automatizados relacionados

```powershell
npm.cmd run test:backend:foundation
npm.cmd run test:backend:auth
npm.cmd run test:backend:meals
npm.cmd run test:backend:diets
npm.cmd run test:backend:workouts
npm.cmd run test:backend:chat
npm.cmd run test:backend:foods
npm.cmd run test:backend:admin
npm.cmd run test:backend:public-site
npm.cmd run manual:backend:default-users
```

Por enquanto, `test:backend:meals`, `manual:backend:meals`, `test:backend:diets`, `manual:backend:diets`, `test:backend:workouts`, `manual:backend:workouts`, `test:backend:chat`, `manual:backend:chat`, `test:backend:foods`, `manual:backend:foods`, `test:backend:admin`, `manual:backend:admin`, `test:backend:public-site` e `manual:backend:public-site` executam seus respectivos fluxos de integracao manual assistida.
