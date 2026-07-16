import { relations, sql } from "drizzle-orm";
import {
  doublePrecision,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
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

export const fitnessClientProfiles = pgTable("fitness_client_profiles", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id")
    .notNull()
    .references(() => fitnessUsers.id, { onDelete: "cascade" }),
  phone: text("phone"),
  birthDate: text("birth_date"),
  gender: text("gender"),
  goal: text("goal").notNull(),
  planInterest: text("plan_interest").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
});

export const fitnessClientAnamneses = pgTable("fitness_client_anamneses", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id")
    .notNull()
    .references(() => fitnessUsers.id, { onDelete: "cascade" }),
  objective: text("objective").notNull(),
  heightCm: doublePrecision("height_cm"),
  weightKg: doublePrecision("weight_kg"),
  activityLevel: text("activity_level"),
  restrictions: text("restrictions"),
  injuries: text("injuries"),
  medications: text("medications"),
  sleepQuality: text("sleep_quality"),
  hydration: text("hydration"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
});

export const fitnessProfessionalClients = pgTable(
  "fitness_professional_clients",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    professionalId: uuid("professional_id").notNull().references(() => fitnessUsers.id, { onDelete: "cascade" }),
    clientId: uuid("client_id").notNull().references(() => fitnessUsers.id, { onDelete: "cascade" }),
    specialty: text("specialty").notNull(),
    status: text("status").notNull().default("active"),
    createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
  },
  (table) => [
    uniqueIndex("fitness_professional_clients_unique_assignment").on(table.professionalId, table.clientId, table.specialty),
    index("fitness_professional_clients_client_idx").on(table.clientId),
  ],
);
export const fitnessUsersRelations = relations(fitnessUsers, ({ many }) => ({
  sessions: many(fitnessSessions),
  meals: many(fitnessMeals),
  dietPlans: many(fitnessDietPlans),
  workoutPlans: many(fitnessWorkoutPlans),
  chatMessages: many(fitnessChatMessages),
  wearableDevices: many(fitnessWearableDevices),
  clientProfiles: many(fitnessClientProfiles),
  clientAnamneses: many(fitnessClientAnamneses),
  professionalAssignments: many(fitnessProfessionalClients, { relationName: "professionalAssignments" }),
  clientAssignments: many(fitnessProfessionalClients, { relationName: "clientAssignments" }),
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

export const fitnessClientProfilesRelations = relations(fitnessClientProfiles, ({ one }) => ({
  user: one(fitnessUsers, {
    fields: [fitnessClientProfiles.userId],
    references: [fitnessUsers.id],
  }),
}));

export const fitnessClientAnamnesesRelations = relations(fitnessClientAnamneses, ({ one }) => ({
  user: one(fitnessUsers, {
    fields: [fitnessClientAnamneses.userId],
    references: [fitnessUsers.id],
  }),
}));

export const fitnessProfessionalClientsRelations = relations(fitnessProfessionalClients, ({ one }) => ({
  professional: one(fitnessUsers, {
    fields: [fitnessProfessionalClients.professionalId],
    references: [fitnessUsers.id],
    relationName: "professionalAssignments",
  }),
  client: one(fitnessUsers, {
    fields: [fitnessProfessionalClients.clientId],
    references: [fitnessUsers.id],
    relationName: "clientAssignments",
  }),
}));
export type FitnessUser = typeof fitnessUsers.$inferSelect;
export type NewFitnessUser = typeof fitnessUsers.$inferInsert;
export type FitnessMeal = typeof fitnessMeals.$inferSelect;
export type NewFitnessMeal = typeof fitnessMeals.$inferInsert;
export type FitnessFood = typeof fitnessFoods.$inferSelect;
export type NewFitnessFood = typeof fitnessFoods.$inferInsert;
export type FitnessSiteLead = typeof fitnessSiteLeads.$inferSelect;
export type NewFitnessSiteLead = typeof fitnessSiteLeads.$inferInsert;
export type FitnessClientProfile = typeof fitnessClientProfiles.$inferSelect;
export type NewFitnessClientProfile = typeof fitnessClientProfiles.$inferInsert;
export type FitnessClientAnamnesis = typeof fitnessClientAnamneses.$inferSelect;
export type NewFitnessClientAnamnesis = typeof fitnessClientAnamneses.$inferInsert;
