"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Transaction {
  player_name: string;
  date: string;
  amount: number;
  currency: string;
  status: string;
}

interface TransactionsResponse {
  data: Transaction[];
  message: string;
  error?: string | null;
}

const fetchTransactions = async (): Promise<Transaction[]> => {
  const res = await api.get<TransactionsResponse>("/v1/dashboard/transactions");

  if (res.data.error) throw new Error(res.data.error);
  return res.data.data;
};

export const useDashboardTransactions = () => {
  return useQuery<Transaction[]>({
    queryKey: ["dashboard-transactions"],
    queryFn: fetchTransactions,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
