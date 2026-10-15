import { Link } from "react-router-dom";
import { formatMoney } from "../../../lib/money";
import type { Product } from "../../../types";
import { Badge } from "./baseComponents/Badge";
import { Button } from "./baseComponents/Button";
import { Card } from "./baseComponents/Card";

type ProductDetailInfoProps = {
  product: Product;
  addToCart: (id: number) => void;
};

export function ProductDetailInfo({ product, addToCart }: ProductDetailInfoProps) {
  return (
    <section className="space-y-5">
      <Badge className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">{product.tag}</Badge>
      <h1 className="text-4xl font-semibold tracking-tight">{product.name}</h1>
      <p className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{formatMoney(product.price)}</p>
      <p className="leading-relaxed text-slate-700 dark:text-slate-300">{product.longDescription}</p>

      <Card className="p-5">
        <h2 className="text-base font-semibold">Product details</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
          {product.details.map((detail) => (
            <li key={detail} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-500 dark:bg-slate-400" aria-hidden="true" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => addToCart(product.id)} variant="secondary" className="sm:min-w-40">
          Add to bag
        </Button>
        <Link to="/checkout" className="rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800 sm:min-w-40">
          Go to checkout
        </Link>
      </div>
    </section>
  );
}
