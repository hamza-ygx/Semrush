import { AppShell } from "@/components/shell/AppShell";
import { SiteAuditHeader } from "../SiteAuditHeader";
import { Ring } from "./ui";

const Y = "#fdc23c";
const G = "#e0e1e9";

const Tick = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0 text-[#009f81]">
    <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const JsBadge = () => <span className="flex h-[11px] w-[11px] items-center justify-center bg-[#f7df1e] text-[6px] leading-none font-bold">JS</span>;

function Illustration() {
  return (
    <div className="relative h-[230px] w-[300px] shrink-0">
      <div className="absolute top-0 left-0 h-[160px] w-[248px] overflow-hidden rounded-[3px] bg-white shadow-card">
        <div className="flex h-[8px] justify-end bg-[#e6e7ee] pr-1">
          <span className="text-[8px] leading-[6px] text-rk-muted">•••</span>
        </div>
        <div className="px-3 pt-[10px] text-[10px] leading-3 font-medium text-rk-text-2">JS Rendering Impact</div>
        <div className="flex gap-4 px-5 pt-[12px]">
          <Ring segments={[{ value: 75, color: Y }, { value: 25, color: G }]} size={74} thickness={17} sep={false} />
          <div className="mt-[-4px] w-[132px] space-y-[5px]">
            {[82, 34, 55, 16].map((w) => (
              <div key={w} className="h-[7px] bg-[#e6e7ee]">
                <div className="h-full" style={{ width: `${w}%`, background: Y }} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[6px] space-y-[2px] px-3 text-[8px] leading-[12px] text-rk-muted">
          <div className="flex items-center gap-1">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: Y }} />
            Changed pages
          </div>
          <div className="flex items-center gap-1">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: G }} />
            Unchanged pages
          </div>
        </div>
      </div>
      <div className="absolute top-[96px] left-[108px] h-[133px] w-[192px] overflow-hidden rounded-[3px] border border-rk-border bg-white">
        <div className="px-3 pt-[8px] pb-[6px] text-[10px] leading-3 font-medium">Analyzed Pages</div>
        <div className="grid h-[20px] grid-cols-[55px_52px_1fr] gap-px bg-white">
          <span className="bg-[#e6e7ee]" />
          <span className="bg-[#e6e7ee]" />
          <span className="bg-[#e6e7ee]" />
        </div>
        {[0, 1].map((r) => (
          <div key={r} className={`grid h-[42px] grid-cols-[55px_52px_1fr] items-start pt-[10px] ${r ? "border-t border-rk-border" : ""}`}>
            <span className="space-y-[3px] pl-3">
              <span className="block h-[4px] w-[36px] rounded bg-[#d4d5dc]" />
              {!r && <span className="block h-[4px] w-[20px] rounded bg-[#d4d5dc]" />}
            </span>
            <span className="rounded-full bg-[#ffe3c2] text-center text-[8px] leading-[12px] text-[#c33909]">Changed</span>
            <span className="space-y-[6px] pl-2">
              <span className="block h-[4px] w-[48px] rounded bg-[#d4d5dc]" />
              <span className="flex items-center gap-[3px]">
                <JsBadge />
                <span className="block h-[4px] w-[48px] rounded bg-[#c4c5cc]" />
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function JsImpact() {
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="js" looker={false} pdf={false} exportBtn={false} />
      <div className="flex gap-[39px] px-8 pt-[24px] pb-[166px]">
        <Illustration />
        <div className="pt-[2px]">
          <h2 className="text-[16px] leading-6 font-semibold">Find out how JavaScript might affect your rankings</h2>
          <p className="mt-[13px] text-[14px] leading-5">
            <button type="button" className="text-rk-link hover:text-rk-link-hover">
              Enable JS rendering
            </button>
            , rerun the campaign, and you can:
          </p>
          <ul className="mt-[13px] space-y-[9px] text-[14px] leading-5">
            {["Investigate all key aspects that may be affected by JavaScript", "Compare content before and after JS rendering", "Receive tips on what to do if your content has changed"].map((t) => (
              <li key={t} className="flex items-center gap-[10px]">
                <Tick />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
