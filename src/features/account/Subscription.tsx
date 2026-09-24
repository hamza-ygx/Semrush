"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { BookIcon, ChevronDown, ExternalIcon } from "@/components/ui/icons";
import { AccountShell, PageTop } from "./AccountShell";
import { ApiKeyArt, MagnifierArt } from "./art";
import { seoUnits, subscriptionTabs, toolkits, type SubscriptionTab } from "./data";

const greenS = "inline-flex h-7 items-center rounded-md bg-[#009f81] px-2 text-[14px] font-semibold text-white hover:bg-[#007c65]";
const nf = (n: number) => n.toLocaleString("en-US");

const InfoI = () => <span className="ml-[7px] font-serif text-[14px] text-[#a9abb6] italic">i</span>;

const CrownIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="mt-[2px] shrink-0 text-[#ff642d]">
    <path d="M2 5.5 5 8l3-4.5L11 8l3-2.5-1.3 6.5H3.3zM3.3 14h9.4" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
  </svg>
);

function CardHead({ children }: { children: ReactNode }) {
  return <div className="flex h-[43px] items-center border-b border-[#eceef0] px-5 text-[16px] leading-6 font-semibold">{children}</div>;
}

function RadioCards({ options, compact }: { options: { label: string; desc?: string }[]; compact?: boolean }) {
  const [sel, setSel] = useState(0);
  return (
    <div role="radiogroup" className="grid max-w-[710px] grid-cols-2 gap-[13px]">
      {options.map((o, i) => {
        const on = i === sel;
        return (
          <button
            key={o.label}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => setSel(i)}
            className={`flex gap-2 rounded-md border bg-white px-3 text-left text-[14px] leading-5 ${o.desc ? "items-start pt-[11px] pb-[11px]" : "h-[45px] items-center"} ${
              on ? "border-[#7f86d6]" : "border-[#e0e1e9] hover:border-[#c4c7cf]"
            }`}
          >
            <span className={`${o.desc ? "mt-[2px]" : ""} flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${on ? "bg-rk-text" : "border border-[#c4c7cf]"}`}>
              {on && <span className="h-[6px] w-[6px] rounded-full bg-white" />}
            </span>
            <span className={compact ? "" : ""}>
              <b className="font-semibold">{o.label}</b>
              {o.desc && <span className="block">{o.desc}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StandardApi() {
  return (
    <div className="rounded-lg bg-white shadow-card">
      <CardHead>Standard API</CardHead>
      <div className="px-5 pt-5 pb-5">
        <div className="flex items-center text-[14px] leading-5">
          Balance
          <InfoI />
        </div>
        <div className="mt-[4px] text-[28px] leading-8 font-semibold">50,000</div>
        <p className="mt-[14px] flex gap-2 text-[14px] leading-5">
          <CrownIcon />
          <span>You can only use {brand.name} API if your API unit balance has not been exceeded. The option to purchase API units is only available for Business users.</span>
        </p>
        <p className="mt-3 mb-2 text-[14px] leading-5">Select subscription period:</p>
        <RadioCards options={[{ label: "Monthly" }, { label: "Annual" }]} />
        <div className="mt-4 flex items-center gap-6">
          <button type="button" className={greenS}>
            Upgrade to Business
          </button>
          <button type="button" className="text-[14px] text-rk-link hover:text-rk-link-hover">
            Request custom plan
          </button>
        </div>
      </div>
    </div>
  );
}

function TrendsApi() {
  return (
    <div className="rounded-lg bg-white shadow-card">
      <CardHead>
        .Trends API
        <InfoI />
      </CardHead>
      <div className="px-5 pt-5 pb-5">
        <p className="mb-2 text-[14px] leading-5">Select a suitable solution with 10,000 units.</p>
        <RadioCards
          options={[
            { label: "Premium", desc: "Overview plus in-depth traffic breakdown reports." },
            { label: "Basic", desc: "One report with traffic overview metrics." },
          ]}
        />
        <button type="button" className={`${greenS} mt-4`}>
          Buy .Trends API
        </button>
      </div>
    </div>
  );
}

function UnitsTable({ toolkit }: { toolkit: string }) {
  if (toolkit !== "SEO")
    return (
      <div className="flex h-full flex-col items-center justify-center py-20 text-center">
        <p className="text-[16px] font-semibold text-rk-text-2">{toolkit} is not included in your subscription</p>
        <p className="mt-1 text-[14px] text-rk-muted">Compare plans to find the one that fits your needs.</p>
      </div>
    );
  return (
    <div className="pr-[19px] pl-5">
      <div className="flex h-[46px] items-center border-b border-[#e0e1e9] text-[14px] leading-5">
        <span className="flex w-[482px] items-center">
          Unit type
          <InfoI />
        </span>
        <span className="w-[124px] text-right">Available</span>
      </div>
      {seoUnits.map((u) => (
        <div key={u.label} className="flex h-[44px] items-center text-[14px] leading-5">
          <div className="w-[482px] pt-[5px]">
            <div className="flex justify-between">
              <span>{u.label}</span>
              {u.limit !== undefined && (
                <span>
                  {nf(u.used ?? 0)} <span className="text-rk-muted">/ {nf(u.limit)}</span>
                </span>
              )}
            </div>
            {u.limit !== undefined && (
              <div className="mt-[5px] h-1 rounded-full bg-[#e0e1e9]">
                <div className="h-1 rounded-full bg-[#6c6e79]" style={{ width: `${u.limit ? Math.max((u.used ?? 0) / u.limit, u.used ? 0.02 : 0) * 100 : 0}%` }} />
              </div>
            )}
          </div>
          <span className="w-[124px] text-right text-[16px]">{u.available}</span>
          <span className="ml-9 flex w-[112px]">
            {u.buy ? (
              <button type="button" className={`${greenS} w-full justify-center`}>
                Buy
              </button>
            ) : (
              <button type="button" disabled className="inline-flex h-7 w-full items-center justify-center rounded-md border border-[#dcdcdc] bg-[#f5f5f5] text-[14px] text-[#8a8e9b]">
                Buy
              </button>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

function Summary() {
  const [tk, setTk] = useState("SEO");
  return (
    <div className="max-w-[1017px]">
      <div className="rounded-lg bg-white shadow-card">
        <div className="flex h-[43px] items-center gap-3 border-b border-[#eceef0] px-5">
          <span className="text-[16px] font-semibold">Toolkits &amp; Units</span>
          <button type="button" className="inline-flex h-[27px] items-center rounded-md bg-rk-btn-dark px-2 text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
            Compare plans
          </button>
        </div>
        <div className="flex">
          <div className="flex w-[220px] shrink-0 flex-col border-r border-[#eceef0] px-2 pt-[6px] pb-2">
            {toolkits.map((t) => (
              <button key={t} type="button" onClick={() => setTk(t)} title={t} className="flex h-[44px] items-center justify-between gap-2 rounded-md px-3 text-left text-[16px] whitespace-nowrap hover:bg-rk-bg">
                <span className="truncate">{t}</span>
                {t === tk && <span className="mr-0 shrink-0 h-[6px] w-[6px] rounded-full bg-rk-text" />}
              </button>
            ))}
            <button type="button" className="mt-auto flex h-[32px] items-center justify-between rounded-md bg-[#ebf0ff] px-3 text-[16px] hover:bg-[#dde5ff]">
              <span className="flex items-center gap-[10px]">
                <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#a9abb6]">
                  <path d="M2 5h11m-3-3 3 3-3 3M14 11H3m3-3-3 3 3 3" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                View units
              </span>
              <span className="mr-[7px] h-[6px] w-[6px] rounded-full bg-rk-text" />
            </button>
          </div>
          <div className="min-w-0 flex-1 pt-[2px] pb-[17px]">
            <UnitsTable toolkit={tk} />
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-[17px]">
        <div className="flex flex-col gap-4">
          <StandardApi />
          <TrendsApi />
        </div>
        <div>
          <div className="rounded-lg bg-white shadow-card">
            <CardHead>Apps</CardHead>
            <div className="flex flex-col items-center px-5 pt-4 pb-[33px] text-center">
              <MagnifierArt />
              <p className="mt-[13px] text-[16px] leading-6 font-semibold text-rk-text-2">Nothing here yet</p>
              <p className="mt-[2px] text-[14px] leading-[19px] text-rk-muted">
                Check out the variety of applications
                <br />
                that App Center has to offer.
              </p>
              <Link href={routes.apps} className="mt-[37px] flex items-center gap-[7px] text-[14px] text-rk-link hover:text-rk-link-hover">
                Go to App Center
                <ExternalIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiUnits() {
  return (
    <div className="flex gap-4 pr-[17px]">
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <StandardApi />
        <TrendsApi />
      </div>
      <div className="w-[400px] shrink-0 self-start rounded-lg bg-white px-6 pt-[40px] pb-[39px] text-center shadow-card">
        <div className="flex justify-center">
          <ApiKeyArt />
        </div>
        <h3 className="mt-[16px] text-[20px] leading-7 font-semibold">API Key has moved</h3>
        <p className="mt-[8px] text-[14px] leading-5">
          We’ve updated our layout. You can now find and
          <br />
          manage your API keys on a dedicated page.
        </p>
        <button type="button" className="mt-4 inline-flex h-7 items-center gap-2 rounded-md bg-rk-btn-dark px-2 text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
          Go to API Keys page
          <ExternalIcon />
        </button>
      </div>
    </div>
  );
}

function Placeholder({ tab }: { tab: "billing" | "payments" }) {
  return (
    <div className="max-w-[1017px] rounded-lg bg-white px-6 py-10 text-center shadow-card">
      <p className="text-[16px] font-semibold">{tab === "billing" ? "Billing information" : "No payments to show yet"}</p>
      <p className="mt-2 text-[14px] text-rk-muted">
        {tab === "billing" ? "Your billing details will be shown here once they are added to your account." : "Your invoices and receipts will appear here after your first payment."}
      </p>
    </div>
  );
}

function RecurringMenu() {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative">
      Recurring:{" "}
      <button type="button" onClick={() => setOpen((o) => !o)} className="inline-flex items-center gap-1 text-rk-link hover:text-rk-link-hover">
        Active
        <ChevronDown strokeWidth={2} />
      </button>
      {open && (
        <span className="absolute top-full left-[70px] z-30 mt-1 block w-[160px] rounded-md bg-white py-1 shadow-popover">
          {["Active", "Cancel recurring"].map((o) => (
            <button key={o} type="button" onClick={() => setOpen(false)} className="block w-full px-3 py-[6px] text-left hover:bg-rk-bg">
              {o}
            </button>
          ))}
        </span>
      )}
    </span>
  );
}

export function SubscriptionPage({ tab }: { tab: SubscriptionTab }) {
  return (
    <AccountShell active="subscription" search>
      <PageTop
        variant="sub"
        crumb="Subscription info"
        title="Subscription info"
        links={
          <button type="button" className="flex items-center gap-2 text-[14px] text-rk-link hover:text-rk-link-hover">
            <BookIcon width={16} height={16} />
            Help links
          </button>
        }
        meta={
          <>
            <span>Next payment: October 22, 2026 — $312.44</span>
            <span className="ml-7">
              <RecurringMenu />
            </span>
            <span className="ml-8">API Units: 50,000</span>
          </>
        }
        tabs={subscriptionTabs}
        activeTab={tab}
      />
      <div className={`px-6 pt-4 ${tab === "summary" ? "pb-[117px]" : ""}`}>
        {tab === "summary" && <Summary />}
        {tab === "api" && <ApiUnits />}
        {(tab === "billing" || tab === "payments") && <Placeholder tab={tab} />}
      </div>
    </AccountShell>
  );
}
