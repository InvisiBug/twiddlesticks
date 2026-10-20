import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatMoney, addItemToCart } from "@/lib/helpers";
import { useContext } from "@/lib/context";
import type { Product } from "@/types";
import { Button, Card } from "@/lib/components";

const RelatedProducts: React.FC<RelatedProductsSectionProps> = ({ products }) => {
  const { onlineOrdersEnabled, cart, setCart } = useContext();

  const maxProductsToShow = 4;
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!products.length) {
      setRandomProducts([]);
      return;
    }

    setRandomProducts([...products].sort(() => Math.random() - 0.5).slice(0, maxProductsToShow));
  }, [products, maxProductsToShow]);

  const handleAddToCart = (id: number) => {
    setCart(addItemToCart(cart, id));
  };

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Other Twiddles</h2>
        {/* <Link to="/" className="text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
          View all
        </Link> */}
      </div>

      <div className="grid gap-10 lg:gap-25 grid-cols-2 lg:grid-cols-3">
        {randomProducts.map((related) => (
          <Card key={related.id} className="overflow-hidden">
            <Link to={`/products/${related.id}`} className="block">
              <img src={related.images[0]} alt={related.name} className="mx-auto block sm:h-20 lg:h-44 w-full object-cover" />
            </Link>

            <div className="space-y-5 p-5">
              <div>
                <p className="text-base font-semibold tracking-tight">{related.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{formatMoney(related.price)}</p>
              </div>

              <div className="flex gap-2">
                <Link to={`/products/${related.id}`} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800">
                  View details
                </Link>
                {onlineOrdersEnabled ? (
                  <Button onClick={() => handleAddToCart(related.id)} variant="secondary" className="px-3 py-2">
                    Add to bag
                  </Button>
                ) : (
                  <p className="rounded-md border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-600 dark:text-slate-300">Coming soon</p>
                )}
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
};
