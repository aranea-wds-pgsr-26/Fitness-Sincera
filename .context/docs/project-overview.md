---
type: doc
name: project-overview
description: High-level overview of the project, its purpose, and key components
category: overview
generated: 2026-02-14
status: filled
scaffoldVersion: "2.0.0"
---

# Fitness Sincera - Project Overview

## Purpose and Goals

**Fitness Sincera** is a comprehensive web-based fitness and health tracking application designed to help users monitor their nutrition, workouts, and overall wellness progress. The platform provides an intuitive dashboard for tracking daily health metrics, managing meal plans, organizing workout routines, and setting fitness goals.

## Main Features

### 1. Dashboard
- **Health Overview**: Real-time display of key health metrics (weight, body fat, muscle mass)
- **Goal Progress Tracking**: Visual progress indicators for fitness goals
- **Energy Balance**: Calorie intake vs. expenditure tracking
- **Quick Stats**: Summary cards showing daily activity and nutrition status

### 2. Nutrition Management
- **Meal Planning**: Create and track daily meal plans
- **Calorie Tracking**: Monitor caloric intake and macronutrient distribution
- **Meal Status**: Track completion status of planned meals (pending, completed, skipped)
- **Nutritional Insights**: Visual data representation using charts

### 3. Workout Tracking
- **Exercise Routines**: Create custom workout plans
- **Progress Monitoring**: Track workout completion and performance
- **Exercise Library**: Comprehensive database of exercises

### 4. User Profile
- **Personal Information**: Manage user profile and preferences
- **Health Metrics**: Input and track body measurements
- **Goal Setting**: Define and adjust fitness objectives

## Target Users

- **Fitness Enthusiasts**: Individuals committed to tracking their health and fitness journey
- **Health-Conscious Users**: People looking to improve their nutrition and exercise habits
- **Personal Trainers**: Professionals managing client progress (future feature)
- **Nutritionists**: Diet and nutrition professionals monitoring client adherence (future feature)

## Technology Stack

### Frontend
- **React 19.2.0**: Modern UI library for building interactive interfaces
- **Wouter 3.3.5**: Lightweight client-side routing
- **Tailwind CSS 4.1.14**: Utility-first CSS framework for styling
- **Radix UI**: Comprehensive component library for accessible UI primitives
- **Framer Motion 12.23**: Animation library for smooth interactions
- **Recharts 2.15.4**: Data visualization library for charts and graphs
- **React Hook Form 7.66**: Form state management and validation
- **Zod 3.25**: TypeScript-first schema validation

### Backend
- **Express 5.0.1**: Fast, unopinionated web framework for Node.js
- **TypeScript 5.6.3**: Static type checking for JavaScript
- **Drizzle ORM 0.39.3**: TypeScript ORM for database interactions
- **PostgreSQL**: Primary database for data persistence
- **Passport 0.7.0**: Authentication middleware (ready for implementation)

### Build Tools & Development
- **Vite 7.1.9**: Next-generation frontend build tool
- **TSX**: TypeScript execution and REPL
- **Drizzle Kit**: Database migration and schema management tool

### UI Components
- **shadcn/ui**: Beautiful, accessible component library
- **Lucide React**: Modern icon library
- **Sonner**: Toast notification system
- **date-fns**: Modern date utility library

## Key Dependencies and Integrations

### State Management
- **TanStack Query (React Query) 5.60.5**: Powerful data synchronization and caching
- **React Hook Form + Zod**: Form validation and schema validation

### Session Management
- **Express Session 1.18.1**: Server-side session management
- **Connect PG Simple**: PostgreSQL session store

### Real-time Communication (Planned)
- **WebSockets (ws 8.18.0)**: Ready for real-time features implementation

## Project Structure

```
Fitness-Sincera/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ui/       # Base UI components (shadcn/ui)
│   │   │   ├── layout/   # Layout components (Sidebar, Dashboard Layout)
│   │   │   └── dashboard/# Dashboard-specific components
│   │   ├── pages/        # Application pages/routes
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions and configurations
│   ├── public/           # Static assets
│   └── index.html        # HTML entry point
├── server/               # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Storage interface and implementation
│   ├── vite.ts           # Vite dev server integration
│   └── static.ts         # Static file serving
├── shared/               # Shared code between client and server
│   └── schema.ts         # Database schema and type definitions
└── script/              # Build and deployment scripts
    └── build.ts          # Production build script
```

## Getting Started

### Prerequisites
- **Node.js**: Version 20+ recommended
- **PostgreSQL**: Database server with DATABASE_URL configured
- **npm**: Package manager (comes with Node.js)

### Installation

1. **Clone the repository** (if not already done)
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   export DATABASE_URL="postgresql://user:password@localhost:5432/fitness_sincera"
   ```

4. **Run database migrations**:
   ```bash
   npm run db:push
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

### Development Workflow

- **Frontend Development**: Run `npm run dev:client` for client-only development
- **Backend Development**: Run `npm run dev` for full-stack development
- **Type Checking**: Run `npm run check` to verify TypeScript types
- **Build for Production**: Run `npm run build` to create production bundle

## Current Status

### Implemented Features ✅
- Modern, responsive UI with Tailwind CSS
- Dashboard with health overview and metrics
- Navigation system with sidebar
- Basic page structure for all main sections
- Database schema with user model
- Development environment setup
- Component library integration (shadcn/ui)

### In Progress 🚧
- API endpoints for data management
- User authentication and authorization
- Database models for workouts, meals, and goals
- Data persistence layer
- Real-time updates

### Planned Features 📋
- User registration and login
- Complete nutrition tracking API
- Workout logging and progress tracking
- Goal management system
- Data visualization enhancements
- Mobile responsiveness improvements
- Export/import functionality
- Social features (sharing progress, challenges)
- Integration with fitness trackers (future consideration)

## Design Philosophy

The application follows modern web design principles:

- **User-Centric**: Intuitive navigation and clear visual hierarchy
- **Responsive**: Optimized for both desktop and mobile devices
- **Performant**: Efficient data loading and caching strategies
- **Accessible**: Built with accessibility in mind using Radix UI primitives
- **Type-Safe**: Comprehensive TypeScript coverage for reliability
- **Modular**: Component-based architecture for maintainability

## Security Considerations

- Session-based authentication (ready for implementation)
- Environment variable management for sensitive data
- PostgreSQL for secure data storage
- Input validation using Zod schemas
- HTTPS enforcement in production (to be configured)

## Future Enhancements

1. **AI-Powered Features**
   - Meal recommendations based on goals
   - Workout plan generation
   - Progress predictions

2. **Social Features**
   - Community challenges
   - Progress sharing
   - Friend connections

3. **Advanced Analytics**
   - Detailed trend analysis
   - Comprehensive reporting
   - Export to PDF/CSV

4. **Integrations**
   - Fitness tracker sync (Fitbit, Apple Health)
   - Nutrition database APIs
   - Calendar integration

## Support and Documentation

For more detailed information, refer to:
- [Architecture Documentation](./architecture.md)
- [Development Workflow](./development-workflow.md)
- [Data Flow](./data-flow.md)
- [Testing Strategy](./testing-strategy.md)
