"use client";

import Link from "next/link";
import { useState } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { CloseIcon } from "@/components/ui/icons";
import { Check } from "@/features/pricing/icons";
import { BlogArt, Stripes } from "./art";
import { blogCategories, blogPosts, marketingRoutes, type BlogPost } from "./data";
import { MarketingShell } from "./MarketingShell";
import { SiteHeader } from "./SiteHeader";

const trialPoints = [
  "See how LLMs talk about you",
  "Streamline SEO and AI audits",
  "Track keyword and prompt rankings",
  "Uncover questions your audience asks",
  "Spot visibility gaps in ChatGPT and AI Mode",
  "Get AI-powered recommendations",
  "Get personalized performance metrics",
  "Find brand mention opportunities",
];

function Meta({ p, className = "" }: { p: BlogPost; className?: string }) {
  return (
    <p className={`text-[15px] leading-[25px] text-[#1b1e1a] ${className}`}>
      <span className="font-medium underline decoration-1 underline-offset-[3px]">{p.tag}</span>
      <span className="mx-[10px]">•</span>
      <span className="font-medium underline decoration-1 underline-offset-[3px]">{p.author}</span>
      <span className="mx-[10px]">•</span>
      {p.read} min read
      <span className="mx-[10px]">•</span>
      {p.date}
    </p>
  );
}

function PromoBar() {
  return (
    <div className="relative flex h-[37px] items-center justify-center bg-[#c090fe] text-[14px] leading-5 text-[#171a17]">
      <Stripes className="top-0 right-0 bottom-0 w-[14px]" from="#000 0%" to="#000 100%" />
      Find new opportunities across AI search and SEO.
      <Link href={routes.pricing.one} className="ml-3 font-semibold underline decoration-1 underline-offset-[3px]">
        Try free for 7 days
      </Link>
    </div>
  );
}

