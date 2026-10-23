import { Button } from "@/lib/components";
import type { CookieConsent } from "@/types";

const CookieBanner: React.FC<CookieBannerProps> = ({ onChoose }) => {
  return (
    <aside
      className="fixed inset-x-3 bottom-3 z-50 mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 sm:inset-x-6 sm:bottom-6 sm:p-5"
      role="dialog"
      aria-modal="false"
      aria-label="Cookie preferences"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Cookies on Twiddlesticks</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">We use essential cookies to keep this site working. Optional cookies help us improve your browsing experience.</p>
        </div>

        <div className="flex gap-2 sm:shrink-0">
          <Button type="button" variant="outline" className="px-3 py-2" onClick={() => onChoose("essential")}>
            Essential only
          </Button>
          <Button type="button" className="px-3 py-2" onClick={() => onChoose("accepted")}>
            Accept all
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default CookieBanner;

type CookieBannerProps = {
  onChoose: (choice: CookieConsent) => void;
};
