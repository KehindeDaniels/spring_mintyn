"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, BarChart3, Users, Settings, X, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/useAuthStore";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Transactions", href: "/dashboard/transactions", icon: BarChart3 },
  { label: "Reports", href: "/dashboard/reports", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { setToken } = useAuthStore();

  const handleLogout = () => {
    Cookies.remove("token");
    setToken("");
    router.push("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed md:static top-0 left-0 h-full w-64 bg-card text-card-foreground border-r border-border shadow-sm flex flex-col z-50 transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 font-semibold text-lg">
          <span className="text-foreground">Spring</span>
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-4 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href);
                  onClose();
                }}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout at bottom */}
        <div className="border-t border-border px-4 py-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
