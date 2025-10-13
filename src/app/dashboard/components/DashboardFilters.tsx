"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardFiltersProps {
  onFilterChange?: (filter: string) => void;
  onDateChange?: (range: { from: string; to: string }) => void;
}

export default function DashboardFilters({
  onFilterChange,
  onDateChange,
}: DashboardFiltersProps) {
  const [filter, setFilter] = useState<"daily" | "weekly" | "monthly">("daily");
  const [dateRange, setDateRange] = useState({
    from: "2025-08-01",
    to: "2025-08-15",
  });

  const handleFilterChange = (value: "daily" | "weekly" | "monthly") => {
    setFilter(value);
    onFilterChange?.(value);
  };

  const handleDateClick = () => {
    // Later, this can open a proper date range picker
    const today = new Date().toISOString().split("T")[0];
    setDateRange({ from: today, to: today });
    onDateChange?.({ from: today, to: today });
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-3">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Overview
      </h1>

      <div className="flex items-center gap-3">
        {/* Dropdown */}
        <div className="relative">
          <select
            value={filter}
            onChange={(e) =>
              handleFilterChange(
                e.target.value as "daily" | "weekly" | "monthly"
              )
            }
            className={cn(
              "appearance-none border border-gray-200 dark:border-gray-700",
              "bg-white dark:bg-gray-800 text-sm rounded-md px-3 py-1.5",
              "focus:outline-none focus:ring-1 focus:ring-blue-500 pr-7"
            )}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Date range buttons */}
        <button
          onClick={handleDateClick}
          className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <span>{dateRange.from}</span>
        </button>
        <button
          onClick={handleDateClick}
          className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <span>{dateRange.to}</span>
        </button>
      </div>
    </div>
  );
}
