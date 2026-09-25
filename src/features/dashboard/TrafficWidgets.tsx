"use client";

import Link from "next/link";
import { useState } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { LogoIcon } from "@/components/icons";
import { CheckIcon } from "@/components/ui/icons";
import { gaRange, gaSource, referralGap, topPageviews, trafficDays, trafficMetrics, trafficSeries } from "./data";
import { CloseX, LinkDropdown, WidgetCard, WTitle } from "./ui";

const ranges = [gaRange, "Last 7 days", "Last 90 days"] as const;

function GaIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} className="shrink-0">
      <rect x="10.5" y="1" width="4" height="14" rx="2" fill="#f9ab00" />
      <rect x="6" y="6" width="4" height="9" rx="2" fill="#e37400" />
      <circle cx="3.5" cy="13" r="2" fill="#e37400" />
    </svg>
  );
}

function monotone(pts: [number, number][]) {
  const n = pts.length;
  if (n < 2) return "";
  const dx = pts.slice(1).map((p, i) => p[0] - pts[i][0]);
  const dy = pts.slice(1).map((p, i) => p[1] - pts[i][1]);
  const m = dx.map((d, i) => dy[i] / d);
  const t = pts.map((_, i) => (i === 0 ? m[0] : i === n - 1 ? m[n - 2] : m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2));
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += `C${(pts[i][0] + h).toFixed(1)} ${(pts[i][1] + t[i] * h).toFixed(1)} ${(pts[i + 1][0] - h).toFixed(1)} ${(pts[i + 1][1] - t[i + 1] * h).toFixed(1)} ${pts[i + 1][0].toFixed(1)} ${pts[i + 1][1].toFixed(1)}`;
  }
  return d;
}

function TrafficChart({ visible }: { visible: Record<string, boolean> }) {
  const W = 1121;
  const H = 250;
  const left = 46;
  const right = 2;
  const top = 10;
  const bottom = 220;
  const x = (i: number) => left + (i / (trafficDays.length - 1)) * (W - left - right);
  const y = (v: number) => bottom - (v / 150) * (bottom - top);
  const labels = [0, 5, 10, 15, 20, 25, 29];
  const g = referralGap;
  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="block overflow-visible">
      {[0, 50, 100, 150].map((t) => (
        <g key={t}>
          <line x1={left} x2={W - right} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#e0e2e1" : "#f0f0f4"} />
          <text x={left - 16} y={y(t) + 4} textAnchor="end" fontSize="12" fill="#6a6c6a">
            {t}
          </text>
        </g>
      ))}
      {labels.map((i) => (
        <text key={i} x={i === 0 ? x(i) - 4 : i === 29 ? x(i) + 7 : x(i)} y={bottom + 22} textAnchor={i === 0 ? "start" : i === 29 ? "end" : "middle"} fontSize="12" fill="#6a6c6a">
          {trafficDays[i]}
        </text>
      ))}
      {visible.Referral && (
        <>
          <path d={`M${x(g.from)} ${y(1)}L${x(g.peak)} ${y(g.value)}L${x(g.to)} ${y(1)}`} fill="none" stroke="#d6d8d7" strokeWidth={2} strokeDasharray="5 5" />
          <circle cx={x(g.peak)} cy={y(g.value)} r={3.5} fill="#3ee3b6" />
        </>
      )}
      <path d={`M${x(0)} ${y(0.5)}H${x(29)}`} stroke="#8b8d8c" strokeWidth={2.5} strokeDasharray="5 3" opacity={0.6} />
      {trafficSeries
        .filter((s) => visible[s.name])
        .map((s) => {
          const pts = s.data.map((v, i) => [x(i), y(v)] as [number, number]);
          return (
            <g key={s.name}>
              <path d={monotone(pts)} fill="none" stroke={s.color} strokeWidth={s.name === "Direct" || s.name === "Display" ? 2.5 : 2} strokeLinejoin="round" />
              {(s.name === "Paid Search" || s.name === "Organic Social" || s.name === "Referral") &&
                s.data.map((v, i) => (i % 4 === 1 ? <circle key={i} cx={x(i)} cy={y(v)} r={3} fill={s.color} /> : null))}
            </g>
          );
        })}
    </svg>
  );
}

