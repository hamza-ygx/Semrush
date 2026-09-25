"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { account, brand } from "@/config/brand";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/primitives";
import { ChevronDown, ExportIcon, PlusIcon, RefreshIcon, ShareIcon } from "@/components/ui/icons";
import { AuditSettingsPanel } from "./part1/ProjectsList";
import { Checkbox, CogIcon, useToggle } from "./part1/ui";

const c = routes.siteAuditCampaign;

const tb =
  "inline-flex h-7 shrink-0 items-center justify-center gap-[6px] rounded-md border border-rk-border-strong px-2 text-[14px] font-medium whitespace-nowrap text-rk-muted hover:bg-rk-hover";

function Tb({ children, onClick, testid, on, className = "" }: { children: ReactNode; onClick?: () => void; testid?: string; on?: boolean; className?: string }) {
  return (
    <button type="button" onClick={onClick} data-testid={testid} className={`${tb} ${on ? "bg-rk-hover" : "bg-[#f5f6f6]"} ${className}`}>
      {children}
    </button>
  );
}

const Favicon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
    <rect x="0.5" y="0.5" width="15" height="15" rx="3" fill="#1b1e1a" />
    <path d="M0.5 3.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3V8h-15z" fill="#ec2d3a" />
  </svg>
);

export function ProjectSwitcher() {
  const { open, setOpen, ref, toggle } = useToggle();
  return (
    <div ref={ref} className="relative flex">
      <button
        type="button"
        onClick={toggle}
        data-testid="sa-project"
        className="flex items-center gap-1 text-rk-link hover:text-rk-link-hover hover:underline hover:decoration-1 hover:underline-offset-[5px]"
      >
        www.rkjh.se
        <ChevronDown />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+5px)] left-[2px] z-50 w-[278px] rounded-md bg-white pt-[9px] text-[14px] leading-5 font-normal shadow-popover">
          <Link href={c.overview} onClick={() => setOpen(false)} className="flex h-[51px] gap-2 border-l-2 border-rk-text bg-[#eef1fd] pt-[6px] pl-[6px] hover:bg-[#e3e8fc]">
            <span className="mt-[2px]">
              <Favicon />
            </span>
            <span>
              <span className="block text-rk-text">www.rkjh.se</span>
              <span className="-mt-[1px] block pl-[2px] text-rk-muted">www.rkjh.se</span>
            </span>
          </Link>
          <div className="mt-[8px] border-t border-rk-border" />
          <Link
            href={routes.siteAudit}
            onClick={() => setOpen(false)}
            className="flex h-[39px] items-center justify-between pr-[10px] pl-2 text-rk-link hover:bg-rk-bg hover:text-rk-link-hover"
          >
            Create new SEO project
            <PlusIcon width={14} height={14} strokeWidth={2.2} />
          </Link>
        </div>
      )}
    </div>
  );
}

