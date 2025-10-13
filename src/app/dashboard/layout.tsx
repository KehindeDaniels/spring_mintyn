"use client";

import { Suspense, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground transition-colors">
      <Suspense
        fallback={<div className="h-14 bg-background border-b border-border" />}
      >
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
      </Suspense>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
