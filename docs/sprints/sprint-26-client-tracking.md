# Sprint 26 - Acompanhamento diario real

## Entrega

- Nova tabela `fitness_daily_trackings` para dados diarios por cliente.
- API autenticada para consultar e atualizar check-in diario.
- Registro de hidratacao persistido no Supabase, usado pelo card de hidratacao do cliente.
- Campos preparados para meta de agua, passos, sono, calorias queimadas e observacoes.
- Teste manual que valida leitura, incremento de agua e restauracao do valor original.

## Migracao obrigatoria

Antes de publicar, execute `drizzle/migrations/0005_daily_tracking.sql` no SQL Editor do Supabase. O banco atual foi criado antes do journal do Drizzle, por isso `npm run db:migrate` tenta reaplicar migracoes antigas e nao deve ser usado ate a adocao formal desse historico.

## Validacao

Depois de aplicar a migracao:

```powershell
npm run manual:backend:daily-tracking
```