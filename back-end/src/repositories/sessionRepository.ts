import { UserRepository } from "./userRepository";

export const SessionRepository = {
  create(user: Parameters<typeof UserRepository.createSession>[0]) {
    return UserRepository.createSession(user);
  },

  getUser(token: string) {
    return UserRepository.getSessionUser(token);
  },

  revoke(token: string) {
    return UserRepository.revokeSession(token);
  },
};
