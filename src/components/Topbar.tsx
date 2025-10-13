"use client";

import { ModeToggle } from "@/components/ui/ModeToggle";
import { Bell, HelpCircle, Menu, User as UserIcon } from "lucide-react";
import { useUser } from "@/app/dashboard/hooks/useUser";
import SearchBar from "@/app/dashboard/components/SearchBar";
import { usePathname } from "next/navigation";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { data: user, isLoading, isError } = useUser();
  const pathname = usePathname();

  const getDisplayName = (email?: string) => {
    if (!email) return "User";
    return email.split("@")[0];
  };

  const isAuthPage =
    pathname?.includes("/login") || pathname?.includes("/signup");

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-background text-foreground border-b border-border shadow-sm transition-colors">
      {/* --- Left Section --- */}
      <div className="flex items-center gap-3">
        {!isAuthPage && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded hover:bg-muted"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/*  logo */}
        <div className="flex items-center gap-2 select-none">
          <span className="text-xl">🔥</span>
          <h1 className="font-semibold text-lg tracking-tight">Spring</h1>
        </div>
      </div>

      {/* --- Center  --- */}
      {!isAuthPage && user && <SearchBar />}

      {/* --- Right  --- */}
      <div className="flex items-center gap-5">
        <ModeToggle />

        {!isAuthPage && (
          <>
            <Bell className="w-5 h-5 text-muted-foreground cursor-pointer" />
            <HelpCircle className="w-5 h-5 text-muted-foreground cursor-pointer" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted border border-border">
                <UserIcon className="w-4 h-4 text-foreground" />
              </div>

              <span className="text-sm font-medium">
                {isLoading
                  ? "Loading..."
                  : isError
                  ? "Unknown"
                  : getDisplayName(user?.email)}
              </span>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
