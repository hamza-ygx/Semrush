"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { Popover, MenuItem, LinkSelect } from "@/components/ui/Popover";
import { Breadcrumbs, Info } from "@/components/ui/primitives";
import { ChevronDown, CloseIcon, ExportIcon, FeedbackIcon, PlusIcon } from "@/components/ui/icons";

export type AiBrand = { name: string; color: string; you?: boolean };

export const sampleBrands: AiBrand[] = [
  { name: "Warby parker", color: "#6167e6", you: true },
  { name: "Ac lens", color: "#2bd9a8" },
  { name: "Zenni optical", color: "#c38aff" },
  { name: "Glassesusa", color: "#ffb301" },
  { name: "Eyebuydirect", color: "#ff6973" },
];

export const aiPlatforms = ["All AI Platforms", "ChatGPT", "Google AI Overview", "Google AI Mode", "Gemini", "Perplexity"] as const;
export const sampleDates = ["Sep 17, 2026", "Sep 10, 2026", "Sep 3, 2026", "Aug 27, 2026", "Aug 20, 2026"] as const;

const aiGradient = "bg-[linear-gradient(90deg,#a55ff7_0%,#8d65f0_55%,#7069dc_100%)] hover:brightness-95";

function QuestionIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden>
      <circle cx={8} cy={8} r={6.6} fill="none" stroke="currentColor" strokeWidth={1.4} />
      <path d="M6.2 6.3a1.8 1.8 0 1 1 2.6 1.6c-.5.3-.8.6-.8 1.2v.3" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
      <circle cx={8} cy={11.3} r={0.85} fill="currentColor" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden>
      <path d="M5.5 2.5 2.5 5.5l3 3M2.8 5.5h6.2a4.3 4.3 0 0 1 0 8.6H6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BulbArt() {
  return (
    <svg viewBox="0 0 40 40" width={38} height={38} aria-hidden>
      <path
        d="M20 2l4 3.2 5-.6 1.8 4.7 4.7 1.8-.6 5L38 20l-3.2 4 .6 5-4.7 1.8-1.8 4.7-5-.6L20 38l-4-3.2-5 .6-1.8-4.7-4.7-1.8.6-5L2 20l3.2-4-.6-5 4.7-1.8L11 4.6l5 .6z"
        fill="#c9a4fb"
      />
      <path d="M20 9.5a8 8 0 0 0-4.6 14.6c.8.6 1.2 1.4 1.2 2.3v1.3h6.8v-1.3c0-.9.4-1.7 1.2-2.3A8 8 0 0 0 20 9.5z" fill="#efe4ff" stroke="#4d2a86" strokeWidth={1.3} />
      <path d="M16.8 30.3h6.4M17.6 32.8h4.8M18.3 27.5l-.8-7 2.5 1.8 2.5-1.8-.8 7" fill="none" stroke="#4d2a86" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 14.5a6.5 6.5 0 0 1 4-3.4" fill="none" stroke="#fff" strokeWidth={1.3} strokeLinecap="round" />
    </svg>
  );
}

function LlmTip({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-label="View data for all LLMs at once"
      className="absolute top-[-2px] left-[131px] z-40 w-[405px] rounded-[7px] border border-[#8f8ee6] bg-[#dfcbf9] pt-[18px] pr-4 pb-[17px] pl-[17px] shadow-[0_2px_8px_rgba(25,27,35,0.12)]"
    >
      <div className="flex gap-[14px]">
        <BulbArt />
        <div className="flex-1">
          <div className="text-[16px] leading-6 font-semibold text-rk-text">View data for all LLMs at once</div>
          <p className="mt-[1px] text-[14px] leading-5 text-rk-text-2">You can now see how your and competitor brands perform across all AI platforms.</p>
          <button type="button" onClick={onClose} className="mt-[17px] h-7 rounded-md bg-white px-[9px] text-[14px] text-rk-text hover:bg-[#f4f0fb]">
            Got it
          </button>
        </div>
        <button type="button" aria-label="Close tip" onClick={onClose} className="-mt-[3px] h-5 text-[#6c6e79] hover:text-rk-text">
          <CloseIcon width={14} height={14} />
        </button>
      </div>
    </div>
  );
}

