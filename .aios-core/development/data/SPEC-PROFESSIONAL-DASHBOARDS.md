# Especificacao Arquitetural Detalhada — Epic PROF-DASH-001

## Visao Geral do Projeto Atual

Antes de detalhar os novos componentes, e importante registrar o que existe:

**Tech Stack Confirmado:**
- React 19.2 + Wouter 3.3.5 (roteamento)
- TanStack Query 5.60.5 (state/cache)
- Recharts 2.15.4 (ja instalado, usar ao inves de Chart.js)
- Express 5.0.1 + Drizzle ORM 0.39.3
- shadcn/ui + Radix UI + Tailwind CSS 4.1
- TypeScript 5.6.3 — strict mode

**Padroes Existentes Identificados:**
- Hooks em `client/src/lib/hooks/use-{domain}.ts`
- API client centralizado em `client/src/lib/api.ts`
- QueryClient em `client/src/lib/queryClient.ts`
- Layouts em `client/src/components/layout/`
- Pages em `client/src/pages/`
- QueryKeys usam path do endpoint como string (ex: `"/api/meals/today"`)
- Cards com `rounded-[32px]`, `bg-white` ou `bg-[#1a1c1e]`, `border-none`, `shadow-sm`
- `staleTime: Infinity` — dados nao refazem fetch automatico. Invalida manualmente via `queryClient.invalidateQueries`

---

## 1. Componentes React Detalhados

### 1.1 Componentes Compartilhados (specialist/)

#### `client/src/components/specialist/StatCard.tsx`

Substitui o padrao ad-hoc de cards de stats. Reutilizavel entre nutritionist e trainer.

```typescript
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
  badgeVariant?: "lime" | "purple" | "red" | "green";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconBg?: string;
  trend?: {
    value: number; // percentual
    direction: "up" | "down";
  };
  accentColor?: string; // hex — para o tema do especialista
}
```

Estados internos: nenhum (componente puramente apresentacional).

---

#### `client/src/components/specialist/ClientCard.tsx`

Card de cliente individual, usado em listas e modais.

```typescript
interface ClientCardProps {
  client: SpecialistClient;         // tipo definido em shared/schema.ts
  accentColor: string;              // "#d4f54c" | "#7c69ef"
  onSelect?: (clientId: string) => void;
  showLastActivity?: boolean;
  showAlert?: boolean;              // badge vermelho se em risco / baixa aderencia
  compact?: boolean;                // modo compacto para listagens densas
}
```

Estados internos: nenhum.

---

#### `client/src/components/specialist/ClientTable.tsx`

Tabela responsiva de clientes com filtros, busca e paginacao.

```typescript
interface ClientTableProps {
  clients: SpecialistClient[];
  isLoading: boolean;
  accentColor: string;
  columns: ColumnDefinition[];      // define quais colunas mostrar
  onClientClick: (clientId: string) => void;
  filterOptions?: FilterOption[];   // ex: [{label:"Em risco",value:"at_risk"}]
  searchPlaceholder?: string;
  emptyMessage?: string;
}

interface ColumnDefinition {
  key: string;
  label: string;
  render?: (value: unknown, row: SpecialistClient) => React.ReactNode;
  width?: string;
}

interface FilterOption {
  label: string;
  value: string;
}
```

Estados internos:
```typescript
const [searchQuery, setSearchQuery] = useState("");
const [activeFilter, setActiveFilter] = useState<string | null>(null);
const [currentPage, setCurrentPage] = useState(1);
const PAGE_SIZE = 10;
```

---

#### `client/src/components/specialist/MetricsGrid.tsx`

Grid de 3 ou 4 StatCards. Responsivo automaticamente.

```typescript
interface MetricsGridProps {
  metrics: StatCardProps[];
  columns?: 3 | 4;
}
```

Estados internos: nenhum.

---

#### `client/src/components/specialist/TrendChart.tsx`

Wrapper sobre Recharts para graficos de linha/barra semanais.

```typescript
type ChartType = "line" | "bar" | "area";

interface ChartDataPoint {
  label: string;  // "Seg", "Ter", etc.
  value: number;
  secondaryValue?: number;
}

interface TrendChartProps {
  data: ChartDataPoint[];
  type?: ChartType;
  color?: string;         // cor principal da linha/barra
  secondaryColor?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  showGrid?: boolean;
  unit?: string;          // "kcal", "kg", "sessoes"
  isLoading?: boolean;
}
```

Estados internos:
```typescript
const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
```

---

#### `client/src/components/specialist/ActivityFeed.tsx`

Timeline de atividades recentes de clientes.

