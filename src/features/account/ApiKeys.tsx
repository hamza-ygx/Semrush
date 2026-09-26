"use client";

import { useState } from "react";
import { SendFeedback } from "@/components/shell/PageHeader";
import { Modal } from "@/components/ui/Modal";
import { PlusIcon } from "@/components/ui/icons";
import { AccountShell, PageTop } from "./AccountShell";
import { ApiKeysEmptyArt, InactiveKeysArt } from "./art";
import { apiKeyTabs, type ApiKeyTab } from "./data";

function CreateKeyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  return (
    <Modal open={open} onClose={onClose} width={480} title="Create API key">
      <label className="flex flex-col gap-2 text-[14px] leading-5">
        Key name
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Reporting integration"
          className="h-10 rounded-md border border-[#d6d8d7] px-3 text-[16px] outline-none placeholder:text-[#a9abaa] focus:border-[#7a86f2]"
        />
      </label>
      <div className="mt-6 flex gap-3">
        <button type="button" disabled={!name.trim()} onClick={onClose} className="h-10 rounded-md bg-rk-btn-dark px-3 text-[16px] font-medium text-white disabled:opacity-50">
          Create
        </button>
        <button type="button" onClick={onClose} className="h-10 rounded-md border border-rk-border-strong bg-rk-bg px-3 text-[16px] text-rk-text-2 hover:bg-rk-hover">
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export function ApiKeys({ tab }: { tab: ApiKeyTab }) {
  const [create, setCreate] = useState(false);
  const active = tab === "active";
  const cols = active ? "grid-cols-[442px_150px_147px_150px_1fr]" : "grid-cols-[359px_150px_119px_150px_150px_1fr]";
  return (
    <AccountShell active="apiKeys">
      <PageTop
        crumb="API Keys"
        title="API Keys"
        variant="keys"
        links={<SendFeedback />}
        actions={
          <button type="button" onClick={() => setCreate(true)} className="mt-[9px] flex h-7 items-center gap-2 rounded-md bg-rk-btn-dark px-2 text-[14px] font-medium text-white hover:bg-black">
            <PlusIcon />
            Create API key
          </button>
        }
        tabs={apiKeyTabs}
        activeTab={tab}
      />
      <div className="px-8 pt-5 pb-[15px]">
        <div className="overflow-hidden rounded-lg bg-white shadow-card">
          <div className={`grid ${cols} h-10 items-center border-b border-[#eceef0] bg-[#f9f9f9] px-3 text-[12px] leading-4 text-rk-text`}>
            <span>Key</span>
            <span>Permissions</span>
            <span>Version</span>
            <span>Created</span>
            {active ? (
              <span>Expires</span>
            ) : (
              <>
                <span>Status</span>
                <span>Inactive Since</span>
              </>
            )}
          </div>
          {active ? (
            <div className="flex gap-10 px-5 pt-5 pb-5">
              <ApiKeysEmptyArt />
              <div>
                <h2 className="text-[16px] leading-6 font-semibold">Nothing here yet</h2>
                <p className="mt-[13px] text-[14px] leading-5">Create an API key to start.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center pt-[21px] pb-[18px]">
              <InactiveKeysArt />
              <p className="mt-[15px] text-[16px] leading-6 font-semibold text-rk-text-2">Nothing here yet</p>
            </div>
          )}
        </div>
      </div>
      <CreateKeyModal open={create} onClose={() => setCreate(false)} />
    </AccountShell>
  );
}
