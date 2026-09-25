import Link from "next/link";
import { routes } from "@/config/routes";
import { Check, LlmChip } from "./icons";
import { CompareTable, EnterpriseBlock, PageIntro } from "./sections";
import { enterpriseCard as e, enterpriseCompare, toolkits } from "./data";

function Avatar() {
  return (
    <svg viewBox="0 0 40 40" width={40} height={40} aria-hidden>
      <circle cx="20" cy="20" r="20" fill="#e6e0ff" />
      <circle cx="20" cy="16" r="6.5" fill="#8f7ff0" />
      <path d="M8 34c2-6.5 6.6-9.5 12-9.5S30 27.5 32 34a19.8 19.8 0 0 1-24 0z" fill="#8f7ff0" />
    </svg>
  );
}

export function EnterprisePricingPage() {
  return (
    <div className="pb-[55px]">
      <PageIntro title="Plans & Pricing" desc={toolkits.one.desc} descWidth={840} />
      <div className="mt-[32.5px] grid grid-cols-[360px_1fr_1fr] grid-rows-[240px_280px] gap-[16.5px]">
        <div className="row-span-2 rounded-[12px] px-6 pt-6 text-white" style={{ background: "linear-gradient(160deg, #000 0%, #0b0a1c 30%, #221c6a 70%, #3a44d6 100%)" }}>
          <h2 className="text-[22px] leading-7 font-semibold tracking-[-0.01em]">{e.title}</h2>
          <p className="mt-px text-[14px] leading-5 text-[#f0f0f0]">{e.desc}</p>
          <div className="mt-[35px] text-[36px] leading-11 font-semibold tracking-[-0.02em]">Let’s talk</div>
          <Link href={routes.home} className="mt-[14.5px] flex h-10 items-center justify-center rounded-full bg-white text-[16px] font-medium text-[#171a17] hover:bg-[#ececec]">
            Request demo
          </Link>
          <ul className="mt-[15.5px] flex flex-col gap-2 border-t border-white/25 pt-4">
            {e.checks.map((c, i) => (
              <li key={c} className="flex gap-[10px] text-[16px] leading-6">
                <Check width={14} height={14} className="mt-[5px] shrink-0 text-[#d9d4ff]" />
                <span className="flex flex-wrap items-center gap-x-[7px]">
                  {c}
                  {i === 0 && (
                    <span className="inline-flex h-[22px] items-center gap-[8px] rounded-full bg-white/15 pr-[7px] pl-[2px] text-[12.5px] font-medium">
                      <LlmChip size={16} count={6} />
                      <span className="ml-[3px]">&amp; more</span>
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {e.stats.map((s) => (
          <div key={s.value} className="flex flex-col justify-end rounded-[12px] px-4 pb-[19px]" style={{ background: "linear-gradient(135deg, #ffffff 40%, #f4f1ff 100%)" }}>
            <div className="bg-[linear-gradient(90deg,#4b4ff0,#7b5cf5)] bg-clip-text text-[36px] leading-11 font-medium tracking-[-0.02em] text-transparent">{s.value}</div>
            <div className="mt-[3px] text-[16px] leading-6 text-[#6a6c6b]">{s.label}</div>
          </div>
        ))}
        <figure className="col-span-2 flex flex-col rounded-[12px] bg-white">
          <div className="px-4 pt-4">
            <Avatar />
          </div>
          <blockquote className="mt-[40px] px-4 text-[16px] leading-6 text-[#555756]">“{e.quote}”</blockquote>
          <figcaption className="mt-auto border-t border-[#ececec] px-4 pt-[16px] pb-[16px] text-[14px] leading-5 text-[#555756]">
            <div className="font-semibold">{e.quoteTitle}</div>
            <div>{e.quoteOrg}</div>
          </figcaption>
        </figure>
      </div>
      <div className="mt-[64px]">
        <CompareTable table={enterpriseCompare} />
      </div>
      <div className="mt-[57px]">
        <EnterpriseBlock />
      </div>
    </div>
  );
}
