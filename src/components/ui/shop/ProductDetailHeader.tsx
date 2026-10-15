import { Link } from 'react-router-dom'

type ProductDetailHeaderProps = {
  totalItems: number
}

export function ProductDetailHeader({ totalItems }: ProductDetailHeaderProps) {
  return (
    <nav className="mb-8 flex items-center justify-between rounded-full border border-white/70 bg-white/75 px-5 py-3 shadow-sm backdrop-blur">
      <Link to="/" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
        Back to shop
      </Link>
      <Link
        to="/checkout"
        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Cart: {totalItems}
      </Link>
    </nav>
  )
}
