import { Link } from 'react-router-dom'
import type { Product } from '../../../types'

type ProductPagerProps = {
  previousProduct: Product
  nextProduct: Product
}

export function ProductPager({ previousProduct, nextProduct }: ProductPagerProps) {
  return (
    <div className="grid gap-3 border-t border-slate-200 pt-5 sm:grid-cols-2">
      <Link
        to={`/products/${previousProduct.id}`}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Previous item</p>
        <p className="mt-1 font-semibold text-slate-900">{previousProduct.name}</p>
      </Link>
      <Link
        to={`/products/${nextProduct.id}`}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Next item</p>
        <p className="mt-1 font-semibold text-slate-900">{nextProduct.name}</p>
      </Link>
    </div>
  )
}
