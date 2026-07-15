import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { api } from "../api";

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["/api/dashboard/summary"],
    queryFn: api.getDashboardSummary,
  });
}

export function useProgressHistory() {
  return useQuery({
    queryKey: ["/api/progress/history"],
    queryFn: api.getProgressHistory,
  });
}

export function useWaterToday() {
  return useQuery({
    queryKey: ["/api/water/today"],
    queryFn: api.getWaterToday,
  });
}

export function useAddWater() {
  return useMutation({
    mutationFn: (amount: number) => api.addWater(amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/water/today"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/summary"] });
    },
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: ["/api/achievements"],
    queryFn: api.getAchievements,
  });
}
