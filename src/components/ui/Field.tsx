import type { InputHTMLAttributes } from 'react'
import { cn } from './cn'

type FieldProps = {
  label: string
  containerClassName?: string
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

export function Field({ label, containerClassName, className, ...props }: FieldProps) {
  return (
    <label className={cn('block text-sm font-medium text-slate-700 dark:text-slate-200', containerClassName)}>
      {label}
      <input
        {...props}
        className={cn(
          'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500',
          className,
        )}
      />
    </label>
  )
}
