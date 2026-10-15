import { Link } from "react-router-dom";
import type { Product } from "@/types";

export function ProductPager({ previousProduct, nextProduct }: ProductPagerProps) {
  return (
    <div className="grid gap-3 border-t border-slate-200 pt-5 dark:border-slate-700 sm:grid-cols-2">
      <Link
        to={`/products/${previousProduct.id}`}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Previous item</p>
        <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{previousProduct.name}</p>
      </Link>
      <Link
        to={`/products/${nextProduct.id}`}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Next item</p>
        <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{nextProduct.name}</p>
      </Link>
    </div>
  );
}
type ProductPagerProps = {
  previousProduct: Product;
  nextProduct: Product;
};
