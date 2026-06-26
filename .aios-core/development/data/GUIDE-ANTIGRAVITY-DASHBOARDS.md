# Mini Guia: Usando AIOS Agents para Implementar Professional Dashboards

**Para:** Usuário que quer usar Antigravity (orquestração de agents)
**Tempo estimado:** Leitura 5min, Execução 10-15 dias (paralelo)
**Prerequisito:** Ter lido o Epic (`epic-professional-dashboards.md`)

---

## 🎯 O que é Antigravity?

Antigravity = **orquestração de AI agents que trabalham em paralelo** na CLI.

Você não precisa fazer o trabalho — você **delega para agents especializados** e eles fazem. Cada agent tem um comando específico (`*develop`, `*validate`, `*qa-gate`, etc.).

---

## 📋 Fluxo de Trabalho com Agents

```
YOU (PM)                                AGENTS (Antigravity)
│
├─ 1. Cria Epic ✓ (VOCÊ FEZ)
│  └─ epic-professional-dashboards.md
│
├─ 2. Cria Especificação ✓ (VOCÊ FEZ)
│  └─ specifikation-dashboards.md
│
├─ 3. Ativa @sm → *draft
│  │
│  └─ @sm cria 3 Stories:
│     ├─ PROF-DASH-001-003 (Backend)
│     ├─ PROF-DASH-001-001 (Nutritionist UI)
│     └─ PROF-DASH-001-002 (Trainer UI)
│
├─ 4. Ativa @po → *validate-story-draft
│  │
│  └─ @po valida cada story (10-point checklist)
│     ├─ Status Draft → Ready (se GO)
│     └─ Retorna ao @sm se NO-GO (precisa fixes)
│
├─ 5. Ativa @dev → *develop
│  │
│  ├─ @dev implementa PROF-DASH-001-003 (Backend)
│  │  ├─ Adiciona tabelas em shared/schema.ts
│  │  ├─ Cria endpoints em server/routes.ts
│  │  └─ Executa npm run db:push
│  │
│  ├─ @dev implementa PROF-DASH-001-001 (Nutritionist UI)
│  │  ├─ Cria componentes
│  │  ├─ Integra com API
│  │  └─ Testes
│  │
│  └─ @dev implementa PROF-DASH-001-002 (Trainer UI)
│     ├─ Reutiliza componentes shared
│     ├─ Adapta para trainer
│     └─ Testes
│
├─ 6. Ativa @qa → *qa-gate
│  │
│  └─ @qa valida (7 quality checks):
│     ├─ Code review
│     ├─ Unit tests (80% coverage)
│     ├─ Acceptance criteria met
│     ├─ No regressions
│     ├─ Performance OK
│     ├─ Security OK
│     ├─ Documentation OK
│
│  ┌─ Se FAIL: Volta ao @dev para fixes
│  └─ Se PASS: Vai para próximo step
│
└─ 7. Ativa @devops → git push + PR
   │
   └─ @devops:
      ├─ Faz git add/commit
      ├─ Cria PR
      └─ Merge para main

```

---

## 🚀 Comandos Passo a Passo

### **STEP 1: Ativar @sm para criar Stories** (5min)

```bash
@sm
```

**O que vai aparecer:**
```
📖 River (Story Master) ready. Let's create stories!
Comandos disponíveis:
  *draft           - Create a new story
  *create-story    - Same as *draft
  *validate        - Validate existing story
  *help            - Show all commands
```

**Comando 1a: Criar Story 3 (Backend)**

```bash
*draft
```

Responda:
- **Epic ID?** `PROF-DASH-001`
- **Story Title?** `Backend Endpoints & Database Schema for Professional Dashboards`
- **Story Number?** `003` (importante: PRIMEIRA story = backend!)
- **Complexity (points)?** `8`
- **Description?** Copie do epic: "Implementar endpoints backend e schema..."

River vai criar arquivo: `.context/stories/PROF-DASH-001-003.story.md`

**Comando 1b: Criar Story 1 (Nutritionist UI)**

```bash
*draft
```

Responda:
- **Epic ID?** `PROF-DASH-001`
- **Story Title?** `Dashboard do Nutricionista`
- **Story Number?** `001`
- **Complexity (points)?** `5`
- **Description?** Do epic

River cria: `.context/stories/PROF-DASH-001-001.story.md`

