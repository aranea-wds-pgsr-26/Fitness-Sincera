import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { api } from "../api";

export function useProfile() {
  return useQuery({
    queryKey: ["/api/profile"],
    queryFn: api.getProfile,
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: api.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
    },
  });
}
