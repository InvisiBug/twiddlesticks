import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from './cn'

type Variant = 'primary' | 'secondary' | 'outline' | 'pill'

type SharedProps = {
  children: ReactNode
  variant?: Variant
  className?: string
  fullWidth?: boolean
}

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>

type AnchorProps = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement>

const variantClasses: Record<Variant, string> = {
  primary: 'bg-emerald-600 text-white hover:bg-emerald-500',
  secondary: 'bg-slate-900 text-white hover:bg-slate-700',
  outline: 'border border-slate-300 text-slate-800 hover:bg-slate-100',
  pill: 'rounded-full bg-slate-900 text-white hover:bg-slate-700',
}

const baseClasses = 'rounded-lg px-4 py-3 text-center text-sm font-semibold transition'

export function Button({
  children,
  variant = 'primary',
  className,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(baseClasses, variantClasses[variant], fullWidth ? 'w-full' : undefined, className)}
    >
      {children}
    </button>
  )
}

export function ButtonLink({
  children,
  variant = 'outline',
  className,
  fullWidth,
  ...props
}: AnchorProps) {
  return (
    <a
      {...props}
      className={cn(baseClasses, variantClasses[variant], fullWidth ? 'block w-full' : undefined, className)}
    >
      {children}
    </a>
  )
}
