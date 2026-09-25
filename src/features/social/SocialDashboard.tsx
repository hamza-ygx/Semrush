import Link from "next/link";
import type { ReactNode } from "react";
import { DrawnAvatar } from "@/features/aipr/illustrations";
import { AudienceArt, CalendarArt, EngagementArt, InfluencersArt, MentionsChartArt, PeopleArt } from "./art";
import { socialFeatures, socialHero, testimonials, type SocialFeature } from "./data";
import { ProjectGoTo } from "./HeaderTools";

const arts: Record<SocialFeature["art"], () => ReactNode> = {
  audience: () => <AudienceArt />,
  calendar: () => <CalendarArt />,
  engagement: () => <EngagementArt />,
  influencers: () => <InfluencersArt />,
  mentions: () => (
    <div className="flex h-[220px] w-[407px] items-center justify-center rounded-lg bg-[#f3f5f8]">
      <MentionsChartArt />
    </div>
  ),
};

function Feature({ f, flip }: { f: SocialFeature; flip: boolean }) {
  return (
    <div className={`flex items-center justify-between ${flip ? "flex-row-reverse" : ""}`}>
      <div className="w-[408px]">
        <h3 className="text-[24px] leading-7 font-semibold text-rk-text">{f.title}</h3>
        <ul className="mt-3 space-y-2 text-[16px] leading-6 text-rk-text">
          {f.bullets.map((b) => (
            <li key={b} className="relative pl-[14px]">
              <span className="absolute top-[10px] left-[3px] h-[5px] w-[5px] rounded-full bg-rk-text" />
              {b}
            </li>
          ))}
        </ul>
        <Link href={f.href} className="mt-6 inline-flex h-10 items-center rounded-md bg-rk-btn-dark px-[13px] text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
          {f.cta}
        </Link>
      </div>
      <div className="w-[407px]">{arts[f.art]()}</div>
    </div>
  );
}

export function SocialDashboard() {
  return (
    <div className="relative pt-[44px] pb-[180px]">
      <ProjectGoTo />
      <h1 className="text-center text-[36px] leading-10 font-semibold tracking-[-0.02em] text-rk-text">
        {socialHero.title[0]}
        <br />
        {socialHero.title[1]}
      </h1>
      <div className="mt-7 flex justify-center">
        <button type="button" className="h-10 w-[239px] rounded-md bg-rk-btn-dark text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
          {socialHero.cta}
        </button>
      </div>
      <p className="mt-2 text-center text-[14px] leading-5 text-[#6c6e79]">{socialHero.note}</p>
      <div className="relative z-10 mt-[49px] flex justify-center">
        <PeopleArt />
      </div>
      <div className="mx-auto -mt-[24px] w-[959px] rounded-lg bg-white px-12 pt-[43px] pb-10">
        <h2 className="text-center text-[24px] leading-8 font-medium tracking-[-0.004em] text-rk-text">{socialHero.subtitle}</h2>
        <div className="mt-[56px] space-y-[57px]">
          {socialFeatures.map((f, i) => (
            <Feature key={f.title} f={f} flip={i % 2 === 1} />
          ))}
        </div>
        <h2 className="mt-[96px] text-center text-[24px] leading-8 font-medium text-rk-text">What our users say</h2>
        <div className="-mx-2 mt-10 flex gap-[17px]">
          {testimonials.map((col, ci) => (
            <div key={ci} className="flex flex-1 flex-col gap-[17px]">
              {col.map((t) => (
                <figure key={t.quote} className="rounded-xl bg-[#f3f5f5] px-[23px] pt-[23px] pb-[24px]">
                  <blockquote className="text-[16px] leading-6 text-rk-text">{t.quote}</blockquote>
                  <figcaption className={`mt-6 flex items-center gap-4 text-[16px] leading-6 ${t.avatar ? "" : ""}`}>
                    {t.avatar && <DrawnAvatar size={72} tone={t.avatar.tone} hair={t.avatar.hair} bg={t.avatar.bg} />}
                    <div>
                      <div className="font-semibold text-rk-text">{t.title}</div>
                      {t.company && <div className="text-[#6c6e79]">{t.company}</div>}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-[33px] flex justify-center">
          <button type="button" className="h-10 rounded-md bg-rk-btn-dark px-[13px] text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
