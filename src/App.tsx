import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CheckoutPage, GalleryPage, ProductDetailPage, HomePage } from "@/lib/pages";
import { CookieBanner, type CookieConsent } from "@/lib/components";
import { festivals, instagramOrderUrl, onlineOrdersEnabled } from "@/data/storefront";
import { CART_STORAGE_KEY, addItemToCart, getInitialCart, getTotalItems, removeItemFromCart } from "@/lib/cart";
import { ContextProvider } from "@/lib/context";
import { extractLightboxImageFromClick, getInitialCookieConsent, getStripePaymentLink, persistCookieConsent, type LightboxImage } from "@/lib/helpers";
import type { Cart } from "./types";
import AppConfig from "./AppConfig";

const stripePaymentLink = getStripePaymentLink(import.meta.env.VITE_STRIPE_PAYMENT_LINK);

function App() {
  const [cart, setCart] = useState<Cart>(getInitialCart);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(getInitialCookieConsent);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

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

  return (
    <ContextProvider value={{ onlineOrdersEnabled, instagramOrderUrl }}>
      <AppConfig>
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
              <Route path="/" element={<HomePage cart={cart} festivals={festivals} addToCart={(id) => setCart((prev) => addItemToCart(prev, id))} removeFromCart={(id) => setCart((prev) => removeItemFromCart(prev, id))} />} />
              <Route path="/checkout" element={<CheckoutPage cart={cart} stripePaymentLink={stripePaymentLink} />} />
              <Route path="/gallery" element={<GalleryPage totalItems={getTotalItems(cart)} />} />
              <Route path="/products/:productId" element={<ProductDetailPage cart={cart} addToCart={(id) => setCart((prev) => addItemToCart(prev, id))} />} />
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
      </AppConfig>
    </ContextProvider>
  );
}

export default App;
