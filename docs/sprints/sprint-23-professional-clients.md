# Sprint 23 - Carteira de clientes por profissional

## Entrega

- Nova tabela `fitness_professional_clients` com profissional, cliente, especialidade e status.
- Um profissional so visualiza clientes vinculados a ele e a sua especialidade.
- O administrador pode criar e remover vinculos pelas rotas abaixo.
- A tela de alunos do personal agora consulta a API real, sem `MOCK_STUDENTS`.
- A lista de clientes da nutricionista passa a enviar o token de autenticacao.

## Migracao Supabase

Aplique `drizzle/migrations/0004_professional_client_assignments.sql` no SQL Editor do Supabase antes de publicar esta sprint.

## Rotas

- `GET /api/nutritionist/clients`
- `GET /api/trainer/clients`
- `POST /api/clients/:clientId/assignments` (admin)
- `DELETE /api/clients/:clientId/assignments/:assignmentId` (admin)

O POST recebe `{ "professionalId": "uuid", "specialty": "nutrition" | "training" }`.

## Validacao manual

Execute `npm run manual:backend:professional-clients`. O teste cria um vinculo temporario, confirma a visibilidade para a nutricionista e o isolamento do personal, depois remove o vinculo.