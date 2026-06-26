---
type: doc
name: architecture
description: System architecture, layers, patterns, and design decisions
category: architecture
generated: 2026-02-14
status: filled
scaffoldVersion: "2.0.0"
---

# Architecture Notes

## System Architecture Overview

**Fitness Sincera** follows a **full-stack monolithic architecture** with clear separation between client and server code. The application is deployed as a single unit that serves both the frontend React application and the backend Express API from the same server process.

### Deployment Model

- **Development**: Vite dev server proxies API requests to Express backend
- **Production**: Express serves pre-built static files and handles API routes
- **Port**: Single port (5000) serves both frontend and API

### Request Flow

```
User Browser
    ↓
Express Server (Port 5000)
    ↓
    ├─→ /api/* requests → API Handlers
    │       ↓
    │   Database (PostgreSQL)
    │
    └─→ /* (other) → Static Files (React App)
            ↓
        React Router (Wouter)
            ↓
        Page Components
```

## Architectural Layers

> See [`codebase-map.json`](./codebase-map.json) for complete symbol counts and dependency graphs.

### 1. Presentation Layer (`client/src`)
**Purpose**: User interface and client-side logic

- **Components** (`components/`): Reusable UI elements
  - `ui/`: Base components from shadcn/ui (buttons, cards, forms, etc.)
  - `layout/`: Layout wrappers (DashboardLayout, AppSidebar)
  - `dashboard/`: Dashboard-specific widgets (HealthOverviewCard, GoalProgressCard)
- **Pages** (`pages/`): Route-level components
  - `dashboard.tsx`: Main dashboard view
  - `nutrition.tsx`: Nutrition tracking page
  - `workout.tsx`: Workout management page
  - `profile.tsx`: User profile page
- **Hooks** (`hooks/`): Custom React hooks
  - `use-mobile.tsx`: Responsive design utility
  - `use-toast.ts`: Toast notification system
- **Libraries** (`lib/`): Utilities and configurations
  - `queryClient.ts`: TanStack Query configuration
  - `utils.ts`: Helper functions (cn for className merging)
  - `mockData.ts`: Temporary mock data for development

### 2. API Layer (`server/`)
**Purpose**: Request handling, business logic, and data access

- **Entry Point** (`index.ts`): Express server setup
  - Middleware configuration
  - Request/response logging
  - Error handling
- **Routes** (`routes.ts`): API endpoint definitions (ready for implementation)
- **Storage** (`storage.ts`): Data persistence abstraction
  - Interface: `IStorage` - defines storage contract
  - Implementation: `MemStorage` - in-memory storage for development
- **Static** (`static.ts`): Static file serving for production
- **Vite Integration** (`vite.ts`): Dev server integration for development

### 3. Data Layer (`shared/`)
**Purpose**: Shared types, schemas, and data structures

- **Schema** (`schema.ts`): Database schema definitions
  - Table definitions using Drizzle ORM
  - Zod validation schemas
  - TypeScript types derived from schemas

## Detected Design Patterns

| Pattern | Confidence | Locations | Description |
|---------|------------|-----------|-------------|
| **Repository Pattern** | 90% | `server/storage.ts` | `IStorage` interface abstracts data access, allowing swappable implementations (MemStorage currently, DB later) |
| **Component Composition** | 95% | `client/src/components/` | React components composed of smaller, reusable pieces (Radix UI primitives) |
| **Layout Pattern** | 90% | `client/src/components/layout/DashboardLayout.tsx` | Consistent layout wrapper for all authenticated pages |
| **Custom Hooks** | 85% | `client/src/hooks/` | Encapsulated stateful logic in custom hooks (useIsMobile, useToast) |
| **Query/Command Separation** | 80% | `client/src/lib/queryClient.ts` | TanStack Query for data fetching (ready for API integration) ||
**Middleware Chain** | 95% | `server/index.ts` | Express middleware for logging, parsing, error handling |
| **Schema Validation** | 90% | `shared/schema.ts` | Zod schemas validate data at runtime + provide TypeScript types |

