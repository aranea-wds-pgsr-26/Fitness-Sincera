import { Router } from "express";
import { env } from "../../config";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "fitness-sincera-backend",
    requestId: req.requestId,
  });
});

router.get("/readiness", (req, res) => {
  res.json({
    status: "ok",
    service: "fitness-sincera-backend",
    database: {
      configured: Boolean(env.DATABASE_URL),
    },
    requestId: req.requestId,
  });
});

router.get("/meta", (req, res) => {
  res.json({
    service: "fitness-sincera-backend",
    apiVersion: "v1",
    environment: env.NODE_ENV,
    requestId: req.requestId,
  });
});

export default router;
