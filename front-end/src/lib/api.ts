import { apiRequest } from "./queryClient";
import type {
  UserProfile,
  Meal,
  MealPlan,
  NutritionSummary,
  Workout,
  WorkoutSession,
  WaterIntake,
  DailyProgress,
  Achievement,
} from "@shared/schema";

export const api = {
  // Profile
  getProfile: async (): Promise<UserProfile> => {
    const res = await apiRequest("GET", "/api/profile");
    return res.json();
  },
  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const res = await apiRequest("PUT", "/api/profile", data);
    return res.json();
  },

  // Meals
  getMealsToday: async (): Promise<Meal[]> => {
    const res = await apiRequest("GET", "/api/meals/today");
    return res.json();
  },
  updateMealStatus: async (id: string, status: "pending" | "completed"): Promise<Meal> => {
    const res = await apiRequest("PUT", `/api/meals/${id}/status`, { status });
    return res.json();
  },
  swapMeal: async (id: string): Promise<Meal> => {
    const res = await apiRequest("PUT", `/api/meals/${id}/swap`);
    return res.json();
  },
  getNutritionSummary: async (): Promise<NutritionSummary> => {
    const res = await apiRequest("GET", "/api/nutrition/summary");
    return res.json();
  },

  // Workouts
  getWorkouts: async (category?: string): Promise<Workout[]> => {
    const url = category ? `/api/workouts?category=${encodeURIComponent(category)}` : "/api/workouts";
    const res = await apiRequest("GET", url);
    return res.json();
  },
  getWorkout: async (id: string): Promise<Workout> => {
    const res = await apiRequest("GET", `/api/workouts/${id}`);
    return res.json();
  },
  startWorkout: async (id: string): Promise<WorkoutSession> => {
    const res = await apiRequest("POST", `/api/workouts/${id}/start`);
    return res.json();
  },
  completeWorkout: async (sessionId: string): Promise<WorkoutSession> => {
    const res = await apiRequest("POST", `/api/workouts/${sessionId}/complete`);
    return res.json();
  },

  // Daily tracking
  getDashboardSummary: async () => {
    const res = await apiRequest("GET", "/api/tracking/today");
    const payload = await res.json();
    return payload.data;
  },
  // Progress
  getProgressHistory: async (): Promise<DailyProgress[]> => {
    const res = await apiRequest("GET", "/api/progress/history");
    return res.json();
  },

  // Water
  getWaterToday: async (): Promise<WaterIntake> => {
    const res = await apiRequest("GET", "/api/tracking/today");
    const payload = await res.json();
    return { date: payload.data.trackingDate, amount: Number(payload.data.waterMl), goal: Number(payload.data.waterGoalMl) };
  },
  addWater: async (amount: number): Promise<WaterIntake> => {
    const res = await apiRequest("POST", "/api/tracking/water", { amount });
    const payload = await res.json();
    return { date: payload.data.trackingDate, amount: Number(payload.data.waterMl), goal: Number(payload.data.waterGoalMl) };
  },
  // Achievements
  getAchievements: async (): Promise<Achievement[]> => {
    const res = await apiRequest("GET", "/api/achievements");
    return res.json();
  },

  // Client Meal Plan (assigned by nutritionist)
  getClientMealPlan: async (): Promise<MealPlan> => {
    const res = await apiRequest("GET", "/api/client/meal-plan/today");
    return res.json();
  },
  requestMealBlockSwap: async (blockId: string, reason: string, note?: string): Promise<void> => {
    await apiRequest("POST", `/api/client/meals/${blockId}/swap-request`, { reason, note });
  },

  // Professional Dashboards - Nutritionist
  getNutritionistDashboard: async () => {
    const res = await apiRequest("GET", "/api/nutritionist/dashboard");
    return res.json();
  },
  getNutritionistClients: async (filters?: { status?: string; search?: string; page?: number }) => {
    let url = "/api/nutritionist/clients";
    if (filters) {
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.search) params.append("search", filters.search);
      if (filters.page) params.append("page", filters.page.toString());
      if (params.toString()) url += `?${params.toString()}`;
    }
    const res = await apiRequest("GET", url);
    return res.json();
  },
  getNutritionistClientDetail: async (clientId: string) => {
    const res = await apiRequest("GET", `/api/nutritionist/clients/${clientId}`);
    return res.json();
  },
  updateNutritionistClientPlan: async (clientId: string, data: any) => {
    const res = await apiRequest("PUT", `/api/nutritionist/clients/${clientId}/plan`, data);
    return res.json();
  },

  // Professional Dashboards - Trainer
  getTrainerDashboard: async () => {
    const res = await apiRequest("GET", "/api/trainer/dashboard");
    return res.json();
  },
  getTrainerClients: async (filters?: { status?: string; search?: string; page?: number }) => {
    let url = "/api/trainer/clients";
    if (filters) {
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.search) params.append("search", filters.search);
      if (filters.page) params.append("page", filters.page.toString());
      if (params.toString()) url += `?${params.toString()}`;
    }
    const res = await apiRequest("GET", url);
    return res.json();
  },
  getTrainerClientDetail: async (clientId: string) => {
    const res = await apiRequest("GET", `/api/trainer/clients/${clientId}`);
    return res.json();
  },
  updateTrainerClientProgram: async (clientId: string, data: any) => {
    const res = await apiRequest("PUT", `/api/trainer/clients/${clientId}/program`, data);
    return res.json();
  },
};
