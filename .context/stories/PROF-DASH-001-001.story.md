# Story: Dashboard do Nutricionista

**Story ID:** PROF-DASH-001-001
**Epic ID:** PROF-DASH-001
**Status:** Draft
**Created:** 2026-02-21
**Complexity:** 5 pts
**Priority:** High

---

## 📋 Description

Nutricionista pode visualizar overview de seus clientes, métricas de nutrição, consumo calórico e desempenho em relação às metas definidas. Dashboard com interface intuitiva que permite filtragem, busca e acesso rápido aos detalhes de nutrição de cada cliente.

**Business Value:** Habilita nutricionistas a gerenciar múltiplos clientes com visualização clara de métricas nutricionais, facilitando tomada de decisão para ajustes de planos de alimentação.

---

## ✅ Acceptance Criteria

### Scenario 1: Nutricionista Acessa seu Dashboard
```gherkin
Given nutricionista autenticado com role='nutritionist'
When acessar rota /nutritionist/dashboard
Then deve ver dashboard layout com:
  ✓ Header com avatar, nome e logout button
  ✓ Card "Total de Clientes" com número e icon
  ✓ Card "Clientes em Risco" com badge e alerta visual
  ✓ Card "Aderência Média" com percentual
  ✓ Gráfico de consumo calórico semanal (Chart.js ou Recharts)
  ✓ Tabela de clientes com nome, status, último check-in
  ✓ Timeline de atividades recentes dos clientes
```

### Scenario 2: Tabela de Clientes com Filtros
```gherkin
Given nutricionista visualizando tabela de clientes
When clicar em dropdown de filtro "Status"
Then deve ver opções:
  ✓ Todos (default)
  ✓ Ativos
  ✓ Em Risco
  ✓ Inativos

When selecionar filtro "Em Risco"
Then tabela deve mostrar:
  ✓ Apenas clientes com aderência <70%
  ✓ Badge visível indicando "em risco"
  ✓ Último check-in em destaque
```

### Scenario 3: Busca por Cliente
```gherkin
Given nutricionista na dashboard
When digitar nome de cliente no campo search
Then resultados devem:
  ✓ Filtrar em tempo real (debounce 300ms)
  ✓ Mostrar clientes que match com nome
  ✓ Limpar search ao clicar X
  ✓ Retornar todos se search vazio
```

### Scenario 4: Ver Detalhes de Nutrição do Cliente
```gherkin
Given nutricionista clicando em cliente na tabela
When acessar /nutritionist/clients/:clientId/nutrition
Then deve abrir modal/página com:
  ✓ Nome completo do cliente
  ✓ Consumo diário (macros breakdown: proteína, carboidrato, gordura)
  ✓ Comparação com meta diária (100% meta em verde, acima em amarelo)
  ✓ Histórico de últimos 7 dias com gráfico
  ✓ Botão "Ajustar Plano" para editar meal plan
  ✓ Close button (X)
```

### Scenario 5: Gráfico de Consumo Calórico
```gherkin
Given dashboard aberto
When gráfico semanal renderizar
Then deve mostrar:
  ✓ Eixo X: dias da semana (seg-dom)
  ✓ Eixo Y: calorias (0-2500)
  ✓ Linha com pontos para cada dia
  ✓ Tooltip ao hover com valor exato
  ✓ Legenda clara (cores: #d4f54c para meta, #999 para consumido)
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
```

### Scenario 7: Testes Unitários Passando
```gherkin
Given suite de testes da componente
When executar npm test -- PROF-DASH-001-001
Then todos testes devem passar:
  ✓ Component renders sem crash
  ✓ Filtros funcionam corretamente
  ✓ Search debounce funciona
  ✓ Gráfico renderiza
  ✓ API calls são feitas corretamente
```

---

## 📦 In Scope

- [x] Page layout `/nutritionist/dashboard` (full responsive)
- [x] Card components: total clientes, em risco, aderência média
- [x] Tabela de clientes responsiva com sorting
- [x] Filtros por status (todos/ativos/em risco/inativos)
- [x] Campo de busca com debounce
- [x] Gráfico de consumo calórico semanal (Chart.js)
- [x] Modal/página de detalhes do cliente (nutrition metrics)
- [x] Timeline de atividades recentes
- [x] Macros breakdown (proteína, carboidrato, gordura)
- [x] Histórico de 7 dias com gráfico
- [x] Botão para ajustar meal plan (lógica futura)
- [x] Design consistente com paleta #d4f54c / #e9e9e9
- [x] Mobile-first responsive (375px até desktop)
- [x] Testes unitários (80%+ coverage)

