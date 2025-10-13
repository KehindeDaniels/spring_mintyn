"use client";

import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useDashboardTransactions } from "../hooks/useDashboardTransactions";
import StatusBadge from "./StatusBadge";

type SortKey = "player_name" | "date" | "amount" | "status";
type SortOrder = "asc" | "desc";

export default function TransactionTable() {
  const { data, isLoading, isError } = useDashboardTransactions();

  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      // Toggle sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // New column sort
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });
  }, [data, sortKey, sortOrder]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Transaction History
        </h2>
        <button className="text-blue-600 text-sm font-medium hover:underline">
          See all
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 py-4">
          Loading transactions...
        </p>
      ) : isError ? (
        <p className="text-sm text-red-500 py-4">
          Failed to load transactions.
        </p>
      ) : !sortedData.length ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 py-4">
          No transactions found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b dark:border-gray-700 text-left">
              <tr>
                {[
                  { key: "player_name", label: "PAYER NAME" },
                  { key: "date", label: "DATE" },
                  { key: "amount", label: "AMOUNT" },
                  { key: "status", label: "STATUS" },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key as SortKey)}
                    className="py-2 cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-1">
                      <span>{label}</span>
                      {sortKey === key ? (
                        sortOrder === "asc" ? (
                          <ChevronUp className="w-3.5 h-3.5 text-blue-600" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
                        )
                      ) : (
                        <ChevronUp className="w-3.5 h-3.5 text-gray-400 opacity-50 group-hover:opacity-100" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {sortedData.map((tx, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-0 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition"
                >
                  <td className="py-3 text-gray-800 dark:text-gray-200">
                    {tx.player_name}
                  </td>
                  <td className="py-3 text-gray-600 dark:text-gray-400">
                    {tx.date}
                  </td>
                  <td className="py-3 text-gray-900 dark:text-gray-100 font-medium">
                    {tx.currency}
                    {tx.amount.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={tx.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
