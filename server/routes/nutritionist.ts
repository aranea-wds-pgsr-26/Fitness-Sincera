import { Router, Response } from "express";
import { AuthRequest, verifyJWT, requireRole } from "../middleware/auth";
import {
  getNutritionistDashboard,
  listNutritionistClients,
  getNutritionistClientDetail,
  updateNutritionistClientPlan,
} from "../controllers/nutritionist";

const router = Router();

// All routes require JWT authentication and nutritionist role
router.use(verifyJWT);
router.use(requireRole("nutritionist"));

/**
 * GET /api/nutritionist/dashboard
 * Returns stats overview for nutritionist
 */
router.get("/dashboard", getNutritionistDashboard);

/**
 * GET /api/nutritionist/clients
 * Returns list of clients with optional filters
 * Query params: status, search, page
 */
router.get("/clients", listNutritionistClients);

/**
 * GET /api/nutritionist/clients/:clientId
 * Returns detailed nutrition metrics for a specific client
 */
router.get("/clients/:clientId", getNutritionistClientDetail);

/**
 * PUT /api/nutritionist/clients/:clientId/plan
 * Updates meal plan for a client
 * Body: { mealPlanId: string }
 */
router.put("/clients/:clientId/plan", updateNutritionistClientPlan);

export default router;
