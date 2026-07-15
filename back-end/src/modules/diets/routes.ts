import { Router } from "express";
// import { createDiet, deleteDiet, listDietsForUser, updateDiet } from "../../lib/store";
import { DietRepository } from "../../repositories/dietRepository";
import { requireAuth } from "../../middleware/auth";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const diets = await DietRepository.listByUser(req.user!.id);
  return res.json(diets);
});

router.post("/", requireAuth, async (req, res) => {
  const plan = await DietRepository.create(req.user!.id, req.body);
  return res.status(201).json(plan);
});

router.put("/:id", requireAuth, async (req, res) => {
  const plan = await DietRepository.update(req.params.id as string, req.user!.id, req.body);
  if (!plan) {
    return res.status(404).json({ message: "Diet plan not found" });
  }

  return res.json(plan);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const deleted = await DietRepository.delete(req.params.id as string, req.user!.id);
  if (!deleted) {
    return res.status(404).json({ message: "Diet plan not found" });
  }

  return res.status(204).send();
});

export default router;
