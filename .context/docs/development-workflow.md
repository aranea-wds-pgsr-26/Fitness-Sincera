---
type: doc
name: development-workflow
description: Development practices, workflows, and guidelines
category: workflow
generated: 2026-02-14
status: filled
scaffoldVersion: "2.0.0"
---

# Development Workflow

## Getting Started

### Prerequisites
- **Node.js**: v20.x or higher
- **PostgreSQL**: v14 or higher
- **npm**: v10.x or higher (comes with Node.js)
- **Git**: For version control

### Initial Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd Fitness-Sincera
   npm install
   ```

2. **Environment Configuration**
   ```bash
   # Create .env file (or set environment variables)
   echo "DATABASE_URL=postgresql://user:password@localhost:5432/fitness_sincera" > .env
   ```

3. **Database Setup**
   ```bash
   # Push schema to database
   npm run db:push
   ```

4. **Start Development**
   ```bash
   # Full-stack development (recommended)
   npm run dev

   # Or client-only (if backend not needed)
   npm run dev:client
   ```

## Development Scripts

### Available Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm run dev` | Start full-stack dev server | Primary development command |
| `npm run dev:client` | Start frontend-only dev server | Frontend-only work without API |
| `npm run build` | Build production bundle | Before deployment |
| `npm run start` | Start production server | Test production build locally |
| `npm run check` | TypeScript type checking | Before committing code |
| `npm run db:push` | Push schema changes to DB | After modifying `shared/schema.ts` |

### Development Server Details

**Development Mode** (`npm run dev`):
- Express server runs on port 5000
- Vite dev server proxies to Express
- Hot Module Replacement (HMR) enabled
- TypeScript compilation on-the-fly
- Source maps enabled

**Client-Only Mode** (`npm run dev:client`):
- Vite dev server on port 5000
- No backend available (API calls will fail)
- Useful for UI-only work with mock data

## Code Organization

### File Structure Conventions

```
client/src/
├── components/         # Reusable components
│   ├── ui/            # Base UI components (shadcn/ui)
│   ├── layout/        # Layout wrappers and navigation
│   └── dashboard/     # Domain-specific widgets
├── pages/              # Page-level components (one per route)
├── hooks/              # Custom React hooks
├── lib/                # Utilities, configurations, helpers
│   ├── utils.ts       # General utilities
│   ├── queryClient.ts # TanStack Query setup
│   └── mockData.ts    # Temporary mock data
└── index.css           # Global styles and Tailwind imports

server/
├── index.ts            # Server entry point
├── routes.ts           # API route handlers
├── storage.ts          # Data access layer
├── vite.ts             # Vite dev integration
└── static.ts           # Static file serving

shared/
└── schema.ts           # Database schema and types
```

### Component Organization

**Component Naming**:
- PascalCase for component files: `DashboardLayout.tsx`
- Descriptive names: `HealthOverviewCard.tsx` not `Card1.tsx`
- Suffix with type if ambiguous: `useToast.ts` (hook), `Button.tsx` (component)

**Component Structure**:
```typescript
// Imports
import { useState } from "react";
import { cn } from "@/lib/utils";

// Types/Interfaces
interface ComponentProps {
  title: string;
  children: React.ReactNode;
}

// Component
export function Component({ title, children }: ComponentProps) {
  // Hooks
  const [state, setState] = useState();

  // Handlers
  const handleClick = () => {
    // ...
  };

  // Render
  return (
    <div className={cn("...")}>
      {/* JSX */}
    </div>
  );
}
```

## Coding Standards

### TypeScript

- **Strict Mode**: Enable `strict: true` in `tsconfig.json`
- **No `any`**: Avoid type `any` unless absolutely necessary
- **Explicit Return Types**: For public APIs and complex functions
- **Interface over Type**: Prefer `interface` for object shapes

**Example**:
```typescript
// ✅ Good
interface User {
  id: string;
  username: string;
}

function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Avoid
function getUser(id: any): any {
  // ...
}
```

### React

- **Functional Components**: Use function declarations, not arrow functions for components
- **Hooks at Top**: Always call hooks at the top level
- **Descriptive Names**: Boolean props start with `is/has/should`
- **Destructure Props**: Destructure props in function signature

**Example**:
```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  isDisabled?: boolean;
  onClick: () => void;
}

export function Button({ label, isDisabled = false, onClick }: ButtonProps) {
  return (
    <button disabled={isDisabled} onClick={onClick}>
      {label}
    </button>
  );
}

// ❌ Avoid
export const Button = (props: any) => {
  return <button {...props}>{props.children}</button>;
};
```

### Styling

- **Tailwind First**: Use Tailwind utility classes
- **cn Utility**: Use `cn()` for conditional classes
- **Component Variants**: Use `class-variance-authority` for variant patterns
- **Responsive**: Mobile-first design (use `md:`, `lg:` breakpoints)

