import { Router } from "express";
import { and, eq } from "drizzle-orm";
import { db } from "../../database/client";
import { fitnessDailyTrackings } from "../../database/schema";
import { requireAuth } from "../../middleware/auth";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { AppError } from "../../shared/errors/AppError";

const router = Router();
const today = () => new Date().toISOString().slice(0, 10);

async function getOrCreate(userId: string) {
  const date = today();
  const [existing] = await db.select().from(fitnessDailyTrackings).where(and(eq(fitnessDailyTrackings.userId, userId), eq(fitnessDailyTrackings.trackingDate, date))).limit(1);
  if (existing) return existing;
  const [created] = await db.insert(fitnessDailyTrackings).values({ userId, trackingDate: date }).returning();
  return created;
}

router.get("/today", requireAuth, asyncHandler(async (req, res) => res.json({ success: true, data: await getOrCreate(req.user!.id) })));
router.post("/water", requireAuth, asyncHandler(async (req, res) => {
  const amount = Number((req.body as { amount?: number }).amount);
  if (!Number.isFinite(amount) || amount <= 0 || amount > 2000) throw new AppError("amount must be between 1 and 2000", 400);
  const current = await getOrCreate(req.user!.id);
  const [updated] = await db.update(fitnessDailyTrackings).set({ waterMl: Number(current.waterMl) + amount, updatedAt: new Date() }).where(eq(fitnessDailyTrackings.id, current.id)).returning();
  return res.json({ success: true, data: updated });
}));
router.put("/today", requireAuth, asyncHandler(async (req, res) => {
  const body = req.body as Record<string, unknown>; const current = await getOrCreate(req.user!.id);
  const values: Record<string, number | string | Date> = { updatedAt: new Date() };
  for (const key of ["waterMl", "waterGoalMl", "steps", "sleepMinutes", "caloriesBurned"]) if (body[key] !== undefined && Number.isFinite(Number(body[key])) && Number(body[key]) >= 0) values[key] = Number(body[key]);
  if (body.notes !== undefined && typeof body.notes === "string") values.notes = body.notes;
  const [updated] = await db.update(fitnessDailyTrackings).set(values).where(eq(fitnessDailyTrackings.id, current.id)).returning();
  return res.json({ success: true, data: updated });
}));
export default router;