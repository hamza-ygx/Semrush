"use client";

import Link from "next/link";
import { Fragment, useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { AddonIcon, Check, Chevron, LlmChip, LongArrow, PlusThin, Sparkle } from "./icons";
import { addons, enterprise, faq, testimonials, type CompareTable as Table, type CompareValue, type Plan } from "./data";

function Marked({ text }: { text: string }) {
  const parts = text.split(/(\[\[.*?\]\])/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[[") ? (
          <span key={i} className="underline decoration-[#a3a3a3] decoration-dashed decoration-1 underline-offset-[4px]">
            {p.slice(2, -2)}
          </span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

export function BillingToggle({ annual, onChange, badge }: { annual: boolean; onChange: (v: boolean) => void; badge?: boolean }) {
  const seg = (on: boolean) => `flex h-[28px] items-center justify-center rounded-full text-[14.5px] text-[#2b2d2b] transition-colors ${on ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]" : "hover:bg-white/60"}`;
  return (
    <div role="tablist" aria-label="Billing period" className="flex h-[34px] w-[399px] shrink-0 items-center rounded-full bg-[#f7f9f9] p-[3px]">
      <button type="button" role="tab" aria-selected={!annual} onClick={() => onChange(false)} className={`${seg(!annual)} ${badge ? "w-[185px]" : "flex-1"}`}>
        Monthly
      </button>
      <button type="button" role="tab" aria-selected={annual} onClick={() => onChange(true)} className={`${seg(annual)} flex-1 gap-[7px] ${badge ? "pl-[4px]" : ""}`}>
        Annually
        {badge && <span className="rounded-full bg-[#4880fe] px-[8px] text-[12.5px] leading-[18px] font-medium text-white">save up to 17%</span>}
      </button>
    </div>
  );
}

export function PageIntro({ title, desc, descWidth, right }: { title: string; desc: string[]; descWidth?: number; right?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <h1 className="text-[33px] leading-10 font-medium tracking-[-0.03em] text-[#171a17]">{title}</h1>
        <p className="mt-[2px] text-[14.5px] leading-[19.5px] text-[#2b2d2b]" style={{ maxWidth: descWidth ?? 420 }}>
          {desc.map((d, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {d}
            </Fragment>
          ))}
        </p>
      </div>
      {right}
    </div>
  );
}

function monthly(plan: Plan, annual: boolean) {
  if (plan.price === null) return null;
  if (!annual) return { whole: `$${plan.price}`, cents: plan.cents ?? "" };
  const v = plan.annual ?? (Math.round(plan.price * 83) / 100).toFixed(2);
  const [w, c] = v.split(".");
  return { whole: `$${w}`, cents: c && c !== "00" ? `.${c}` : "" };
}

export function PlanCards({ plans, annual }: { plans: Plan[]; annual: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-x-[16.5px]">
      {plans.map((p) => {
        const price = monthly(p, annual);
        return (
          <div key={p.name} className="relative row-span-4 grid grid-rows-subgrid rounded-[12px] bg-white shadow-[0_8px_32px_rgba(88,72,160,0.07),0_1px_3px_rgba(0,0,0,0.03)]">
            {p.activePlan && <span className="absolute top-0 right-0 rounded-tr-[12px] rounded-bl-[10px] bg-[#c4f5e6] px-[9px] text-[13px] leading-[21px] font-medium text-[#0b8a63]">Active plan</span>}
            <div className="px-6 pt-6">
              <h3 className="text-[22px] leading-7 font-medium tracking-[-0.01em] text-[#171a17]">{p.name}</h3>
              <p className="mt-[2px] text-[14px] leading-5 text-[#525453]">{p.desc}</p>
            </div>
            <div className="mt-[14px] flex h-11 items-baseline px-6">
              {price ? (
                <>
                  <span className="text-[33px] leading-11 font-semibold tracking-[-0.02em] text-[#171a17]">{price.whole}</span>
                  <span className="text-[14px] text-[#3a3c3b]">
                    {price.cents}
                    {p.unit ?? "/mo"}
                    {annual && ", billed annually"}
                  </span>
                </>
              ) : (
                <span className="text-[36px] leading-11 font-semibold tracking-[-0.02em] text-[#171a17]">Let’s talk</span>
              )}
            </div>
            <div className="px-6 pt-[15px] pb-4">
              <Link
                href={routes.home}
                className={`flex h-10 items-center justify-center gap-[9px] rounded-full text-[16px] font-medium ${
                  p.ctaKind === "outline" ? "border border-[#dedede] bg-[#f9f9f9] text-[#6a6c6b] hover:bg-[#f0f0f0]" : "bg-[#1a1e1b] text-white hover:bg-[#2e332f]"
                }`}
              >
                {p.ctaIcon && <PlusThin />}
                {p.cta}
              </Link>
              {p.subscribe && (
                <p className="mt-[7px] text-[14px] leading-5 text-[#2b2d2b]">
                  or{" "}
                  <Link href={routes.home} className="underline underline-offset-[3px] hover:text-[#6a3fd0]">
                    subscribe
                  </Link>
                </p>
              )}
            </div>
            <div className="px-6 pb-[33px]">
              <div className="border-t border-[#dcdcdc] pt-4">
                {p.sections.map((s, si) => (
                  <div key={si} className={si ? "mt-[17px]" : ""}>
                    {s.heading && (
                      <div className="flex items-center gap-[7px]">
                        <span className="max-w-[96px] text-[14px] leading-5 font-medium text-[#1b1e1a]" style={s.chip ? undefined : { maxWidth: "none" }}>
                          {s.heading}
                        </span>
                        {s.chip && (
                          <span className="inline-flex h-6 shrink-0 items-center gap-[9px] rounded-full border whitespace-nowrap border-[#e3e3e3] bg-white pr-[8px] pl-[2px] text-[12.5px] text-[#8a8c8b]">
                            <LlmChip />
                            <span className="ml-[3px]">&amp; more</span>
                          </span>
                        )}
                      </div>
                    )}
                    <ul className={`flex flex-col gap-[9.5px] ${s.heading ? (s.chip ? "mt-[12px]" : "mt-[11px]") : ""}`}>
                      {s.items.map((it) => (
                        <li key={it} className="flex gap-2 text-[14px] leading-[19.5px] text-[#2b2d2b]">
                          {s.sparkle ? <Sparkle className="mt-[2px] shrink-0" /> : <Check className="mt-[2px] shrink-0 text-[#0a9f76]" />}
                          <span>
                            <Marked text={it} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Cell({ v }: { v: CompareValue }) {
  if (v === true) return <Check width={15} height={15} className="text-[#0a9f76]" />;
  if (v === false) return <span className="text-[#b5b5b5]">—</span>;
  return <span>{v}</span>;
}

export function CompareTable({ table }: { table: Table }) {
  const [open, setOpen] = useState(false);
  const cols = table.columns.length;
  const labelW = table.labelWidth ?? 393;
  const grid = { gridTemplateColumns: `${labelW}px repeat(${cols}, 1fr)` };
  const colBg = (i: number) => (table.highlight === i ? "bg-[#f7f6f8]/70" : "");
  return (
    <section>
      <div className="grid h-[74px] items-center border-b border-[#eae8ef]" style={grid}>
        <h2 className="pl-6 text-[30px] leading-9 font-medium tracking-[-0.02em] text-[#171a17]">Compare Plans</h2>
        {table.columns.map((c, i) => (
          <div key={c} style={{ fontSize: table.headSize ?? 18 }} className={`translate-y-[4px] text-center leading-6 font-medium ${table.accent === i ? "text-[#7a2ff0]" : table.accent !== undefined ? "text-[#6c6e6d]" : "text-[#1b1e1a]"}`}>
            {c}
          </div>
        ))}
      </div>
      <div
        className="relative overflow-hidden"
        style={
          open
            ? undefined
            : {
                maxHeight: table.collapsed ?? 286,
                maskImage: "linear-gradient(180deg, #000 calc(100% - 50px), rgba(0,0,0,0.4) calc(100% - 26px), transparent 100%)",
                WebkitMaskImage: "linear-gradient(180deg, #000 calc(100% - 50px), rgba(0,0,0,0.4) calc(100% - 26px), transparent 100%)",
              }
        }
      >
        {table.groups.map((g) => (
          <div key={g.title}>
            <div className="flex h-[65px] items-center border-b border-[#e9e8ec] pl-6 text-[16.5px] font-semibold text-[#5a5c5b]">{g.title}</div>
            {g.rows.map((r) => (
              <div key={r.label} className="grid border-b border-[#f0eff2]" style={grid}>
                <div className="flex min-h-[53px] flex-wrap items-center gap-x-[9px] gap-y-[7px] border-r border-[#f1f1f1] py-[15.5px] pr-6 pl-6 text-[14px] leading-5 text-[#2b2d2b]">
                  <span className={r.tag || r.underline ? "underline decoration-[#8f8f8f] decoration-dashed decoration-1 underline-offset-[4px]" : ""}>{r.label}</span>
                  {r.tag && <span className="rounded-full bg-[#ececec] px-[9px] text-[12px] leading-[22px] text-[#707271]">{r.tag}</span>}
                </div>
                {r.values.map((v, i) => (
                  <div key={i} className={`flex items-center justify-center border-r border-[#f1f1f1] px-4 text-center text-[14px] leading-[23px] text-[#2b2d2b] last:border-r-0 ${colBg(i)}`}>
                    <Cell v={v} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-[26px] flex justify-center">
        <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="h-[39px] rounded-full border border-[#c9c9c9] bg-[#f4f4f4] px-[13px] text-[16px] text-[#4f5150] hover:bg-[#eaeaea]">
          {open ? "Collapse details" : "Expand details"}
        </button>
      </div>
    </section>
  );
}

export function AddOns() {
  return (
    <section>
      <h2 className="text-[30px] leading-9 font-medium tracking-[-0.02em] text-[#171a17]">Improve your plan with add-ons</h2>
      <div className="mt-[37px] grid grid-cols-2 gap-[25px]">
        {addons.map((a) => (
          <div key={a.title} className="flex flex-col rounded-[12px] border border-[#ececec] bg-white px-6 pt-6 pb-6">
            <div className="flex items-center gap-[12px]">
              <AddonIcon name={a.icon} className="shrink-0 text-[#1b1e1a]" />
              <h3 className="text-[22px] leading-7 font-medium tracking-[-0.01em] text-[#171a17]">{a.title}</h3>
            </div>
            <div className="mt-[5px] pl-[37px] text-[16px] leading-5 text-[#2b2d2b]">{a.price}</div>
            <ul className="mt-[18px] flex flex-col gap-2 pl-[37px]">
              {a.items.map((it) => (
                <li key={it} className="flex gap-[7px] text-[14px] leading-5 text-[#5a5c5b]">
                  <span className="pl-[4px]">•</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-[23px] pl-[37px]">
              <Link href={routes.home} className="inline-flex h-10 items-center rounded-full border border-[#d9d9d9] bg-[#f7f7f7] px-3 text-[16px] text-[#4a4c4b] hover:bg-[#eeeeee]">
                {a.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EnterpriseBlock() {
  return (
    <section className="grid grid-cols-[435px_1fr] overflow-hidden rounded-[12px]">
      <div className="relative overflow-hidden bg-black px-6 pt-[21px] pb-8 text-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 6px, rgba(40,210,190,0.35) 6px 8px, rgba(88,70,230,0.35) 8px 13px, rgba(20,40,120,0.25) 13px 17px), linear-gradient(115deg, transparent 45%, #0e1f55 70%, #1a2a78 100%)",
            maskImage: "linear-gradient(118deg, transparent 50%, rgba(0,0,0,0.6) 64%, #000 80%)",
            WebkitMaskImage: "linear-gradient(118deg, transparent 50%, rgba(0,0,0,0.6) 64%, #000 80%)",
          }}
        />
        <div className="relative">
          <h2 className="text-[30px] leading-9 font-medium tracking-[-0.02em]">{enterprise.title}</h2>
          <p className="mt-4 text-[16px] leading-6 text-[#ededed]">{enterprise.desc}</p>
          <ul className="mt-6 flex flex-col gap-2">
            {enterprise.bullets.map((b) => (
              <li key={b} className="flex gap-[10px] pl-[6px] text-[16px] leading-6">
                <span>•</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-[#1b1e1a] pt-[21px] pr-4 pb-6 pl-8 text-white">
        <h2 className="text-[30px] leading-9 font-medium tracking-[-0.02em]">Let’s talk</h2>
        <p className="-mt-px text-[14px] leading-5 text-[#bdbdbd]">Custom pricing available</p>
        <Link href={routes.home} className="mt-[17px] flex h-10 items-center justify-center rounded-full bg-[#c090fe] text-[16px] font-medium text-[#171a17] hover:bg-[#b27cf9]">
          Request demo
        </Link>
        <ul className="mt-[23px] flex flex-col gap-2">
          {enterprise.checks.map((c) => (
            <li key={c} className="flex items-center gap-[9px] text-[13.6px] leading-5">
              <Check className="shrink-0 text-[#c090fe]" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const toggle = (i: number) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
  return (
    <section>
      <h2 className="text-[34px] leading-10 font-medium tracking-[-0.025em] text-[#171a17]">FAQ</h2>
      <div className="mt-[34px] flex flex-col gap-[2px]">
        {faq.map((f, i) => {
          const isOpen = open.has(i);
          return (
            <div key={f.q}>
              <button type="button" aria-expanded={isOpen} onClick={() => toggle(i)} className="flex h-10 w-full items-center gap-[7px] bg-[#f9f9f9] pl-[16px] text-left text-[16px] font-semibold text-[#5a5c5b] hover:text-[#1b1e1a]">
                <Chevron width={14} height={14} className={`shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                {f.q}
              </button>
              {isOpen && <p className="px-8 pt-[15px] pb-[11px] text-[15px] leading-6 text-[#2b2d2b]">{f.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  const n = testimonials.length;
  const t = testimonials[i];
  return (
    <section className="flex h-[416px] flex-col items-center rounded-[16px] bg-[#cddcff] px-10 pt-[75px] text-center text-[#171a17]">
      <div className="flex items-center gap-[84px]">
        <button type="button" aria-label="Previous testimonial" onClick={() => setI((i + n - 1) % n)} className="hover:opacity-60">
          <LongArrow dir="left" />
        </button>
        <span className="w-[64px] text-[16px] font-semibold">
          {i + 1} / {n}
        </span>
        <button type="button" aria-label="Next testimonial" onClick={() => setI((i + 1) % n)} className="hover:opacity-60">
          <LongArrow dir="right" />
        </button>
      </div>
      <blockquote className="mt-[60px] max-w-[700px] text-[24px] leading-[29px] font-medium tracking-[-0.01em]">“{t.quote}”</blockquote>
      <div className="mt-[34px] text-[16px] leading-6 font-semibold">{t.title}</div>
      <div className="text-[16px] leading-6 text-[#2b2d2b]">{t.org}</div>
    </section>
  );
}
