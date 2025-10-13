"use client";

import { ModeToggle } from "@/components/ui/ModeToggle";
import { Bell, HelpCircle, Menu, User as UserIcon } from "lucide-react";
import { useUser } from "../hooks/useUser";
import SearchBar from "./SearchBar"; // 👈 import the new component

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { data: user, isLoading, isError } = useUser();

  const getDisplayName = (email?: string) => {
    if (!email) return "User";
    return email.split("@")[0];
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800">
      {/* --- Left Section --- */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>

        <h1 className="font-semibold text-gray-800 dark:text-gray-200 text-lg tracking-tight">
          Spring
        </h1>
      </div>
      {/* --- Center: Search --- */}
      <SearchBar /> {/* 👈 replaces the static input */}
      {/* --- Right Section --- */}
      <div className="flex items-center gap-5">
        <ModeToggle />
        <Bell className="text-gray-500 dark:text-gray-300 w-5 h-5 cursor-pointer" />
        <HelpCircle className="text-gray-500 dark:text-gray-300 w-5 h-5 cursor-pointer" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
            <UserIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </div>

          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {isLoading
              ? "Loading..."
              : isError
              ? "Unknown"
              : getDisplayName(user?.email)}
          </span>
        </div>
      </div>
    </header>
  );
}
