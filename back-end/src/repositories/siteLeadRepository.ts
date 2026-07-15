import { desc, eq, sql } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { db } from "../database/client";
import { fitnessSiteLeads } from "../database/schema";

export interface CreateSiteLeadInput {
  name: string;
  email: string;
  phone?: string | null;
  audience: "client" | "nutritionist" | "trainer" | "company";
  interest: "complete" | "nutrition" | "training" | "professional" | "partnership";
  message?: string | null;
}

function normalize(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function mapLead(row: typeof fitnessSiteLeads.$inferSelect) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? null,
    audience: row.audience,
    interest: row.interest,
    message: row.message ?? null,
    source: row.source ?? "public_site",
    status: row.status ?? "new",
    createdAt: row.createdAt,
  };
}

export const SiteLeadRepository = {
  async ensureTable() {
    await db.execute(sql`
      create table if not exists fitness_site_leads (
        id uuid primary key default gen_random_uuid() not null,
        name text not null,
        email text not null,
        phone text,
        audience text not null,
        interest text not null,
        message text,
        source text default 'public_site',
        status text default 'new',
        created_at timestamp with time zone default now()
      )
    `);
  },

  async create(payload: CreateSiteLeadInput) {
    const [lead] = await db
      .insert(fitnessSiteLeads)
      .values({
        id: randomUUID(),
        name: payload.name.trim(),
        email: payload.email.trim().toLowerCase(),
        phone: normalize(payload.phone),
        audience: payload.audience,
        interest: payload.interest,
        message: normalize(payload.message),
        source: "public_site",
        status: "new",
      })
      .returning();

    return mapLead(lead);
  },

  async list(limit = 50) {
    const rows = await db
      .select()
      .from(fitnessSiteLeads)
      .orderBy(desc(fitnessSiteLeads.createdAt))
      .limit(Math.min(Math.max(limit, 1), 100));

    return rows.map(mapLead);
  },

  async markRead(id: string) {
    const [lead] = await db
      .update(fitnessSiteLeads)
      .set({ status: "read" })
      .where(eq(fitnessSiteLeads.id, id))
      .returning();

    return lead ? mapLead(lead) : null;
  },

  async deleteByEmail(email: string) {
    await db.delete(fitnessSiteLeads).where(eq(fitnessSiteLeads.email, email.toLowerCase()));
  },
};