## Entry Points

- **Server**: [`server/index.ts`](../../server/index.ts) - Express application initialization
- **Client**: [`client/src/main.tsx`](../../client/src/main.tsx) - React application mount point
- **Build**: [`script/build.ts`](../../script/build.ts) - Production build orchestration

## Public API

| Symbol | Type | Location |
|--------|------|----------|
| `apiRequest` | function | `client/src/lib/queryClient.ts:10` |
| `DashboardLayout` | component | `client/src/components/layout/DashboardLayout.tsx:13` |
| `GoalProgressCard` | component | `client/src/components/dashboard/GoalProgressCard.tsx:4` |
| `HealthOverviewCard` | component | `client/src/components/dashboard/HealthOverviewCard.tsx:6` |
| `UpgradeCTACard` | component | `client/src/components/dashboard/UpgradeCTACard.tsx:4` |
| `IStorage` | interface | `server/storage.ts:7` |
| `MemStorage` | class | `server/storage.ts:13` |
| `registerRoutes` | function | `server/routes.ts:5` |
| `User` | type | `shared/schema.ts:18` |
| `InsertUser` | type | `shared/schema.ts:17` |

For complete API surface, see [`codebase-map.json#publicAPI`](./codebase-map.json).

## Internal System Boundaries

### Client-Server Boundary
- **Contract**: REST API over HTTP (to be defined)
- **Data Exchange**: JSON payloads
- **Shared Types**: Types defined in `shared/` available to both client and server
- **Validation**: Zod schemas ensure data integrity at boundaries

### Component Boundaries
- **UI Components** (`components/ui/`): Pure presentation, no business logic
- **Layout Components** (`components/layout/`): Page structure, navigation
- **Dashboard Widgets** (`components/dashboard/`): Domain-specific logic encapsulated
- **Pages** (`pages/`): Orchestrate components, manage page-level state

### Storage Abstraction
- **Interface**: `IStorage` defines the contract
- **Current**: `MemStorage` for development (in-memory)
- **Future**: PostgreSQL implementation via Drizzle ORM
- **Benefit**: Easy to swap implementations without changing calling code

## External Service Dependencies

> No external services currently integrated.

### Future Integrations (Planned)
- **Authentication Provider**: Passport.js configured for local strategy
- **File Storage**: For user profile images, meal photos (S3, Cloudflare R2, etc.)
- **Email Service**: For notifications and password resets (SendGrid, Resend, etc.)
- **Nutrition APIs**: For food database lookups (Nutritionix, USDA, etc.)

## Key Decisions & Trade-offs

### 1. Monolithic vs. Microservices
**Decision**: Monolithic architecture  
**Rationale**:
- Simpler deployment and development
- Sufficient for current scale
- Easier to refactor into microservices later if needed
- Reduced operational complexity

**Trade-off**: Less horizontal scalability, but adequate for initial user base.

### 2. Drizzle ORM vs. Prisma
**Decision**: Drizzle ORM  
**Rationale**:
- TypeScript-first with excellent type inference
- Lightweight with minimal runtime overhead
- SQL-like API for better control
- Smaller bundle size

**Trade-off**: Less mature ecosystem than Prisma, fewer GUI tools.

### 3. Wouter vs. React Router
**Decision**: Wouter  
**Rationale**:
- Minimal bundle size (~1KB vs ~10KB)
- Simple API sufficient for current needs
- Hook-based routing patterns

**Trade-off**: Fewer features (no nested routes, data loaders), but can migrate to React Router if complexity grows.

### 4. TanStack Query for State Management
**Decision**: TanStack Query + React Context  
**Rationale**:
- Optimized for server state management
- Built-in caching, refetching, and background updates
- Reduces need for Redux/Zustand for API data

**Trade-off**: Requires thoughtful cache key design, learning curve for advanced features.

