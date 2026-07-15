# Sprint 15 - Release Candidate

## Objetivo

Consolidar o estado pos-Sprint 14 em uma branch final para publicacao no GitHub e preparacao de deploy.

## Branch e tag

- Branch: `release/final-candidate`
- Tag planejada: `v0.18.0-release-candidate`

## Entregas

- Criada branch final a partir da Sprint 14.
- README atualizado para refletir a arquitetura atual.
- Checklist de release/deploy documentado.
- Estado atual do produto consolidado:
  - site publico;
  - login real;
  - painel admin;
  - captacao de leads;
  - modulos backend com Drizzle;
  - scripts manuais de teste.

## Fora do escopo

- Deploy real em Vercel.
- PR automatico, pois GitHub CLI nao esta instalado nesta maquina.
- Auth hardening.
- Email transacional.
- Pagamentos.

## Validacoes

- `npm.cmd run check`
- `npm.cmd run db:generate`
- `npm.cmd run build`

## Resultado

O projeto ficou pronto para ser enviado ao GitHub como candidato de release. A etapa seguinte recomendada e configurar deploy, variaveis de ambiente e banco no ambiente hospedado.
