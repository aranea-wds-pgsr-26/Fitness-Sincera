import { randomUUID } from "node:crypto";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "../database/client";
import { fitnessChatMessages } from "../database/schema";

export type ChatRole = "user" | "assistant";

function mapChatMessage(row: typeof fitnessChatMessages.$inferSelect) {
  return {
    id: row.id,
    userId: row.userId,
    role: row.role as ChatRole,
    content: row.content,
    createdAt: row.createdAt,
  };
}

export const ChatRepository = {
  async listByUser(userId: string) {
    const rows = await db
      .select()
      .from(fitnessChatMessages)
      .where(eq(fitnessChatMessages.userId, userId))
      .orderBy(asc(fitnessChatMessages.createdAt));

    return rows.map(mapChatMessage);
  },

  async listRecentByUser(userId: string, limit = 10) {
    const rows = await db
      .select()
      .from(fitnessChatMessages)
      .where(eq(fitnessChatMessages.userId, userId))
      .orderBy(desc(fitnessChatMessages.createdAt))
      .limit(limit);

    return rows.reverse().map(mapChatMessage);
  },

  async create(userId: string, content: string, role: ChatRole) {
    const [message] = await db
      .insert(fitnessChatMessages)
      .values({
        id: randomUUID(),
        userId,
        content,
        role,
      })
      .returning();

    return mapChatMessage(message);
  },

  async deleteByUser(userId: string) {
    const deleted = await db
      .delete(fitnessChatMessages)
      .where(eq(fitnessChatMessages.userId, userId))
      .returning({ id: fitnessChatMessages.id });

    return deleted.length;
  },
};
