import { useQuery } from "@tanstack/react-query";
import {
  TrainerDashboardStats,
  ClientListItem,
  ClientWorkoutDetail,
} from "@shared/types/professional";

// Standard API routes (no /dev/ prefix)
const API_BASE = "/api/trainer";

export function useTrainerDashboard() {
  return useQuery({
    queryKey: ["trainer", "dashboard"],
    queryFn: async (): Promise<TrainerDashboardStats> => {
      const response = await fetch(`${API_BASE}/dashboard`);
      if (!response.ok) throw new Error("Failed to fetch dashboard");
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export interface UseTrainerClientsOptions {
  performance?: string;
  search?: string;
  page?: number;
}

export function useTrainerClients(options: UseTrainerClientsOptions = {}) {
  const { performance, search, page = 1 } = options;

  return useQuery({
    queryKey: ["trainer", "clients", { performance, search, page }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (performance && performance !== "all") params.append("performance", performance);
      if (search) params.append("search", search);
      params.append("page", page.toString());

      const response = await fetch(
        `${API_BASE}/clients?${params.toString()}`
      );
      if (!response.ok) throw new Error("Failed to fetch students");
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useTrainerClientDetail(clientId: string | null) {
  return useQuery({
    queryKey: ["trainer", "client", clientId],
    queryFn: async (): Promise<ClientWorkoutDetail> => {
      const response = await fetch(`${API_BASE}/clients/${clientId}`);
      if (!response.ok) throw new Error("Failed to fetch student detail");
      return response.json();
    },
    enabled: !!clientId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useUpdateTrainerClientProgram() {
  return async (clientId: string, programId: string) => {
    const response = await fetch(`${API_BASE}/clients/${clientId}/program`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ programId }),
    });
    if (!response.ok) throw new Error("Failed to update workout program");
    return response.json();
  };
}
