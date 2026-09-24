import Link from "next/link";
import { routes } from "@/config/routes";
import { WarningIcon } from "@/components/ui/icons";
import { ThematicPage } from "./Thematic";
import { LearnMore } from "./ui";
import { httpsSections, issueId } from "./data";

const Tick = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="mt-[2px] shrink-0 text-[#009f81]">
    <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Https() {
  return (
    <ThematicPage title="HTTPS Implementation" score={98}>
      {httpsSections.map((sec, si) => (
        <section key={sec.title} className={si ? "mt-4" : "-mt-[3px]"}>
          <h2 className="text-[16px] leading-6 font-semibold">{sec.title}</h2>
          <div className="mt-2 grid grid-cols-[repeat(3,318px)] gap-4">
            {sec.checks.map((c) => (
              <div key={c.text} className="h-[96px] rounded-md bg-white px-5 pt-[15px] shadow-card">
                <div className="flex gap-2 text-[14px] leading-5">
                  {c.ok ? <Tick /> : <WarningIcon className="mt-[1px] shrink-0" />}
                  <div>
                    <p>
                      {c.count && (
                        <Link href={routes.siteAuditCampaign.issueDetail(issueId(c.link ?? ""))} className="text-rk-link hover:text-rk-link-hover">
                          {c.count}
                        </Link>
                      )}
                      {c.text}
                    </p>
                    <LearnMore className="mt-1">{c.ok ? "Learn more" : "How to fix"}</LearnMore>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </ThematicPage>
  );
}
