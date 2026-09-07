"use server";

import {
  trackServerEvent,
  trackServerException,
  trackServerTrace,
  type TelemetryLogLevel,
} from "@/lib/application-insights-server";

export type PythonApiCallResult = {
  ok: boolean;
  status: number;
  url: string;
  payload?: unknown;
  errorBody?: string;
  errorMessage?: string;
};

function getPythonApiBaseUrl(): string {
  const configuredBaseUrl =
    process.env.PYTHON_API_BASE_URL ??
    process.env.NEXT_PUBLIC_PYTHON_API_BASE_URL ??
    "http://127.0.0.1:8000/api";

  return configuredBaseUrl.replace(/\/+$/, "");
}

async function callPythonApi(
  path: string,
  scenario: "python-api-success" | "python-api-error",
  expectedOutcome: "success" | "error",
): Promise<PythonApiCallResult> {
  const url = `${getPythonApiBaseUrl()}${path}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const rawBody = await response.text();
    let parsedPayload: unknown;

    if (rawBody) {
      try {
        parsedPayload = JSON.parse(rawBody);
      } catch {
        parsedPayload = undefined;
      }
    }

    const isOk = response.ok;
    const outcome = isOk ? "success" : "error";

    trackServerEvent("scenario-run", {
      scenario,
      runtime: "server",
      outcome,
      upstreamStatus: String(response.status),
      expectedOutcome,
    });

    trackServerTrace(`python api ${scenario} status ${response.status}`, "info", {
      scenario,
      runtime: "server",
      outcome,
      expectedOutcome,
      upstreamStatus: String(response.status),
      url,
    });

    if (isOk) {
      return {
        ok: true,
        status: response.status,
        url,
        payload: parsedPayload,
      };
    }

    const errorBody = rawBody ? rawBody.slice(0, 1000) : undefined;

    return {
      ok: false,
      status: response.status,
      url,
      payload: parsedPayload,
      errorBody,
      errorMessage: `Python API request failed with status ${response.status}`,
    };
  } catch (error) {
    trackServerException(error, {
      scenario,
      runtime: "server",
      outcome: "error",
      expectedOutcome,
      handledAt: "callPythonApi",
      url,
    });

    return {
      ok: false,
      status: 0,
      url,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }
}

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

export async function runPythonApiSuccessScenario(): Promise<PythonApiCallResult> {
  logServerLevels("python-api-success", "success");
  return callPythonApi("/scenario-success/", "python-api-success", "success");
}

export async function runPythonApiErrorScenario(): Promise<PythonApiCallResult> {
  logServerLevels("python-api-error", "error");
  return callPythonApi("/scenario-error/", "python-api-error", "error");
}
