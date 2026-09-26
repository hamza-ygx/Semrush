import Link from "next/link";
import { brand } from "@/config/brand";
import { legalDocs, marketingRoutes, privacySections, privacyToc } from "./data";
import { MarketingShell } from "./MarketingShell";

const link = "text-[#2f86cf] hover:underline";
const title = "text-center text-[32.5px] leading-10 font-normal tracking-[0.005em] text-[#2b2926]";

const docHref = (slug: string) => (slug === "privacy-policy" ? marketingRoutes.privacyPolicy : marketingRoutes.legalDoc(slug));

function Updated({ date }: { date: string }) {
  return (
    <p className="mt-[20px] flex items-center justify-center gap-[10px] text-[16.5px] leading-6 text-[#555658]">
      <svg viewBox="0 0 20 20" width={21} height={21} aria-hidden className="text-[#8a8a8e]">
        <circle cx="10" cy="10" r="8.6" fill="none" stroke="currentColor" strokeWidth={1.5} />
        <path d="M10 5v5.3l3.2 2.4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
      Last Modified Date: {date}
    </p>
  );
}

export function LegalIndexPage() {
  return (
    <MarketingShell>
      <div className="mx-auto w-[949px] pt-[31px] pb-[4px] text-[#2b2926]">
        <h1 className={title}>{brand.name} Legal Information</h1>
        <ul className="mt-[31px] list-outside list-[square] text-[16.5px] leading-6 marker:text-[#2b2926]">
          {legalDocs.map((d) => (
            <li key={d.slug} className="pl-[1px]">
              <Link href={docHref(d.slug)} className={link}>
                {d.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </MarketingShell>
  );
}

export function PrivacyPolicyPage() {
  const sections = privacyToc.filter((t) => /^\d+\.$/.test(t.n));
  return (
    <MarketingShell>
      <div className="mx-auto w-[949px] pt-[31px] text-[16.5px] leading-6 text-[#2b2926]">
        <h1 className={title}>{brand.name} Privacy Policy</h1>
        <Updated date="October 13, 2025" />
        <h2 className="mt-[17px] font-semibold">Table of Contents</h2>
        <ol className="mt-[21px] flex flex-col gap-5">
          {privacyToc.map((t) => (
            <li key={t.id} className={`flex ${t.sub ? "pl-[84px]" : ""} ${t.gap ? "mt-[1px]" : ""}`}>
              <span className="w-[84px] shrink-0">{t.n}</span>
              <a href={`#${t.id}`} className={`${link} whitespace-pre`}>
                {t.label}
              </a>
            </li>
          ))}
        </ol>
        {privacyToc.map((t) => {
          const top = sections.includes(t);
          return (
            <section key={t.id} id={t.id} className={`scroll-mt-6 ${top ? "mt-12" : "mt-6"}`}>
              <h3 className={top ? "text-[20px] leading-7 font-semibold" : "font-semibold"}>
                {t.n} {t.label.trim()}
              </h3>
              {privacySections[t.id].map((p) => (
                <p key={p} className="mt-3">
                  {p}
                </p>
              ))}
            </section>
          );
        })}
      </div>
    </MarketingShell>
  );
}

export function LegalDocPage({ slug }: { slug: string }) {
  const doc = legalDocs.find((d) => d.slug === slug) ?? legalDocs[0];
  const paragraphs = [
    `This document (“${doc.title}”) sets out the terms that apply between ${brand.legalName} (“${brand.name}”, “we”, “us”) and you when you use our website, products and services.`,
    "Please read it carefully. By accessing or using our services you confirm that you accept these terms. If you do not agree, you must not use our services.",
    "We may update this document from time to time. The latest version is always available on this page, and the Last Modified Date above shows when it was last changed.",
    "If you have any questions, contact us at legal@example.se.",
  ];
  return (
    <MarketingShell>
      <div className="mx-auto w-[949px] pt-[31px] text-[16.5px] leading-6 text-[#2b2926]">
        <p className="text-[14px]">
          <Link href={marketingRoutes.legal} className={link}>
            Legal Information
          </Link>{" "}
          / {doc.title}
        </p>
        <h1 className={`${title} mt-4`}>
          {doc.title.startsWith(brand.name) ? "" : `${brand.name} `}
          {doc.title}
        </h1>
        <Updated date="October 13, 2025" />
        {["General", "Your obligations", "Changes", "Contact"].map((h, i) => (
          <section key={h} className="mt-10">
            <h2 className="text-[20px] leading-7 font-semibold">
              {i + 1}. {h}
            </h2>
            <p className="mt-3">{paragraphs[i]}</p>
          </section>
        ))}
      </div>
    </MarketingShell>
  );
}
