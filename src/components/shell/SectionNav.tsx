"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavBadge, navHeading } from "./navExtras";
import { brand } from "@/config/brand";
import { sectionNavs, type NavItem } from "@/config/routes";

export function isActive(item: NavItem, path: string) {
  if (item.href === path) return true;
  return (item.match ?? []).some((m) => path === m || path.startsWith(m + "/"));
}

export function SectionNav({ section = "seo" }: { section?: string }) {
  const path = usePathname();
  const nav = sectionNavs[section];
  if (!nav) return null;
  return (
    <aside data-testid="section-nav" className="h-full w-[212px] shrink-0 overflow-y-auto border-r border-rk-border bg-rk-bg pb-[calc(20*var(--u))]">
      <div className="px-[19px] pt-[calc(16*var(--u))] pb-[calc(9*var(--u))] text-[14px] leading-5 font-semibold">{nav.title}</div>
      {nav.groups.map((g, gi) => (
        <div key={gi} className={g.heading ? (gi > 0 ? "mt-[calc(18*var(--u))]" : "mt-[calc(5*var(--u))]") : gi > 0 ? "mt-[calc(12*var(--u))]" : ""}>
          {g.heading && <div className="mb-[calc(8*var(--u))] px-[19px] text-[13px] leading-[18px] text-rk-muted">{navHeading(g.heading)}</div>}
          {g.items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              title={it.label.includes(brand.name) ? it.label : undefined}
              className={`mx-[6px] block rounded-md ${it.label.includes(brand.name) ? "truncate" : ""} px-[13px] py-[calc((28*var(--u)_-_20px)/2)] text-[14px] leading-5 text-rk-text ${
                isActive(it, path) ? "bg-rk-hover" : "hover:bg-rk-hover"
              }`}
            >
              {it.label}
              <NavBadge href={it.href} className="align-[1px]" />
            </Link>
          ))}
        </div>
      ))}
    </aside>
  );
}
