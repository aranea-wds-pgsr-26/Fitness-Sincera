import { randomUUID } from "node:crypto";
import { asc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "../database/client";
import { fitnessFoods } from "../database/schema";

export interface FoodPayload {
  name: string;
  brand?: string | null;
  category?: string | null;
  servingSize?: number;
  servingUnit?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sodium?: number;
  source?: string;
  externalId?: string | null;
}

function mapFood(row: typeof fitnessFoods.$inferSelect) {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand ?? null,
    category: row.category ?? null,
    servingSize: Number(row.servingSize ?? 100),
    servingUnit: row.servingUnit ?? "g",
    calories: Number(row.calories ?? 0),
    protein: Number(row.protein ?? 0),
    carbs: Number(row.carbs ?? 0),
    fat: Number(row.fat ?? 0),
    fiber: Number(row.fiber ?? 0),
    sodium: Number(row.sodium ?? 0),
    source: row.source ?? "manual",
    externalId: row.externalId ?? null,
    createdAt: row.createdAt,
  };
}

function foodValues(payload: FoodPayload) {
  return {
    id: randomUUID(),
    name: payload.name,
    brand: payload.brand ?? null,
    category: payload.category ?? null,
    servingSize: Number(payload.servingSize ?? 100),
    servingUnit: payload.servingUnit ?? "g",
    calories: Number(payload.calories ?? 0),
    protein: Number(payload.protein ?? 0),
    carbs: Number(payload.carbs ?? 0),
    fat: Number(payload.fat ?? 0),
    fiber: Number(payload.fiber ?? 0),
    sodium: Number(payload.sodium ?? 0),
    source: payload.source ?? "manual",
    externalId: payload.externalId ?? null,
  };
}

export const FoodRepository = {
  async list(options: { search?: string; limit?: number } = {}) {
    const limit = Math.min(Math.max(options.limit ?? 50, 1), 200);
    const query = db
      .select()
      .from(fitnessFoods)
      .$dynamic()
      .orderBy(asc(fitnessFoods.name))
      .limit(limit);

    if (options.search?.trim()) {
      const pattern = `%${options.search.trim()}%`;
      query.where(or(ilike(fitnessFoods.name, pattern), ilike(fitnessFoods.category, pattern)));
    }

    const rows = await query;
    return rows.map(mapFood);
  },

  async findByName(name: string) {
    const [food] = await db
      .select()
      .from(fitnessFoods)
      .where(sql`lower(${fitnessFoods.name}) = lower(${name})`)
      .limit(1);

    return food ? mapFood(food) : null;
  },

  async findByExternalId(source: string, externalId: string) {
    const [food] = await db
      .select()
      .from(fitnessFoods)
      .where(sql`${fitnessFoods.source} = ${source} and ${fitnessFoods.externalId} = ${externalId}`)
      .limit(1);

    return food ? mapFood(food) : null;
  },

  async create(payload: FoodPayload) {
    const [food] = await db.insert(fitnessFoods).values(foodValues(payload)).returning();
    return mapFood(food);
  },

  async upsertByName(payload: FoodPayload) {
    const existing = await this.findByName(payload.name);

    if (!existing) {
      return this.create(payload);
    }

    const [food] = await db
      .update(fitnessFoods)
      .set({
        brand: payload.brand ?? existing.brand,
        category: payload.category ?? existing.category,
        servingSize: Number(payload.servingSize ?? existing.servingSize),
        servingUnit: payload.servingUnit ?? existing.servingUnit,
        calories: Number(payload.calories ?? existing.calories),
        protein: Number(payload.protein ?? existing.protein),
        carbs: Number(payload.carbs ?? existing.carbs),
        fat: Number(payload.fat ?? existing.fat),
        fiber: Number(payload.fiber ?? existing.fiber),
        sodium: Number(payload.sodium ?? existing.sodium),
        source: payload.source ?? existing.source,
        externalId: payload.externalId ?? existing.externalId,
      })
      .where(eq(fitnessFoods.id, existing.id))
      .returning();

    return mapFood(food);
  },
};
