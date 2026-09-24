"use client";

import Link from "next/link";
import { routes } from "@/config/routes";
import { DesktopIcon, GoogleIcon, MobileIcon, PlusIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/primitives";
import { refDomainsByAS, refDomainsTrend, widgetTitles, type WidgetId } from "./data";
import { Flag } from "./flags";
import { AllWidgetsArt, ConnectGscArt, NothingFoundArt } from "./illustrations";
import { CloseX, Label, LinkDropdown, WidgetCard, WTitle } from "./ui";

const Sep = () => <span className="mx-[2px] h-4 w-px bg-rk-border" />;
const flagOpt = (v: string) => (
  <>
    <Flag country={v} />
    {v}
  </>
);
const devOpt = (v: string) => (
  <>
    {v === "Desktop" ? <DesktopIcon /> : <MobileIcon />}
    {v}
  </>
);

export function OrganicRankingsWidget({ onClose }: { onClose: () => void }) {
  return (
    <WidgetCard className="h-[599px]">
      <div className="h-[68px] border-b border-rk-border px-5 pt-2">
        <div className="flex items-center justify-between">
          <WTitle href={routes.organic.overview}>Organic Rankings</WTitle>
          <div className="flex items-center gap-[13px] text-[14px] text-rk-muted">
            Last month
            <CloseX onClick={onClose} />
          </div>
        </div>
        <div className="mt-[9px] flex items-center gap-2">
          <LinkDropdown id="or-scope" value="Root Domain" options={["Root Domain", "Subdomain"] as const} panelClassName="w-[104px]" />
          <Sep />
          <LinkDropdown id="or-country" value="United States" options={["United States", "Sweden"] as const} render={flagOpt} renderOption={flagOpt} panelClassName="w-[160px]" />
          <Sep />
          <LinkDropdown id="or-device" value="Desktop" options={["Desktop", "Mobile"] as const} render={devOpt} renderOption={devOpt} panelClassName="w-[94px]" />
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center pt-[186px] text-center">
        <NothingFoundArt />
        <div className="mt-[14px] text-[16px] leading-6 font-semibold text-rk-text-2">Nothing found</div>
        <div className="mt-[3px] text-[14px] leading-[21px] text-rk-muted">
          We haven&apos;t found any data
          <br />
          for the analyzed domain
        </div>
      </div>
    </WidgetCard>
  );
}

function RefDomainsChart() {
  const W = 532;
  const H = 212;
  const left = 53;
  const right = 5;
  const top = 12;
  const bottom = 187;
  const d = refDomainsTrend.data;
  const x = (i: number) => left + (i / (d.length - 1)) * (W - left - right);
  const y = (v: number) => bottom - ((v - 100) / 200) * (bottom - top);
  const line = d.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join("");
  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="block overflow-visible">
      {[100, 200, 300].map((t) => (
        <g key={t}>
          <line x1={left} x2={W - right} y1={y(t)} y2={y(t)} stroke={t === 100 ? "#e0e1e9" : "#f0f0f4"} />
          <text x={left - 17} y={y(t) + 4} textAnchor="end" fontSize="12" fill="#6c6e79">
            {t}
          </text>
        </g>
      ))}
      <path d={`${line}L${x(d.length - 1)} ${y(100)}L${x(0)} ${y(100)}Z`} fill="#dcdcf8" opacity={0.85} />
      <path d={line} fill="none" stroke="#6167e6" strokeWidth={2} strokeLinejoin="round" />
      {refDomainsTrend.labels.map((l, i) =>
        l ? (
          <text key={i} x={x(i) + 19} y={bottom + 22} textAnchor="middle" fontSize="12" fill="#6c6e79">
            {l}
          </text>
        ) : null,
      )}
    </svg>
  );
}

