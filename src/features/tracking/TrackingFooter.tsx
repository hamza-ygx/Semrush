import { brand } from "@/config/brand";
import { Footer } from "@/components/Footer";
import { ChevronDownIcon, TranslateIcon } from "@/components/icons";

export function TrackingFooter() {
  return (
    <>
      <div className="hidden pt-[34px] xl:block">
        <Footer />
      </div>
    <footer className="flex flex-col items-center pt-[230px] pb-[39px] text-[16px] leading-6 text-rk-text-2 xl:hidden">
      <button type="button" className="flex items-center gap-[6px] hover:text-rk-text">
        <TranslateIcon width={16} height={16} />
        English
        <ChevronDownIcon className="text-[#a9abb6]" />
      </button>
      <div className="mt-[24px] flex gap-7">
        <a href="#" className="hover:text-rk-text">
          Contact us
        </a>
        <a href="#" className="hover:text-rk-text">
          Cookie settings
        </a>
      </div>
      <p className="mt-[25px]">© 2026 {brand.legalName}. All rights reserved.</p>
    </footer>
    </>
  );
}
