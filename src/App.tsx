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

  return (
    <div onClickCapture={handleGlobalImageClick}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage cart={cart} products={products} festivals={festivals} heroImages={heroImages} theme={theme} toggleTheme={toggleTheme} addToCart={addToCart} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} products={products} stripePaymentLink={stripePaymentLink} theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/gallery" element={<GalleryPage photos={galleryPhotos} totalItems={getTotalItems(cart)} theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/products/:productId" element={<ProductDetailPage cart={cart} products={products} addToCart={addToCart} theme={theme} toggleTheme={toggleTheme} />} />
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
