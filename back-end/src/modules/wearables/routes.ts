import { Router } from "express";
import { createSyncEvent, createWearable, listWearablesForUser } from "../../lib/store";
import { requireAuth } from "../../middleware/auth";

const router = Router();

router.get("/devices", requireAuth, async (req, res) => {
  const devices = await listWearablesForUser(req.user!.id);
  return res.json(devices);
});

router.post("/devices", requireAuth, async (req, res) => {
  const device = await createWearable(req.user!.id, req.body);
  return res.status(201).json(device);
});

router.post("/sync", requireAuth, async (req, res) => {
  const { provider, payload } = req.body as { provider?: string; payload?: Record<string, unknown> };

  if (!provider || !payload) {
    return res.status(400).json({ message: "provider and payload are required" });
  }

  const syncResult = await createSyncEvent(provider, payload);
  return res.json({
    message: "Wearable sync request captured",
    ...syncResult,
    nextStep: "Connect the provider-specific API adapter in the future",
  });
});

export default router;
