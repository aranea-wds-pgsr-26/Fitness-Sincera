# Sprint 9 - Chat Foundation

## Branch

`sprint-9-chat-foundation`

## Tag planejada

`v0.12.0-chat-foundation`

## Objetivo

Criar a primeira camada funcional do chat sem API externa, com historico real no Supabase via Drizzle e respostas internas contextualizadas pelo papel do usuario.

## Entregas

- `ChatRepository` migrado de `store.ts` para Drizzle.
- Historico real usando a tabela `fitness_chat_messages`.
- Rota `POST /api/chatbot/message` mantendo contrato atual.
- Rota `GET /api/chatbot/history` mantendo contrato atual.
- Responder interno por contexto:
  - cliente;
  - nutricionista;
  - personal trainer;
  - admin.
- Uso de historico recente para primeira camada de continuidade da conversa.
- Script manual:
  - `npm.cmd run manual:backend:chat`
- Alias de teste:
  - `npm.cmd run test:backend:chat`

## Criterios de aceite

- `npm.cmd run check` deve passar.
- `npm.cmd run manual:backend:chat` deve passar no Supabase.
- `npm.cmd run manual:backend:health` deve passar.
- `npm.cmd run build` deve passar.

## Validacoes executadas

- `npm.cmd run check`
- `npm.cmd run manual:backend:chat`

Observacao: `manual:backend:chat` precisou rodar fora do sandbox para acessar o Supabase.

## Fora do escopo

- Integrar API externa de IA.
- Conectar o chat visual do front-end ao backend novo.
- Executar acoes no sistema a partir do chat, como criar dietas ou treinos automaticamente.

Esses pontos ficam para as proximas sprints.
