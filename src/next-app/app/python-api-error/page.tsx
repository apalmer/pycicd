import ScenarioPageContent from "@/app/components/scenario-page-content";
import { runPythonApiErrorScenario } from "@/app/scenarios/actions";

export const dynamic = "force-dynamic";

export default async function PythonApiErrorPage() {
  const pythonApiResult = await runPythonApiErrorScenario();

  return (
    <ScenarioPageContent
      scenarioId="python-api-error"
      pythonApiResult={pythonApiResult}
    />
  );
}