export function BacklinksWidget({ onClose }: { onClose: () => void }) {
  const max = Math.max(...refDomainsByAS.map((r) => r.value));
  return (
    <WidgetCard className="h-[599px]">
      <div className="flex h-[43px] items-center justify-between border-b border-rk-border px-5">
        <WTitle href={routes.backlinks}>Backlinks</WTitle>
        <div className="flex items-center gap-[13px] text-[14px] text-rk-muted">
          Scope: Root Domain
          <CloseX onClick={onClose} />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-5 pt-[21px]">
        <div className="flex items-center justify-between">
          <Label>Referring Domains</Label>
          <span className="text-[14px] text-rk-muted">Last 12 months</span>
        </div>
        <Link href={routes.referringDomains} className="mt-[20px] block" aria-label="Referring domains trend">
          <RefDomainsChart />
        </Link>
        <div className="mt-[34px] flex items-center justify-between">
          <Label>Referring Domains by Authority Score</Label>
          <span className="text-[14px] text-rk-muted">Sep 2026</span>
        </div>
        <div className="mt-[24px] flex flex-col gap-[8.5px]">
          {refDomainsByAS.map((r) => (
            <div key={r.range} className="flex h-5 items-center text-[14px]">
              <span className="w-[51px]">{r.range}</span>
              <span className="relative h-[16px] w-[350px] shrink-0 bg-[#f0f0f4]">
                <span className="absolute inset-y-0 left-0" style={{ width: `max(2px, ${(r.value / max) * 100}%)`, background: r.color }} />
              </span>
              <span className="w-[56px] text-right">{r.pct}</span>
              <Link href={routes.referringDomains} className="flex-1 text-right text-rk-link hover:text-rk-link-hover">
                {r.count}
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-auto mb-[21px]">
          <Button href={routes.backlinks} variant="tertiary" className="h-[27px] px-2 text-[14px]">
            View full report
          </Button>
        </div>
      </div>
    </WidgetCard>
  );
}

export function GscWidget() {
  return (
    <WidgetCard className="h-[294px]">
      <div className="flex h-full items-start pt-[41px] pl-[41px]">
        <ConnectGscArt />
        <div className="flex flex-1 flex-col items-center pt-[42px] text-center">
          <div className="text-[16px] leading-6 font-semibold text-rk-text-2">Connect Google Search Console</div>
          <p className="mt-[2px] text-[14px] leading-5 text-rk-muted">
            Enrich your analysis with real-time data from
            <br />
            Google Search Console to your SEO Dashboard.
          </p>
          <div className="mt-[20px] flex items-center gap-3">
            <button type="button" className="flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-white px-2 text-[14px] text-rk-text-2 hover:bg-rk-bg">
              <GoogleIcon />
              Connect
            </button>
            <button type="button" className="dotted-underline text-[14px] text-rk-text-2 hover:text-rk-text">
              Disclaimer
            </button>
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}

export function HiddenWidgets({ hidden, onRestore }: { hidden: WidgetId[]; onRestore: (id: WidgetId) => void }) {
  return (
    <WidgetCard className={hidden.length ? "" : "h-[263px]"}>
      <div className="flex h-[42px] items-center border-b border-rk-border px-5">
        <WTitle>Hidden Widgets</WTitle>
      </div>
      {hidden.length === 0 ? (
        <div className="flex flex-col items-center pt-[41px] text-center">
          <AllWidgetsArt />
          <div className="mt-[12px] text-[16px] leading-6 font-semibold text-rk-muted">
            All widgets are shown on your
            <br />
            Dashboard
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 p-5">
          {hidden.map((id) => (
            <div key={id} className="flex h-[88px] flex-col justify-between rounded-lg border border-dashed border-rk-border-strong bg-rk-bg p-3">
              <span className="text-[14px] leading-5 font-semibold">{widgetTitles[id]}</span>
              <Button size="s" variant="secondary" onClick={() => onRestore(id)} className="self-start">
                <PlusIcon width={12} height={12} />
                Show on Dashboard
              </Button>
            </div>
          ))}
        </div>
      )}
    </WidgetCard>
  );
}
