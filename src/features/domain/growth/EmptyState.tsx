import Link from "next/link";
import type { ReactNode } from "react";

export function EmptyState({ illustration, title, bullets, example, exampleHref }: { illustration: ReactNode; title: string; bullets: string[]; example: string; exampleHref: string }) {
  return (
    <section className="mt-4 flex h-[269px] gap-[41px] rounded-lg bg-white p-5 shadow-card">
      {illustration}
      <div className="pt-[-1px]">
        <h3 className="text-[16px] leading-6 font-bold">{title}</h3>
        <ul className="mt-[11px] max-w-[600px] space-y-2 text-[14px] leading-5">
          {bullets.map((b) => (
            <li key={b} className="relative pl-4 before:absolute before:top-[9px] before:left-[4px] before:h-[4px] before:w-[4px] before:rounded-full before:bg-rk-muted">
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-[15px] text-[14px] leading-5">
          <b className="font-semibold">Examples:</b>
          <Link href={exampleHref} className="ml-[8px] text-rk-link hover:text-rk-link-hover">
            {example}
          </Link>
        </div>
      </div>
    </section>
  );
}
