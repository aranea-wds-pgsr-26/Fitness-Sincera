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
npm.cmd run manual:backend:default-users
```

Por enquanto, `test:backend:meals`, `manual:backend:meals`, `test:backend:diets` e `manual:backend:diets` executam seus respectivos fluxos de integracao manual assistida.
