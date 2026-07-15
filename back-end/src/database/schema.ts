import { relations, sql } from "drizzle-orm";
import {
  doublePrecision,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const fitnessUsers = pgTable("fitness_users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
});

export const fitnessSessions = pgTable("fitness_sessions", {
  token: text("token").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => fitnessUsers.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
});

export const fitnessMeals = pgTable("fitness_meals", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id")
    .notNull()
    .references(() => fitnessUsers.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  calories: doublePrecision("calories").default(0),
  protein: doublePrecision("protein").default(0),
  carbs: doublePrecision("carbs").default(0),
  fat: doublePrecision("fat").default(0),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
});

export const fitnessFoods = pgTable("fitness_foods", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  brand: text("brand"),
  category: text("category"),
  servingSize: doublePrecision("serving_size").default(100),
  servingUnit: text("serving_unit").default("g"),
  calories: doublePrecision("calories").default(0),
  protein: doublePrecision("protein").default(0),
  carbs: doublePrecision("carbs").default(0),
  fat: doublePrecision("fat").default(0),
  fiber: doublePrecision("fiber").default(0),
  sodium: doublePrecision("sodium").default(0),
  source: text("source").default("manual"),
  externalId: text("external_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
});

export const fitnessDietPlans = pgTable("fitness_diet_plans", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id")
    .notNull()
    .references(() => fitnessUsers.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  meals: text("meals").array().default(sql`ARRAY[]::TEXT[]`),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
});

export const fitnessWorkoutPlans = pgTable("fitness_workout_plans", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id")
    .notNull()
    .references(() => fitnessUsers.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  exercises: text("exercises").array().default(sql`ARRAY[]::TEXT[]`),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
});

export const fitnessChatMessages = pgTable("fitness_chat_messages", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id")
    .notNull()
    .references(() => fitnessUsers.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
});

export const fitnessWearableDevices = pgTable("fitness_wearable_devices", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id")
    .notNull()
    .references(() => fitnessUsers.id, { onDelete: "cascade" }),
  provider: text("provider").notNull(),
  model: text("model").notNull(),
  syncedAt: timestamp("synced_at", { withTimezone: true }).default(sql`now()`),
});

export const fitnessSiteLeads = pgTable("fitness_site_leads", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  audience: text("audience").notNull(),
  interest: text("interest").notNull(),
  message: text("message"),
  source: text("source").default("public_site"),
  status: text("status").default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
});

export const fitnessUsersRelations = relations(fitnessUsers, ({ many }) => ({
  sessions: many(fitnessSessions),
  meals: many(fitnessMeals),
  dietPlans: many(fitnessDietPlans),
  workoutPlans: many(fitnessWorkoutPlans),
  chatMessages: many(fitnessChatMessages),
  wearableDevices: many(fitnessWearableDevices),
}));

export const fitnessSessionsRelations = relations(fitnessSessions, ({ one }) => ({
  user: one(fitnessUsers, {
    fields: [fitnessSessions.userId],
    references: [fitnessUsers.id],
  }),
}));

export const fitnessMealsRelations = relations(fitnessMeals, ({ one }) => ({
  user: one(fitnessUsers, {
    fields: [fitnessMeals.userId],
    references: [fitnessUsers.id],
  }),
}));

export const fitnessFoodsRelations = relations(fitnessFoods, () => ({}));

export const fitnessDietPlansRelations = relations(fitnessDietPlans, ({ one }) => ({
  user: one(fitnessUsers, {
    fields: [fitnessDietPlans.userId],
    references: [fitnessUsers.id],
  }),
}));

export const fitnessWorkoutPlansRelations = relations(fitnessWorkoutPlans, ({ one }) => ({
  user: one(fitnessUsers, {
    fields: [fitnessWorkoutPlans.userId],
    references: [fitnessUsers.id],
  }),
}));

export const fitnessChatMessagesRelations = relations(fitnessChatMessages, ({ one }) => ({
  user: one(fitnessUsers, {
    fields: [fitnessChatMessages.userId],
    references: [fitnessUsers.id],
  }),
}));

export const fitnessWearableDevicesRelations = relations(fitnessWearableDevices, ({ one }) => ({
  user: one(fitnessUsers, {
    fields: [fitnessWearableDevices.userId],
    references: [fitnessUsers.id],
  }),
}));

export const fitnessSiteLeadsRelations = relations(fitnessSiteLeads, () => ({}));

export type FitnessUser = typeof fitnessUsers.$inferSelect;
export type NewFitnessUser = typeof fitnessUsers.$inferInsert;
export type FitnessMeal = typeof fitnessMeals.$inferSelect;
export type NewFitnessMeal = typeof fitnessMeals.$inferInsert;
export type FitnessFood = typeof fitnessFoods.$inferSelect;
export type NewFitnessFood = typeof fitnessFoods.$inferInsert;
export type FitnessSiteLead = typeof fitnessSiteLeads.$inferSelect;
export type NewFitnessSiteLead = typeof fitnessSiteLeads.$inferInsert;
