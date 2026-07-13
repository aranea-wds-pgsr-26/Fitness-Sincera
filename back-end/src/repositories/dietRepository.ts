import {
  createDiet,
  deleteDiet,
  listDietsForUser,
  updateDiet,
} from "../lib/store";

export const DietRepository = {
  listByUser(userId: string) {
    return listDietsForUser(userId);
  },

  create(userId: string, payload: Parameters<typeof createDiet>[1]) {
    return createDiet(userId, payload);
  },

  update(
    id: string,
    userId: string,
    payload: Parameters<typeof updateDiet>[2]
  ) {
    return updateDiet(id, userId, payload);
  },

  delete(id: string, userId: string) {
    return deleteDiet(id, userId);
  },
};