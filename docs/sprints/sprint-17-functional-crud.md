# Sprint 17 - CRUD Funcional com Supabase

## Objetivo

Transformar botoes importantes que ainda estavam mockados em fluxos funcionais persistidos no Supabase.

## Branch e tag

- Branch: `sprint-17-functional-crud`
- Tag planejada: `v0.20.0-functional-crud`

## Entregas

- Expostas rotas reais na camada usada pela Vercel:
  - `GET /api/diets`
  - `POST /api/diets`
  - `PUT /api/diets/:id`
  - `DELETE /api/diets/:id`
  - `GET /api/workout-plans`
  - `POST /api/workout-plans`
  - `PUT /api/workout-plans/:id`
  - `DELETE /api/workout-plans/:id`
  - `GET /api/foods`
  - `POST /api/foods`
  - `PUT /api/foods/:id`
  - `DELETE /api/foods/:id`
  - `GET /api/meals`
  - `POST /api/meals`
  - `PUT /api/meals/:id`
  - `DELETE /api/meals/:id`
- `FoodRepository` ganhou update e delete.
- Tela de templates do personal trainer passou a:
  - listar treinos do Supabase;
  - criar treino;
  - editar treino;
  - duplicar treino;
  - remover treino.
- Tela de biblioteca do nutricionista passou a:
  - listar alimentos do Supabase;
  - criar alimento;
  - editar alimento;
  - remover alimento;
  - listar refeicoes do Supabase;
  - criar refeicao;
  - editar refeicao;
  - remover refeicao.
- Criado script `manual:backend:functional-crud`.
- Criado alias `test:backend:functional-crud`.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run manual:backend:functional-crud`
- `npm.cmd run build`
- `npm.cmd run manual:deploy:vercel`

## Resultado

Os principais botoes de cadastro, edicao, duplicacao e remocao em alimentos, refeicoes e templates de treino agora persistem no Supabase.

## Ainda pendente

- Editor avancado de plano alimentar com blocos ricos ainda precisa de modelagem propria.
- Cadastro/edicao completa de clientes ainda nao foi migrado.
- Uploads, documentos, videos, anamnese e pagamentos seguem para sprints futuras.
