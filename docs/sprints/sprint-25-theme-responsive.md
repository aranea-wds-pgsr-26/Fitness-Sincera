# Sprint 25 - Tema e responsividade

## Entrega

- Mantida a alternancia clara/escura persistida em `fitness-sincera-theme`.
- Adicionada navegacao horizontal responsiva para os paineis de personal e nutricionista em telas menores que `md`.
- A navegacao usa exatamente as mesmas rotas da barra lateral desktop e preserva o alternador de tema.

## Validacao

- Revisao local da tela de acesso em viewport de celular.
- `npm run check`.
- `npm run build`.

## Observacao

Os cards de metricas demonstrativas que ainda dependem de check-ins, agua, sessoes e progresso nao foram convertidos em dados artificiais de tema. A proxima sprint funcional deve persistir essas metricas antes de elas serem consideradas prontas para producao.