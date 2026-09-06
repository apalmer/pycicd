"use server";

import {
  trackServerEvent,
  trackServerException,
  trackServerTrace,
  type TelemetryLogLevel,
} from "@/lib/application-insights-server";

function logServerLevels(
  scenario: string,
  outcome: "success" | "error",
): void {
  const levels: TelemetryLogLevel[] = ["debug", "info", "warn", "error"];

  for (const level of levels) {
    trackServerTrace(`server ${scenario} ${level} log`, level, {
      scenario,
      runtime: "server",
      outcome,
      level,
    });
  }
}

export async function runServerSuccessScenario(): Promise<void> {
  const scenario = "server-success";
  logServerLevels(scenario, "success");
  trackServerEvent("scenario-run", {
    scenario,
    runtime: "server",
    outcome: "success",
  });
}

export async function runServerErrorScenario(): Promise<void> {
  const scenario = "server-error";

  try {
    logServerLevels(scenario, "error");
    trackServerEvent("scenario-run", {
      scenario,
      runtime: "server",
      outcome: "error",
    });

    throw new Error("Intentional server-side scenario error");
  } catch (error) {
    trackServerException(error, {
      scenario,
      runtime: "server",
      outcome: "error",
      handledAt: "runServerErrorScenario",
    });
    throw error;
  }
}