---

## 🚫 Out of Scope

- Análise IA de padrões nutricionais (future enhancement)
- Exportação de relatórios em PDF
- Integração com APIs externas (MyFitnessPal, cronometer)
- Histórico maior que 7 dias (será adicionado depois)
- Edição avançada de meal plans (será story futura)
- Notificações push
- Dark mode (ainda não)

---

## 🔗 Dependencies

**Deve estar READY (validada por @po):**
- PROF-DASH-001-003 (Backend endpoints obrigatório)

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
- [ ] 5/5 cards de estatísticas exibindo dados
- [ ] Tabela mostra clientes com paginação/sorting
- [ ] Filtros funcionam (4 opções de status)
- [ ] Busca funciona com debounce 300ms
- [ ] Gráfico renderiza corretamente
- [ ] Modal de detalhe mostra todas as informações
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
- [x] Design segue paleta #d4f54c / #e9e9e9 / branco
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
│   └── nutritionist-dashboard.tsx         (main page component)
├── components/
│   ├── nutritionist/
│   │   ├── NutritionistDashboard.tsx      (container component)
│   │   ├── ClientNutritionMetrics.tsx     (nutrition detail modal)
│   │   ├── MealPlanCard.tsx               (meal plan overview)
│   │   └── NutritionConsumptionChart.tsx  (gráfico)
│   └── specialist/
│       ├── ClientCard.tsx                 (stat card)
│       ├── ClientList.tsx                 (tabela)
│       ├── MetricsGrid.tsx                (grid de cards)
│       └── RiskAlert.tsx                  (alerta em risco)
├── hooks/
│   └── useNutritionistClients.ts          (TanStack Query hook)
└── tests/
    ├── NutritionistDashboard.test.tsx
    ├── ClientList.test.tsx
    └── NutritionConsumptionChart.test.tsx
```

**Arquivos a modificar:**

```
client/src/
├── App.tsx                                 (adicionar rota /nutritionist/dashboard)
├── lib/api.ts                              (adicionar endpoints)
└── routes.tsx ou useRoutes()               (registrar rota)
```

---

## 🎨 Design System Reference

**Colors:**
- Primary Accent: `#d4f54c` (lime - highlights)
- Background: `#e9e9e9` (light gray)
- Cards: `#ffffff` (white)
- Text Dark: `#1a1a1a` (slate-900)
- Risk Badge: `#ff6b6b` (red alert)
- Safe Zone: `#51cf66` (green success)

**Components:**
- Cards: `rounded-[24px] shadow-sm hover:shadow-md`
- Buttons: `px-4 py-2 rounded-lg bg-[#d4f54c] text-[#1a1a1a]`
- Inputs: `border border-gray-300 rounded-lg px-3 py-2`

**Layout:**
- Header: flex, justify-between, p-6
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Table: responsive com overflow-x

---

## 🧪 Testing Strategy

**Unit Tests (Components):**
- Testar rendering sem dados (loading state)
- Testar rendering com dados mock
- Testar cliques e interações (filtros, busca)
- Testar chamadas de API (mocked com MSW)
- Testar responsividade em breakpoints

**Integration Tests:**
- Testar fluxo completo: abrir dashboard → filtrar → ver detalhe
- Testar chamadas reais de API (com backend mock)
- Testar navegação entre páginas

**E2E Tests (optional):**
- Testar com Playwright/Cypress se recurso disponível
- Simular usuário real usando dashboard

**Coverage Target:** 80%+ (linhas de código)

---

## 📖 Dev Notes

- Usar React Context ou TanStack Query para state management
- Debounce em busca usando `lodash.debounce` ou `useCallback`
- Lazy load gráfico se performance for problema
- Cachear dados de clientes por 5 minutos
- Invalidar cache ao voltar para dashboard
- Acessibilidade: usar semantic HTML, labels em inputs
- Keyboard navigation em tabela (setas, enter)
- Melhorar performance com React.memo em cards

---

## 🔄 Related Stories

**Bloqueia:** Nenhuma (paralelo com PROF-DASH-001-002)
**Bloqueado por:** PROF-DASH-001-003 (backend obrigatório)
**Referências:** Epic PROF-DASH-001

---

## 📝 Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-02-21 | @sm | Story criada baseada no epic |

---

