import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageShell, ProductDetailGallery, ProductDetailInfo, ProductDetailNotFound, ProductPager, RelatedProductsSection, Navbar } from "../../components/ui";
import { getTotalItems } from "../cart";
import type { Cart, Product } from "../../types";

type ProductDetailPageProps = {
  products: Product[];
  cart: Cart;
  addToCart: (id: number) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export function ProductDetailPage({ products, cart, addToCart, theme, toggleTheme }: ProductDetailPageProps) {
  const { productId } = useParams();
  const totalItems = useMemo(() => getTotalItems(cart), [cart]);

  const product = useMemo(() => products.find((entry) => entry.id === Number(productId)), [products, productId]);

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setSelectedImage(0);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [productId]);

  if (!product) {
    return <ProductDetailNotFound />;
  }

  const gallery = product.images.length ? product.images : [product.image];
  const currentIndex = products.findIndex((entry) => entry.id === product.id);
  const previousProduct = currentIndex > 0 ? products[currentIndex - 1] : products[products.length - 1];
  const nextProduct = currentIndex < products.length - 1 ? products[currentIndex + 1] : products[0];
  const relatedProducts = products.filter((entry) => entry.id !== product.id).slice(0, 3);

  return (
    <PageShell maxWidth="7xl">
      <Navbar totalItems={totalItems} theme={theme} onToggleTheme={toggleTheme} />

      <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
        <span aria-hidden="true">←</span>
        Back to home
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <ProductDetailGallery productName={product.name} images={gallery} selectedImage={selectedImage} onSelectImage={setSelectedImage} />

        <section className="space-y-5">
          <ProductDetailInfo product={product} addToCart={addToCart} />
          <ProductPager previousProduct={previousProduct} nextProduct={nextProduct} />
        </section>
      </div>

      <RelatedProductsSection products={relatedProducts} addToCart={addToCart} />
    </PageShell>
  );
}
