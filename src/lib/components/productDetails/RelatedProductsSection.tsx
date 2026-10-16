import { Link } from "react-router-dom";
import { formatMoney } from "@/lib/money";
import type { Product } from "@/types";
import { Button, Card } from "@/lib/components";

const RelatedProducts: React.FC<RelatedProductsSectionProps> = ({ products, addToCart }) => {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Other Twiddles</h2>
        {/* <Link to="/" className="text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
          View all
        </Link> */}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((related) => (
          <Card key={related.id} className="overflow-hidden">
            <Link to={`/products/${related.id}`} className="block">
              <img src={related.images[0]} alt={related.name} className="h-44 w-full object-cover" />
            </Link>
            <div className="space-y-3 p-4">
              <div>
                <p className="text-base font-semibold tracking-tight">{related.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{formatMoney(related.price)}</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/products/${related.id}`} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800">
                  View details
                </Link>
                <Button onClick={() => addToCart(related.id)} variant="secondary" className="px-3 py-2">
                  Add to bag
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;

type RelatedProductsSectionProps = {
  products: Product[];
  addToCart: (id: number) => void;
};
