"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { routes } from "@/config/routes";
import { D2, YouTag } from "./common";
import { AddCompetitors, DbSelect, DomainRow, ScopeDrop } from "./CompareDomainsLanding";
import { rival, you } from "./data";
import { FeatureRow, IllusCompareForm, IllusOverlap, IllusTable } from "./Illustrations";

const kwTypes = ["Organic keywords", "Paid keywords", "PLA keywords"];
const colors = ["#6167e6", D2, "#ff8e29", "#ff6b70", "#b58af2"];

export function KeywordGapLanding() {
  const router = useRouter();
  const [domains, setDomains] = useState(["", ""]);
  const set = (i: number, v: string) => setDomains((d) => d.map((x, j) => (j === i ? v : x)));
  return (
    <div className="px-[36px] pt-6">
      <div className="mx-auto max-w-[980px]">
        <section className="rounded-lg bg-white px-10 pt-[37px] pb-[40px] text-center shadow-card">
          <h1 className="text-[36px] leading-[44px] font-bold">Keyword Gap</h1>
          <p className="mt-[11px] text-[16px] leading-6 text-rk-text">A tool that helps you compare your keyword profile with your competitors.</p>
          <form
            className="mx-auto mt-[32px] w-[731px] text-left"
            onSubmit={(e) => {
              e.preventDefault();
              const me = domains[0] || you;
              const others = domains.slice(1).filter(Boolean);
              router.push(`${routes.keywordGap}?q=${encodeURIComponent(me)}&compareWith=${encodeURIComponent((others.length ? others : [rival]).join(","))}`);
            }}
          >
            <div className="flex flex-col gap-4">
              {domains.map((d, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-1">
                    <DomainRow
                      value={d}
                      onChange={(v) => set(i, v)}
                      color={colors[i]}
                      lead={i === 0 ? <YouTag className="mr-2 h-[22px]! px-[9px]!" /> : undefined}
                      selects={<ScopeDrop label="Root domain" options={["Root domain", "Subdomain", "Subfolder", "Exact URL"]} className="w-[142px] border-l border-[#dcdfdf]" />}
                    />
                  </div>
                  <div className="h-10 w-[184px] rounded-md border border-[#dcdfdf] bg-white">
                    <ScopeDrop label="Organic keywords" options={kwTypes} className="h-full w-full" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <AddCompetitors onClick={() => setDomains((d) => (d.length < 5 ? [...d, ""] : d))} disabled={domains.length >= 5} />
              <div className="flex items-center gap-3">
                <DbSelect width={100} />
                <button type="submit" className="h-10 rounded-md bg-[#191b1c] px-[13px] text-[16px] font-medium text-white hover:bg-[#2b2e38]">
                  Compare
                </button>
              </div>
            </div>
          </form>
        </section>
        <section className="mt-[17px] rounded-lg bg-white px-10 pt-[39px] pb-[42px] shadow-card">
          <div className="flex flex-col gap-[62px]">
            <FeatureRow
              illus={<IllusCompareForm variant="kg" />}
              title="Enter your competitors"
              text="Specify up to 5 any domains, subdomains, folders or exact URLs. Get a list containing all common and unique keywords they rank for."
            />
            <FeatureRow
              reverse
              illus={<IllusOverlap />}
              title="Find the gaps in your strategy"
              text="Visualize keyword overlap between domains and spot the missing, weak and untapped keywords your competitors already rank for."
            />
            <FeatureRow
              illus={<IllusTable />}
              title="Prioritize your opportunities"
              text="Compare positions side by side, filter by volume, intent and difficulty, and send the best keywords straight to your lists."
            />
          </div>
        </section>
      </div>
    </div>
  );
}