function BrandChip({ b, onRemove }: { b: AiBrand; onRemove?: () => void }) {
  return (
    <span className="inline-flex h-[30px] items-center gap-[6px] rounded-full border border-[#d1d3d9] bg-white pr-[7px] pl-[7px] text-[14px] text-rk-text">
      <span className="h-3 w-3 rounded-full" style={{ background: b.color }} />
      {b.name}
      {b.you ? (
        <span className="ml-[1px] rounded-[9px] bg-[#e4e3fa] px-[8px] text-[12px] leading-[17px] text-[#5a50c8]">you</span>
      ) : (
        <button type="button" aria-label={`Remove ${b.name}`} onClick={onRemove} className="-ml-[1px] text-[#a9abb6] hover:text-rk-text">
          <CloseIcon width={11} height={11} />
        </button>
      )}
    </span>
  );
}

export function AiSampleFrame({
  report,
  children,
  llmTip = false,
  domain = "warbyparker.com",
  backHref = routes.ai.overview,
  filters = true,
}: {
  report: string;
  children: ReactNode;
  llmTip?: boolean;
  domain?: string;
  backHref?: string;
  filters?: boolean;
}) {
  const [tip, setTip] = useState(llmTip);
  const [brands, setBrands] = useState(sampleBrands);
  const [removed, setRemoved] = useState<AiBrand[]>([]);
  const [stuck, setStuck] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setStuck(!!bar.current && bar.current.getBoundingClientRect().top <= -10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div>
      <div className="border-b border-[#ece6fb] bg-[linear-gradient(90deg,#f8f1fd_0%,#f3f3fd_55%,#eff5ff_100%)] px-8 pt-[20px] pb-[16px]">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[16px] leading-5 font-semibold text-rk-text">You’re viewing a sample report. Want to check your brand?</div>
            <form className="mt-[13px] flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                aria-label="Enter your domain"
                placeholder="Enter your domain"
                className="h-7 w-[260px] rounded-[4px] border border-[#dcdae3] bg-white px-2 text-[14px] text-rk-text outline-none placeholder:text-[#8a8e9b] focus:border-[#a55ff7]"
              />
              <button type="submit" className={`h-7 rounded-[4px] px-2 text-[14px] font-medium text-white ${aiGradient}`}>
                Start tracking
              </button>
            </form>
          </div>
          <Link href={backHref} className="mt-[1px] mr-[9px] flex items-center gap-[8px] text-[14px] leading-5 text-rk-link hover:text-rk-link-hover">
            <BackIcon />
            Back
          </Link>
        </div>
      </div>

      <div className="border-b border-rk-border px-8 pt-[19px] pb-[29px]">
        <div className="flex items-center justify-between">
          <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "AI Visibility", href: routes.ai.overview }, { label: report }]} />
          <div className="flex items-center gap-[20px]">
            <a href="#how-we-gather-data" className="flex items-center gap-[4px] text-[14px] leading-5 text-rk-link hover:text-rk-link-hover">
              <QuestionIcon />
              How we gather data
            </a>
            <a href="#send-feedback" className="flex items-center gap-[6px] text-[14px] leading-5 text-rk-link hover:text-rk-link-hover">
              <FeedbackIcon />
              Send feedback
            </a>
          </div>
        </div>
        <div className="mt-[10px] flex items-center justify-between">
          <h1 className="flex items-center gap-[9px] text-[20px] leading-7 font-semibold text-rk-text">
            {report}:
            <Popover
              panelClassName="min-w-[220px]"
              trigger={({ toggle, open }) => (
                <button type="button" onClick={toggle} className="flex items-center gap-[5px] font-semibold text-rk-link hover:text-rk-link-hover">
                  {domain}
                  <ChevronDown width={16} height={16} className={open ? "rotate-180" : ""} />
                </button>
              )}
            >
              {(close) => (
                <>
                  <MenuItem active onClick={close}>
                    {domain}
                  </MenuItem>
                  <MenuItem onClick={close}>
                    <PlusIcon width={14} height={14} />
                    Add brand profile
                  </MenuItem>
                </>
              )}
            </Popover>
          </h1>
          <div className="flex items-center gap-2">
            <button type="button" className={`flex h-7 items-center gap-[8px] rounded-[6px] pr-[5px] pl-[9px] text-[14px] font-medium text-white ${aiGradient}`}>
              Add brand profile
              <span className="rounded-[9px] bg-white px-[6px] text-[13px] leading-[18px] font-semibold text-rk-text">0/0</span>
            </button>
            <button
              type="button"
              className="flex h-7 items-center gap-[7px] rounded-[6px] border border-[#c9cbd1] bg-[#eceeef] px-[8px] text-[14px] text-rk-text-2 hover:bg-rk-hover"
            >
              <ExportIcon width={16} height={16} />
              Export to PDF
            </button>
          </div>
        </div>
        <div className="mt-[10px] flex items-center gap-[4px] text-[14px] leading-5 text-rk-text">
          Target:
          <span className="text-rk-link">Worldwide · English</span>
          <Info className="ml-[4px]" />
        </div>
      </div>

      {filters && (
        <div
          ref={bar}
          data-testid="ai-filter-bar"
          className={`sticky top-[-11px] z-30 bg-rk-bg px-8 pt-[17px] pb-[9px] ${stuck ? "shadow-[0_1px_0_#e6e8e8,0_2px_6px_rgba(25,27,35,0.05)]" : ""}`}
        >
          <div className="flex flex-wrap items-center gap-2">
            {brands.map((b) => (
              <BrandChip
                key={b.name}
                b={b}
                onRemove={() => {
                  setBrands((all) => all.filter((x) => x.name !== b.name));
                  setRemoved((r) => [...r, b]);
                }}
              />
            ))}
            <Popover
              panelClassName="min-w-[200px]"
              trigger={({ toggle }) => (
                <button
                  type="button"
                  aria-label="Add competitor"
                  onClick={toggle}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c9cbd1] bg-[#eceeef] text-rk-text-2 hover:bg-rk-hover"
                >
                  <PlusIcon width={14} height={14} />
                </button>
              )}
            >
              {(close) =>
                removed.length ? (
                  removed.map((b) => (
                    <MenuItem
                      key={b.name}
                      onClick={() => {
                        setBrands((all) => sampleBrands.filter((x) => x.name === b.name || all.some((a) => a.name === x.name)));
                        setRemoved((r) => r.filter((x) => x.name !== b.name));
                        close();
                      }}
                    >
                      <span className="h-3 w-3 rounded-full" style={{ background: b.color }} />
                      {b.name}
                    </MenuItem>
                  ))
                ) : (
                  <div className="px-3 py-2 text-[14px] text-rk-muted">All competitors are shown</div>
                )
              }
            </Popover>
          </div>
          <div className="relative mt-[8px] flex items-center gap-[9px]">
            <LinkSelect value={aiPlatforms[0]} options={aiPlatforms} panelClassName="min-w-[200px]" />
            {tip && <span className="absolute top-[11px] left-[114px] h-[9px] w-[9px] rounded-full bg-[#c9a4fb]" />}
            <LinkSelect value={sampleDates[0]} options={sampleDates} />
            <Info className="ml-[2px]" />
            {tip && <LlmTip onClose={() => setTip(false)} />}
          </div>
        </div>
      )}

      <div className={`px-8 ${filters ? "pt-[15px]" : "pt-[21px]"}`}>{children}</div>
    </div>
  );
}