```typescript
interface ActivityFeedItem {
  id: string;
  clientName: string;
  clientAvatar?: string;
  action: string;         // "completou treino" | "registrou refeicao"
  timestamp: string;      // ISO date
  detail?: string;
}

interface ActivityFeedProps {
  activities: ActivityFeedItem[];
  isLoading?: boolean;
  maxItems?: number;
  accentColor?: string;
}
```

Estados internos: nenhum.

---

### 1.2 Componentes do Nutricionista (nutritionist/)

#### `client/src/components/nutritionist/NutritionistDashboard.tsx`

Componente de pagina principal (compoe os outros).

```typescript
// Sem props — e a pagina raiz do nutritionist dashboard
// Usa hooks internamente
```

Estados internos:
```typescript
const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
```

---

#### `client/src/components/nutritionist/ClientNutritionMetrics.tsx`

Painel lateral ou modal com detalhes nutricionais de um cliente.

```typescript
interface ClientNutritionMetricsProps {
  clientId: string;
  onClose?: () => void;
  mode?: "panel" | "modal";  // panel=inline | modal=Dialog
}
```

Estados internos:
```typescript
const [viewRange, setViewRange] = useState<"7d" | "14d" | "30d">("7d");
```

Dados via hook `useClientNutritionDetail(clientId)`.

---

#### `client/src/components/nutritionist/MacroBreakdownCard.tsx`

Card de breakdown de macros (proteina, carbo, gordura) de um cliente.

```typescript
interface MacroBreakdownCardProps {
  clientId: string;
  date?: string; // padrao: hoje
}
```

Estados internos: nenhum (dados via query).

---

#### `client/src/components/nutritionist/MealPlanCard.tsx`

Card de plano alimentar atual com botao de editar/ajustar.

```typescript
interface MealPlanCardProps {
  clientId: string;
  mealPlanId?: string;
  onEditPlan?: (clientId: string) => void;
  accentColor?: string;
}
```

Estados internos:
```typescript
const [isEditing, setIsEditing] = useState(false);
```

---

### 1.3 Componentes do Personal Trainer (trainer/)

#### `client/src/components/trainer/TrainerDashboard.tsx`

Componente de pagina principal do trainer.

```typescript
// Sem props — pagina raiz
```

Estados internos:
```typescript
const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
```

---

#### `client/src/components/trainer/ClientWorkoutProgress.tsx`

Progresso de treinos de um aluno: historico de sessoes, PRs, aderencia.

```typescript
interface ClientWorkoutProgressProps {
  clientId: string;
  onClose?: () => void;
  mode?: "panel" | "modal";
}
```

Estados internos:
```typescript
const [activeTab, setActiveTab] = useState<"sessions" | "records" | "volume">("sessions");
```

---

#### `client/src/components/trainer/WorkoutAssignCard.tsx`

Card de programa atual com botao para ajustar.

```typescript
interface WorkoutAssignCardProps {
  clientId: string;
  programId?: string;
  onEditProgram?: (clientId: string) => void;
  accentColor?: string;
}
```

Estados internos:
```typescript
const [isAssigning, setIsAssigning] = useState(false);
```

---

#### `client/src/components/trainer/AdherenceRingChart.tsx`

Chart circular de aderencia (% de treinos completados). Usa Recharts `RadialBarChart`.

```typescript
interface AdherenceRingChartProps {
  percent: number;       // 0-100
  label?: string;
  size?: "sm" | "md" | "lg";
  color?: string;        // "#7c69ef" padrao
}
```

Estados internos: nenhum.

---

### 1.4 Paginas (pages/)

#### `client/src/pages/nutritionist/dashboard.tsx`

```typescript
// Importa NutritionistDashboard, DashboardLayout
// Define rota /nutritionist/dashboard
```

#### `client/src/pages/nutritionist/clients.tsx`

```typescript
// Lista de todos os clientes do nutricionista
// Filtros avancados + paginacao
```

#### `client/src/pages/nutritionist/client-detail.tsx`

```typescript
// Detalhe de um cliente especifico
// Rota: /nutritionist/clients/:id
```

#### `client/src/pages/trainer/dashboard.tsx`

```typescript
// Importa TrainerDashboard, DashboardLayout
// Define rota /trainer/dashboard
```

#### `client/src/pages/trainer/clients.tsx`

```typescript
// Lista de alunos do trainer
```

#### `client/src/pages/trainer/client-detail.tsx`

```typescript
// Detalhe de um aluno especifico
// Rota: /trainer/clients/:id
```

---

### 1.5 Hooks Customizados a Criar

#### `client/src/lib/hooks/use-nutritionist.ts`

