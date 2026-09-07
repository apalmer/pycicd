import ScenarioPageContent from "@/app/components/scenario-page-content";
import { runServerErrorScenario } from "@/app/scenarios/actions";

export const dynamic = "force-dynamic";

export default async function ServerErrorPage() {
  await runServerErrorScenario();
  return <ScenarioPageContent scenarioId="server-error" />;
}
