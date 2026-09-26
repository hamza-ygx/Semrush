"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/config/routes";
import { InviteUsersModal } from "@/components/shell/InviteUsersModal";
import { HeaderLink, SendFeedback } from "@/components/shell/PageHeader";
import { BookIcon } from "@/components/ui/icons";
import { AccountShell, PageTop } from "./AccountShell";
import { userTabs, type UserTab } from "./data";

export function UserManagement({ tab }: { tab: UserTab }) {
  const [invite, setInvite] = useState(false);
  return (
    <AccountShell active="users" search help>
      <PageTop
        crumb="User Management"
        title="User Management"
        className="px-8 pt-6"
        variant="corp"
        links={
          <div className="flex items-center gap-[18px]">
            <HeaderLink href={routes.kb} icon={<BookIcon width={17} height={17} />}>
              User manual
            </HeaderLink>
            <SendFeedback />
          </div>
        }
        actions={
          <button type="button" onClick={() => setInvite(true)} className="mt-[9px] h-7 rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-semibold text-white hover:bg-black">
            Invite users
          </button>
        }
        meta={
          <>
            Users: 3/1
            <Link href={routes.account.subscription} className="ml-5 text-rk-link hover:text-rk-link-hover">
              Buy more
            </Link>
          </>
        }
        tabs={userTabs}
        activeTab={tab}
      />
      <div className="px-8 pt-[18px]">
        <div className="flex h-[501px] flex-col items-center justify-center pb-[6px] rounded-lg bg-white text-center shadow-card">
          <h2 className="text-[20px] leading-7 font-semibold">Restore access for your corporate users</h2>
          <p className="mt-[6px] text-[14px] leading-5">
            Your current subscription doesn’t include additional users.
            <br />
            You cannot invite and manage users, or distribute your subscription units across them.
          </p>
          <Link href={routes.account.subscription} className="mt-[24px] flex h-10 items-center rounded-md bg-[#00a980] px-3 text-[16px] font-medium text-white hover:bg-[#007c65]">
            Buy users
          </Link>
          <p className="mt-[23px] text-[14px] leading-5">
            Need help?{" "}
            <button type="button" className="text-rk-link hover:text-rk-link-hover">
              Contact us
            </button>
            .
          </p>
        </div>
      </div>
      <InviteUsersModal open={invite} onClose={() => setInvite(false)} />
    </AccountShell>
  );
}
