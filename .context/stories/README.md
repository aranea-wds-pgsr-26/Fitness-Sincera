# Professional Dashboards Epic - Stories Index

**Epic:** PROF-DASH-001
**Created:** 2026-02-21
**Author:** @sm

## Overview

3 stories criadas para implementar dashboards profissionais para Nutricionista e Personal Trainer. Siga a **ordem de execução abaixo** pois há dependências.

---

## Story Index

### 1. Backend Endpoints & Database Schema (Dependência)
- **File:** [PROF-DASH-001-003.story.md](./PROF-DASH-001-003.story.md)
- **ID:** PROF-DASH-001-003
- **Status:** Draft
- **Complexity:** 8 pts
- **Priority:** Critical
- **Execution Order:** PRIMEIRO

**O que fazer:**
- Criar migrations do Drizzle para tabelas profissionais
- Implementar 8 endpoints de API (4 Nutricionista + 4 Trainer)
- Adicionar autenticação/autorização
- Escrever testes com Supertest (80%+ coverage)

**Responsibilities:** @dev
**Review by:** @qa
**Push by:** @devops

---

### 2. Dashboard do Nutricionista (UI)
- **File:** [PROF-DASH-001-001.story.md](./PROF-DASH-001-001.story.md)
- **ID:** PROF-DASH-001-001
- **Status:** Draft
- **Complexity:** 5 pts
- **Priority:** High
- **Execution Order:** SEGUNDO (depende de PROF-DASH-001-003)

**O que fazer:**
- Criar página `/nutritionist/dashboard` com layout completo
- Implementar cards de estatísticas (total, em risco, aderência)
- Tabela responsiva de clientes com filtros e busca
- Gráfico de consumo calórico semanal
- Modal de detalhe com nutrition metrics
- Testes unitários (80%+ coverage)

**Design Colors:**
- Primary: `#d4f54c` (lime)
- Background: `#e9e9e9` (light gray)

**Responsibilities:** @dev
**Review by:** @qa
**Push by:** @devops

---

### 3. Dashboard do Personal Trainer (UI)
- **File:** [PROF-DASH-001-002.story.md](./PROF-DASH-001-002.story.md)
- **ID:** PROF-DASH-001-002
- **Status:** Draft
- **Complexity:** 5 pts
- **Priority:** High
- **Execution Order:** TERCEIRO (depende de PROF-DASH-001-003)

**O que fazer:**
- Criar página `/trainer/dashboard` com layout completo
- Implementar cards de estatísticas (total, baixa aderência, performance)
- Tabela responsiva de alunos com filtros e busca
- Gráfico de volume de treinos semanal
- Modal de detalhe com workout progress e PRs
- Testes unitários (80%+ coverage)
- Reutilizar componentes specialist de PROF-DASH-001-001

**Design Colors:**
- Primary: `#7c69ef` (purple)
- Background: `#111111` (dark)

**Responsibilities:** @dev
**Review by:** @qa
**Push by:** @devops

---

## Execution Sequence

```
Week 1: Backend
├─ @dev: Implement PROF-DASH-001-003
│  ├─ Migrations
│  ├─ Endpoints
│  ├─ Auth/Authz
│  └─ Tests
├─ @qa: Review PROF-DASH-001-003
│  └─ CodeRabbit + Quality Gate
└─ @devops: Push PROF-DASH-001-003

Week 2: Nutritionist UI
├─ @dev: Implement PROF-DASH-001-001
│  ├─ Pages & Components
│  ├─ API Integration
│  └─ Tests
├─ @qa: Review PROF-DASH-001-001
│  └─ CodeRabbit + Quality Gate
└─ @devops: Push PROF-DASH-001-001

Week 3: Trainer UI
├─ @dev: Implement PROF-DASH-001-002
│  ├─ Pages & Components (reuse from Story 1)
│  ├─ API Integration
│  └─ Tests
├─ @qa: Review PROF-DASH-001-002
│  └─ CodeRabbit + Quality Gate
└─ @devops: Push PROF-DASH-001-002
```

---

## Dependency Graph

```
PROF-DASH-001-003 (Backend)
├─ PROF-DASH-001-001 (Nutritionist UI)
└─ PROF-DASH-001-002 (Trainer UI)
```

**Important:** Stories 1 e 2 podem rodar em paralelo APÓS Story 3 estar READY.

---

## Key Success Metrics

- Dashboard carrega em <2 segundos
- 80%+ cobertura de testes
- 0 CRITICAL/HIGH issues no CodeRabbit
- 100% acceptance criteria atendidos
- Mobile-first responsive (375px+)
- Zero breaking changes no código existente

---

## Story Template Sections

Todas as 3 stories seguem este padrão:

```markdown
# Story: [Title]

- Story ID / Epic ID / Status / Created / Complexity / Priority
- Description + Business Value
- ✅ Acceptance Criteria (em Gherkin)
- 📦 In Scope / 🚫 Out of Scope
- 🔗 Dependencies
- 📊 Acceptance Criteria Checklist
- 🎯 Criteria of Done
- 📁 File List (novos + modificados)
- 🎨 Design System Reference (cores, componentes)
- 🧪 Testing Strategy
- 📖 Dev Notes
- 🔄 Related Stories
- 📝 Change Log
```

---

## Quick Navigation

| Story | File | Quick Links |
|-------|------|-------------|
| Backend (003) | [PROF-DASH-001-003.story.md](./PROF-DASH-001-003.story.md) | [AC](#acceptance-criteria) \| [In Scope](#in-scope) \| [Dev Notes](#dev-notes) |
| Nutritionist UI (001) | [PROF-DASH-001-001.story.md](./PROF-DASH-001-001.story.md) | [AC](#acceptance-criteria) \| [Design](#design-system-reference) \| [Tests](#testing-strategy) |
| Trainer UI (002) | [PROF-DASH-001-002.story.md](./PROF-DASH-001-002.story.md) | [AC](#acceptance-criteria) \| [Design](#design-system-reference) \| [Tests](#testing-strategy) |

---

## AIOS Workflow Integration

### Phase 1: Create (Story Creation) - DONE
```
@sm *draft "PROF-DASH-001 Stories" ✓
```

### Phase 2: Validate (Story Validation)
```
@po *validate-story-draft PROF-DASH-001-003
@po *validate-story-draft PROF-DASH-001-001
@po *validate-story-draft PROF-DASH-001-002
```

### Phase 3: Implement (Story Development)
```
@dev *develop PROF-DASH-001-003 (backend first!)
@dev *develop PROF-DASH-001-001 (after 003 ready)
@dev *develop PROF-DASH-001-002 (after 003 ready)
```

### Phase 4: QA Gate (Quality Assurance)
```
@qa *qa-gate PROF-DASH-001-003
@qa *qa-gate PROF-DASH-001-001
@qa *qa-gate PROF-DASH-001-002
```

### Phase 5: Push (DevOps)
```
@devops *push PROF-DASH-001-003
@devops *push PROF-DASH-001-001
@devops *push PROF-DASH-001-002
```

---

## Notes

- **Português:** Toda a comunicação deve ser em português
- **Order matters:** Story 003 DEVE ser feita primeiro
- **Reusar componentes:** Story 002 reutiliza components de Story 001
- **Design consistency:** Cores e padrões devem ser mantidos
- **Backend-first approach:** Endpoints devem estar prontos antes de UI
- **Testing is mandatory:** 80%+ coverage é obrigatório

---

**Created:** 2026-02-21
**Version:** 1.0 (Draft)
**Last Updated:** 2026-02-21

