"use client";

import { useState, type ReactNode } from "react";
import { account } from "@/config/brand";
import { Modal } from "@/components/ui/Modal";
import { CheckIcon, ChevronDown, CloseIcon, DesktopIcon, MobileIcon } from "@/components/ui/icons";
import { project } from "./data";
import { Flag } from "./flags";
import { I, MenuPanel, MenuRow, useMenu } from "./ui";

const input =
  "h-10 w-full rounded-md border border-rk-border-strong bg-white px-3 text-[16px] text-rk-text outline-none placeholder:text-rk-muted focus:border-[#7a86f2] focus:ring-2 focus:ring-[#c7cdfa]";

function Title({ children, size = 24, className = "" }: { children: ReactNode; size?: number; className?: string }) {
  return (
    <h2 style={{ fontSize: size }} className={`pr-6 leading-[1.2] font-bold text-rk-text ${className}`}>
      {children}
    </h2>
  );
}

function Actions({ primary, onPrimary, onCancel, className = "" }: { primary: string; onPrimary: () => void; onCancel: () => void; className?: string }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <button type="button" onClick={onPrimary} className="h-10 rounded-md bg-rk-btn-dark px-3 text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
        {primary}
      </button>
      <button type="button" onClick={onCancel} className="h-10 rounded-md border border-rk-border-strong bg-rk-bg px-3 text-[16px] text-rk-text-2 hover:bg-rk-hover">
        Cancel
      </button>
    </div>
  );
}

function BoxSelect<T extends string>({ value, options, render }: { value: T; options: readonly T[]; render: (v: T) => ReactNode }) {
  const { open: mOpen, ref: mRef, toggle: mToggle, close: mClose } = useMenu();
  const [cur, setCur] = useState(value);
  return (
    <div ref={mRef} className="relative flex-1">
      <button
        type="button"
        onClick={mToggle}
        className={`flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 text-[16px] text-rk-text ${mOpen ? "border-[#7a86f2]" : "border-rk-border-strong"}`}
      >
        <span className="flex items-center gap-2">{render(cur)}</span>
        <ChevronDown width={16} height={16} strokeWidth={2} />
      </button>
      {mOpen && (
        <MenuPanel className="top-[calc(100%+4px)] right-0 left-0">
          {options.map((o) => (
            <MenuRow
              key={o}
              selected={o === cur}
              onClick={() => {
                setCur(o);
                mClose();
              }}
            >
              {render(o)}
            </MenuRow>
          ))}
        </MenuPanel>
      )}
    </div>
  );
}

const deviceRender = (v: string) => (
  <>
    {v === "Desktop" ? <DesktopIcon /> : <MobileIcon />}
    {v}
  </>
);

export function ManageCompetitorsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} width={471}>
      <Title className="leading-[29px]">Manage competitors for {project.domain}</Title>
      <div className="mt-[14px] text-[16px] leading-6">Database</div>
      <div className="mt-2 flex gap-4">
        <BoxSelect
          value="USA"
          options={["USA", "Sweden", "United Kingdom"] as const}
          render={(v) => (
            <>
              <Flag country={v} />
              {v}
            </>
          )}
        />
        <BoxSelect value="Desktop" options={["Desktop", "Mobile"] as const} render={deviceRender} />
      </div>
      <div className="mt-[25px] text-[16px] leading-6">Domains</div>
      <div className="mt-2 flex flex-col gap-4">
        {[0, 1, 2, 3].map((i) => (
          <input key={i} placeholder="Add competitor" className={input} />
        ))}
      </div>
      <Actions primary="Save" onPrimary={onClose} onCancel={onClose} className="mt-[25px]" />
    </Modal>
  );
}

export function ManageTagsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [v, setV] = useState("");
  const n = v.split(",").filter((t) => t.trim()).length;
  return (
    <Modal open={open} onClose={onClose} width={459}>
      <Title>Manage Tags</Title>
      <div className="mt-[14px] flex items-center justify-between text-[16px] leading-6">
        Enter tags separated by commas
        <span className="flex h-6 items-center rounded-full border border-rk-border-strong px-[6px] text-[12px] text-rk-text-2">{Math.min(n, 3)}/3</span>
      </div>
      <textarea value={v} onChange={(e) => setV(e.target.value)} className="mt-2 block h-[70px] w-full resize-none rounded-md border border-rk-border-strong px-3 py-2 text-[16px] outline-none focus:border-[#7a86f2]" />
      <Actions primary="Save" onPrimary={onClose} onCancel={onClose} className="mt-6 [&>button]:h-[38px]" />
    </Modal>
  );
}

