import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from './cn'

type CardProps = {
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn('rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/85 dark:shadow-black/20', className)}
    >
      {children}
    </div>
  )
}

export function CardSection({ children, className, ...props }: CardProps) {
  return (
    <div {...props} className={cn('p-4', className)}>
      {children}
    </div>
  )
}
