import { Router } from "express";
import { createMeal, deleteMeal, listMealsForUser, updateMeal } from "../../lib/store";
import { requireAuth } from "../../middleware/auth";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const meals = await listMealsForUser(req.user!.id);
  return res.json(meals);
});

router.post("/", requireAuth, async (req, res) => {
  const meal = await createMeal(req.user!.id, req.body);
  return res.status(201).json(meal);
});

router.put("/:id", requireAuth, async (req, res) => {
  const meal = await updateMeal(req.params.id, req.user!.id, req.body);
  if (!meal) {
    return res.status(404).json({ message: "Meal not found" });
  }

  return res.json(meal);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const deleted = await deleteMeal(req.params.id, req.user!.id);
  if (!deleted) {
    return res.status(404).json({ message: "Meal not found" });
  }

  return res.status(204).send();
});

export default router;
