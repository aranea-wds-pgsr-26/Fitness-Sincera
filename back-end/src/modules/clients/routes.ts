import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth";
import { ProfessionalClientRepository, type AssignmentStatus, type ProfessionalSpecialty } from "../../repositories/professionalClientRepository";
import { AppError } from "../../shared/errors/AppError";
import { asyncHandler } from "../../shared/utils/asyncHandler";

const validStatuses = new Set<AssignmentStatus>(["active", "inactive", "paused"]);

function queryValue(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function routeId(value: string | string[]) {
  if (Array.isArray(value)) throw new AppError("Invalid resource id", 400);
  return value;
}

function createProfessionalRouter(specialty: ProfessionalSpecialty, role: "nutritionist" | "trainer") {
  const router = Router();
  router.use(requireAuth, requireRole([role]));

  router.get("/clients", asyncHandler(async (req, res) => {
    const status = queryValue(req.query.status);
    if (status && !validStatuses.has(status as AssignmentStatus)) {
      throw new AppError("status must be active, inactive or paused", 400);
    }

    const result = await ProfessionalClientRepository.listForProfessional(req.user!.id, {
      specialty,
      status: status as AssignmentStatus | undefined,
      search: queryValue(req.query.search),
      page: Number(queryValue(req.query.page) ?? 1),
    });

    return res.json({ success: true, ...result });
  }));

  return router;
}

export const nutritionistClientsRouter = createProfessionalRouter("nutrition", "nutritionist");
export const trainerClientsRouter = createProfessionalRouter("training", "trainer");

export const clientAssignmentsRouter = Router();
clientAssignmentsRouter.use(requireAuth, requireRole(["admin"]));

clientAssignmentsRouter.post("/:clientId/assignments", asyncHandler(async (req, res) => {
  const clientId = req.params.clientId;
  const body = req.body as { professionalId?: string; specialty?: ProfessionalSpecialty };

  if (!body.professionalId || !body.specialty || !["nutrition", "training"].includes(body.specialty)) {
    throw new AppError("professionalId and specialty (nutrition or training) are required", 400);
  }

  const assignment = await ProfessionalClientRepository.assign(body.professionalId, routeId(clientId), body.specialty);
  if (!assignment) throw new AppError("Professional or client is invalid for this specialty", 400);

  return res.status(201).json({ success: true, data: assignment });
}));

clientAssignmentsRouter.delete("/:clientId/assignments/:assignmentId", asyncHandler(async (req, res) => {
  const assignment = await ProfessionalClientRepository.remove(routeId(req.params.assignmentId), routeId(req.params.clientId));
  if (!assignment) throw new AppError("Assignment not found", 404);
  return res.status(204).send();
}));