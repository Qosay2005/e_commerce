
import { useMutation } from "@tanstack/react-query";
import AuthaxiosInstance from "../api/Authaxiosinstance";

export function useSendResetCode() {
  return useMutation({
    mutationFn: async (email) => {
      const response = await AuthaxiosInstance.post(
        "/auth/Account/SendCode",
        {
          email,
        }
      );

      return response.data;
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async ({ email, code, newPassword }) => {
      const response = await AuthaxiosInstance.patch(
        "/auth/Account/ResetPassword",
        {
          email,
          code,
          newPassword,
        }
      );

      return response.data;
    },
  });
}

