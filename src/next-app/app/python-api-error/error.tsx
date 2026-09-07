"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  trackClientException,
  trackClientTrace,
} from "@/lib/application-insights-client";

type PythonApiErrorRouteBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function PythonApiErrorRouteBoundary({
  error,
  reset,
}: PythonApiErrorRouteBoundaryProps) {
  useEffect(() => {
    trackClientException(error, "python-api-error-route-boundary");
    trackClientTrace("python-api-error route fallback rendered", "warn", {
      route: "/python-api-error",
      scenario: "python-api-error",
      runtime: "server",
      outcome: "error",
    });
  }, [error]);

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 px-6 py-10">
      <main className="w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-zinc-900">Python API Error Scenario</h1>
        <p className="mt-3 text-sm text-zinc-600">
          The Python scenario failed, but the app remains usable so you can continue navigating scenarios.
        </p>
        {error.digest ? (
          <p className="mt-2 text-xs text-zinc-500">Error ID: {error.digest}</p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white"
            onClick={() => reset()}
            type="button"
          >
            Retry Scenario
          </button>
          <Link
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-800"
            href="/"
          >
            Go Home
          </Link>
          <Link
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-800"
            href="/python-api-success"
          >
            Open Python API Success
          </Link>
        </div>
      </main>
    </div>
  );
}
