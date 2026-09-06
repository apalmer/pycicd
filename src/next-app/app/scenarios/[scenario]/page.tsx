import Link from "next/link";
import { notFound } from "next/navigation";
import {
  runServerErrorScenario,
  runServerSuccessScenario,
} from "@/app/scenarios/actions";
import ClientScenarioRunner from "@/app/scenarios/client-scenario-runner";
import {
  getScenarioBySlug,
  type ScenarioDefinition,
} from "@/app/scenarios/scenario-definitions";

type ScenarioPageProps = {
  params: Promise<{
    scenario: string;
  }>;
};

function renderServerAction(definition: ScenarioDefinition) {
  const action =
    definition.id === "server-success"
      ? runServerSuccessScenario
      : runServerErrorScenario;

  const buttonClass =
    definition.outcome === "error"
      ? "mt-5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white"
      : "mt-5 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white";

  return (
    <form action={action}>
      <button className={buttonClass} type="submit">
        {definition.buttonLabel}
      </button>
    </form>
  );
}

function renderClientAction(definition: ScenarioDefinition) {
  if (definition.id !== "client-success" && definition.id !== "client-error") {
    return null;
  }

  return (
    <ClientScenarioRunner
      buttonLabel={definition.buttonLabel}
      scenario={definition.id}
    />
  );
}

export default async function ScenarioPage({ params }: ScenarioPageProps) {
  const { scenario: scenarioSlug } = await params;
  const scenario = getScenarioBySlug(scenarioSlug);

  if (!scenario) {
    notFound();
  }

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 px-6 py-10">
      <main className="w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-zinc-900">{scenario.title}</h1>
        <p className="mt-3 text-sm text-zinc-600">{scenario.description}</p>
        {scenario.runtime === "server"
          ? renderServerAction(scenario)
          : renderClientAction(scenario)}
        <Link
          className="mt-5 inline-flex text-sm font-medium text-zinc-700 underline underline-offset-4"
          href="/scenarios"
        >
          Back to scenarios overview
        </Link>
      </main>
    </div>
  );
}