function BlogNav({ active, onPick }: { active: string; onPick: (c: string) => void }) {
  const [tip, setTip] = useState(true);
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState(false);
  return (
    <div className="relative flex h-[96px] items-start pr-[45px] pl-[45px]">
      <nav className="mt-[25px] flex items-center gap-6 text-[17px] leading-7 font-medium">
        {blogCategories.map((c) => (
          <button key={c} type="button" onClick={() => onPick(c)} className={c === active ? "text-[#b98af0]" : "text-[#1b1e1a] hover:text-[#b98af0]"}>
            {c}
          </button>
        ))}
      </nav>
      <div className="ml-auto flex items-start">
        {search ? (
          <input autoFocus placeholder="Search the blog" onBlur={() => setSearch(false)} className="mt-[22px] mr-[25px] h-9 w-[220px] rounded-full border border-[#1b1e1a] px-4 text-[15px] outline-none" />
        ) : (
          <button type="button" aria-label="Search" onClick={() => setSearch(true)} className="mt-[23px] mr-[25px] text-[#1b1e1a] hover:text-[#6a3fd0]">
            <svg viewBox="0 0 24 24" width={26} height={26}>
              <circle cx="10.5" cy="10.5" r="7.8" fill="none" stroke="currentColor" strokeWidth={1.8} />
              <path d="m16.3 16.3 5.4 5.4" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
            </svg>
          </button>
        )}
        <div className="relative mt-[9px] flex flex-col items-center">
          <Link href={routes.pricing.one} className="flex h-[34px] w-[262px] items-center justify-center rounded-full bg-[#171a17] text-[15.5px] font-semibold text-white hover:bg-black">
            Try it for FREE for 7 days
          </Link>
          <span className="mt-[4px] ml-[8px] text-[14px] leading-5 text-[#6a6c6a]">Unlimited access for 7 days. 55+ tools.</span>
          {tip && (
            <div className="absolute top-[64px] right-0 z-30 w-[569px] rounded-[6px] bg-[#e0c6ff] pt-[22px] pr-2 pb-[22px] pl-[20px] text-[#1b1e1a] shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
              <span className="absolute -top-[8px] right-[100px] h-4 w-4 rotate-45 bg-[#e0c6ff]" />
              <button type="button" aria-label="Close" onClick={() => setTip(false)} className="absolute top-[13px] right-[14px] text-[#6a6c6a] hover:text-[#1b1e1a]">
                <CloseIcon width={16} height={16} />
              </button>
              <p className="text-[14px] leading-5 font-semibold tracking-[-0.01em]">Sign up for a Free trial to:</p>
              <ul className="mt-[3px] grid grid-cols-[284px_1fr] gap-y-[2.4px] text-[12px] leading-5 tracking-[0.01em]">
                {trialPoints.map((t) => (
                  <li key={t} className="flex items-center gap-[10px]">
                    <Check width={14} height={14} />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-[17px] text-[14px] leading-5 font-semibold tracking-[-0.01em]">Succeed with search engines and LLMs:</p>
              <p className="mt-[5px] w-[400px] text-[12px] leading-5">
                Level up your search strategy across Google, ChatGPT, and more with {brand.name}’s SEO and AI Visibility Toolkits. Try it for free.
              </p>
            </div>
          )}
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={dark}
          aria-label="Dark mode"
          onClick={() => setDark((d) => !d)}
          className={`mt-[26px] ml-[24px] flex h-[20px] w-[37px] items-center rounded-full bg-[#1b1e18] px-[2px] ${dark ? "justify-end" : "justify-start"}`}
        >
          <svg viewBox="0 0 16 16" width={16} height={16}>
            <path d="M10.5 2.2A6 6 0 1 0 14 11a5 5 0 0 1-3.5-8.8z" fill="none" stroke="#8b64e8" strokeWidth={2} />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Card({ p, tall }: { p: BlogPost; tall?: boolean }) {
  return (
    <Link href={marketingRoutes.blogPost(p.slug)} className="group flex flex-col overflow-hidden rounded-[4px] bg-[#dbedeb]">
      <div className="flex flex-1 flex-col px-6 pt-[26px] pb-[26px]">
        <h3 className={`${tall ? "text-[26px] leading-[29px]" : "text-[22px] leading-[27px]"} font-medium tracking-[-0.025em] text-balance group-hover:underline`}>{p.title}</h3>
        <p className="mt-[7px] text-[17px] leading-6 tracking-[-0.01em]">{p.excerpt}</p>
        <Meta p={p} className="mt-auto pt-[14px]" />
      </div>
      {!tall && <BlogArt kind={p.art} className="h-[160px] w-full" />}
    </Link>
  );
}

export function BlogPage() {
  const [cat, setCat] = useState("Blog");
  const posts = cat === "Blog" ? blogPosts : blogPosts.filter((p) => p.category === cat);
  const [lead, ...rest] = posts;
  const pair = rest.slice(0, 2);
  const grid = rest.slice(2);
  return (
    <MarketingShell header="none">
      <PromoBar />
      <SiteHeader variant="blog" />
      <BlogNav active={cat} onPick={setCat} />
      <div className="mx-auto w-[1013px] pb-[40px]">
        {lead && (
          <Link href={marketingRoutes.blogPost(lead.slug)} className="group relative block h-[235px] overflow-hidden rounded-[4px] bg-[#e0c6ff] px-6 pt-[46px]">
            <Stripes className="inset-x-0 bottom-0 h-[52px]" from="transparent 0%" to="#000 70%" />
            <h2 className="relative truncate text-[34px] leading-[40px] font-medium tracking-[-0.025em] group-hover:underline">{lead.title}</h2>
            <p className="relative mt-[4px] truncate text-[17px] leading-6 tracking-[-0.01em]">{lead.excerpt}</p>
            <Meta p={lead} className="relative mt-[13px]" />
          </Link>
        )}
        {pair.length > 0 && (
          <div className="mt-[25px] grid h-[240px] grid-cols-2 gap-[25px]">
            {pair.map((p) => (
              <Card key={p.slug} p={p} tall />
            ))}
          </div>
        )}
        {grid.length > 0 && (
          <div className="mt-[25px] grid grid-cols-3 gap-[24px]">
            {grid.map((p) => (
              <Card key={p.slug} p={p} />
            ))}
          </div>
        )}
        <section className="mt-[80px] flex items-center justify-between rounded-[6px] bg-[#171a17] px-12 py-12 text-white">
          <div>
            <h2 className="text-[34px] leading-10 font-semibold tracking-[-0.04em] uppercase">Get the newsletter</h2>
            <p className="mt-2 text-[17px] leading-6 text-white/80">The best of our blog, SEO news and research, once a week.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
            <input type="email" placeholder="name@example.se" className="h-14 w-[280px] rounded-full bg-white px-6 text-[16px] text-[#171a17] outline-none" />
            <button type="submit" className="h-14 rounded-full bg-[#c090fe] px-7 text-[16px] font-semibold text-[#171a17] hover:bg-[#b27cf9]">
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </MarketingShell>
  );
}

export function BlogPostPage({ slug }: { slug: string }) {
  const p = blogPosts.find((x) => x.slug === slug) ?? blogPosts[0];
  const more = blogPosts.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <MarketingShell header="none">
      <PromoBar />
      <SiteHeader variant="blog" />
      <article className="mx-auto w-[760px] pt-[40px]">
        <p className="text-[15px]">
          <Link href={marketingRoutes.blog} className="font-medium text-[#b98af0] hover:underline">
            Blog
          </Link>{" "}
          / {p.category}
        </p>
        <h1 className="mt-4 text-[46px] leading-[52px] font-medium tracking-[-0.03em]">{p.title}</h1>
        <p className="mt-4 text-[20px] leading-8 text-[#484a49]">{p.excerpt}</p>
        <Meta p={p} className="mt-4" />
        <BlogArt kind={p.art} className="mt-8 h-[380px] w-full rounded-[6px]" />
        {p.body.map(([h, t]) => (
          <section key={h} className="mt-10">
            <h2 className="text-[30px] leading-9 font-medium tracking-[-0.025em]">{h}</h2>
            <p className="mt-4 text-[18px] leading-8">{t}</p>
          </section>
        ))}
      </article>
      <section className="mx-auto mt-[80px] w-[1013px]">
        <h2 className="text-[34px] leading-10 font-semibold tracking-[-0.04em] uppercase">Keep reading</h2>
        <div className="mt-8 grid grid-cols-3 gap-[24px]">
          {more.map((m) => (
            <Card key={m.slug} p={m} />
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
