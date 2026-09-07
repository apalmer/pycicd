"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { scenarioDefinitions } from "@/app/scenarios/scenario-definitions";

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
  const navItems = [
    {
      href: "/",
      label: "Home",
    },
    ...scenarioDefinitions.map((scenario) => ({
      href: `/${scenario.slug}`,
      label: scenario.title,
    })),
  ];

  return (
    <header className="border-b border-zinc-200 bg-white/90 px-6 py-4 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
        <Link className="text-sm font-semibold text-zinc-900" href="/">
          Next App
        </Link>
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link className={navClass(isActive)} href={item.href} key={item.href}>
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}