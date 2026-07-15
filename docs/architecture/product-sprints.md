# Product Sprints

Este documento registra a evolucao de produto alem da migracao tecnica.

## Sprint 14 - Site publico e captacao

### Objetivo

Criar a primeira pagina publica do Fitness Sincera, apresentando a plataforma para clientes, nutricionistas e personal trainers.

### Direcao visual

- Hero profissional com enfase na presenca dos dois profissionais: nutricionista e personal trainer.
- Chat/assistente como elemento central de apoio a construcao do servico.
- Carrossel vertical com mensagens principais:
  - "O sistema que vai te auxiliar a construir uma vida mais saudavel"
  - "Personal trainer: criando exercicios sob medida"
  - "Nutricionista: mudando a forma de se alimentar"
- Secoes padrao:
  - inscreva-se;
  - associe-se;
  - entre em contato;
  - relatos;
  - avaliacoes;
  - historia da empresa;
  - planos para cada area.

### Captacao e notificacoes

- Formularios publicos devem gerar leads no painel admin.
- Admin deve receber notificacoes no site.
- O sistema deve preparar notificacoes por e-mail para checagem dos contatos recebidos.

### Cadastro do cliente

Quando o usuario final se cadastrar, deve preencher uma ficha de anamnese para orientar o profissional responsavel.

Sugestao de tabelas:

- `fitness_client_profiles`: dados complementares do cliente, objetivos, restricoes e anamnese.
- `fitness_nutritionist_profiles`: dados profissionais do nutricionista, registro profissional, especialidades e status de validacao.
- `fitness_trainer_profiles`: dados profissionais do personal trainer, registro profissional, especialidades e status de validacao.

Essas tabelas complementam `fitness_users`, que continua sendo a tabela base de autenticacao e papel do usuario.

### Uploads

Uploads de fotos, documentos e videos podem usar Supabase Storage, com metadados no banco e revisao pelo admin quando necessario.

Pontos de atencao:

- buckets separados por finalidade;
- regras de acesso por papel;
- limite de tamanho e tipo de arquivo;
- status de revisao para videos profissionais;
- registro de quem enviou e quem aprovou.
