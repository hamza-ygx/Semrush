"use client";

import { useState } from "react";
import { routes } from "@/config/routes";
import { useOutsideClose } from "@/components/ui/Popover";
import { ChevronDown, CloseIcon, SearchIcon } from "@/components/ui/icons";
import { CountryFlag, allCountries } from "../countries";
import { Flag, Widget } from "../ui";
import { EmptyState } from "./EmptyState";
import { CountriesIllustration } from "./Illustrations";

const top = [
  { code: "US", name: "United States" },
  { code: "UK", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
];

const options = [...top, ...allCountries.filter((c) => !top.some((t) => t.code === c.code)), { code: "SE", name: "Sweden" }].sort((x, y) => x.name.localeCompare(y.name));

const codes: Record<string, string> = Object.fromEntries(options.map((c) => [c.name, c.code]));

const metrics: Record<string, [string, string, string, string]> = {
  Sweden: ["59", "134", "0", "0"],
  India: ["1", "2", "0", "0"],
};

function AddCountry({ taken, onPick }: { taken: string[]; onPick: (c: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const close = () => {
    setOpen(false);
    setQ("");
  };
  const ref = useOutsideClose<HTMLDivElement>(open, close);
  const match = (c: { name: string }) => !taken.includes(c.name) && c.name.toLowerCase().includes(q.trim().toLowerCase());
  const row = (c: { code: string; name: string }, key: string) => (
    <button
      key={key}
      type="button"
      onClick={() => {
        onPick(c.name);
        close();
      }}
      className="flex h-8 w-full items-center gap-[9px] pl-[10px] text-left text-[14px] leading-5 text-rk-text hover:bg-rk-bg"
    >
      <CountryFlag code={c.code} />
      {c.name}
    </button>
  );
  const topRows = top.filter(match);
  return (
    <div ref={ref} className="relative xl:min-w-0 xl:flex-1">
      <button
        type="button"
        data-testid="add-country"
        aria-expanded={open}
        onClick={() => (open ? close() : setOpen(true))}
        className={`flex h-7 w-[174px] items-center justify-between rounded-md border pr-[10px] xl:w-full pl-[8px] text-[14px] text-rk-muted ${open ? "border-[#a9b8ea] bg-[#f8faff]" : "border-[#d4d6d5] bg-white"}`}
      >
        Add country
        <ChevronDown width={18} height={18} className="-mr-[2px] text-rk-text [&_path]:stroke-[2]" />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+3px)] left-0 z-50 w-[259px] rounded-md bg-white shadow-popover">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-[10px] -translate-y-1/2 text-[#a9abaa]" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="h-[34px] w-full rounded-md border-2 border-[#8f9cea] pr-2 pl-[32px] text-[14px] outline-none placeholder:text-[#a9abaa]"
            />
          </div>
          <div className="mt-[3px] max-h-[243px] overflow-y-auto pb-1 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d6d8d7]">
            {topRows.map((c) => row(c, `top-${c.code}`))}
            {topRows.length > 0 && <div className="border-t border-rk-border" />}
            {options.filter(match).map((c) => row(c, c.code))}
          </div>
        </div>
      )}
    </div>
  );
}

export function CompareCountries() {
  const [picked, setPicked] = useState<string[]>(["Sweden"]);
  const [compared, setCompared] = useState<string[] | null>(null);
  return (
    <>
      <div className="flex items-center gap-[8.7px]">
        {picked.map((c) => (
          <div key={c} className="-mr-[1.5px] flex h-7 w-[175px] shrink-0 overflow-hidden xl:w-auto xl:min-w-0 xl:flex-1 rounded-md border border-[#a3a8ea] bg-[#eef2fd] text-[14px]">
            <span className="flex flex-1 items-center gap-[10px] pl-[10px]">
              <Flag code={codes[c] ?? null} width={15} height={11} />
              {c}
            </span>
            <button
              type="button"
              aria-label={`Remove ${c}`}
              onClick={() => setPicked(picked.filter((x) => x !== c))}
              className="flex w-[26px] items-center justify-center border-l border-[#a3a8ea] text-rk-text hover:bg-[#dfe5fb]"
            >
              <CloseIcon width={12} height={12} className="[&_path]:stroke-[2.4]" />
            </button>
          </div>
        ))}
        {Array.from({ length: Math.max(0, 5 - picked.length) }, (_, i) => (
          <AddCountry key={i} taken={picked} onPick={(c) => setPicked([...picked, c])} />
        ))}
        <button type="button" onClick={() => setCompared(picked.length ? picked : null)} className="h-7 rounded-md bg-rk-btn-dark px-[8.5px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
          Compare
        </button>
        <button
          type="button"
          onClick={() => {
            setPicked(["Sweden"]);
            setCompared(null);
          }}
          className="h-7 rounded-md border border-[#d4d6d5] bg-[#eceef0] px-[8px] text-[14px] text-rk-text-2 hover:bg-rk-hover"
        >
          Cancel
        </button>
      </div>
      {compared ? (
        <Widget title="Organic and paid performance by country" className="mt-4" bodyClassName="pb-2">
          <table className="w-full text-[14px] leading-5">
            <thead>
              <tr className="h-10 border-b border-rk-border text-[12px] text-rk-text-2">
                <th className="pl-5 text-left font-normal">Country</th>
                <th className="text-right font-normal">Organic Traffic</th>
                <th className="text-right font-normal">Organic Keywords</th>
                <th className="text-right font-normal">Paid Traffic</th>
                <th className="pr-5 text-right font-normal">Paid Keywords</th>
              </tr>
            </thead>
            <tbody>
              {compared.map((c) => {
                const m = metrics[c] ?? ["0", "0", "0", "0"];
                return (
                  <tr key={c} className="h-[44px] border-b border-rk-border last:border-0">
                    <td className="pl-5">
                      <span className="flex items-center gap-2">
                        <Flag code={codes[c] ?? null} />
                        {c}
                      </span>
                    </td>
                    {m.map((v, i) => (
                      <td key={i} className={`text-right ${i === 3 ? "pr-5" : ""}`}>
                        {v}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Widget>
      ) : (
        <EmptyState
          illustration={<CountriesIllustration />}
          title="Compare your domain performance by countries"
          bullets={["Compare organic and paid performance of a domain in different countries", "See the organic share of a domain for specific markets", "Export the trends to xls or csv"]}
          example="imdb.com (us, uk, ca, au)"
          exampleHref={routes.domainCompareCountries}
        />
      )}
    </>
  );
}
