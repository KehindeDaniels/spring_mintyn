"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface User {
  id: number;
  email: string;
}

interface UserResponse {
  data: User;
  message: string;
  error?: string;
}

const fetchUser = async (): Promise<User> => {
  const res = await api.get<UserResponse>("/v1/auth/user");

  if (res.data.error) throw new Error(res.data.error);
  return res.data.data;
};

export const useUser = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
