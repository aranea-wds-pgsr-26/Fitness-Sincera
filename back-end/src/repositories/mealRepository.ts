import { randomUUID } from "node:crypto";
import { and, desc, eq } from "drizzle-orm";
import { db } from "../database/client";
import { fitnessMeals } from "../database/schema";

export interface MealPayload {
  name?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  notes?: string;
}

function mapMeal(row: typeof fitnessMeals.$inferSelect) {
  return {
    id: row.id,
    userId: row.userId,
    name: row.name,
    calories: Number(row.calories ?? 0),
    protein: Number(row.protein ?? 0),
    carbs: Number(row.carbs ?? 0),
    fat: Number(row.fat ?? 0),
    notes: row.notes ?? undefined,
    createdAt: row.createdAt,
  };
}

export const MealRepository = {
  async listByUser(userId: string) {
    const rows = await db
      .select()
      .from(fitnessMeals)
      .where(eq(fitnessMeals.userId, userId))
      .orderBy(desc(fitnessMeals.createdAt));

    return rows.map(mapMeal);
  },

  async create(userId: string, payload: MealPayload) {
    const [meal] = await db
      .insert(fitnessMeals)
      .values({
        id: randomUUID(),
        userId,
        name: payload.name ?? "Meal",
        calories: Number(payload.calories ?? 0),
        protein: Number(payload.protein ?? 0),
        carbs: Number(payload.carbs ?? 0),
        fat: Number(payload.fat ?? 0),
        notes: payload.notes ?? null,
      })
      .returning();

    return mapMeal(meal);
  },

  async update(mealId: string, userId: string, payload: MealPayload) {
    const updatePayload: Partial<typeof fitnessMeals.$inferInsert> = {};

    if (payload.name !== undefined) updatePayload.name = payload.name;
    if (payload.calories !== undefined) updatePayload.calories = payload.calories;
    if (payload.protein !== undefined) updatePayload.protein = payload.protein;
    if (payload.carbs !== undefined) updatePayload.carbs = payload.carbs;
    if (payload.fat !== undefined) updatePayload.fat = payload.fat;
    if (payload.notes !== undefined) updatePayload.notes = payload.notes;

    if (Object.keys(updatePayload).length === 0) {
      return null;
    }

    const [meal] = await db
      .update(fitnessMeals)
      .set(updatePayload)
      .where(and(eq(fitnessMeals.id, mealId), eq(fitnessMeals.userId, userId)))
      .returning();

    return meal ? mapMeal(meal) : null;
  },

  async delete(mealId: string, userId: string) {
    const deleted = await db
      .delete(fitnessMeals)
      .where(and(eq(fitnessMeals.id, mealId), eq(fitnessMeals.userId, userId)))
      .returning({ id: fitnessMeals.id });

    return deleted.length > 0;
  },
};
