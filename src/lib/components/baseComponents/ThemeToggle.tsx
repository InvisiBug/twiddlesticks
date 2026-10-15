import { cn } from "./cn";

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      <span className="sr-only">Toggle color theme</span>
      <span aria-hidden="true" className={cn("relative inline-flex h-5 w-9 items-center rounded-full transition", isDark ? "bg-slate-600" : "bg-slate-200")}>
        <span className={cn("h-4 w-4 rounded-full bg-white shadow-sm transition-transform", isDark ? "translate-x-4" : "translate-x-0.5")} />
      </span>
      <span aria-hidden="true">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}

type ThemeToggleProps = {
  theme: "light" | "dark";
  onToggle: () => void;
};
