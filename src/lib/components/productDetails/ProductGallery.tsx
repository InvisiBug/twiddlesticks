import { Card } from "../baseComponents/Card";

export const ProductGallery: React.FC<ProductDetailGalleryProps> = ({ productName, images, selectedImage, onSelectImage }) => {
  const activeImage = images[selectedImage] ?? images[0];

  return (
    <section>
      <Card className="overflow-hidden">
        <div className="relative flex h-95 items-center justify-center bg-slate-100 p-3 dark:bg-slate-800 sm:h-125">
          <img src={activeImage} alt={`${productName} view ${selectedImage + 1}`} className="h-full w-full cursor-zoom-in object-contain" data-lightbox-trigger="product-main" />
        </div>
      </Card>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={`${productName}-${index}`}
            onClick={() => onSelectImage(index)}
            className={`overflow-hidden rounded-xl border bg-white dark:bg-slate-900 ${selectedImage === index ? "border-slate-900 ring-2 ring-slate-300 dark:border-slate-100 dark:ring-slate-600" : "border-slate-200 dark:border-slate-700"}`}
          >
            <div className="flex h-24 items-center justify-center bg-slate-100 p-1 dark:bg-slate-800">
              <img src={image} alt={`${productName} thumbnail ${index + 1}`} className="h-full w-full object-contain" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

type ProductDetailGalleryProps = {
  productName: string;
  images: string[];
  selectedImage: number;
  onSelectImage: (index: number) => void;
};
