import Link from "next/link";
import { routes } from "@/config/routes";
import { AppShell } from "@/components/shell/AppShell";
import { SiteAuditHeader } from "../SiteAuditHeader";
import { DateSelect } from "./DateSelect";
import { InfoI, LearnMore } from "./ui";
import { compareGeneral, errorsList, issueCounts, issueId, noticesList, warningsList } from "./data";

const TrendIcon = () => (
  <svg viewBox="0 0 16 16" width={18} height={18} className="text-[#5a5d66]">
    <path d="M1.5 1.5v13h13M4 10.5l3-3.5 2.5 2.5L14 4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

const cell = "flex h-[52px] items-center justify-center border-l border-rk-border text-[14px]";

function Row({ label, href, a, b, fixed, learn }: { label: string; href: string; a: string; b: string; fixed: string | null; learn?: boolean }) {
  return (
    <div className="grid grid-cols-[1fr_212px_213px_93px_94px] border-b border-rk-border">
      <div className="flex h-[52px] items-center gap-2 pr-3 pl-5">
        <Link href={href} className="text-[14px] text-rk-link hover:text-rk-link-hover">
          {label}
        </Link>
        {learn ? <LearnMore className="ml-3" /> : <InfoI />}
        <span className="ml-auto">
          <TrendIcon />
        </span>
      </div>
      <div className={cell}>{a}</div>
      <div className={cell}>{b}</div>
      {fixed === null ? (
        <div className="col-span-2 border-l border-rk-border bg-[#f3f5f5]" />
      ) : (
        <>
          <div className={cell}>{fixed}</div>
          <div className={cell}>{fixed}</div>
        </>
      )}
    </div>
  );
}

function Section({ title, color, items }: { title: string; color: string; items: string[] }) {
  return (
    <>
      <div className="flex h-[47px] items-end gap-2 px-5 pb-[10px]">
        <h2 className="text-[20px] leading-7 font-semibold">{title}</h2>
        <InfoI className="mb-1" />
      </div>
      <div className="h-1" style={{ background: color }} />
      {items.map((name) => {
        const n = String(issueCounts[name] ?? 0);
        return <Row key={name} label={name} href={routes.siteAuditCampaign.issueDetail(issueId(name))} a={n} b={n} fixed="—" learn />;
      })}
    </>
  );
}

export function CompareCrawls() {
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="compare" looker={false} exportBtn={false} />
      <div className="px-8 pt-[15px] pb-[60px]">
        <div className="overflow-hidden rounded-md bg-white shadow-card">
          <div className="grid h-[72px] grid-cols-[1fr_212px_213px_93px_94px] items-center pt-[15px] text-[16px]">
            <div className="flex items-center gap-2 px-5">
              <h2 className="text-[20px] leading-7 font-semibold">General</h2>
              <InfoI />
            </div>
            <div className="flex justify-center">
              <DateSelect />
            </div>
            <div className="relative flex justify-center">
              <span className="absolute top-[5px] -left-[10px] text-[14px] font-semibold">vs</span>
              <DateSelect />
            </div>
            <span className="text-center">Fixed</span>
            <span className="text-center">New</span>
          </div>
          <div className="h-1 bg-[#a9a9a9]" />
          {compareGeneral.map((r) => (
            <Row key={r.label} label={r.label} href={r.label === "Pages crawled" ? routes.siteAuditCampaign.crawledPages : r.label === "Site Health" ? routes.siteAuditCampaign.overview : routes.siteAuditCampaign.issues} a={r.a} b={r.b} fixed={r.fixed} />
          ))}
          <Section title="Errors" color="#f43744" items={errorsList} />
          <Section title="Warnings" color="#f58a1f" items={warningsList} />
          <Section title="Notices" color="#a3b4f7" items={noticesList} />
        </div>
      </div>
    </AppShell>
  );
}
