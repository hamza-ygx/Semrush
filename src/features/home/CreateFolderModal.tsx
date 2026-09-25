"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

const input = "h-10 w-[360px] rounded-md border bg-white px-3 text-[16px] outline-none placeholder:text-[#8a8e9b]";

function Tag({ x, y, w, label }: { x: number; y: number; w: number; label: string }) {
  return (
    <g>
      <rect x={x - 3} y={y + 3} width={w} height={27} rx={3} fill="#111" />
      <rect x={x} y={y} width={w} height={27} rx={3} fill="#fff" stroke="#111" strokeWidth={1.6} />
      <text x={x + 10} y={y + 19} fontSize={14} fontWeight={500} fill="#111">
        {label}
      </text>
    </g>
  );
}

function FolderArt() {
  return (
    <svg data-testid="create-folder-art" viewBox="0 0 320 443" width={320} height={443} className="block translate-x-[4px] translate-y-[10px]" aria-hidden>
      <path d="M33 111h150l12-12h37v193H33z" fill="#111" />
      <path d="M39 106h140l12-12h40v198H39z" fill="#a66bf5" stroke="#111" strokeWidth={2} />
      <path d="M39 106h140l12-12h40v36H39z" fill="#111" />
      <Tag x={70} y={148} w={52} label="SEO" />
      <Tag x={127} y={150} w={77} label="Content" />
      <Tag x={70} y={194} w={133} label="Advertising" />
      <Tag x={70} y={237} w={99} label="Local" />
      <path d="M232 215c-10 30-30 40-52 44-12 2-12 16 2 16 26 0 42-8 56-26z" fill="#b580ff" stroke="#111" strokeWidth={2} />
      <path d="M180 230c-6-18-4-34 6-38 8-3 12 6 8 14-4 10-4 18 2 26" fill="#b580ff" stroke="#111" strokeWidth={2} />
      <path d="M240 225c-4 40-2 70 18 96 10 14 24 16 32 10-14-4-22-14-26-30-6-24-4-50 2-70z" fill="#b580ff" stroke="#111" strokeWidth={2} />
      <path d="M262 225c14 26 32 40 44 60 6 10 0 20-10 18 6-8 2-16-6-24-14-14-28-26-36-44z" fill="#b580ff" stroke="#111" strokeWidth={2} />
      <path d="M226 228c-18 36-46 62-78 72-10 3-8 14 2 13 40-6 70-36 88-72z" fill="#b580ff" stroke="#111" strokeWidth={2} />
      <ellipse cx="268" cy="196" rx="46" ry="44" fill="#b580ff" stroke="#111" strokeWidth={2} />
      <circle cx="286" cy="164" r="6" fill="#111" />
      <circle cx="297" cy="216" r="7" fill="#111" />
      <circle cx="306" cy="186" r="4" fill="#111" />
      <circle cx="237" cy="177" r="15" fill="#fff" stroke="#111" strokeWidth={1.6} />
      <circle cx="271" cy="194" r="17" fill="#fff" stroke="#111" strokeWidth={1.6} />
      <path d="M226 180l20-10M258 198l24-12M262 206l20-10" stroke="#c9a3f7" strokeWidth={4} />
      <path d="M252 186l4 2M288 200l14 4" stroke="#111" strokeWidth={1.6} fill="none" />
      <path d="M240 210c4 4 10 4 14 0" stroke="#111" strokeWidth={1.6} fill="none" strokeLinecap="round" />
      <g transform="rotate(-18 152 318)">
        <rect x="116" y="296" width="74" height="44" rx="5" fill="#fff" stroke="#111" strokeWidth={2} />
        <rect x="126" y="310" width="42" height="7" rx="3.5" fill="#b580ff" />
        <path d="M126 326h26" stroke="#111" strokeWidth={1.6} />
      </g>
      <path d="M176 318c8-6 18-4 20 4 2 6-4 10-10 10" fill="#b580ff" stroke="#111" strokeWidth={2} />
    </svg>
  );
}

export function CreateFolderModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [site, setSite] = useState("");
  const [name, setName] = useState("");
  const [share, setShare] = useState(false);
  const close = () => {
    setSite("");
    setName("");
    setShare(false);
    onClose();
  };
  return (
    <Modal open={open} onClose={close} width={759} className="flex overflow-hidden p-0!" closeClassName="top-[12px] right-[12px] text-white hover:bg-white/15 [&_svg]:h-4 [&_svg]:w-4">
      <form
        className="w-[440px] shrink-0 pt-[47px] pr-10 pb-[23px] pl-11"
        onSubmit={(e) => {
          e.preventDefault();
          close();
        }}
      >
        <h2 className="text-[24px] leading-8 font-semibold">Create folder</h2>
        <label className="mt-[18px] flex items-center gap-[6px] text-[16px] leading-6">
          Website
          <span className="font-serif text-[14px] text-[#a9abb6] italic">i</span>
        </label>
        <input
          autoFocus
          value={site}
          onChange={(e) => setSite(e.target.value)}
          placeholder="Enter a domain or subdomain"
          className={`${input} mt-2 border-[#8f95eb] shadow-[0_0_0_3px_rgba(143,149,235,0.25)]`}
        />
        <p className="mt-[12px] text-[16px] leading-6">Don&apos;t have a website? Add a competitor</p>
        <label className="mt-[24px] block text-[16px] leading-6">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter a business name" className={`${input} mt-2 border-rk-border-strong focus:border-[#8f95eb]`} />
        <label className="mt-[24px] flex items-center gap-[9px] text-[16px] leading-6">
          <input type="checkbox" checked={share} onChange={(e) => setShare(e.target.checked)} className="h-[19px] w-[19px] appearance-none rounded-[4px] border border-rk-border-strong bg-white checked:border-rk-text checked:bg-rk-text" />
          Share once created
        </label>
        <div className="mt-[24px] flex gap-3">
          <button type="submit" className="h-10 rounded-md bg-rk-btn-dark px-3 text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
            Create
          </button>
          <button type="button" onClick={close} className="h-10 rounded-md border border-rk-border-strong bg-[#f3f5f5] px-3 text-[16px] text-rk-text-2 hover:bg-rk-hover">
            Cancel
          </button>
        </div>
      </form>
      <div className="flex-1 bg-[#b580ff]">
        <FolderArt />
      </div>
    </Modal>
  );
}