function ExportPopover({ report }: { report?: string }) {
  const { open, setOpen, ref, toggle } = useToggle();
  const [rel, setRel] = useState(false);
  return (
    <div ref={ref} className="relative flex">
      <Tb onClick={toggle} testid="sa-export" on={open}>
        <ExportIcon />
        Export
      </Tb>
      {open && (
        <div className="absolute top-[calc(100%+6px)] right-0 z-50 w-[288px] rounded-md bg-white px-4 pt-[15px] pb-4 text-[14px] leading-5 shadow-popover">
          <div className="text-[16px] leading-6 font-semibold text-rk-text">Export data</div>
          <div className="mt-4 text-rk-text">Report</div>
          <button
            type="button"
            className="mt-[9px] flex h-7 w-full items-center justify-between rounded-md border border-rk-border-strong bg-white pr-[6px] pl-2 text-rk-text hover:border-[#a9abaa]"
          >
            {report ?? "Issues"}
            <ChevronDown strokeWidth={2.2} />
          </button>
          {report ? (
            <label className="mt-[15px] flex cursor-pointer items-center gap-2 text-rk-text">
              <Checkbox checked={rel} onChange={() => setRel(!rel)} />
              Relative URLs instead of absolute
            </label>
          ) : (
            <div className="mt-[15px] flex items-center gap-2 text-[#a9abaa]">
              <Checkbox disabled className="!border-[#e0e2e1]" />
              Relative URLs instead of absolute
            </div>
          )}
          <div className="mt-5 flex gap-[9px]">
            <Button variant="primary" className="h-7" onClick={() => setOpen(false)}>
              Export to XLSX
            </Button>
            <Tb onClick={() => setOpen(false)} className="!text-rk-muted">
              Export to CSV
            </Tb>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsMenu() {
  const { open, setOpen, ref, toggle } = useToggle();
  return (
    <div ref={ref} className="relative flex">
      <button
        type="button"
        aria-label="Audit settings"
        data-testid="sa-settings"
        onClick={toggle}
        className={`inline-flex h-7 w-7 items-center justify-center rounded-md border border-rk-border-strong text-rk-text-2 hover:bg-rk-hover ${open ? "bg-rk-hover" : "bg-[#f5f6f6]"}`}
      >
        <CogIcon />
      </button>
      {open && <AuditSettingsPanel roomy onClose={() => setOpen(false)} className="absolute top-[calc(100%+7px)] right-0 z-50 w-[300px]" />}
    </div>
  );
}

function ShareModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} width={720}>
      <h2 className="flex items-center gap-[13px] text-[24px] leading-8 font-semibold text-rk-text">
        Share www.rkjh.se
        <span className="mt-[3px] flex h-5 items-center gap-1 rounded-full bg-[#d7f5ea] px-[7px] text-[12px] leading-4 font-medium text-[#007c65]">
          <svg viewBox="0 0 16 16" width={14} height={14}>
            <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All set up tools
        </span>
      </h2>
      <div className="mt-6 text-[16px] leading-6 font-medium text-rk-text">Email addresses</div>
      <div className="mt-[4px] flex items-start gap-2">
        <textarea
          placeholder="mark@example.com, eve@example.com"
          className="h-[104px] w-[376px] resize-none rounded-md border border-rk-border-strong px-[9px] pt-[9px] text-[16px] leading-6 text-rk-text outline-none placeholder:text-[#a9abaa] focus:border-[#8e92ec]"
        />
        <button
          type="button"
          className="flex h-10 w-[124px] items-center justify-between rounded-md border border-rk-border-strong bg-white pr-[14px] pl-3 text-[16px] text-rk-text hover:border-[#a9abaa]"
        >
          Editor
          <ChevronDown strokeWidth={2.2} />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-[124px] items-center justify-center rounded-md bg-rk-btn-dark text-[16px] font-semibold text-white hover:bg-[#2b2e38]"
        >
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

const Gem = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="ml-[6px] inline-block shrink-0 align-[-1px]">
    <path d="M4 2.5h8l3 3.8L8 14 1 6.3z" fill="#2bb3ff" />
    <path d="M1 6.3h14M4 2.5l2 3.8L8 14l2-7.7 2-3.8" fill="none" stroke="#8fd7ff" strokeWidth={0.8} />
  </svg>
);

function Switch() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-[#009f81]" : "bg-[#e0e2e1]"}`}
    >
      <span className={`absolute top-[2px] h-5 w-5 rounded-full bg-white shadow-[0_1px_2px_rgba(25,27,35,0.2)] transition-all ${on ? "left-[22px]" : "left-[2px]"}`} />
    </button>
  );
}

function Tile({ icon, children, onClick }: { icon: ReactNode; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[152px] w-[148px] flex-col items-center rounded-md border border-rk-border-strong pt-[36px] shadow-[0_1px_2px_rgba(25,27,35,0.08)] text-center text-[16px] leading-6 text-rk-text hover:bg-rk-bg"
    >
      <span className="text-rk-text-2">{icon}</span>
      <span className="mt-[10px]">{children}</span>
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

function PdfModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [agree, setAgree] = useState(false);
  return (
    <Modal open={open} onClose={onClose} width={720} className="!mb-[41px] overflow-hidden !p-0">
      <div className="bg-rk-bg px-10 pt-10 pb-10">
        <div className="flex items-center gap-[15px] text-[16px] leading-6 text-rk-text">
          Report template
          <button
            type="button"
            className="flex h-7 w-[176px] items-center justify-between rounded-md border border-rk-border-strong bg-white pr-[6px] pl-2 text-[14px] hover:border-[#a9abaa]"
          >
            Site Audit: Issues
            <ChevronDown strokeWidth={2.2} />
          </button>
        </div>
        <h2 className="mt-[30px] text-[24px] leading-8 font-semibold text-rk-text">Export settings</h2>
        <div className="mt-[22px] flex flex-col gap-4 text-[16px] leading-6 text-rk-text">
          {[
            ["Schedule", false],
            [`No ${brand.name} mentions`, true],
            ["AI Summary", false],
          ].map(([l, gem]) => (
            <label key={String(l)} className="flex items-center gap-2">
              <Switch />
              {l}
              {gem && <Gem />}
            </label>
          ))}
        </div>
      </div>
      <div className="px-10 pt-10 pb-5">
        <div className="flex gap-4 text-[14px] leading-5 text-rk-text-2">
          <Checkbox checked={agree} onChange={() => setAgree(!agree)} className="mt-[12px]" />
          <p>
            I have read{" "}
            <button type="button" className="text-rk-link hover:text-rk-link-hover">
              Privacy Policy
            </button>{" "}
            and agreed with its terms. I acknowledge that I am responsible for receiving consent if I provide an email address on behalf of another person.
          </p>
        </div>
        <div className="mt-[29px] flex gap-4">
          <Tile
            onClick={onClose}
            icon={
              <svg viewBox="0 0 20 20" width={23} height={23}>
                <path {...ico} d="M10 2.5v10M5.5 8.5l4.5 4.5 4.5-4.5M3 17h14" />
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
                <path {...ico} strokeWidth={1.6} d="M2.5 4h15v12h-15zM2.5 4.5 10 11l7.5-6.5" />
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
                <g {...ico} strokeWidth={1.6}>
                  <circle cx="9" cy="6.5" r="3.5" />
                  <path d="M2.5 17.5c.5-3.5 3-5.5 6.5-5.5 1.3 0 2.4.3 3.3.8M14 13.5l1.5 1.5 3-3" />
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
          <button
            type="button"
            className="text-[14px] leading-5 text-rk-muted underline decoration-[#a9abaa] decoration-dashed decoration-1 underline-offset-[5px] hover:text-rk-text"
          >
            View report balance
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function SiteAuditActions({ looker, pdf, exportBtn, lookerIcon, exportReport }: { looker: boolean; pdf: boolean; exportBtn: boolean; lookerIcon: ReactNode; exportReport?: string }) {
  const [modal, setModal] = useState<"share" | "pdf" | null>(null);
  const close = () => setModal(null);
  return (
    <>
      <Button variant="primary" className="h-7 px-2">
        <RefreshIcon />
        Rerun campaign
      </Button>
      {looker && (
        <Tb className="hidden xl:inline-flex">
          {lookerIcon}
          Looker Studio
        </Tb>
      )}
      {pdf && (
        <Tb onClick={() => setModal("pdf")} testid="sa-pdf">
          <ExportIcon />
          PDF
        </Tb>
      )}
      {exportBtn && <ExportPopover report={exportReport} />}
      <Tb onClick={() => setModal("share")} testid="sa-share">
        <ShareIcon />
        Share
      </Tb>
      <SettingsMenu />
      <ShareModal open={modal === "share"} onClose={close} />
      <PdfModal open={modal === "pdf"} onClose={close} />
    </>
  );
}
