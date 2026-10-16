import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageShell, ProductGallery, ProductDetailInfo, ProductDetailNotFound, ProductPager, RelatedProducts, Navbar } from "@/lib/components";
import { getTotalItems } from "@/lib/cart";
import type { Cart, Product } from "@/types";

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, cart, addToCart, theme, toggleTheme }) => {
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

  const relatedProducts = products.filter((entry) => entry.id !== product.id).slice(0, 3);

  // const currentIndex = products.findIndex((entry) => entry.id === product.id);
  // const previousProduct = currentIndex > 0 ? products[currentIndex - 1] : products[products.length - 1];
  // const nextProduct = currentIndex < products.length - 1 ? products[currentIndex + 1] : products[0];

  return (
    <PageShell maxWidth="7xl">
      <Navbar totalItems={totalItems} theme={theme} onToggleTheme={toggleTheme} />

      <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
        <span aria-hidden="true">←</span>
        Back to home
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] ">
        <ProductGallery productName={product.name} images={product.images} selectedImage={selectedImage} onSelectImage={setSelectedImage} />

        <section className="space-y-5">
          <ProductDetailInfo product={product} addToCart={addToCart} />
          {/* <ProductPager previousProduct={previousProduct} nextProduct={nextProduct} /> */}
        </section>
      </div>

      <RelatedProducts products={relatedProducts} addToCart={addToCart} />
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
