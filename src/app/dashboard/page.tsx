"use client";

import { useSearchParams } from "next/navigation";
import { useDashboardTransactions } from "./hooks/useDashboardTransactions";
import TransactionTable from "./components/TransactionTable";
import StatCard from "./components/StatCard";
import { useDashboardStats } from "./hooks/useDashboardStats";
import { DollarSign } from "lucide-react";
import DashboardFilters from "./components/DashboardFilters";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: transactions, isLoading: txLoading } =
    useDashboardTransactions();

  const filteredTransactions = transactions?.filter((t) =>
    t.player_name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <DashboardFilters />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Sales value"
          value={
            statsLoading
              ? "Loading..."
              : `₦${stats?.sales_value.toLocaleString()}.00`
          }
          icon={DollarSign}
        />
        <StatCard
          title="Commissions earned"
          value={
            statsLoading
              ? "Loading..."
              : `₦${stats?.commission_earned.toLocaleString()}.00`
          }
          icon={DollarSign}
        />
      </div>

      <TransactionTable
        data={filteredTransactions || []}
        isLoading={txLoading}
      />
    </div>
  );
}
