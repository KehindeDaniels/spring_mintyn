"use client";

import { Suspense } from "react";
import SearchBarInner from "./SearchBarInner";

export default function SearchBar() {
  return (
    <Suspense
      fallback={
        <div className="hidden sm:flex items-center gap-2 bg-muted/40 px-3 py-2 rounded-lg w-64 animate-pulse" />
      }
    >
      <SearchBarInner />
    </Suspense>
  );
}
