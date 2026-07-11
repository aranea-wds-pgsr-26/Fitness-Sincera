import { randomUUID } from "node:crypto";
import { initializeDatabase, pool } from "./db";

export type UserRole = "admin" | "nutritionist" | "trainer" | "client";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: string;
}

export interface Meal {
  id: string;
  userId: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  notes?: string;
  createdAt?: string;
}

export interface DietPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  meals: string[];
  createdAt?: string;
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  exercises: string[];
  createdAt?: string;
}

export interface WearableDevice {
  id: string;
  userId: string;
  provider: string;
  model: string;
  syncedAt: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

function mapUser(row: any): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password,
    role: row.role as UserRole,
    createdAt: row.created_at,
  };
}

function mapMeal(row: any): Meal {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    calories: Number(row.calories ?? 0),
    protein: Number(row.protein ?? 0),
    carbs: Number(row.carbs ?? 0),
    fat: Number(row.fat ?? 0),
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
  };
}

function mapDiet(row: any): DietPlan {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    description: row.description ?? "",
    meals: row.meals ?? [],
    createdAt: row.created_at,
  };
}

function mapWorkout(row: any): WorkoutPlan {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    description: row.description ?? "",
    exercises: row.exercises ?? [],
    createdAt: row.created_at,
  };
}

function mapWearable(row: any): WearableDevice {
  return {
    id: row.id,
    userId: row.user_id,
    provider: row.provider,
    model: row.model,
    syncedAt: row.synced_at,
  };
}

function mapChat(row: any): ChatMessage {
  return {
    id: row.id,
    userId: row.user_id,
    role: row.role as "user" | "assistant",
    content: row.content,
    createdAt: row.created_at,
  };
}

export async function initializeStore() {
  await initializeDatabase();

  const existing = await pool.query("SELECT id FROM fitness_users WHERE email = $1", ["admin@fitnesssincera.com"]);
  if (existing.rowCount === 0) {
    await pool.query(
      `INSERT INTO fitness_users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5)`,
      [randomUUID(), "Admin", "admin@fitnesssincera.com", "admin123", "admin"],
    );
  }
}

