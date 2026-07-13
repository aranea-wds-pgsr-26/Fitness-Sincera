# ADR-0002 — Banco de Dados PostgreSQL utilizando Supabase

**Status:** Aceito

## Contexto

O projeto necessita de um banco relacional com suporte a SQL, integridade referencial, boa escalabilidade e hospedagem gerenciada.

Além disso, o ambiente de desenvolvimento deve ser simples de configurar e permitir evolução futura para autenticação, auditoria e armazenamento de dados clínicos.

## Decisão

Utilizar PostgreSQL hospedado no Supabase como banco principal da aplicação.

A conexão será realizada utilizando a variável de ambiente `DATABASE_URL`.

Toda comunicação será feita através do pacote `pg`.

## Justificativa

A escolha do Supabase oferece:

* PostgreSQL completo.
* Hospedagem gerenciada.
* Backups.
* Excelente integração com aplicações Node.js.
* Facilidade para desenvolvimento local e produção.
* Possibilidade de expansão para Storage, Edge Functions e Realtime futuramente.

## Consequências

Toda alteração estrutural deverá ser realizada através de migrações.

As tabelas deverão utilizar UUID como chave primária.

A aplicação dependerá da variável `DATABASE_URL` para inicialização.

Scripts independentes (migrações, seeds, testes de integração) deverão carregar o ambiente utilizando:

```ts
import "dotenv/config";
```

antes da criação da conexão com o banco.

## Alternativas consideradas

* SQLite
* MySQL
* PostgreSQL local
* MongoDB

O PostgreSQL no Supabase foi escolhido por oferecer maior aderência aos requisitos atuais e às funcionalidades previstas para as próximas sprints.

## Data

Sprint 0.2.4
