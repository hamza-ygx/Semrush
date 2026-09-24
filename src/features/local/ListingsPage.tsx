"use client";

import { directoryGroups, listingFaq } from "./data";
import { ExampleScans, Faq, FreeAuditSearch, HeroMap } from "./ui";
import { IsoArt, StepArt } from "./art";

const dirStyle: Record<string, [string, string, string?]> = {
  Google: ["#fff", "G", "#4285f4"],
  Apple: ["#555a64", ""],
  Instagram: ["#e1306c", "◎"],
  Facebook: ["#1877f2", "f"],
  Foursquare: ["#f94877", "F"],
  Tripadvisor: ["#34e0a1", "oo", "#000"],
  "Google Maps": ["#fff", "●", "#ea4335"],
  NDrive: ["#111", "N", "#e53935"],
  Waze: ["#33ccff", "☺"],
  Assistant: ["#fff", "●", "#4285f4"],
  Alexa: ["#fff", "○", "#1ec2f3"],
  Siri: ["#5b3fd6", ""],
  RatingsMD: ["#4db6ac", "MD"],
  DocSpot: ["#1e88e5", "ds"],
  WebMD: ["#1565c0", "md"],
  Vitals: ["#4a2366", "v"],
  "Wellness.com": ["#fff", "W", "#8bc34a"],
  Bing: ["#138484", "b"],
  "Yahoo!": ["#5f01d1", "y!"],
};

function DirIcon({ name }: { name: string }) {
  const [bg, t, fg] = dirStyle[name] ?? ["#ccc", name[0]];
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] leading-none font-bold"
      style={{ background: bg, color: fg ?? "#fff", fontSize: t.length > 1 ? 9 : 15 }}
    >
      {t}
    </span>
  );
}

const steps = [
  { t: "Enter business name", d: "Run a scan of your local business visibility in a few seconds" },
  { t: "Get a free report", d: "See which directories your business needs to be fixed or listed in" },
  { t: "Access opportunities and take action", d: "See how much you can improve to own the top spot in local search" },
];

const benefits = [
  ["Automatic NAP Management", "Distribute accurate business name, address and phone number to every directory at once."],
  ["Duplicate suppression", "Find and remove duplicate listings that confuse customers and search engines."],
  ["Voice search ready", "Show up in answers from Siri, Alexa and Google Assistant."],
  ["Google Business Profile sync", "Connect your profile once and keep all your listings in sync."],
];

export function ListingsHero({ label = "Listing Management" }: { label?: string }) {
  return (
    <section className="relative overflow-hidden bg-[#410f7c] pb-[23px] text-center">
      <HeroMap variant={1} pins={[{ x: 563, y: 60, s: 1.05, o: 0.45 }]} />
      <div className="relative pt-[26px] text-[16px] leading-5 font-medium text-[#f7e6ff]">{label}</div>
      <h1 className="relative mt-[112px] text-[48px] leading-[56px] font-bold tracking-[-0.2px] text-white">Grow your Local businesses</h1>
      <p className="relative mt-[16px] text-[20px] leading-6 text-white">Listings, data, and AI-powered reviews — all in one platform.</p>
      <div className="relative mt-[63px] text-[16px] leading-6 font-bold text-white">Check your local listings for free</div>
      <FreeAuditSearch placeholder="Your business name, website or phone" className="relative mx-auto mt-[17px] w-[872px] text-left" />
      <ExampleScans className="relative mt-[20px]" />
      <div className="relative mx-auto mt-[82px] flex w-[979px] gap-[24px] text-left">
        {steps.map((s, i) => (
          <div key={s.t} className="flex h-[116px] flex-1 gap-[10px] rounded-[8px] bg-white/[0.07] pt-[17px] pr-[16px] pl-[14px]">
            <StepArt n={i} />
            <div>
              <div className="text-[16px] leading-6 font-bold text-white">{s.t}</div>
              <div className="mt-[2px] text-[12px] leading-4 text-white/90">{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ListingsPage() {
  return (
    <div className="pb-[207px]">
      <ListingsHero />
      <section className="mx-auto mt-[13px] w-[979px] rounded-[8px] bg-white pt-[39px] pb-[48px]">
        <h2 className="text-center text-[24px] leading-8 font-bold text-[#1a1a1f]">Stay visible with business listings in top directories</h2>
        <p className="mt-[8px] text-center text-[14px] leading-5 text-[#1f1f24]">Automatic NAP Management | Google Business Profile Integration.</p>
        <div className="relative mt-[40px] flex">
          <div className="relative h-[560px] w-[500px] shrink-0 overflow-hidden">
            <IsoArt />
          </div>
          <div className="pt-[20px] pl-[2px]">
            <div className="text-[16px] leading-6 font-bold text-[#1a1a1f]">150+ globally supported directories</div>
            {directoryGroups.map((g, gi) => (
              <div key={g.title} className={gi ? "mt-[22px]" : "mt-[16px]"}>
                <div className="text-[13px] leading-5 text-[#5f6068]">{g.title}</div>
                <div className="mt-[12px] grid w-[441px] grid-cols-3 gap-y-[11px]">
                  {g.items.map((n) => (
                    <span key={n} className="flex h-6 items-center gap-[8px] text-[14px] text-[#1f1f24]">
                      <DirIcon name={n} />
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto mt-[24px] w-[979px] rounded-[8px] bg-white px-[48px] pt-[39px] pb-[48px] text-center">
        <h2 className="text-[24px] leading-8 font-bold text-[#1a1a1f]">Everything you need to manage your listings</h2>
        <div className="mt-[32px] grid grid-cols-4 gap-[24px] text-left">
          {benefits.map(([t, d]) => (
            <div key={t} className="rounded-[8px] border border-[#e0e1e9] p-[16px]">
              <div className="text-[14px] leading-5 font-semibold text-[#1a1a1f]">{t}</div>
              <div className="mt-[8px] text-[14px] leading-5 text-[#6c6e79]">{d}</div>
            </div>
          ))}
        </div>
      </section>
      <h2 className="mt-[56px] text-center text-[24px] leading-8 font-semibold text-[#1a1a1f]">Frequently asked questions</h2>
      <Faq
        items={listingFaq}
        className="mx-auto mt-[24px] flex w-[882px] flex-col gap-[13px]"
        itemClass="rounded-[8px] bg-white shadow-[0_1px_3px_rgba(24,27,40,0.1),0_0_1px_rgba(24,27,40,0.12)]"
        textClass="h-[51px] pl-[20px] text-[14px] text-[#1f1f24] [&>span]:ml-[1px]"
      />
      <section className="mx-auto mt-[36px] w-[979px] rounded-[8px] bg-white px-[54px] pt-[41px] pb-[43px] text-center" data-cta>
        <h2 className="text-[24px] leading-7 font-bold text-[#1a1a1f]">
          Grow your business with listings, data, and reviews.
          <br />
          All in one platform
        </h2>
        <div className="mt-[31px] text-[16px] leading-6 font-bold text-[#1a1a1f]">Check your local listings for free</div>
        <FreeAuditSearch placeholder="Your business name, website or phone" variant="light" className="mt-[16px] text-left" />
      </section>
    </div>
  );
}

