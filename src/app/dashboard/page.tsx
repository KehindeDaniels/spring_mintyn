"use client";

import { DollarSign } from "lucide-react";
import StatCard from "./components/StatCard";
import TransactionTable from "./components/TransactionTable";
import { useDashboardStats } from "./hooks/useDashboardStats";

export default function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

  // helpers to format with currency symbol and .00 like the design
  const fmt = (amount?: number, curr?: string) =>
    amount != null && curr ? `${curr}${amount.toLocaleString()}.00` : "";

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Sales value"
          value={fmt(stats?.sales_value, stats?.currency)}
          icon={DollarSign}
          isLoading={isLoading}
        />
        <StatCard
          title="Commissions earned"
          value={fmt(stats?.commission_earned, stats?.currency)}
          icon={DollarSign}
          isLoading={isLoading}
        />
      </div>

      <TransactionTable />
    </div>
  );
}
