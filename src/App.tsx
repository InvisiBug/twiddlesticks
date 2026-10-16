import { useEffect, useState, type MouseEvent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CheckoutPage, GalleryPage, ProductDetailPage, HomePage } from "./lib/pages";
import { CookieBanner, type CookieConsent } from "./lib/components";
import { festivals, galleryPhotos, heroImages, products } from "./data/storefront";
import { CART_STORAGE_KEY, addItemToCart, getInitialCart, getTotalItems, removeItemFromCart } from "./lib/cart";
import type { Cart } from "./types";

const defaultStripeLink = "";
const stripePaymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK ?? defaultStripeLink;
const THEME_STORAGE_KEY = "twiddlesticks-theme";
const COOKIE_CONSENT_STORAGE_KEY = "twiddlesticks-cookie-consent";
const themedImageMap = import.meta.glob("/src/lib/images/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

type Theme = "light" | "dark";

type LightboxImage = {
  src: string;
  alt: string;
};

const getInitialCookieConsent = (): CookieConsent | null => {
  const savedConsent = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  if (savedConsent === "accepted" || savedConsent === "essential") {
    return savedConsent;
  }

  return null;
};

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getThemedAsset = (asset: string, theme: Theme) => {
  if (!asset || theme !== "dark") {
    return asset;
  }

  const normalizedAsset = asset.replace(/\\/g, "/");
  const relativePath = normalizedAsset.replace(/^.*\/src\/lib\/images\//, "");
  const darkAssetPath = relativePath.replace(/^light\//, "dark/");
  const darkAsset = themedImageMap[`/src/lib/images/${darkAssetPath}`];

  return darkAsset ?? asset;
};

const getThemedImageList = (images: string[], theme: Theme) => images.map((image) => getThemedAsset(image, theme));

const getThemedProducts = (theme: Theme, products: typeof import("./data/storefront").products) =>
  products.map((product) => ({
    ...product,
    image: getThemedAsset(product.images[0] ?? "", theme),
    images: getThemedImageList(product.images, theme),
  }));

const getThemedGalleryPhotos = (theme: Theme, photos: typeof import("./data/storefront").galleryPhotos) =>
  photos.map((photo) => ({
    ...photo,
    src: getThemedAsset(photo.src, theme),
  }));

function App() {
  const [cart, setCart] = useState<Cart>(getInitialCart);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(getInitialCookieConsent);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (!lightboxImage) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxImage]);

  const addToCart = (id: number) => {
    setCart((prev) => addItemToCart(prev, id));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => removeItemFromCart(prev, id));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const handleCookieChoice = (choice: CookieConsent) => {
    setCookieConsent(choice);
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
  };

  const handleGlobalImageClick = (event: MouseEvent<HTMLDivElement>) => {
    const pathname = window.location.pathname;
    const isGalleryRoute = pathname.startsWith("/gallery");
    const isProductRoute = pathname.startsWith("/products/");

    if (!isGalleryRoute && !isProductRoute) {
      return;
    }

    const clickTarget = event.target as HTMLElement;

    if (clickTarget.closest('[data-lightbox-modal="true"]')) {
      return;
    }

    const imageElement = clickTarget.closest("img");
    if (!(imageElement instanceof HTMLImageElement)) {
      return;
    }

    if (isProductRoute && imageElement.dataset.lightboxTrigger !== "product-main") {
      return;
    }

    const src = imageElement.currentSrc || imageElement.src;
    if (!src) {
      return;
    }

    const linkAncestor = imageElement.closest("a");
    if (linkAncestor) {
      event.preventDefault();
      event.stopPropagation();
    }

    setLightboxImage({
      src,
      alt: imageElement.alt?.trim() || "Image preview",
    });
  };

  const themedProducts = getThemedProducts(theme, products);
  const themedHeroImages = getThemedImageList(heroImages, theme);
  const themedGalleryPhotos = getThemedGalleryPhotos(theme, galleryPhotos);

  return (
    <div onClickCapture={handleGlobalImageClick}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage cart={cart} products={themedProducts} festivals={festivals} heroImages={themedHeroImages} theme={theme} toggleTheme={toggleTheme} addToCart={addToCart} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} products={themedProducts} stripePaymentLink={stripePaymentLink} theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/gallery" element={<GalleryPage photos={themedGalleryPhotos} totalItems={getTotalItems(cart)} theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/products/:productId" element={<ProductDetailPage cart={cart} products={themedProducts} addToCart={addToCart} theme={theme} toggleTheme={toggleTheme} />} />
        </Routes>
      </BrowserRouter>

      {lightboxImage && (window.location.pathname.startsWith("/gallery") || window.location.pathname.startsWith("/products/")) ? (
        <div
          data-lightbox-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <button type="button" className="absolute right-4 top-4 rounded-full border border-slate-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-100 transition hover:border-white hover:text-white" onClick={closeLightbox}>
            Close
          </button>

          <img src={lightboxImage.src} alt={lightboxImage.alt} className="max-h-[90vh] w-auto max-w-full rounded-xl border border-slate-600 object-contain shadow-2xl" data-lightbox-modal="true" />
        </div>
      ) : null}

      {!cookieConsent ? <CookieBanner onChoose={handleCookieChoice} /> : null}
    </div>
  );
}

export default App;