**Comando 1c: Criar Story 2 (Trainer UI)**

```bash
*draft
```

Responda:
- **Epic ID?** `PROF-DASH-001`
- **Story Title?** `Dashboard do Personal Trainer`
- **Story Number?** `002`
- **Complexity (points)?** `5`

River cria: `.context/stories/PROF-DASH-001-002.story.md`

**⚠️ IMPORTANTE: Ordem**
- Story 003 (backend) DEVE ser feita ANTES das Stories 001 e 002
- Marque Story 001 e 002 como **"Blocked by PROF-DASH-001-003"**

```bash
*exit  # Sai do modo @sm
```

---

### **STEP 2: Ativar @po para Validar Stories** (10min por story)

```bash
@po
```

**O que aparece:**
```
✅ Pax (Product Owner) ready to validate stories!
Comandos:
  *validate-story-draft [story-id]  - Valida uma story
  *help
```

**Comando 2a: Validar Story 003**

```bash
*validate-story-draft PROF-DASH-001-003
```

@po executa **10-point checklist**:
1. ✓ Título claro e objetivo?
2. ✓ Descrição completa?
3. ✓ Acceptance criteria testáveis (Gherkin)?
4. ✓ Scope claro (IN/OUT)?
5. ✓ Dependências mapeadas?
6. ✓ Complexity estimate OK?
7. ✓ Business value claro?
8. ✓ Riscos documentados?
9. ✓ Criteria of Done claro?
10. ✓ Alinhada com PRD/Epic?

Se **GO (≥7/10):**
- @po marca status Draft → Ready
- Você vê: ✅ Story PROF-DASH-001-003 is READY

Se **NO-GO (<7):**
- @po lista required fixes
- Volta ao @sm para ajustar

**Comando 2b e 2c: Repetir para Stories 001 e 002**

```bash
*validate-story-draft PROF-DASH-001-001
*validate-story-draft PROF-DASH-001-002
```

```bash
*exit  # Sai do modo @po
```

---

### **STEP 3: Ativar @dev para Implementar** (5-7 dias para Story 003, 3-4 dias cada para 001 e 002)

```bash
@dev
```

**O que aparece:**
```
💻 Dex (Developer) ready to build!
Comandos:
  *develop [story-id]        - Implementa story (modo Interactive)
  *develop-yolo [story-id]   - Modo autônomo (menos prompts)
  *develop-preflight [...]   - Modo plan-first (faz plano antes de código)
  *help
```

**Comando 3a: Implementar Story 003 (Backend) — PRIMEIRA**

```bash
*develop PROF-DASH-001-003
```

@dev vai:
1. Ler o epic + story detalhadamente
2. Ler a especificação arquitetural
3. Perguntar alguns "checkpoints educacionais" sobre decisões
4. Começar a implementar em sequência:
   - [ ] Adicionar campos ao users em shared/schema.ts
   - [ ] Criar tabelas Drizzle (nutritionist_profiles, trainer_profiles, etc.)
   - [ ] Criar Zod schemas de response
   - [ ] Criar middleware de auth (requireAuth, requireRole)
   - [ ] Implementar handlers em server/routes.ts
   - [ ] Executar npm run db:push
   - [ ] Adicionar rate limiting
   - [ ] Escrever testes Supertest
5. Atualizar checkboxes na story conforme completa
6. Executar `npm run lint` + `npm run typecheck`
7. Rodar CodeRabbit para auto-fix de issues

**Quando termina Story 003:**
@dev marca Story 003 como "InProgress → InReview" e agenda @qa para validar.

**Comando 3b: Implementar Story 001 (Nutritionist UI) — DEPOIS de Story 003 estar READY**

```bash
*develop PROF-DASH-001-001
```

@dev cria:
- [ ] Componentes compartilhados (StatCard, ClientCard, ClientTable, etc.)
- [ ] Componentes nutritionist (MacroBreakdownCard, MealPlanCard, etc.)
- [ ] Pages (nutritionist/dashboard, nutritionist/clients, nutritionist/client-detail)
- [ ] Hooks (use-nutritionist.ts)
- [ ] Integração com API
- [ ] Testes de componente (80% coverage)
- [ ] Atualizar App.tsx com rotas
- [ ] Atualizar mockData.ts com nutritionistNavItems

