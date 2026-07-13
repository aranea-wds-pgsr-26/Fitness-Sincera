import {
  createChatMessage,
  listChatMessagesForUser,
} from "../lib/store";

export const ChatRepository = {
  listByUser(userId: string) {
    return listChatMessagesForUser(userId);
  },

  create(
    userId: string,
    content: string,
    role: "user" | "assistant"
  ) {
    return createChatMessage(userId, content, role);
  },
};