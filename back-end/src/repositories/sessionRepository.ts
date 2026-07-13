import {
  createSessionToken,
  getSessionUser,
  revokeSession,
} from "../lib/store";

export const SessionRepository = {
  create(user: Parameters<typeof createSessionToken>[0]) {
    return createSessionToken(user);
  },

  getUser(token: string) {
    return getSessionUser(token);
  },

  revoke(token: string) {
    return revokeSession(token);
  },
};