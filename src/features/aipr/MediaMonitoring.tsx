"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { Popover, MenuItem } from "@/components/ui/Popover";
import { ChevronDown, ExportIcon, ExternalIcon, GearIcon, InfoIcon, PlusIcon } from "@/components/ui/icons";
import { landings, mentions, mmAge, mmMetrics, mmOutlets, mmQueries, mmReach, mmSentimentBreakdown, mmSentiments, mmSources, type Mention, type Sentiment } from "./data";
import { PrHero, TrialButton } from "./Landing";

const HASH = "#mention-browser";

function subscribeHash(l: () => void) {
  window.addEventListener("hashchange", l);
  return () => window.removeEventListener("hashchange", l);
}

function setHash(h: string) {
  history.replaceState(null, "", h || location.pathname + location.search);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

function Info({ className = "" }: { className?: string }) {
  return <InfoIcon width={14} height={14} className={`inline-block shrink-0 text-[#a9abaa] ${className}`} />;
}

function Check({ color, checked = true, onClick, size = 16 }: { color: string; checked?: boolean; onClick?: () => void; size?: number }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onClick}
      className="flex shrink-0 items-center justify-center rounded-[3px] border text-white"
      style={{ width: size, height: size, background: checked ? color : "#fff", borderColor: checked ? color : "#a9abaa" }}
    >
      {checked && (
        <svg viewBox="0 0 16 16" width={size - 4} height={size - 4}>
          <path d="m3.5 8.5 3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={onClick} className={`relative h-[14px] w-[21px] shrink-0 rounded-full ${on ? "bg-[#009f81]" : "bg-[#d6d8d7]"}`}>
      <span className={`absolute top-[3px] h-2 w-2 rounded-full bg-white ${on ? "left-[10px]" : "left-[3px]"}`} />
    </button>
  );
}

function Widget({ title, children, className = "", bodyClass = "", info = true }: { title: string; children: ReactNode; className?: string; bodyClass?: string; info?: boolean }) {
  return (
    <div className={`rounded-lg bg-white shadow-[0_0_0_1px_rgba(25,27,35,0.03)] ${className}`}>
      <div className="flex h-10 items-center gap-2 border-b border-[#f0f1f4] px-5 text-[16px] font-semibold text-rk-text">
        {title}
        {info && <Info />}
      </div>
      <div className={bodyClass}>{children}</div>
    </div>
  );
}

function Spark({ kind }: { kind: string }) {
  if (kind === "lock")
    return (
      <svg viewBox="0 0 20 20" width={21} height={21} className="mt-[3px] text-[#484a49]">
        <rect x="3" y="8.5" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth={1.5} />
        <path d="M6.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5M10 12v2.5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    );
  const d =
    kind === "flat"
      ? "M0 22 L72 22"
      : kind === "busy"
        ? "M0 21 L8 20 L12 14 L15 21 L22 20 L28 18 L31 2 L34 20 L38 17 L41 10 L45 19 L52 18 L57 21 L63 19 L66 17 L72 20"
        : "M0 21 L6 21 L10 19 L13 3 L16 18 L22 20 L30 20 L34 19 L37 6 L40 19 L50 21 L72 21";
  return (
    <svg viewBox="0 0 72 24" width={50} height={24} className="overflow-visible">
      {kind !== "flat" && <path d={`${d} L72 24 L0 24Z`} fill="#eceaff" />}
      <path d={d} fill="none" stroke="#8e92ec" strokeWidth={1.2} />
    </svg>
  );
}

function smooth(pts: [number, number][]) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const bump = (x: number, c: number, w: number, h: number) => h * Math.exp(-((x - c) ** 2) / (2 * w * w));

const mentionsSeries = Array.from({ length: 36 }, (_, i) => {
  const x = i * 4;
  const base = i < 3 ? 60 + i * 60 : i > 24 ? 330 - (i - 24) * 12 : 360 + 40 * Math.sin(i * 1.3);
  return base + bump(x, 14, 3.2, 2500) + bump(x, 77, 3, 1850);
});
const reachSeries = Array.from({ length: 36 }, (_, i) => {
  const x = i * 4;
  const base = i < 3 ? 40 + i * 50 : 260 + 70 * Math.sin(i * 0.9 + 1);
  return base + bump(x, 14, 3.4, 1150) + bump(x, 77, 3.2, 2550);
});

function MentionsInTime() {
  const [show, setShow] = useState({ m: true, r: true });
  const toPts = (s: number[]): [number, number][] => s.map((v, i) => [Math.round((i / 35) * 480), +(120 - (v / 3000) * 120).toFixed(1)]);
  return (
    <Widget title="Mentions in Time" className="h-[290px]" bodyClass="px-5 pt-[18px]">
      <div className="flex gap-4 text-[14px] leading-5 text-rk-text">
        <label className="flex items-center gap-2">
          <Check color="#5b5fc7" checked={show.m} onClick={() => setShow((s) => ({ ...s, m: !s.m }))} />
          Mentions
        </label>
        <label className="flex items-center gap-2">
          <Check color="#3ad7b5" checked={show.r} onClick={() => setShow((s) => ({ ...s, r: !s.r }))} />
          Reach
        </label>
      </div>
      <div className="relative mt-[10px] h-[180px] text-[12px] text-[#6a6c6a]">
        {["3K", "2.2K", "1.5K", "741", "0"].map((l, i) => (
          <div key={l} className="absolute right-[561px] leading-4" style={{ top: 12 + i * 30 - 8 }}>
            {l}
          </div>
        ))}
        {["60.8M", "45.6M", "30.4M", "15.2M", "0"].map((l, i) => (
          <div key={l + i} className="absolute left-[555px] leading-4" style={{ top: 12 + i * 30 - 8 }}>
            {l}
          </div>
        ))}
        <svg viewBox="0 0 480 120" width={480} height={120} className="absolute top-[12px] left-[40px] overflow-visible">
          {[0, 30, 60, 90, 120].map((y) => (
            <line key={y} x1="0" x2="480" y1={y} y2={y} stroke="#e9eaea" />
          ))}
          {show.r && <path d={smooth(toPts(reachSeries))} fill="none" stroke="#3ad7b5" strokeWidth={2.5} />}
          {show.m && <path d={smooth(toPts(mentionsSeries))} fill="none" stroke="#5b5fc7" strokeWidth={2.5} />}
        </svg>
        {[
          ["Jun 1", 136],
          ["Jul 1", 239],
          ["Aug 1", 341],
          ["Sep 1", 447],
        ].map(([l, x]) => (
          <div key={l} className="absolute top-[140px] -translate-x-1/2" style={{ left: x }}>
            {l}
          </div>
        ))}
      </div>
    </Widget>
  );
}

function Donut({ parts, r, inner, size }: { parts: { value: number; color: string }[]; r: number; inner: number; size: number }) {
  const total = parts.reduce((a, p) => a + p.value, 0);
  const c = size / 2;
  const starts = parts.map((_, i) => -Math.PI / 2 + (parts.slice(0, i).reduce((a, p) => a + p.value, 0) / total) * Math.PI * 2);
  const pt = (rad: number, a: number) => `${(c + rad * Math.cos(a)).toFixed(2)},${(c + rad * Math.sin(a)).toFixed(2)}`;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {parts.map((p, i) => {
        if (!p.value) return null;
        const a0 = starts[i];
        const a1 = a0 + (p.value / total) * Math.PI * 2;
        const large = a1 - a0 > Math.PI ? 1 : 0;
        const d = `M${pt(r, a0)} A${r},${r} 0 ${large} 1 ${pt(r, a1)} L${pt(inner, a1)} A${inner},${inner} 0 ${large} 0 ${pt(inner, a0)}Z`;
        return <path key={i} d={d} fill={p.color} stroke="#fff" strokeWidth={1.5} />;
      })}
    </svg>
  );
}

function OverallSentiment() {
  const [on, setOn] = useState(() => mmSentimentBreakdown.map(() => true));
  return (
    <Widget title="Overall Sentiment" className="h-[290px]" bodyClass="flex h-[250px] items-center pb-[36px] pl-[28px]">
      <Donut parts={mmSentimentBreakdown.map((s, i) => ({ value: on[i] ? s.value : 0, color: s.color === "#f0303e" ? "#f0303e" : s.color === "#4ed45a" ? "#62d85b" : "#c4c4c4" }))} r={72} inner={45} size={146} />
      <div className="mt-[24px] ml-[26px] space-y-[9px] text-[14px] leading-5">
        {mmSentimentBreakdown.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <Check color={s.color} checked={on[i]} onClick={() => setOn((o) => o.map((v, j) => (j === i ? !v : v)))} />
            <span className="ml-2 w-[88px] text-rk-text">{s.label}</span>
            <span className="w-[44px] text-right text-[#6a6c6a]">{s.pct}</span>
            <span className="w-[66px] text-right text-rk-text">{s.count}</span>
          </div>
        ))}
      </div>
    </Widget>
  );
}

