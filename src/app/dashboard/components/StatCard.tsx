import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value?: string | number; // optional while loading
  icon?: LucideIcon;
  isLoading?: boolean;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  isLoading = false,
}: StatCardProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 px-6 py-5 flex items-center gap-4">
      {/* Icon on the LEFT */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30">
        {Icon ? <Icon className="w-5 h-5 text-blue-500" /> : null}
      </div>

      {/* Texts */}
      <div className="min-w-0">
        <p className="text-sm text-gray-500 mb-1 truncate">{title}</p>

        {isLoading ? (
          // skeleton for value
          <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        ) : (
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        )}
      </div>
    </div>
  );
}
