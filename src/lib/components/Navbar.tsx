import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/lib/components";

const Navbar = ({ totalItems, theme, onToggleTheme, onlineOrdersEnabled }: NavbarProps) => {
  const location = useLocation();
  const isGalleryPage = location.pathname === "/gallery";

  return (
    <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/70 bg-white/75 px-5 py-3 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
      <Link to="/" className="rounded-lg transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Em Kay</p>
        <p className="text-lg font-semibold tracking-tight">TwiddleSticks</p>
      </Link>
      <div className="flex items-center gap-2">
        {!isGalleryPage ? (
          <Link to="/gallery" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">
            Gallery
          </Link>
        ) : null}
        {onlineOrdersEnabled ? (
          <Link to="/checkout" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
            Cart: {totalItems}
          </Link>
        ) : null}
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </nav>
  );
};

export default Navbar;

type NavbarProps = {
  totalItems: number;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onlineOrdersEnabled: boolean;
};