function Sources() {
  const [on, setOn] = useState(() => mmSources.map(() => true));
  return (
    <Widget title="Sources" className="h-[265px]" bodyClass="flex px-[22px] pt-[20px]">
      <div className="flex h-[181px] w-[41px] flex-col gap-[2px] overflow-hidden rounded-[2px]">
        <div className="h-[3px] shrink-0 bg-[#aab4f8]" />
        <div className="h-[3px] shrink-0 bg-[#94a3f2]" />
        <div className="h-[5px] shrink-0 bg-[#6c70d6]" />
        <div className="flex-1 bg-[#5b5fc7]" />
      </div>
      <div className="ml-[26px] flex-1">
        <div className="text-[14px] leading-5 text-rk-text">Total</div>
        <div className="mt-[12px] text-[24px] leading-7 font-bold text-rk-text">11.3K</div>
        <div className="mt-[9px] space-y-[9px] border-t border-[#e9eaea] pt-[8px]">
          {mmSources.map((s, i) => (
            <div key={s.label} className="flex items-center text-[14px] leading-5">
              <Check color={s.color} checked={on[i]} onClick={() => setOn((o) => o.map((v, j) => (j === i ? !v : v)))} />
              <span className="ml-2 flex-1 text-rk-text">{s.label}</span>
              <span className="text-rk-text">{s.count}</span>
            </div>
          ))}
        </div>
      </div>
    </Widget>
  );
}

