import { Link, useParams } from "react-router-dom";
import { formatMoney } from "@/lib/helpers";
import { useContext } from "@/lib/context";
import { AddToBagButton, Card } from "@/lib/components";
import { useRelatedProducts } from "@/lib/helpers";

const RelatedProducts: React.FC = () => {
  const { onlineOrdersEnabled, products, maxRelatedProducts } = useContext();
  const { productId } = useParams();

  const relatedProducts = useRelatedProducts(products, productId).slice(0, maxRelatedProducts); // Assuming productId is not available here

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Other Twiddles</h2>
        {/* <Link to="/" className="text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
          View all
        </Link> */}
      </div>

      <div className="grid gap-10 lg:gap-25 grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <Card key={product.id} className="h-full overflow-hidden flex flex-col">
            <Link to={`/products/${product.id}`} className="block">
              <img src={product.images[0]} alt={product.name} className="mx-auto block sm:h-20 lg:h-44 w-full object-cover" />
            </Link>

            <div className="flex h-full flex-col gap-5 p-5">
              <div>
                <p className="text-base font-semibold tracking-tight">{product.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{formatMoney(product.price)}</p>
              </div>

              <div className="mt-auto flex flex-col gap-2 lg:flex-row justify-between">
                <Link to={`/products/${product.id}`} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800">
                  View details
                </Link>
                {onlineOrdersEnabled ? (
                  <AddToBagButton productId={product.id} className="sm:min-w-25" />
                ) : (
                  <p className="rounded-md border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-600 dark:text-slate-300">
                    Online Orders <br />
                    Coming soon
                  </p>
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
