---
type: doc
name: glossary
description: Domain terms, concepts, and terminology
category: glossary
generated: 2026-02-14
status: filled
scaffoldVersion: "2.0.0"
---

# Glossary & Domain Concepts

## Domain Terminology

### Fitness & Health Terms

**BMI (Body Mass Index)**
- Metric for assessing body composition based on height and weight
- Calculated as: weight (kg) / height² (m²)
- Used in health overview metrics

**Macronutrients (Macros)**
- Essential nutrients required in large amounts
- Includes: Protein, Carbohydrates, Fats
- Tracked in nutrition module for meal planning

**Caloric Deficit/Surplus**
- Deficit: Consuming fewer calories than expended (weight loss)
- Surplus: Consuming more calories than expended (weight gain)
- Maintenance: Balanced intake and expenditure

**BMR (Basal Metabolic Rate)**
- Minimum calories needed for basic bodily functions at rest
- Foundation for calculating daily calorie needs

**TDEE (Total Daily Energy Expenditure)**
- Total calories burned in a day including activity
- BMR + Activity calories

**Rep (Repetition)**
- Single completion of an exercise movement
- Example: One push-up = 1 rep

**Set**
- Group of consecutive repetitions
- Example: 3 sets of 10 push-ups = 30 total reps

**PR (Personal Record)**
- Best performance achieved for a specific exercise
- Tracked in workout progress

### Application-Specific Terms

**Dashboard**
- Main overview page showing health metrics, goals, and summaries
- Entry point after login

**Meal Status**
- State of a planned meal: `pending`, `completed`, or `skipped`
- Tracked in nutrition module

**Goal**
- User-defined fitness objective with target metrics
- Examples: "Lose 5 kg", "Run 5km", "Gain muscle mass"

**Health Metric**
- Measurable health indicator: weight, body fat %, muscle mass, etc.
- Displayed in health overview card

**Workout Routine**
- Structured exercise plan for a given period
- Composed of exercises, sets, and reps

**Energy Balance**
- Difference between calories consumed and calories burned
- Visualized in dashboard energy card

## Technical Terms

### Frontend

**Component**
- Reusable React UI element
- Types: UI components, layout components, page components

**Hook**
- React function that lets you use state and lifecycle in functional components  
- Prefixed with `use`: `useState`, `useEffect`, `useQuery`

**Route**
- URL path that maps to a specific page component
- Managed by Wouter router

**Query**
- Data fetching operation via TanStack Query
- Cached and automatically refetched

**State**
- Data that changes over time in the application
- Types: local state (useState), server state (TanStack Query)

**Props (Properties)**
- Data passed from parent to child components
- Typed with TypeScript interfaces

### Backend

**API Endpoint**
- URL path that handles specific requests
- Examples: `/api/meals`, `/api/workouts`

**Middleware**
- Function that processes requests before reaching route handlers
- Examples: authentication, logging, parsing

**Schema**
- Database table structure definition
- Defined using Drizzle ORM in `shared/schema.ts`

**Migration**
- Database schema change applied incrementally
- Managed via Drizzle Kit

**Session**
- Server-side storage of user authentication state
- Persisted across requests

**Storage Interface (IStorage)**
- Abstract contract defining data access methods
- Implementations: MemStorage, future PostgreSQL storage

### Database

**Table**
- Structured collection of related data
- Examples: `users`, `meals`, `workouts`

**Column**
- Field within a table representing a specific attribute
- Examples: `id`, `username`, `created_at`

**Primary Key**
- Unique identifier for a table row
- Usually `id` column

**Foreign Key**
- Column referencing primary key in another table
- Establishes relationships between tables

**Index**
- Database optimization structure for faster queries
- Created on frequently queried columns

### Authentication & Authorization

**Authentication (AuthN)**
- Verifying user identity (login)
- Implemented using Passport.js

**Authorization (AuthZ)**
- Determining user permissions (what they can access)
- Planned for future implementation

**Session**
- Persistent authentication state stored server-side
- Managed via Express Session

**JWT (JSON Web Token)**
- Token-based authentication mechanism
- Not currently used (session-based auth instead)

## UI/UX Concepts

**Responsive Design**
- UI adapts to different screen sizes
- Mobile-first approach using Tailwind breakpoints

**Toast Notification**
- Brief, non-intrusive message to user
- Implemented using Sonner library

**Sidebar**
- Side navigation panel for app navigation
- Collapsible on mobile devices

**Card**
- Container component for grouping related information
- Used extensively in dashboard

**Modal/Dialog**
- Overlay window for focused interactions
- Built with Radix UI Dialog

**Skeleton Loader**
- Placeholder UI while content is loading
- Improves perceived performance

## Architecture Patterns