export function RenameProjectModal({ open, onClose, name, onRename }: { open: boolean; onClose: () => void; name: string; onRename: (v: string) => void }) {
  const [v, setV] = useState(name);
  return (
    <Modal open={open} onClose={onClose} width={490}>
      <Title size={20} className="leading-7">
        Rename project
      </Title>
      <div className="mt-[20px] text-[14px] leading-5">
        Domain: <b className="font-semibold">{project.domain}</b>
      </div>
      <div className="mt-[16px] text-[14px] leading-5">Name</div>
      <div className="relative mt-[8px]">
        <input autoFocus value={v} onChange={(e) => setV(e.target.value)} className={`${input} pr-9 border-[#7a86f2] ring-2 ring-[#c7cdfa]`} />
        {v && (
          <button type="button" aria-label="Clear" onClick={() => setV("")} className="absolute top-1/2 right-3 -translate-y-1/2 text-rk-muted hover:text-rk-text">
            <CloseIcon width={14} height={14} />
          </button>
        )}
      </div>
      <Actions
        primary="Save"
        onPrimary={() => {
          if (v.trim()) onRename(v.trim());
          onClose();
        }}
        onCancel={onClose}
        className="mt-[26px] [&>button]:h-[38px]"
      />
    </Modal>
  );
}

export function ShareModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} width={705}>
      <div className="flex items-center gap-3">
        <Title>Share {project.domain}</Title>
        <span className="-ml-[24px] flex h-5 items-center gap-1 rounded bg-[#dbfee8] px-[6px] text-[12px] text-[#007c65]">
          <CheckIcon width={12} height={12} strokeWidth={2} />
          All set up tools
        </span>
      </div>
      <div className="mt-[22px] text-[16px] leading-6">Email addresses</div>
      <div className="mt-[6px] flex items-start gap-2">
        <textarea placeholder="mark@example.com, eve@example.com" className="h-[101px] w-[369px] resize-none rounded-md border border-rk-border-strong px-[9px] py-2 text-[16px] outline-none placeholder:text-rk-muted focus:border-[#7a86f2]" />
        <div className="w-[121px]">
          <BoxSelect value="Editor" options={["Editor", "Viewer"] as const} render={(v) => v} />
        </div>
        <button type="button" onClick={onClose} className="h-10 w-[121px] rounded-md bg-rk-btn-dark text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
          Share
        </button>
      </div>
      <table className="mt-[24px] w-full text-[14px] leading-5">
        <thead>
          <tr className="border-b border-rk-border text-[13px]">
            <th className="h-[34px] pl-2 text-left font-normal">Shared with</th>
            <th className="w-[100px] text-center font-normal">Permission</th>
            <th className="w-[112px] text-left font-normal">Stop sharing</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-[35px] border-b border-rk-border">
            <td className="pl-2">{account.email}</td>
            <td className="text-center text-rk-muted">Owner</td>
            <td />
          </tr>
        </tbody>
      </table>
    </Modal>
  );
}

export function CreateProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [share, setShare] = useState(false);
  return (
    <Modal open={open} onClose={onClose} width={459}>
      <Title>Create SEO project</Title>
      <div className="mt-[24px] flex items-center gap-2 text-[16px] leading-6">
        Domain <I />
      </div>
      <div className="text-[14px] leading-5 text-rk-muted">Enter a domain or subdomain. Subfolders not supported.</div>
      <input autoFocus placeholder="domain.com" className={`${input} mt-[8px]`} />
      <div className="mt-[22px] flex items-center justify-between text-[16px] leading-6">
        Name <span className="text-rk-muted">(optional)</span>
      </div>
      <input placeholder="Auto-generated if left blank" className={`${input} mt-2`} />
      <label className="mt-[15px] flex cursor-pointer items-center gap-[10px] text-[16px] leading-6">
        <input type="checkbox" checked={share} onChange={() => setShare((s) => !s)} className="sr-only" />
        <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border ${share ? "border-rk-btn-dark bg-rk-btn-dark text-white" : "border-rk-border-strong bg-white"}`}>
          {share && <CheckIcon width={12} height={12} strokeWidth={2.2} />}
        </span>
        Share once created
      </label>
      <Actions primary="Create SEO project" onPrimary={onClose} onCancel={onClose} className="mt-[26px] [&>button]:h-[38px]" />
    </Modal>
  );
}
