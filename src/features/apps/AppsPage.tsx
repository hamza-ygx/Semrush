"use client";

import Link from "next/link";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { AppShell } from "@/components/shell/AppShell";
import { routes } from "@/config/routes";
import { AppLogo } from "./AppLogo";
import { apps, filters, sections, type App, type Filter, type Section } from "./data";

export function AppCard({ app }: { app: App }) {
  const badge = app.toolkit ? null : app.badge === undefined ? "Free trial" : app.badge;
  const body = (
    <>
      <div className="flex items-center gap-[14px]">
        <AppLogo logo={app.logo} />
        <span className="truncate text-[14px] leading-5 font-medium text-rk-text">{app.name}</span>
      </div>
      <p className="mt-[7px] line-clamp-3 h-[60px] text-[14px] leading-5 text-rk-text-2">{app.description}</p>
      <div className="mt-5 flex h-[27px] items-center justify-between">
        {badge ? <span className="flex h-[27px] items-center rounded-full bg-[#c7f3e6] px-[9px] text-[14px] text-[#007c65]">{badge}</span> : <span />}
        <span className={`text-[14px] leading-5 ${app.toolkit ? "font-medium text-rk-text-2" : "text-[#6c6e79]"}`}>{app.toolkit ? "Learn more" : app.price}</span>
      </div>
    </>
  );
  const cls = "block h-[184px] rounded-xl border border-rk-border bg-white px-5 pt-4 pb-4 transition-shadow hover:shadow-[0_2px_12px_rgba(25,27,35,0.12)]";
  return app.href ? (
    <Link href={app.href} className={cls}>
      {body}
    </Link>
  ) : (
    <button type="button" className={`${cls} w-full text-left`}>
      {body}
    </button>
  );
}

function AppSection({ section, onSeeAll }: { section: Section; onSeeAll?: () => void }) {
  return (
    <section className={`rounded-xl px-5 pt-4 pb-8 ${section.gray ? "bg-rk-bg" : "mt-[10px] mb-[2px]"}`}>
      <div className="flex items-end justify-between gap-6">
        <h2 className="text-[24px] leading-8 font-semibold tracking-[-0.01em] text-rk-text">{section.title}</h2>
        {onSeeAll && (
          <button type="button" onClick={onSeeAll} className="mb-[-3px] flex shrink-0 items-center gap-1 text-[14px] leading-5 text-rk-link hover:text-rk-link-hover">
            See all
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="M2.5 8h10.5M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
      <div className="mt-[19px] grid grid-cols-3 gap-x-4 gap-y-4">
        {section.apps.map((app, i) => (
          <AppCard key={`${app.name}-${i}`} app={app} />
        ))}
      </div>
    </section>
  );
}

export function AppsPage() {
  const [filter, setFilter] = useState<Filter | "All">("Store");
  const all = Object.values(apps);
  const matching = filter === "All" ? all : all.filter((a) => a.tags.includes(filter));
  const pick = (f: Filter | "All") => {
    setFilter(f);
    window.scrollTo({ top: 0 });
  };
  return (
    <AppShell
      section="apps"
      footer={false}
      help="none"
      search={{
        kind: "analyze",
        value: "",
        placeholder: "Enter website or keyword",
        inputClassName: "w-[342px] xl:w-[480px] xl:text-[14px]",
        action: routes.domainOverview,
      }}
    >
      <div className="bg-white px-8 pt-[41px] pb-[110px]">
        <h1 className="text-[36px] leading-[44px] font-bold tracking-[-0.01em] text-rk-text">Find the best solution for your marketing task</h1>
        <div className="mt-[34px] flex flex-wrap gap-x-[13px] gap-y-3">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => pick(f)}
              className={`h-8 rounded-full px-[15px] text-[14px] leading-5 ${f === filter ? "bg-[#a063fe] text-white" : "bg-[#f0f2f2] text-rk-text hover:bg-rk-hover"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="mt-[33px]">
          {filter === "Store" ? (
            sections.map((s) => <AppSection key={s.title} section={s} onSeeAll={() => pick(s.filter === "Store" ? "All" : (s.filter as Filter))} />)
          ) : matching.length ? (
            <AppSection section={{ title: `${filter} Apps`, filter, gray: true, apps: matching }} />
          ) : (
            <div className="rounded-xl bg-rk-bg px-5 py-16 text-center text-[16px] leading-6 text-rk-muted">No apps in this category yet.</div>
          )}
        </div>
      </div>
      <div className="border-t border-rk-border pt-10">
        <Footer compactPb={37} />
      </div>
    </AppShell>
  );
}
