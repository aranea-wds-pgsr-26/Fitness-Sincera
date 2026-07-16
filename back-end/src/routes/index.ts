import { Router } from "express";
import adminRouter from "../modules/admin/routes";
import authRouter from "../modules/auth/routes";
import publicRouter from "../modules/public/routes";
import mealsRouter from "../modules/meals/routes";
import dietsRouter from "../modules/diets/routes";
import foodsRouter from "../modules/foods/routes";
import workoutsRouter from "../modules/workouts/routes";
import chatbotRouter from "../modules/chatbot/routes";
import wearablesRouter from "../modules/wearables/routes";
import systemRouter from "../modules/system/routes";
import { clientAssignmentsRouter, nutritionistClientsRouter, trainerClientsRouter } from "../modules/clients/routes";
import v1Router from "./v1";

const router = Router();

router.use("/", systemRouter);
router.use("/v1", v1Router);

router.use("/auth", authRouter);
router.use("/public", publicRouter);
router.use("/admin", adminRouter);
router.use("/meals", mealsRouter);
router.use("/diets", dietsRouter);
router.use("/foods", foodsRouter);
router.use("/workouts", workoutsRouter);
router.use("/clients", clientAssignmentsRouter);
router.use("/nutritionist", nutritionistClientsRouter);
router.use("/trainer", trainerClientsRouter);
router.use("/chatbot", chatbotRouter);
router.use("/wearables", wearablesRouter);

export default router;