export async function createUser(input: Omit<User, "id" | "createdAt">) {
  const id = randomUUID();
  const row = await pool.query(
    `INSERT INTO fitness_users (id, name, email, password, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [id, input.name, input.email, input.password, input.role],
  );

  return mapUser(row.rows[0]);
}

export async function findUserByEmail(email: string) {
  const row = await pool.query("SELECT * FROM fitness_users WHERE LOWER(email) = LOWER($1)", [email]);
  return row.rowCount ? mapUser(row.rows[0]) : null;
}

export async function createSessionToken(user: User) {
  const token = randomUUID();
  await pool.query(`INSERT INTO fitness_sessions (token, user_id) VALUES ($1, $2)`, [token, user.id]);
  return token;
}

export async function revokeSession(token: string) {
  await pool.query("DELETE FROM fitness_sessions WHERE token = $1", [token]);
}

export async function getSessionUser(token: string) {
  const row = await pool.query(
    `SELECT u.* FROM fitness_sessions s JOIN fitness_users u ON u.id = s.user_id WHERE s.token = $1`,
    [token],
  );

  return row.rowCount ? mapUser(row.rows[0]) : null;
}

export async function listMealsForUser(userId: string) {
  const rows = await pool.query("SELECT * FROM fitness_meals WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
  return rows.rows.map(mapMeal);
}

export async function createMeal(userId: string, payload: Partial<Meal>) {
  const id = randomUUID();
  const row = await pool.query(
    `INSERT INTO fitness_meals (id, user_id, name, calories, protein, carbs, fat, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [id, userId, payload.name ?? "Meal", Number(payload.calories ?? 0), Number(payload.protein ?? 0), Number(payload.carbs ?? 0), Number(payload.fat ?? 0), payload.notes ?? null],
  );

  return mapMeal(row.rows[0]);
}

export async function updateMeal(mealId: string, userId: string, payload: Partial<Meal>) {
  const fields = Object.entries(payload).filter(([key]) => key !== "id" && key !== "userId");
  if (fields.length === 0) {
    return null;
  }

  const setClauses = fields.map(([key], index) => `${key} = $${index + 3}`).join(", ");
  const values = fields.map(([, value]) => value);
  const row = await pool.query(
    `UPDATE fitness_meals SET ${setClauses} WHERE id = $1 AND user_id = $2 RETURNING *`,
    [mealId, userId, ...values],
  );

  return row.rowCount ? mapMeal(row.rows[0]) : null;
}

export async function deleteMeal(mealId: string, userId: string) {
  const result = await pool.query("DELETE FROM fitness_meals WHERE id = $1 AND user_id = $2", [mealId, userId]);
  return result.rowCount ? true : false;
}

export async function listDietsForUser(userId: string) {
  const rows = await pool.query("SELECT * FROM fitness_diet_plans WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
  return rows.rows.map(mapDiet);
}

export async function createDiet(userId: string, payload: Partial<DietPlan>) {
  const id = randomUUID();
  const row = await pool.query(
    `INSERT INTO fitness_diet_plans (id, user_id, name, description, meals)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [id, userId, payload.name ?? "Diet", payload.description ?? "", payload.meals ?? []],
  );

  return mapDiet(row.rows[0]);
}

export async function updateDiet(dietId: string, userId: string, payload: Partial<DietPlan>) {
  const fields = Object.entries(payload).filter(([key]) => key !== "id" && key !== "userId");
  if (fields.length === 0) {
    return null;
  }

  const setClauses = fields.map(([key], index) => `${key} = $${index + 3}`).join(", ");
  const values = fields.map(([, value]) => value);
  const row = await pool.query(
    `UPDATE fitness_diet_plans SET ${setClauses} WHERE id = $1 AND user_id = $2 RETURNING *`,
    [dietId, userId, ...values],
  );

  return row.rowCount ? mapDiet(row.rows[0]) : null;
}

export async function deleteDiet(dietId: string, userId: string) {
  const result = await pool.query("DELETE FROM fitness_diet_plans WHERE id = $1 AND user_id = $2", [dietId, userId]);
  return result.rowCount ? true : false;
}

export async function listWorkoutsForUser(userId: string) {
  const rows = await pool.query("SELECT * FROM fitness_workout_plans WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
  return rows.rows.map(mapWorkout);
}

export async function createWorkout(userId: string, payload: Partial<WorkoutPlan>) {
  const id = randomUUID();
  const row = await pool.query(
    `INSERT INTO fitness_workout_plans (id, user_id, name, description, exercises)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [id, userId, payload.name ?? "Workout", payload.description ?? "", payload.exercises ?? []],
  );

  return mapWorkout(row.rows[0]);
}

export async function updateWorkout(workoutId: string, userId: string, payload: Partial<WorkoutPlan>) {
  const fields = Object.entries(payload).filter(([key]) => key !== "id" && key !== "userId");
  if (fields.length === 0) {
    return null;
  }

  const setClauses = fields.map(([key], index) => `${key} = $${index + 3}`).join(", ");
  const values = fields.map(([, value]) => value);
  const row = await pool.query(
    `UPDATE fitness_workout_plans SET ${setClauses} WHERE id = $1 AND user_id = $2 RETURNING *`,
    [workoutId, userId, ...values],
  );

  return row.rowCount ? mapWorkout(row.rows[0]) : null;
}

export async function deleteWorkout(workoutId: string, userId: string) {
  const result = await pool.query("DELETE FROM fitness_workout_plans WHERE id = $1 AND user_id = $2", [workoutId, userId]);
  return result.rowCount ? true : false;
}

export async function listWearablesForUser(userId: string) {
  const rows = await pool.query("SELECT * FROM fitness_wearable_devices WHERE user_id = $1 ORDER BY synced_at DESC", [userId]);
  return rows.rows.map(mapWearable);
}

export async function createWearable(userId: string, payload: Partial<WearableDevice>) {
  const id = randomUUID();
  const row = await pool.query(
    `INSERT INTO fitness_wearable_devices (id, user_id, provider, model)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [id, userId, payload.provider ?? "unknown", payload.model ?? "unknown"],
  );

  return mapWearable(row.rows[0]);
}

export async function createSyncEvent(provider: string, payload: Record<string, unknown>) {
  return {
    provider,
    payload,
    syncedAt: new Date().toISOString(),
  };
}

export async function listChatMessagesForUser(userId: string) {
  const rows = await pool.query("SELECT * FROM fitness_chat_messages WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
  return rows.rows.map(mapChat);
}

export async function createChatMessage(userId: string, content: string, role: "user" | "assistant") {
  const id = randomUUID();
  const row = await pool.query(
    `INSERT INTO fitness_chat_messages (id, user_id, role, content)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [id, userId, role, content],
  );

  return mapChat(row.rows[0]);
}