function OutletIcon({ icon }: { icon: string }) {
  if (icon === "yahoo") return <span className="w-4 text-center text-[17px] leading-4 font-black text-[#7e1fff] italic">!</span>;
  if (icon === "samsung") return <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1d8fe6] text-[10px] font-bold text-white">S</span>;
  if (icon === "et") return <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#e5313a] text-[6px] font-bold text-white">ET</span>;
  return null;
}

function TopOutlets() {
  return (
    <Widget title="Top Outlets" className="flex-1" bodyClass="pt-[23px]">
      <div className="flex h-[34px] items-center border-b border-[#e0e2e1] px-5 text-[12px] text-[#484a49]">
        <span className="flex-1">Outlet name</span>
        <span className="w-[112px] text-right">Authority Score</span>
        <span className="w-[98px] text-right">Domain Reach</span>
      </div>
      {mmOutlets.map((o) => (
        <div key={o.name} className="flex h-[37px] items-center border-b border-[#f0f1f4] px-5 text-[14px] text-rk-text">
          <span className="flex min-w-0 flex-1 items-center gap-[5px]">
            <OutletIcon icon={o.icon} />
            <span className="max-w-[136px] truncate">{o.name}</span>
          </span>
          <span className="w-[80px] text-right">{o.score}</span>
          <span className="w-[98px] text-right">{o.reach}</span>
        </div>
      ))}
    </Widget>
  );
}

