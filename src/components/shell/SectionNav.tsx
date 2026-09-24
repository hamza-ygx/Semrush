"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { seoNav, type NavItem } from "@/config/routes";

function isActive(item: NavItem, path: string) {
  if (item.href === path) return true;
  return (item.match ?? []).some((m) => path === m || path.startsWith(m + "/"));
}

export function SectionNav({ title = "SEO" }: { title?: string }) {
  const path = usePathname();
  return (
    <aside className="h-full w-[212px] shrink-0 overflow-y-auto [scrollbar-gutter:stable] border-r border-rk-border bg-rk-bg pb-4">
      <div className="px-[19px] pt-[16px] pb-2 text-[14px] leading-5 font-semibold">{title}</div>
      {seoNav.map((g, gi) => (
        <div key={gi} className={g.heading ? "mt-[18px]" : ""}>
          {g.heading && <div className="mb-2 px-[19px] text-[13px] leading-[18px] text-rk-muted">{g.heading}</div>}
          {g.items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`mx-[6px] block rounded-md px-[13px] py-1 text-[14px] leading-5 text-rk-text ${
                isActive(it, path) ? "bg-rk-hover" : "hover:bg-rk-hover"
              }`}
            >
              {it.label}
            </Link>
          ))}
        </div>
      ))}
    </aside>
  );
}
