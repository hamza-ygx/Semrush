"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { ChatGptIcon, DesktopIcon, GeminiIcon, GoogleIcon, MobileIcon } from "@/components/ui/icons";
import { MiniGauge } from "@/components/ui/charts";
import { aiSearch, countries, seoWidget } from "./data";
import { Flag } from "./flags";
import { Chevron, CloseX, Delta, I, LinkDropdown, MenuPanel, SearchList, WidgetCard, useMenu } from "./ui";

const AI = routes.ai.overview;

function Tab({ children, tone }: { children: ReactNode; tone: "ai" | "seo" }) {
  return (
    <span
      className={`flex h-7 items-center justify-center rounded-tl-lg rounded-br-lg text-[14px] leading-5 ${
        tone === "ai" ? "w-[114px] bg-rk-ai-bg text-rk-ai-text" : "w-[76px] bg-rk-seo-bg text-rk-seo-text"
      }`}
    >
      {children}
    </span>
  );
}

function CountryDropdown() {
  const { open: mOpen, ref: mRef, toggle: mToggle, close: mClose } = useMenu();
  const [c, setC] = useState("Sweden");
  return (
    <div ref={mRef} className="relative">
      <button type="button" data-dd="ai-country" onClick={mToggle} className="flex items-center gap-[6px] text-[14px] leading-5 text-rk-link hover:text-rk-link-hover">
        <Flag country={c} />
        <span className={mOpen ? "underline underline-offset-[5px]" : ""}>{c}</span>
        <Chevron />
      </button>
      {mOpen && (
        <MenuPanel className="top-[calc(100%+1px)] left-[1px] px-0 pt-0 pb-0">
          <SearchList
            items={countries}
            render={(v) => (
              <>
                <Flag country={v} />
                {v}
              </>
            )}
            first={
              <button
                type="button"
                onClick={() => {
                  setC("Worldwide");
                  mClose();
                }}
                className="flex h-[37px] w-full items-center gap-2 border-b border-rk-border px-2 pb-[4px] text-left text-[14px] hover:bg-rk-bg"
              >
                <Flag country="Worldwide" />
                Worldwide
              </button>
            }
            onPick={(v) => {
              setC(v);
              mClose();
            }}
          />
        </MenuPanel>
      )}
    </div>
  );
}

function AiRowIcon({ k }: { k: string }) {
  if (k === "chatgpt") return <ChatGptIcon className="text-rk-text" />;
  if (k === "gemini") return <GeminiIcon />;
  return <GoogleIcon />;
}

export function AiSearchWidget({ onClose }: { onClose: () => void }) {
  return (
    <WidgetCard>
      <div className="flex h-[43px] shrink-0 items-start justify-between border-b-2 border-rk-border pr-[20px]">
        <Tab tone="ai">AI Search</Tab>
        <div className="flex items-center gap-[19px] pt-[13px]">
          <CountryDropdown />
          <CloseX onClick={onClose} />
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 grid-rows-[auto_auto_repeat(4,minmax(20px,1fr))] pt-[23px] pr-[7px] pb-[16px] pl-5 text-[14px] leading-5">
        <div>AI Visibility</div>
        <div>Mentions</div>
        <div>Cited pages</div>
        <Link href={AI} className="mt-[2px] mb-2 flex h-8 items-center gap-[6px]">
          <MiniGauge size={33} />
          <span className="text-[24px] leading-8 font-semibold text-rk-number">{aiSearch.visibility}</span>
        </Link>
        <Link href={AI} className="mt-[2px] mb-2 h-8 text-[24px] leading-8 font-semibold text-rk-number hover:opacity-80">
          {aiSearch.mentions}
        </Link>
        <Link href={AI} className="mt-[2px] mb-2 h-8 text-[24px] leading-8 font-semibold text-rk-number hover:opacity-80">
          {aiSearch.cited}
        </Link>
        {aiSearch.rows.map((r) => (
          <div key={r.key} className="contents">
            <div className="flex items-center gap-1">
              <AiRowIcon k={r.key} />
              {r.label}
            </div>
            <div className="flex items-center">
              <Link href={AI} className="text-rk-link hover:text-rk-link-hover">
                {r.mentions}
              </Link>
            </div>
            <div className="flex items-center">
              <Link href={AI} className="text-rk-link hover:text-rk-link-hover">
                {r.cited}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}

function AsGauge() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} className="shrink-0">
      <circle cx="12" cy="12" r="11.5" fill="#fff" stroke="#e0e2e1" />
      <path d="M12.6 6.5 11.6 21.5" stroke="#ff8c00" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Spark({ data }: { data: number[] }) {
  const w = 120;
  const h = 20;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, 1 + ((max - v) / (max - min || 1)) * (h - 3)]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="mt-[5px] block">
      <path d={`${line}L${w} ${h}L0 ${h}Z`} fill="#dcdcf8" />
      <path d={line} fill="none" stroke="#8d89e0" strokeWidth={1} />
    </svg>
  );
}

function Cell({ children, sep, className = "" }: { children: ReactNode; sep?: boolean; className?: string }) {
  return <div className={`h-[78px] min-w-0 overflow-hidden ${sep ? "border-l border-rk-border pl-[21px]" : ""} ${className}`}>{children}</div>;
}

function CellLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-[6px] text-[14px] leading-5">
      {children}
      <I />
    </div>
  );
}

function BigLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-[22px] leading-7 font-semibold text-rk-number hover:opacity-80">
      {children}
    </Link>
  );
}

