import { randomUUID } from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { db } from "../database/client";
import { fitnessSessions, fitnessUsers } from "../database/schema";
import type { AuthUser, CreateUserInput, UserRole } from "../modules/auth/types";

function mapUser(row: typeof fitnessUsers.$inferSelect): AuthUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password,
    role: row.role as UserRole,
    createdAt: row.createdAt,
  };
}

export const UserRepository = {
  async create(payload: CreateUserInput) {
    const [user] = await db
      .insert(fitnessUsers)
      .values({
        id: randomUUID(),
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: payload.role,
      })
      .returning();

    return mapUser(user);
  },

  async findByEmail(email: string) {
    const [user] = await db
      .select()
      .from(fitnessUsers)
      .where(sql`lower(${fitnessUsers.email}) = lower(${email})`)
      .limit(1);

    return user ? mapUser(user) : null;
  },

  async createSession(user: AuthUser) {
    const token = randomUUID();

    await db.insert(fitnessSessions).values({
      token,
      userId: user.id,
    });

    return token;
  },

  async getSessionUser(token: string) {
    const [row] = await db
      .select({
        id: fitnessUsers.id,
        name: fitnessUsers.name,
        email: fitnessUsers.email,
        password: fitnessUsers.password,
        role: fitnessUsers.role,
        createdAt: fitnessUsers.createdAt,
      })
      .from(fitnessSessions)
      .innerJoin(fitnessUsers, eq(fitnessUsers.id, fitnessSessions.userId))
      .where(eq(fitnessSessions.token, token))
      .limit(1);

    return row ? mapUser(row) : null;
  },

  async revokeSession(token: string) {
    await db.delete(fitnessSessions).where(eq(fitnessSessions.token, token));
  },

  async deleteByEmail(email: string) {
    await db.delete(fitnessUsers).where(sql`lower(${fitnessUsers.email}) = lower(${email})`);
  },

  async updateByEmail(email: string, payload: CreateUserInput) {
    const [user] = await db
      .update(fitnessUsers)
      .set({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: payload.role,
      })
      .where(sql`lower(${fitnessUsers.email}) = lower(${email})`)
      .returning();

    return user ? mapUser(user) : null;
  },
};

export { type AuthUser as User, type UserRole };
