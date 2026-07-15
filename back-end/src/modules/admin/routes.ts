import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth";
import { AdminRepository } from "../../repositories/adminRepository";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { AppError } from "../../shared/errors/AppError";

const router = Router();

router.use(requireAuth, requireRole(["admin"]));

router.get(
  "/dashboard",
  asyncHandler(async (_req, res) => {
    const dashboard = await AdminRepository.getDashboard();
    return res.json({ success: true, data: dashboard });
  })
);

router.get(
  "/professionals",
  asyncHandler(async (_req, res) => {
    const professionals = await AdminRepository.listProfessionals();
    return res.json({ success: true, data: professionals });
  })
);

router.get(
  "/site-leads",
  asyncHandler(async (req, res) => {
    const limit = typeof req.query.limit === "string" ? Number(req.query.limit) : undefined;
    const leads = await AdminRepository.listSiteLeads(limit);
    return res.json({ success: true, data: leads });
  })
);

router.post(
  "/professionals",
  asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body as {
      name?: string;
      email?: string;
      password?: string;
      role?: "nutritionist" | "trainer";
    };

    if (!name || !email || !password || !role) {
      throw new AppError("name, email, password and role are required", 400);
    }

    if (!["nutritionist", "trainer"].includes(role)) {
      throw new AppError("role must be nutritionist or trainer", 400);
    }

    const professional = await AdminRepository.createProfessional({
      name,
      email,
      password,
      role,
    });

    if (!professional) {
      throw new AppError("Professional already exists", 409);
    }

    return res.status(201).json({ success: true, data: professional });
  })
);

export default router;
