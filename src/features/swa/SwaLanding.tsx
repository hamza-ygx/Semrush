"use client";

import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { Modal } from "@/components/ui/Modal";
import { ClipboardIcon, EditorMock, FeatureArt, GoogleDocIcon, OfficeIcon, ScoreMock, WordPressIcon } from "./Art";
import { addOns, bullets, captions, features, testimonials, type FeatureKey } from "./data";

const card = "rounded-lg bg-white shadow-card";

function GreenButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex h-10 items-center gap-2 rounded-md bg-[#009f81] px-[13px] text-[16px] font-semibold text-white hover:bg-[#007c65]">
      {children}
    </button>
  );
}

function AnalyzeButton({ onClick }: { onClick: () => void }) {
  return (
    <GreenButton onClick={onClick}>
      Analyze my text
      <ArrowRight width={16} height={16} strokeWidth={2.2} />
    </GreenButton>
  );
}

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className={`${card} px-10 pt-[38px] pb-[41px] text-center`}>
      <h1 className="text-[36px] leading-[44px] font-bold">SEO Writing Assistant</h1>
      <p className="mx-auto mt-[10px] w-[470px] text-[16px] leading-6">A smart writing editor that helps you optimize your copy for engagement and SEO.</p>
      <div className="mt-[32px]">
        <AnalyzeButton onClick={onStart} />
      </div>
    </section>
  );
}