**Monolithic Architecture**
- Single deployable unit containing frontend and backend
- Current architecture approach

**Repository Pattern**
- Data access abstraction layer
- Implemented via `IStorage` interface

**Component Composition**
- Building complex UIs from simple, reusable components
- Core React pattern

**Separation of Concerns**
- Dividing code into distinct sections with specific responsibilities
- Examples: UI, business logic, data access

**Client-Server Architecture**
- Client (browser) communicates with server (Express) via HTTP
- Clear separation of presentation and data layers

## Build & Development Tools

**Vite**
- Modern frontend build tool and dev server
- Fast HMR (Hot Module Replacement)

**TypeScript**
- Typed superset of JavaScript
- Provides static type checking

**Drizzle ORM**
- TypeScript ORM for database operations
- Schema-first approach

**TanStack Query (React Query)**
- Data fetching and caching library
- Handles server state management

**Tailwind CSS**
- Utility-first CSS framework
- Used for all styling

**shadcn/ui**
- Collection of accessible, customizable UI components
- Built on Radix UI primitives

**npm**
- Node Package Manager for dependency management
- Commands: `npm install`, `npm run dev`

**tsx**
- TypeScript execution engine
- Runs `.ts` files directly without compilation step

##User Personas

### Primary User: Fitness Enthusiast
- **Goal**: Track progress toward fitness goals
- **Needs**: Comprehensive tracking, visual progress, meal planning
- **Tech Savvy**: Moderate to high
- **Frequency**: Daily usage

### Secondary User: Health-Conscious Individual
- **Goal**: Monitor overall wellness and nutrition
- **Needs**: Simple tracking, health insights, goal reminders
- **Tech Savvy**: Low to moderate
- **Frequency**: Weekly usage

### Future Persona: Personal Trainer
- **Goal**: Manage multiple client programs
- **Needs**: Client management, progress tracking, program templates
- **Tech Savvy**: High
- **Frequency**: Multiple times daily

## Data Flow Concepts

**CRUD Operations**
- Create, Read, Update, Delete
- Standard database operations

**Request-Response Cycle**
- Client sends HTTP request → Server processes → Server sends response
- Fundamental web communication pattern

**State Management**
- How application state is stored, accessed, and updated
- Layers: local state, server state, URL state

**Cache Invalidation**
- Removing or updating stale cached data
- Managed by TanStack Query

**Optimistic Updates**
- UI updates immediately, before server confirmation
- Improves perceived performance

## Common Abbreviations

| Abbreviation | Full Term | Context |
|--------------|-----------|---------|
| API | Application Programming Interface | Backend endpoints |
| UI | User Interface | Frontend components |
| UX | User Experience | Design and usability |
| DB | Database | Data storage |
| ORM | Object-Relational Mapping | Drizzle ORM |
| HMR | Hot Module Replacement | Vite dev server |
| CRUD | Create, Read, Update, Delete | Database operations |
| HTTP | Hypertext Transfer Protocol | Client-server communication |
| JSON | JavaScript Object Notation | Data format |
| JWT | JSON Web Token | Authentication (future) |
| CSS | Cascading Style Sheets | Styling |
| HTML | Hypertext Markup Language | Structure |
| SPA | Single Page Application | React app type |
| REST | Representational State Transfer | API design |
| ARIA | Accessible Rich Internet Applications | Accessibility |

## Measurement Units

**Weight**
- Primary: Kilograms (kg)
- Alternative: Pounds (lbs)
- Conversion: 1 kg ≈ 2.20462 lbs

**Energy**
- Calories (kcal)
- Used for food energy and expenditure

**Distance**
- Primary: Kilometers (km) and Meters (m)
- Alternative: Miles (mi) and Feet (ft)

**Time**
- Workout Duration: Minutes (min) and Seconds (sec)
- Rest Periods: Seconds (sec)

**Body Measurements**
- Circumference: Centimeters (cm)
- Height: Centimeters (cm) or Feet & Inches

## Business Rules

**Calorie Calculation**
- Meals: Sum of all food item calories
- Daily Total: Sum of all completed meal calories
- Goal: User-defined target (e.g., 2000 kcal/day)

**Workout Completion**
- Exercise is complete when all sets are finished
- Workout is complete when all exercises are done
- Partial completion is tracked

**Goal Progress**
- Calculated as: (current - start) / (target - start) × 100%
- Updated daily based on latest metrics

**Meal Status Transitions**
- pending → completed (user logs meal)
- pending → skipped (user skips meal)
- Cannot revert from completed/skipped to pending

## Related Documentation

- [Architecture](./architecture.md) - Technical architecture
- [Data Flow](./data-flow.md) - How data moves through the system
- [Project Overview](./project-overview.md) - High-level project summary