**Comando 3c: Implementar Story 002 (Trainer UI) — DEPOIS de Story 001 estar READY**

```bash
*develop PROF-DASH-001-002
```

@dev reutiliza componentes compartilhados de 001 e:
- [ ] Componentes trainer-específicos (AdherenceRingChart, WorkoutAssignCard)
- [ ] Pages (trainer/dashboard, trainer/clients, trainer/client-detail)
- [ ] Hooks (use-trainer.ts)
- [ ] Testes
- [ ] Integração com API
- [ ] Atualizar App.tsx
- [ ] Atualizar mockData.ts com trainerNavItems

```bash
*exit  # Sai do modo @dev
```

---

### **STEP 4: Ativar @qa para Validar** (1-2 dias por story)

```bash
@qa
```

**O que aparece:**
```
🔍 Quinn (QA Engineer) ready to validate!
Comandos:
  *qa-gate [story-id]        - Executa 7 quality checks
  *qa-loop [story-id]        - Inicia loop review-fix automático
  *help
```

**Comando 4a: QA da Story 003**

```bash
*qa-gate PROF-DASH-001-003
```

@qa valida **7 checks**:
1. ✓ Code review (patterns, readability)
2. ✓ Unit tests (80% coverage, todas passam)
3. ✓ Acceptance criteria (todos cumpridos?)
4. ✓ No regressions (código existente ainda funciona?)
5. ✓ Performance (<2s para carregar dados?)
6. ✓ Security (SQL injection? XSS? auth OK?)
7. ✓ Documentation (README, comentários em código complexo)

**Possíveis Verdicts:**
- ✅ **PASS** → Aprovado! Pode fazer commit
- ⚠️ **CONCERNS** → Aprovado com observações (documenta)
- ❌ **FAIL** → Volta ao @dev com lista de issues
- 🔕 **WAIVED** → Aprova com exceção documentada (raro)

Se **FAIL:**
```bash
*qa-loop PROF-DASH-001-003
```

@qa inicia loop automático:
1. @qa faz review → encontra issue
2. @qa descreve o problema
3. @dev arruma
4. @qa re-revisa (max 5 iterações)
5. Se não resolve: escalação manual para @aios-master

**Comando 4b e 4c: Repetir para Stories 001 e 002**

```bash
*qa-gate PROF-DASH-001-001
*qa-gate PROF-DASH-001-002
```

```bash
*exit  # Sai do modo @qa
```

---

### **STEP 5: Ativar @devops para Push** (5min)

```bash
@devops
```

**O que aparece:**
```
🚀 Gage (DevOps Engineer) ready to deploy!
Comandos:
  *push [story-id]           - Faz git commit + push
  *create-pr [story-id]      - Cria PR no GitHub
  *help
```

**Comando 5a: Push Story 003**

```bash
*push PROF-DASH-001-003
```

@devops:
1. Lê a story e vê o que mudou
2. Faz `git add` dos arquivos modificados
3. Gera commit message automático (conventional commits)
4. Faz `git commit`
5. Faz `git push origin feature/aios-integration`

**Comando 5b: Criar PR**

```bash
*create-pr PROF-DASH-001-003
```

@devops cria PR no GitHub com:
- Título baseado na story
- Descrição com acceptance criteria
- Link para a story
- Pronto para merge após aprovação do code review

**Repetir para Stories 001 e 002:**

```bash
*push PROF-DASH-001-001
*create-pr PROF-DASH-001-001

*push PROF-DASH-001-002
*create-pr PROF-DASH-001-002
```

```bash
*exit  # Sai do modo @devops
```

---

## 📊 Quando Usar Qual Agent?

| Necessidade | Agent | Comando |
|---|---|---|
| "Preciso quebrar epic em stories" | @sm | `*draft` |
| "Preciso validar se story está bem escrita" | @po | `*validate-story-draft` |
| "Preciso implementar código" | @dev | `*develop` |
| "Preciso revisar código antes de mergear" | @qa | `*qa-gate` |
| "Preciso fazer git push e PR" | @devops | `*push`, `*create-pr` |
| "Preciso de análise arquitetural" | @architect | `*design` |
| "Preciso de deep research de mercado" | @analyst | `*research` |
| "Preciso corrigir curso do projeto" | @aios-master | `*correct-course` |

---

