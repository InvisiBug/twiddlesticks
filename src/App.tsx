import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CheckoutPage, GalleryPage, ProductDetailPage, HomePage } from "./lib/pages";
import { CookieBanner, type CookieConsent } from "./lib/components";
import { festivals, galleryPhotos, heroImages, instagramOrderUrl, onlineOrdersEnabled, products } from "./data/storefront";
import { CART_STORAGE_KEY, addItemToCart, getInitialCart, getTotalItems, removeItemFromCart } from "./lib/cart";
import { ContextProvider } from "@/lib/context";
import {
  extractLightboxImageFromClick,
  getInitialCookieConsent,
  getInitialTheme,
  getStripePaymentLink,
  getThemedGalleryPhotos,
  getThemedImageList,
  getThemedProducts,
  getToggledTheme,
  persistCookieConsent,
  persistTheme,
  type LightboxImage,
  type Theme,
} from "@/lib/helpers";
import type { Cart } from "./types";

const stripePaymentLink = getStripePaymentLink(import.meta.env.VITE_STRIPE_PAYMENT_LINK);

function App() {
  const [cart, setCart] = useState<Cart>(getInitialCart);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(getInitialCookieConsent);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    persistTheme(theme);
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

  const themedProducts = useMemo(() => getThemedProducts(theme, products), [theme]);
  const themedHeroImages = useMemo(() => getThemedImageList(heroImages, theme), [theme]);
  const themedGalleryPhotos = useMemo(() => getThemedGalleryPhotos(theme, galleryPhotos), [theme]);

  return (
    <ContextProvider value={{ onlineOrdersEnabled, instagramOrderUrl }}>
      <div
        onClickCapture={(event) => {
          const lightboxCandidate = extractLightboxImageFromClick(event);
          if (lightboxCandidate) {
            setLightboxImage(lightboxCandidate);
          }
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  cart={cart}
                  products={themedProducts}
                  festivals={festivals}
                  heroImages={themedHeroImages}
                  theme={theme}
                  toggleTheme={() => setTheme((prev) => getToggledTheme(prev))}
                  addToCart={(id) => setCart((prev) => addItemToCart(prev, id))}
                  removeFromCart={(id) => setCart((prev) => removeItemFromCart(prev, id))}
                />
              }
            />
            <Route path="/checkout" element={<CheckoutPage cart={cart} products={themedProducts} stripePaymentLink={stripePaymentLink} theme={theme} toggleTheme={() => setTheme((prev) => getToggledTheme(prev))} />} />
            <Route path="/gallery" element={<GalleryPage photos={themedGalleryPhotos} totalItems={getTotalItems(cart)} theme={theme} toggleTheme={() => setTheme((prev) => getToggledTheme(prev))} />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailPage cart={cart} products={themedProducts} addToCart={(id) => setCart((prev) => addItemToCart(prev, id))} theme={theme} toggleTheme={() => setTheme((prev) => getToggledTheme(prev))} />}
            />
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
                setLightboxImage(null);
              }
            }}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full border border-slate-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-100 transition hover:border-white hover:text-white"
              onClick={() => setLightboxImage(null)}
            >
              Close
            </button>

            <img src={lightboxImage.src} alt={lightboxImage.alt} className="max-h-[90vh] w-auto max-w-full rounded-xl border border-slate-600 object-contain shadow-2xl" data-lightbox-modal="true" />
          </div>
        ) : null}

        {!cookieConsent ? (
          <CookieBanner
            onChoose={(choice: CookieConsent) => {
              setCookieConsent(choice);
              persistCookieConsent(choice);
            }}
          />
        ) : null}
      </div>
    </ContextProvider>
  );
}

export default App;
