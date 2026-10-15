import { Link } from 'react-router-dom'
import { Card } from '../Card'
import { PageShell } from '../layout'

export function ProductDetailNotFound() {
  return (
    <PageShell maxWidth="4xl" containerClassName="py-10">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Product not found</h1>
          <p className="mt-2 text-slate-600">This item may have been removed from the catalog.</p>
          <Link
            to="/"
            className="mt-5 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Back to shop
          </Link>
        </Card>
    </PageShell>
  )
}
