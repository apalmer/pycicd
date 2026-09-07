import ClientScenarioRunner from "@/app/scenarios/client-scenario-runner";
import {
  getScenarioBySlug,
  type ScenarioId,
} from "@/app/scenarios/scenario-definitions";
import type { PythonApiCallResult } from "@/app/scenarios/actions";

type ScenarioPageContentProps = {
  scenarioId: ScenarioId;
  pythonApiResult?: PythonApiCallResult;
};

export default function ScenarioPageContent({
  scenarioId,
  pythonApiResult,
}: ScenarioPageContentProps) {
  const scenario = getScenarioBySlug(scenarioId);

  if (!scenario) {
    return null;
  }

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 px-6 py-10">
      <main className="w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-zinc-900">{scenario.title}</h1>
        <p className="mt-3 text-sm text-zinc-600">{scenario.description}</p>
        <p className="mt-2 text-xs text-zinc-500">
          Visiting this route emits debug/info logs. Error scenarios also emit
          warning and error route logs.
        </p>
        <p className="mt-4 text-sm text-zinc-700">
          Scenario execution starts automatically when this page loads.
        </p>
        {scenario.runtime === "client" &&
        (scenario.id === "client-success" || scenario.id === "client-error") ? (
          <ClientScenarioRunner scenario={scenario.id} />
        ) : null}

        {pythonApiResult ? (
          <section className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
            <h2 className="text-sm font-semibold text-zinc-900">Python API Result</h2>
            <p className="mt-2 text-xs text-zinc-600">URL: {pythonApiResult.url}</p>
            <p className="mt-1 text-xs text-zinc-600">
              HTTP status: {pythonApiResult.status}
            </p>
            <p
              className={`mt-1 text-xs font-medium ${
                pythonApiResult.ok ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              Request outcome: {pythonApiResult.ok ? "success" : "error"}
            </p>
            {pythonApiResult.errorMessage ? (
              <p className="mt-2 text-xs text-rose-700">{pythonApiResult.errorMessage}</p>
            ) : null}
            {pythonApiResult.payload ? (
              <pre className="mt-3 overflow-x-auto rounded-md border border-zinc-200 bg-white p-3 text-xs text-zinc-800">
                {JSON.stringify(pythonApiResult.payload, null, 2)}
              </pre>
            ) : null}
            {!pythonApiResult.payload && pythonApiResult.errorBody ? (
              <pre className="mt-3 overflow-x-auto rounded-md border border-zinc-200 bg-white p-3 text-xs text-zinc-800">
                {pythonApiResult.errorBody}
              </pre>
            ) : null}
          </section>
        ) : null}
      </main>
    </div>
  );
}