function Flag({ f }: { f: Mention["flag"] }) {
  const stripes: Record<Mention["flag"], string[]> = {
    ve: ["#f7d117", "#00247d", "#cf142b"],
    us: ["#b22234", "#fff", "#b22234"],
    de: ["#000", "#dd0000", "#ffce00"],
    es: ["#c60b1e", "#ffc400", "#c60b1e"],
    gb: ["#012169", "#c8102e", "#012169"],
    fr: ["#0055a4", "#fff", "#ef4135"],
    br: ["#009c3b", "#ffdf00", "#009c3b"],
  };
  const vertical = f === "fr";
  return (
    <span className={`inline-flex h-[11px] w-4 shrink-0 overflow-hidden rounded-[1px] ${vertical ? "flex-row" : "flex-col"}`}>
      {stripes[f].map((c, i) => (
        <i key={i} className="flex-1" style={{ background: c }} />
      ))}
    </span>
  );
}

const sentimentCls: Record<Sentiment, string> = {
  Positive: "bg-[#d4f5ea] text-[#007c65]",
  Negative: "bg-[#ffe1e1] text-[#d1002f]",
  Neutral: "bg-[#edefef] text-[#484a49]",
};

function SentimentPill({ value }: { value: Sentiment }) {
  const [v, setV] = useState(value);
  return (
    <Popover
      panelClassName="min-w-[120px]"
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className={`flex h-[21px] items-center gap-1 rounded-full pr-[6px] pl-[9px] text-[13px] ${sentimentCls[v]}`}>
          {v}
          <ChevronDown width={14} height={14} strokeWidth={2} />
        </button>
      )}
    >
      {(close) =>
        (["Positive", "Neutral", "Negative"] as Sentiment[]).map((s) => (
          <MenuItem
            key={s}
            active={s === v}
            onClick={() => {
              setV(s);
              close();
            }}
          >
            {s}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

function Highlight({ text }: { text: string }) {
  const parts = text.split("Warby Parker");
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <mark className="rounded-[3px] bg-[#ead9fd] px-[2px] text-inherit">Warby Parker</mark>}
        </span>
      ))}
    </>
  );
}

const statIcons = [
  "M2 4h8M2 7.5h8M2 11h5M11 9.5v4M9 11.5h4",
  "M6.5 9.5 9.5 6.5M7 4.5l1-1a3 3 0 0 1 4.2 4.2l-1 1M9 11.5l-1 1a3 3 0 0 1-4.2-4.2l1-1",
  "M1.5 8h2.5l2-4.5 3 9 2-4.5h3",
  "M6 7a2.3 2.3 0 1 0 0-4.6A2.3 2.3 0 0 0 6 7zM1.5 13.5c.4-2.7 2-4 4.5-4s4.1 1.3 4.5 4M11 3a2 2 0 0 1 0 4M12.5 9.5c1.3.4 2 1.7 2.2 4",
];

function MentionCard({ m, compact }: { m: Mention; compact?: boolean }) {
  return (
    <div className={`rounded-lg border border-[#e0e2e1] bg-white ${compact ? "pt-[14px] pr-[13px] pb-[16px] pl-[12px]" : "pt-[13px] pr-[13px] pb-[12px] pl-[12px]"}`}>
      <div className="mr-[8px] flex items-start">
        <span className="mt-[3px] flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full text-[11px] font-bold" style={{ background: m.logo.bg, color: m.logo.fg }}>
          {m.logo.text ?? <i className="mt-3 ml-3 h-8 w-8 rounded-full bg-[#f5a37a]" />}
        </span>
        <div className="ml-[9px] min-w-0 flex-1">
          <div className="text-[16px] leading-5 font-semibold text-rk-text">{m.outlet}</div>
          <div className="mt-[2px] truncate text-[14px] leading-5 text-[#484a49]">
            {m.date} • {m.author}
          </div>
        </div>
        <span className="mt-[1px] rounded-full bg-[#eceef1] px-[8px] text-[14px] leading-[28px] text-[#6a6c6a]">Warby Par...</span>
        <button type="button" aria-label="Open mention" className="mt-[5px] ml-[11px] text-[#484a49] hover:text-rk-link">
          <ExternalIcon width={18} height={18} />
        </button>
        <button type="button" aria-label="Mention settings" className="mt-[5px] ml-[19px] text-[#484a49] hover:text-rk-text">
          <GearIcon width={18} height={18} />
        </button>
      </div>
      <div className={`${compact ? "mt-[12px] truncate pr-[26px]" : "mt-[12px]"} text-[16px] leading-6 font-semibold text-rk-text`}>{m.title}</div>
      <div className={`text-[14px] leading-5 text-[#1b1e1a] ${compact ? "line-clamp-2" : ""}`}>{compact ? m.text : <Highlight text={m.text} />}</div>
      <div className={`flex items-center ${compact ? "mt-[11px]" : "mt-[14px]"}`}>
        <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#6a6c6a]">
          <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth={1.4} />
          <path d="M3.5 5.5c1.5.3 2.2 1 2 2.3-.2 1.2 1 1.6 1.2 2.6.2.9-.3 1.8-.3 2.7M9.5 2c-.3 1.2.3 2 1.4 2.2 1 .2 1.2 1 .7 1.8-.5.9.2 1.8 1.2 1.6.8-.2 1.5.2 1.9.9" fill="none" stroke="currentColor" strokeWidth={1.2} />
        </svg>
        <span className="ml-2">
          <SentimentPill value={m.sentiment} />
        </span>
        <div className="ml-auto flex items-center gap-[9px] text-[14px] text-[#484a49]">
          {m.stats.map((s, i) => (
            <span key={i} className="flex items-center gap-[3px]">
              <svg viewBox="0 0 16 16" width={16} height={16}>
                <path d={statIcons[i]} fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {s}
            </span>
          ))}
          <span className="flex items-center gap-[6px]">
            <Flag f={m.flag} />
            {m.country}
          </span>
        </div>
      </div>
    </div>
  );
}

