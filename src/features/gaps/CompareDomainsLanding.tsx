"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { routes } from "@/config/routes";
import { ChevronDown, CloseIcon, FlagSE, FlagUK, FlagUS, PlusIcon, SearchIcon } from "@/components/ui/icons";
import { Popover } from "@/components/ui/Popover";
import { CountryFlag } from "./Flags";
import { D1, Dot, OPEN_BORDER, Opt } from "./common";
import { cdLanding, countries, rival, you } from "./data";
import { FeatureRow, IllusCompareForm, IllusOverlap, IllusTable } from "./Illustrations";

const scopes = ["Root Domain", "Exact URL", "Subdomain", "Subfolder"];
const colors = [D1, "#2ed9ae", "#ff8e29", "#ff6b70", "#b58af2"];

export function ScopeDrop({
  label = "Root Domain",
  options = scopes,
  className = "",
  panelClassName = "left-px! w-full",
  testId,
}: {
  label?: string;
  options?: string[];
  className?: string;
  panelClassName?: string;
  testId?: string;
}) {
  const [v, setV] = useState(label);
  return (
    <Popover
      className={className}
      offset={6}
      panelClassName={panelClassName}
      trigger={({ toggle, open }) => (
        <button
          type="button"
          data-testid={testId}
          onClick={toggle}
          className="relative flex h-full w-full items-center justify-between pr-[10px] pl-3 text-[16px] text-rk-text"
        >
          {open && <span className={`pointer-events-none absolute -inset-px rounded-md border ${OPEN_BORDER}`} />}
          {v}
          <ChevronDown width={16} height={16} strokeWidth={2.2} />
        </button>
      )}
    >
      {(close) =>
        options.map((o) => (
          <Opt
            key={o}
            size="l"
            active={o === v}
            onClick={() => {
              setV(o);
              close();
            }}
          >
            {o}
          </Opt>
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
  testId,
  emptyDot = "#a8a8a8",
}: {
  emptyDot?: string;
  value: string;
  onChange: (v: string) => void;
  color: string;
  lead?: React.ReactNode;
  placeholder?: string;
  selects?: React.ReactNode;
  testId?: string;
}) {
  return (
    <div data-testid={testId} className="flex h-10 rounded-md border border-[#dcdfdf] bg-white">
      <div className="relative flex min-w-0 flex-1 items-center pr-3 pl-3">
        {lead ?? <Dot color={value ? color : emptyDot} size={11} className="mr-[8px] ml-[1px]" />}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="peer min-w-0 flex-1 bg-transparent text-[16px] text-rk-text outline-none placeholder:text-[#8b8d8c]"
        />
        <span className="pointer-events-none absolute -top-[2px] -right-[3px] -bottom-px -left-[2px] z-10 hidden rounded-md border-2 border-[#9798ee] peer-focus:block" />
        {value && (
          <button type="button" aria-label="Clear" onClick={() => onChange("")} className="text-[#8b8d8c] hover:text-rk-text">
            <CloseIcon width={14} height={14} />
          </button>
        )}
      </div>
      {selects ?? <ScopeDrop className="w-[179px] border-l border-[#dcdfdf]" panelClassName="left-0! w-[calc(100%+1px)]" />}
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
      trigger={({ toggle, open }) => (
        <button
          type="button"
          onClick={toggle}
          style={{ width }}
          className={`flex h-10 items-center justify-between rounded-md border bg-white pr-[12px] pl-[13px] text-[16px] text-rk-text hover:bg-rk-bg ${open ? OPEN_BORDER : "border-[#dcdfdf]"}`}
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
          <Opt
            key={d.code}
            size="l"
            active={d.code === db.code}
            onClick={() => {
              setDb(d);
              close();
            }}
          >
            <span className="flex w-[14px] justify-center [&>svg]:h-[11px] [&>svg]:w-[14px]">{d.flag}</span>
            {d.code}
          </Opt>
        ))
      }
    </Popover>
  );
}

const WorldIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
    <circle cx="8" cy="8" r="6.6" fill="#fff" stroke="#a9abaa" strokeWidth="1.3" />
    <path
      d="M4 4.2c1.6.4 2.5 1.6 2.2 3-.2 1 .9 1.4.7 2.8M9.3 2c-.4 1.2.3 2 1.4 2.2 1.1.2 1.6 1 1.1 2.3M10.4 10c.9.2 1.9.9 2.6 1.6"
      fill="none"
      stroke="#a9abaa"
      strokeWidth="1.2"
    />
  </svg>
);

export function CountrySelect() {
  const [v, setV] = useState(countries[0].name);
  const [q, setQ] = useState("");
  const list = countries.filter((c) => c.name.toLowerCase().includes(q.trim().toLowerCase()));
  const cur = countries.find((c) => c.name === v) ?? countries[0];
  return (
    <Popover
      offset={3}
      panelClassName="w-[283px] py-0!"
      trigger={({ toggle, open }) => (
        <button
          type="button"
          data-testid="cd-country"
          onClick={toggle}
          className={`flex h-10 w-[149px] items-center rounded-md border bg-white pr-[10px] pl-3 text-[16px] text-rk-text ${open ? OPEN_BORDER : "border-[#dcdfdf]"}`}
        >
          <span className="mr-[7px] flex w-4 justify-center">{cur.code ? <CountryFlag code={cur.code} /> : <WorldIcon />}</span>
          <span className="flex-1 truncate text-left">{cur.name}</span>
          <ChevronDown width={16} height={16} strokeWidth={2.2} className="shrink-0" />
        </button>
      )}
    >
      {(close) => (
        <div>
          <div className="flex h-[42px] items-center rounded-md border-2 border-[#8f95ee] bg-white pl-[11px]">
            <SearchIcon width={16} height={16} className="shrink-0 text-[#a9abaa]" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search country"
              className="ml-2 min-w-0 flex-1 bg-transparent text-[16px] outline-none"
            />
          </div>
          <div className="max-h-[284px] overflow-y-auto py-[2px] [scrollbar-width:thin]">
            {list.map((c) => (
              <Opt
                key={c.name}
                size="l"
                active={c.name === v}
                className="gap-[5px]! pl-[12px]!"
                onClick={() => {
                  setV(c.name);
                  setQ("");
                  close();
                }}
              >
                <span className="flex w-4 justify-center">{c.code ? <CountryFlag code={c.code} /> : <WorldIcon />}</span>
                {c.name}
              </Opt>
            ))}
            {list.length === 0 && <div className="px-3 py-2 text-[14px] text-rk-muted">Nothing found</div>}
          </div>
        </div>
      )}
    </Popover>
  );
}

export function AddCompetitors({ onClick, left = 3, testId }: { onClick: () => void; left?: number; testId?: string }) {
  if (left <= 0) return <span />;
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      className="flex items-center gap-[7px] pl-[13px] text-[16px] text-rk-link hover:text-rk-link-hover"
    >
      <PlusIcon width={14} height={14} strokeWidth={2} />
      Add up to {left} {left === 1 ? "competitor" : "competitors"}
    </button>
  );
}

