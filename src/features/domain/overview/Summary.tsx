import Link from "next/link";
import { routes } from "@/config/routes";
import { ChatGptIcon, GeminiIcon, GoogleIcon } from "@/components/ui/icons";
import { aiSummary, seoSummary, trafficShare } from "../data";
import { WorldIcon } from "../ui";

const num = "text-[24px] leading-[29px] font-semibold text-rk-number";

function CardTag({ children, className }: { children: string; className: string }) {
  return <span className={`absolute top-0 left-0 flex h-[27px] items-center rounded-tl-lg rounded-br-[10px] px-5 text-[14px] ${className}`}>{children}</span>;
}

function MiniArc() {
  return (
    <svg viewBox="0 0 40 20" width={39} height={19}>
      <path d="M4.5 19a15.5 15.5 0 0 1 31 0" fill="none" stroke="#e0e1e9" strokeWidth={7} />
    </svg>
  );
}

function ShareDonut() {
  const r = 9;
  const c = 2 * Math.PI * r;
  const starts = trafficShare.map((_, i) => trafficShare.slice(0, i).reduce((a, d) => a + d.pct, 0) / 100);
  return (
    <svg viewBox="0 0 24 24" width={23} height={23} className="-rotate-90">
      {trafficShare.map((d, i) => (
        <circle key={d.domain} cx="12" cy="12" r={r} fill="none" stroke={d.color} strokeWidth={4} strokeDasharray={`${(d.pct / 100) * c - 0.6} ${c}`} strokeDashoffset={-starts[i] * c} />
      ))}
    </svg>
  );
}

function ShareTooltip() {
  return (
    <span className="group relative flex" data-testid="traffic-share">
      <ShareDonut />
      <span className="pointer-events-none absolute bottom-[calc(100%+11px)] left-1/2 z-30 hidden w-[220px] -translate-x-1/2 rounded-md bg-white pt-[9px] pr-[11px] pb-[9px] pl-[13px] shadow-popover group-hover:block">
        <span className="flex h-5 items-center justify-between text-[12px] text-rk-muted">
          <span>Domains</span>
          <span>Traffic</span>
        </span>
        <span className="mt-[3px] block">
          {trafficShare.map((d) => (
            <span key={d.domain} className="flex h-6 items-center text-[14px] leading-5">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: d.color }} />
              <span className="ml-2 w-[93px] truncate text-rk-text">{d.domain}</span>
              <span className="flex-1 text-right text-[13px] text-rk-muted">{d.pct}%</span>
              <b className="w-[32px] text-right text-[12px] font-bold">{d.traffic}</b>
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}

const aiIcons = {
  chatgpt: <ChatGptIcon width={18} height={18} className="text-rk-text" />,
  google: <GoogleIcon width={17} height={17} />,
  gemini: <GeminiIcon width={17} height={17} />,
};

export function AiSearchCard() {
  return (
    <section className="relative h-[219px] rounded-lg bg-white shadow-card">
      <CardTag className="bg-[#f3d6fa] text-[#8a3fcf]">AI Search</CardTag>
      <div className="grid grid-cols-[108px_78px_1fr] px-5 pt-[48px]">
        <div>
          <div className="text-[14px] leading-5">AI Visibility</div>
          <div className="mt-1 flex items-end gap-[10px]">
            <span className="mb-[5px]">
              <MiniArc />
            </span>
            <Link href={routes.organic.overview} className={num}>
              {aiSummary.visibility}
            </Link>
          </div>
        </div>
        <div>
          <div className="text-[14px] leading-5">Mentions</div>
          <div className={`mt-1 ${num}`}>{aiSummary.mentions}</div>
        </div>
        <div>
          <div className="text-[14px] leading-5">Cited Pages</div>
          <Link href={routes.topPages} className={`mt-1 block ${num}`}>
            {aiSummary.cited}
          </Link>
        </div>
      </div>
      <div className="mt-[4px] px-5">
        {aiSummary.rows.map((r) => (
          <div key={r.name} className="grid h-6 grid-cols-[108px_78px_1fr] items-center text-[12px] leading-5">
            <span className="flex items-center gap-[6px] text-rk-text">
              <span className="flex w-[18px] justify-center">{aiIcons[r.icon]}</span>
              {r.name}
            </span>
            <Link href={routes.organic.overview} className="text-[14px] text-rk-link hover:text-rk-link-hover">
              {r.mentions}
            </Link>
            <Link href={routes.topPages} className="text-[14px] text-rk-link hover:text-rk-link-hover">
              {r.cited}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SeoCard() {
  const cols = ["w-[153px]", "w-[179px]", "w-[172px]", "flex-1"];
  const rows = [seoSummary.slice(0, 4), seoSummary.slice(4)];
  return (
    <section className="relative h-[219px] rounded-lg bg-white shadow-card">
      <CardTag className="bg-[#e7e3fd] text-[#5a50c8]">SEO</CardTag>
      <div className="px-5 pt-[47.5px]">
        {rows.map((row, ri) => (
          <div key={ri} className={`flex ${ri ? "mt-[34.5px]" : ""}`}>
            {row.map((m, i) => {
              const value = (
                <span className={num}>
                  {m.value}
                </span>
              );
              return (
                <div key={m.label} className={`${cols[i]} ${i ? "border-l border-rk-border pl-6" : ""}`}>
                  <div className="flex items-center gap-1 text-[14px] leading-5 whitespace-nowrap">
                    {m.label}
                    {m.globe && <WorldIcon className="text-[#a9abb6]" />}
                  </div>
                  <div className="mt-1 flex items-center gap-[6px]">
                    {m.share && <ShareTooltip />}
                    {m.href ? (
                      <Link href={m.href} className="hover:opacity-80">
                        {value}
                      </Link>
                    ) : (
                      value
                    )}
                    {m.badge && <span className="ml-[3px] flex h-[27px] items-center rounded-full bg-[#e7e5fb] px-[9px] text-[12px] text-[#5a50c8]">{m.badge}</span>}
                    {m.delta && <span className="mt-[5px] text-[12px] text-rk-danger">{m.delta}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
