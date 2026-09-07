"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackClientEvent, trackClientTrace } from "@/lib/application-insights-client";

type RouteTelemetryConfig = {
  scenario:
    | "home"
    | "server-success"
    | "server-error"
    | "client-success"
    | "client-error"
    | "python-api-success"
    | "python-api-error";
  runtime: "n/a" | "server" | "client";
  outcome: "neutral" | "success" | "error";
};

const telemetryByPath: Record<string, RouteTelemetryConfig> = {
  "/": {
    scenario: "home",
    runtime: "n/a",
    outcome: "neutral",
  },
  "/server-success": {
    scenario: "server-success",
    runtime: "server",
    outcome: "success",
  },
  "/server-error": {
    scenario: "server-error",
    runtime: "server",
    outcome: "error",
  },
  "/client-success": {
    scenario: "client-success",
    runtime: "client",
    outcome: "success",
  },
  "/client-error": {
    scenario: "client-error",
    runtime: "client",
    outcome: "error",
  },
  "/python-api-success": {
    scenario: "python-api-success",
    runtime: "server",
    outcome: "success",
  },
  "/python-api-error": {
    scenario: "python-api-error",
    runtime: "server",
    outcome: "error",
  },
};

export default function RouteTelemetry() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const config = telemetryByPath[pathname];
    if (!config) {
      return;
    }

    const baseProperties: Record<string, string> = {
      route: pathname,
      scenario: config.scenario,
      runtime: config.runtime,
      outcome: config.outcome,
    };

    trackClientTrace("route debug context", "debug", baseProperties);
    trackClientTrace("route viewed", "info", baseProperties);

    if (config.scenario !== "home") {
      trackClientEvent("scenario-route-visited", baseProperties);
      if (config.outcome === "error") {
        trackClientTrace("error scenario route warning", "warn", baseProperties);
        trackClientTrace("error scenario route entered", "error", baseProperties);
      } else {
        trackClientTrace("success scenario route context", "info", baseProperties);
      }
    }
  }, [pathname]);

  return null;
}
