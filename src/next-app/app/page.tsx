import Link from "next/link";
import { scenarioDefinitions } from "@/app/scenarios/scenario-definitions";

export default function Home() {
  const totalRoutes = scenarioDefinitions.length + 1;

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 px-6 py-10">
      <main className="w-full max-w-4xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-zinc-900">
          Application Insights Route Scenarios
        </h1>
        <p className="mt-3 text-sm text-zinc-600">
          This app exposes {totalRoutes} routes: home plus {scenarioDefinitions.length}
          scenario routes. Visiting any route logs debug and info telemetry.
        </p>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {scenarioDefinitions.map((scenario) => (
            <Link
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-colors hover:bg-zinc-100"
              href={`/${scenario.slug}`}
              key={scenario.id}
            >
              <h2 className="text-lg font-semibold text-zinc-900">
                {scenario.title}
              </h2>
              <p className="mt-2 text-sm text-zinc-600">{scenario.description}</p>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