```typescript
// useNutritionistDashboard()
// useNutritionistClients(filters?)
// useClientNutritionDetail(clientId)
// useUpdateMealPlan()
```

#### `client/src/lib/hooks/use-trainer.ts`

```typescript
// useTrainerDashboard()
// useTrainerClients(filters?)
// useClientWorkoutProgress(clientId)
// useUpdateWorkoutProgram()
```

---

## 2. Schema de Banco de Dados Completo

O projeto usa Drizzle ORM com PostgreSQL. O schema fica em `shared/schema.ts`. As definicoes seguem o padrao ja existente com `pgTable` do drizzle-orm.

### 2.1 Alteracoes na Tabela `users`

```typescript
// Adicionar ao users pgTable existente:
role: varchar("role", { length: 20 }).notNull().default("client"),
// valores: "client" | "nutritionist" | "trainer" | "admin"

isSpecialist: boolean("is_specialist").notNull().default(false),

displayName: text("display_name"),
avatarUrl: text("avatar_url"),
email: text("email").unique(),

createdAt: timestamp("created_at").defaultNow().notNull(),
updatedAt: timestamp("updated_at").defaultNow().notNull(),
```

**Indice adicional:**
```sql
CREATE INDEX idx_users_role ON users(role);
```

---

### 2.2 Tabela `nutritionist_profiles`

```typescript
export const nutritionistProfiles = pgTable("nutritionist_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  specialization: text("specialization"),           // "Esportiva", "Clinical", etc.
  crnNumber: varchar("crn_number", { length: 20 }), // registro profissional
  bio: text("bio"),
  yearsOfExperience: integer("years_of_experience").default(0),
  maxClients: integer("max_clients").default(50),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

---

### 2.3 Tabela `trainer_profiles`

```typescript
export const trainerProfiles = pgTable("trainer_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  crefNumber: varchar("cref_number", { length: 20 }), // registro profissional
  specialization: text("specialization"),              // "Musculacao", "Funcional", etc.
  bio: text("bio"),
  yearsOfExperience: integer("years_of_experience").default(0),
  maxClients: integer("max_clients").default(30),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

---

### 2.4 Tabela `clients_nutritionist` (many-to-many)

```typescript
export const clientsNutritionist = pgTable("clients_nutritionist", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nutritionistId: varchar("nutritionist_id").notNull().references(() => users.id),
  clientId: varchar("client_id").notNull().references(() => users.id),
  status: varchar("status", { length: 20 }).notNull().default("active"),
  // valores: "active" | "inactive" | "at_risk" | "on_hold"
  mealPlanId: varchar("meal_plan_id"),
  goalCalories: integer("goal_calories"),
  goalProtein: integer("goal_protein"),
  goalCarbs: integer("goal_carbs"),
  goalFat: integer("goal_fat"),
  notes: text("notes"),
  startDate: timestamp("start_date").defaultNow().notNull(),
  lastCheckIn: timestamp("last_check_in"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

---

### 2.5 Tabela `clients_trainer`

```typescript
export const clientsTrainer = pgTable("clients_trainer", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  trainerId: varchar("trainer_id").notNull().references(() => users.id),
  clientId: varchar("client_id").notNull().references(() => users.id),
  status: varchar("status", { length: 20 }).notNull().default("active"),
  // valores: "active" | "inactive" | "low_adherence" | "on_hold"
  currentProgramId: varchar("current_program_id"),
  adherencePercent: integer("adherence_percent").default(100),
  notes: text("notes"),
  startDate: timestamp("start_date").defaultNow().notNull(),
  lastSession: timestamp("last_session"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

---

### 2.6 Tabelas Adicionais

`client_nutrition_logs`, `client_workout_sessions`, `client_personal_records` conforme detalhado na especificação completa do Sonnet.

---

## 3. API Endpoints

### Nutritionist
- `GET /api/nutritionist/dashboard` - Stats overview
- `GET /api/nutritionist/clients` - Lista com filtros
- `GET /api/nutritionist/clients/:id` - Detalhe
- `PUT /api/nutritionist/clients/:id/plan` - Update plano

### Trainer
- `GET /api/trainer/dashboard` - Stats overview
- `GET /api/trainer/clients` - Lista com filtros
- `GET /api/trainer/clients/:id` - Detalhe
- `PUT /api/trainer/clients/:id/program` - Update programa

---

## 4. Component Composition Patterns

Seguir o padrão existente: pages orquestram dados, componentes são apresentacionais.

---

## 5. Testing Strategy

- Vitest + @testing-library/react
- MSW para mocks
- 80% code coverage target
- Supertest para testes de API

---

*Especificação criada por Sonnet - 2026-02-21*
