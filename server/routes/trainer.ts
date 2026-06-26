import { Router } from "express";
import { AuthRequest, verifyJWT, requireRole } from "../middleware/auth";
import {
  getTrainerDashboard,
  listTrainerClients,
  getTrainerClientDetail,
  updateTrainerClientProgram,
} from "../controllers/trainer";

const router = Router();

// All routes require JWT authentication and trainer role
router.use(verifyJWT);
router.use(requireRole("trainer"));

/**
 * GET /api/trainer/dashboard
 * Returns stats overview for trainer
 */
router.get("/dashboard", getTrainerDashboard);

/**
 * GET /api/trainer/clients
 * Returns list of students with optional filters
 * Query params: performance, search, page
 */
router.get("/clients", listTrainerClients);

/**
 * GET /api/trainer/clients/:clientId
 * Returns detailed workout progress for a specific student
 */
router.get("/clients/:clientId", getTrainerClientDetail);

/**
 * PUT /api/trainer/clients/:clientId/program
 * Updates workout program for a student
 * Body: { programId: string }
 */
router.put("/clients/:clientId/program", updateTrainerClientProgram);

export default router;
