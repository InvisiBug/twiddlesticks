import { Link } from "react-router-dom";
import { Badge, Button, Card } from "@/lib/components";
import { formatMoney, addItemToCart } from "@/lib/helpers";
import { useContext } from "@/lib/context";
import type { Product } from "@/types";

const ProductDetailInfo = ({ product }: ProductDetailInfoProps) => {
  const { onlineOrdersEnabled, cart, setCart } = useContext();

  const handleAddToCart = (id: number) => {
    setCart(addItemToCart(cart, id));
  };

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

      {onlineOrdersEnabled ? (
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => handleAddToCart(product.id)} variant="secondary" className="sm:min-w-40">
            Add to bag
          </Button>
          <Link to="/checkout" className="rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800 sm:min-w-40">
            Go to checkout
          </Link>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-slate-300 px-4 py-4 text-sm font-medium text-slate-600 dark:border-slate-600 dark:text-slate-300">Online orders coming soon.</p>
      )}
    </section>
  );
};

export default ProductDetailInfo;

type ProductDetailInfoProps = {
  product: Product;
};
