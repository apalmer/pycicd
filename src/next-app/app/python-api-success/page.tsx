import ScenarioPageContent from "@/app/components/scenario-page-content";
import { runPythonApiSuccessScenario } from "@/app/scenarios/actions";

export const dynamic = "force-dynamic";

export default async function PythonApiSuccessPage() {
  const pythonApiResult = await runPythonApiSuccessScenario();

  return (
    <ScenarioPageContent
      scenarioId="python-api-success"
      pythonApiResult={pythonApiResult}
    />
  );
}
