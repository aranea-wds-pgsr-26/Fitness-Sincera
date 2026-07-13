import { AppError } from "../../shared/errors/AppError";

function validateNumbers(payload: any) {
  const numbers = {
    calories: payload.calories,
    protein: payload.protein,
    carbs: payload.carbs,
    fat: payload.fat,
  };

  for (const [field, value] of Object.entries(numbers)) {
    if (
      value !== undefined &&
      (typeof value !== "number" || value < 0)
    ) {
      throw new AppError(
        `${field} must be a positive number`,
        400
      );
    }
  }
}

export function validateCreateMealPayload(payload: any) {
  const {
    name,
  } = payload;

  if (!name || typeof name !== "string") {
    throw new AppError(
      "Meal name is required",
      400
    );
  }

  validateNumbers(payload);

  return {
    ...payload,
    calories: payload.calories ?? 0,
    protein: payload.protein ?? 0,
    carbs: payload.carbs ?? 0,
    fat: payload.fat ?? 0,
  };
}


export function validateUpdateMealPayload(payload: any) {
  const allowedFields = [
    "name",
    "calories",
    "protein",
    "carbs",
    "fat",
    "notes",
  ];

  const invalidFields = Object.keys(payload)
    .filter((key) => !allowedFields.includes(key));

  if (invalidFields.length > 0) {
    throw new AppError(
      `Invalid fields: ${invalidFields.join(", ")}`,
      400
    );
  }

  if (
    payload.name !== undefined &&
    typeof payload.name !== "string"
  ) {
    throw new AppError(
      "Meal name must be a string",
      400
    );
  }

  validateNumbers(payload);

  return payload;
}