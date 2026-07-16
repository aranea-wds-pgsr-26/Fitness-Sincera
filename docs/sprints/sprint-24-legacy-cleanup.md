# Sprint 24 - Limpeza do legado

## Entrega

- O diretorio `server/` legado foi removido. Ele continha rotas em memoria, dados ficticios e um segundo servidor Express que nao era publicado no Vercel.
- `npm run dev` e o build de producao agora usam exclusivamente `back-end/src/server.ts`.
- O build continua gerando `dist/index.cjs` para a aplicacao e `dist/api.cjs` para a Function da Vercel.
- O arquivo de navegacao foi separado dos dados ficticios de refeicoes, removendo `front-end/src/lib/mockData.ts`.

## Validacao

- `npm run check`
- `npm run build`
- `npm run manual:backend:functional-crud`

Todos passaram com o Supabase configurado.

## Limite desta sprint

As telas de acompanhamento diario do cliente e os paines de metricas profissionais ainda requerem tabelas reais especificas (check-ins, consumo, agua, sessoes e progresso). Elas nao devem voltar a usar dados falsos; a proxima evolucao funcional deve criar esse modelo de acompanhamento antes de exibir estatisticas.