function NewestMentions({ onSeeAll }: { onSeeAll: () => void }) {
  return (
    <Widget title="Newest mentions" info={false} className="min-w-0 flex-1" bodyClass="px-5 pt-[20px]">
      <div className="space-y-[15px]">
        {mentions.slice(0, 3).map((m) => (
          <MentionCard key={m.title} m={m} compact />
        ))}
      </div>
      <button type="button" onClick={onSeeAll} className="mt-[12px] h-7 rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
        See all
      </button>
    </Widget>
  );
}

function DomainReach() {
  const [on, setOn] = useState(() => mmReach.map(() => true));
  return (
    <Widget title="Mentions by Domain Reach" className="h-[376px] w-[310px] shrink-0" bodyClass="px-5 pt-[43px]">
      <div className="text-[14px] leading-5 text-rk-text">Total</div>
      <div className="mt-[8px] text-[24px] leading-7 font-bold text-rk-text">11.2K</div>
      <div className="mt-[4px] flex h-[19px] gap-[2px]">
        {mmReach.map((r) => (
          <div key={r.label} className="flex-1" style={{ background: r.color }} />
        ))}
      </div>
      <div className="mt-[26px] space-y-[9px]">
        {mmReach.map((r, i) => (
          <div key={r.label} className="flex items-center text-[14px] leading-5 tracking-[0.02em] text-rk-text">
            <Check color={r.color} checked={on[i]} onClick={() => setOn((o) => o.map((v, j) => (j === i ? !v : v)))} />
            <span className="ml-2 w-[88px]">{r.label}</span>
            {r.count}
          </div>
        ))}
      </div>
    </Widget>
  );
}

