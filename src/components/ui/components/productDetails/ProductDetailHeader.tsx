import { Link } from "react-router-dom";
import { ThemeToggle } from "../baseComponents/ThemeToggle";

type ProductDetailHeaderProps = {
  totalItems: number;
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

export function ProductDetailHeader({ totalItems, theme, onToggleTheme }: ProductDetailHeaderProps) {
  return (
    <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/70 bg-white/75 px-5 py-3 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
      <Link to="/" className="text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
        Back to shop
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <Link to="/checkout" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
          Cart: {totalItems}
        </Link>
      </div>
    </nav>
  );
}
