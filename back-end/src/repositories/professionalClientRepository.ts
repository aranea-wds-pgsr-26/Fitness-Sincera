import { and, asc, count, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "../database/client";
import {
  fitnessClientProfiles,
  fitnessProfessionalClients,
  fitnessUsers,
} from "../database/schema";

export type ProfessionalSpecialty = "nutrition" | "training";
export type AssignmentStatus = "active" | "inactive" | "paused";

interface ListOptions {
  specialty: ProfessionalSpecialty;
  status?: AssignmentStatus;
  search?: string;
  page?: number;
  pageSize?: number;
}

function clientFilters(professionalId: string, options: ListOptions) {
  const filters = [
    eq(fitnessProfessionalClients.professionalId, professionalId),
    eq(fitnessProfessionalClients.specialty, options.specialty),
  ];

  if (options.status) filters.push(eq(fitnessProfessionalClients.status, options.status));
  if (options.search) {
    const term = `%${options.search.trim()}%`;
    filters.push(or(ilike(fitnessUsers.name, term), ilike(fitnessUsers.email, term))!);
  }

  return and(...filters);
}

export const ProfessionalClientRepository = {
  async listForProfessional(professionalId: string, options: ListOptions) {
    const page = Math.max(1, options.page ?? 1);
    const pageSize = Math.min(50, Math.max(1, options.pageSize ?? 10));
    const where = clientFilters(professionalId, options);

    const [rows, [{ total }]] = await Promise.all([
      db
        .select({
          assignmentId: fitnessProfessionalClients.id,
          id: fitnessUsers.id,
          name: fitnessUsers.name,
          email: fitnessUsers.email,
          status: fitnessProfessionalClients.status,
          lastCheckin: fitnessProfessionalClients.createdAt,
          goal: fitnessClientProfiles.goal,
        })
        .from(fitnessProfessionalClients)
        .innerJoin(fitnessUsers, eq(fitnessUsers.id, fitnessProfessionalClients.clientId))
        .leftJoin(fitnessClientProfiles, eq(fitnessClientProfiles.userId, fitnessUsers.id))
        .where(where)
        .orderBy(desc(fitnessProfessionalClients.createdAt), asc(fitnessUsers.name))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db
        .select({ total: count() })
        .from(fitnessProfessionalClients)
        .innerJoin(fitnessUsers, eq(fitnessUsers.id, fitnessProfessionalClients.clientId))
        .where(where),
    ]);

    return {
      data: rows.map((row) => ({
        id: row.id,
        assignmentId: row.assignmentId,
        name: row.name,
        email: row.email,
        status: row.status as AssignmentStatus,
        lastCheckin: row.lastCheckin?.toISOString() ?? null,
        mealPlanId: null,
        adherence: 0,
        goal: row.goal,
      })),
      pagination: {
        page,
        pageSize,
        total: Number(total),
        totalItems: Number(total),
        totalPages: Math.max(1, Math.ceil(Number(total) / pageSize)),
      },
    };
  },

  async assign(professionalId: string, clientId: string, specialty: ProfessionalSpecialty) {
    const [professional, client] = await Promise.all([
      db.select({ id: fitnessUsers.id, role: fitnessUsers.role }).from(fitnessUsers).where(eq(fitnessUsers.id, professionalId)).limit(1),
      db.select({ id: fitnessUsers.id, role: fitnessUsers.role }).from(fitnessUsers).where(eq(fitnessUsers.id, clientId)).limit(1),
    ]);

    const expectedRole = specialty === "nutrition" ? "nutritionist" : "trainer";
    if (professional[0]?.role !== expectedRole || client[0]?.role !== "client") return null;

    const [assignment] = await db
      .insert(fitnessProfessionalClients)
      .values({ professionalId, clientId, specialty, status: "active" })
      .onConflictDoNothing()
      .returning();

    if (assignment) return assignment;

    const [existing] = await db
      .select()
      .from(fitnessProfessionalClients)
      .where(and(
        eq(fitnessProfessionalClients.professionalId, professionalId),
        eq(fitnessProfessionalClients.clientId, clientId),
        eq(fitnessProfessionalClients.specialty, specialty),
      ))
      .limit(1);
    return existing ?? null;
  },

  async remove(assignmentId: string, clientId: string) {
    const [removed] = await db
      .delete(fitnessProfessionalClients)
      .where(and(eq(fitnessProfessionalClients.id, assignmentId), eq(fitnessProfessionalClients.clientId, clientId)))
      .returning({ id: fitnessProfessionalClients.id });
    return removed ?? null;
  },
};