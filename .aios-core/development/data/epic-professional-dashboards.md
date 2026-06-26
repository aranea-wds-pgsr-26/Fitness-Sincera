# Epic: Professional Dashboards for Nutritionist & Personal Trainer

**Epic ID:** PROF-DASH-001
**Status:** Draft
**Created:** 2026-02-21
**PM:** Morgan

---

## 📋 Executive Summary

Implementar dois dashboards profissionais separados para especialistas (Nutricionista e Personal Trainer) que permitam gerenciar seus clientes, acompanhar progresso e tomar decisões baseadas em dados. Cada dashboard segue rotas diferentes e padrões arquiteturais profissionais.

**Business Value:** Habilita profissionais a gerenciar múltiplos clientes com interface otimizada para suas necessidades específicas.

---

## 🎯 Goals

- [ ] Criar Dashboard do Nutricionista (/nutritionist/dashboard)
- [ ] Criar Dashboard do Personal Trainer (/trainer/dashboard)
- [ ] Implementar separação de rotas e roles
- [ ] Manter consistência visual com design atual
- [ ] Garantir performance com dados em tempo real
- [ ] Adicionar componentes reutilizáveis

**Success Metrics:**
- Dashboard carrega em <2s
- 100% de cobertura de testes
- Zero breaking changes no código existente

---

## 🏗️ Architecture Overview

### **Roteamento Hierárquico**

```
Frontend Routes:
├─ /dashboard                 (cliente - health overview)
├─ /nutricao                  (cliente - meal management)
├─ /treino                    (cliente - workout tracking)
├─ /perfil                    (cliente/shared - profile)
│
├─ /nutritionist              (especialista root)
│  ├─ /nutritionist/dashboard (main nutritionist view)
│  ├─ /nutritionist/clients   (client list)
│  └─ /nutritionist/analytics (performance & trends)
│
└─ /trainer                   (especialista root)
   ├─ /trainer/dashboard      (main trainer view)
   ├─ /trainer/clients        (client list)
   └─ /trainer/analytics      (performance & trends)

Backend Routes:
/api/nutritionist/*
/api/trainer/*
(separado do /api para clientes)
```

### **Database Relationships**

```
users (auth)
├─ user_profiles (name, email, age, etc)
│  ├─ nutritionist_profiles (specialization, clients)
│  └─ trainer_profiles (certifications, clients)
│
├─ clients_nutritionist (many-to-many)
│  └─ client_nutrition_metrics (daily logs)
│
└─ clients_trainer (many-to-many)
   └─ client_workout_sessions (tracking)
```

### **Component Architecture**

```
components/
├─ specialist/                    (NEW - shared for both)
│  ├─ ClientCard.tsx              (reusable card)
│  ├─ ClientList.tsx              (with pagination/filters)
│  ├─ MetricsGrid.tsx             (stats display)
│  └─ TrendChart.tsx              (Chart.js integration)
│
├─ nutritionist/                  (NEW - nutritionist specific)
│  ├─ NutritionistDashboard.tsx    (main page)
│  ├─ ClientNutritionMetrics.tsx   (daily consumption)
│  └─ MealPlanCard.tsx             (assign plans)
│
└─ trainer/                       (NEW - trainer specific)
   ├─ TrainerDashboard.tsx         (main page)
   ├─ ClientWorkoutProgress.tsx    (workout tracking)
   └─ WorkoutAssignCard.tsx        (assign workouts)
```

---

## 📖 Stories

### **Story 1: Dashboard do Nutricionista**

**Story ID:** PROF-DASH-001-001
**Complexity:** 5 pts
**Status:** Draft

#### **Description**
Nutricionista pode visualizar overview de seus clientes, métricas de nutrição, consumo calórico e desempenho em relação às metas definidas.

#### **Acceptance Criteria**

```gherkin
Scenario: Nutricionista acessa seu dashboard
  Given nutricionista autenticado
  When acessar /nutritionist/dashboard
  Then deve ver:
    ✓ Total de clientes ativos (card)
    ✓ Clientes com alertas nutricionais (badge)
    ✓ Tabela de clientes com: nome, status, último check-in
    ✓ Gráfico de consumo calórico semanal
    ✓ Timeline de atividades dos clientes

Scenario: Filtrar clientes por status
  Given nutricionista visualizando lista
  When clicar em filtro "Em risco"
  Then deve mostrar apenas clientes abaixo/acima da meta

Scenario: Ver detalhes de nutrição de um cliente
  Given nutricionista clicando em cliente
  When acessar perfil de nutrição
  Then deve ver:
    ✓ Consumo diário (macros breakdown)
    ✓ Comparação com meta
    ✓ Histórico de 7 dias
    ✓ Botão para ajustar plano
```

