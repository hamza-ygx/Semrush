"use client";

import Link from "next/link";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/primitives";
import { StackBar } from "@/components/ui/charts";
import { promos, siteAudit } from "./data";
import { CloseX, Label, WidgetCard, WTitle } from "./ui";

const SA = routes.siteAuditCampaign;

function HealthGauge({ value }: { value: number }) {
  const R = 83;
  const t = 26;
  const r = R - t / 2;
  const cx = R;
  const cy = R;
  const pt = (p: number) => {
    const a = Math.PI * (1 - p / 100);
    return `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy - r * Math.sin(a)).toFixed(2)}`;
  };
  const arc = (a: number, b: number) => `M${pt(a)}A${r} ${r} 0 0 1 ${pt(b)}`;
  return (
    <div className="relative h-[84px] w-[166px]">
      <svg width={166} height={84} viewBox="0 0 166 84">
        <path d={arc(0, value)} fill="none" stroke="#6167e6" strokeWidth={t} />
        <path d={arc(value + 0.8, 100)} fill="none" stroke="#c4c7cf" strokeWidth={t} />
      </svg>
      <div className="absolute inset-x-0 bottom-[9px] flex flex-col items-center">
        <span className="text-[20px] leading-6 font-semibold text-rk-number">{value}%</span>
        <span className="text-[13px] leading-4 text-rk-muted">no changes</span>
      </div>
    </div>
  );
}

export function SiteAuditWidget({ onClose }: { onClose: () => void }) {
  return (
    <WidgetCard className="h-[471px]">
      <div className="h-[70px] border-b border-rk-border px-5 pt-[7px]">
        <div className="flex items-center justify-between">
          <WTitle href={SA.overview}>Site Audit</WTitle>
          <CloseX onClick={onClose} />
        </div>
        <div className="mt-[7px] text-[14px] leading-5 text-rk-muted">{siteAudit.updated}</div>
      </div>
      <div className="flex flex-1 flex-col px-5 pt-[20px]">
        <div className="grid grid-cols-[285px_1fr]">
          <div>
            <Label>Site Health</Label>
            <Link href={SA.overview} className="mt-[12px] ml-2 block w-fit">
              <HealthGauge value={siteAudit.health} />
            </Link>
          </div>
          <div>
            <Label>Errors</Label>
            <div className="mt-[1px] flex items-baseline gap-2">
              <Link href={SA.issues} className="text-[22px] leading-7 font-semibold text-rk-danger hover:opacity-80">
                {siteAudit.errors}
              </Link>
              <span className="text-[12px] text-rk-muted">0</span>
            </div>
            <Label className="mt-[22px]">Warnings</Label>
            <div className="mt-[3px] flex items-baseline gap-2">
              <Link href={SA.issues} className="text-[22px] leading-7 font-semibold text-rk-warning hover:opacity-80">
                {siteAudit.warnings}
              </Link>
              <span className="text-[12px] text-rk-muted">0</span>
            </div>
          </div>
        </div>
        <Label className="mt-[53px]">Crawled Pages</Label>
        <Link href={SA.crawledPages} className="mt-[1px] text-[22px] leading-7 font-semibold text-rk-number hover:opacity-80">
          {siteAudit.crawled}
        </Link>
        <Link href={SA.crawledPages} className="mt-[13px] block">
          <StackBar segments={siteAudit.crawledBar} height={38} className="gap-[2px] rounded-none" />
        </Link>
        <div className="mt-auto mb-[21px]">
          <Button href={SA.overview} variant="tertiary" className="h-[27px] px-2 text-[14px]">
            View full report
          </Button>
        </div>
      </div>
    </WidgetCard>
  );
}

export function PromoWidget({ id, onClose }: { id: (typeof promos)[number]["id"]; onClose: () => void }) {
  const p = promos.find((x) => x.id === id)!;
  return (
    <WidgetCard grey className="h-[225px]">
      <div className="flex h-[41px] items-center justify-between border-b border-[#d6d8e0] px-5 pb-[1px]">
        <WTitle>{p.title}</WTitle>
        <CloseX onClick={onClose} />
      </div>
      <p className="px-5 pt-[19px] text-[14px] leading-5 text-rk-text">{p.text.replace("{brand}", brand.name)}</p>
      <div className="mt-auto mb-[22px] px-5">
        <Link href={p.href} className="inline-flex h-7 items-center rounded-md bg-rk-btn-dark px-2 text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
          Set up
        </Link>
      </div>
    </WidgetCard>
  );
}
