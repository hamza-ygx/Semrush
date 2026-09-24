import Link from "next/link";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/primitives";
import { LinkSelect } from "@/components/ui/Popover";
import { ThematicPage, SubCard } from "./Thematic";
import { Dot, InfoI, Ring } from "./ui";
import { C, markupTypes, structuredItems } from "./data";

const SortIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="text-rk-text-2">
    <path d="M2 4h12M2 8h8M2 12h4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
  </svg>
);

function Legend({ rows }: { rows: { label: string; pct: string; value: number; color: string; link?: boolean }[] }) {
  return (
    <div className="space-y-2 text-[14px] leading-5">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center">
          <Dot color={r.color} className="mr-[9px]" />
          <span className="flex-1">{r.label}</span>
          <span className="w-[40px] text-right text-rk-muted">{r.pct}</span>
          {r.link && r.value ? (
            <Link href={routes.siteAuditCampaign.crawledPages} className="w-[34px] text-right text-rk-link hover:text-rk-link-hover">
              {r.value}
            </Link>
          ) : (
            <span className="w-[34px] text-right">{r.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function Markup() {
  const max = Math.max(...structuredItems.map((i) => i.valid + i.invalid));
  return (
    <ThematicPage title="Markup" score={100} info>
      <div className="rounded-md bg-white pt-5 shadow-card">
        <div className="grid grid-cols-3 gap-6 px-5">
          <SubCard className="h-[387px] px-5 pt-[22px]">
            <h3 className="flex items-center gap-2 text-[16px] leading-5 font-semibold">
              Pages with Markup <InfoI />
            </h3>
            <div className="mt-[23px]">
              <Ring segments={[{ value: 83, color: C.blue }]} size={180} thickness={29} sep={false}>
                <span className="text-[24px] leading-7 font-semibold">83</span>
              </Ring>
            </div>
            <div className="mt-[18px] w-[192px]">
              <Legend
                rows={[
                  { label: "with markup", pct: "100%", value: 83, color: C.blue, link: true },
                  { label: "no markup", pct: "0%", value: 0, color: C.silver },
                ]}
              />
            </div>
            <Button variant="secondary" href={routes.siteAuditCampaign.crawledPages} className="mt-[20px] h-[27px] px-[9px] text-rk-text-2">
              View full report
            </Button>
          </SubCard>
          <SubCard className="h-[387px] px-5 pt-[22px]">
            <h3 className="flex items-center gap-2 text-[16px] leading-5 font-semibold">
              Pages by Markup Type <InfoI />
            </h3>
            <div className="mt-[25px]">
              {markupTypes.map((m) => (
                <div key={m.label} className="mb-[15.5px]">
                  <div className="flex text-[14px] leading-5">
                    <span className="flex-1">{m.label}</span>
                    <span className="text-rk-muted">{m.pct}%</span>
                    <span className="ml-2 text-rk-link">{m.count}</span>
                  </div>
                  <div className="mt-[6px] h-5" style={{ background: C.track }}>
                    <div className="h-full" style={{ width: `${m.pct}%`, background: C.blue }} />
                  </div>
                </div>
              ))}
            </div>
          </SubCard>
          <SubCard className="h-[387px] px-5 pt-[22px]">
            <h3 className="flex items-center gap-1 text-[16px] leading-5 font-semibold">
              Structured Data by
              <LinkSelect value="Pages" options={["Pages", "Items"] as const} className="[&>button]:text-[16px] [&>button]:font-semibold" />
            </h3>
            <div className="mt-[23px]">
              <Ring segments={[{ value: 83, color: C.green }]} size={180} thickness={29} sep={false}>
                <span className="text-[24px] leading-7 font-semibold">83</span>
              </Ring>
            </div>
            <div className="mt-[18px] w-[258px]">
              <Legend
                rows={[
                  { label: "Invalid structured data", pct: "0%", value: 0, color: C.red },
                  { label: "Valid structured data", pct: "100%", value: 83, color: C.green },
                  { label: "No structured data", pct: "0%", value: 0, color: C.silver },
                ]}
              />
            </div>
          </SubCard>
        </div>
        <h3 className="mt-[24px] flex items-center gap-2 px-5 text-[16px] leading-6 font-semibold">
          Structured Data Items <InfoI />
        </h3>
        <div className="mt-[20px] grid h-10 grid-cols-[252px_90px_102px_1fr] items-center border-b border-rk-border bg-[#f9f9f9] text-[12px] text-rk-text-2">
          <span className="pl-5">Item</span>
          <span className="flex items-center justify-end gap-2">
            <Dot color={C.red} />
            Invalid
          </span>
          <span className="flex items-center justify-end gap-2 pr-3">
            <Dot color={C.green} />
            Valid
          </span>
          <span className="flex h-full items-center gap-1 bg-[#ececec] pl-3">
            Total amount <SortIcon />
          </span>
        </div>
        {structuredItems.map((i) => (
          <div key={i.item} className="grid h-[45px] grid-cols-[252px_90px_102px_1fr] items-center border-b border-rk-border text-[14px]">
            <span className="pl-5">{i.item}</span>
            <span className="text-right">{i.invalid}</span>
            <span className="pr-3 text-right">{i.valid}</span>
            <span className="pr-5 pl-3">
              <span className="block h-[7px] min-w-[7px] rounded-full" style={{ width: `${(i.valid / max) * 100}%`, background: C.green }} />
            </span>
          </div>
        ))}
        <p className="py-[23px] text-center text-[14px] leading-5 text-rk-muted">No more structured items</p>
      </div>
    </ThematicPage>
  );
}
