# Story: Dashboard do Personal Trainer

**Story ID:** PROF-DASH-001-002
**Epic ID:** PROF-DASH-001
**Status:** Draft
**Created:** 2026-02-21
**Complexity:** 5 pts
**Priority:** High

---

## 📋 Description

Personal Trainer pode visualizar overview de seus alunos, progresso de treinos, performance em séries/repetições e aderência aos programas. Dashboard com interface voltada para acompanhamento de performance e progresso, permitindo filtros, busca e acesso rápido aos detalhes de desempenho de cada aluno.

**Business Value:** Habilita personal trainers a gerenciar múltiplos alunos com visualização clara de métricas de performance, facilitando ajustes de programas e acompanhamento de progresso.

---

## ✅ Acceptance Criteria

### Scenario 1: Personal Trainer Acessa seu Dashboard
```gherkin
Given personal trainer autenticado com role='trainer'
When acessar rota /trainer/dashboard
Then deve ver dashboard layout com:
  ✓ Header com avatar, nome e logout button
  ✓ Card "Total de Alunos" com número e icon
  ✓ Card "Alunos com Baixa Aderência" com badge e alerta visual
  ✓ Card "Performance Média" com percentual
  ✓ Gráfico de volume de treinos semanal (Chart.js ou Recharts)
  ✓ Tabela de alunos com nome, último treino, performance score
  ✓ Timeline de sessões completadas recentemente
```

### Scenario 2: Tabela de Alunos com Filtros
```gherkin
Given trainer visualizando tabela de alunos
When clicar em dropdown de filtro "Performance"
Then deve ver opções:
  ✓ Todos (default)
  ✓ Consistência Alta (>80%)
  ✓ Consistência Média (60-80%)
  ✓ Consistência Baixa (<60%)

When selecionar filtro "Consistência Baixa"
Then tabela deve mostrar:
  ✓ Apenas alunos com aderência <60%
  ✓ Badge visível indicando "baixa aderência"
  ✓ Último treino em destaque
  ✓ Performance score colorido (vermelho/amarelo/verde)
```

### Scenario 3: Busca por Aluno
```gherkin
Given trainer na dashboard
When digitar nome de aluno no campo search
Then resultados devem:
  ✓ Filtrar em tempo real (debounce 300ms)
  ✓ Mostrar alunos que match com nome
  ✓ Limpar search ao clicar X
  ✓ Retornar todos se search vazio
```

### Scenario 4: Ver Detalhes de Progresso do Aluno
```gherkin
Given trainer clicando em aluno na tabela
When acessar /trainer/clients/:clientId/progress
Then deve abrir modal/página com:
  ✓ Nome completo do aluno
  ✓ Próximo treino agendado (data e horário)
  ✓ Histórico das últimas 5 sessões com:
    - Data
    - Tipo de treino
    - Duração
    - Exercícios completados
  ✓ PRs (personal records) registrados:
    - Exercício
    - Peso/Carga
    - Data do PR
  ✓ Volume total semanal em kg
  ✓ Consistência (percentual de treinos completados)
  ✓ Botão "Ajustar Programa" para editar workout program
  ✓ Close button (X)
```

### Scenario 5: Gráfico de Volume de Treinos
```gherkin
Given dashboard aberto
When gráfico de volume semanal renderizar
Then deve mostrar:
  ✓ Eixo X: dias da semana (seg-dom)
  ✓ Eixo Y: volume total em kg (0-10000)
  ✓ Barras para cada dia
  ✓ Tooltip ao hover com valor exato
  ✓ Legenda clara (cores: #7c69ef para volume, #666 para baseline)
  ✓ Comparação com média semanal anterior (linha tracejada)
```

### Scenario 6: Responsividade Mobile
```gherkin
Given dashboard em dispositivo mobile (375px)
When layout renderizar
Then deve:
  ✓ Stack cards verticalmente
  ✓ Tabela ficar scrollável horizontalmente
  ✓ Gráfico ajustar tamanho
  ✓ Menu hambúrguer funcional (se necessário)
  ✓ Botões com touch targets >44px
  ✓ Performance scores visíveis em coluna dedicada
```