function Audience() {
  const [show, setShow] = useState({ m: true, f: true });
  return (
    <Widget title="Audience" className="h-[376px] flex-1 overflow-hidden" bodyClass="flex">
      <div className="w-[549px] shrink-0 border-r border-[#e9eaea] pt-[20px] pl-5">
        <div className="flex items-center justify-between pr-5 text-[14px] leading-5">
          <span className="font-semibold text-rk-text">Age</span>
          <span className="flex gap-4">
            <label className="flex items-center gap-2">
              <Check color="#5b5fc7" checked={show.m} onClick={() => setShow((s) => ({ ...s, m: !s.m }))} />
              Male
            </label>
            <label className="flex items-center gap-2">
              <Check color="#aab4f8" checked={show.f} onClick={() => setShow((s) => ({ ...s, f: !s.f }))} />
              Female
            </label>
          </span>
        </div>
        <div className="relative mt-[31px] h-[190px] text-[12px] text-[#6a6c6a]">
          {["25%", "20%", "15%", "10%", "5%", "0%"].map((l, i) => (
            <div key={l} className="absolute right-[498px] leading-4" style={{ top: i * 30.2 - 8 }}>
              {l}
            </div>
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="absolute right-5 left-[48px] border-t border-[#eeeff3]" style={{ top: i * 30.2 }} />
          ))}
          <div className="absolute top-[151px] left-[48px] flex h-0 gap-[3px]">
            {mmAge.map((a) => (
              <div key={a.label} className="relative w-[75px]">
                {show.f && <div className="absolute bottom-0 w-full bg-[#aab4f8]" style={{ height: (show.m ? a.total : a.total - a.male) * 6.04 }} />}
                {show.m && <div className="absolute bottom-0 w-full border-t-2 border-white bg-[#5b5fc7]" style={{ height: a.male * 6.04 }} />}
                <div className="absolute top-[9px] w-full text-center">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-[20px] pl-5">
        <div className="text-[14px] leading-5 font-semibold text-rk-text">Sex</div>
        <div className="relative mt-[25px] ml-[8px] h-[154px] w-[154px]">
          <Donut parts={[{ value: 46.2, color: "#aab4f8" }, { value: 53.8, color: "#5b5fc7" }]} r={77} inner={52} size={154} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[22px] leading-6 font-bold text-rk-text">61.3B</span>
            <span className="text-[12px] leading-4 text-[#6a6c6a]">Users</span>
          </div>
        </div>
        <div className="mt-[8px] space-y-[7px] text-[14px] leading-5 whitespace-nowrap text-rk-text">
          {[
            ["#5b5fc7", "♂", "Male", "53.8%", "33B"],
            ["#aab4f8", "♀", "Female", "46.2%", "28.3B"],
          ].map(([c, s, l, p, n]) => (
            <div key={l} className="flex items-center">
              <i className="h-[11px] w-[11px] rounded-full" style={{ background: c }} />
              <span className="ml-[5px] w-[16px] text-[#6a6c6a]">{s}</span>
              <span className="w-[56px]">{l}</span>
              <span className="w-[64px] text-[#6a6c6a]">{p}</span>
              <span>{n}</span>
            </div>
          ))}
        </div>
      </div>
    </Widget>
  );
}

function FilterBar({ sentiment, onSentiment }: { sentiment: string; onSentiment: (s: string) => void }) {
  return (
    <div className="sticky top-0 z-20 mt-px flex items-center bg-rk-bg px-5 pt-4 pb-[14px]">
      <div className="flex h-7 overflow-hidden rounded-md border border-[#d6d8d7] bg-white text-[14px]">
        {mmSentiments.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => onSentiment(s.label)}
            className={`flex items-center gap-1 px-2 ${i ? "border-l border-[#d6d8d7]" : ""} ${sentiment === s.label ? "bg-[#e6ecfa] text-rk-text shadow-[inset_0_0_0_1px_#8fa9e8]" : "text-rk-text hover:bg-rk-bg"}`}
          >
            {s.label}
            <span className="text-[#6a6c6a]">{s.count}</span>
          </button>
        ))}
      </div>
      <div className="ml-2 flex h-7 w-[252px] items-center gap-2 rounded-md border border-[#d6d8d7] bg-white px-[8px] text-[14px] text-[#a9abaa]">
        <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#6a6c6a]">
          <path d="M2.5 4h11v9.5h-11zM2.5 7h11M5.5 2.5v3M10.5 2.5v3" fill="none" stroke="currentColor" strokeWidth={1.4} />
        </svg>
        MM/DD/YYYY <span className="px-[2px]">–</span> MM/DD/YYYY
      </div>
      <Popover
        className="ml-2"
        panelClassName="w-[200px]"
        trigger={({ toggle }) => (
          <button type="button" onClick={toggle} className="flex h-7 w-[162px] items-center justify-between rounded-md border border-[#d6d8d7] bg-white pr-[8px] pl-[8px] text-[14px] text-[#8a8c96]">
            Filter by keywords
            <ChevronDown className="text-rk-text" strokeWidth={2} />
          </button>
        )}
      >
        {(close) =>
          ["Warby Parker", "Home Try-on", "Intelligent Eyewear"].map((k) => (
            <MenuItem key={k} onClick={close}>
              {k}
            </MenuItem>
          ))
        }
      </Popover>
      <button type="button" className="ml-[19px] flex items-center gap-[7px] text-[14px] font-medium text-rk-link hover:text-rk-link-hover">
        <PlusIcon strokeWidth={2} />
        Add filter
      </button>
    </div>
  );
}

