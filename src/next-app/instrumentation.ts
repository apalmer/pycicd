export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  const { startApplicationInsights } = await import(
    "@/lib/application-insights-server"
  );
  startApplicationInsights();
}