export function CompareDomainsLanding({ q }: { q?: string }) {
  const router = useRouter();
  const [domains, setDomains] = useState(() => [...(q ? q.split(",").slice(0, 5) : [""]), ""].slice(0, Math.max(2, q ? Math.min(5, q.split(",").length) : 2)));
  const set = (i: number, v: string) => setDomains((d) => d.map((x, j) => (j === i ? v : x)));
  const compare = () => {
    const other = domains.slice(1).filter(Boolean);
    router.push(
      `${routes.compareDomains}?q=${encodeURIComponent(domains[0] || you)}&compareWith=${encodeURIComponent((other.length ? other : [rival]).join(","))}`,
    );
  };
  return (
    <div className="px-[36px] pt-6">
      <div className="mx-auto max-w-[980px]">
        <section className="rounded-lg bg-white px-10 pt-[37px] pb-[40px] text-center shadow-card">
          <h1 className="text-[36px] leading-[44px] font-bold">Compare Domains</h1>
          <p className="mt-[11px] text-[16px] leading-6 text-rk-text">
            Compare SEO and PPC growth for up to five domains in a quick competitor analysis report.
          </p>
          <form
            className="mx-auto mt-[32px] w-[731px] text-left"
            onSubmit={(e) => {
              e.preventDefault();
              compare();
            }}
          >
            <div className="flex items-center gap-[9px] text-[14px] leading-5">
              <span className="font-semibold">Examples:</span>
              <button type="button" onClick={() => setDomains([...cdLanding.examples])} className="text-rk-link hover:text-rk-link-hover">
                {cdLanding.examples.join(" + ")}
              </button>
            </div>
            <div className="mt-[16px] flex flex-col gap-4">
              {domains.map((d, i) => (
                <DomainRow
                  key={i}
                  value={d}
                  onChange={(v) => set(i, v)}
                  color={colors[i]}
                  selects={<ScopeDrop testId={`cd-scope-${i}`} className="w-[179px] border-l border-[#dcdfdf]" panelClassName="left-0! w-[calc(100%+1px)]" />}
                />
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <AddCompetitors onClick={() => setDomains((d) => (d.length < 5 ? [...d, ""] : d))} left={5 - domains.length} />
              <div className="flex items-center gap-3">
                {q ? <DbSelect /> : <CountrySelect />}
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
