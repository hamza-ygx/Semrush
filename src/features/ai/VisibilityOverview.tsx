"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode, type Ref } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { SendFeedback, HeaderLink } from "@/components/shell/PageHeader";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { Breadcrumbs, Info } from "@/components/ui/primitives";
import { ChatGptIcon, ChevronDown, CloseIcon, ExportIcon, FlagSE, FlagUK, FlagUS, GeminiIcon, GoogleIcon, SearchIcon } from "@/components/ui/icons";
import { voChart, voLlms, voNext, voTabs } from "./data";
import { TipBulb } from "./bits";
import { aiButton } from "./landing";
import { Gauge, PieGlyph, SparkUserGlyph, UpsellModal } from "./UpsellModal";
import { DateSelect, FlagDE, HowItWorksDrawer, MoreCountries, PlatformSelect } from "./VisibilityControls";

function BookIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden>
      <path d="M1.5 3h4.2c1 0 2.3.7 2.3 2v8.5c0-1-1.2-1.5-2.3-1.5H1.5zM14.5 3h-4.2C9.3 3 8 3.7 8 5v8.5c0-1 1.2-1.5 2.3-1.5h4.2z" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
      <path d="M3.5 6h2.3M3.5 8.5h2.3M10.2 6h2.3M10.2 8.5h2.3" stroke="currentColor" strokeWidth={1.2} />
    </svg>
  );
}

function WorldIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden>
      <circle cx={8} cy={8} r={6.8} fill="none" stroke="currentColor" strokeWidth={1.4} />
      <path d="M3 5.5c1.6.4 2.6 1.6 2.4 3-.2 1.1.9 1.5.9 2.8M9.4 1.6c-.4 1.2.2 2.2 1.4 2.4 1.1.2 1.7 1.2 1.1 2.4M10.7 10c.8.2 1.7.8 2.4 1.4" fill="none" stroke="currentColor" strokeWidth={1.2} />
    </svg>
  );
}

function HowIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden>
      <circle cx={8} cy={8} r={6.6} fill="none" stroke="currentColor" strokeWidth={1.3} />
      <path d="M6.3 6.3a1.7 1.7 0 1 1 2.5 1.5c-.5.3-.8.6-.8 1.2v.2" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
      <circle cx={8} cy={11.2} r={0.8} fill="currentColor" />
    </svg>
  );
}

const seg = "flex h-7 items-center gap-[6px] border-r border-[#d6d8d7] px-2 text-[14px] text-rk-text-2 last:border-r-0 hover:bg-rk-bg";

