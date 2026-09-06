import ScenariosNav from "@/app/scenarios/scenarios-nav";
import ScenariosRouteTelemetry from "@/app/scenarios/scenarios-route-telemetry";

export default function ScenariosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-1 flex-col">
      <ScenariosRouteTelemetry />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <ScenariosNav />
      </div>
      {children}
    </div>
  );
}
