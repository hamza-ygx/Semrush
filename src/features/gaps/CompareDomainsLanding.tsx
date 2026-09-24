"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { routes } from "@/config/routes";
import { ChevronDown, CloseIcon, FlagSE, FlagUK, FlagUS, PlusIcon } from "@/components/ui/icons";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { D1, Dot } from "./common";
import { cdLanding, rival, you } from "./data";
import { FeatureRow, IllusCompareForm, IllusOverlap, IllusTable } from "./Illustrations";

const scopes = ["Root Domain", "Subdomain", "Subfolder", "Exact URL"];
const colors = [D1, "#2ed9ae", "#ff8e29", "#ff6b70", "#b58af2"];

export function ScopeDrop({ label = "Root Domain", options = scopes, className = "" }: { label?: string; options?: string[]; className?: string }) {
  const [v, setV] = useState(label);
  return (
    <Popover
      className={className}
      panelClassName="w-full"
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className="flex h-full w-full items-center justify-between pr-[10px] pl-3 text-[16px] text-rk-text">
          {v}
          <ChevronDown width={16} height={16} strokeWidth={2.2} />
        </button>
      )}
    >
      {(close) =>
        options.map((o) => (
          <MenuItem
            key={o}
            active={o === v}
            onClick={() => {
              setV(o);
              close();
            }}
          >
            {o}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

export function DomainRow({
  value,
  onChange,
  color,
  lead,
  placeholder = "Add domain",
  selects,
}: {
  value: string;
  onChange: (v: string) => void;
  color: string;
  lead?: React.ReactNode;
  placeholder?: string;
  selects?: React.ReactNode;
}) {
  return (
    <div className="flex h-10 rounded-md border border-[#dcdfdf] bg-white focus-within:border-[#7a86f2]">
      <div className="flex min-w-0 flex-1 items-center pr-3 pl-3">
        {lead ?? <Dot color={value ? color : "#b8b9bd"} size={11} className="mr-[8px] ml-[1px]" />}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[16px] text-rk-text outline-none placeholder:text-[#8a8e9b]"
        />
        {value && (
          <button type="button" aria-label="Clear" onClick={() => onChange("")} className="text-[#8a8e9b] hover:text-rk-text">
            <CloseIcon width={14} height={14} />
          </button>
        )}
      </div>
      {selects ?? <ScopeDrop className="w-[179px] border-l border-[#dcdfdf]" />}
    </div>
  );
}

const dbs = [
  { code: "SE", flag: <FlagSE /> },
  { code: "US", flag: <FlagUS /> },
  { code: "UK", flag: <FlagUK /> },
];

export function DbSelect({ width = 88 }: { width?: number }) {
  const [db, setDb] = useState(dbs[0]);
  return (
    <Popover
      align="right"
      panelClassName="min-w-[120px]"
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={toggle}
          style={{ width }}
          className="flex h-10 items-center justify-between rounded-md border border-[#dcdfdf] bg-white pr-[12px] pl-[13px] text-[16px] text-rk-text hover:bg-rk-bg"
        >
          <span className="flex items-center gap-[10px]">
            <span className="flex w-[14px] justify-center [&>svg]:h-[11px] [&>svg]:w-[14px]">{db.flag}</span>
            {db.code}
          </span>
          <ChevronDown width={13} height={13} strokeWidth={2.4} />
        </button>
      )}
    >
      {(close) =>
        dbs.map((d) => (
          <MenuItem
            key={d.code}
            active={d.code === db.code}
            onClick={() => {
              setDb(d);
              close();
            }}
          >
            {d.flag}
            {d.code}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

export function AddCompetitors({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="flex items-center gap-[7px] pl-[13px] text-[16px] text-rk-link hover:text-rk-link-hover disabled:opacity-50">
      <PlusIcon width={14} height={14} strokeWidth={2} />
      Add up to {3} competitors
    </button>
  );
}

export function CompareDomainsLanding() {
  const router = useRouter();
  const [domains, setDomains] = useState([you, ""]);
  const set = (i: number, v: string) => setDomains((d) => d.map((x, j) => (j === i ? v : x)));
  const compare = () => {
    const other = domains.slice(1).filter(Boolean);
    router.push(`${routes.compareDomains}?compareWith=${encodeURIComponent((other.length ? other : [rival]).join(","))}`);
  };
  return (
    <div className="px-[36px] pt-6">
      <div className="mx-auto max-w-[980px]">
        <section className="rounded-lg bg-white px-10 pt-[37px] pb-[40px] text-center shadow-card">
          <h1 className="text-[36px] leading-[44px] font-bold">Compare Domains</h1>
          <p className="mt-[11px] text-[16px] leading-6 text-rk-text">Compare SEO and PPC growth for up to five domains in a quick competitor analysis report.</p>
          <form
            className="mx-auto mt-[32px] w-[731px] text-left"
            onSubmit={(e) => {
              e.preventDefault();
              compare();
            }}
          >
            <div className="flex items-center gap-[9px] text-[14px] leading-5">
              <span className="font-semibold">Examples:</span>
              <button
                type="button"
                onClick={() => setDomains([...cdLanding.examples])}
                className="text-rk-link hover:text-rk-link-hover"
              >
                {cdLanding.examples.join(" + ")}
              </button>
            </div>
            <div className="mt-[16px] flex flex-col gap-4">
              {domains.map((d, i) => (
                <DomainRow key={i} value={d} onChange={(v) => set(i, v)} color={colors[i]} />
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <AddCompetitors onClick={() => setDomains((d) => (d.length < 5 ? [...d, ""] : d))} disabled={domains.length >= 5} />
              <div className="flex items-center gap-3">
                <DbSelect />
                <button type="submit" className="h-10 rounded-md bg-[#191b1c] px-[13px] text-[16px] font-medium text-white hover:bg-[#2b2e38]">
                  Compare
                </button>
              </div>
            </div>
          </form>
        </section>
        <section className="mt-[18px] rounded-lg bg-white px-10 pt-[100px] pb-[42px] shadow-card">
          <div className="flex flex-col gap-[62px]">
            <FeatureRow
              illus={<IllusCompareForm />}
              title="Benchmark SEO and Traffic Metrics"
              text="Visualize where you stand in the market. Compare key performance indicators across rival domains to see where you lead and where you trail behind."
            />
            <FeatureRow
              reverse
              illus={<IllusOverlap />}
              title="Uncover Growth Opportunities"
              text="Identify untapped potential in organic and paid traffic channels with keyword overlaps, traffic trends, and backlink analysis."
            />
            <FeatureRow
              illus={<IllusTable />}
              title="In-Depth Competitor Analysis"
              text="Choose your focus: compare at the root domain, subdomain, or subfolder level for precision targeting."
            />
          </div>
        </section>
      </div>
    </div>
  );
}
