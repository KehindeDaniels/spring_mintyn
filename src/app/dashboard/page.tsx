"use client";

import { DollarSign } from "lucide-react";
import StatCard from "./components/StatCard";
import TransactionTable, { Transaction } from "./components/TransactionTable";
import { useDashboardStats } from "./hooks/useDashboardStats";

const mockTransactions: Transaction[] = [
  {
    player_name: "James Ibori",
    date: "08/09/2025",
    amount: 20000,
    status: "PENDING",
  },
  {
    player_name: "Mark Spencer",
    date: "01/12/2025",
    amount: 200000,
    status: "PENDING",
  },
  {
    player_name: "Lola Rubis",
    date: "12/12/2025",
    amount: 607000,
    status: "PENDING",
  },
  {
    player_name: "Simon Effiong",
    date: "12/10/2025",
    amount: 560000,
    status: "PENDING",
  },
  {
    player_name: "Kate Wilson",
    date: "02/09/2025",
    amount: 70000,
    status: "APPROVED",
  },
  {
    player_name: "Peter Marcus",
    date: "11/09/2025",
    amount: 100000,
    status: "APPROVED",
  },
  {
    player_name: "Josh Egger",
    date: "08/09/2025",
    amount: 240000,
    status: "APPROVED",
  },
];

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

      <TransactionTable data={mockTransactions} />
    </div>
  );
}
