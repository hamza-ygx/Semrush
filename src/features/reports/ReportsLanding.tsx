import Link from "next/link";
import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { LogoIcon } from "@/components/icons";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { integrations, landingTemplates } from "./data";
import { FirebaseIcon, GaIcon, GoogleGIcon, GscIcon, MatomoIcon, SparkleIcon } from "./ReportIcons";
import { ReportMock } from "./ReportMock";
import { TemplateCard } from "./TemplateCard";

function Card({ title, sub, children, cta }: { title: string; sub: ReactNode; children: ReactNode; cta?: { label: string; href: string } }) {
  return (
    <section className="rounded-lg border border-rk-border bg-white px-6 pt-8 pb-8 text-center">
      <h2 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] text-[#2b2e38]">{title}</h2>
      <p className="mx-auto mt-8 max-w-[600px] text-[16px] leading-6 text-rk-text">{sub}</p>
      <div className="mt-8 text-left">{children}</div>
      {cta && (
        <Link
          href={cta.href}
          className="mt-[33px] inline-flex h-10 items-center rounded-md bg-[#009f81] px-[13px] text-[16px] font-medium text-white hover:bg-[#007c65]"
        >
          {cta.label}
        </Link>
      )}
    </section>
  );
}

const integrationIcon = (name: string) => {
  if (name.startsWith(brand.name)) return <LogoIcon width={26} height={26} />;
  if (name === "Google Analytics 4") return <GaIcon width={26} height={26} />;
  if (name === "Google Search Console") return <GscIcon width={26} height={26} />;
  if (name === "Matomo") return <MatomoIcon width={26} height={26} />;
  if (name === "Firebase") return <FirebaseIcon width={26} height={26} />;
  if (name.startsWith("Google")) return <GoogleGIcon width={26} height={26} />;
  return (
    <span className="flex h-[26px] w-[26px] items-center justify-center rounded-md bg-[#eef0f3] text-[12px] font-bold text-rk-text-2">{name.charAt(0)}</span>
  );
};

function Integrations() {
  return (
    <div className="grid h-[519px] grid-cols-3 content-center gap-3 rounded-xl border border-[#e3e5e9] bg-[#f3f4f6] px-10">
      {integrations.map((n) => (
        <div key={n} className="flex h-14 items-center gap-3 rounded-lg bg-white px-4 text-[14px] font-medium text-rk-text shadow-[0_1px_4px_rgba(25,27,35,0.08)]">
          {integrationIcon(n)}
          {n}
        </div>
      ))}
    </div>
  );
}

