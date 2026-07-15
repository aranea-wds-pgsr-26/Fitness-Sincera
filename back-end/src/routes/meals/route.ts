import router from "back-end/src/modules/meals/routes";
// import { createMeal, updateMeal } from "../../lib/store";

import { MealRepository } from "../../repositories/mealRepository";
import { createMealSchema, updateMealSchema } from "../../schemas/meal";
import { requireAuth } from "back-end/src/middleware/auth";

router.post("/", requireAuth, async (req, res) => {
  const parsed = createMealSchema.parse(req.body);

  const meal = await MealRepository.create(req.user!.id, parsed);

  return res.status(201).json(meal);
});

router.put("/:id", requireAuth, async (req, res) => {
  const parsed = updateMealSchema.parse(req.body);

  const meal = await MealRepository.update(
    String(req.params.id),
    req.user!.id,
    parsed
  );

  return res.json(meal);
});