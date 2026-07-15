import { Router } from "express";
import { SiteLeadRepository } from "../../repositories/siteLeadRepository";
import { UserRepository } from "../../repositories/userRepository";
import { ClientOnboardingRepository } from "../../repositories/clientOnboardingRepository";
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

router.post(
  "/client-signup",
  asyncHandler(async (req, res) => {
    const {
      name,
      email,
      password,
      phone,
      birthDate,
      gender,
      goal,
      planInterest,
      heightCm,
      weightKg,
      activityLevel,
      restrictions,
      injuries,
      medications,
      sleepQuality,
      hydration,
      notes,
    } = req.body as {
      name?: string;
      email?: string;
      password?: string;
      phone?: string;
      birthDate?: string;
      gender?: string;
      goal?: string;
      planInterest?: string;
      heightCm?: number | string;
      weightKg?: number | string;
      activityLevel?: string;
      restrictions?: string;
      injuries?: string;
      medications?: string;
      sleepQuality?: string;
      hydration?: string;
      notes?: string;
    };

    if (!name?.trim() || !email?.trim() || !password?.trim() || !goal?.trim() || !planInterest?.trim()) {
      throw new AppError("name, email, password, goal and planInterest are required", 400);
    }

    const existingUser = await UserRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError("Email already registered", 409);
    }

    const user = await UserRepository.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: "client",
    });

    try {
      await ClientOnboardingRepository.createForUser(
        user.id,
        {
          phone,
          birthDate,
          gender,
          goal,
          planInterest,
        },
        {
          objective: goal,
          heightCm: heightCm === undefined ? null : Number(heightCm),
          weightKg: weightKg === undefined ? null : Number(weightKg),
          activityLevel,
          restrictions,
          injuries,
          medications,
          sleepQuality,
          hydration,
          notes,
        }
      );
    } catch (error) {
      await UserRepository.deleteByEmail(email);
      throw error;
    }

    const token = await UserRepository.createSession(user);

    return res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  })
);

export default router;
