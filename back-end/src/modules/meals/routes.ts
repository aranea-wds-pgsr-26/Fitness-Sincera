import { Request, Router } from "express";
import {
  validateCreateMealPayload,
  validateUpdateMealPayload,
} from "./validators";
import { MealRepository } from "../../repositories/mealRepository";
import { requireAuth } from "../../middleware/auth";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { AppError } from "../../shared/errors/AppError";

const router = Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const meals = await MealRepository.listByUser(req.user!.id);

    return res.json({
      success: true,
      data: meals,
    });
  })
);

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const payload = validateCreateMealPayload(req.body);
    const meal = await MealRepository.create(req.user!.id, payload);

    return res.status(201).json({
      success: true,
      data: meal,
    });
  })
);

router.put(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const payload = validateUpdateMealPayload(req.body);
    const mealId = req.params.id;

    if (Array.isArray(mealId)) {
      throw new AppError("Invalid meal id", 400);
    }

    const meal = await MealRepository.update(mealId, req.user!.id, payload);

    if (!meal) {
      throw new AppError("Meal not found", 404);
    }

    return res.json({
      success: true,
      data: meal,
    });
  })
);

router.delete<{ id: string }>(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const mealId = req.params.id;

    if (Array.isArray(mealId)) {
      throw new AppError("Invalid meal id", 400);
    }

    const deleted = await MealRepository.delete(mealId, req.user!.id);

    if (!deleted) {
      throw new AppError("Meal not found", 404);
    }

    return res.status(204).send();
  })
);

export default router;
