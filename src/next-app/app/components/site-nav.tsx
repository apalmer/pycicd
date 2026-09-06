"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function navClass(isActive: boolean): string {
  const base =
    "rounded-full px-4 py-2 text-sm font-medium transition-colors border";
  if (isActive) {
    return `${base} border-zinc-900 bg-zinc-900 text-white`;
  }

  return `${base} border-zinc-300 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100`;
}

export default function SiteNav() {
  const pathname = usePathname();

  const inScenarios = pathname?.startsWith("/scenarios") ?? false;
  const onHome = pathname === "/";

  return (
    <header className="border-b border-zinc-200 bg-white/90 px-6 py-4 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
        <Link className="text-sm font-semibold text-zinc-900" href="/">
          Next App
        </Link>
        <div className="flex items-center gap-2">
          <Link className={navClass(onHome)} href="/">
            Home
          </Link>
          <Link className={navClass(inScenarios)} href="/scenarios">
            Scenarios
          </Link>
        </div>
      </nav>
    </header>
  );
}