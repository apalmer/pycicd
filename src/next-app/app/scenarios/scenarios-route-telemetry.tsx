"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackClientTrace } from "@/lib/application-insights-client";

export default function ScenariosRouteTelemetry() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    trackClientTrace("scenarios page debug context", "debug", {
      area: "scenarios",
      page: pathname,
      runtime: "client",
    });

    trackClientTrace("scenarios page viewed", "info", {
      area: "scenarios",
      page: pathname,
      runtime: "client",
    });
  }, [pathname]);

  return null;
}
