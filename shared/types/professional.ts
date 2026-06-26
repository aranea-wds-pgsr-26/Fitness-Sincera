import { z } from "zod";

// Nutritionist Types
export const nutritionistDashboardStatsSchema = z.object({
  totalClients: z.number(),
  activeClients: z.number(),
  clientsAtRisk: z.number(),
  avgCompliancePercent: z.number(),
  recentActivity: z.array(z.object({
    id: z.string(),
    clientName: z.string(),
    action: z.string(),
    timestamp: z.string(),
  })).optional(),
  weeklyCaloriesData: z.array(z.object({
    label: z.string(),
    value: z.number(),
  })).optional(),
});

export const clientListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  status: z.enum(["active", "inactive", "paused"]),
  lastCheckin: z.string().nullable(),
  mealPlanId: z.string().nullable(),
  adherence: z.number(),
});

export const nutritionMetricsSchema = z.object({
  date: z.string(),
  caloriesConsumed: z.number(),
  caloriesGoal: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number(),
  proteinGoal: z.number(),
  carbsGoal: z.number(),
  fatGoal: z.number(),
});

export const clientNutritionDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  status: z.string(),
  metrics: z.array(nutritionMetricsSchema),
  currentMetrics: nutritionMetricsSchema,
});

// Trainer Types
export const trainerDashboardStatsSchema = z.object({
  totalStudents: z.number().optional(),
  totalClients: z.number().optional(),
  activeStudents: z.number().optional(),
  studentsLowAdherence: z.number().optional(),
  lowAdherenceCount: z.number().optional(),
  avgAdherencePercent: z.number().optional(),
  avgPerformance: z.number().optional(),
  recentSessions: z.array(z.object({
    id: z.string(),
    clientName: z.string(),
    sessionDate: z.string(),
    status: z.string(),
  })).optional(),
  weeklyVolumeData: z.array(z.object({
    label: z.string(),
    value: z.number(),
  })).optional(),
  lastUpdated: z.string().optional(),
});

export const workoutSessionSchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.string(),
  duration: z.number(),
  exercisesCompleted: z.number(),
  totalExercises: z.number(),
});

export const personalRecordSchema = z.object({
  exercise: z.string(),
  weight: z.number(),
  date: z.string(),
});

export const clientWorkoutDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  status: z.string(),
  nextWorkout: z.string().nullable(),
  lastFiveSessions: z.array(workoutSessionSchema),
  personalRecords: z.array(personalRecordSchema),
  weeklyVolume: z.number(),
  consistency: z.number(),
});

export type NutritionistDashboardStats = z.infer<typeof nutritionistDashboardStatsSchema>;
export type ClientListItem = z.infer<typeof clientListItemSchema>;
export type NutritionMetrics = z.infer<typeof nutritionMetricsSchema>;
export type ClientNutritionDetail = z.infer<typeof clientNutritionDetailSchema>;

export type TrainerDashboardStats = z.infer<typeof trainerDashboardStatsSchema>;
export type WorkoutSession = z.infer<typeof workoutSessionSchema>;
export type PersonalRecord = z.infer<typeof personalRecordSchema>;
export type ClientWorkoutDetail = z.infer<typeof clientWorkoutDetailSchema>;
