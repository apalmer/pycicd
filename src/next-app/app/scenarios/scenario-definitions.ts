export type ScenarioId =
  | "server-success"
  | "server-error"
  | "client-success"
  | "client-error";

export type ScenarioRuntime = "server" | "client";
export type ScenarioOutcome = "success" | "error";

export type ScenarioDefinition = {
  id: ScenarioId;
  slug: ScenarioId;
  title: string;
  description: string;
  runtime: ScenarioRuntime;
  outcome: ScenarioOutcome;
  buttonLabel: string;
};

export const scenarioDefinitions: ScenarioDefinition[] = [
  {
    id: "server-success",
    slug: "server-success",
    title: "Server-Side Success",
    description:
      "Runs a server action, emits debug/info/warn/error telemetry, and returns normally.",
    runtime: "server",
    outcome: "success",
    buttonLabel: "Run Server Success Scenario",
  },
  {
    id: "server-error",
    slug: "server-error",
    title: "Server-Side Error",
    description:
      "Runs a server action, emits telemetry, tracks an exception, and throws intentionally.",
    runtime: "server",
    outcome: "error",
    buttonLabel: "Run Server Error Scenario",
  },
  {
    id: "client-success",
    slug: "client-success",
    title: "Client-Side Success",
    description:
      "Runs in the browser, emits debug/info/warn/error telemetry, and completes successfully.",
    runtime: "client",
    outcome: "success",
    buttonLabel: "Run Client Success Scenario",
  },
  {
    id: "client-error",
    slug: "client-error",
    title: "Client-Side Error",
    description:
      "Runs in the browser, emits telemetry, then throws an intentional client error.",
    runtime: "client",
    outcome: "error",
    buttonLabel: "Run Client Error Scenario",
  },
];

export function getScenarioBySlug(slug: string): ScenarioDefinition | undefined {
  return scenarioDefinitions.find((item) => item.slug === slug);
}

export const scenariosNavLinks = [
  {
    href: "/scenarios",
    label: "Overview",
  },
  ...scenarioDefinitions.map((item) => ({
    href: `/scenarios/${item.slug}`,
    label: item.title,
  })),
];
