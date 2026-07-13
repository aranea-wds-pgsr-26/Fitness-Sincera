import {
  createUser,
  findUserByEmail,
  createSessionToken,
  getSessionUser,
  revokeSession,
  type User,
  type UserRole,
} from "../lib/store";

export const UserRepository = {
  create(payload: Parameters<typeof createUser>[0]) {
    return createUser(payload);
  },

  findByEmail(email: string) {
    return findUserByEmail(email);
  },

  createSession(user: Parameters<typeof createSessionToken>[0]) {
    return createSessionToken(user);
  },

  getSessionUser(token: string) {
    return getSessionUser(token);
  },

  revokeSession(token: string) {
    return revokeSession(token);
  },
};

export { type User, type UserRole };