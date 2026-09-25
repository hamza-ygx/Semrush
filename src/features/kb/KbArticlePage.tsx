"use client";

import Link from "next/link";
import { useState } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { LogoIcon } from "@/components/icons";
import { HelpButtonAndPanel } from "@/components/shell/HelpPanel";
import { ChevronDown, ChevronRight } from "@/components/ui/icons";
import { kbArticles, kbHref, kbNav, type KbArticle } from "./data";

const nav = ["Product", "Pricing", "Solutions", "Resources", "Enterprise"] as const;
const navHrefs: Partial<Record<(typeof nav)[number], string>> = { Pricing: routes.pricing.one, Enterprise: routes.pricing.enterprise };
const muted = "text-[#7d8290]";

function SiteHeader() {
  return (
    <header className="relative flex h-[84px] items-center justify-between bg-white pr-[66px] pl-[62px]">
      <Link href={routes.home} className="flex items-center gap-2 text-[20px] leading-6 font-bold tracking-[-0.02em] text-[#171a22]">
        <LogoIcon width={28} height={28} />
        {brand.name}
      </Link>
      <nav className="absolute left-[516px] flex items-center gap-[31px] text-[17px] font-medium text-[#171a22]">
        {nav.map((n) => {
          const cls = "flex items-center gap-[7px] hover:text-[#6e45f5]";
          const body = (
            <>
              {n}
              {n === "Enterprise" ? (
                <svg viewBox="0 0 12 12" width={11} height={11}>
                  <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth={1.6} />
                </svg>
              ) : n !== "Pricing" ? (
                <ChevronDown width={13} height={13} strokeWidth={2.2} />
              ) : null}
            </>
          );
          const href = navHrefs[n];
          return href ? (
            <Link key={n} href={href} className={cls}>
              {body}
            </Link>
          ) : (
            <button key={n} type="button" className={cls}>
              {body}
            </button>
          );
        })}
      </nav>
      <span className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#ba96ec] text-[16px] font-medium text-[#171a22]">C</span>
    </header>
  );
}

