"use client";

import { useSearchParams } from "next/navigation";
import { useDashboardStats } from "./hooks/useDashboardStats";
import { useDashboardTransactions } from "./hooks/useDashboardTransactions";
import StatCard from "./components/StatCard";
import TransactionTable from "./components/TransactionTable";
import DashboardFilters from "./components/DashboardFilters";
import { DollarSign } from "lucide-react";

export default function DashboardView() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: transactions, isLoading: txLoading } =
    useDashboardTransactions();

  const filteredTransactions = transactions?.filter((t) =>
    t.player_name.toLowerCase().includes(searchTerm)
  );

  return (
    <section className="space-y-6">
      {/* Filters Section */}
      <DashboardFilters />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Sales Value"
          value={
            statsLoading
              ? "Loading..."
              : `₦${stats?.sales_value.toLocaleString()}.00`
          }
          icon={DollarSign}
        />
        <StatCard
          title="Commissions Earned"
          value={
            statsLoading
              ? "Loading..."
              : `₦${stats?.commission_earned.toLocaleString()}.00`
          }
          icon={DollarSign}
        />
      </div>

      {/* Transactions Table */}
      <TransactionTable
        data={filteredTransactions || []}
        isLoading={txLoading}
      />
    </section>
  );
}
