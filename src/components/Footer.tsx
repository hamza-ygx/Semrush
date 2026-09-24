import { brand } from "@/config/brand";
import { ChevronDownIcon, TranslateIcon } from "./icons";

const link = "text-[14px] leading-5 text-[#484a54] hover:text-[#191b23]";

export function Footer() {
  return (
    <footer className="mt-auto px-8 pb-[26px]">
      <div className="flex h-8 items-center justify-between">
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
      <div className="mt-[14px] flex items-center justify-between">
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
