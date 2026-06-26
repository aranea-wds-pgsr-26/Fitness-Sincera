# Expected File Structure - Professional Dashboards Epic

This document outlines the expected file structure after implementing all 3 stories from Epic PROF-DASH-001.

---

## Current Status: Stories Created (Draft)

All stories are in Draft status and stored in `.context/stories/`:

```
.context/stories/
├── README.md                      (Index & execution guide)
├── FILE_STRUCTURE.md             (This file)
├── PROF-DASH-001-003.story.md   (Backend - MUST DO FIRST)
├── PROF-DASH-001-001.story.md   (Nutritionist UI)
└── PROF-DASH-001-002.story.md   (Trainer UI)
```

---

## After Implementation: Expected File Structure

After completing all 3 stories, the codebase will have these NEW files:

### Backend Files (Story PROF-DASH-001-003)

```
server/
├── migrations/
│   └── 001_professional_dashboards.ts
│       ├── CREATE TABLE clients_nutritionist
│       ├── CREATE TABLE clients_trainer
│       ├── ALTER TABLE users (add role, is_specialist)
│       └── CREATE INDEXES
│
├── routes/
│   ├── nutritionist.ts
│   │   ├── GET    /api/nutritionist/dashboard
│   │   ├── GET    /api/nutritionist/clients
│   │   ├── GET    /api/nutritionist/clients/:id
│   │   └── PUT    /api/nutritionist/clients/:id/plan
│   │
│   └── trainer.ts
│       ├── GET    /api/trainer/dashboard
│       ├── GET    /api/trainer/clients
│       ├── GET    /api/trainer/clients/:id
│       └── PUT    /api/trainer/clients/:id/program
│
├── controllers/
│   ├── nutritionist.controller.ts
│   │   ├── getDashboardStats()
│   │   ├── listClients()
│   │   ├── getClientDetail()
│   │   └── updateMealPlan()
│   │
│   └── trainer.controller.ts
│       ├── getDashboardStats()
│       ├── listClients()
│       ├── getClientDetail()
│       └── updateProgram()
│
├── middleware/
│   ├── auth.middleware.ts
│   │   └── verifyJWT()
│   │
│   └── roleCheck.middleware.ts
│       ├── requireRole('nutritionist')
│       └── requireRole('trainer')
│
└── tests/
    ├── nutritionist.api.test.ts
    │   ├── GET /api/nutritionist/dashboard
    │   ├── GET /api/nutritionist/clients
    │   ├── GET /api/nutritionist/clients/:id
    │   ├── PUT /api/nutritionist/clients/:id/plan
    │   ├── Auth tests (401/403)
    │   └── Error handling tests
    │
    └── trainer.api.test.ts
        ├── GET /api/trainer/dashboard
        ├── GET /api/trainer/clients
        ├── GET /api/trainer/clients/:id
        ├── PUT /api/trainer/clients/:id/program
        ├── Auth tests (401/403)
        └── Error handling tests

shared/
└── types/
    ├── nutritionist.types.ts
    │   ├── interface DashboardStats
    │   ├── interface ClientListItem
    │   └── interface NutritionMetrics
    │
    └── trainer.types.ts
        ├── interface DashboardStats
        ├── interface ClientListItem
        └── interface WorkoutProgress
```

**Modified Files:**
```
server/
├── index.ts
│   └── app.use('/api/nutritionist', nutritionistRoutes)
│   └── app.use('/api/trainer', trainerRoutes)
│
└── schema.ts
    ├── clients_nutritionist table definition (Drizzle)
    └── clients_trainer table definition (Drizzle)
```

---

### Frontend Files (Story PROF-DASH-001-001 - Nutritionist)

