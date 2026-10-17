import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageShell, ProductGallery, ProductDetailInfo, ProductDetailNotFound, RelatedProducts } from "@/lib/components";
import { useStorefront } from "@/lib/context";
import { getTotalItems } from "@/lib/cart";
import type { Cart, Product } from "@/types";

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, cart, addToCart, theme, toggleTheme }) => {
  const { onlineOrdersEnabled } = useStorefront();

  const { productId } = useParams();
  const totalItems = useMemo(() => getTotalItems(cart), [cart]);

  const product = useMemo(() => products.find((entry) => entry.id === Number(productId)), [products, productId]);
  const relatedProducts = useMemo(() => products.filter((entry) => entry.id !== product?.id), [products, product?.id]);

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setSelectedImage(0);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [productId]);

  if (!product) {
    return <ProductDetailNotFound />;
  }

  return (
    <PageShell maxWidth="7xl" navbar={{ totalItems, theme, onToggleTheme: toggleTheme, onlineOrdersEnabled }}>
      <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
        <span aria-hidden="true">←</span>
        Back to home
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] ">
        <ProductGallery productName={product.name} images={product.images} selectedImage={selectedImage} onSelectImage={setSelectedImage} />

        <section className="space-y-5">
          <ProductDetailInfo product={product} addToCart={addToCart} onlineOrdersEnabled={onlineOrdersEnabled} />
        </section>
      </div>

      <RelatedProducts products={relatedProducts} addToCart={addToCart} onlineOrdersEnabled={onlineOrdersEnabled} />
    </PageShell>
  );
};

export default ProductDetailPage;

type ProductDetailPageProps = {
  products: Product[];
  cart: Cart;
  addToCart: (id: number) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
};
