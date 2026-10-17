import type { ReactNode } from "react";
import { cn } from "../components/baseComponents/cn";
import Navbar from "../components/Navbar";

type Theme = "light" | "dark";

type NavbarConfig = {
  totalItems: number;
  theme: Theme;
  onToggleTheme: () => void;
};

type PageShellProps = {
  children: ReactNode;
  maxWidth?: "4xl" | "6xl" | "7xl";
  className?: string;
  containerClassName?: string;
  navbar?: NavbarConfig;
};

const maxWidthClasses: Record<NonNullable<PageShellProps["maxWidth"]>, string> = {
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

export function PageShell({ children, maxWidth = "7xl", className, containerClassName, navbar }: PageShellProps) {
  return (
    <main className={cn("min-h-screen bg-[radial-gradient(circle_at_top,#fff7ed_0%,#f8fafc_35%,#f1f5f9_100%)] text-slate-900 dark:bg-[radial-gradient(circle_at_top,#1f2937_0%,#0f172a_45%,#020617_100%)] dark:text-slate-100", className)}>
      <div className={cn("mx-auto w-full px-4 pb-12 pt-8 sm:px-6 lg:px-8", maxWidthClasses[maxWidth], containerClassName)}>
        {navbar ? <Navbar totalItems={navbar.totalItems} theme={navbar.theme} onToggleTheme={navbar.onToggleTheme} /> : null}
        {children}
      </div>
    </main>
  );
}
