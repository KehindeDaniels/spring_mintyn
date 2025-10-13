"use client";

import { Suspense } from "react";
import DashboardView from "./DashboardView";

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-sm text-muted-foreground">
          Loading dashboard...
        </div>
      }
    >
      <DashboardView />
    </Suspense>
  );
}