### Scenario 7: Testes Unitários Passando
```gherkin
Given suite de testes da componente
When executar npm test -- PROF-DASH-001-002
Then todos testes devem passar:
  ✓ Component renders sem crash
  ✓ Filtros funcionam corretamente
  ✓ Search debounce funciona
  ✓ Gráfico renderiza
  ✓ API calls são feitas corretamente
```

---

## 📦 In Scope

- [x] Page layout `/trainer/dashboard` (full responsive)
- [x] Card components: total alunos, baixa aderência, performance média
- [x] Tabela de alunos responsiva com sorting
- [x] Filtros por performance (todos/alta/média/baixa)
- [x] Campo de busca com debounce
- [x] Gráfico de volume semanal (Chart.js)
- [x] Modal/página de detalhes do aluno (workout progress)
- [x] Timeline de sessões completadas
- [x] Histórico últimas 5 sessões
- [x] PRs (personal records) listados
- [x] Volume total semanal em kg
- [x] Botão para ajustar workout program (lógica futura)
- [x] Design consistente com paleta #7c69ef / #111111
- [x] Mobile-first responsive (375px até desktop)
- [x] Testes unitários (80%+ coverage)

---

## 🚫 Out of Scope

- Video form check integration (future feature)
- Análise biomecânica com IA
- Integração com wearables (Fitbit, Apple Watch, etc)
- Exportação de programas em PDF
- Histórico maior que 5 sessões (será adicionado depois)
- Edição avançada de workout programs (será story futura)
- Notificações push
- Dark mode (ainda não)

---

## 🔗 Dependencies

**Deve estar READY (validada por @po):**
- PROF-DASH-001-003 (Backend endpoints obrigatório)

**Pode reutilizar de Stories anteriores:**
- Componentes de specialist (`ClientCard.tsx`, `ClientList.tsx`, etc) da Story PROF-DASH-001-001
- Padrão de hooks e API calls

**Pré-requisitos técnicos:**
- React 19.2+ rodando
- TanStack Query configurado (caching)
- Tailwind CSS 4.1
- Shadcn/ui components disponíveis
- Chart.js ou Recharts instalado
- TypeScript types de PROF-DASH-001-003

---

## 📊 Acceptance Criteria Checklist

- [ ] Dashboard page renderiza sem erros
- [ ] 3/3 cards de estatísticas exibindo dados
- [ ] Tabela mostra alunos com paginação/sorting
- [ ] Filtros funcionam (4 opções de performance)
- [ ] Busca funciona com debounce 300ms
- [ ] Gráfico renderiza corretamente com volume em kg
- [ ] Modal de detalhe mostra todas as informações
- [ ] PRs aparecem com exercício, peso e data
- [ ] Responsive funciona em 375px, 768px, 1440px
- [ ] 80%+ cobertura de testes
- [ ] 0 console.error/warnings
- [ ] 0 CRITICAL/HIGH issues no CodeRabbit

---

## 🎯 Criteria of Done

- [x] Código passa `npm run lint` sem warnings
- [x] Código passa `npm run typecheck` sem errors
- [x] 80%+ cobertura de testes (unit + integration)
- [x] Todos acceptance criteria atendidos (100%)
- [x] Design segue paleta #7c69ef / #111111 / #1a1a1a
- [x] Mobile-first responsive testado
- [x] CodeRabbit scan resultado: PASS (0 CRITICAL/HIGH)
- [x] PR revisado por @qa (verdict: PASS ou CONCERNS)
- [x] Merged para main por @devops

---

## 📁 File List

**Novos arquivos a criar:**

