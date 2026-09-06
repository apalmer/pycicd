import appInsights from "applicationinsights";

const connectionString =
  process.env.APPLICATIONINSIGHTS_CONNECTION_STRING ??
  process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING;

let initialized = false;

export type TelemetryLogLevel = "debug" | "info" | "warn" | "error";

const severityByLevel: Record<TelemetryLogLevel, string> = {
  debug: "Verbose",
  info: "Information",
  warn: "Warning",
  error: "Error",
};

export function startApplicationInsights(): boolean {
  if (initialized || !connectionString) {
    return false;
  }

  appInsights
    .setup(connectionString)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoDependencyCorrelation(true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(false)
    .setInternalLogging(false, false)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
    .start();

  appInsights.defaultClient.context.tags[
    appInsights.defaultClient.context.keys.cloudRole
  ] = process.env.APPLICATIONINSIGHTS_ROLE_NAME ?? "next-app-server";

  initialized = true;
  return true;
}

export function trackServerException(
  error: unknown,
  properties?: Record<string, string>,
): void {
  if (!initialized) {
    return;
  }

  const normalizedError =
    error instanceof Error ? error : new Error(String(error));

  appInsights.defaultClient.trackException({
    exception: normalizedError,
    properties,
  });
}

export function trackServerTrace(
  message: string,
  level: TelemetryLogLevel,
  properties?: Record<string, string>,
): void {
  if (!initialized) {
    return;
  }

  appInsights.defaultClient.trackTrace({
    message,
    severity: severityByLevel[level],
    properties,
  });
}

export function trackServerEvent(
  name: string,
  properties?: Record<string, string>,
): void {
  if (!initialized) {
    return;
  }

  appInsights.defaultClient.trackEvent({
    name,
    properties,
  });
}