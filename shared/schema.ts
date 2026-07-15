import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role", { length: 20 }).default("client").notNull(),
  isSpecialist: boolean("is_specialist").default(false).notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// --- Domain Schemas ---

export const userProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  age: z.number(),
  sex: z.string(),
  weight: z.number(),
  height: z.number(),
  goalCalories: z.number(),
  language: z.string(),
  avatar: z.string(),
  membershipType: z.string(),
  streakDays: z.number(),
});
export type UserProfile = z.infer<typeof userProfileSchema>;

export const mealSchema = z.object({
  id: z.string(),
  time: z.string(),
  title: z.string(),
  items: z.array(z.string()),
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number(),
  status: z.enum(["pending", "completed"]),
  type: z.enum(["meal", "snack"]),
  swapOptions: z.array(z.string()).optional(),
  image: z.string().optional(),
});
export type Meal = z.infer<typeof mealSchema>;

export const nutritionSummarySchema = z.object({
  consumed: z.number(),
  goal: z.number(),
  remaining: z.number(),
  protein: z.object({ current: z.number(), goal: z.number() }),
  carbs: z.object({ current: z.number(), goal: z.number() }),
  fat: z.object({ current: z.number(), goal: z.number() }),
});
export type NutritionSummary = z.infer<typeof nutritionSummarySchema>;

export const workoutSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  duration: z.number(),
  calories: z.number(),
  intensity: z.string(),
  image: z.string(),
  exercises: z.array(z.object({
    name: z.string(),
    sets: z.number().optional(),
    reps: z.string().optional(),
    duration: z.string().optional(),
  })),
});
export type Workout = z.infer<typeof workoutSchema>;

export const workoutSessionSchema = z.object({
  id: z.string(),
  workoutId: z.string(),
  startedAt: z.string(),
  completedAt: z.string().nullable(),
  status: z.enum(["active", "completed"]),
});
export type WorkoutSession = z.infer<typeof workoutSessionSchema>;

export const waterIntakeSchema = z.object({
  date: z.string(),
  amount: z.number(),
  goal: z.number(),
});
export type WaterIntake = z.infer<typeof waterIntakeSchema>;

export const dailyProgressSchema = z.object({
  date: z.string(),
  weight: z.number(),
  caloriesConsumed: z.number(),
  caloriesBurned: z.number(),
  waterMl: z.number(),
  workoutsCompleted: z.number(),
});
export type DailyProgress = z.infer<typeof dailyProgressSchema>;

export const achievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  bgColor: z.string(),
  unlocked: z.boolean(),
  unlockedAt: z.string().nullable(),
});
export type Achievement = z.infer<typeof achievementSchema>;

export const dashboardSummarySchema = z.object({
  caloriesConsumed: z.number(),
  caloriesGoal: z.number(),
  caloriesBurned: z.number(),
  waterMl: z.number(),
  waterGoal: z.number(),
  workoutsToday: z.number(),
  streakDays: z.number(),
  wellnessIndex: z.number(),
  nextMeal: mealSchema.nullable(),
  todayWorkout: workoutSchema.nullable(),
});

// --- Professional Dashboards Schema ---

export const clientsNutritionist = pgTable("clients_nutritionist", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  nutritionistId: varchar("nutritionist_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  clientId: varchar("client_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 20 }).default("active").notNull(),
  mealPlanId: uuid("meal_plan_id"),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
});

export const clientsTrainer = pgTable("clients_trainer", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  trainerId: varchar("trainer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  clientId: varchar("client_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 20 }).default("active").notNull(),
  currentProgramId: uuid("current_program_id"),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
});

// ─── New Domain Schemas (Sprint 1) ──────────────────────────────────────────

/** A single editable item inside a meal plan (one food entry) */
export const mealPlanItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.string(),          // e.g. "150g"
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number(),
  notes: z.string().optional(),
});
export type MealPlanItem = z.infer<typeof mealPlanItemSchema>;

/** A block in the plan: one meal slot (e.g. "Almoço 13:00") */
export const mealPlanBlockSchema = z.object({
  id: z.string(),
  time: z.string(),              // "13:00"
  title: z.string(),             // "Almoço"
  type: z.enum(["meal", "snack"]),
  items: z.array(mealPlanItemSchema),
  image: z.string().optional(),
});
export type MealPlanBlock = z.infer<typeof mealPlanBlockSchema>;

/** Full meal plan — created by nutritionist, published to client */
export const mealPlanSchema = z.object({
  id: z.string(),
  nutritionistId: z.string(),
  clientId: z.string(),
  name: z.string(),              // "Plano Semana 1"
  status: z.enum(["draft", "review", "published"]),
  blocks: z.array(mealPlanBlockSchema),
  publishedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type MealPlan = z.infer<typeof mealPlanSchema>;

/** Workout plan — created by trainer, published to client */
export const workoutPlanSchema = z.object({
  id: z.string(),
  trainerId: z.string(),
  clientId: z.string(),
  name: z.string(),
  status: z.enum(["draft", "published"]),
  sessions: z.array(z.object({
    id: z.string(),
    day: z.string(),             // "Segunda", "Terça" …
    workoutId: z.string(),
    notes: z.string().optional(),
  })),
  publishedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type WorkoutPlan = z.infer<typeof workoutPlanSchema>;

/** Client daily log — records what was actually eaten/done */
export const dailyLogSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  date: z.string(),              // "YYYY-MM-DD"
  mealsConsumed: z.array(z.object({
    mealBlockId: z.string(),
    photoUrl: z.string().optional(),
    actualCalories: z.number().optional(),
    completedAt: z.string(),
  })),
  waterMl: z.number(),
  workoutDone: z.boolean(),
});
export type DailyLog = z.infer<typeof dailyLogSchema>;

/** Chat message between client and AI agent */
export const chatMessageSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  context: z.enum(["nutrition", "workout", "general"]).optional(),
  attachedPhotoUrl: z.string().optional(),
  createdAt: z.string(),
});
export type ChatMessage = z.infer<typeof chatMessageSchema>;

/** A meal swap request: client requests AI alternative, nutritionist can review */
export const mealSwapRequestSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  mealBlockId: z.string(),
  reason: z.string(),
  suggestedBy: z.literal("ai"),
  status: z.enum(["pending", "approved_client", "reviewed_pro"]),
  suggestion: mealPlanBlockSchema,
  createdAt: z.string(),
});
export type MealSwapRequest = z.infer<typeof mealSwapRequestSchema>;

/** Auth session type — used by AuthContext on the client */
export const authSessionSchema = z.object({
  userId: z.string(),
  role: z.enum(["admin", "client", "nutritionist", "trainer"]),
  name: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
});
export type AuthSession = z.infer<typeof authSessionSchema>;
