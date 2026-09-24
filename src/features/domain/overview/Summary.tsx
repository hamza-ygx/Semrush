import Link from "next/link";
import { routes } from "@/config/routes";
import { ChatGptIcon, GeminiIcon, GoogleIcon } from "@/components/ui/icons";
import { aiSummary, seoSummary } from "../data";
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
  const segs = [
    ["#ff6b70", 0, 0.18],
    ["#6167e6", 0.18, 0.27],
    ["#3ed4a4", 0.27, 0.68],
    ["#c28bf5", 0.68, 0.84],
    ["#ffb200", 0.84, 1],
  ] as const;
  const r = 9;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 24 24" width={23} height={23} className="-rotate-90">
      {segs.map(([col, a, b]) => (
        <circle key={col} cx="12" cy="12" r={r} fill="none" stroke={col} strokeWidth={4} strokeDasharray={`${(b - a) * c - 0.6} ${c}`} strokeDashoffset={-a * c} />
      ))}
    </svg>
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
      <div className="grid grid-cols-[108px_78px_1fr] px-5 pt-[46px]">
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
      <div className="px-5 pt-[46px]">
        {rows.map((row, ri) => (
          <div key={ri} className={`flex ${ri ? "mt-[36px]" : ""}`}>
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
                    {m.share && <ShareDonut />}
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
