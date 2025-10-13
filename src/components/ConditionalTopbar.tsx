"use client";

import { usePathname } from "next/navigation";
import Topbar from "@/components/Topbar";

export default function ConditionalTopbar() {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (!isAuthPage) return null; // ✅ hide on dashboard and other pages

  return <Topbar />;
}
