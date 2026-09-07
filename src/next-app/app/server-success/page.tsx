import ScenarioPageContent from "@/app/components/scenario-page-content";
import { runServerSuccessScenario } from "@/app/scenarios/actions";

export const dynamic = "force-dynamic";

export default async function ServerSuccessPage() {
  await runServerSuccessScenario();
  return <ScenarioPageContent scenarioId="server-success" />;
}