function Segmented<T extends string>({ items, value, onChange, className = "" }: { items: { key: T; label: ReactNode }[]; value: T; onChange: (v: T) => void; className?: string }) {
  return (
    <div className={`flex w-fit overflow-hidden rounded-md border border-[#d6d8d7] bg-white ${className}`}>
      {items.map((it) => (
        <button
          key={it.key}
          type="button"
          onClick={() => onChange(it.key)}
          className={`${seg} ${value === it.key ? "relative bg-[#e9ecf8] text-rk-text shadow-[inset_0_0_0_1px_#8e9ff0] hover:bg-[#e9ecf8]" : ""}`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

function HistoryTip({ onClose }: { onClose: () => void }) {
  return (
    <div role="dialog" aria-label="Historical data now available" className="absolute top-[36px] left-[341px] z-40 w-[400px] rounded-[7px] bg-[#dfcbf9] pt-[17px] pr-4 pb-[16px] pl-[17px] shadow-[0_2px_8px_rgba(25,27,35,0.12)]">
      <div className="flex gap-[14px]">
        <TipBulb className="mt-[1px]" />
        <div className="flex-1">
          <div className="text-[16px] leading-6 font-semibold text-rk-text">Historical data now available</div>
          <p className="mt-[5px] w-[280px] text-[14px] leading-5 text-rk-text-2">Get a deeper understanding of trends by viewing data for each month.</p>
          <button type="button" onClick={onClose} className="mt-[16px] h-7 rounded-md bg-white px-[9px] text-[14px] text-rk-text hover:bg-[#f4f0fb]">
            Got it
          </button>
        </div>
        <button type="button" aria-label="Close tip" onClick={onClose} className="-mt-[3px] h-5 text-[#6a6c6a] hover:text-rk-text">
          <CloseIcon width={14} height={14} />
        </button>
      </div>
    </div>
  );
}

function Header({ domain }: { domain: string }) {
  const [region, setRegion] = useState("world");
  const [tip, setTip] = useState(true);
  const [how, setHow] = useState(false);
  const [howSeen, setHowSeen] = useState(false);
  return (
    <div className="border-b border-rk-border px-8 pt-4 pb-[19px]">
      {how && <HowItWorksDrawer onClose={() => setHow(false)} />}
      <div className="flex items-center justify-between">
        <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "AI Visibility", href: routes.ai.overview }, { label: "Visibility Overview" }]} />
        <div className="flex items-center gap-5">
          <HeaderLink href="#user-manual" icon={<BookIcon />}>
            User manual
          </HeaderLink>
          <SendFeedback />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <h1 className="text-[20px] leading-7 font-semibold text-rk-text">
          Visibility Overview: <span className="text-rk-muted">{domain}</span>
        </h1>
        <div className="flex items-center gap-[9px]">
          <button
            type="button"
            onClick={() => {
              setHow(true);
              setHowSeen(true);
            }}
            className="relative flex items-center gap-[7px] text-[14px] text-rk-text-2 hover:text-rk-text"
          >
            <HowIcon />
            How it works
            {!howSeen && <span className="absolute -top-[4px] -right-[5px] h-[10px] w-[10px] rounded-full bg-[#ff8c00]" />}
          </button>
          <button type="button" className="ml-[6px] flex h-7 items-center gap-[7px] rounded-md border border-[#d6d8d7] bg-[#f5f6f6] px-[9px] text-[14px] text-rk-text-2 hover:bg-rk-hover">
            <ExportIcon width={16} height={16} />
            Export to PDF
          </button>
        </div>
      </div>
      <div className="relative mt-2 flex items-center gap-[13px]">
        <div className="flex">
        <Segmented
          value={region}
          onChange={setRegion}
          items={[
            {
              key: "world",
              label: (
                <span className="flex items-center gap-[8px]">
                  <WorldIcon />
                  Worldwide
                </span>
              ),
            },
            {
              key: "us",
              label: (
                <span className="flex items-center gap-[8px]">
                  <FlagUS />
                  US
                </span>
              ),
            },
            {
              key: "uk",
              label: (
                <span className="flex items-center gap-[8px]">
                  <FlagUK />
                  UK
                </span>
              ),
            },
            {
              key: "de",
              label: (
                <span className="flex items-center gap-[8px]">
                  <FlagDE />
                  DE
                </span>
              ),
            },
          ]}
          className="rounded-r-none"
        />
        <MoreCountries />
        </div>
        <PlatformSelect />
        <DateSelect />
        {tip && (
          <>
            <span className="absolute top-[4px] left-[483px] h-[13px] w-[13px] rounded-full bg-[#d6c2fb]" />
            <HistoryTip onClose={() => setTip(false)} />
          </>
        )}
      </div>
    </div>
  );
}

function Card({ children, className = "", innerRef }: { children: ReactNode; className?: string; innerRef?: Ref<HTMLElement> }) {
  return (
    <section ref={innerRef} className={`rounded-lg bg-white shadow-card ${className}`}>
      {children}
    </section>
  );
}

function CardHead({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex h-[38px] items-center justify-between border-b border-rk-border px-5 pb-[1px]">
      <h2 className="flex items-center gap-[6px] text-[16px] font-semibold text-rk-text">{children}</h2>
      {right}
    </div>
  );
}

function VisibilityGauge() {
  return (
    <Card className="h-[330px]">
      <CardHead>
        AI Visibility <Info className="-mt-1" />
      </CardHead>
      <div className="relative mt-[34px] flex justify-center">
        <svg viewBox="0 0 216 134" width={216} height={134} aria-hidden>
          <path d="M14.75 126.1A95 95 0 1 1 201.25 126.1" fill="none" stroke="#e9ebeb" strokeWidth={26} />
        </svg>
        <span className="absolute top-[85px] text-[32px] font-bold text-[#6a6c6a]">n/a</span>
      </div>
    </Card>
  );
}

function MainChart() {
  const [tab, setTab] = useState("main");
  const [range, setRange] = useState("6M");
  const [upsell, setUpsell] = useState(false);
  const [w, setW] = useState(741);
  const box = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const X = (x: number) => 72 + ((x - 426) / 649) * (w - 92);
  const Y = (v: number) => 286 - v * 18.1;
  const line = (vals: number[]) => voChart.xs.map((x, i) => `${i ? "L" : "M"}${X(x)} ${Y(vals[i])}`).join("");
  const metrics = [
    { label: "Mentions", color: "#6167e6", value: 0 },
    { label: "Citations", color: "#3ddcb0", value: 1 },
    { label: "Cited Pages", color: "#b58af2", value: 1 },
  ];
  return (
    <Card className="relative h-[330px]" innerRef={box}>
      <UpsellModal open={upsell} onClose={() => setUpsell(false)} />
      <div className="flex h-11 items-center justify-between border-b border-rk-border pr-5 pl-5">
        <Segmented
          value={tab}
          onChange={(k) => (k === "main" ? setTab(k) : setUpsell(true))}
          items={[
            { key: "main", label: "Main Metrics" },
            { key: "aud", label: "Monthly Audience" },
            { key: "vis", label: "AI Visibility" },
          ]}
        />
        <div className="flex items-center gap-4 text-[14px]">
          {["1M", "6M", "All time"].map((r) => (
            <button key={r} type="button" onClick={() => setRange(r)} className={`relative h-11 ${range === r ? "font-medium text-rk-text" : "text-rk-text"}`}>
              {r}
              {range === r && <span className="absolute right-0 bottom-[8px] left-0 h-[2px] bg-rk-link" />}
            </button>
          ))}
        </div>
      </div>
      <div className="flex px-5 pt-[16px]">
        {metrics.map((m, i) => (
          <div key={m.label} className={`flex h-[56px] flex-col ${i ? "border-l border-rk-border pl-[16px]" : ""} ${i < 2 ? "w-[127px] pr-4" : ""}`}>
            <span className="flex items-center gap-[5px] text-[14px] text-rk-text">
              <span className="h-[9px] w-[9px] rounded-full" style={{ background: m.color }} />
              {m.label}
              <Info className="ml-[2px]" />
            </span>
            <span className="mt-[9px] text-[24px] leading-6 font-semibold text-rk-number">{m.value}</span>
          </div>
        ))}
      </div>
      <svg width={w} height={330} className="pointer-events-none absolute top-0 left-0" aria-hidden>
        {[0, 2, 4, 6, 8].map((v) => (
          <g key={v}>
            <line x1={X(426)} x2={X(1075)} y1={Y(v)} y2={Y(v)} stroke="#e0e2e1" />
            <text x={58} y={Y(v) + 4} textAnchor="end" fontSize={12} fill="#6a6c6a">
              {v}
            </text>
          </g>
        ))}
        {[471, 583].map((x) => (
          <line key={x} x1={X(x)} x2={X(x)} y1={Y(8)} y2={Y(0)} stroke="#d6d8d7" strokeDasharray="3 3" />
        ))}
        <rect x={X(1025)} y={Y(8)} width={10} height={Y(0) - Y(8)} fill="#e0e2e1" opacity={0.7} />
        {voChart.labels.map((l) => (
          <text key={l.t} x={X(l.x)} y={309} textAnchor="middle" fontSize={12} fill="#6a6c6a">
            {l.t}
          </text>
        ))}
        <path d={line(voChart.citations)} fill="none" stroke="#3ddcb0" strokeWidth={2.5} />
        <path d={line(voChart.citedPages)} fill="none" stroke="#b58af2" strokeWidth={2.5} />
        <path d={line(voChart.mentions)} fill="none" stroke="#6167e6" strokeWidth={3} />
      </svg>
    </Card>
  );
}

function LlmIcon({ k }: { k: string }) {
  if (k === "chatgpt") return <ChatGptIcon width={16} height={16} />;
  if (k === "gemini") return <GeminiIcon width={16} height={16} />;
  return <GoogleIcon width={16} height={16} />;
}

function Distribution() {
  const [tab, setTab] = useState("mentions");
  return (
    <Card className="h-[263px]">
      <CardHead>Distribution by LLM</CardHead>
      <div className="px-5 pt-5">
        <Segmented
          value={tab}
          onChange={setTab}
          items={[
            { key: "mentions", label: "Mentions" },
            { key: "pages", label: "Cited Pages" },
          ]}
        />
        <div className="mt-[4px] flex flex-col">
          {voLlms.map((l) => (
            <div key={l.name} className="flex h-[31px] items-center text-[13px] text-rk-text">
              <span className="flex w-[96px] items-center gap-[4px] pl-0">
                <LlmIcon k={l.icon} />
                {l.name}
              </span>
              <span className="h-[18px] w-[267px] bg-[#eeeff1] xl:w-auto xl:flex-1" />
              <span className="w-[60px] text-right text-rk-text-2">{l.share}</span>
              <span className="w-[60px] text-right text-rk-text-2">{l.count}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function EmptyArt() {
  return (
    <svg viewBox="0 0 90 84" width={90} height={84} aria-hidden>
      <path d="M40 4c9-3 14 5 22 6s18 2 20 12-4 16-1 25 5 18-4 25-18 3-27 7-18 6-26-1-4-15-10-21-12-12-8-22 9-10 16-16 9-12 18-15z" fill="#e6e7eb" />
      <g transform="rotate(-9 45 42)">
        <rect x={13} y={14} width={64} height={56} rx={4} fill="#fff" stroke="#5d5f68" strokeWidth={1.4} />
        <path d="M13 26V18a4 4 0 0 1 4-4h56a4 4 0 0 1 4 4v8z" fill="#5d5f68" />
        <circle cx={19} cy={20} r={2} fill="#fff" />
        <circle cx={25} cy={20} r={2} fill="#fff" />
        <path d="M36 31v34M56 29v34M20 50h52" stroke="#5d5f68" strokeWidth={1} />
        <path d="M10 22v48a4 4 0 0 0 4 4h58" fill="none" stroke="#5d5f68" strokeWidth={1.2} />
      </g>
    </svg>
  );
}

function Countries() {
  return (
    <Card className="h-[263px]">
      <CardHead>Mentions by Country</CardHead>
      <div className="flex flex-col items-center pt-[43px]">
        <EmptyArt />
        <div className="mt-[7px] text-[16px] leading-6 font-semibold text-rk-text-2">We have no data to show</div>
        <div className="mt-[2px] text-[14px] leading-5 text-rk-muted">Try changing your filters</div>
      </div>
    </Card>
  );
}

const nextIcons = [
  <svg key="a" viewBox="0 0 16 16" width={16} height={16} aria-hidden>
    <path d="M2 4h9M2 8h7M2 12h5M10 11l2 2 3-4" fill="none" stroke="#8e4ce3" strokeWidth={1.5} strokeLinecap="round" />
  </svg>,
  <svg key="b" viewBox="0 0 16 16" width={16} height={16} aria-hidden>
    <rect x={1.5} y={2.5} width={13} height={11} rx={1} fill="none" stroke="#8e4ce3" strokeWidth={1.4} />
    <circle cx={9} cy={9} r={2.3} fill="none" stroke="#8e4ce3" strokeWidth={1.4} />
    <path d="m10.8 10.8 2 2" stroke="#8e4ce3" strokeWidth={1.4} />
  </svg>,
  <svg key="c" viewBox="0 0 16 16" width={16} height={16} aria-hidden>
    <path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" fill="none" stroke="#8e4ce3" strokeWidth={1.4} />
    <path d="M8 5v6M5 8h6" stroke="#8e4ce3" strokeWidth={1.4} />
  </svg>,
  <svg key="d" viewBox="0 0 16 16" width={16} height={16} aria-hidden>
    <path d="M2 13 6 8l3 3 5-7" fill="none" stroke="#8e4ce3" strokeWidth={1.5} strokeLinecap="round" />
  </svg>,
];

function WhatsNext() {
  const [open, setOpen] = useState(true);
  const [start, setStart] = useState(0);
  const shown = voNext.slice(start, start + 3);
  return (
    <Card className="mt-[37px] overflow-hidden">
      <div className="flex h-[52px] items-center justify-between bg-[#ece6fb] px-5">
        <h2 className="text-[16px] font-semibold text-rk-text">What&apos;s Next?</h2>
        <button type="button" onClick={() => setOpen((o) => !o)} className="flex items-center gap-[6px] text-[14px] text-rk-text-2 hover:text-rk-text">
          {open ? "Collapse" : "Expand"}
          <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden>
            <path d={open ? "m5 3 3 3 3-3M5 13l3-3 3 3" : "m5 6 3-3 3 3M5 10l3 3 3-3"} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="relative flex gap-[10px] pt-[18px] pr-[30px] pb-[18px] pl-[29px]">
          {start > 0 && (
            <button type="button" aria-label="Previous" onClick={() => setStart(0)} className="absolute top-[88px] left-[6px] text-rk-muted hover:text-rk-text">
              <svg viewBox="0 0 16 16" width={20} height={20}>
                <path d="m10 3-5 5 5 5" fill="none" stroke="currentColor" strokeWidth={1.6} />
              </svg>
            </button>
          )}
          {shown.map((n, i) => (
            <div key={n.title} className="flex h-[192px] w-[328px] flex-col rounded-lg border border-[#c9dcf6] px-4 pt-[15px] pb-[17px]">
              <div className="flex items-center gap-2 text-[14px] font-semibold text-rk-text">
                {nextIcons[(start + i) % nextIcons.length]}
                {n.title}
              </div>
              <p className="mt-[8px] text-[14px] leading-5 text-rk-text">{n.text}</p>
              <Link href={n.href} className="mt-auto pl-[8px] text-[14px] font-medium text-rk-link hover:text-rk-link-hover">
                {n.link}
              </Link>
            </div>
          ))}
          {start === 0 && (
            <button type="button" aria-label="Next" onClick={() => setStart(1)} className="absolute top-[86px] right-[6px] text-rk-muted hover:text-rk-text">
              <svg viewBox="0 0 16 16" width={20} height={20}>
                <path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth={1.6} />
              </svg>
            </button>
          )}
        </div>
      )}
    </Card>
  );
}

function ResponseIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round">
        <path d="M2.5 2.5h8v11h-6a2 2 0 0 1-2-2z" />
        <path d="M10.5 6.5h3v5a2 2 0 0 1-2 2h-1M5 5.5h3M5 8h3M5 10.5h3" />
      </g>
    </svg>
  );
}

function BrandsIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
        <circle cx="6" cy="6" r="2.3" />
        <path d="M1.8 13.5c.4-2.2 2.1-3.5 4.2-3.5s3.8 1.3 4.2 3.5M10.5 2.3a2 2 0 1 1 1.3 3.2M12 10c1.2.4 2 1.6 2.2 3.5" />
      </g>
    </svg>
  );
}

function InsightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
        <circle cx="7" cy="7" r="5" />
        <path d="m10.8 10.8 3.2 3.2M5.2 8.6V7.8M7 8.6V5.4M8.8 8.6V6.6" />
      </g>
    </svg>
  );
}