function FeatureCarousel() {
  const [active, setActive] = useState<FeatureKey>("seo");
  const idx = features.findIndex((f) => f.key === active);
  const go = (d: number) => setActive(features[(idx + d + features.length) % features.length].key);
  return (
    <section className={`${card} px-10 pt-[37px] pb-[41px]`}>
      <h2 className="text-center text-[24px] leading-8 font-semibold">Create better content, faster and outrank your competitors</h2>
      <div className="mt-[47px] -ml-1 flex">
        {features.map((f, i) => {
          const on = f.key === active;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              style={{ width: f.width, marginLeft: i === 0 ? 0 : i === 1 ? 12 : 16 }}
              className={`flex h-[213px] flex-col items-center rounded-xl pt-[13px] text-center transition-shadow ${
                on ? "" : "bg-white shadow-[0_2px_14px_rgba(25,27,35,0.08),0_0_1px_rgba(25,27,35,0.1)] hover:shadow-[0_4px_18px_rgba(25,27,35,0.14)]"
              }`}
            >
              <FeatureArt kind={f.key} active={on} />
              <span className="mt-[10px] text-[16px] leading-6 font-bold">
                {f.title[0]}
                <br />
                {f.title[1]}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-[49px] flex justify-center gap-[14px]">
        {features.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-label={f.title.join(" ")}
            onClick={() => setActive(f.key)}
            className={`h-[10px] w-[10px] rounded-full ${f.key === active ? "bg-[#aba8bc]" : "bg-[#e3e3e3] hover:bg-[#d6d8d7]"}`}
          />
        ))}
      </div>
      <div className="relative mt-[33px] flex justify-center">
        <button type="button" aria-label="Previous" onClick={() => go(-1)} className="absolute top-[231px] left-[7px] text-[#484a49] hover:text-rk-text">
          <ChevronLeft width={24} height={24} strokeWidth={1.6} />
        </button>
        <EditorMock kind={active} />
        <button type="button" aria-label="Next" onClick={() => go(1)} className="absolute top-[231px] right-[9px] text-[#484a49] hover:text-rk-text">
          <ChevronRight width={24} height={24} strokeWidth={1.6} />
        </button>
      </div>
      <p className="mt-[34px] text-center text-[16px] leading-6">
        {captions[active][0]}
        <br />
        {captions[active][1]}
      </p>
    </section>
  );
}

function OnTheGo({ onStart }: { onStart: () => void }) {
  return (
    <section className={`${card} relative h-[622px] px-10 pt-[39px]`}>
      <ScoreMock />
      <h2 className="w-[260px] text-[24px] leading-7 font-bold">Improve your SEO writing on the go</h2>
      <ul className="mt-[33px] flex w-[250px] flex-col gap-4">
        {bullets.map((b) => (
          <li key={b} className="text-[16px] leading-6">
            <span className="mr-[13px] ml-[2px]">•</span>
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-[32px]">
        <GreenButton onClick={onStart}>Score and optimize your copy</GreenButton>
      </div>
    </section>
  );
}

function AddOns() {
  const icons = [<GoogleDocIcon key="g" />, <WordPressIcon key="w" />, <OfficeIcon key="o" />];
  return (
    <section className={`${card} px-10 pt-[37px] pb-[40px] text-center`}>
      <h2 className="text-[24px] leading-8 font-semibold">Available Add-Ons</h2>
      <p className="mt-[9px] text-[16px] leading-6">Optimize your content where it’s most convenient.</p>
      <div className="mt-[33px] flex justify-center gap-4">
        {addOns.map((a, i) => (
          <button
            key={a}
            type="button"
            className="flex h-10 items-center gap-[9px] rounded-md border border-[#d3d6d9] bg-[#f3f4f5] px-3 text-[16px] text-[#484a49] hover:bg-[#e7e9eb]"
          >
            {icons[i]}
            {a}
          </button>
        ))}
      </div>
    </section>
  );
}

function Avatar({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 74 74" width={74} height={74} className="rounded-full">
      <circle cx={37} cy={37} r={37} fill="#e9eaeb" />
      {i === 0 ? (
        <>
          <path d="M17 74c1-9 5-15 11-18l18 0c6 3 10 9 11 18z" fill="#2b2b2b" />
          <path d="M19 58c-4-26 4-44 19-44s23 16 18 44c-2 6-5 8-8 8l-20 0c-4 0-7-3-9-8z" fill="#262626" />
          <path d="M32 50h11v10c-2 3-9 3-11 0z" fill="#b9b9b9" />
          <ellipse cx={37.5} cy={37} rx={10.5} ry={13.5} fill="#cdcdcd" />
          <path d="M27 32c2-9 8-12 16-10 2 1 3 4 4 8-5-3-12-3-20 2z" fill="#262626" />
        </>
      ) : (
        <>
          <circle cx={37} cy={30} r={12} fill="#a9abaa" />
          <path d="M14 70c3-14 12-20 23-20s20 6 23 20z" fill="#a9abaa" />
        </>
      )}
    </svg>
  );
}

const LongArrow = ({ dir }: { dir: 1 | -1 }) => (
  <svg viewBox="0 0 42 16" width={42} height={16} className={dir < 0 ? "-scale-x-100" : ""}>
    <path d="M1 8h39M34 3l6 5-6 5" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Trusted() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const n = testimonials.length;
  return (
    <section className={`${card} flex h-[530px] flex-col items-center px-10 pt-[33px]`}>
      <h2 className="text-[24px] leading-8 font-semibold">Trusted By</h2>
      <div className="mt-[39px] flex items-center gap-[130px]">
        <button type="button" aria-label="Previous testimonial" onClick={() => setI((i - 1 + n) % n)} className="text-[#6a6c6a] hover:text-rk-text">
          <LongArrow dir={-1} />
        </button>
        <span className="text-[14px] font-bold">
          {i + 1} / {n}
        </span>
        <button type="button" aria-label="Next testimonial" onClick={() => setI((i + 1) % n)} className="text-[#6a6c6a] hover:text-rk-text">
          <LongArrow dir={1} />
        </button>
      </div>
      <blockquote className="mt-[26px] w-[600px] text-center text-[20px] leading-6 font-medium">{t.quote}</blockquote>
      <div className="mt-[33px]">
        <Avatar i={i} />
      </div>
      <div className="mt-[16px] text-[16px] leading-6">{t.name}</div>
      <div className="text-[16px] leading-6 text-[#6a6c6a]">{t.role}</div>
    </section>
  );
}

function GetStarted({ onStart }: { onStart: () => void }) {
  return (
    <section className={`${card} flex flex-col items-center px-10 pt-[40px] pb-[41px] text-center`}>
      <ClipboardIcon />
      <h2 className="mt-[13px] text-[24px] leading-8 font-bold">Get started!</h2>
      <p className="mt-[10px] w-[470px] text-[16px] leading-6">A smart writing editor that helps you optimize your copy for engagement and SEO.</p>
      <div className="mt-[32px]">
        <AnalyzeButton onClick={onStart} />
      </div>
    </section>
  );
}

function StartModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return (
    <Modal open={open} onClose={onClose} title="Analyze my text">
      <div className="w-[560px]">
        <p className="text-[14px] leading-5 text-rk-text-2">Paste your text to get SEO, readability, originality and tone of voice recommendations.</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start writing or paste your text here..."
          className="mt-3 h-[200px] w-full resize-none rounded-md border border-rk-border-strong p-3 text-[14px] outline-none focus:border-[#7a86f2]"
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[13px] text-rk-muted">{words} words</span>
          <button type="button" onClick={onClose} className="h-8 rounded-md bg-[#009f81] px-3 text-[14px] font-semibold text-white hover:bg-[#007c65]">
            Get recommendations
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function SwaLanding() {
  const [open, setOpen] = useState(false);
  const start = () => setOpen(true);
  return (
    <div className="px-[36px] pt-[40px]">
      <div className="mx-auto flex max-w-[980px] flex-col gap-4">
        <Hero onStart={start} />
        <FeatureCarousel />
        <OnTheGo onStart={start} />
        <AddOns />
        <Trusted />
        <GetStarted onStart={start} />
      </div>
      <StartModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
