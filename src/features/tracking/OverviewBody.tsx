"use client";

import { useEffect, useState } from "react";
import { FilterBar } from "./FilterBar";
import { DomainChip, Select, SearchInput } from "./controls";
import { OverviewChartCard, type ChartMode } from "./OverviewChart";
import { RankingsTable } from "./RankingsTable";
import { TipBox } from "./Tip";
import { Info } from "./ui";
import { ChevronBold, XBoldIcon } from "./icons";
import { currentBegin, useTracking } from "./context";
import { project } from "./data";

const competitors = ["verksamt.se", "www.skatteverket.se", "www.fortnox.se", "www.bokio.se"];

function AddDomain({ disabled }: { disabled?: boolean }) {
  return <Select label="Add domain" className="w-[120px]" options={competitors} disabled={disabled} />;
}

function YouField() {
  return (
    <div className="flex h-7 w-[211px] items-center gap-[9px] rounded-md border border-rk-border-strong bg-[#f4f5f9] pl-2 text-[14px] text-rk-text">
      <span className="rounded-full bg-[#e1e3ff] px-[8px] leading-5 text-[#5652cc]">You</span>
      {project.domain}
    </div>
  );
}

function GreyChip() {
  return (
    <div className="flex h-7 items-stretch rounded-md border border-[#dfe2f0] bg-[#f0f1f7] text-[14px] text-[#a9abb6]">
      <span className="flex items-center px-[8px]">{project.domain}</span>
      <span className="flex w-[26px] items-center justify-center border-l border-[#dfe2f0]">
        <XBoldIcon width={14} height={14} />
      </span>
    </div>
  );
}

const row = "flex h-8 w-full items-center justify-between px-2 text-left text-[14px] text-rk-text hover:bg-rk-bg";

function TopPositionsPanel({ close }: { close: () => void }) {
  return (
    <div className="w-[203px] pt-[9px] pb-[1px]">
      <div className="flex items-center gap-[6px] px-2 text-[14px] leading-5 font-semibold text-rk-text">
        For {project.domain}
        <Info />
      </div>
      <div className="mt-[6px]">
        {["Top 3", "Top 10", "Top 20", "Top 100"].map((t) => (
          <button key={t} type="button" onClick={close} className={row}>
            {t}
            <ChevronBold width={14} height={14} className="-rotate-90 text-rk-muted" />
          </button>
        ))}
      </div>
      <div className="my-1 border-t border-rk-border" />
      {["# 4-10", "# 11-20", "# 21-100"].map((t) => (
        <button key={t} type="button" onClick={close} className={row}>
          {t}
          <ChevronBold width={14} height={14} className="-rotate-90 text-rk-muted" />
        </button>
      ))}
      <div className="my-1 border-t border-rk-border" />
      <button type="button" onClick={close} className={row}>
        Out of top 100
        <span className="pr-[1px] text-rk-muted">{project.keywords}</span>
      </button>
    </div>
  );
}

function TagsPanel({ close }: { close: () => void }) {
  return (
    <div className="w-[415px] pt-[14px] pb-[15px]">
      <div className="flex gap-[9px] px-[17px]">
        <Select label="Include" placeholder={false} options={["Include", "Exclude"]} className="w-[110px]" />
        <Select label="Select a tag" options={["No tags"]} className="w-[239px]" panelClassName="min-w-[239px]" />
      </div>
      <button type="button" disabled className="mx-auto mt-[20px] flex items-center gap-[10px] text-[14px] leading-5 text-[#a4bdf5]">
        <svg viewBox="0 0 16 16" width={14} height={14}>
          <path d="M8 2.5v11M2.5 8h11" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
        </svg>
        Add condition
      </button>
      <div className="mt-[13px] border-t border-rk-border" />
      <button type="button" onClick={close} className="mt-[15px] ml-[17px] h-7 rounded-md bg-rk-btn-dark px-2 text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
        Tag keywords
      </button>
    </div>
  );
}

export function OverviewBody({
  prediction,
  serpOptions,
  volumeOptions,
  intentOptions,
  kdOptions,
}: {
  prediction: boolean;
  serpOptions: string[];
  volumeOptions: string[];
  intentOptions: string[];
  kdOptions: string[];
}) {
  const { begin, setBegin } = useTracking();
  const [mode, setMode] = useState<ChartMode>(prediction ? "pg" : "ca");
  const [toast, setToast] = useState(false);
  const current = begin === currentBegin;
  const pg = mode === "pg";

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 6000);
    return () => clearTimeout(t);
  }, [toast]);

  const onMode = (m: ChartMode) => {
    if (m === "pg" && !current) {
      setBegin(currentBegin);
      setToast(true);
    }
    setMode(m);
  };

  return (
    <div className="relative px-8 pt-[17px]">
      <FilterBar
        maxWidth={[900, 850]}
        top={
          pg ? (
            <>
              <YouField />
              <GreyChip />
              <AddDomain disabled />
              <AddDomain disabled />
              <AddDomain disabled />
              <AddDomain disabled />
            </>
          ) : (
            <>
              <DomainChip />
              <AddDomain />
              <AddDomain />
              <AddDomain />
              <AddDomain />
            </>
          )
        }
        filters={
          <>
            <SearchInput placeholder="Filter by keyword" width={187} />
            <Select
              label="Top positions & changes"
              testid="pt-f-top"
              className="w-[203px]"
              offset={4}
              panelClassName="!py-0"
              tip={`Filter keywords by ${project.domain} positions and their changes. E.g.: All keywords in top 10, new keywords in top 3, etc...`}
              panel={(close) => <TopPositionsPanel close={close} />}
            />
            <Select label="SERP Features" options={serpOptions} className="w-[138px]" />
            <Select label="Tags" testid="pt-f-tags" className="w-[72px]" offset={4} panelClassName="!py-0" panel={(close) => <TagsPanel close={close} />} />
            <Select label="Intent" options={intentOptions} className="w-[78px]" />
            <Select label="Volume" options={volumeOptions} className="w-[90px]" />
            <Select label="KD %" options={kdOptions} className="w-[79px]" />
            <Select label="Advanced filters" options={["Include keywords", "Exclude keywords", "URL"]} className="w-[149px]" />
          </>
        }
      />
      {toast && (
        <div className="pointer-events-none absolute top-[17px] right-8 h-7 w-[150px]">
          <TipBox place="bottom-end" gap={13} arrow={152 - 76} className="w-[227px]">
            Switched to the current period to show Potential Growth.
          </TipBox>
        </div>
      )}
      <OverviewChartCard mode={mode} current={current} onMode={onMode} />
      <RankingsTable />
    </div>
  );
}
