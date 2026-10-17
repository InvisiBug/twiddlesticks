import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "@/lib/context";
import { PageShell, ProductGallery, ProductDetailInfo, ProductDetailNotFound, RelatedProducts } from "@/lib/components";
import { getTotalItems } from "@/lib/cart";
import type { Cart } from "@/types";
import { getThemedProducts } from "../helpers";
import { products } from "@/data/storefront";

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ cart, addToCart }) => {
  const { theme } = useContext();
  const { productId } = useParams();
  const totalItems = useMemo(() => getTotalItems(cart), [cart]);

  const themedProducts = useMemo(() => getThemedProducts(theme, products), [theme]);

  const product = useMemo(() => themedProducts.find((entry) => entry.id === Number(productId)), [themedProducts, productId]);
  const relatedProducts = useMemo(() => themedProducts.filter((entry) => entry.id !== product?.id), [themedProducts, product?.id]);

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setSelectedImage(0);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [productId]);

  if (!product) {
    return <ProductDetailNotFound />;
  }

  return (
    <PageShell maxWidth="7xl" navbar={{ totalItems }}>
      <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
        <span aria-hidden="true">←</span>
        Back to home
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] ">
        <ProductGallery productName={product.name} images={product.images} selectedImage={selectedImage} onSelectImage={setSelectedImage} />

        <section className="space-y-5">
          <ProductDetailInfo product={product} addToCart={addToCart} />
        </section>
      </div>

      <RelatedProducts products={relatedProducts} addToCart={addToCart} />
    </PageShell>
  );
};

export default ProductDetailPage;

type ProductDetailPageProps = {
  cart: Cart;
  addToCart: (id: number) => void;
};
