"use client";

import { usePathname } from "next/navigation";
import { getDashboardComponent } from "@/settings/getDashboardComponent";

export default function DashboardPage() {
  const pathname = usePathname();
  const key = pathname.split("/").pop();
  const DashboardComponent = getDashboardComponent(key);

  return <DashboardComponent />;
}
