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

## Testes automatizados relacionados

```powershell
npm.cmd run test:backend:foundation
npm.cmd run test:backend:auth
npm.cmd run test:backend:meals
```

Por enquanto, `test:backend:meals` e `manual:backend:meals` executam o mesmo fluxo, pois a validacao de meals ainda e um teste de integracao manual assistido.
