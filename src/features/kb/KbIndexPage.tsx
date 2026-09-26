"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { brand } from "@/config/brand";
import { HelpButtonAndPanel } from "@/components/shell/HelpPanel";
import { MarketingHeader } from "@/features/pricing/MarketingHeader";
import { MarketingFooter } from "@/features/pricing/MarketingFooter";
import { marketingRoutes } from "@/features/marketing/routes";
import { AcademyArt, BlogArt, FollowIcon, KbIcon, KnowledgeArt, SupportArt, TrainingArt } from "./art";
import { kbArticles, kbCategories, kbHref, kbQuickLinks } from "./data";

const heading = "text-[47px] leading-[58px] font-bold tracking-[-0.045em] text-[#16161f]";

function Search() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const term = q.trim().toLowerCase();
  const hits = term ? kbArticles.filter((a) => a.title.toLowerCase().includes(term)).slice(0, 6) : [];
  return (
    <form
      className="relative mt-[27px] flex gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (hits[0]) router.push(kbHref(hits[0].slug));
      }}
    >
      <label className="flex h-14 flex-1 items-center rounded-[4px] border border-[#d9dadb] bg-white pr-[19px] pl-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 150)}
          placeholder="Search"
          aria-label="Search the Knowledge Base"
          className="flex-1 text-[17px] outline-none placeholder:text-[#8c8c8e]"
        />
        <svg viewBox="0 0 24 24" width={25} height={25} className="text-[#3a3a3f]">
          <circle cx="10.5" cy="10.5" r="8" fill="none" stroke="currentColor" strokeWidth={1.5} />
          <path d="m16.3 16.3 5.6 5.6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        </svg>
      </label>
      <button type="submit" className="h-14 w-[166px] shrink-0 rounded-full bg-[#171d19] text-[17px] text-white hover:bg-black">
        Search
      </button>
      {focus && term && (
        <div className="absolute top-[62px] left-0 z-20 w-[737px] rounded-lg bg-white py-2 shadow-popover">
          {hits.length ? (
            hits.map((a) => (
              <Link key={a.slug} href={kbHref(a.slug)} className="block px-4 py-2 text-[16px] text-[#16161f] hover:bg-[#f4f4f4]">
                {a.title}
              </Link>
            ))
          ) : (
            <p className="px-4 py-2 text-[16px] text-[#6a6c6a]">No articles found</p>
          )}
        </div>
      )}
    </form>
  );
}

const community = [
  { title: "Knowledge Base", text: `Learn how to make the most of your ${brand.name} subscription with straightforward manuals, video walkthroughs, and ready workflows.`, href: kbHref(kbArticles[0].slug), art: <KnowledgeArt className="ml-[4px]" /> },
  { title: `${brand.name} Blog`, text: "Access an innovative resource for content strategy, content marketing, SEO, SEM, PPC, social media and more.", href: marketingRoutes.blog, art: <BlogArt /> },
  { title: `${brand.name} Academy`, text: "Try out dozens of free courses and certification exams developed by renowned SEO and digital marketing experts.", href: kbHref("1225-academy-courses"), art: <AcademyArt className="-mt-[1px] ml-[1px]" /> },
];

const follow = [
  { name: "x", label: "X" },
  { name: "facebook", label: "Facebook" },
  { name: "instagram", label: "Instagram" },
  { name: "youtube", label: "YouTube" },
];

