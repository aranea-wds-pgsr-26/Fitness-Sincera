import { Router } from "express";
import { ChatRepository } from "../../repositories/chatRepository";
import { requireAuth } from "../../middleware/auth";
import { buildChatReply } from "./chatResponder";

const router = Router();

router.post("/message", requireAuth, async (req, res) => {
  const { message } = req.body as { message?: string };

  if (!message?.trim()) {
    return res.status(400).json({ message: "message is required" });
  }

  const cleanMessage = message.trim();
  await ChatRepository.create(req.user!.id, cleanMessage, "user");

  const recentHistory = await ChatRepository.listRecentByUser(req.user!.id);
  const reply = buildChatReply({
    message: cleanMessage,
    role: req.user!.role,
    userName: req.user!.name,
    recentHistory,
  });

  const entry = await ChatRepository.create(req.user!.id, reply, "assistant");
  return res.json({ reply, entry });
});

router.get("/history", requireAuth, async (req, res) => {
  const history = await ChatRepository.listByUser(req.user!.id);
  return res.json(history);
});

export default router;
