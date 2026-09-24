import { brand } from "@/config/brand";
import { Footer } from "@/components/Footer";
import { ChevronDownIcon, TranslateIcon } from "@/components/icons";

const link = "text-[16px] leading-5 text-[#6c6e79] hover:text-rk-text";

export function AnalyticsFooter({ gap = 138, bottom = 39 }: { gap?: number; bottom?: number }) {
  return (
    <>
      <div className="hidden pt-[34px] xl:block">
        <Footer />
      </div>
      <footer className="flex flex-col items-center xl:hidden" style={{ paddingTop: gap, paddingBottom: bottom }}>
        <button type="button" className={`${link} flex items-center gap-[6px]`}>
          <TranslateIcon width={18} height={18} />
          English
          <ChevronDownIcon className="text-[#a9abb6]" />
        </button>
        <div className="mt-7 flex gap-7">
          <button type="button" className={link}>
            Contact us
          </button>
          <button type="button" className={link}>
            Cookie settings
          </button>
        </div>
        <div className="mt-7 text-[16px] leading-5 text-[#6c6e79]">© 2026 {brand.legalName}. All rights reserved.</div>
      </footer>
    </>
  );
}
