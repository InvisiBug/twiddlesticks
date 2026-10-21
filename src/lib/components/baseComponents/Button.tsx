import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

const variantClasses: Record<Variant, string> = {
  primary: "bg-emerald-600 text-white hover:bg-emerald-500",
  secondary: "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white",
  outline: "border border-slate-300 text-slate-800 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800",
  pill: "rounded-full bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white",
};

const baseClasses = "rounded-lg px-4 py-3 text-center text-sm font-semibold transition";

export const Button = ({ children, variant = "primary", className, fullWidth, ...props }: ButtonProps) => {
  return (
    <button {...props} className={cn(baseClasses, variantClasses[variant], fullWidth ? "w-full" : undefined, className)}>
      {children}
    </button>
  );
};

export const ButtonLink = ({ children, variant = "outline", className, fullWidth, ...props }: AnchorProps) => {
  return (
    <a {...props} className={cn(baseClasses, variantClasses[variant], fullWidth ? "block w-full" : undefined, className)}>
      {children}
    </a>
  );
};

type Variant = "primary" | "secondary" | "outline" | "pill";

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
};

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;

type AnchorProps = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement>;
