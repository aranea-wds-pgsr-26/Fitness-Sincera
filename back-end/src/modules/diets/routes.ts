import { Router } from "express";
import { DietRepository } from "../../repositories/dietRepository";
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

function validateDietPayload(body: unknown) {
  const payload = body as { name?: string; description?: string; meals?: unknown };

  if (!payload.name?.trim()) {
    throw new AppError("Diet name is required", 400);
  }

  if (payload.meals !== undefined && (!Array.isArray(payload.meals) || !payload.meals.every((item) => typeof item === "string"))) {
    throw new AppError("meals must be an array of strings", 400);
  }

  return {
    name: payload.name.trim(),
    description: payload.description?.trim() ?? "",
    meals: (payload.meals as string[] | undefined)?.map((item) => item.trim()).filter(Boolean) ?? [],
  };
}

router.get(
  "/",
  requireAuth,
  requireRole(["admin", "nutritionist"]),
  asyncHandler(async (req, res) => {
    const diets = await DietRepository.listByUser(req.user!.id);
    return res.json({ success: true, data: diets });
  })
);

router.post(
  "/",
  requireAuth,
  requireRole(["admin", "nutritionist"]),
  asyncHandler(async (req, res) => {
    const diet = await DietRepository.create(req.user!.id, validateDietPayload(req.body));
    return res.status(201).json({ success: true, data: diet });
  })
);

router.put(
  "/:id",
  requireAuth,
  requireRole(["admin", "nutritionist"]),
  asyncHandler(async (req, res) => {
    const diet = await DietRepository.update(getRouteId(req.params.id), req.user!.id, validateDietPayload(req.body));

    if (!diet) {
      throw new AppError("Diet plan not found", 404);
    }

    return res.json({ success: true, data: diet });
  })
);

router.delete(
  "/:id",
  requireAuth,
  requireRole(["admin", "nutritionist"]),
  asyncHandler(async (req, res) => {
    const deleted = await DietRepository.delete(getRouteId(req.params.id), req.user!.id);

    if (!deleted) {
      throw new AppError("Diet plan not found", 404);
    }

    return res.status(204).send();
  })
);

export default router;