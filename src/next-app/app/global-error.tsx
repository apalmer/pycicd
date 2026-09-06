"use client";

import { useEffect } from "react";
import { trackClientException } from "@/lib/application-insights-client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    trackClientException(error, "global-error-boundary");
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 p-6 text-zinc-950">
        <main className="mx-auto mt-24 max-w-xl rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-3 text-sm text-zinc-600">
            The issue has been logged to Application Insights.
          </p>
          {error.digest ? (
            <p className="mt-2 text-xs text-zinc-500">Error ID: {error.digest}</p>
          ) : null}
          <button
            className="mt-6 rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white"
            onClick={() => reset()}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}