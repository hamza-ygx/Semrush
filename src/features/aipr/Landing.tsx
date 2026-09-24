import type { ReactNode } from "react";
import { heroTitleCls, type Feature, type Landing } from "./data";
import { ArtBox, heroGradient } from "./illustrations";

export function PrHero({ title, subtitle, children, className = "" }: { title: string; subtitle: string; children?: ReactNode; className?: string }) {
  return (
    <section className={`mx-5 mt-4 flex flex-col items-center rounded-lg px-6 text-center ${className}`} style={{ background: heroGradient }}>
      <h1 className={`max-w-[700px] ${heroTitleCls}`}>{title}</h1>
      <p className="mt-[16px] max-w-[700px] text-[20px] leading-6 tracking-[-0.01em] text-[#2d2f37]">{subtitle}</p>
      {children}
    </section>
  );
}

export function TrialButton({ label = "Start free 7-day trial", className = "" }: { label?: string; className?: string }) {
  return (
    <button type="button" className={`h-10 rounded-md bg-rk-btn-dark px-[13px] text-[16px] font-semibold text-white hover:bg-[#2b2e38] ${className}`}>
      {label}
    </button>
  );
}

export function FeatureRow({ f, flip }: { f: Feature; flip: boolean }) {
  const text = (
    <div className="mt-4 w-[505px] shrink-0">
      <h2 className="text-[34px] leading-10 font-medium tracking-[-0.025em] text-rk-text">{f.title}</h2>
      <ul className="mt-[22px] space-y-4 text-[15px] leading-6 text-rk-text">
        {f.bullets.map((b) => (
          <li key={b} className="relative pl-[21px]">
            <span className="absolute top-[9px] left-[6px] h-[5px] w-[5px] rounded-full bg-[#6c6e79]" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className={`flex items-center justify-between ${flip ? "flex-row-reverse" : ""}`}>
      {text}
      <ArtBox art={f.art} height={f.artHeight} />
    </div>
  );
}

export function FeatureList({ features, gap }: { features: Feature[]; gap: number }) {
  return (
    <div className="mx-5 space-y-24" style={{ marginTop: gap }}>
      {features.map((f, i) => (
        <FeatureRow key={f.title} f={f} flip={i % 2 === 1} />
      ))}
    </div>
  );
}

export function PrLanding({ page, children }: { page: Landing; children?: ReactNode }) {
  return (
    <div className="pb-[155px]">
      <PrHero title={page.title} subtitle={page.subtitle} className={page.price ? "pt-[143px] pb-[143px]" : "pt-[143px] pb-[144px]"}>
        <TrialButton className="mt-[33px]" />
        {page.price && <div className="mt-3 text-[16px] leading-6 text-[#484a54]">{page.price}</div>}
      </PrHero>
      {children}
      <FeatureList features={page.features} gap={page.gap} />
    </div>
  );
}
