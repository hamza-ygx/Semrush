"use client";

import { routes } from "@/config/routes";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { account, brand } from "@/config/brand";
import { Modal } from "@/components/ui/Modal";
import { Popover } from "@/components/ui/Popover";
import { ShareIcon } from "@/components/ui/icons";
import { ChevronBold, ExternalLinkIcon, LookerIcon } from "./icons";
import { project } from "./data";
import { Tip } from "./Tip";

const lookerUrl = "https://lookerstudio.google.com/";

const lookerGroups = [
  {
    title: "Landscape",
    items: ["Visibility", "Avg. Position", "Est. Traffic"],
  },
  { title: "Overview", items: ["Rankings Table"] },
];

const CapIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
    <path d="M8 2.5 1 6l7 3.5L15 6z" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
    <path d="M3.8 7.6v3.6c1 1.2 2.5 1.8 4.2 1.8s3.2-.6 4.2-1.8V7.6M14.3 6.3v4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

export function LookerMenu({ className }: { className: string }) {
  const row = "flex h-8 w-full items-center px-2 text-[14px] leading-5 text-rk-text whitespace-nowrap";
  return (
    <Popover
      offset={6}
      panelClassName="w-[137px] !pt-[3px] !pb-[2px]"
      trigger={({ toggle, open }) => (
        <Tip tip="Export data to Looker Studio (formerly Google Data Studio)" gap={11} boxClassName="w-[226px] !py-[10px]">
          <button type="button" onClick={toggle} data-testid="pt-looker" className={`${className} ${open ? "!bg-rk-hover" : ""}`}>
            <LookerIcon />
            Looker Studio
          </button>
        </Tip>
      )}
    >
      {(close) => (
        <>
          {lookerGroups.map((g) => (
            <div key={g.title}>
              <div className={`${row} font-semibold`}>{g.title}</div>
              {g.items.map((it) => (
                <a key={it} href={lookerUrl} target="_blank" rel="noreferrer" onClick={close} className={`${row} gap-[5px] hover:bg-rk-bg`}>
                  {it}
                  <ExternalLinkIcon width={16} height={16} className="text-[#a9abaa]" />
                </a>
              ))}
            </div>
          ))}
          <div className="mt-[3px] mb-[3px] border-t border-rk-border" />
          <a href={lookerUrl} target="_blank" rel="noreferrer" onClick={close} className={`${row} gap-[4px] hover:bg-rk-bg`}>
            <CapIcon />
            How it works
          </a>
        </>
      )}
    </Popover>
  );
}

function ShareModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} width={720} className="!pt-[39px]">
      <h2 className="flex items-center gap-[13px] text-[24px] leading-8 font-semibold text-rk-text">
        Share {project.domain}
        <span className="mt-[3px] flex h-5 items-center gap-1 rounded-full bg-[#d7f5ea] px-[7px] text-[12px] leading-4 font-medium text-[#007c65]">
          <svg viewBox="0 0 16 16" width={14} height={14}>
            <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All set up tools
        </span>
      </h2>
      <div className="mt-[21px] text-[16px] leading-6 font-medium text-rk-text">Email addresses</div>
      <div className="mt-[4px] flex items-start gap-2">
        <textarea
          placeholder="mark@example.com, eve@example.com"
          className="h-[104px] w-[376px] resize-none rounded-md border border-rk-border-strong px-[9px] pt-[9px] text-[16px] leading-6 text-rk-text outline-none placeholder:text-[#a9abaa] focus:border-[#8e92ec]"
        />
        <Popover
          offset={4}
          panelClassName="w-[124px]"
          trigger={({ toggle }) => (
            <button
              type="button"
              onClick={toggle}
              className="flex h-10 w-[124px] items-center justify-between rounded-md border border-rk-border-strong bg-white pr-[14px] pl-3 text-[16px] text-rk-text hover:border-[#a9abaa]"
            >
              Editor
              <ChevronBold width={16} height={16} />
            </button>
          )}
        >
          {(close) =>
            ["Editor", "Viewer"].map((o) => (
              <button key={o} type="button" onClick={close} className="flex h-8 w-full items-center px-3 text-left text-[14px] text-rk-text hover:bg-rk-bg">
                {o}
              </button>
            ))
          }
        </Popover>
        <button type="button" onClick={onClose} className="flex h-10 w-[124px] items-center justify-center rounded-md bg-rk-btn-dark text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
          Share
        </button>
      </div>
      <div className="mt-[32px] flex h-[24px] items-start border-b border-rk-border px-2 text-[12px] leading-4 text-rk-text">
        <span className="flex-1">Shared with</span>
        <span className="w-[70px] text-right">Permission</span>
        <span className="ml-[42px] w-[98px]">Stop sharing</span>
      </div>
      <div className="flex h-[38px] items-center border-b border-rk-border px-2 text-[14px] text-rk-text">
        <span className="flex-1">{account.email}</span>
        <span className="w-[70px] text-right text-rk-muted">Owner</span>
        <span className="ml-[42px] w-[98px]" />
      </div>
    </Modal>
  );
}

