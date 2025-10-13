"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

export function useLogin() {
  const router = useRouter();
  const { setToken } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await api.post("/v1/auth/login", payload);
      return res.data;
    },
    onSuccess: (data) => {
      const token = data?.data?.access_token || data?.access_token || null;
      const errorMsg = data?.error;

      if (errorMsg) return toast.error(errorMsg);

      if (token) {
        setToken(token);
        toast.success("Login successful — redirecting...");
        router.push("/dashboard");
      } else {
        toast.error("Login failed — invalid server response.");
      }
    },
    onError: (err: AxiosError<{ error?: string }>) => {
      const message =
        err?.response?.data?.error ||
        err?.message ||
        "Invalid credentials. Please try again.";
      toast.error(message);
    },
  });
}
