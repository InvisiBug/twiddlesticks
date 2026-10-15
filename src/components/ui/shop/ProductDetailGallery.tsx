import { Card } from '../Card'

type ProductDetailGalleryProps = {
  productName: string
  images: string[]
  selectedImage: number
  onSelectImage: (index: number) => void
}

export function ProductDetailGallery({
  productName,
  images,
  selectedImage,
  onSelectImage,
}: ProductDetailGalleryProps) {
  const activeImage = images[selectedImage] ?? images[0]

  return (
    <section>
      <Card className="overflow-hidden">
        <img src={activeImage} alt={`${productName} view ${selectedImage + 1}`} className="h-95 w-full object-cover sm:h-125" />
      </Card>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={`${productName}-${index}`}
            onClick={() => onSelectImage(index)}
            className={`overflow-hidden rounded-xl border bg-white ${
              selectedImage === index ? 'border-slate-900 ring-2 ring-slate-300' : 'border-slate-200'
            }`}
          >
            <img src={image} alt={`${productName} thumbnail ${index + 1}`} className="h-24 w-full object-cover" />
          </button>
        ))}
      </div>
    </section>
  )
}
