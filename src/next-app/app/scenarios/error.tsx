"use client";

import { useEffect } from "react";
import Link from "next/link";
import { trackClientException } from "@/lib/application-insights-client";

type ScenariosErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ScenariosError({ error, reset }: ScenariosErrorProps) {
  useEffect(() => {
    trackClientException(error, "scenarios-error-boundary");
  }, [error]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6">
      <main className="w-full rounded-xl border border-red-200 bg-red-50 p-6 text-red-950 shadow-sm">
        <h1 className="text-2xl font-semibold">Scenario failed as expected</h1>
        <p className="mt-2 text-sm text-red-900">
          The error was captured by the /scenarios error boundary and logged.
        </p>
        {error.digest ? (
          <p className="mt-2 text-xs text-red-800">Error ID: {error.digest}</p>
        ) : null}
        <button
          className="mt-5 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white"
          onClick={() => reset()}
          type="button"
        >
          Reset scenarios page
        </button>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <Link className="underline underline-offset-4" href="/scenarios">
            Back to scenarios
          </Link>
          <Link className="underline underline-offset-4" href="/">
            Go to home
          </Link>
        </div>
      </main>
    </div>
  );
}
