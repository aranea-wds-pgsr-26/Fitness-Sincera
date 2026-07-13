import {
  createWorkout,
  deleteWorkout,
  listWorkoutsForUser,
  updateWorkout,
} from "../lib/store";

export const WorkoutRepository = {
  listByUser(userId: string) {
    return listWorkoutsForUser(userId);
  },

  create(userId: string, payload: Parameters<typeof createWorkout>[1]) {
    return createWorkout(userId, payload);
  },

  update(
    id: string,
    userId: string,
    payload: Parameters<typeof updateWorkout>[2]
  ) {
    return updateWorkout(id, userId, payload);
  },

  delete(id: string, userId: string) {
    return deleteWorkout(id, userId);
  },
};