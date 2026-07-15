import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { FoodRepository } from "../../repositories/foodRepository";
import { asyncHandler } from "../../shared/utils/asyncHandler";

const router = Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const limit = typeof req.query.limit === "string" ? Number(req.query.limit) : undefined;
    const foods = await FoodRepository.list({ search, limit });

    return res.json({
      success: true,
      data: foods,
    });
  })
);

export default router;
