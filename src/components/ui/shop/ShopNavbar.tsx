import { Link } from 'react-router-dom'
import { ThemeToggle } from '../ThemeToggle'

type ShopNavbarProps = {
  totalItems: number
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function ShopNavbar({ totalItems, theme, onToggleTheme }: ShopNavbarProps) {
  return (
    <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/70 bg-white/75 px-5 py-3 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Willow Market</p>
        <p className="text-lg font-semibold tracking-tight">Small Batch Goods</p>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <Link
          to="/checkout"
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          Cart: {totalItems}
        </Link>
      </div>
    </nav>
  )
}