const scopes = ["Root Domain", "Subdomain"] as const;
const devices = ["Desktop", "Mobile"] as const;
const Sep = () => <span className="h-4 w-px bg-rk-border" />;

export function SeoWidget({ onClose }: { onClose: () => void }) {
  const s = seoWidget;
  return (
    <WidgetCard className="@container pb-[23px]">
      <div className="flex flex-wrap items-start border-b border-rk-border pr-[20px] @min-[640px]:h-[45px]">
        <Tab tone="seo">SEO</Tab>
        <CloseX onClick={onClose} className="order-2 mt-[10px] ml-auto @min-[640px]:order-3 @min-[640px]:ml-[46px]" />
        <div className="order-3 flex h-[40px] basis-full items-center gap-2 pt-1 pl-5 @min-[640px]:order-2 @min-[640px]:ml-auto @min-[640px]:h-auto @min-[640px]:basis-auto @min-[640px]:pt-[14px]">
          <LinkDropdown id="seo-scope" value="Root Domain" options={scopes} panelClassName="w-[104px]" panelTop={3} />
          <Sep />
          <LinkDropdown
            id="seo-country"
            value="Sweden"
            options={["Sweden", "United States"] as const}
            render={(v) => (
              <>
                <Flag country={v} />
                {v}
              </>
            )}
            renderOption={(v) => (
              <>
                <Flag country={v} />
                {v}
              </>
            )}
            panelClassName="w-[160px]"
          />
          <Sep />
          <LinkDropdown
            id="seo-device"
            value="Desktop"
            options={devices}
            render={(v) => (
              <>
                {v === "Desktop" ? <DesktopIcon /> : <MobileIcon />}
                {v}
              </>
            )}
            renderOption={(v) => (
              <>
                {v === "Desktop" ? <DesktopIcon /> : <MobileIcon />}
                {v}
              </>
            )}
            panelClassName="w-[94px]"
            panelTop={3}
          />
          <Sep />
          <span className="text-[14px] text-rk-muted">{s.date}</span>
        </div>
      </div>
      <div className="grid grid-cols-[minmax(0,180px)_minmax(0,181px)_minmax(0,1fr)] gap-y-[22px] px-5 pt-[13px] @min-[640px]:grid-cols-[minmax(0,207px)_minmax(0,215px)_minmax(0,1fr)]">
        <Cell>
          <CellLabel>Authority Score</CellLabel>
          <div className="mt-[6px] flex items-center gap-2">
            <AsGauge />
            <span className="flex items-baseline gap-1">
              <BigLink href={routes.domainOverview}>{s.authorityScore}</BigLink>
              <span className="text-[12px] text-rk-muted">{s.authorityDelta}</span>
            </span>
          </div>
          <div className="mt-[6px] flex items-center gap-[6px] text-[13px] leading-4 whitespace-nowrap text-rk-muted">
            <span title={`${brand.name} Rank`} className="max-w-[100px] truncate">{brand.name} Rank</span>
            <span className="flex items-center gap-[3px]">
              <span className="text-rk-danger">↓</span>
              <Link href={routes.rank} className="text-rk-link hover:text-rk-link-hover">
                {s.rank}
              </Link>
            </span>
          </div>
        </Cell>
        <Cell sep>
          <CellLabel>Organic Traffic</CellLabel>
          <div className="mt-[6px] flex items-baseline gap-1">
            <BigLink href={routes.organic.overview}>{s.organicTraffic}</BigLink>
            <Delta v={s.organicTrafficDelta} />
          </div>
          <Link href={routes.organic.overview}>
            <Spark data={s.organicTrafficSpark} />
          </Link>
        </Cell>
        <Cell sep className="pl-[22px]">
          <CellLabel>Organic Keywords</CellLabel>
          <div className="mt-[6px] flex items-baseline gap-1">
            <BigLink href={routes.organic.positions}>{s.organicKeywords}</BigLink>
            <Delta v={s.organicKeywordsDelta} />
          </div>
          <Link href={routes.organic.positions}>
            <Spark data={s.organicKeywordsSpark} />
          </Link>
        </Cell>
        <Cell>
          <CellLabel>Paid Keywords</CellLabel>
          <div className="mt-[6px] flex items-baseline gap-1">
            <BigLink href={routes.domainOverview}>{s.paidKeywords}</BigLink>
            <span className="text-[12px] text-rk-muted">{s.paidKeywordsPct}</span>
          </div>
          <div className="mt-[6px] flex items-center gap-[10px] text-[13px] leading-4 text-rk-muted">
            Paid Traffic
            <Link href={routes.domainOverview} className="text-rk-link hover:text-rk-link-hover">
              {s.paidTraffic}
            </Link>
          </div>
        </Cell>
        <Cell sep>
          <CellLabel>Ref. Domains</CellLabel>
          <div className="mt-[6px] flex items-baseline gap-1">
            <BigLink href={routes.referringDomains}>{s.refDomains}</BigLink>
            <Delta v={s.refDomainsDelta} />
          </div>
          <div className="mt-[6px] flex items-center gap-[10px] text-[13px] leading-4 text-rk-muted">
            Backlinks
            <span className="flex items-center gap-[3px]">
              <span className="text-rk-success">↑</span>
              <Link href={routes.backlinks} className="text-rk-link hover:text-rk-link-hover">
                {s.backlinks}
              </Link>
            </span>
          </div>
        </Cell>
      </div>
    </WidgetCard>
  );
}