**Example**:
```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "rounded-lg p-4",
  isActive && "bg-primary text-white",
  "md:p-6 lg:p-8"
)}>
  {content}
</div>
```

### Database Schema

- **Migration Workflow**:
  1. Modify `shared/schema.ts`
  2. Run `npm run db:push` to apply changes
  3. Update TypeScript types (Drizzle auto-generates)

- **Schema Validation**: Use `drizzle-zod` for Zod schemas
- **Naming**: Use snake_case for database columns, camelCase in TypeScript

**Example**:
```typescript
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const meals = pgTable("meals", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  mealName: text("meal_name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMealSchema = createInsertSchema(meals);
export type Meal = typeof meals.$inferSelect;
```

## Git Workflow

### Branch Strategy

- **main**: Production-ready code
- **development**: Integration branch (future)
- **feature/\***: New features (`feature/nutrition-api`)
- **fix/\***: Bug fixes (`fix/dashboard-layout`)
- **refactor/\***: Code improvements (`refactor/component-structure`)

### Commit Messages

Follow conventional commits format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```bash
git commit -m "feat(nutrition): add meal tracking API endpoint"
git commit -m "fix(dashboard): resolve layout overflow on mobile"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(components): extract reusable card component"
```

## Testing

> Testing infrastructure is planned but not yet implemented.

### Planned Testing Strategy

- **Unit Tests**: Vitest for utility functions and hooks
- **Component Tests**: React Testing Library for component behavior
- **E2E Tests**: Playwright for critical user flows
- **API Tests**: Supertest for Express endpoints

### Future Commands
```bash
npm test              # Run all tests
npm test:unit         # Unit tests only
npm test:e2e          # End-to-end tests
npm test:watch        # Watch mode for development
npm test:coverage     # Coverage report
```

## Code Review Checklist

Before submitting code for review:

- [ ] TypeScript compiles without errors (`npm run check`)
- [ ] Code follows style guide
- [ ] No console.log statements (except intentional logging)
- [ ] Components are properly typed
- [ ] Database migrations applied if schema changed
- [ ] Responsive design tested on mobile and desktop
- [ ] Accessibility considerations (keyboard navigation, ARIA labels)
- [ ] No sensitive data committed (API keys, passwords)

## Performance Guidelines

### Frontend

- **Code Splitting**: Use React.lazy for route-based splitting
  ```typescript
  const DashboardPage = lazy(() => import("@/pages/dashboard"));
  ```

- **Memoization**: Use `useMemo` and `useCallback` for expensive computations
- **Bundle Size**: Monitor with `npm run build` and check output size
- **Image Optimization**: Use WebP format, lazy loading

### Backend

- **Database Queries**: Index frequently queried columns
- **API Response**: Return only necessary data
- **Caching**: Leverage TanStack Query cache on frontend
- **Connection Pooling**: Configure PostgreSQL max connections

## Debugging

### Frontend Debugging

- **React DevTools**: Install browser extension
- **TanStack Query DevTools**: Enabled in development (floating icon)
- **Vite Inspector**: Click on components in browser to jump to source
- **Console Logging**: Use `console.log()` sparingly, remove before commit

### Backend Debugging

- **Request Logging**: Automatic logging enabled in `server/index.ts`
- **Error Stack Traces**: Full stack traces in development mode
- **Database Queries**: Drizzle logs queries in development

**Example Log Output**:
```
6:25:41 PM [express] POST /api/meals 201 in 45ms :: {"id":"meal-123"}
```

### Common Issues and Solutions

**Issue**: Module not found errors  
**Solution**: Run `npm install` to ensure all dependencies are installed

**Issue**: Port 5000 already in use  
**Solution**: Kill the process using port 5000 or change PORT environment variable

**Issue**: Database connection failed  
**Solution**: Verify DATABASE_URL is set and PostgreSQL is running

**Issue**: Tailwind classes not applying  
**Solution**: Restart dev server, check class names don't have typos

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Server port (optional) | `5000` (default) |

### Future Variables (Planned)

- `SESSION_SECRET`: For encrypted sessions
- `API_KEY_*`: For external service integrations

## Deployment

> Deployment process is project-specific and should be configured based on hosting provider.

### Build for Production

```bash
npm run build
```

This creates:
- `dist/`: Bundled server code
- `dist/public/`: Static client assets

### Start Production Server

```bash
npm start
```

Serves the application on PORT (default 5000).

### Production Checklist

- [ ] `DATABASE_URL` configured for production database
- [ ] `NODE_ENV=production` set
- [ ] SSL/TLS certificates configured
- [ ] Environment variables secured (not in code)
- [ ] Database migrations applied
- [ ] Session secret configured
- [ ] Error logging/monitoring set up

## Related Documentation

- [Architecture](./architecture.md) - System design and patterns
- [Testing Strategy](./testing-strategy.md) - Testing approach
- [Security](./security.md) - Security considerations
- [Tooling](./tooling.md) - Development tools and IDE setup
