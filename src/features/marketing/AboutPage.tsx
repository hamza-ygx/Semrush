import Link from "next/link";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { TeamArt } from "./art";
import { aboutStats, aboutTimeline, aboutValues, marketingRoutes } from "./data";
import { MarketingShell } from "./MarketingShell";

const h2 = "text-[52px] leading-[52px] font-semibold tracking-[-0.05em] uppercase";

export function AboutPage() {
  return (
    <MarketingShell>
      <section className="flex h-[213px] bg-[linear-gradient(180deg,#dceeec_0%,#e1ecf2_30%,#e6ebf5_55%,#ede9fe_100%)] pt-[52px] pl-[112px]">
        <h1 className="w-[551px] shrink-0 text-[89px] leading-[96px] font-semibold tracking-[-0.045em]">About Us</h1>
        <p className="w-[740px] pt-[14px] text-[30px] leading-[33px] tracking-[-0.012em]">{brand.name} powers brand visibility across search and AI-driven discovery.</p>
      </section>
      <section className="flex pt-[81px] pl-[112px]">
        <div className="w-[551px] shrink-0">
          <h2 className={h2}>Who are we?</h2>
          <p className="mt-[36px] w-[390px] text-[22px] leading-[31.5px] tracking-[-0.01em]">{brand.name} is the intelligence engine for ambitious marketers obsessed with winning.</p>
        </div>
        <div className="w-[742px]">
          <p className="pt-[18px] text-[20.5px] leading-[31.5px] tracking-[-0.01em]">
            From startups to global enterprises, we’re the unified platform behind modern brand visibility — bringing SEO authority and AI visibility intelligence together in one system.
          </p>
          <p className="mt-[31px] text-[20.5px] leading-[31.5px] tracking-[-0.01em]">
            As discovery expands beyond rankings into AI answers, social platforms, and competitive ecosystems, we give teams the clarity to see where they stand — and the tools to move ahead with confidence.
          </p>
          <TeamArt className="mt-[31px] h-auto w-[742px] rounded-[6px]" />
        </div>
      </section>
      <section className="mt-[120px] px-[112px]">
        <h2 className={h2}>By the numbers</h2>
        <div className="mt-12 grid grid-cols-4 gap-[13px]">
          {aboutStats.map((s) => (
            <div key={s.value} className="rounded-[6px] bg-[#dbedeb] px-7 pt-8 pb-9">
              <div className="text-[64px] leading-[64px] font-semibold tracking-[-0.05em]">{s.value}</div>
              <p className="mt-4 text-[18px] leading-6">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-[120px] flex px-[112px]">
        <h2 className={`${h2} w-[551px] shrink-0`}>Our values</h2>
        <div className="grid flex-1 grid-cols-2 gap-x-10 gap-y-12">
          {aboutValues.map((v, i) => (
            <div key={v.title} className="border-t border-[#171a17] pt-5">
              <div className="text-[15px] font-medium text-[#6a6c6a]">0{i + 1}</div>
              <h3 className="mt-2 text-[26px] leading-8 font-medium tracking-[-0.03em]">{v.title}</h3>
              <p className="mt-3 text-[18px] leading-7 text-[#484a49]">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-[120px] px-[112px]">
        <h2 className={h2}>Our story</h2>
        <ol className="mt-12 grid grid-cols-5 gap-[13px]">
          {aboutTimeline.map((t) => (
            <li key={t.year} className="border-l-2 border-[#c090fe] pl-5">
              <div className="text-[32px] leading-10 font-semibold tracking-[-0.04em]">{t.year}</div>
              <p className="mt-3 text-[16px] leading-6 text-[#484a49]">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="mx-[112px] mt-[120px] flex items-center justify-between rounded-2xl bg-[#ede9fe] px-14 py-14">
        <div>
          <h2 className="text-[40px] leading-[44px] font-semibold tracking-[-0.05em] uppercase">Want to work with us?</h2>
          <p className="mt-4 max-w-[560px] text-[18px] leading-7">Talk to our team about partnerships, press, or how {brand.name} can help your business grow.</p>
        </div>
        <div className="flex gap-3">
          <Link href={marketingRoutes.contacts} className="flex h-14 items-center rounded-full bg-[#171a17] px-7 text-[15px] font-semibold text-white hover:bg-black">
            Contact us
          </Link>
          <Link href={routes.pricing.one} className="flex h-14 items-center rounded-full border border-[#171a17] px-7 text-[15px] font-semibold hover:bg-white">
            See plans
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
