"use client";

import Link from "next/link";
import { useState } from "react";
import { account } from "@/config/brand";
import { ChevronDown } from "@/components/ui/icons";
import { ContactIcon, Stripes } from "./art";
import { contactCards, contactFaq, contactTopics, offices } from "./data";
import { MarketingShell } from "./MarketingShell";

const field = "h-12 w-full rounded-lg border border-[#d4d7d6] bg-white px-4 text-[16px] outline-none placeholder:text-[#8d908e] focus:border-[#171a17]";

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(contactTopics[0]);
  if (sent)
    return (
      <div className="rounded-2xl bg-[#f3eefe] px-10 py-12">
        <h3 className="text-[28px] leading-[34px] font-semibold tracking-[-0.02em]">Thank you!</h3>
        <p className="mt-3 text-[17px] leading-6 text-[#484a49]">We have received your message and will get back to you within one business day.</p>
        <button type="button" onClick={() => setSent(false)} className="mt-6 h-12 rounded-full border border-[#171a17] px-6 text-[15px] font-semibold hover:bg-white">
          Send another message
        </button>
      </div>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid grid-cols-2 gap-4"
    >
      <input required placeholder="First name" className={field} />
      <input required placeholder="Last name" className={field} />
      <input required type="email" defaultValue={account.email} placeholder="Work email" className={field} />
      <input placeholder="Company" className={field} />
      <label className="relative col-span-2">
        <select value={topic} onChange={(e) => setTopic(e.target.value)} className={`${field} appearance-none`}>
          {contactTopics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <ChevronDown width={14} height={14} strokeWidth={2} className="pointer-events-none absolute top-[17px] right-4" />
      </label>
      <textarea required placeholder="How can we help?" rows={5} className="col-span-2 w-full rounded-lg border border-[#d4d7d6] px-4 py-3 text-[16px] outline-none placeholder:text-[#8d908e] focus:border-[#171a17]" />
      <div className="col-span-2 flex items-center justify-between">
        <p className="text-[13px] text-[#6a6c6a]">By submitting this form you agree to our Privacy Policy.</p>
        <button type="submit" className="h-14 rounded-full bg-[#171a17] px-8 text-[15px] font-semibold text-white hover:bg-black">
          Send message
        </button>
      </div>
    </form>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-[#e2e4e3]">
      {contactFaq.map((f, i) => (
        <div key={f.q} className="border-b border-[#e2e4e3]">
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between py-6 text-left text-[20px] leading-7 font-medium">
            {f.q}
            <ChevronDown width={18} height={18} strokeWidth={2} className={open === i ? "rotate-180" : ""} />
          </button>
          {open === i && <p className="-mt-2 pb-6 text-[17px] leading-6 text-[#484a49]">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

export function ContactPage() {
  return (
    <MarketingShell help>
      <section className="relative h-[631px] overflow-hidden bg-[#dbedeb] px-[33px] pt-[80px]">
        <Stripes className="inset-x-0 top-[300px] bottom-0" from="transparent 0%" to="#000 100%" />
        <p className="relative text-[15px] leading-5 font-medium tracking-[0.01em] uppercase">Contact us</p>
        <h1 className="relative mt-[15px] text-[50.5px] leading-[46px] font-semibold tracking-[-0.052em] uppercase">
          Let&apos;s talk strategy
          <br />
          get in touch now
        </h1>
        <div className="relative mt-[50px] grid grid-cols-4 gap-[13px]">
          {contactCards.map((c) => (
            <div key={c.title} className="flex h-[295px] flex-col rounded-[6px] border border-[#e4e6e5] bg-white px-6 pt-[26px] pb-[24px]">
              <ContactIcon name={c.icon} className="ml-[2px] text-[#171a17]" />
              <h2 className="mt-[27px] text-[26px] leading-[26px] font-medium tracking-[-0.03em]">
                {(c.br ?? c.title).split("|").map((l, i) => (
                  <span key={i} className="block">
                    {l}
                  </span>
                ))}
              </h2>
              <p className="mt-[10px] text-[17.5px] leading-6 tracking-[-0.01em] text-[#1b1e1a]">{c.text}</p>
              <Link href={c.href} className="mt-auto inline-flex h-14 self-start items-center rounded-full bg-[#171a17] px-6 text-[14px] font-semibold text-white hover:bg-black">
                {c.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section id="contact-form" className="grid scroll-mt-6 grid-cols-[1fr_1.2fr] gap-24 px-[62px] pt-[120px]">
        <div>
          <p className="text-[15px] font-medium uppercase">Write to us</p>
          <h2 className="mt-4 text-[44px] leading-[44px] font-semibold tracking-[-0.05em] uppercase">Send us a message</h2>
          <p className="mt-6 max-w-[440px] text-[18px] leading-7 text-[#484a49]">Tell us a little about your business and what you need. The right team will get back to you shortly.</p>
        </div>
        <ContactForm />
      </section>
      <section id="offices" className="scroll-mt-6 px-[62px] pt-[120px]">
        <h2 className="text-[44px] leading-[44px] font-semibold tracking-[-0.05em] uppercase">Our offices</h2>
        <div className="mt-10 grid grid-cols-4 gap-[13px]">
          {offices.map((o) => (
            <div key={o.city} className="rounded-[6px] border border-[#e4e6e5] bg-[#f7f8f8] p-6">
              <p className="text-[13px] font-medium tracking-[0.02em] text-[#6a6c6a] uppercase">{o.role}</p>
              <h3 className="mt-2 text-[24px] leading-7 font-medium tracking-[-0.02em]">{o.city}</h3>
              <address className="mt-4 text-[16px] leading-6 text-[#484a49] not-italic">
                {o.address.map((a) => (
                  <span key={a} className="block">
                    {a}
                  </span>
                ))}
              </address>
              <p className="mt-4 text-[16px] font-medium">{o.phone}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="grid grid-cols-[1fr_1.2fr] gap-24 px-[62px] pt-[120px]">
        <h2 className="text-[44px] leading-[44px] font-semibold tracking-[-0.05em] uppercase">Frequently asked questions</h2>
        <Faq />
      </section>
    </MarketingShell>
  );
}