```
client/src/
├── pages/
│   └── trainer-dashboard.tsx               (main page component)
├── components/
│   ├── trainer/
│   │   ├── TrainerDashboard.tsx            (container component)
│   │   ├── ClientWorkoutProgress.tsx       (workout detail modal)
│   │   ├── WorkoutAssignCard.tsx           (program overview)
│   │   ├── WorkoutVolumeChart.tsx          (gráfico volume)
│   │   └── PerformanceBadge.tsx            (performance indicator)
│   └── specialist/
│       ├── ClientCard.tsx                  (stat card) - REUTILIZAR de STORY 1
│       ├── ClientList.tsx                  (tabela) - ADAPT de STORY 1
│       ├── MetricsGrid.tsx                 (grid de cards) - REUTILIZAR
│       └── AdhereanceAlert.tsx             (alerta aderência baixa)
├── hooks/
│   └── useTrainerClients.ts                (TanStack Query hook)
└── tests/
    ├── TrainerDashboard.test.tsx
    ├── ClientWorkoutProgress.test.tsx
    └── WorkoutVolumeChart.test.tsx
```

**Arquivos a modificar:**

```
client/src/
├── App.tsx                                 (adicionar rota /trainer/dashboard)
├── lib/api.ts                              (adicionar endpoints trainer)
└── routes.tsx ou useRoutes()               (registrar rota)
```

---

## 🎨 Design System Reference

**Colors:**
- Primary Accent: `#7c69ef` (purple - highlights)
- Background: `#111111` (dark gray almost black)
- Cards: `#1a1a1a` (dark charcoal)
- Text Light: `#ffffff` (white)
- Low Adherence: `#ff6b6b` (red alert)
- High Performance: `#51cf66` (green success)
- Neutral: `#666666` (medium gray)

**Components:**
- Cards: `rounded-[24px] shadow-md bg-[#1a1a1a]` (dark mode cards)
- Buttons: `px-4 py-2 rounded-lg bg-[#7c69ef] text-[#ffffff]`
- Inputs: `border border-[#444] rounded-lg px-3 py-2 bg-[#1a1a1a] text-white`
- Badges: Performance score com código de cores

**Layout:**
- Header: flex, justify-between, p-6 on dark background
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Table: responsive com overflow-x, dark mode styling

---

## 🧪 Testing Strategy

**Unit Tests (Components):**
- Testar rendering sem dados (loading state)
- Testar rendering com dados mock de treinos
- Testar cliques e interações (filtros, busca, expande detalhes)
- Testar chamadas de API (mocked com MSW)
- Testar responsividade em breakpoints

**Integration Tests:**
- Testar fluxo completo: abrir dashboard → filtrar por performance → ver detalhe
- Testar chamadas reais de API (com backend mock)
- Testar navegação entre páginas

**E2E Tests (optional):**
- Testar com Playwright/Cypress se recurso disponível
- Simular trainer real usando dashboard

**Coverage Target:** 80%+ (linhas de código)

---

## 📖 Dev Notes

- Usar React Context ou TanStack Query para state management
- Debounce em busca usando `lodash.debounce` ou `useCallback`
- Lazy load gráfico se performance for problema
- Cachear dados de alunos por 5 minutos
- Invalidar cache ao voltar para dashboard
- Performance score: usar código de cores (verde >80%, amarelo 60-80%, vermelho <60%)
- Acessibilidade: usar semantic HTML, labels em inputs, ARIA labels
- Keyboard navigation em tabela (setas, enter)
- Reutilizar componentes de specialist de PROF-DASH-001-001 (ClientCard, ClientList, MetricsGrid)
- Melhorar performance com React.memo em cards

---

## 🔄 Related Stories

**Bloqueia:** Nenhuma
**Bloqueado por:** PROF-DASH-001-003 (backend obrigatório)
**Pode reutilizar:** PROF-DASH-001-001 (componentes specialist)
**Referências:** Epic PROF-DASH-001

---

## 📝 Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-02-21 | @sm | Story criada baseada no epic |

---

