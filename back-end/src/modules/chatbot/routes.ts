import { Router } from "express";
import { createChatMessage, listChatMessagesForUser } from "../../lib/store";
import { requireAuth } from "../../middleware/auth";

const router = Router();

router.post("/message", requireAuth, async (req, res) => {
  const { message } = req.body as { message?: string };

  if (!message) {
    return res.status(400).json({ message: "message is required" });
  }

  await createChatMessage(req.user!.id, message, "user");

  const lowerMessage = message.toLowerCase();
  let reply = "I can help with nutrition, workouts, and wearable insights.";

  if (lowerMessage.includes("refeição") || lowerMessage.includes("meal")) {
    reply = "I can help you build a meal plan around calories, protein and hydration goals.";
  } else if (lowerMessage.includes("treino") || lowerMessage.includes("workout")) {
    reply = "I can suggest a progressive training plan and recovery strategy.";
  } else if (lowerMessage.includes("pulseira") || lowerMessage.includes("wearable")) {
    reply = "I can help you sync a wearable device and summarize sleep, steps and heart rate.";
  }

  const entry = await createChatMessage(req.user!.id, reply, "assistant");
  return res.json({ reply, entry });
});

router.get("/history", requireAuth, async (req, res) => {
  const history = await listChatMessagesForUser(req.user!.id);
  return res.json(history);
});

export default router;
