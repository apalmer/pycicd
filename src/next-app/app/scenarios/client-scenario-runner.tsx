"use client";

import { useState } from "react";
import {
  trackClientEvent,
  trackClientTrace,
  type TelemetryLogLevel,
} from "@/lib/application-insights-client";

type ClientScenarioId = "client-success" | "client-error";

type ClientScenarioRunnerProps = {
  scenario: ClientScenarioId;
  buttonLabel: string;
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
  buttonLabel,
}: ClientScenarioRunnerProps) {
  const [completedAt, setCompletedAt] = useState<string | null>(null);
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("Intentional client-side scenario error");
  }

  const isErrorScenario = scenario === "client-error";
  const outcome = isErrorScenario ? "error" : "success";

  const onRun = () => {
    logClientLevels(scenario, outcome);
    trackClientEvent("scenario-run", {
      scenario,
      runtime: "client",
      outcome,
    });

    if (isErrorScenario) {
      setShouldThrow(true);
      return;
    }

    setCompletedAt(new Date().toISOString());
  };

  return (
    <>
      <button
        className={
          isErrorScenario
            ? "mt-5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white"
            : "mt-5 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
        }
        onClick={onRun}
        type="button"
      >
        {buttonLabel}
      </button>
      {completedAt ? (
        <p className="mt-3 text-xs text-zinc-500">Last run: {completedAt}</p>
      ) : null}
    </>
  );
}
