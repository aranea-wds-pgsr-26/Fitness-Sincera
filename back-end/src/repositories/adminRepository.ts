import { count, desc, eq, inArray } from "drizzle-orm";
import { db } from "../database/client";
import {
  fitnessChatMessages,
  fitnessDietPlans,
  fitnessFoods,
  fitnessMeals,
  fitnessUsers,
  fitnessWorkoutPlans,
} from "../database/schema";
import { UserRepository } from "./userRepository";
import type { CreateUserInput, UserRole } from "../modules/auth/types";

export interface CreateProfessionalInput {
  name: string;
  email: string;
  password: string;
  role: Extract<UserRole, "nutritionist" | "trainer">;
}

async function tableCount(table: any) {
  const [result] = await db.select({ value: count() }).from(table);
  return Number(result?.value ?? 0);
}

function mapUser(row: typeof fitnessUsers.$inferSelect) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role as UserRole,
    createdAt: row.createdAt,
  };
}

export const AdminRepository = {
  async getDashboard() {
    const [
      users,
      meals,
      diets,
      workouts,
      foods,
      chatMessages,
      clients,
      nutritionists,
      trainers,
    ] = await Promise.all([
      tableCount(fitnessUsers),
      tableCount(fitnessMeals),
      tableCount(fitnessDietPlans),
      tableCount(fitnessWorkoutPlans),
      tableCount(fitnessFoods),
      tableCount(fitnessChatMessages),
      this.countUsersByRole("client"),
      this.countUsersByRole("nutritionist"),
      this.countUsersByRole("trainer"),
    ]);

    return {
      users,
      clients,
      nutritionists,
      trainers,
      meals,
      diets,
      workouts,
      foods,
      chatMessages,
      revenue: {
        monthlyRecurring: 0,
        currency: "BRL",
        status: "not_configured",
      },
    };
  },

  async countUsersByRole(role: UserRole) {
    const [result] = await db
      .select({ value: count() })
      .from(fitnessUsers)
      .where(eq(fitnessUsers.role, role));

    return Number(result?.value ?? 0);
  },

  async listProfessionals() {
    const rows = await db
      .select()
      .from(fitnessUsers)
      .where(inArray(fitnessUsers.role, ["nutritionist", "trainer"]))
      .orderBy(desc(fitnessUsers.createdAt));

    return rows.map(mapUser);
  },

  async createProfessional(payload: CreateProfessionalInput) {
    const existing = await UserRepository.findByEmail(payload.email);

    if (existing) {
      return null;
    }

    const user = await UserRepository.create(payload satisfies CreateUserInput);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  },
};