const rowActions: [string, () => ReactNode][] = [
  ["View response", ResponseIcon],
  ["Brands", BrandsIcon],
  ["Analyze", () => <InsightIcon />],
];

function TopicsTable() {
  const [expanded, setExpanded] = useState(true);
  const [mode, setMode] = useState("topics");
  return (
    <Card className="mt-[19px]">
      <div className="flex h-[44px] items-center justify-between px-5 pt-[2px]">
        <h3 className="text-[16px] font-semibold text-rk-text">
          Your Performing Topics <span className="font-normal text-rk-muted">1–1 (1)</span>
        </h3>
        <button type="button" className="flex h-7 items-center gap-[6px] rounded-md border border-[#d6d8d7] bg-white px-2 text-[14px] text-rk-text-2 hover:bg-rk-bg">
          <ExportIcon width={16} height={16} />
          Export
        </button>
      </div>
      <div className="flex items-center gap-2 px-5 pt-[21px] pb-[20px]">
        <Segmented
          value={mode}
          onChange={setMode}
          items={[
            {
              key: "topics",
              label: (
                <>
                  Topics <span className="text-rk-muted">1</span>
                </>
              ),
            },
            {
              key: "prompts",
              label: (
                <>
                  Prompts <span className="text-rk-muted">1</span>
                </>
              ),
            },
          ]}
        />
        <label className="flex h-7 w-[228px] items-center rounded-md border border-[#d6d8d7] bg-white">
          <input aria-label="Filter by topic" placeholder="Filter by topic" className="h-full min-w-0 flex-1 rounded-l-md px-2 text-[14px] outline-none placeholder:text-rk-muted" />
          <span className="flex h-full w-[28px] items-center justify-center border-l border-[#d6d8d7] text-rk-text-2">
            <SearchIcon width={16} height={16} />
          </span>
        </label>
        <Popover
          panelClassName="min-w-[160px]"
          trigger={({ toggle }) => (
            <button type="button" onClick={toggle} className="flex h-7 items-center gap-[6px] rounded-md border border-[#d6d8d7] bg-white pr-[7px] pl-2 text-[14px] text-rk-muted hover:bg-rk-bg">
              AI Volume
              <ChevronDown width={16} height={16} className="text-rk-text" />
            </button>
          )}
        >
          {(close) =>
            ["1K+", "500–1K", "100–500", "< 100"].map((o) => (
              <MenuItem key={o} onClick={close}>
                {o}
              </MenuItem>
            ))
          }
        </Popover>
        <button type="button" className="ml-[9px] flex items-center gap-[9px] text-[14px] font-medium text-rk-link hover:text-rk-link-hover">
          <span className="text-[18px] leading-none font-normal">+</span>
          Add filter
        </button>
      </div>
      <div className="grid h-10 grid-cols-[315px_152px_168px_152px_1fr] items-center bg-[#f5f6f6] text-[12px] text-rk-text-2">
        <span className="pl-5">Topic</span>
        <span className="flex h-full items-center justify-between bg-[#e9eaea] pr-5 pl-3">
          Visibility
          <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden>
            <path d="M2.5 4h11M2.5 8h7M2.5 12h3.5" stroke="#6a6c6a" strokeWidth={1.4} />
          </svg>
        </span>
        <span className="pl-3">Your Mentions</span>
        <span className="pl-[9px]">AI Volume</span>
        <span className="pl-[7px]">Intent</span>
      </div>
      <div className="grid h-[60px] grid-cols-[315px_152px_168px_152px_1fr] items-center border-b border-rk-border bg-[#f5f6f6] text-[14px]">
        <div className="flex items-start gap-[10px] pl-5">
          <button type="button" aria-label={expanded ? "Collapse topic" : "Expand topic"} onClick={() => setExpanded((e) => !e)} className="mt-[3px] text-rk-text-2">
            <ChevronDown width={16} height={16} className={expanded ? "" : "-rotate-90"} />
          </button>
          <span className="leading-[18px] text-rk-text">
            <FlagSE className="mr-[6px] inline-block align-[-1px]" />
            Personbil och förmånsbil –
            <br />
            kostnader
            <svg viewBox="0 0 16 16" width={14} height={14} className="ml-[5px] inline-block text-rk-muted" aria-hidden>
              <path d="M6 1.5h4v3H6zM1.5 11.5h4v3h-4zM10.5 11.5h4v3h-4zM8 4.5V8M3.5 11.5V8h9v3.5" fill="none" stroke="currentColor" strokeWidth={1.2} />
            </svg>
          </span>
        </div>
        <span className="pr-[16px] text-right text-rk-text">0</span>
        <span className="pr-[18px] text-right text-rk-text">0</span>
        <span className="flex items-center justify-between pr-[15px] pl-[8px]">
          <svg viewBox="0 0 52 30" width={52} height={30} aria-hidden>
            <path d="M0 4c8 4 14 2 18 6s8-2 14-4 12-2 20-2v26H0z" fill="#dbe1fb" />
            <path d="M0 4c8 4 14 2 18 6s8-2 14-4 12-2 20-2" fill="none" stroke="#8e9ff0" strokeWidth={1.2} />
          </svg>
          1.9K
        </span>
        <span className="flex items-center justify-between pr-[26px] pl-[7px]">
          <span className="flex h-[8px] w-[127px] overflow-hidden rounded-full">
            <span className="w-[76%] bg-[#a4b2f5]" />
            <span className="w-[5%] bg-[#3ddcb0]" />
            <span className="w-[12%] bg-[#c9a4fb]" />
            <span className="w-[4%] bg-[#ffb400]" />
            <span className="w-[3%] bg-[#ff9bd8]" />
          </span>
          <button type="button" className="flex h-7 items-center gap-[6px] rounded-md bg-[#1b1e1a] px-[9px] text-[14px] font-medium text-white hover:bg-[#2b2e38]">
            <InsightIcon />
            Monitor
          </button>
        </span>
      </div>
      {expanded && (
        <div className="px-5 pt-[13px]">
          <div className="rounded-md bg-white shadow-[0_1px_4px_rgba(25,27,35,0.12)]">
            <div className="grid h-[32px] grid-cols-[270px_320px_120px_90px_1fr] items-center border-b border-rk-border px-3 text-[12px] text-rk-text-2">
              <span>Prompt</span>
              <span>AI Response</span>
              <span>Your Brand</span>
              <span className="flex items-center gap-[24px]">
                Brands
                <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden>
                  <path d="M2.5 4h11M2.5 8h7M2.5 12h3.5" stroke="#6a6c6a" strokeWidth={1.4} />
                </svg>
              </span>
              <span>Sources</span>
            </div>
            <div className="grid h-[100px] grid-cols-[270px_320px_120px_90px_1fr] items-start px-3 pt-[8px] text-[14px] leading-5">
              <span className="text-rk-text">förmånsbil sjukskrivning</span>
              <span className="flex gap-[8px]">
                <GoogleIcon width={16} height={16} className="mt-[2px] shrink-0" />
                <span className="text-rk-text">
                  Vid en sjukskrivning behåller du förmånsbilen som standard, men förmånsvärdet kan justeras om du har …
                  <a href="#full-response" className="dotted-underline mt-[4px] block text-rk-text-2">
                    View full response
                  </a>
                </span>
              </span>
              <span>
                <span className="ml-[8px] rounded-[4px] bg-[#e0e2e1] px-[6px] text-[12px] text-rk-text-2">Cited</span>
              </span>
              <span className="pr-[34px] text-right text-rk-text">0</span>
              <span className="flex items-start justify-between">
                <a href="#sources" className="pl-[66px] text-rk-link">
                  6
                </a>
                <span className="flex gap-[8px]">
                  {rowActions.map(([t, Icon]) => (
                    <button key={t} type="button" aria-label={t} className="flex h-7 w-7 items-center justify-center rounded-md border border-[#d6d8d7] bg-[#f5f6f6] text-rk-text-2 hover:bg-rk-hover">
                      <Icon />
                    </button>
                  ))}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
      <Promo />
    </Card>
  );
}

const promoBubbles: [number, number, number, string, string, number][] = [
  [12, 99, 9, "#ffc9f3", "#e27ad6", 1],
  [51, 71, 28, "#a8f0d6", "#3fbf95", 0.8],
  [108, 94, 46, "#a8dcff", "#3fa2e6", 0.85],
  [125, 27, 25, "#e8d8ff", "#b58af2", 1],
];

function Promo() {
  return (
    <div className="relative mt-[13px] h-[276px] overflow-hidden rounded-b-lg">
      <div className="absolute inset-y-0 right-0 w-[600px] bg-[radial-gradient(ellipse_360px_260px_at_70%_40%,#e9f4ff,transparent_70%),radial-gradient(ellipse_300px_220px_at_30%_80%,#f4ecff,transparent_70%)]" />
      <div className="relative w-[500px] pt-[40px] pl-10">
        <h3 className="text-[24px] leading-8 font-semibold whitespace-nowrap text-rk-text">Unlock your full search potential</h3>
        <p className="mt-[8px] max-w-[410px] text-[16px] leading-6 text-rk-text">
          Get the complete view of your brand’s performance in traditional and AI search. {brand.name} One connects SEO insights with AI visibility data to help you stay ahead.
        </p>
        <button type="button" className={`mt-[20px] h-10 rounded-md px-[44px] text-[16px] font-medium whitespace-nowrap ${aiButton}`}>
          Switch to {brand.name} One
        </button>
      </div>
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[560px]">
        <div className="absolute top-[156px] left-[35px] h-[140px] w-[120px] -rotate-[10deg] rounded-xl bg-white px-3 pt-[12px] shadow-[0_4px_20px_rgba(96,92,190,0.12)]">
          <div className="text-[14px] text-[#8b8d8c]">Insights</div>
          <div className="mt-[10px] flex h-[26px] items-center gap-2 rounded-md border border-[#e6e2fb] px-2">
            <PieGlyph />
            <span className="h-[5px] w-[40px] rounded bg-[#edefef]" />
          </div>
          <div className="mt-[8px] flex h-[26px] items-center gap-2 rounded-md border border-[#e6e2fb] px-2">
            <SparkUserGlyph />
            <span className="h-[5px] w-[40px] rounded bg-[#edefef]" />
          </div>
        </div>
        <div className="absolute top-[101px] left-[125px] h-[200px] w-[150px] -rotate-[4deg] rounded-xl bg-white px-3 pt-[16px] shadow-[0_4px_20px_rgba(96,92,190,0.12)]">
          <div className="text-[14px] text-[#8b8d8c]">Share of Voice</div>
          <svg viewBox="0 0 130 150" width={130} height={150} className="mt-[4px] overflow-visible">
            {promoBubbles.map(([cx, cy, r, fill, mark, op]) => (
              <g key={cx}>
                <circle cx={cx} cy={cy} r={r} fill={fill} opacity={op} />
                <path d={`M${cx - 3} ${cy}h6M${cx} ${cy - 3}v6`} stroke={mark} strokeWidth={0.8} />
              </g>
            ))}
          </svg>
        </div>
        <div className="absolute top-[64px] left-[252px] h-[230px] w-[210px] rotate-[3deg] rounded-xl bg-white pt-[25px] pr-4 pl-[23px] shadow-[0_4px_20px_rgba(96,92,190,0.12)]">
          <div className="text-[15px] text-[#8b8d8c]">Prompt Research</div>
          <div className="mt-[13px] text-[12px] text-[#8b8d8c]">AI Volume</div>
          <div className="mt-[9px] text-[20px] font-semibold text-[#8b8d8c]">
            34.6K <span className="text-[12px] font-normal text-[#1cc08a]">+16%</span>
          </div>
          <svg viewBox="0 0 130 60" width={150} height={60} preserveAspectRatio="none" className="mt-[6px]">
            <path d="M0 50c10-4 14-26 26-24s12 18 24 16 14-14 24-18 14 10 26 4 16-12 30-16" fill="none" stroke="#8fd7f5" strokeWidth={1.6} />
          </svg>
        </div>
        <div className="absolute top-[110px] left-[388px] h-[200px] w-[200px] rotate-[8deg] rounded-xl bg-white px-4 pt-[25px] shadow-[0_4px_20px_rgba(96,92,190,0.12)]">
          <div className="text-[15px] text-[#8b8d8c]">AI Visibility Overview</div>
          <div className="mt-[27px] flex items-start">
            <Gauge size={110} />
            <div className="mt-[11px] ml-[14px] flex flex-col gap-[9px]">
              <ChatGptIcon width={16} height={16} />
              <GoogleIcon width={16} height={16} />
              <GeminiIcon width={16} height={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VisibilityOverview({ domain }: { domain: string }) {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <Header domain={domain} />
      <div className="px-8 pt-[17px] pb-[119px]">
        <div className="grid grid-cols-[306px_1fr] gap-4">
          <VisibilityGauge />
          <MainChart />
        </div>
        <div className="mt-[21px] grid grid-cols-2 gap-4">
          <Distribution />
          <Countries />
        </div>
        <WhatsNext />
        <h2 className="mt-[38px] text-[20px] leading-7 font-semibold text-rk-text">Topics &amp; Sources</h2>
        <div className="mt-[18px] grid h-[63px] grid-cols-5 overflow-hidden rounded-lg border border-rk-border bg-white">
          {voTabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setTab(i)}
              className={`flex items-start justify-between border-r border-rk-border px-5 pt-[12px] text-left text-[14px] leading-5 font-medium text-rk-text last:border-r-0 ${
                tab === i ? "rounded-l-lg bg-[#eef1fb] shadow-[inset_0_0_0_1px_#8e9ff0]" : "hover:bg-rk-bg"
              }`}
            >
              {t.label}
              {t.count != null && <span className="font-normal text-rk-muted">{t.count}</span>}
            </button>
          ))}
        </div>
        <TopicsTable />
      </div>
    </div>
  );
}
