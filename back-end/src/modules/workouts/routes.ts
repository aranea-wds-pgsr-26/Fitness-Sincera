import { Router } from "express";
import { WorkoutRepository } from "../../repositories/workoutRepository";
import { requireAuth, requireRole } from "../../middleware/auth";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { AppError } from "../../shared/errors/AppError";

const router = Router();
function getRouteId(value: string | string[]) {
  if (Array.isArray(value)) {
    throw new AppError("Invalid resource id", 400);
  }

  return value;
}

function validateWorkoutPayload(body: unknown) {
  const payload = body as { name?: string; description?: string; exercises?: unknown };

  if (!payload.name?.trim()) {
    throw new AppError("Workout name is required", 400);
  }

  if (payload.exercises !== undefined && (!Array.isArray(payload.exercises) || !payload.exercises.every((item) => typeof item === "string"))) {
    throw new AppError("exercises must be an array of strings", 400);
  }

  return {
    name: payload.name.trim(),
    description: payload.description?.trim() ?? "",
    exercises: (payload.exercises as string[] | undefined)?.map((item) => item.trim()).filter(Boolean) ?? [],
  };
}

router.get(
  "/",
  requireAuth,
  requireRole(["admin", "trainer"]),
  asyncHandler(async (req, res) => {
    const workouts = await WorkoutRepository.listByUser(req.user!.id);
    return res.json({ success: true, data: workouts });
  })
);

router.post(
  "/",
  requireAuth,
  requireRole(["admin", "trainer"]),
  asyncHandler(async (req, res) => {
    const workout = await WorkoutRepository.create(req.user!.id, validateWorkoutPayload(req.body));
    return res.status(201).json({ success: true, data: workout });
  })
);

router.put(
  "/:id",
  requireAuth,
  requireRole(["admin", "trainer"]),
  asyncHandler(async (req, res) => {
    const workout = await WorkoutRepository.update(getRouteId(req.params.id), req.user!.id, validateWorkoutPayload(req.body));

    if (!workout) {
      throw new AppError("Workout not found", 404);
    }

    return res.json({ success: true, data: workout });
  })
);

router.delete(
  "/:id",
  requireAuth,
  requireRole(["admin", "trainer"]),
  asyncHandler(async (req, res) => {
    const deleted = await WorkoutRepository.delete(getRouteId(req.params.id), req.user!.id);

    if (!deleted) {
      throw new AppError("Workout not found", 404);
    }

    return res.status(204).send();
  })
);

export default router;