## ⚡ Dicas de Produtividade

### **Use Modo YOLO quando:**
- Task é bem mapeada e sem ambiguidades
- Quer implementação rápida
- Não precisa educar o team

```bash
@dev *develop-yolo PROF-DASH-001-003
```

### **Use Modo Interactive quando:**
- Task tem decisões arquiteturais a fazer
- Quer aprender enquanto executa
- Quer aproveitar para validar assumptions

```bash
@dev *develop PROF-DASH-001-001
```

### **Use Modo Pre-Flight quando:**
- Task é complexa e ambígua
- Quer ter plano detalhado ANTES de codificar
- Quer evitar retrabalho

```bash
@dev *develop-preflight PROF-DASH-001-002
```

---

## 🔄 Parallel Execution Strategy

**Você pode fazer isso em paralelo:**

```
DIA 1-7:  @dev implementa Story 003 (Backend)
  └─ Enquanto isso: @qa faz code review no PR de histórias anteriores

DIA 3-4:  @sm cria Stories 001 e 002 (enquanto @dev ainda faz 003)
DIA 3-4:  @po valida Stories 001 e 002 (enquanto @dev ainda faz 003)

DIA 8-12: @dev implementa Story 001 (Nutritionist UI)
  └─ Story 003 já merged para main

DIA 13-15: @dev implementa Story 002 (Trainer UI)
  └─ Story 001 já merged para main

DIA 8-15: @qa faz QA das Stories 1 e 2 em paralelo com @dev implementando
DIA 16:   @devops faz push + PR das 3 stories
```

**NÃO em paralelo** (dependências):
- ❌ Story 001/002 ANTES de Story 003 (backend é prerequisito)
- ❌ @dev implementar antes de @po validar (aprovação precisa vir primeiro)
- ❌ @devops push antes de @qa passar (QA é gate obrigatório)

---

## 📝 Checklist: Antes de Começar

- [ ] Epic criado: `epic-professional-dashboards.md` ✓
- [ ] Especificação criada: `SPEC-DASHBOARDS.md` (arquivo do Sonnet) ✓
- [ ] Este guia lido
- [ ] Projeto está em `feature/aios-integration` branch
- [ ] `npm install` executado
- [ ] `npm run dev` funciona localmente
- [ ] GitHub CLI autenticado: `gh auth status`

---

## 🆘 Se Algo der Errado

**Story fica STUCK em validação?**
```
@po *validate-story-draft PROF-DASH-001-003
→ Se feedback é confuso, escalate:
@aios-master *correct-course PROF-DASH-001-003
```

**@dev bate em erro técnico?**
```
@dev *develop PROF-DASH-001-001
→ Se erro persiste após 2 tentativas:
@architect *design [contexto do problema]
```

**QA loop não converge?**
```
@qa *qa-loop PROF-DASH-001-001
→ Após 5 iterações sem melhora:
@qa *escalate-qa-loop PROF-DASH-001-001
→ Vai para análise manual
```

**@devops não consegue fazer push?**
```
@devops *push PROF-DASH-001-003
→ Se erro é de permissões ou git config:
gh auth status  # Verifica autenticação
git status      # Verifica branch
```

---

## 🎓 Educational Value

Usando Antigravity você **aprende:**

| Agent | O que aprende |
|---|---|
| @sm | Como quebrar epics em stories bem-formadas |
| @po | Como validar requerimentos e AC's |
| @dev | Padrões de código do projeto, boas práticas |
| @qa | Como testar thoroughly, pensar em edge cases |
| @architect | Decisões arquiteturais, trade-offs |
| @devops | Git workflow, CI/CD, deployment |

**Dica:** Faça perguntas nos "checkpoints educacionais" que cada agent oferece!

---

## 📞 Próximos Passos

1. **Agora:** Ative `@sm` e comece a criar as 3 stories
2. **Amanhã:** Ative `@po` para validar as stories criadas
3. **Dia 3:** Ative `@dev` para implementar Story 003 (backend)
4. **Depois:** Siga o fluxo acima paralelizando onde possível

**Tempo total estimado:** 10-15 dias (depende da velocidade de implementação)

---

**Criado por:** Morgan (PM)
**Data:** 2026-02-21
**Para usar:** `@sm` → `@po` → `@dev` → `@qa` → `@devops`