function MentionsList({ sentiment }: { sentiment: string }) {
  const list = sentiment === "All" ? mentions : mentions.filter((m) => m.sentiment === sentiment);
  return (
    <div className="px-5 pt-[2px]">
      <div className="flex items-center justify-between">
        <div className="text-[14px] text-rk-text">
          <b className="font-semibold">11276</b> mentions found <span className="text-[#6a6c6a]">(1 - 10)</span>
        </div>
        <div className="flex gap-2 text-[14px]">
          <button type="button" disabled className="h-7 rounded-md border border-[#dfe1e5] bg-[#f4f5f7] px-2 text-[#b2b4bc]">
            Delete
          </button>
          <button type="button" disabled className="flex h-7 items-center gap-2 rounded-md border border-[#dfe1e5] bg-[#f4f5f7] px-2 text-[#b2b4bc]">
            Change Sentiment
            <ChevronDown />
          </button>
          <button type="button" className="flex h-7 items-center gap-[6px] rounded-md border border-[#d6d8d7] bg-[#f5f6f6] px-2 text-rk-text-2 hover:bg-rk-hover">
            <ExportIcon />
            Export
          </button>
        </div>
      </div>
      <div className="mt-[17px] space-y-[17px]">
        {list.map((m) => (
          <MentionCard key={m.title} m={m} />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-1 text-[14px]">
        {["1", "2", "3", "…", "1128"].map((p, i) => (
          <button key={i} type="button" className={`h-8 min-w-8 rounded-md px-2 ${i === 0 ? "bg-[#e6ecfa] font-semibold text-rk-text" : "text-rk-text hover:bg-rk-hover"}`}>
            {p}
          </button>
        ))}
        <button type="button" className="ml-2 h-8 rounded-md border border-[#d6d8d7] bg-white px-3 text-rk-text-2 hover:bg-rk-bg">
          Next
        </button>
      </div>
    </div>
  );
}

export function MediaMonitoring() {
  const hash = useSyncExternalStore(subscribeHash, () => location.hash, () => "");
  const tab = hash === HASH ? "mentions" : "overview";
  const [queries, setQueries] = useState(() => mmQueries.map(() => true));
  const [sentiment, setSentiment] = useState("All");
  const page = landings.mediaMonitoring;

  return (
    <div className="pb-[115px]">
      <PrHero title={page.title} subtitle={page.subtitle} className="pt-[143px] pb-[144px]">
        <TrialButton className="mt-[33px]" />
        <div className="mt-3 text-[16px] leading-6 text-[#484a49]">{page.price}</div>
      </PrHero>

      <div className="mx-5 mt-5 h-[130px] rounded-lg border border-[#c4cad8] bg-[#e9eefc] px-[16px] pt-[19px]">
        <div className="text-[16px] leading-6 font-semibold text-rk-text">You’re viewing a sample</div>
        <p className="mt-[5px] text-[14px] leading-5 text-rk-text">This is a preview of brand monitoring available on the Pro plan. Want to track competitors too? That’s included in the Business plan.</p>
        <div className="mt-[16px] flex gap-2">
          <button type="button" className="h-7 rounded-md border border-[#d6d8d7] bg-[#f5f6f6] px-2 text-[14px] text-[#6a6c6a] hover:bg-rk-hover">
            View Business plan sample
          </button>
          <button type="button" className="h-7 rounded-md bg-[#009f81] px-2 text-[14px] font-medium text-white hover:bg-[#007c65]">
            Upgrade
          </button>
        </div>
      </div>

      <div className="mx-5 mt-[13px] flex items-center justify-between">
        <h2 className="text-[20px] leading-7 font-semibold text-rk-text">Warby Parker queries</h2>
        <div className="flex gap-2">
          <button type="button" className="flex h-7 items-center gap-[10px] rounded-md bg-rk-btn-dark px-[11px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
            <PlusIcon strokeWidth={2} />
            Create query
          </button>
          <button type="button" className="flex h-7 items-center gap-[10px] rounded-md border border-[#d6d8d7] bg-[#f5f6f6] px-[9px] text-[14px] text-rk-text-2 hover:bg-rk-hover">
            <PlusIcon />
            Create alert or digest
          </button>
          <button type="button" aria-label="Settings" className="flex h-7 w-7 items-center justify-center rounded-md border border-[#d6d8d7] bg-[#f5f6f6] text-rk-text-2 hover:bg-rk-hover">
            <GearIcon />
          </button>
        </div>
      </div>
      <div className="mx-5 mt-[17px] text-[14px] leading-5 text-rk-text">{queries.filter(Boolean).length}/3 queries selected</div>
      <div className="mx-5 mt-[12px] flex gap-[18px] pl-1">
        {mmQueries.map((q, i) => (
          <div key={q.name} className="h-[91px] w-[254px] rounded-lg bg-white px-4 pt-[17px] shadow-[0_0_0_1px_rgba(25,27,35,0.03)]">
            <div className="flex items-center gap-2 text-[14px] leading-5 font-semibold text-rk-text">
              <Toggle on={queries[i]} onClick={() => setQueries((qs) => qs.map((v, j) => (j === i ? !v : v)))} />
              {q.name}
            </div>
            <div className="mt-[11px] w-fit text-[14px] leading-5 text-rk-text underline decoration-dotted decoration-2 underline-offset-[5px]">{q.count} mentions</div>
          </div>
        ))}
      </div>

      <div className="mt-[27px] flex gap-[17px] border-b border-[#d9dbdb] px-8 text-[16px] leading-6">
        {[
          ["overview", "Overview"],
          ["mentions", "Mentions"],
        ].map(([k, l]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={tab === k}
            onClick={() => setHash(k === "mentions" ? HASH : "")}
            className={`border-b-[3px] pb-[6px] ${tab === k ? "border-[#8e92ec] text-rk-text" : "border-transparent text-rk-text hover:border-[#d6d8d7]"}`}
          >
            {l}
          </button>
        ))}
      </div>

      <FilterBar sentiment={sentiment} onSentiment={setSentiment} />

      {tab === "overview" ? (
        <div className="px-5 pt-[3px]">
          <div className="flex h-[117px] rounded-lg bg-white py-[16px] shadow-[0_0_0_1px_rgba(25,27,35,0.03)]">
            {mmMetrics.map((m, i) => (
              <div key={m.label} className={`w-[178px] px-[21px] ${i ? "border-l border-[#e9eaea]" : ""} ${i === 5 ? "flex-1" : ""}`}>
                <div className="flex items-start justify-between gap-1 text-[14px] leading-5 text-rk-text">
                  <span className={m.wrap ? "w-[100px]" : "flex items-center gap-1"}>
                    {m.label}
                    {!m.wrap && <Info />}
                  </span>
                  {m.wrap && <Info className="mt-[3px] mr-[8px]" />}
                </div>
                <div className="flex items-end gap-[10px]">
                  {m.value && <span className="text-[24px] leading-7 font-bold text-rk-text">{m.value}</span>}
                  <Spark kind={m.spark} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[17px] grid grid-cols-[620px_1fr] gap-[18px]">
            <MentionsInTime />
            <OverallSentiment />
          </div>
          <div className="mt-[17px] flex gap-[18px]">
            <div className="flex w-[399px] shrink-0 flex-col gap-[17px]">
              <Sources />
              <TopOutlets />
            </div>
            <NewestMentions
              onSeeAll={() => {
                setHash(HASH);
                window.scrollTo(0, 700);
              }}
            />
          </div>
          <div className="mt-4 flex gap-[17px]">
            <DomainReach />
            <Audience />
          </div>
        </div>
      ) : (
        <MentionsList sentiment={sentiment} />
      )}
    </div>
  );
}