export function TrafficAnalyticsWidget({ onClose }: { onClose: () => void }) {
  const [src, setSrc] = useState<"brand" | "google">("google");
  const [metric, setMetric] = useState(0);
  const [visible, setVisible] = useState<Record<string, boolean>>(Object.fromEntries(trafficSeries.map((s) => [s.name, true])));
  return (
    <WidgetCard className="h-[514px]">
      <div className="h-[73px] border-b border-rk-border px-5 pt-[7px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[20px]">
            <WTitle href={routes.domainOverview}>Traffic Analytics</WTitle>
            <div className="flex h-[27px] text-[14px]">
              <button
                type="button"
                onClick={() => setSrc("brand")}
                className={`flex items-center gap-[7px] rounded-l-md border px-[9px] ${src === "brand" ? "z-10 border-[#8b95f5] bg-[#f5f7ff]" : "border-rk-border-strong bg-white hover:bg-rk-bg"}`}
              >
                <LogoIcon width={16} height={16} className="shrink-0" />
                <span title={`${brand.name} Data`} className="max-w-[220px] truncate">
                  {brand.name} Data
                </span>
              </button>
              <button
                type="button"
                onClick={() => setSrc("google")}
                className={`-ml-px flex items-center gap-[7px] rounded-r-md border px-[9px] ${src === "google" ? "z-10 border-[#8b95f5] bg-[#f5f7ff]" : "border-rk-border-strong bg-white hover:bg-rk-bg"}`}
              >
                <GaIcon />
                Google Data
              </button>
            </div>
          </div>
          <div className="flex items-center gap-[21px]">
            <LinkDropdown id="ta-range" value={gaRange} options={ranges} align="right" panelClassName="w-[190px]" />
            <CloseX onClick={onClose} />
          </div>
        </div>
        <div className="mt-[10px] text-[14px] leading-5 text-rk-muted">{gaSource}</div>
      </div>
      <div className="px-5 pt-5">
        <div className="grid grid-cols-6 rounded-md border border-rk-border">
          {trafficMetrics.map((m, i) => (
            <button
              key={m.label}
              type="button"
              onClick={() => setMetric(i)}
              className={`-m-px flex h-[96px] flex-col border px-4 pt-[11px] text-left ${
                metric === i ? "z-10 rounded-md border-[#8b95f5] bg-[#f5f7ff]" : "border-transparent border-l-rk-border first:border-l-transparent"
              }`}
            >
              <div className="truncate text-[14px] leading-5">{m.label}</div>
              <div className="mt-[3px] text-[22px] leading-7 font-semibold text-rk-text">{m.value}</div>
              <div className={`mt-[3px] text-[12px] leading-4 ${m.delta.startsWith("+") ? "text-rk-success" : "text-rk-danger"}`}>{m.delta}</div>
            </button>
          ))}
        </div>
        <div className="mt-[18px]">
          <TrafficChart visible={visible} />
        </div>
        <div className="mt-[18px] flex items-center gap-[17px] text-[14px]">
          {trafficSeries.map((s) => (
            <label key={s.name} className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="sr-only" checked={visible[s.name]} onChange={() => setVisible((v) => ({ ...v, [s.name]: !v[s.name] }))} />
              <span className="flex h-4 w-4 items-center justify-center rounded-[3px]" style={{ background: visible[s.name] ? s.color : "#fff", border: visible[s.name] ? "none" : "1px solid #d6d8d7" }}>
                {visible[s.name] && <CheckIcon width={12} height={12} className="text-white" strokeWidth={2.2} />}
              </span>
              {s.name}
            </label>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
}

export function TopPageviewsWidget({ onClose }: { onClose: () => void }) {
  const t = topPageviews.total;
  const num = "w-[162px] text-right";
  return (
    <WidgetCard className="h-[444px]">
      <div className="h-[71px] border-b border-rk-border px-5 pt-[9px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <GaIcon />
            <WTitle>Top pageviews</WTitle>
          </div>
          <div className="flex items-center gap-[21px]">
            <LinkDropdown id="tp-range" value={gaRange} options={ranges} align="right" panelClassName="w-[190px]" />
            <CloseX onClick={onClose} />
          </div>
        </div>
        <div className="mt-[7px] text-[14px] leading-5 text-rk-muted">{gaSource}</div>
      </div>
      <table className="w-full text-[14px] leading-5">
        <thead>
          <tr className="h-[52px] text-[13px]">
            <th className="pt-[19px] pl-5 text-left font-normal">Page</th>
            <th className={`${num} pt-[19px] font-normal`}>Pageviews</th>
            <th className={`${num} pt-[19px] font-normal`}>Users</th>
            <th className={`${num} pt-[19px] font-normal`}>Avg. Time on Page</th>
            <th className={`${num} pt-[19px] font-normal`}>Entrances</th>
            <th className="w-[172px] pt-[19px] pr-5 text-right font-normal">Engagement Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-[40px] border-y border-rk-border text-[16px] font-semibold">
            <td className="pl-5" />
            <td className={num}>{t.pageviews}</td>
            <td className={num}>{t.users}</td>
            <td className={num}>{t.time}</td>
            <td className={num}>{t.entrances}</td>
            <td className="w-[172px] pr-5 text-right">{t.rate}</td>
          </tr>
          {topPageviews.rows.map((r) => (
            <tr key={r.page} className="h-[37.3px] border-b border-rk-border">
              <td className="pl-5">
                <Link href={routes.topPages} className="text-rk-text hover:text-rk-link">
                  {r.page}
                </Link>
              </td>
              <td className={num}>{r.pageviews}</td>
              <td className={num}>{r.users}</td>
              <td className={num}>{r.time}</td>
              <td className={num}>{r.entrances}</td>
              <td className="w-[172px] pr-5 text-right">{r.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </WidgetCard>
  );
}
