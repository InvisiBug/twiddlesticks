import { Card } from "@/lib/components";
import { useMemo } from "react";
import { getThemedProducts } from "@/lib/helpers";
import { useParams } from "react-router-dom";
import { useContext } from "@/lib/context";

const ProductGallery: React.FC<ProductDetailGalleryProps> = ({ images, selectedImage, onSelectImage }) => {
  const { theme, products } = useContext();
  const { productId } = useParams();

  const themedProducts = useMemo(() => getThemedProducts(theme, products), [theme, products]);
  const product = useMemo(() => themedProducts.find((entry) => entry.id === Number(productId)), [themedProducts, productId]);
  const activeImage = images[selectedImage] ?? images[0];

  if (!product) {
    return null;
  }

  return (
    <section>
      <Card className="overflow-hidden rounded-2xl">
        <div className="relative flex h-50 lg:h-125 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 p-0 dark:bg-slate-800">
          <img src={activeImage} alt={`${product.name} view ${selectedImage + 1}`} className="h-full w-full cursor-zoom-in object-cover" data-lightbox-trigger="product-main" />
        </div>
      </Card>
      <div className="mt-4 grid grid-cols-4 gap-5">
        {images.map((image, index) => (
          <button
            key={`${product.name}-${index}`}
            onClick={() => onSelectImage(index)}
            className={`overflow-hidden rounded-xl border bg-white dark:bg-slate-900 ${selectedImage === index ? "border-slate-900 ring-2 ring-slate-300 dark:border-slate-100 dark:ring-slate-600" : "border-slate-200 dark:border-slate-700"}`}
          >
            <div className="flex h-10 lg:h-25 items-center justify-center overflow-hidden rounded-lg bg-slate-100 p-0 dark:bg-slate-800">
              <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ProductGallery;

type ProductDetailGalleryProps = {
  productName: string;
  images: string[];
  selectedImage: number;
  onSelectImage: (index: number) => void;
};
