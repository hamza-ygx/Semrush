"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { deleteTargets, project } from "./data";

export function DeleteFolderModal({ open, onClose, onDeleted }: { open: boolean; onClose: () => void; onDeleted: () => void }) {
  const [code, setCode] = useState("");
  const [err, setErr] = useState(false);
  const close = () => {
    setCode("");
    setErr(false);
    onClose();
  };
  return (
    <Modal open={open} onClose={close} width={560}>
      <h2 className="mt-[2px] text-[24px] leading-8 font-semibold">Delete folder</h2>
      <p className="mt-[18px] flex gap-[9px] text-[16px] leading-6">
        Name: <span className="font-medium">{project.name}</span>
      </p>
      <div className="mt-[21px] rounded-md border border-[#ebc3cb] bg-[#ffe9ee] pt-[18px] pr-4 pb-3 pl-4 text-[16px] leading-6">
        <div className="flex items-center gap-[7px] font-semibold">
          <svg viewBox="0 0 16 16" width={17} height={17} className="shrink-0 text-[#d1002f]">
            <path d="M8 1.8 15 14H1z" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
            <path d="M8 6.3v3.6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
            <circle cx="8" cy="11.8" r="0.9" fill="currentColor" />
          </svg>
          The folder and all connected data will be deleted
        </div>
        <div className="mt-3 pl-6">Make sure it is not linked to data:</div>
        <ul className="mt-1 grid grid-cols-2 pl-6">
          {deleteTargets.map((t) => (
            <li key={t} className="flex h-8 items-center gap-[9px]">
              <span className="h-[5px] w-[5px] rounded-full bg-rk-text-2" />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-5 text-[16px] leading-6">
        To confirm, enter this code: <span className="font-semibold text-[#d1002f]">{project.deleteCode}</span>
      </p>
      <input
        autoFocus
        aria-label="Confirmation code"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          setErr(false);
        }}
        className={`mt-3 h-10 w-full rounded-md border bg-white px-3 text-[16px] outline-none ${
          err ? "border-[#ff4953] ring-2 ring-[#ffd5da]" : "border-rk-border-strong focus:border-[#8e92ec] focus:ring-2 focus:ring-[#dcdffb]"
        }`}
      />
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => {
            if (code.trim() === project.deleteCode) {
              setCode("");
              onDeleted();
            } else setErr(true);
          }}
          className="h-10 rounded-md bg-[#f23a43] px-3 text-[16px] font-semibold text-white hover:bg-[#d7202a]"
        >
          Delete
        </button>
        <button type="button" onClick={close} className="h-10 rounded-md border border-[#d5d7de] bg-[#f9f9fa] px-3 text-[16px] text-rk-text-2 hover:bg-rk-hover">
          Cancel
        </button>
      </div>
    </Modal>
  );
}
