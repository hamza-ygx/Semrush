"use client";

import Link from "next/link";
import { useState } from "react";
import { account, brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { LogoIcon } from "@/components/icons";
import { useOutsideClose } from "@/components/ui/Popover";
import { ChevronDown } from "@/components/ui/icons";
import { navMenus } from "./data";

const nav = ["Product", "Pricing", "Solutions", "Resources", "Enterprise"] as const;
const navHrefs: Partial<Record<(typeof nav)[number], string>> = { Pricing: routes.pricing.one, Enterprise: routes.pricing.enterprise };

function NavMenu({ label, cls }: { label: keyof typeof navMenus; cls: string }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className={cls}>
        {label}
        <ChevronDown width={13} height={13} strokeWidth={2.2} className={open ? "rotate-180" : ""} />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+14px)] left-[-16px] z-50 w-[250px] rounded-xl bg-white py-2 shadow-popover">
          {navMenus[label].map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="block px-4 py-[9px] text-[15px] leading-5 font-normal text-[#171a22] hover:bg-[#f4f4f4]">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader({ variant = "app" }: { variant?: "app" | "blog" }) {
  const blog = variant === "blog";
  return (
    <header className={`relative flex items-center justify-between bg-white ${blog ? "h-[84px] pr-[66px] pl-[45px]" : "h-[84px] pr-[66px] pl-[62px]"}`}>
      <Link href={routes.home} className="flex items-center gap-2 text-[20px] leading-6 font-bold tracking-[-0.02em] text-[#171a22]">
        <LogoIcon width={28} height={28} />
        {brand.name}
      </Link>
      <nav className={`absolute flex items-center gap-[31px] text-[17px] font-medium text-[#171a22] ${blog ? "left-[552px]" : "left-[516px]"}`}>
        {nav.map((n) => {
          const cls = "flex items-center gap-[7px] hover:text-[#6e45f5]";
          const href = navHrefs[n];
          if (!href) return <NavMenu key={n} label={n as keyof typeof navMenus} cls={cls} />;
          return (
            <Link key={n} href={href} className={cls}>
              {n}
              {n === "Enterprise" && (
                <svg viewBox="0 0 12 12" width={11} height={11}>
                  <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth={1.6} />
                </svg>
              )}
            </Link>
          );
        })}
      </nav>
      {!blog && (
        <Link href={routes.account.profile} aria-label="Profile" className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#ba96ec] text-[16px] font-medium text-[#171a22] hover:brightness-95">
          {account.initial}
        </Link>
      )}
    </header>
  );
}
