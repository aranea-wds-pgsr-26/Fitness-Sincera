import { Router } from "express";
import { env } from "../../config";
import { checkDatabaseConnection } from "../../lib/db";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "fitness-sincera-backend",
    requestId: req.requestId,
  });
});

router.get("/readiness", async (req, res) => {
  const database = await checkDatabaseConnection();

  res.status(database.ok ? 200 : 503).json({
    status: database.ok ? "ok" : "degraded",
    service: "fitness-sincera-backend",
    database,
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
