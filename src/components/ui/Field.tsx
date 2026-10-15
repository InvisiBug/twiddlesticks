import type { InputHTMLAttributes } from 'react'
import { cn } from './cn'

type FieldProps = {
  label: string
  containerClassName?: string
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

export function Field({ label, containerClassName, className, ...props }: FieldProps) {
  return (
    <label className={cn('block text-sm font-medium text-slate-700', containerClassName)}>
      {label}
      <input {...props} className={cn('mt-1 w-full rounded-lg border border-slate-300 px-3 py-2', className)} />
    </label>
  )
}