```
client/src/
├── pages/
│   └── nutritionist-dashboard.tsx
│       ├── URL: /nutritionist/dashboard
│       ├── Main container component
│       ├── Loads data via useNutritionistClients hook
│       └── Renders NutritionistDashboard component
│
├── components/
│   ├── nutritionist/
│   │   ├── NutritionistDashboard.tsx
│   │   │   ├── Layout (header + cards + table + chart)
│   │   │   ├── State management (filters, search)
│   │   │   └── Event handlers (filter, search, open detail)
│   │   │
│   │   ├── ClientNutritionMetrics.tsx
│   │   │   ├── Modal/detail view
│   │   │   ├── Shows nutrition data for 1 client
│   │   │   ├── Macros breakdown (protein, carbs, fat)
│   │   │   ├── 7-day history graph
│   │   │   └── Close button
│   │   │
│   │   ├── MealPlanCard.tsx
│   │   │   └── Overview of assigned meal plan
│   │   │
│   │   └── NutritionConsumptionChart.tsx
│   │       ├── Weekly calorie chart (Chart.js)
│   │       ├── X-axis: days
│   │       ├── Y-axis: calories (0-2500)
│   │       └── Colors: #d4f54c (target), #999 (actual)
│   │
│   └── specialist/
│       ├── ClientCard.tsx
│       │   ├── Stat card (generic, reusable)
│       │   ├── Props: title, value, icon, bgColor
│       │   └── Example: "Total Clientes: 12"
│       │
│       ├── ClientList.tsx
│       │   ├── Table component (reusable)
│       │   ├── Props: columns, data, onRowClick
│       │   ├── Features: sorting, pagination
│       │   └── Responsive table
│       │
│       ├── MetricsGrid.tsx
│       │   ├── Grid of stat cards
│       │   ├── Responsive (1 col mobile, 3 cols desktop)
│       │   └── Props: cards array
│       │
│       └── RiskAlert.tsx
│           └── Badge/alert for at-risk clients
│
├── hooks/
│   └── useNutritionistClients.ts
│       ├── TanStack Query hook
│       ├── Fetches: GET /api/nutritionist/dashboard
│       ├── Fetches: GET /api/nutritionist/clients
│       ├── Auto-cache (5 min)
│       └── Refetch on tab focus
│
└── tests/
    ├── NutritionistDashboard.test.tsx
    │   ├── Render test
    │   ├── Filter test
    │   ├── Search test
    │   └── Detail modal test
    │
    ├── ClientList.test.tsx
    │   ├── Render with data
    │   ├── Click row handler
    │   └── Sorting test
    │
    ├── NutritionConsumptionChart.test.tsx
    │   ├── Chart renders
    │   ├── Data points correct
    │   └── Tooltip shows on hover
    │
    └── useNutritionistClients.test.ts
        ├── Hook fetches data
        ├── Caching works
        └── Refetch on focus
```

**Modified Files:**
```
client/src/
├── App.tsx
│   └── <Route path="/nutritionist/dashboard" element={<NutritionistDashboardPage />} />
│
├── lib/api.ts
│   ├── GET /api/nutritionist/dashboard
│   ├── GET /api/nutritionist/clients
│   ├── GET /api/nutritionist/clients/:id
│   └── PUT /api/nutritionist/clients/:id/plan
│
└── routes.tsx (or useRoutes hook)
    └── Register /nutritionist/dashboard route
```

---

### Frontend Files (Story PROF-DASH-001-002 - Trainer)

