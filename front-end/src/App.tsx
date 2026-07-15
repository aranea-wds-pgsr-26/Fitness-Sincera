import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Auth
import { AuthProvider, useAuth } from "@/features/auth/AuthProvider";
import AdminDashboardPage from "@/features/admin/AdminDashboardPage";

// Pages — Client
import DashboardPage from "@/features/client/dashboard/DashboardPage";
import NutritionPage from "@/features/client/nutrition/NutritionPage";
import WorkoutPage from "@/features/client/workout/WorkoutPage";
import ProfilePage from "@/features/client/profile/ProfilePage";
import ChatPage from "@/features/client/chat/ChatPage";

// Pages — Nutritionist
import NutritionistDashboardPage from "@/features/nutritionist/dashboard/NutritionistDashboardPage";
import NutritionistClientsPage from "@/features/nutritionist/clients/NutritionistClientsPage";
import FoodLibraryPage from "@/features/nutritionist/food-library/FoodLibraryPage";
import MealPlanEditorPage from "@/features/nutritionist/meal-plans/MealPlanEditorPage";

// Pages — Trainer
import TrainerDashboardPage from "@/features/trainer/dashboard/TrainerDashboardPage";
import ExerciseLibraryPage from "@/features/trainer/exercise-library/ExerciseLibraryPage";
import TemplatesPage from "@/features/trainer/programs/TemplatesPage";
import StudentsPage from "@/features/trainer/students/StudentsPage";

// Auth / Shared
import LoginPage from "@/features/auth/LoginPage";
import NotFound from "@/pages/not-found";

// ─── ProtectedRoute ──────────────────────────────────────────────────────────

interface ProtectedRouteProps {
  component: React.ComponentType;
  allowedRoles?: ("admin" | "client" | "nutritionist" | "trainer")[];
}

function ProtectedRoute({ component: Component, allowedRoles }: ProtectedRouteProps) {
  const { session, isLoading } = useAuth();

  if (isLoading) return null; // or a spinner

  if (!session) return <Redirect to="/login" />;

  if (session.role === "admin") {
    return <Component />;
  }

  if (allowedRoles && !allowedRoles.includes(session.role)) {
    // Redirect to the correct home for their role
    const home =
      session.role === "client"
        ? "/dashboard"
        : session.role === "nutritionist"
          ? "/nutritionist/dashboard"
          : "/trainer/dashboard";
    return <Redirect to={home} />;
  }

  return <Component />;
}

// ─── Root redirect ────────────────────────────────────────────────────────────

function RootRedirect() {
  const { session, isLoading } = useAuth();
  if (isLoading) return null;
  if (!session) return <Redirect to="/login" />;
  if (session.role === "admin") return <Redirect to="/admin/dashboard" />;
  if (session.role === "nutritionist") return <Redirect to="/nutritionist/dashboard" />;
  if (session.role === "trainer") return <Redirect to="/trainer/dashboard" />;
  return <Redirect to="/dashboard" />;
}

// ─── Router ──────────────────────────────────────────────────────────────────

function Router() {
  return (
    <Switch>
      {/* Root — smart redirect based on role */}
      <Route path="/" component={RootRedirect} />

      {/* Auth */}
      <Route path="/login" component={LoginPage} />

      {/* ── Client routes ─────────────────────────────────────── */}
      <Route path="/dashboard">
        <ProtectedRoute component={DashboardPage} allowedRoles={["client"]} />
      </Route>
      <Route path="/nutricao">
        <ProtectedRoute component={NutritionPage} allowedRoles={["client"]} />
      </Route>
      <Route path="/treino">
        <ProtectedRoute component={WorkoutPage} allowedRoles={["client"]} />
      </Route>
      <Route path="/perfil">
        <ProtectedRoute component={ProfilePage} allowedRoles={["client"]} />
      </Route>
      <Route path="/chat">
        <ProtectedRoute component={ChatPage} allowedRoles={["client", "nutritionist", "trainer", "admin"]} />
      </Route>

      <Route path="/admin/dashboard">
        <ProtectedRoute component={AdminDashboardPage} allowedRoles={["admin"]} />
      </Route>

      {/* ── Nutritionist routes ───────────────────────────────── */}
      <Route path="/nutritionist/dashboard">
        <ProtectedRoute component={NutritionistDashboardPage} allowedRoles={["nutritionist"]} />
      </Route>
      <Route path="/nutritionist/clientes">
        <ProtectedRoute component={NutritionistClientsPage} allowedRoles={["nutritionist"]} />
      </Route>
      <Route path="/nutritionist/alimentos">
        <ProtectedRoute component={FoodLibraryPage} allowedRoles={["nutritionist"]} />
      </Route>
      {/* Notion-like diet editor — /nutritionist/planos goes to client-picker + editor */}
      <Route path="/nutritionist/planos">
        <ProtectedRoute component={MealPlanEditorPage} allowedRoles={["nutritionist"]} />
      </Route>
      <Route path="/nutritionist/planos/:clientId">
        <ProtectedRoute component={MealPlanEditorPage} allowedRoles={["nutritionist"]} />
      </Route>

      {/* ── Trainer routes ────────────────────────────────────── */}
      <Route path="/trainer/dashboard">
        <ProtectedRoute component={TrainerDashboardPage} allowedRoles={["trainer"]} />
      </Route>
      <Route path="/trainer/alunos">
        <ProtectedRoute component={StudentsPage} allowedRoles={["trainer"]} />
      </Route>
      <Route path="/trainer/biblioteca">
        <ProtectedRoute component={ExerciseLibraryPage} allowedRoles={["trainer"]} />
      </Route>
      <Route path="/trainer/templates">
        <ProtectedRoute component={TemplatesPage} allowedRoles={["trainer"]} />
      </Route>

      {/* Fallback */}
      <Route path="/configuracoes">
        <ProtectedRoute component={DashboardPage} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
