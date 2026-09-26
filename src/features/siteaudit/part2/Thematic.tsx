import type { ReactNode } from "react";
import { routes } from "@/config/routes";
import { AppShell } from "@/components/shell/AppShell";
import { Button } from "@/components/ui/primitives";
import { ArrowLeft } from "@/components/ui/icons";
import { DemoTag } from "@/features/tracking/ui";
import { SiteAuditHeader } from "../SiteAuditHeader";
import type { SiteAuditHead } from "../load";
import { InfoI, ScoreRing } from "./ui";

export function ThematicPage({
  title,
  score,
  ringFirst = true,
  info = false,
  pdf = false,
  pb = 166,
  head,
  demo = false,
  children,
}: {
  title: string;
  score: number;
  ringFirst?: boolean;
  info?: boolean;
  pdf?: boolean;
  pb?: number;
  head?: SiteAuditHead;
  demo?: boolean;
  children: ReactNode;
}) {
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="overview" looker={false} exportBtn={false} pdf={pdf} head={head} />
      <div className="px-8 pt-[14px] max-xl:pt-[16px]" style={{ paddingBottom: pb }}>
        <Button variant="tertiary" href={routes.siteAuditCampaign.overview} className="h-7 gap-[7px] pr-[9px] pl-[7px] text-rk-text-2">
          <ArrowLeft width={16} height={16} />
          Go to Overview
        </Button>
        <h1 className="mt-[14px] mb-[14px] flex h-7 items-center gap-2 text-[20px] leading-7 font-semibold">
          <span>{title}</span>
          <span className="-ml-[3px] text-rk-muted">/ Score:</span>
          {ringFirst ? (
            <>
              <ScoreRing value={score} />
              <span className="text-rk-muted">{score}%</span>
            </>
          ) : (
            <>
              <span className="text-rk-muted">{score}%</span>
              <ScoreRing value={score} />
            </>
          )}
          {info && <InfoI />}
          {demo && <DemoTag className="!ml-0" />}
        </h1>
        {children}
      </div>
    </AppShell>
  );
}

export function Panel({ title, info, children, className = "", head }: { title: ReactNode; info?: boolean; children: ReactNode; className?: string; head?: ReactNode }) {
  return (
    <div className={`rounded-md bg-white shadow-card ${className}`}>
      <div className="flex h-10 items-center gap-2 border-b border-rk-border px-5">
        <h3 className="text-[16px] leading-6 font-semibold">{title}</h3>
        {info && <InfoI />}
        {head && <div className="ml-auto">{head}</div>}
      </div>
      {children}
    </div>
  );
}

export function SubCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-md border border-[#ebebeb] bg-white ${className}`}>{children}</div>;
}