```
client/src/
├── pages/
│   └── trainer-dashboard.tsx
│       ├── URL: /trainer/dashboard
│       ├── Main container component
│       ├── Loads data via useTrainerClients hook
│       └── Renders TrainerDashboard component
│
├── components/
│   ├── trainer/
│   │   ├── TrainerDashboard.tsx
│   │   │   ├── Layout (header + cards + table + chart)
│   │   │   ├── State management (filters, search)
│   │   │   └── Event handlers (filter, search, open detail)
│   │   │
│   │   ├── ClientWorkoutProgress.tsx
│   │   │   ├── Modal/detail view
│   │   │   ├── Shows workout data for 1 student
│   │   │   ├── Next scheduled workout
│   │   │   ├── Last 5 sessions history
│   │   │   ├── PRs (personal records)
│   │   │   ├── Weekly volume total (kg)
│   │   │   ├── Consistency percentage
│   │   │   └── Close button
│   │   │
│   │   ├── WorkoutAssignCard.tsx
│   │   │   └── Overview of assigned program
│   │   │
│   │   ├── WorkoutVolumeChart.tsx
│   │   │   ├── Weekly volume chart (Chart.js)
│   │   │   ├── X-axis: days
│   │   │   ├── Y-axis: volume in kg (0-10000)
│   │   │   ├── Bars for each day
│   │   │   ├── Dashed line: previous week avg
│   │   │   └── Colors: #7c69ef (main), #666 (baseline)
│   │   │
│   │   └── PerformanceBadge.tsx
│   │       ├── Color-coded performance score
│   │       ├── Green: >80%, Yellow: 60-80%, Red: <60%
│   │       └── Reusable component
│   │
│   └── specialist/ (REUSED from Story 001)
│       ├── ClientCard.tsx       ← REUSE
│       ├── ClientList.tsx       ← ADAPT (trainer-specific columns)
│       ├── MetricsGrid.tsx      ← REUSE
│       └── AdhereanceAlert.tsx  ← NEW (for trainer's needs)
│
├── hooks/
│   └── useTrainerClients.ts
│       ├── TanStack Query hook
│       ├── Fetches: GET /api/trainer/dashboard
│       ├── Fetches: GET /api/trainer/clients
│       ├── Auto-cache (5 min)
│       └── Refetch on tab focus
│
└── tests/
    ├── TrainerDashboard.test.tsx
    │   ├── Render test
    │   ├── Filter test (performance tiers)
    │   ├── Search test
    │   └── Detail modal test
    │
    ├── ClientWorkoutProgress.test.tsx
    │   ├── Modal renders
    │   ├── Shows all sections (next workout, history, PRs)
    │   └── Close handler
    │
    ├── WorkoutVolumeChart.test.tsx
    │   ├── Chart renders
    │   ├── Data points correct
    │   └── Tooltip shows on hover
    │
    └── useTrainerClients.test.ts
        ├── Hook fetches data
        ├── Caching works
        └── Refetch on focus
```

**Modified Files:**
```
client/src/
├── App.tsx
│   └── <Route path="/trainer/dashboard" element={<TrainerDashboardPage />} />
│
├── lib/api.ts
│   ├── GET /api/trainer/dashboard
│   ├── GET /api/trainer/clients
│   ├── GET /api/trainer/clients/:id
│   └── PUT /api/trainer/clients/:id/program
│
└── routes.tsx (or useRoutes hook)
    └── Register /trainer/dashboard route
```

---

## Database Schema Changes

After running migration `001_professional_dashboards.ts`:

```sql
-- New columns in existing users table
ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'client';
ALTER TABLE users ADD COLUMN is_specialist BOOLEAN DEFAULT false;

-- New tables
CREATE TABLE clients_nutritionist (
  id UUID PRIMARY KEY,
  nutritionist_id UUID NOT NULL,
  client_id UUID NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  meal_plan_id UUID,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (nutritionist_id) REFERENCES users(id),
  FOREIGN KEY (client_id) REFERENCES users(id),
  UNIQUE(nutritionist_id, client_id)
);

CREATE TABLE clients_trainer (
  id UUID PRIMARY KEY,
  trainer_id UUID NOT NULL,
  client_id UUID NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  current_program_id UUID,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (trainer_id) REFERENCES users(id),
  FOREIGN KEY (client_id) REFERENCES users(id),
  UNIQUE(trainer_id, client_id)
);

-- Performance indexes
CREATE INDEX idx_clients_nutritionist_nutri_id ON clients_nutritionist(nutritionist_id);
CREATE INDEX idx_clients_nutritionist_client_id ON clients_nutritionist(client_id);
CREATE INDEX idx_clients_nutritionist_status ON clients_nutritionist(status);
CREATE INDEX idx_clients_trainer_trainer_id ON clients_trainer(trainer_id);
CREATE INDEX idx_clients_trainer_client_id ON clients_trainer(client_id);
CREATE INDEX idx_clients_trainer_status ON clients_trainer(status);
```

---

## Routes Summary

