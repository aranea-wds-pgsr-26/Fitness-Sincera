import {
  createMeal,
  deleteMeal,
  listMealsForUser,
  updateMeal,
} from "../lib/store";

export const MealRepository = {
  listByUser(userId: string) {
    return listMealsForUser(userId);
  },

  create(
    userId: string,
    payload: Parameters<typeof createMeal>[1]
  ) {
    return createMeal(userId, payload);
  },

  update(
  mealId: string,
  userId: string,
  payload: Parameters<typeof updateMeal>[2]
) {
  return updateMeal(mealId, userId, payload);
},

delete(
  mealId: string,
  userId: string
) {
  return deleteMeal(mealId, userId);
},
};