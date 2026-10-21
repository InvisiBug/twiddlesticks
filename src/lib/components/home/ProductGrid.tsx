import { Link } from "react-router-dom";
import { Card, CardSection, Badge, AddToBagButton } from "@/lib/components";
import { useContext } from "@/lib/context";
import { formatMoney } from "@/lib/helpers";

const ProductGrid = () => {
  const { onlineOrdersEnabled, products } = useContext();

  const sortedProducts = [...products].sort((a, b) => a.id - b.id);

  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Shop Items</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">Free local pickup available</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 ">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="h-full overflow-hidden transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <Link to={`/products/${product.id}`} className="h-full flex flex-col">
              <div className="relative w-full min-h-60 overflow-hidden ">
                <img src={product.images[0]} alt={`${product.name} placeholder`} className="h-full w-full object-contain transition duration-500 group-hover:scale-105" />
                <Badge className="absolute left-3 top-3 bg-white/90 text-slate-700 dark:bg-slate-900/85 dark:text-slate-200">{product.tag}</Badge>
              </div>

              <CardSection className="mt-auto ">
                <h3 className="text-lg font-semibold tracking-tight">{product.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{product.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-semibold tracking-tight">{formatMoney(product.price)}</p>
                  {onlineOrdersEnabled ? (
                    <AddToBagButton productId={product.id} preventNavigation className="sm:min-w-40" />
                  ) : (
                    <p className="max-w-2/3 rounded-md border border-dashed border-slate-300 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-600 dark:text-slate-300">Online Orders Coming soon</p>
                  )}
                </div>
              </CardSection>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
