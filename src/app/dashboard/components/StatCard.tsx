import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value?: string | number;
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
    <div
      className={cn(
        "flex items-center gap-4 px-6 py-5 rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full transition-colors",
          "bg-accent/60 text-accent-foreground shadow-sm dark:bg-primary/20 dark:text-primary"
        )}
      >
        {Icon ? <Icon className="w-5 h-5" /> : null}
      </div>

      {/* Texts */}
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground mb-1 truncate">{title}</p>

        {isLoading ? (
          <div className="h-6 w-32 rounded bg-muted animate-pulse" />
        ) : (
          <p className="text-2xl font-semibold text-foreground">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        )}
      </div>
    </div>
  );
}