function SideNav({ slug }: { slug: string }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ "Getting Started": true });
  return (
    <nav className="w-[225px] shrink-0 pt-[51px] text-[15px] leading-[21px]">
      {kbNav.map((n) => {
        const expandable = !!n.children || n.collapsed;
        const isOpen = open[n.label];
        return (
          <div key={n.label} className="mb-[12px]">
            <button type="button" onClick={() => expandable && setOpen((o) => ({ ...o, [n.label]: !o[n.label] }))} className={`flex items-center text-left whitespace-nowrap ${muted} hover:text-[#171a22]`}>
              <span className="flex w-[18px] shrink-0 justify-start">{expandable && (isOpen ? <ChevronDown width={13} height={13} strokeWidth={2} /> : <ChevronRight width={13} height={13} strokeWidth={2} />)}</span>
              {n.label}
            </button>
            {isOpen && n.children && (
              <div className="mt-[12px] flex flex-col gap-[12px] pl-[28px]">
                {n.children.map((c) => (
                  <Link key={c.label} href={kbHref(c.slug!)} className={c.slug === slug ? "text-[#171a22]" : `${muted} hover:text-[#171a22]`}>
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function Toc({ a }: { a: KbArticle }) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  return (
    <aside className="ml-[3px] w-[220px] shrink-0 pt-[173px]">
      <div className="text-[14px] leading-5 font-bold text-[#171a22]">Table of contents</div>
      <ol className="mt-[12px] flex flex-col gap-[12px] border-b border-[#e4e6ea] pb-[29px] pl-[4px] text-[15px] leading-[21px]">
        {a.sections.map((s, i) => (
          <li key={s.title}>
            <a href={`#s${i + 1}`} className={`${muted} hover:text-[#171a22]`}>
              {i + 1}. {s.title}
            </a>
          </li>
        ))}
      </ol>
      <p className={`mt-[29px] text-[15px] leading-5 ${muted}`}>Is this article helpful?</p>
      <div className="mt-[13px] flex gap-2 pl-[4px]">
        {(["up", "down"] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-label={v === "up" ? "Helpful" : "Not helpful"}
            onClick={() => setVote(v)}
            className={`flex h-10 w-[59px] items-center justify-center rounded-md border ${vote === v ? "border-[#6e45f5] bg-[#efe9ff]" : "border-[#dcdfe4] bg-[#eef0f0]"} text-[#6f7584] hover:bg-[#e4e6ea]`}
          >
            <svg viewBox="0 0 16 16" width={16} height={16} className={v === "down" ? "rotate-180" : ""}>
              <path d="M2 7h2.5v7H2zM4.5 7.5 7.5 2c1.2 0 1.8.8 1.6 2L8.7 6H13c.9 0 1.5.8 1.3 1.6l-1.2 5.2c-.2.7-.8 1.2-1.5 1.2H4.5" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>
      {vote && <p className={`mt-3 text-[14px] ${muted}`}>Thanks for your feedback!</p>}
    </aside>
  );
}

export function KbArticlePage({ slug }: { slug: string }) {
  const a = kbArticles.find((x) => x.slug === slug) ?? kbArticles[0];
  const [q, setQ] = useState("");
  return (
    <div className="min-h-screen bg-[#f5f7f8] text-[#171a22]">
      <style>{`html,body{background:#f5f7f8}`}</style>
      <SiteHeader />
      <div className="flex gap-[31px] pb-[120px] pl-[117px]">
        <div className="w-[225px] shrink-0">
          <h1 className="pt-[53px] text-[24px] leading-[32px] font-normal">Knowledge Base</h1>
          <SideNav slug={a.slug} />
        </div>
        <div className="w-[767px] shrink-0">
          <form className="mt-[40px] flex gap-6" onSubmit={(e) => e.preventDefault()}>
            <label className="flex h-14 w-[580px] items-center rounded-lg border border-[#d9dce1] bg-white pr-5 pl-3">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="flex-1 text-[17px] outline-none placeholder:text-[#8d929c]" />
              <svg viewBox="0 0 24 24" width={24} height={24} className="text-[#171a22]">
                <circle cx="10.5" cy="10.5" r="7.5" fill="none" stroke="currentColor" strokeWidth={1.6} />
                <path d="m16 16 5.5 5.5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
              </svg>
            </label>
            <button type="submit" className="h-14 w-[163px] rounded-full bg-[#171a17] text-[17px] text-white hover:bg-black">
              Search
            </button>
          </form>
          <div className={`mt-[39px] flex gap-[11px] text-[15px] leading-5 ${muted}`}>
            <Link href={kbHref(kbArticles[0].slug)} className="hover:text-[#171a22]">
              Knowledge Base
            </Link>
            <span>/</span>
            <span>Getting Started</span>
            <span>/</span>
            <span className="text-[#8d929c]">{a.title}</span>
          </div>
          <article className="mt-[22px] rounded-md bg-white px-10 pt-[38px] pb-12">
            <h1 className="text-[44px] leading-[52px] font-extrabold tracking-[-0.02em]">{a.title}</h1>
            {a.intro.map((p, i) => (
              <p key={i} className="mt-[14px] text-[17px] leading-6 tracking-[-0.005em] first-of-type:mt-[16px]">
                {p.link ? (
                  <>
                    {p.link.before}
                    <Link href={p.link.href} className="text-[#2a5bd7] hover:underline">
                      {p.link.label}
                    </Link>
                    {p.link.after}
                  </>
                ) : (
                  p.text
                )}
              </p>
            ))}
            {a.cta && (
              <Link href={a.cta.href} className="mt-[16px] inline-flex h-[44px] items-center rounded-md bg-[#07b691] px-[29px] text-[20px] text-white hover:bg-[#05a080]">
                {a.cta.label}
              </Link>
            )}
            {a.sections.map((s, i) => (
              <section key={s.title} id={`s${i + 1}`} className="mt-[56px] scroll-mt-6">
                <h2 className="text-[34px] leading-[40px] font-extrabold tracking-[-0.02em]">
                  {i + 1}. {s.title}
                </h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-[16px] text-[17px] leading-6">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </article>
        </div>
        <Toc a={a} />
      </div>
      <HelpButtonAndPanel variant="chat" />
    </div>
  );
}
