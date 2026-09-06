import {
  ApplicationInsights,
  type ITelemetryItem,
} from "@microsoft/applicationinsights-web";

declare global {
  interface Window {
    __appInsightsInstance?: ApplicationInsights;
  }
}

const connectionString =
  process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING;
const roleName =
  process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_ROLE_NAME ?? "next-app-web";

export type TelemetryLogLevel = "debug" | "info" | "warn" | "error";

const severityByLevel: Record<TelemetryLogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function initializeApplicationInsights(): ApplicationInsights | undefined {
  if (typeof window === "undefined" || !connectionString) {
    return undefined;
  }

  if (window.__appInsightsInstance) {
    return window.__appInsightsInstance;
  }

  const instance = new ApplicationInsights({
    config: {
      connectionString,
      enableAutoRouteTracking: false,
      enableCorsCorrelation: true,
      disableAjaxTracking: false,
      disableFetchTracking: false,
    },
  });

  instance.addTelemetryInitializer((envelope: ITelemetryItem) => {
    const tags = (envelope.tags ?? {}) as Record<string, string>;
    tags["ai.cloud.role"] = roleName;
    envelope.tags = tags as unknown as ITelemetryItem["tags"];
  });

  instance.loadAppInsights();
  window.__appInsightsInstance = instance;
  return instance;
}

export const appInsights = initializeApplicationInsights();

export function trackPageView(url: string): void {
  if (!appInsights) {
    return;
  }

  appInsights.trackPageView({
    name: typeof document !== "undefined" ? document.title : url,
    uri: url,
  });
}

export function trackClientException(error: Error, handledAt: string): void {
  appInsights?.trackException({
    exception: error,
    properties: {
      handledAt,
    },
  });
}

export function trackClientTrace(
  message: string,
  level: TelemetryLogLevel,
  properties?: Record<string, string>,
): void {
  appInsights?.trackTrace({
    message,
    severityLevel: severityByLevel[level],
    properties,
  });
}

export function trackClientEvent(
  name: string,
  properties?: Record<string, string>,
): void {
  appInsights?.trackEvent({
    name,
    properties,
  });
}