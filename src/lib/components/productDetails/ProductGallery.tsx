import { useParams } from "react-router-dom";
import { Card } from "@/lib/components";
import { useContext } from "@/lib/context";
import { useProductById } from "@/lib/helpers/product";

const ProductGallery: React.FC<ProductDetailGalleryProps> = ({ images, selectedImage, onSelectImage }) => {
  const { productId } = useParams();
  const { products } = useContext();

  const product = useProductById(products, productId);

  const activeImage = images[selectedImage] ?? images[0];

  if (!product) {
    return null;
  }

  return (
    <section className="px-10">
      <Card className="overflow-hidden rounded-2xl">
        <div className="relative flex lg:h-full items-center justify-center overflow-hidden rounded-2xl bg-slate-100 p-0 dark:bg-slate-800">
          <img src={activeImage} alt={`${product.name} view ${selectedImage + 1}`} className="h-full w-full cursor-zoom-in object-cover" data-lightbox-trigger="product-main" />
        </div>
      </Card>

      <div className="mt-5 flex    lg:max-h-30">
        {images.map((image, index) => (
          <div
            key={`${product.name}-${index}`}
            onClick={() => onSelectImage(index)}
            className={`overflow-hidden cursor-pointer mx-1 lg:mx-5 lg:max-w-30 rounded-xl  border bg-white dark:bg-slate-900 ${selectedImage === index ? "border-slate-900 ring-2 ring-slate-300 dark:border-slate-100 dark:ring-slate-600" : "border-slate-200 dark:border-slate-700"}`}
          >
            <div className="items-start justify-start rounded-lg bg-slate-100 dark:bg-slate-800 touch-auto">
              <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="object-fill" />
            </div>
          </div>
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
