# AIOS — Regras Essenciais (Consolidado)

> Resumo executivo. Detalhes completos em `.aios-core/development/data/`

## 1. Autoridade de Agentes

**Operacoes EXCLUSIVAS (bloqueadas para outros):**
- **@devops:** git push, PR create/merge, MCP management, CI/CD, releases
- **@po:** editar titulo/AC/scope de stories, validar stories (10-point checklist)
- **@sm:** criar stories (*draft, *create-story)
- **@pm:** epics (*create-epic, *execute-epic), spec pipeline

**@dev pode:** git add/commit/branch/checkout/stash/diff/log, editar File List/checkboxes de stories
**@dev NAO pode:** git push (delegar @devops), editar AC/scope (delegar @po)

**Fluxo principal:** @sm draft → @po validate → @dev develop → @qa gate → @devops push
**Escalacao:** Problema → @aios-master medeia

> Detalhes: `.aios-core/development/data/agent-authority-detail.md`

## 2. Story Lifecycle

**Status:** Draft → Ready → InProgress → InReview → Done
- @po valida: GO (>=7/10) → status Draft→Ready | NO-GO → fixes necessarios
- @qa gate: PASS / CONCERNS / FAIL / WAIVED (7 quality checks)
- Story file: AC/scope so @po edita | File List/checkboxes so @dev edita

**Modos de execucao @dev:** YOLO (autonomo) | Interactive (default) | Pre-Flight (plan-first)

> Detalhes: `.aios-core/development/data/story-lifecycle-detail.md`

## 3. Workflows

**4 workflows disponiveis:**
1. **SDC (Story Development Cycle):** create→validate→implement→qa-gate (PRIMARY)
2. **QA Loop:** review-fix iterativo (max 5), escalacao se bloqueado
3. **Spec Pipeline:** gather→assess→research→spec→critique→plan (pre-implementation)
4. **Brownfield Discovery:** 10 fases de assessment tecnico para projetos existentes

| Situacao | Workflow |
|----------|---------|
| Nova story de epic | SDC |
| QA encontrou issues | QA Loop |
| Feature complexa precisa spec | Spec Pipeline → SDC |
| Projeto existente | Brownfield Discovery |

> Detalhes: `.aios-core/development/data/workflow-detail.md`

## 4. IDS (Incremental Development System)

**Hierarquia:** REUSE > ADAPT > CREATE (sempre)
- REUSE: relevancia >=90%, usar direto
- ADAPT: relevancia 60-89%, mudancas <30%, nao quebrar consumers
- CREATE: justificativa obrigatoria, registrar em 24h

**Gates:** G1-G6 verificam em cada fase (advisory→blocking progressivamente)

> Detalhes: `.aios-core/development/data/ids-detail.md`

## 5. CodeRabbit

**Dev phase:** light mode, max 2 iteracoes, auto-fix CRITICAL/HIGH
**QA phase:** full mode, max 3 iteracoes, auto-fix CRITICAL/HIGH
**Regra:** CRITICAL persiste apos max iteracoes → HALT, intervencao manual
**Reports:** `docs/qa/coderabbit-reports/`

> Detalhes: `.aios-core/development/data/coderabbit-detail.md`

## 6. MCP Usage

**Regra critica:** SEMPRE preferir tools nativos (Read, Write, Bash, Grep, Glob) sobre MCP servers
- docker-gateway: SO para operacoes Docker/container ou acessar MCPs internos (EXA, Context7, Apify)
- playwright: SO para automacao de browser explicita
- MCP management: EXCLUSIVO @devops

> Detalhes: `.aios-core/development/data/mcp-usage-detail.md`