### 5. Component Library: Radix UI + shadcn/ui
**Decision**: Headless Radix UI with shadcn/ui styled components  
**Rationale**:
- Full control over styling and behavior
- Accessible by default (WAI-ARIA compliant)
- No runtime CSS-in-JS overhead
- Copy-paste component philosophy for customization

**Trade-off**: More setup than pre-styled libraries (Material-UI, Ant Design), but better long-term flexibility.

## Diagrams

### High-Level System Diagram

```
┌─────────────────────────────────────────┐
│           User Browser                   │
│  (React + Wouter + TanStack Query)       │
└─────────────┬───────────────────────────┘
              │ HTTP/HTTPS
              ↓
┌─────────────────────────────────────────┐
│        Express Server (Port 5000)        │
│  ┌───────────────────────────────────┐  │
│  │  Middleware Stack                 │  │
│  │  - JSON Parser                    │  │
│  │  - Session Management             │  │
│  │  - Request Logger                 │  │
│  │  - Error Handler                  │  │
│  └───────────┬───────────────────────┘  │
│              ↓                           │
│  ┌───────────────────┬─────────────┐    │
│  │   API Routes      │   Static     │    │
│  │   /api/*          │   Files      │    │
│  └────────┬──────────┴──────────────┘    │
└───────────┼────────────────────────────--┘
            ↓
┌─────────────────────────────────────────┐
│         PostgreSQL Database              │
│    (Users, Meals, Workouts, Goals)       │
└─────────────────────────────────────────┘
```

### Component Hierarchy

```
App.tsx
 ├─ QueryClientProvider
 ├─ TooltipProvider
 └─ Router (Wouter)
     ├─ DashboardPage
     │   └─ DashboardLayout
     │       ├─ AppSidebar
     │       ├─ HealthOverviewCard
     │       ├─ GoalProgressCard
     │       ├─ EnergyUsedCard
     │       └─ UpgradeCTACard
     │
     ├─ NutritionPage
     │   └─ DashboardLayout
     │       ├─ AppSidebar
     │       └─ Nutrition Components
     │
     ├─ WorkoutPage
     │   └─ DashboardLayout
     │       ├─ AppSidebar
     │       └─ Workout Components
     │
     └─ ProfilePage
         └─ DashboardLayout
             ├─ AppSidebar
             └─ Profile Components
```

## Risks & Constraints

### Performance Constraints
- **Frontend Budget**: Target <300KB initial JS bundle
  - Current: Need to measure with production build
  - Mitigation: Code splitting, lazy loading for page routes
- **API Response Time**: Target <200ms for common queries
  - Mitigation: Database indexing, query optimization, caching with TanStack Query

### Scaling Considerations
- **Database Connections**: PostgreSQL connection pool limits
  - Current: Single server, manageable connection count
  - Future: Connection pooling (PgBouncer) if needed
- **Session Storage**: Currently using memory store
  - Risk: Sessions lost on server restart
  - Migration: `connect-pg-simple` already installed for PostgreSQL session storage

### External Assumptions
- **Database Availability**: Assumes DATABASE_URL always accessible
- **Browser Compatibility**: Targets modern evergreen browsers (ES2020+)
- **Network Resilience**: Assumes reliable client-server connectivity
  - Mitigation: TanStack Query retry logic for failed requests

## Top Directories Snapshot

| Directory | File Count | Purpose |
|-----------|------------|---------|
| `client/` | 82 files | Frontend React application |
| `attached_assets/` | 20 files | Static images and assets |
| `server/` | 5 files | Backend Express API |
| `shared/` | 1 file | Shared types and schemas |
| `script/` | 1 file | Build and deployment scripts |

## Related Resources

- [Project Overview](./project-overview.md) - High-level project summary
- [Data Flow](./data-flow.md) - How data moves through the system
- [Codebase Map](./codebase-map.json) - Comprehensive code structure analysis
- [Development Workflow](./development-workflow.md) - Development practices
