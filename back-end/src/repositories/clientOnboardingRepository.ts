import { randomUUID } from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { db } from "../database/client";
import { fitnessClientAnamneses, fitnessClientProfiles } from "../database/schema";

export interface ClientProfileInput {
  phone?: string | null;
  birthDate?: string | null;
  gender?: string | null;
  goal: string;
  planInterest: string;
}

export interface ClientAnamnesisInput {
  objective: string;
  heightCm?: number | null;
  weightKg?: number | null;
  activityLevel?: string | null;
  restrictions?: string | null;
  injuries?: string | null;
  medications?: string | null;
  sleepQuality?: string | null;
  hydration?: string | null;
  notes?: string | null;
}

function normalizeText(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeNumber(value?: number | string | null) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export const ClientOnboardingRepository = {
  async ensureTables() {
    await db.execute(sql`
      create table if not exists fitness_client_profiles (
        id uuid primary key default gen_random_uuid() not null,
        user_id uuid not null references fitness_users(id) on delete cascade,
        phone text,
        birth_date text,
        gender text,
        goal text not null,
        plan_interest text not null,
        created_at timestamp with time zone default now()
      )
    `);

    await db.execute(sql`
      create table if not exists fitness_client_anamneses (
        id uuid primary key default gen_random_uuid() not null,
        user_id uuid not null references fitness_users(id) on delete cascade,
        objective text not null,
        height_cm double precision,
        weight_kg double precision,
        activity_level text,
        restrictions text,
        injuries text,
        medications text,
        sleep_quality text,
        hydration text,
        notes text,
        created_at timestamp with time zone default now()
      )
    `);
  },

  async createForUser(userId: string, profile: ClientProfileInput, anamnesis: ClientAnamnesisInput) {
    await this.ensureTables();

    const [clientProfile] = await db
      .insert(fitnessClientProfiles)
      .values({
        id: randomUUID(),
        userId,
        phone: normalizeText(profile.phone),
        birthDate: normalizeText(profile.birthDate),
        gender: normalizeText(profile.gender),
        goal: profile.goal.trim(),
        planInterest: profile.planInterest.trim(),
      })
      .returning();

    const [clientAnamnesis] = await db
      .insert(fitnessClientAnamneses)
      .values({
        id: randomUUID(),
        userId,
        objective: anamnesis.objective.trim(),
        heightCm: normalizeNumber(anamnesis.heightCm),
        weightKg: normalizeNumber(anamnesis.weightKg),
        activityLevel: normalizeText(anamnesis.activityLevel),
        restrictions: normalizeText(anamnesis.restrictions),
        injuries: normalizeText(anamnesis.injuries),
        medications: normalizeText(anamnesis.medications),
        sleepQuality: normalizeText(anamnesis.sleepQuality),
        hydration: normalizeText(anamnesis.hydration),
        notes: normalizeText(anamnesis.notes),
      })
      .returning();

    return {
      profile: clientProfile,
      anamnesis: clientAnamnesis,
    };
  },

  async deleteByUser(userId: string) {
    await db.delete(fitnessClientAnamneses).where(eq(fitnessClientAnamneses.userId, userId));
    await db.delete(fitnessClientProfiles).where(eq(fitnessClientProfiles.userId, userId));
  },
};
