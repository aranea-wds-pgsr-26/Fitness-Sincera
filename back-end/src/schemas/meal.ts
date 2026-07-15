import { z } from "zod";

export const createMealSchema = z.object({
  name: z.string().trim().min(1),
  calories: z.number().min(0),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fat: z.number().min(0),
  consumedAt: z.string().datetime(),
});

export const updateMealSchema = createMealSchema.partial();