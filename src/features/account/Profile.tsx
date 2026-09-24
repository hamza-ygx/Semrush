"use client";

import { useState, type ReactNode } from "react";
import { account } from "@/config/brand";
import { ChevronDown } from "@/components/ui/icons";
import { AccountShell, PageTop } from "./AccountShell";
import { PeopleArt } from "./art";
import { countries, profileTabs, registrationDate, timeZones, type ProfileTab } from "./data";

const input = "h-10 rounded-md border border-[#d9d9d9] bg-white px-3 text-[16px] outline-none placeholder:text-[#a9abb6] focus:border-[#7a86f2]";
const green = "inline-flex h-10 items-center rounded-md bg-[#009f81] px-3 text-[16px] font-semibold text-white hover:bg-[#007c65]";

const VerifiedIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#009f81]">
    <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth={1.5} />
    <path d="m5 8.2 2 2 4-4.2" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Field({ label, children, labelW }: { label: string; children: ReactNode; labelW: number }) {
  return (
    <div className="flex items-center">
      <span style={{ width: labelW }} className="shrink-0 text-[16px] leading-6 text-rk-text">
        {label}
      </span>
      {children}
    </div>
  );
}

function Select({ options, placeholder, defaultValue = "" }: { options: string[]; placeholder?: string; defaultValue?: string }) {
  const [v, setV] = useState(defaultValue);
  return (
    <div className="relative">
      <select value={v} onChange={(e) => setV(e.target.value)} className={`${input} w-[350px] appearance-none pr-8 ${v ? "text-rk-text" : "text-[#a9abb6]"}`}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o} value={o} className="text-rk-text">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-[11px] -translate-y-1/2 text-rk-text" strokeWidth={2.2} width={16} height={16} />
    </div>
  );
}

function AccountInfo() {
  const [saved, setSaved] = useState(false);
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
      }}
    >
      <Field label="Full name" labelW={103}>
        <input aria-label="Full name" className={`${input} w-[350px] text-rk-text`} />
      </Field>
      <Field label="Phone" labelW={103}>
        <input placeholder="Phone" className={`${input} w-[350px] text-rk-text`} />
      </Field>
      <Field label="Company" labelW={103}>
        <input placeholder="Company" className={`${input} w-[350px] text-rk-text`} />
      </Field>
      <Field label="Country" labelW={103}>
        <Select options={countries} defaultValue="Sweden" />
      </Field>
      <Field label="Time zone" labelW={103}>
        <Select options={timeZones} placeholder="Time zone" />
      </Field>
      <div className="mt-2 flex items-center gap-3">
        <button type="submit" className={green}>
          Save changes
        </button>
        <button type="reset" onClick={() => setSaved(false)} className="inline-flex h-10 items-center rounded-md border border-[#dfdfdf] bg-[#f9f9f9] px-3 text-[16px] text-rk-text-2 hover:bg-rk-hover">
          Cancel
        </button>
        {saved && <span className="text-[14px] text-rk-success">Changes saved</span>}
      </div>
    </form>
  );
}

function EmailTab() {
  return (
    <div className="flex items-center gap-[84px] py-2 pl-[34px]">
      <PeopleArt />
      <div className="-mt-[10px]">
        <p className="text-[16px] leading-6">To change the email address, please contact our Support Team.</p>
        <button type="button" className={`${green} mt-[22px] px-[13px]`}>
          Contact our Support team
        </button>
      </div>
    </div>
  );
}

const EyeIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" fill="none" stroke="currentColor" strokeWidth={1.3} />
    <circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth={1.3} />
  </svg>
);

function PasswordTab() {
  const [show, setShow] = useState(false);
  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
      <Field label="Current password" labelW={159}>
        <input type="password" aria-label="Current password" className={`${input} w-[240px] text-rk-text`} />
      </Field>
      <Field label="New password" labelW={159}>
        <div className="relative">
          <input type={show ? "text" : "password"} aria-label="New password" className={`${input} w-[240px] pr-9 text-rk-text`} />
          <button type="button" aria-label="Show password" onClick={() => setShow((s) => !s)} className="absolute top-1/2 right-[9px] -translate-y-1/2 text-[#8a8e9b] hover:text-rk-text">
            <EyeIcon />
          </button>
        </div>
      </Field>
      <div className="mt-2">
        <button type="submit" className={green}>
          Change password
        </button>
      </div>
    </form>
  );
}

function SecurityTab() {
  const [on, setOn] = useState(false);
  return (
    <div className="-mt-[2px] pb-[2px]">
      <label className="flex cursor-pointer items-center gap-4">
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-label="Enable 2-factor authentication via email"
          onClick={() => setOn((o) => !o)}
          className={`relative h-[18px] w-9 rounded-full transition-colors ${on ? "bg-[#009f81]" : "bg-[#e0e1e9]"}`}
        >
          <span className={`absolute top-[1px] flex h-4 w-4 items-center justify-center rounded-full bg-white transition-all ${on ? "left-[19px]" : "left-[1px]"}`}>
            {!on && (
              <svg viewBox="0 0 10 10" width={10} height={10}>
                <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="#8a8e9b" strokeWidth={1.3} strokeLinecap="round" />
              </svg>
            )}
          </span>
        </button>
        <span className="text-[16px] leading-6">Enable 2-factor authentication via email</span>
      </label>
      <p className="mt-[12px] text-[16px] leading-6 text-rk-muted">
        Any time a login attempt is made, we will require a verification code.
        <br />
        For more information on two-factor authentication, refer to our{" "}
        <button type="button" className="text-rk-link hover:text-rk-link-hover">
          Help Center
        </button>
      </p>
    </div>
  );
}

export function ProfilePage({ tab }: { tab: ProfileTab }) {
  return (
    <AccountShell active="profile">
      <div className="min-h-[908px]">
        <PageTop
          crumb="Profile settings"
          title="Profile settings"
          meta={
            <>
              <span className="flex items-center gap-[3px]">
                {account.email}
                <VerifiedIcon />
              </span>
              <span className="ml-6">ID: {account.id}</span>
              <span className="ml-6">Registration date: {registrationDate}</span>
            </>
          }
          tabs={profileTabs}
          activeTab={tab}
        />
        <div className="px-8 pt-4">
          <div className="rounded-lg bg-white p-6 shadow-card">
            {tab === "info" && <AccountInfo />}
            {tab === "email" && <EmailTab />}
            {tab === "password" && <PasswordTab />}
            {tab === "security" && <SecurityTab />}
          </div>
        </div>
      </div>
    </AccountShell>
  );
}
