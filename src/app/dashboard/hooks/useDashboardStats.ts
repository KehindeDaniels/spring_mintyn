"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface DashboardStats {
  sales_value: number;
  commission_earned: number;
  currency: string;
}

interface DashboardStatsResponse {
  data: DashboardStats;
  message: string;
  error?: string | null;
}

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const res = await api.get<DashboardStatsResponse>("/v1/dashboard/stats");

  if (res.data.error) throw new Error(res.data.error);
  return res.data.data;
};

export const useDashboardStats = () =>
  useQuery<DashboardStats>({
    queryKey: ["dashboard", "stats"],
    queryFn: fetchDashboardStats,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
