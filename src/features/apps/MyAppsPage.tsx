"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { routes } from "@/config/routes";
import { AppsShell, SeeAllLink } from "./AppsChrome";
import { AppCard } from "./AppsPage";
import { appsBase, sections } from "./data";

const links: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Manage users",
    href: "/corporate/account/users",
    icon: (
      <>
        <circle cx="6" cy="5.5" r="2.6" />
        <path d="M1.5 14c0-2.7 2-4.6 4.5-4.6s4.5 1.9 4.5 4.6" />
        <path d="M10.5 3.2a2.4 2.4 0 0 1 0 4.6M12.4 9.8c1.3.6 2.1 2.1 2.1 4" />
      </>
    ),
  },
  {
    label: "Knowledge base",
    href: routes.kb,
    icon: (
      <>
        <path d="M1.5 3h4.2c1.2 0 2.3 1 2.3 2.2V14c0-1-.9-1.8-2-1.8H1.5z" />
        <path d="M14.5 3h-4.2C9.1 3 8 4 8 5.2V14c0-1 .9-1.8 2-1.8h4.5z" />
        <path d="M3.5 6h2.3M3.5 8.5h2.3M10.2 6h2.3M10.2 8.5h2.3" />
      </>
    ),
  },
  {
    label: "Contact us",
    href: "/company/contacts",
    icon: (
      <>
        <path d="M2 2.5h12v8.5H6.5L3.2 13.8V11H2z" />
        <path d="M8 4.6v2.6M8 8.9v.1" />
      </>
    ),
  },
];

function BellJar() {
  return (
    <svg viewBox="0 0 80 90" width={80} height={90} aria-hidden>
      <circle cx="39" cy="53" r="36" fill="#dedee6" />
      <circle cx="40" cy="10.5" r="3" fill="none" stroke="#1b1e1a" strokeWidth={1.2} />
      <path d="M22 50V31a18 18 0 0 1 36 0v19" fill="#f2f3f7" fillOpacity={0.75} stroke="#1b1e1a" strokeWidth={1.1} />
      <path d="M49 20c3 2 4.5 5 5 9" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
      <ellipse cx="40" cy="50" rx="18" ry="3.2" fill="none" stroke="#1b1e1a" strokeWidth={0.9} strokeDasharray="3 2" />
      <path d="M16 50h48v5.5c0 2.6-2.4 4.5-5 4.5H21c-2.6 0-5-1.9-5-4.5z" fill="#1b1e1a" />
      <path d="M14 57c-3 4 0 8 5 9l27 5 26 14 5-9-19-10-8-3" fill="#1b1e1a" />
      <path d="M20 62h18M22 66h14" stroke="#fff" strokeWidth={1.2} strokeLinecap="round" />
    </svg>
  );
}

export function MyAppsPage() {
  const popular = sections[0];
  return (
    <AppsShell>
      <div className="bg-white px-8 pt-[39px] pb-[110px]">
        <h1 className="text-[36px] leading-[44px] font-bold tracking-[-0.01em] text-rk-text">My Apps</h1>
        <div className="mt-[12px] flex items-center justify-between">
          <p className="text-[16px] leading-6 text-rk-text">Manage subscriptions and trials of only your apps.</p>
          <div className="flex items-center gap-4">
            {links.map((l) => (
              <Link key={l.label} href={l.href} className="flex items-center gap-[5px] text-[14px] leading-5 text-rk-link hover:text-rk-link-hover">
                <svg viewBox="0 0 16 16" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  {l.icon}
                </svg>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <section className="mt-[32px] flex h-[224px] flex-col items-center rounded-xl bg-rk-bg pt-[22px]">
          <BellJar />
          <div className="mt-[13px] text-[16px] leading-6 font-semibold text-rk-text">No active apps yet</div>
          <Link href={appsBase} className="mt-[12px] flex h-[30px] items-center gap-2 rounded-md bg-rk-btn-dark pr-2 pl-[10px] text-[14px] font-medium text-white hover:bg-[#2b2e38]">
            <svg viewBox="0 0 16 16" width={14} height={14}>
              <path d="M8 3v10M3 8h10" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
            </svg>
            Get apps
          </Link>
        </section>
        <div className="mt-[59px] flex items-end justify-between">
          <h2 className="text-[24px] leading-8 font-semibold tracking-[-0.01em] text-rk-text">{popular.title}</h2>
          <SeeAllLink href={appsBase} />
        </div>
        <div className="mt-[15px] grid grid-cols-3 gap-4">
          {popular.apps.map((app) => (
            <AppCard key={app.name} app={app} />
          ))}
        </div>
      </div>
    </AppsShell>
  );
}