#### **In Scope**
- Dashboard layout com cards de estatísticas
- Tabela de clientes responsiva
- Filtros e busca
- Gráficos básicos (Chart.js)
- Página de detalhe por cliente
- Mobile-first responsive

#### **Out of Scope**
- Análise IA de padrões
- Exportação de relatórios
- Integração com API externas de nutrição

#### **Dependencies**
- User role/permissions system (deve existir)
- Backend endpoints: `/api/nutritionist/clients`, `/api/nutritionist/metrics`
- Database: tabelas de clients_nutritionist e client_nutrition_metrics

#### **Design Reference**
Ver: `/Users/leosouza/Documents/projects/fitness-sincera/imagens de refencia /seção de alunos .png`

#### **Criteria of Done**
- [ ] Código passa lint + typecheck
- [ ] 80% cobertura de testes (unit + integration)
- [ ] Design segue padrão atual (#d4f54c accent, #e9e9e9 containers)
- [ ] Responsivo (mobile/tablet/desktop)
- [ ] CodeRabbit PASS (no CRITICAL/HIGH issues)
- [ ] PR aprovado por @qa
- [ ] Merged para main

---

### **Story 2: Dashboard do Personal Trainer**

**Story ID:** PROF-DASH-001-002
**Complexity:** 5 pts
**Status:** Draft

#### **Description**
Personal Trainer pode visualizar overview de seus alunos, progresso de treinos, performance em series/repetições e aderência aos programas.

#### **Acceptance Criteria**

```gherkin
Scenario: Personal Trainer acessa seu dashboard
  Given trainer autenticado
  When acessar /trainer/dashboard
  Then deve ver:
    ✓ Total de alunos ativos (card)
    ✓ Alunos com baixa aderência (badge alert)
    ✓ Tabela de alunos com: nome, último treino, performance
    ✓ Gráfico de volume de treinos semanal
    ✓ Timeline de sessões completadas

Scenario: Filtrar alunos por performance
  Given trainer visualizando lista
  When clicar em filtro "Consistência < 70%"
  Then deve mostrar apenas alunos com aderência baixa

Scenario: Ver detalhes de progresso de um aluno
  Given trainer clicando em aluno
  When acessar perfil de treino
  Then deve ver:
    ✓ Próximo treino agendado
    ✓ Histórico últimas 5 sessões
    ✓ PRs (personal records) registrados
    ✓ Volume total semanal
    ✓ Botão para ajustar programa
```

#### **In Scope**
- Dashboard layout com cards de estatísticas
- Tabela de alunos com performance metrics
- Filtros e busca
- Gráficos de volume/consistência (Chart.js)
- Página de detalhe por aluno
- Mobile-first responsive

#### **Out of Scope**
- Video form check integration
- Análise biomecânica IA
- Integração com wearables
- Exportação de programas em PDF

#### **Dependencies**
- User role/permissions system (deve existir)
- Backend endpoints: `/api/trainer/clients`, `/api/trainer/sessions`
- Database: tabelas de clients_trainer e client_workout_sessions

#### **Design Reference**
Ver: `/Users/leosouza/Documents/projects/fitness-sincera/imagens de refencia /elitetrainer-fit-dashboard-2026-02-21-14_55_56.png`

#### **Criteria of Done**
- [ ] Código passa lint + typecheck
- [ ] 80% cobertura de testes (unit + integration)
- [ ] Design segue padrão atual (#7c69ef accent, #111111 background)
- [ ] Responsivo (mobile/tablet/desktop)
- [ ] CodeRabbit PASS (no CRITICAL/HIGH issues)
- [ ] PR aprovado por @qa
- [ ] Merged para main

---

### **Story 3: Backend Endpoints & Database Schema**

**Story ID:** PROF-DASH-001-003
**Complexity:** 8 pts
**Status:** Draft
**Note:** DEVE SER FEITA ANTES das Stories 1 e 2

#### **Description**
Implementar endpoints backend e schema de database para suportar os dashboards de especialistas.

#### **API Endpoints**

```typescript
// Nutritionist
GET    /api/nutritionist/dashboard          (stats overview)
GET    /api/nutritionist/clients            (list with filters)
GET    /api/nutritionist/clients/:id        (detail + nutrition metrics)
PUT    /api/nutritionist/clients/:id/plan   (update meal plan)

// Trainer
GET    /api/trainer/dashboard               (stats overview)
GET    /api/trainer/clients                 (list with filters)
GET    /api/trainer/clients/:id             (detail + workout progress)
PUT    /api/trainer/clients/:id/program     (update workout program)
```

#### **Database Migrations**

```sql
-- Role field in users table
ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'client';
ALTER TABLE users ADD COLUMN is_specialist BOOLEAN DEFAULT false;

-- Nutritionist clients relationship
CREATE TABLE clients_nutritionist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nutritionist_id UUID NOT NULL,
  client_id UUID NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  meal_plan_id UUID,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  FOREIGN KEY (nutritionist_id) REFERENCES users(id),
  FOREIGN KEY (client_id) REFERENCES users(id)
);

-- Trainer clients relationship
CREATE TABLE clients_trainer (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id UUID NOT NULL,
  client_id UUID NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  current_program_id UUID,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  FOREIGN KEY (trainer_id) REFERENCES users(id),
  FOREIGN KEY (client_id) REFERENCES users(id)
);
```

#### **Acceptance Criteria**
- [ ] Todos endpoints implementados
- [ ] Migrations executadas
- [ ] Testes de API com Supertest
- [ ] Rate limiting aplicado
- [ ] Error handling padrão
- [ ] Autenticação/autorização implementada

---

## 🎨 Design System

### **Color Palette**

| Element | Nutritionist | Trainer |
|---------|--------------|---------|
| Primary Accent | #d4f54c (lime) | #7c69ef (purple) |
| Background | #e9e9e9 | #111111 |
| Cards | White | #1a1a1a |
| Text Dark | #1a1a1a (slate-900) | #ffffff |

### **Component Guidelines**

```tsx
// Card Pattern (reutilizável)
<div className="rounded-[24px] shadow-sm hover:shadow-md transition-shadow bg-white">
  {/* content */}
</div>

// Header Pattern
<header className="flex items-center justify-between p-6">
  {/* avatar + search + notifications */}
</header>

// Grid Pattern
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* responsive layout */}
</div>
```

---

## 📊 Success Metrics & Testing

### **Performance**
- Dashboard carrega em <2s
- API requests completam em <500ms
- Chart rendering <1s

### **Quality**
- 80% code coverage (unit + integration)
- 0 CRITICAL/HIGH issues no CodeRabbit
- 100% acceptance criteria met

### **Usability**
- Task completion time <5 clicks
- Mobile usability score >90
- No accessibility violations (WCAG 2.1)

---

## 📅 Timeline & Dependencies

**Execution Order (Sequential - importante!):**

1. **Story 3 PRIMEIRO** - Backend (DEPENDENCY)
   - Criar tabelas
   - Implementar endpoints
   - Testes de API
   - Estimado: 5-7 dias

2. **Story 1** - Nutritionist Dashboard (depois de Story 3)
   - Frontend implementation
   - Integração com API
   - Testes
   - Estimado: 3-4 dias

3. **Story 2** - Trainer Dashboard (depois de Story 1)
   - Reutiliza componentes de Story 1
   - Adaptação específica para trainer
   - Testes
   - Estimado: 2-3 dias

---

## 🔄 Workflow

```
Step 1: Epic Criado (VOCÊ - PM) ✓
       └─ Estrutura definida, rotas mapeadas

Step 2: @sm vai criar stories individuais
       └─ *draft "Story 3: Backend Endpoints"
       └─ *draft "Story 1: Nutritionist Dashboard"
       └─ *draft "Story 2: Trainer Dashboard"

Step 3: @po vai validar stories
       └─ *validate-story-draft (10-point checklist)

Step 4: @dev vai implementar
       └─ @dev *develop (Story 3)
       └─ @dev *develop (Story 1)
       └─ @dev *develop (Story 2)

Step 5: @qa vai testar
       └─ @qa *qa-gate (todas as stories)

Step 6: @devops faz push
       └─ git push + PR merge
```

---

## 📝 Notes

- Design atual não muda, apenas adapta-se
- Rotas separadas (`/nutritionist/`, `/trainer/`) mantém isolamento
- Backend-first approach (Story 3 before UI)
- Componentes reutilizáveis where possible
- Chart.js ou Recharts para gráficos

**Created By:** Morgan (PM)
**Last Updated:** 2026-02-21
**Version:** 1.0 (Draft)
