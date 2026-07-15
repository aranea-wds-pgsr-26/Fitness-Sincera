import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { api } from "../api";

export function useClientMealPlan() {
  return useQuery({
    queryKey: ["/api/client/meal-plan/today"],
    queryFn: api.getClientMealPlan,
  });
}

export function useMealSwapRequest() {
  return useMutation({
    mutationFn: ({ blockId, reason, note }: { blockId: string; reason: string; note?: string }) =>
      api.requestMealBlockSwap(blockId, reason, note),
  });
}

export function useMealsToday() {
  return useQuery({
    queryKey: ["/api/meals/today"],
    queryFn: api.getMealsToday,
  });
}

export function useNutritionSummary() {
  return useQuery({
    queryKey: ["/api/nutrition/summary"],
    queryFn: api.getNutritionSummary,
  });
}

export function useUpdateMealStatus() {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: "pending" | "completed" }) =>
      api.updateMealStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/meals/today"] });
      queryClient.invalidateQueries({ queryKey: ["/api/nutrition/summary"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/summary"] });
    },
  });
}

export function useSwapMeal() {
  return useMutation({
    mutationFn: (id: string) => api.swapMeal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/meals/today"] });
      queryClient.invalidateQueries({ queryKey: ["/api/nutrition/summary"] });
    },
  });
}
