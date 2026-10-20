import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageShell, ProductGallery, ProductDetailInfo, ProductDetailNotFound, RelatedProducts } from "@/lib/components";
import { useContext } from "@/lib/context";
import { getThemedProducts } from "@/lib/helpers";

const ProductDetailPage: React.FC = () => {
  const { theme, products } = useContext();
  const { productId } = useParams();

  const themedProducts = useMemo(() => getThemedProducts(theme, products), [theme, products]);
  const product = useMemo(() => themedProducts.find((entry) => entry.id === Number(productId)), [themedProducts, productId]);

  const relatedProducts = useMemo(() => themedProducts.filter((entry) => entry.id !== Number(productId)), [themedProducts, productId]);

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setSelectedImage(0);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [productId]);

  if (!product) {
    return <ProductDetailNotFound />;
  }

  return (
    <PageShell maxWidth="7xl">
      <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
        <span aria-hidden="true">←</span>
        Back to home
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] ">
        <ProductGallery productName={product.name} images={product.images} selectedImage={selectedImage} onSelectImage={setSelectedImage} />

        <section className="space-y-5">
          <ProductDetailInfo />
        </section>
      </div>

      <RelatedProducts products={relatedProducts} />
    </PageShell>
  );
};

export default ProductDetailPage;
