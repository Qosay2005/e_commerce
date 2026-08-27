import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AuthaxiosInstance from "../api/Authaxiosinstance";
import useAuthStore from "./authStore";

const PROFILE_KEY = ["profile"];

export default function useProfile() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: PROFILE_KEY,
    queryFn: async () => {
      const response = await AuthaxiosInstance.get("/Profile");
      return response.data;
    },
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await AuthaxiosInstance.patch("/Profile", data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROFILE_KEY,
      });
    },
  });
}

export function useChangeEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await AuthaxiosInstance.patch(
        "/Profile/change-email",
        data
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROFILE_KEY,
      });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (data) => {
      const response = await AuthaxiosInstance.patch(
        "/Profile/change-password",
        data
      );

      return response.data;
    },
  });
}