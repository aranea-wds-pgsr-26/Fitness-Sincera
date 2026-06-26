import { useQuery } from "@tanstack/react-query";
import {
  NutritionistDashboardStats,
  ClientListItem,
  ClientNutritionDetail,
} from "@shared/types/professional";

// Standard API routes (no /dev/ prefix)
const API_BASE = "/api/nutritionist";

export function useNutritionistDashboard() {
  return useQuery({
    queryKey: ["nutritionist", "dashboard"],
    queryFn: async (): Promise<NutritionistDashboardStats> => {
      const response = await fetch(`${API_BASE}/dashboard`);
      if (!response.ok) throw new Error("Failed to fetch dashboard");
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export interface UseNutritionistClientsOptions {
  status?: string;
  search?: string;
  page?: number;
}

export function useNutritionistClients(options: UseNutritionistClientsOptions = {}) {
  const { status, search, page = 1 } = options;

  return useQuery({
    queryKey: ["nutritionist", "clients", { status, search, page }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (status && status !== "all") params.append("status", status);
      if (search) params.append("search", search);
      params.append("page", page.toString());

      const response = await fetch(
        `${API_BASE}/clients?${params.toString()}`
      );
      if (!response.ok) throw new Error("Failed to fetch clients");
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useNutritionistClientDetail(clientId: string | null) {
  return useQuery({
    queryKey: ["nutritionist", "client", clientId],
    queryFn: async (): Promise<ClientNutritionDetail> => {
      const response = await fetch(`${API_BASE}/clients/${clientId}`);
      if (!response.ok) throw new Error("Failed to fetch client detail");
      return response.json();
    },
    enabled: !!clientId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useUpdateNutritionistClientPlan() {
  return async (clientId: string, mealPlanId: string) => {
    const response = await fetch(`${API_BASE}/clients/${clientId}/plan`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mealPlanId }),
    });
    if (!response.ok) throw new Error("Failed to update meal plan");
    return response.json();
  };
}
