"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { scenariosNavLinks } from "@/app/scenarios/scenario-definitions";

function linkClass(isActive: boolean): string {
  if (isActive) {
    return "rounded-full border border-zinc-900 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white";
  }

  return "rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100";
}

export default function ScenariosNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Scenarios navigation" className="mt-4 flex flex-wrap gap-2">
      {scenariosNavLinks.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link className={linkClass(isActive)} href={item.href} key={item.href}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
