"use client";

import { DollarSign } from "lucide-react";
import StatCard from "./components/StatCard";
import TransactionTable, { Transaction } from "./components/TransactionTable";

const mockStats = {
  sales_value: 230000000,
  commission_earned: 200000,
  currency: "₦",
};

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
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Sales value"
          value={`${
            mockStats.currency
          }${mockStats.sales_value.toLocaleString()}.00`}
          icon={DollarSign}
        />
        <StatCard
          title="Commissions earned"
          value={`${
            mockStats.currency
          }${mockStats.commission_earned.toLocaleString()}.00`}
          icon={DollarSign}
        />
      </div>

      <TransactionTable data={mockTransactions} />
    </div>
  );
}
