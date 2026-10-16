import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

const Badge = ({ children, className, ...props }: BadgeProps) => {
  return (
    <span {...props} className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide", className)}>
      {children}
    </span>
  );
};

export default Badge;

type BadgeProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLSpanElement>;
