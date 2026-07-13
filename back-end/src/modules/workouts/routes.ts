import { Router } from "express";
// import { createWorkout, deleteWorkout, listWorkoutsForUser, updateWorkout } from "../../lib/store";
import { WorkoutRepository } from "../../repositories/workoutRepository";
import { requireAuth } from "../../middleware/auth";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const workouts = await WorkoutRepository.listByUser(req.user!.id);
  return res.json(workouts);
});

router.post("/", requireAuth, async (req, res) => {
  const workout = await WorkoutRepository.create(req.user!.id, req.body);
  return res.status(201).json(workout);
});

router.put("/:id", requireAuth, async (req, res) => {
  const workout = await WorkoutRepository.update(req.params.id, req.user!.id, req.body);
  if (!workout) {
    return res.status(404).json({ message: "Workout plan not found" });
  }

  return res.json(workout);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const deleted = await WorkoutRepository.delete(req.params.id, req.user!.id);
  if (!deleted) {
    return res.status(404).json({ message: "Workout plan not found" });
  }

  return res.status(204).send();
});

export default router;
