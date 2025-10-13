"use client";

import { useDashboardTransactions } from "../hooks/useDashboardTransactions";
import StatusBadge from "./StatusBadge";

export default function TransactionTable() {
  const { data, isLoading, isError } = useDashboardTransactions();

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
      ) : !data || data.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 py-4">
          No transactions found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b dark:border-gray-700 text-left">
              <tr>
                <th className="py-2">PAYER NAME</th>
                <th className="py-2">DATE</th>
                <th className="py-2">AMOUNT</th>
                <th className="py-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((tx, idx) => (
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
