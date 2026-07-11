import { Router } from "express";
import { createDiet, deleteDiet, listDietsForUser, updateDiet } from "../../lib/store";
import { requireAuth } from "../../middleware/auth";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const diets = await listDietsForUser(req.user!.id);
  return res.json(diets);
});

router.post("/", requireAuth, async (req, res) => {
  const plan = await createDiet(req.user!.id, req.body);
  return res.status(201).json(plan);
});

router.put("/:id", requireAuth, async (req, res) => {
  const plan = await updateDiet(req.params.id, req.user!.id, req.body);
  if (!plan) {
    return res.status(404).json({ message: "Diet plan not found" });
  }

  return res.json(plan);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const deleted = await deleteDiet(req.params.id, req.user!.id);
  if (!deleted) {
    return res.status(404).json({ message: "Diet plan not found" });
  }

  return res.status(204).send();
});

export default router;
