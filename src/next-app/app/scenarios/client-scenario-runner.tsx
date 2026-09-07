"use client";

import { useEffect, useRef, useState } from "react";
import {
  trackClientEvent,
  trackClientException,
  trackClientTrace,
  type TelemetryLogLevel,
} from "@/lib/application-insights-client";

type ClientScenarioId = "client-success" | "client-error";

type ClientScenarioRunnerProps = {
  scenario: ClientScenarioId;
};

function logClientLevels(
  scenario: ClientScenarioId,
  outcome: "success" | "error",
): void {
  const levels: TelemetryLogLevel[] = ["debug", "info", "warn", "error"];

  for (const level of levels) {
    trackClientTrace(`client ${scenario} ${level} log`, level, {
      scenario,
      runtime: "client",
      outcome,
      level,
    });
  }
}

export default function ClientScenarioRunner({
  scenario,
}: ClientScenarioRunnerProps) {
  const [completedAt, setCompletedAt] = useState<string | null>(null);
  const [errorToThrow, setErrorToThrow] = useState<Error | null>(null);
  const hasRunRef = useRef(false);

  if (errorToThrow) {
    throw errorToThrow;
  }

  const isErrorScenario = scenario === "client-error";
  const outcome = isErrorScenario ? "error" : "success";

  useEffect(() => {
    if (hasRunRef.current) {
      return;
    }

    hasRunRef.current = true;
    logClientLevels(scenario, outcome);
    trackClientEvent("scenario-run", {
      scenario,
      runtime: "client",
      outcome,
    });

    if (isErrorScenario) {
      const error = new Error("Intentional client-side scenario error");
      trackClientException(error, "client-error-scenario-runner");
      setErrorToThrow(error);
      return;
    }

    setCompletedAt(new Date().toISOString());
  }, [isErrorScenario, outcome, scenario]);

  return (
    <>
      <p className="mt-3 text-xs text-zinc-500">Scenario launched on route load.</p>
      {completedAt ? (
        <p className="mt-3 text-xs text-zinc-500">Last run: {completedAt}</p>
      ) : null}
    </>
  );
}
