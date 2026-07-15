import { randomUUID } from "node:crypto";
import { and, desc, eq } from "drizzle-orm";
import { db } from "../database/client";
import { fitnessDietPlans } from "../database/schema";

export interface DietPayload {
  name?: string;
  description?: string;
  meals?: string[];
}

function mapDiet(row: typeof fitnessDietPlans.$inferSelect) {
  return {
    id: row.id,
    userId: row.userId,
    name: row.name,
    description: row.description ?? "",
    meals: row.meals ?? [],
    createdAt: row.createdAt,
  };
}

export const DietRepository = {
  async listByUser(userId: string) {
    const rows = await db
      .select()
      .from(fitnessDietPlans)
      .where(eq(fitnessDietPlans.userId, userId))
      .orderBy(desc(fitnessDietPlans.createdAt));

    return rows.map(mapDiet);
  },

  async create(userId: string, payload: DietPayload) {
    const [diet] = await db
      .insert(fitnessDietPlans)
      .values({
        id: randomUUID(),
        userId,
        name: payload.name ?? "Diet",
        description: payload.description ?? "",
        meals: payload.meals ?? [],
      })
      .returning();

    return mapDiet(diet);
  },

  async update(id: string, userId: string, payload: DietPayload) {
    const updatePayload: Partial<typeof fitnessDietPlans.$inferInsert> = {};

    if (payload.name !== undefined) updatePayload.name = payload.name;
    if (payload.description !== undefined) updatePayload.description = payload.description;
    if (payload.meals !== undefined) updatePayload.meals = payload.meals;

    if (Object.keys(updatePayload).length === 0) {
      return null;
    }

    const [diet] = await db
      .update(fitnessDietPlans)
      .set(updatePayload)
      .where(and(eq(fitnessDietPlans.id, id), eq(fitnessDietPlans.userId, userId)))
      .returning();

    return diet ? mapDiet(diet) : null;
  },

  async delete(id: string, userId: string) {
    const deleted = await db
      .delete(fitnessDietPlans)
      .where(and(eq(fitnessDietPlans.id, id), eq(fitnessDietPlans.userId, userId)))
      .returning({ id: fitnessDietPlans.id });

    return deleted.length > 0;
  },
};
