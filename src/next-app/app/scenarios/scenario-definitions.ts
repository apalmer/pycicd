export type ScenarioId =
  | "server-success"
  | "server-error"
  | "client-success"
  | "client-error"
  | "python-api-success"
  | "python-api-error";

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
      "Server route with success behavior and server-side action execution.",
    runtime: "server",
    outcome: "success",
    buttonLabel: "Run Server Success Scenario",
  },
  {
    id: "server-error",
    slug: "server-error",
    title: "Server-Side Error",
    description:
      "Server route that intentionally throws an error through a server action.",
    runtime: "server",
    outcome: "error",
    buttonLabel: "Run Server Error Scenario",
  },
  {
    id: "client-success",
    slug: "client-success",
    title: "Client-Side Success",
    description:
      "Client route with success behavior and client-side scenario execution.",
    runtime: "client",
    outcome: "success",
    buttonLabel: "Run Client Success Scenario",
  },
  {
    id: "client-error",
    slug: "client-error",
    title: "Client-Side Error",
    description:
      "Client route that intentionally throws an error from the browser.",
    runtime: "client",
    outcome: "error",
    buttonLabel: "Run Client Error Scenario",
  },
  {
    id: "python-api-success",
    slug: "python-api-success",
    title: "Python API Success",
    description:
      "Server route that calls a Django REST endpoint and renders its JSON payload.",
    runtime: "server",
    outcome: "success",
    buttonLabel: "Run Python API Success Scenario",
  },
  {
    id: "python-api-error",
    slug: "python-api-error",
    title: "Python API Error",
    description:
      "Server route that calls an intentionally failing Django REST endpoint.",
    runtime: "server",
    outcome: "error",
    buttonLabel: "Run Python API Error Scenario",
  },
];

export function getScenarioBySlug(slug: string): ScenarioDefinition | undefined {
  return scenarioDefinitions.find((item) => item.slug === slug);
}