### Backend Routes

**Nutritionist Endpoints:**
- `GET /api/nutritionist/dashboard` - Stats overview
- `GET /api/nutritionist/clients` - List clients with filters
- `GET /api/nutritionist/clients/:id` - Client nutrition detail
- `PUT /api/nutritionist/clients/:id/plan` - Update meal plan

**Trainer Endpoints:**
- `GET /api/trainer/dashboard` - Stats overview
- `GET /api/trainer/clients` - List students with filters
- `GET /api/trainer/clients/:id` - Student workout detail
- `PUT /api/trainer/clients/:id/program` - Update workout program

### Frontend Routes

**Nutritionist Routes:**
- `/nutritionist/dashboard` - Main dashboard

**Trainer Routes:**
- `/trainer/dashboard` - Main dashboard

---

## Test Coverage Requirements

| Story | Component | Target | Type |
|-------|-----------|--------|------|
| PROF-DASH-001-003 | Backend APIs | 80%+ | Supertest (integration) |
| PROF-DASH-001-001 | Nutritionist UI | 80%+ | Jest/Vitest (unit + integration) |
| PROF-DASH-001-002 | Trainer UI | 80%+ | Jest/Vitest (unit + integration) |

---

## Design Colors Reference

**Nutritionist Dashboard:**
- Primary Accent: `#d4f54c` (lime)
- Background: `#e9e9e9` (light gray)
- Cards: `#ffffff` (white)
- Text Dark: `#1a1a1a` (slate-900)

**Trainer Dashboard:**
- Primary Accent: `#7c69ef` (purple)
- Background: `#111111` (dark)
- Cards: `#1a1a1a` (dark charcoal)
- Text Light: `#ffffff` (white)

---

## File Statistics After Implementation

```
Server-side additions:
  - 1 migration file
  - 2 route files
  - 2 controller files
  - 2 middleware files
  - 2 test files
  - 2 type definition files
  Total: 11 new files

Frontend additions:
  - 2 page files
  - 8 component files (specialist + nutritionist/trainer specific)
  - 2 hook files
  - 7 test files
  Total: 19 new files (10 unique, 9 shared/reusable)

Documentation:
  - 3 story markdown files (979 lines total)
  - This file structure guide

TOTAL NEW CODE: ~30 new files + 2 modified files
ESTIMATED LINES: ~2500 (backend) + ~3000 (frontend) = ~5500 total
```

---

## Implementation Checklist

### Story PROF-DASH-001-003 (Backend)
- [ ] Migration file created
- [ ] Tables created in DB
- [ ] Indices created
- [ ] 8 endpoints implemented
- [ ] Auth middleware added
- [ ] Role-based access control added
- [ ] Error handling implemented
- [ ] 24+ tests written (Supertest)
- [ ] 80%+ code coverage
- [ ] npm run lint passes
- [ ] npm run typecheck passes
- [ ] CodeRabbit PASS

### Story PROF-DASH-001-001 (Nutritionist UI)
- [ ] Page component created
- [ ] Dashboard layout implemented
- [ ] Stats cards component
- [ ] Client list/table component
- [ ] Search/filter working
- [ ] Calorie consumption chart
- [ ] Client detail modal
- [ ] 80%+ code coverage
- [ ] Responsive tested (mobile/tablet/desktop)
- [ ] npm run lint passes
- [ ] npm run typecheck passes
- [ ] CodeRabbit PASS

### Story PROF-DASH-001-002 (Trainer UI)
- [ ] Page component created
- [ ] Dashboard layout implemented
- [ ] Stats cards component
- [ ] Student list/table component
- [ ] Search/filter working
- [ ] Workout volume chart
- [ ] Student progress detail modal
- [ ] Performance badges colored
- [ ] 80%+ code coverage
- [ ] Responsive tested (mobile/tablet/desktop)
- [ ] Components reused from Story 001
- [ ] npm run lint passes
- [ ] npm run typecheck passes
- [ ] CodeRabbit PASS

---

**Last Updated:** 2026-02-21
**Version:** 1.0 (Planning Phase)

