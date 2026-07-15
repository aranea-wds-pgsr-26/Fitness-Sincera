# Sprint 14 - Site Publico e Captacao

## Objetivo

Criar a primeira pagina publica da Fitness Sincera e conectar o formulario de interesse ao painel administrativo.

## Branch e tag

- Branch: `sprint-14-public-site`
- Tag planejada: `v0.17.0-public-site`

## Entregas

- Rota inicial `/` passou a exibir o site publico.
- Rota interna `/app` ficou responsavel pelo redirecionamento por perfil logado.
- Criada pagina publica com:
  - hero da Fitness Sincera;
  - carrossel vertical com mensagens principais;
  - secao de historia da empresa;
  - relatos e avaliacoes;
  - planos por area;
  - formulario de inscricao, associacao e contato.
- Criada tabela `fitness_site_leads`.
- Criada migration `0002_public_site_leads`.
- Criado `SiteLeadRepository`.
- Criada API publica:
  - `POST /api/public/leads`
- Criada API administrativa:
  - `GET /api/admin/site-leads`
- Dashboard admin passou a exibir:
  - quantidade de leads do site;
  - lista de solicitacoes recebidas.
- Criado script manual `manual:backend:public-site`.
- Criado alias `test:backend:public-site`.

## Decisoes

- A notificacao por email fica preparada como status de integracao pendente, sem envio real nesta sprint.
- O formulario publico grava leads para triagem do admin, mas ainda nao cria conta automaticamente.
- A ficha de anamnese fica para a sprint de onboarding do cliente.
- Perfis complementares de nutricionista, personal trainer e cliente devem ser modelados em tabelas separadas.

## Proposta de tabelas futuras

- `fitness_client_profiles`
- `fitness_client_anamneses`
- `fitness_nutritionist_profiles`
- `fitness_trainer_profiles`
- `fitness_professional_documents`

## Supabase Storage

O Supabase Storage faz sentido para fotos de usuarios, documentos profissionais e videos de exercicios. A recomendacao e criar buckets separados por tipo de arquivo e aplicar validacao por papel antes de liberar o acesso.

Buckets sugeridos:

- `avatars`
- `professional-documents`
- `exercise-videos`
- `progress-photos`

## Fora do escopo

- Envio real de email.
- Notificacao em tempo real no painel.
- Cadastro automatico de usuario final.
- Ficha de anamnese completa.
- Validacao documental de CRN, CREF ou outros registros profissionais.
- Pagamentos e planos monetizados.
- Deploy em Vercel.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run manual:backend:public-site`
- `npm.cmd run manual:backend:admin`
- `npm.cmd run build`

## Resultado

A plataforma agora possui uma entrada publica real, com captacao de interessados conectada ao painel administrativo.
