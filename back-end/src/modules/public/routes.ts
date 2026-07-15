import { Router } from "express";
import { SiteLeadRepository } from "../../repositories/siteLeadRepository";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { AppError } from "../../shared/errors/AppError";

const router = Router();

const allowedAudiences = ["client", "nutritionist", "trainer", "company"] as const;
const allowedInterests = ["complete", "nutrition", "training", "professional", "partnership"] as const;

router.post(
  "/leads",
  asyncHandler(async (req, res) => {
    const { name, email, phone, audience, interest, message } = req.body as {
      name?: string;
      email?: string;
      phone?: string;
      audience?: (typeof allowedAudiences)[number];
      interest?: (typeof allowedInterests)[number];
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !audience || !interest) {
      throw new AppError("name, email, audience and interest are required", 400);
    }

    if (!allowedAudiences.includes(audience)) {
      throw new AppError("audience is invalid", 400);
    }

    if (!allowedInterests.includes(interest)) {
      throw new AppError("interest is invalid", 400);
    }

    const lead = await SiteLeadRepository.create({
      name,
      email,
      phone,
      audience,
      interest,
      message,
    });

    return res.status(201).json({
      success: true,
      data: {
        id: lead.id,
        status: lead.status,
      },
    });
  })
);

export default router;