function AiSummary() {
  return (
    <div className="relative h-[519px] overflow-hidden rounded-xl border border-[#e3e5e9] bg-[#f3f4f6]">
      <div className="absolute top-8 left-[79px] w-[660px] rounded-lg bg-white p-6 shadow-[0_0_14px_rgba(25,27,35,0.06)]">
        <div className="flex items-center gap-2 text-[16px] font-semibold text-[#8f5cf7]">
          <SparkleIcon />
          AI summary
        </div>
        <p className="mt-4 text-[14px] leading-6 text-rk-text">
          Organic sessions grew <b className="text-[#13a36e]">18%</b> month over month, driven mostly by new blog content ranking in the top 10. Paid search spend dropped{" "}
          <b className="text-[#e0304e]">14%</b> while conversions stayed flat, so cost per conversion improved.
        </p>
        <ul className="mt-4 space-y-2 text-[14px] leading-5 text-rk-text-2">
          <li>&bull; Brand visibility in AI answers increased to 22% of tracked prompts.</li>
          <li>&bull; Three pages lost positions for high-volume keywords &mdash; refresh them next.</li>
          <li>&bull; Social engagement peaked on Instagram after the product launch.</li>
        </ul>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            ["Sessions", "6.2K", "↑18%"],
            ["Conversion", "22%", "↑3.1%"],
            ["Spend", "1,248$", "↓14%"],
          ].map(([l, v, d]) => (
            <div key={l} className="rounded-md border border-dashed border-[#dfe2e6] p-3">
              <div className="text-[13px] font-semibold text-[#3a3d46]">{l}</div>
              <div className="mt-1 text-[24px] leading-8 font-bold text-[#1c8ff5]">{v}</div>
              <div className={`text-[11px] font-semibold ${d.startsWith("↑") ? "text-[#13a36e]" : "text-[#e0304e]"}`}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Scheduling() {
  return (
    <div className="relative h-[519px] overflow-hidden rounded-xl border border-[#e3e5e9] bg-[#f3f4f6]">
      <div className="absolute inset-y-0 left-[111px] w-[660px] bg-[#96979f]">
        <div className="absolute top-10 left-[110px] w-[440px] rounded-lg bg-white p-6 shadow-popover">
          <div className="text-[20px] leading-7 font-semibold text-rk-text">Schedule email</div>
          <div className="mt-4 text-[14px] leading-5 text-rk-text-2">Recipients</div>
          <div className="mt-1 flex h-9 items-center rounded-md border border-rk-border-strong px-3 text-[14px] text-rk-muted">client@example.com</div>
          <div className="mt-4 text-[14px] leading-5 text-rk-text-2">Frequency</div>
          <div className="mt-1 flex h-9 items-center justify-between rounded-md border border-rk-border-strong px-3 text-[14px] text-rk-text">
            Monthly, on the 1st
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
            </svg>
          </div>
          <div className="mt-4 text-[14px] leading-5 text-rk-text-2">Format</div>
          <div className="mt-2 flex gap-4 text-[14px] text-rk-text">
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-[5px] border-[#2359d6]" />
              PDF
            </span>
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border border-rk-border-strong" />
              Link to live report
            </span>
          </div>
          <div className="mt-6 flex gap-2">
            <span className="flex h-9 items-center rounded-md bg-[#009f81] px-3 text-[14px] font-medium text-white">Schedule</span>
            <span className="flex h-9 items-center rounded-md border border-rk-border-strong px-3 text-[14px] text-rk-text-2">Cancel</span>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 left-0 flex h-10 items-end border-t border-[#8a8b93] px-[60px] pb-1 text-[11px] text-[#5e5f66]">0</div>
      </div>
    </div>
  );
}

export function ReportsLanding() {
  return (
    <AppShell section="reports" footerPb={37}>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[723px] bg-[#410f7c]" />
        <div className="relative mx-auto max-w-[931px] pt-[65px] pb-[114px]">
          <h1 className="text-center text-[48px] leading-[56px] font-bold tracking-[-0.01em] text-white">
            Turn Marketing Data Into
            <br />
            Reports That Speak for You
          </h1>
          <p className="mt-[10px] text-center text-[16px] leading-6 text-white">
            Track what matters, prove your impact, make informed decisions, and save hours on reporting
          </p>
          <div className="mt-[41px] grid grid-cols-4 gap-3">
            {landingTemplates.map((t) => (
              <TemplateCard key={t.title} t={t} className="h-[222px]" />
            ))}
          </div>
          <div className="mt-[33px] text-center">
            <Link
              href={routes.reports.constructor}
              className="inline-flex h-10 items-center rounded-md border border-[#ab92c8] bg-white/10 px-3 text-[16px] font-medium text-white hover:bg-white/20"
            >
              Check all templates
            </Link>
          </div>

          <div className="mt-[57px] flex flex-col gap-[15px]">
            <Card
              title="From Setup to Sharing: Reporting Made Easy"
              sub="Build reports in minutes, customize them as needed, and keep your reports updated automatically—all without switching platforms."
              cta={{ label: "Get started", href: routes.reports.constructor }}
            >
              <ReportMock />
            </Card>
            <Card
              title="Connect 35+ Top Marketing Tools in One Report"
              sub={`Combine data from ${brand.name}, Google Analytics, Search Console, ad platforms, and social networks in a single report.`}
              cta={{ label: "Connect your tools", href: routes.reports.constructor }}
            >
              <Integrations />
            </Card>
            <Card
              title="Turn Data Into Insights With AI"
              sub="Add an AI summary to any report to explain what changed, why it matters, and what to do next."
              cta={{ label: "Try AI summary", href: routes.reports.constructor }}
            >
              <AiSummary />
            </Card>
            <Card title="Share Reports Automatically" sub="Schedule PDF reports or share live links with clients and teammates—branded with your logo and colors.">
              <Scheduling />
            </Card>
          </div>

          <section className="mt-4 rounded-md bg-[#410f7c] px-6 pt-8 pb-8">
            <h2 className="text-center text-[32px] leading-10 font-bold tracking-[-0.01em] text-white">Start with a template. Share results faster.</h2>
            <p className="mt-8 text-center text-[16px] leading-6 text-white">Skip the setup. Choose a report, customize it, and deliver real insights in no time.</p>
            <div className="mt-8 grid grid-cols-4 gap-3">
              {landingTemplates.map((t) => (
                <TemplateCard key={t.title} t={t} className="h-[223px]" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
