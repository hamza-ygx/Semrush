"use client";

import { useState } from "react";
import { CheckIcon, ChevronDown } from "@/components/ui/icons";
import { Modal } from "@/components/ui/Modal";
import { Popover, MenuItem } from "@/components/ui/Popover";
import { project } from "./data";

const roles = ["Editor", "Viewer"] as const;

export function ShareFoldersModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [picked, setPicked] = useState<string[]>([]);
  const [emails, setEmails] = useState("");
  const [role, setRole] = useState<(typeof roles)[number]>("Editor");
  const close = () => {
    setPicked([]);
    setEmails("");
    onClose();
  };
  return (
    <Modal open={open} onClose={close} width={720} className="pt-[35px]! pb-[41px]!" closeClassName="top-[10px] right-[10px] h-[37px]! w-[37px]! text-rk-text hover:bg-[#eef0f2] [&_svg]:h-[18px] [&_svg]:w-[18px]">
      <div className="flex items-center gap-3">
        <h2 className="text-[24px] leading-8 font-semibold">Share folders</h2>
        <span className="inline-flex h-[22px] items-center gap-1 rounded-md bg-[#d7f5ea] px-[6px] text-[12px] font-semibold text-[#0a7a5a]">
          <CheckIcon width={13} height={13} strokeWidth={2.2} />
          All set up tools
        </span>
      </div>
      <div className="mt-[22px] flex items-center gap-[5px] text-[16px] leading-6">
        Folders
        <span className="flex h-5 items-center rounded-full border border-rk-border-strong px-[5px] text-[12px] text-rk-text-2">{picked.length}/1</span>
      </div>
      <Popover
        className="mt-[4px] w-[376px]"
        panelClassName="w-full"
        trigger={({ toggle, open: o }) => (
          <button type="button" onClick={toggle} className="flex h-10 w-full items-center justify-between rounded-md border border-rk-border-strong bg-white px-3 text-left text-[16px]">
            <span className={picked.length ? "text-rk-text" : "text-[#8b8d8c]"}>{picked.length ? picked.join(", ") : "Select folders"}</span>
            <ChevronDown className={o ? "rotate-180" : ""} />
          </button>
        )}
      >
        <MenuItem active={picked.includes(project.name)} onClick={() => setPicked((p) => (p.length ? [] : [project.name]))}>
          {project.name}
        </MenuItem>
      </Popover>
      <div className="mt-[24px] text-[16px] leading-6">Email addresses</div>
      <div className="mt-[4px] flex items-start gap-2">
        <textarea
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          placeholder="mark@example.com, eve@example.com"
          className="h-[104px] w-[376px] resize-none rounded-md border border-rk-border-strong px-[10px] py-[7px] text-[16px] leading-6 outline-none placeholder:text-[#a9abaa] focus:border-[#8f95eb]"
        />
        <Popover
          className="w-[124px]"
          panelClassName="w-full"
          trigger={({ toggle }) => (
            <button type="button" onClick={toggle} className="flex h-10 w-full items-center justify-between rounded-md border border-rk-border-strong bg-white px-3 text-[16px] text-rk-text">
              {role}
              <ChevronDown />
            </button>
          )}
        >
          {(c) =>
            roles.map((r) => (
              <MenuItem
                key={r}
                active={r === role}
                onClick={() => {
                  setRole(r);
                  c();
                }}
              >
                {r}
              </MenuItem>
            ))
          }
        </Popover>
        <button type="button" onClick={close} className="h-10 w-[124px] rounded-md bg-rk-btn-dark text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
          Share
        </button>
      </div>
    </Modal>
  );
}
