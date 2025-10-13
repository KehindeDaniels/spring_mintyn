"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface SignupPayload {
  email: string;
  password: string;
}

export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: SignupPayload) => {
      const res = await api.post("/v1/auth/signup", payload);
      return res.data;
    },
    onSuccess: (data) => {
      const errorMsg = data?.error;
      const userId = data?.data?.id;
      const userEmail = data?.data?.email;

      if (errorMsg) return toast.error(errorMsg);

      if (userId && userEmail) {
        toast.success("Signup successful — you can now log in.");
        router.push("/login");
      } else {
        toast.error("Signup failed — invalid server response.");
      }
    },
    onError: (err: AxiosError<{ error?: string }>) => {
      const message =
        err?.response?.data?.error ||
        err?.message ||
        "Signup failed. Please try again.";
      toast.error(message);
    },
  });
}
