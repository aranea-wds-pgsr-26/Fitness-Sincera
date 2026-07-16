import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth";
import { FoodRepository, type FoodPayload } from "../../repositories/foodRepository";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { AppError } from "../../shared/errors/AppError";

const router = Router();
function getRouteId(value: string | string[]) {
  if (Array.isArray(value)) {
    throw new AppError("Invalid resource id", 400);
  }

  return value;
}

function validateFoodPayload(body: unknown): FoodPayload {
  const payload = body as Partial<FoodPayload>;

  if (!payload.name?.trim()) {
    throw new AppError("Food name is required", 400);
  }

  const numericFields = ["servingSize", "calories", "protein", "carbs", "fat", "fiber", "sodium"] as const;
  for (const field of numericFields) {
    if (payload[field] !== undefined && (!Number.isFinite(Number(payload[field])) || Number(payload[field]) < 0)) {
      throw new AppError(`${field} must be a non-negative number`, 400);
    }
  }

  return {
    ...payload,
    name: payload.name.trim(),
    brand: payload.brand?.trim() || null,
    category: payload.category?.trim() || null,
  };
}

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const limit = typeof req.query.limit === "string" ? Number(req.query.limit) : undefined;
    const foods = await FoodRepository.list({ search, limit });

    return res.json({ success: true, data: foods });
  })
);

router.post(
  "/",
  requireAuth,
  requireRole(["admin", "nutritionist"]),
  asyncHandler(async (req, res) => {
    const payload = validateFoodPayload(req.body);
    const existing = await FoodRepository.findByName(payload.name);

    if (existing) {
      throw new AppError("Food already exists", 409);
    }

    const food = await FoodRepository.create(payload);
    return res.status(201).json({ success: true, data: food });
  })
);

router.put(
  "/:id",
  requireAuth,
  requireRole(["admin", "nutritionist"]),
  asyncHandler(async (req, res) => {
    const food = await FoodRepository.update(getRouteId(req.params.id), validateFoodPayload(req.body));

    if (!food) {
      throw new AppError("Food not found", 404);
    }

    return res.json({ success: true, data: food });
  })
);

router.delete(
  "/:id",
  requireAuth,
  requireRole(["admin", "nutritionist"]),
  asyncHandler(async (req, res) => {
    const deleted = await FoodRepository.delete(getRouteId(req.params.id));

    if (!deleted) {
      throw new AppError("Food not found", 404);
    }

    return res.status(204).send();
  })
);

export default router;