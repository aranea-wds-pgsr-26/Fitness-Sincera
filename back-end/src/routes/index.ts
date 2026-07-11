import { Router } from "express";
import authRouter from "../modules/auth/routes";
import mealsRouter from "../modules/meals/routes";
import dietsRouter from "../modules/diets/routes";
import workoutsRouter from "../modules/workouts/routes";
import chatbotRouter from "../modules/chatbot/routes";
import wearablesRouter from "../modules/wearables/routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "fitness-sincera-backend" });
});

router.use("/auth", authRouter);
router.use("/meals", mealsRouter);
router.use("/diets", dietsRouter);
router.use("/workouts", workoutsRouter);
router.use("/chatbot", chatbotRouter);
router.use("/wearables", wearablesRouter);

export default router;
