"use client";

import { useState } from "react";
import { routes } from "@/config/routes";
import { useOutsideClose } from "@/components/ui/Popover";
import { ChevronDown, CloseIcon } from "@/components/ui/icons";
import { countryOptions } from "../data";
import { Flag, Widget } from "../ui";
import { EmptyState } from "./EmptyState";
import { CountriesIllustration } from "./Illustrations";

const codes: Record<string, string> = { Sweden: "SE", "United States": "US", "United Kingdom": "UK", Norway: "NO", India: "IN" };

const metrics: Record<string, [string, string, string, string]> = {
  Sweden: ["59", "134", "0", "0"],
  India: ["1", "2", "0", "0"],
};

function AddCountry({ taken, onPick }: { taken: string[]; onPick: (c: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-7 w-[174px] items-center justify-between rounded-md border bg-white pr-[10px] pl-[9px] text-[14px] text-rk-muted ${
          open ? "border-[#7a86f2] ring-2 ring-[#d7dcfc]" : "border-[#d3d5db]"
        }`}
      >
        Add country
        <ChevronDown width={14} height={14} className="text-rk-text" />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-50 max-h-[280px] w-[220px] overflow-auto rounded-md bg-white py-1 shadow-popover">
          {countryOptions
            .filter((c) => !taken.includes(c))
            .map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  onPick(c);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 px-[9px] py-[6px] text-left text-[14px] leading-5 hover:bg-rk-bg"
              >
                <Flag code={codes[c] ?? null} />
                {c}
              </button>
            ))}
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
          <div key={c} className="flex h-7 w-[174px] overflow-hidden rounded-md border border-[#a3a8ea] bg-[#eef2fd] text-[14px]">
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
          className="h-7 rounded-md border border-[#d3d5db] bg-[#eceef0] px-[8px] text-[14px] text-rk-text-2 hover:bg-rk-hover"
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
