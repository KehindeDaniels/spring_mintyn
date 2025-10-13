"use client";

import { useState } from "react";
import { ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Transaction } from "../hooks/useDashboardTransactions";
import { cn } from "@/lib/utils";

interface TransactionTableProps {
  data: Transaction[];
  isLoading?: boolean;
}

type SortKey = keyof Pick<
  Transaction,
  "player_name" | "date" | "amount" | "status"
>;

export default function TransactionTable({
  data,
  isLoading,
}: TransactionTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("player_name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    return sortOrder === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm mt-6 animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-muted-foreground">
            Transaction History
          </h2>
          <div className="h-4 w-12 bg-muted rounded" />
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-6 bg-muted rounded mb-2" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm mt-6 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Transaction History
        </h2>
        <button className="text-primary text-sm font-medium hover:underline transition">
          See all
        </button>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-foreground">
        <thead className="border-b border-border text-muted-foreground">
          <tr>
            {[
              { label: "PAYER NAME", key: "player_name" },
              { label: "DATE", key: "date" },
              { label: "AMOUNT", key: "amount" },
              { label: "STATUS", key: "status" },
            ].map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key as SortKey)}
                className="text-left py-2 cursor-pointer select-none group"
              >
                <div className="flex items-center gap-1">
                  <span>{col.label}</span>
                  {sortKey === col.key ? (
                    sortOrder === "asc" ? (
                      <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((tx, idx) => (
              <tr
                key={idx}
                className={cn(
                  "border-b border-border/60 transition-colors",
                  "hover:bg-muted/40"
                )}
              >
                <td className="py-2">{tx.player_name}</td>
                <td className="py-2">{tx.date}</td>
                <td className="py-2 font-medium">
                  {tx.currency || "₦"}
                  {tx.amount.toLocaleString()}
                </td>
                <td className="py-2">
                  <StatusBadge status={tx.status} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center py-4 text-muted-foreground"
              >
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
