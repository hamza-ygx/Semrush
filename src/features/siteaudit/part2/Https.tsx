import Link from "next/link";
import { routes } from "@/config/routes";
import { WarningIcon } from "@/components/ui/icons";
import { ThematicPage } from "./Thematic";
import { LearnMore } from "./ui";
import { httpsSections, issueId } from "./data";
import type { SiteAuditHead } from "../load";

export type HttpsLive = { score: number; mixed: number; notSecure: number };

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

function liveSections(live: HttpsLive) {
  return httpsSections.map((sec) => ({
    ...sec,
    checks: sec.checks.map((c) => {
      if (c.text === "No pages with mixed content" && live.mixed)
        return { ok: false, count: plural(live.mixed, "page", "pages"), text: live.mixed === 1 ? " has mixed content" : " have mixed content", link: "Issues with mixed content" };
      if (c.text === "No non-secure pages" && live.notSecure)
        return { ok: false, count: plural(live.notSecure, "page", "pages"), text: live.notSecure === 1 ? " isn't served over HTTPS" : " aren't served over HTTPS", link: "Non-secure pages" };
      return c;
    }),
  }));
}

const Tick = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="mt-[2px] shrink-0 text-[#009f81]">
    <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Https({ head, live }: { head?: SiteAuditHead; live?: HttpsLive | null }) {
  return (
    <ThematicPage title="HTTPS Implementation" score={live?.score ?? 98} head={head}>
      {(live ? liveSections(live) : httpsSections).map((sec, si) => (
        <section key={sec.title} className={si ? "mt-4" : ""}>
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
