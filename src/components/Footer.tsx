import { brand } from "@/config/brand";
import { ChevronDownIcon, TranslateIcon } from "./icons";

const link = "text-[14px] leading-5 text-[#484a54] hover:text-[#191b23]";

export function Footer() {
  return (
    <footer className="mt-auto px-8 pb-[26px] max-xl:pb-[40px]">
      <div className="flex flex-col items-center gap-6 text-[16px] leading-6 text-rk-muted xl:hidden">
        <button className="flex items-center gap-[6px] hover:text-rk-text">
          <TranslateIcon />
          English
          <ChevronDownIcon className="text-[#a9abb6]" />
        </button>
        <div className="flex gap-7">
          <a href="#" className="hover:text-rk-text">Contact us</a>
          <a href="#" className="hover:text-rk-text">Cookie settings</a>
        </div>
        <span>© 2026 {brand.legalName}. All rights reserved.</span>
      </div>
      <div className="hidden h-8 items-center justify-between xl:flex">
        <div className="flex items-center gap-5">
          <a href="#" className={link}>Contact us</a>
          <a href="#" className={link}>About us</a>
          <a href="#" className={link}>Blog</a>
          <button className={`${link} flex items-center gap-[6px]`}>
            <TranslateIcon />
            English
            <ChevronDownIcon className="text-[#8a8e9b]" />
          </button>
        </div>
        <div className="flex gap-2">
          <a
            href="#"
            className="flex h-[30px] items-center rounded-md border border-[#c4c7cf] bg-[#e0e1e9] px-3 text-[14px] text-[#484a54] hover:bg-[#c4c7cf]"
          >
            See plans and pricing
          </a>
          <a
            href="#"
            className="flex h-[30px] items-center rounded-md bg-[#009f81] px-3 text-[14px] font-medium text-white hover:bg-[#007c65]"
          >
            Get started with {brand.name}
          </a>
        </div>
      </div>
      <div className="mt-[14px] hidden items-center justify-between xl:flex">
        <div className="flex gap-5">
          <a href="#" className={link}>Cookie settings</a>
          <a href="#" className={link}>Legal info</a>
          <a href="#" className={link}>Privacy policy</a>
          <a href="#" className={link}>Do not sell my personal info</a>
        </div>
        <span className="text-[14px] leading-5 text-[#484a54]">
          © 2026 {brand.legalName}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
