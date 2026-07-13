import {
  createWearable,
  createSyncEvent,
  listWearablesForUser,
} from "../lib/store";

export const WearableRepository = {
  listByUser(userId: string) {
    return listWearablesForUser(userId);
  },

  create(userId: string, payload: Parameters<typeof createWearable>[1]) {
    return createWearable(userId, payload);
  },

  sync(provider: string, payload: Record<string, unknown>) {
    return createSyncEvent(provider, payload);
  },
};