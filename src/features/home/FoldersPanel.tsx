"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/config/routes";
import { PlusIcon, RkjhFavicon, ShareUserIcon } from "@/components/icons";
import { CreateFolderModal } from "./CreateFolderModal";
import { DeleteFolderModal } from "./DeleteFolderModal";
import { FolderMenu } from "./FolderMenu";
import { ShareFoldersModal } from "./ShareFoldersModal";
import { project, type Metric } from "./data";

const trendColor = {
  up: "text-rk-success",
  down: "text-rk-danger",
  neutral: "text-rk-muted",
};

function Gauge() {
  return (
    <svg viewBox="0 0 34 20" width={34} height={20} className="ml-[10px]">
      <path d="M4 17a13 13 0 0 1 26 0" fill="none" stroke="#e0e1e9" strokeWidth={4} strokeLinecap="round" />
      <circle cx="4" cy="17" r="2.6" fill="#fdc23c" />
    </svg>
  );
}

function MetricCell({ label, value, sub, trend, gauge, href }: Metric) {
  return (
    <div className="px-3 pt-3 pb-[13px]">
      <div className="text-[14px] leading-5 whitespace-nowrap text-rk-text">{label}</div>
      <div className="mt-[6px] mb-[2px] flex h-7 items-center">
        <Link href={href} className="text-[20px] leading-7 font-bold text-rk-number hover:text-rk-link-hover">
          {value}
        </Link>
        {gauge && <Gauge />}
      </div>
      {sub && <div className={`text-[14px] leading-5 tracking-[0.02em] ${trendColor[trend ?? "neutral"]}`}>{sub}</div>}
    </div>
  );
}

export function FoldersPanel() {
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [creating, setCreating] = useState(false);
  const [sharing, setSharing] = useState(false);
  return (
    <section className="mt-6 rounded-lg bg-white shadow-card">
      <div className="flex h-[56px] items-center justify-between border-b border-rk-border px-5">
        <h2 className="text-[16px] font-bold">Folders</h2>
        <div className="flex gap-2">
          <button type="button" onClick={() => setSharing(true)} className="flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-white px-2 text-[14px] text-rk-text-2 hover:bg-rk-bg">
            <ShareUserIcon />
            Share
          </button>
          <button type="button" onClick={() => setCreating(true)} className="flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-white px-2 pr-[10px] text-[14px] text-rk-text-2 hover:bg-rk-bg">
            <PlusIcon />
            Create Folder
          </button>
        </div>
      </div>

      <div className="rounded-b-lg bg-[#f9f9fb] p-5">
        {deleted ? (
          <div className="py-6 text-center text-[14px] leading-5 text-rk-muted">No folders yet. Create a folder to group your projects.</div>
        ) : (
          <div className="rounded-lg bg-white shadow-card">
            <div className="flex h-11 items-center border-b border-rk-border px-5">
              <RkjhFavicon />
              <Link href={routes.seoDashboard} className="ml-2 text-[16px] font-bold text-rk-link hover:text-rk-link-hover">
                {project.name}
              </Link>
              <span className="ml-3 text-[14px] text-rk-text-2">{project.domain}</span>
              <FolderMenu onDelete={() => setDeleting(true)} />
            </div>
            <div className="grid grid-cols-7">
              {project.metrics.map((m) => (
                <MetricCell key={m.label} {...m} />
              ))}
            </div>
          </div>
        )}
      </div>
      <CreateFolderModal open={creating} onClose={() => setCreating(false)} />
      <ShareFoldersModal open={sharing} onClose={() => setSharing(false)} />
      <DeleteFolderModal
        open={deleting}
        onClose={() => setDeleting(false)}
        onDeleted={() => {
          setDeleting(false);
          setDeleted(true);
        }}
      />
    </section>
  );
}