export function ShareButton({ className }: { className: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} data-testid="pt-share" className={className}>
        <ShareIcon />
        Share
      </button>
      <ShareModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

const Gem = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="ml-[6px] inline-block shrink-0 align-[-1px]">
    <path d="M4 2.5h8l3 3.8L8 14 1 6.3z" fill="#2bb3ff" />
    <path d="M1 6.3h14M4 2.5l2 3.8L8 14l2-7.7 2-3.8" fill="none" stroke="#8fd7ff" strokeWidth={0.8} />
  </svg>
);

function Switch({ on, onChange, testid }: { on: boolean; onChange: () => void; testid?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      data-testid={testid}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-[#009f81]" : "bg-[#e0e2e1]"}`}
    >
      <span className={`absolute top-[2px] h-5 w-5 rounded-full bg-white shadow-[0_1px_2px_rgba(25,27,35,0.2)] transition-all ${on ? "left-[22px]" : "left-[2px]"}`} />
    </button>
  );
}

function MiniSelect({ options, width }: { options: string[]; width: number }) {
  const [value, setValue] = useState(options[0]);
  return (
    <Popover
      offset={4}
      panelClassName="max-h-[240px] overflow-y-auto"
      trigger={({ toggle, open }) => (
        <button
          type="button"
          onClick={toggle}
          style={{ width }}
          className={`flex h-7 items-center justify-between rounded-md border bg-white pr-[8px] pl-2 text-[14px] text-rk-text hover:border-[#a9abaa] ${open ? "border-[#8e9ff0]" : "border-rk-border-strong"}`}
        >
          {value}
          <ChevronBold width={16} height={16} />
        </button>
      )}
    >
      {(close) =>
        options.map((o) => (
          <button
            key={o}
            type="button"
            style={{ width }}
            onClick={() => {
              setValue(o);
              close();
            }}
            className={`flex h-8 items-center px-2 text-left text-[14px] text-rk-text hover:bg-rk-bg ${o === value ? "bg-[#e9f7ff]" : ""}`}
          >
            {o}
          </button>
        ))
      }
    </Popover>
  );
}

function Tile({ icon, children, onClick }: { icon: ReactNode; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[152px] w-[148px] flex-col items-center rounded-md border border-rk-border-strong pt-[36px] text-center text-[16px] leading-6 text-rk-text shadow-[0_1px_2px_rgba(25,27,35,0.08)] hover:bg-rk-bg"
    >
      <span className="text-rk-text-2">{icon}</span>
      <span className="mt-[7px]">{children}</span>
    </button>
  );
}

const ico = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const days = Array.from({ length: 28 }, (_, i) => String(i + 1)).reverse();

function PdfModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [agree, setAgree] = useState(false);
  const [toggles, setToggles] = useState([false, false, false]);
  const [note, setNote] = useState(true);
  const flip = (i: number) => setToggles(toggles.map((v, j) => (j === i ? !v : v)));
  const labels: [string, boolean][] = [
    ["Schedule", false],
    [`No ${brand.name} mentions`, true],
    ["AI Summary", false],
  ];
  return (
    <Modal open={open} onClose={onClose} width={720} className="!mt-0 !mb-[41px] overflow-hidden !p-0">
      <div className="bg-rk-bg px-10 pt-[39px] pb-10">
        <h2 className="text-[24px] leading-8 font-semibold text-rk-text">Export settings</h2>
        <div className="mt-[21px] flex flex-col gap-4 text-[16px] leading-6 text-rk-text">
          {labels.map(([l, gem], i) => (
            <div key={l}>
              <label className="flex items-center gap-2">
                <Switch on={toggles[i]} onChange={() => flip(i)} testid={i === 0 ? "pt-pdf-schedule" : undefined} />
                {l}
                {gem && <Gem />}
              </label>
              {i === 0 && toggles[0] && (
                <div className="mt-4 mb-[7px] flex gap-2">
                  <MiniSelect options={["Monthly", "Weekly", "Daily"]} width={108} />
                  <MiniSelect options={days} width={108} />
                  <MiniSelect options={["Anytime", "Morning", "Afternoon", "Evening"]} width={92} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-10 pt-10 pb-5">
        <div className="flex gap-4 text-[14px] leading-5 text-rk-text-2">
          <span
            role="checkbox"
            aria-checked={agree}
            tabIndex={0}
            onClick={() => setAgree(!agree)}
            className={`mt-[12px] flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-[3px] border ${agree ? "border-rk-text bg-rk-text" : "border-[#d6d8d7] bg-white"}`}
          >
            {agree && (
              <svg viewBox="0 0 16 16" width={12} height={12}>
                <path d="m3 8.5 3 3 7-7" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <p>
            I have read{" "}
            <Link href={routes.company.privacyPolicy} className="text-rk-link hover:text-rk-link-hover">
              Privacy Policy
            </Link>{" "}
            and agreed with its terms. I acknowledge that I am responsible for receiving consent if I provide an email address on behalf of another person.
          </p>
        </div>
        {toggles[0] && note && (
          <div className="mt-[29px] flex items-start gap-[9px] rounded-md border border-rk-border bg-[#f7f8f8] py-5 pr-[25px] pl-4 text-[14px] leading-5 text-rk-text">
            <svg viewBox="0 0 16 16" width={16} height={16} className="mt-[2px] shrink-0 text-rk-text-2">
              <path d="M2.5 8a5.5 5.5 0 1 0 1.6-3.9M2.3 2.3v2.3h2.3M8 5v3.2l2 1.3" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="flex-1">To schedule email report updates to other people, set up sharing using the button below.</span>
            <button type="button" aria-label="Dismiss" onClick={() => setNote(false)} className="mt-[3px] ml-3 text-rk-text-2 hover:text-rk-text">
              <svg viewBox="0 0 16 16" width={14} height={14}>
                <path d="m3.5 3.5 9 9m0-9-9 9" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
        <div className={`${toggles[0] && note ? "mt-4" : "mt-[29px]"} flex gap-4`}>
          <Tile
            onClick={onClose}
            icon={
              <svg viewBox="0 0 20 20" width={23} height={23}>
                <path {...ico} strokeWidth={2} d="M10 2.5v11M5.5 9l4.5 4.5L14.5 9M3.5 17.5h13" />
              </svg>
            }
          >
            Download
            <br />
            PDF
          </Tile>
          <Tile
            onClick={onClose}
            icon={
              <svg viewBox="0 0 20 20" width={23} height={23}>
                <path {...ico} d="M1.5 3.5h17v13h-17zM2 4.5l8 6.5 8-6.5" />
              </svg>
            }
          >
            Send to my
            <br />
            email
          </Tile>
          <Tile
            onClick={onClose}
            icon={
              <svg viewBox="0 0 20 20" width={23} height={23}>
                <g {...ico} strokeWidth={1.7}>
                  <circle cx="8" cy="7" r="3.5" />
                  <path d="M2 18c.4-3.4 2.8-5.5 6-5.5s5.6 2.1 6 5.5M11.5 3.6a3.5 3.5 0 1 1 2.2 6.3M15.5 12.8c1.6.8 2.6 2.4 2.9 4.5" />
                </g>
              </svg>
            }
          >
            Share
            <br />
            via email
          </Tile>
          <Tile
            onClick={onClose}
            icon={
              <svg viewBox="0 0 20 20" width={23} height={23}>
                <path {...ico} d="M8.5 6.5H6a3.5 3.5 0 0 0 0 7h2.5M11.5 6.5H14a3.5 3.5 0 0 1 0 7h-2.5M7 10h6" />
              </svg>
            }
          >
            Create online
            <br />
            <span className="inline-flex items-center">
              dashboard
              <Gem />
            </span>
          </Tile>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 flex h-[58px] w-full items-center justify-center gap-[10px] rounded-md border border-rk-border-strong text-[16px] text-rk-text hover:bg-rk-bg"
        >
          <svg viewBox="0 0 20 20" width={23} height={23}>
            <path {...ico} d="M7 5 2.5 10 7 15M13 5l4.5 5-4.5 5" />
          </svg>
          <span className="inline-flex items-center">
            Embed via iFrame
            <Gem />
          </span>
        </button>
        <div className="mt-[31px] text-center">
          <button type="button" className="text-[14px] leading-5 text-rk-muted underline decoration-[#a9abaa] decoration-dashed decoration-1 underline-offset-[5px] hover:text-rk-text">
            View report balance
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function PdfButton({ className }: { className: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} data-testid="pt-pdf" className={className}>
        PDF
      </button>
      <PdfModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
