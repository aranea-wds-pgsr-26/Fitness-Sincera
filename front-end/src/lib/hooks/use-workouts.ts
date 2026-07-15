import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { api } from "../api";

export function useWorkouts(category?: string) {
  return useQuery({
    queryKey: ["/api/workouts", category],
    queryFn: () => api.getWorkouts(category),
  });
}

export function useWorkout(id: string) {
  return useQuery({
    queryKey: ["/api/workouts", id],
    queryFn: () => api.getWorkout(id),
    enabled: !!id,
  });
}

export function useStartWorkout() {
  return useMutation({
    mutationFn: (workoutId: string) => api.startWorkout(workoutId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/summary"] });
    },
  });
}

export function useCompleteWorkout() {
  return useMutation({
    mutationFn: (sessionId: string) => api.completeWorkout(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/summary"] });
    },
  });
}
