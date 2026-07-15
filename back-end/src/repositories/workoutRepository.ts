import { randomUUID } from "node:crypto";
import { and, desc, eq } from "drizzle-orm";
import { db } from "../database/client";
import { fitnessWorkoutPlans } from "../database/schema";

export interface WorkoutPayload {
  name?: string;
  description?: string;
  exercises?: string[];
}

function mapWorkout(row: typeof fitnessWorkoutPlans.$inferSelect) {
  return {
    id: row.id,
    userId: row.userId,
    name: row.name,
    description: row.description ?? "",
    exercises: row.exercises ?? [],
    createdAt: row.createdAt,
  };
}

export const WorkoutRepository = {
  async listByUser(userId: string) {
    const rows = await db
      .select()
      .from(fitnessWorkoutPlans)
      .where(eq(fitnessWorkoutPlans.userId, userId))
      .orderBy(desc(fitnessWorkoutPlans.createdAt));

    return rows.map(mapWorkout);
  },

  async create(userId: string, payload: WorkoutPayload) {
    const [workout] = await db
      .insert(fitnessWorkoutPlans)
      .values({
        id: randomUUID(),
        userId,
        name: payload.name ?? "Workout",
        description: payload.description ?? "",
        exercises: payload.exercises ?? [],
      })
      .returning();

    return mapWorkout(workout);
  },

  async update(id: string, userId: string, payload: WorkoutPayload) {
    const updatePayload: Partial<typeof fitnessWorkoutPlans.$inferInsert> = {};

    if (payload.name !== undefined) updatePayload.name = payload.name;
    if (payload.description !== undefined) updatePayload.description = payload.description;
    if (payload.exercises !== undefined) updatePayload.exercises = payload.exercises;

    if (Object.keys(updatePayload).length === 0) {
      return null;
    }

    const [workout] = await db
      .update(fitnessWorkoutPlans)
      .set(updatePayload)
      .where(and(eq(fitnessWorkoutPlans.id, id), eq(fitnessWorkoutPlans.userId, userId)))
      .returning();

    return workout ? mapWorkout(workout) : null;
  },

  async delete(id: string, userId: string) {
    const deleted = await db
      .delete(fitnessWorkoutPlans)
      .where(and(eq(fitnessWorkoutPlans.id, id), eq(fitnessWorkoutPlans.userId, userId)))
      .returning({ id: fitnessWorkoutPlans.id });

    return deleted.length > 0;
  },
};