export function KbIndexPage() {
  return (
    <div className="min-h-screen bg-white text-[#16161f]">
      <style>{`html,body{background:#fff}`}</style>
      <MarketingHeader />
      <main className="mx-auto w-[928px] pt-[171px] pb-[7px]">
        <h1 className="text-[52px] leading-[58px] font-bold tracking-[-0.035em] text-[#16161f]">How can we help you?</h1>
        <Search />
        <div className="mt-[76px] grid grid-cols-3 gap-x-[32px] gap-y-[33px]">
          {kbCategories.map((c) => (
            <Link key={c.title} href={kbHref(c.slug)} className="rounded-[10px] border border-[#d8d8d8] px-[27px] pt-[26px] pb-[29px] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
              <span className="flex items-center gap-[10px]">
                <KbIcon name={c.icon} className="-ml-[1px] shrink-0" />
                <span className="text-[19px] leading-7 font-semibold tracking-[-0.005em] text-[#131414]">{c.title}</span>
              </span>
              <span className="mt-[12px] block text-[15px] leading-[21px] tracking-[-0.015em] text-[#4b4b4d]">{c.text}</span>
            </Link>
          ))}
        </div>
        <section className="relative mt-[28px] flex h-[183px] rounded-[4px] border border-[#d8d8d8] pt-[29px] pl-[27px]">
          <div className="w-[610px]">
            <h2 className="text-[18px] leading-6 font-semibold">Join a free training session</h2>
            <p className="mt-[4px] text-[15px] leading-[21px] tracking-[-0.015em] text-[#4b4b4d]">Join a free training session to gain insights into how {brand.name} can help you solve specific problems and achieve particular goals.</p>
            <Link href={kbHref("1226-free-training-sessions")} className="mt-[20px] inline-flex h-9 w-[188px] items-center justify-center rounded-[4px] bg-[#00bf91] text-[17px] text-white hover:bg-[#00a57d]">
              Request training
            </Link>
          </div>
          <TrainingArt className="absolute right-[48px] bottom-[-1px] h-[215px] w-[250px]" />
        </section>
        <h2 className={`${heading} mt-[85px]`}>Become a part of our community to get assistance, learn, and keep up with the industry</h2>
        <div className="mt-[50px] grid grid-cols-3 gap-[32px]">
          {community.map((c) => (
            <Link key={c.title} href={c.href} className="h-[309px] rounded-[10px] border border-[#d8d8d8] px-[27px] pt-[24px] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
              <span className="block h-[104px]">{c.art}</span>
              <span className="mt-[17px] block text-[18.5px] leading-6 font-semibold">{c.title}</span>
              <span className="mt-[2px] block text-[15px] leading-[21px] tracking-[-0.015em] text-[#4b4b4d]">{c.text}</span>
            </Link>
          ))}
        </div>
        <div className="mt-[36px] flex items-center">
          <span className="text-[16px] font-semibold">Follow us:</span>
          <span className="ml-[24px] flex gap-[28px]">
            {follow.map((f) => (
              <a key={f.name} href="#" aria-label={f.label} className="text-[#16161f] hover:text-[#6a3fd0]">
                <FollowIcon name={f.name} />
              </a>
            ))}
          </span>
        </div>
        <section className="relative mt-[117px] h-[424px] overflow-hidden rounded-[16px] bg-white pt-[77px] pl-[56px] shadow-[0_20px_60px_rgba(22,22,31,0.1)]">
          <h2 className={heading}>
            Our Support Team
            <br />
            is here to help
          </h2>
          <p className="mt-[11px] w-[390px] text-[16.5px] leading-6 tracking-[-0.01em] text-[#4b4b4d]">Contact us to get your issue resolved as soon as possible.</p>
          <Link href={marketingRoutes.contacts} className="mt-[30px] inline-flex h-[49px] w-[289px] items-center justify-center rounded-[4px] bg-[#c18eff] text-[16px] text-white hover:bg-[#b27cf9]">
            Contact support
          </Link>
          <SupportArt className="absolute top-[28px] right-[40px] h-[330px] w-[330px]" />
        </section>
        <h2 className={`${heading} mt-[194px]`}>Quick Links</h2>
        <ul className="mt-[53px] grid grid-cols-3 gap-y-[16px] text-[16px] leading-6 tracking-[0.01em]">
          {kbQuickLinks.flatMap((row, r) =>
            [0, 1, 2].map((i) => {
              const l = row[i];
              return (
                <li key={`${r}-${i}`} className={l ? "flex before:mt-[-1px] before:-ml-[4px] before:mr-[22px] before:content-['•'] before:text-[#19181c]" : ""}>
                  {l && (
                    <Link href={kbHref(l.slug)} className="text-[#2a79ae] hover:underline">
                      {l.label}
                    </Link>
                  )}
                </li>
              );
            }),
          )}
        </ul>
      </main>
      <MarketingFooter />
      <HelpButtonAndPanel variant="chat" />
    </div>
  );
}
