export type MealStatus = "pending" | "completed";

export interface MealItem {
  id: string;
  time: string;
  title: string;
  items: string[];
  calories: number;
  status: MealStatus;
  type: "meal" | "snack";
  swapOptions?: string[];
  image?: string;
}