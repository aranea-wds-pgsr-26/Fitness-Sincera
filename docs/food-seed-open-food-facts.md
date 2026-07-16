# Seed de alimentos da Open Food Facts

O seed consulta a API publica e gratuita da Open Food Facts e importa produtos do catalogo brasileiro para `fitness_foods`.

## Uso seguro

Primeiro execute a simulacao, que nao escreve no banco:

```powershell
npm run db:seed:foods:open-food-facts
```

Para gravar os itens validos no Supabase:

```powershell
npm run db:seed:foods:open-food-facts -- --write
```

Use `FOOD_SEED_LIMIT` para limitar de 1 a 100 produtos:

```powershell
$env:FOOD_SEED_LIMIT = 30
npm run db:seed:foods:open-food-facts -- --write
```

O seed e idempotente: produtos ja cadastrados com a mesma origem e codigo externo sao ignorados. Cada alimento importado usa 100 g como porcao de referencia e recebe `source: open_food_facts`.