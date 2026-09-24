import Link from "next/link";
import { account, brand } from "@/config/brand";
import { LogoIcon } from "@/components/icons";
import { UfoArt } from "@/features/dashboard/UfoArt";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex h-[70px] items-center justify-between pr-[37px] pl-[18px]">
        <Link href="/" className="flex items-center gap-2 text-[16px] leading-5 font-bold tracking-tight text-rk-text">
          <LogoIcon width={24} height={24} />
          {brand.name}
        </Link>
        <div className="flex items-center gap-[19px]">
          <button type="button" aria-label="Menu" className="flex h-6 w-6 flex-col items-center justify-center gap-[5px]">
            <span className="h-[2px] w-[13px] rounded bg-rk-text" />
            <span className="h-[2px] w-[13px] rounded bg-rk-text" />
          </button>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c49bff] text-[17px] text-rk-text">{account.initial}</span>
        </div>
      </header>
      <main className="flex items-start pt-[227px] pl-[85px]">
        <UfoArt />
        <div className="ml-[40px] pt-[31px]">
          <h1 className="text-[38px] leading-[48px] font-bold tracking-[-0.01em] text-[#2b2e38]">We got lost</h1>
          <p className="mt-[20px] text-[16px] leading-6 text-[#2b2e38]">
            It looks like this page doesn&apos;t exist.
            <br />
            Try going back or click the button below and we&apos;ll take you home.
          </p>
          <Link href="/" className="mt-[25px] inline-flex h-[41px] items-center rounded-md bg-rk-btn-dark px-3 text-[16px] text-white hover:bg-[#2b2e38]">
            Go to homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
