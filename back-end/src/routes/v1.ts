import { Router } from "express";
import authRouter from "../modules/auth/routes";
import chatbotRouter from "../modules/chatbot/routes";
import dietsRouter from "../modules/diets/routes";
import foodsRouter from "../modules/foods/routes";
import mealsRouter from "../modules/meals/routes";
import systemRouter from "../modules/system/routes";
import wearablesRouter from "../modules/wearables/routes";
import workoutsRouter from "../modules/workouts/routes";

const router = Router();

router.use("/", systemRouter);
router.use("/system", systemRouter);
router.use("/auth", authRouter);
router.use("/meals", mealsRouter);
router.use("/diets", dietsRouter);
router.use("/foods", foodsRouter);
router.use("/workouts", workoutsRouter);
router.use("/chatbot", chatbotRouter);
router.use("/wearables", wearablesRouter);

export default router;
