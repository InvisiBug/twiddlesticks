import type { MouseEvent } from "react";
import type { CookieConsent } from "@/lib/components";
import type { GalleryPhoto, Product } from "@/types";

const DEFAULT_STRIPE_LINK = "";
const THEME_STORAGE_KEY = "twiddlesticks-theme";
const COOKIE_CONSENT_STORAGE_KEY = "twiddlesticks-cookie-consent";

const themedImageMap = import.meta.glob("/src/lib/images/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export type Theme = "light" | "dark";

export type LightboxImage = {
  src: string;
  alt: string;
};

export const getStripePaymentLink = (envValue?: string) => envValue ?? DEFAULT_STRIPE_LINK;

export const getInitialCookieConsent = (): CookieConsent | null => {
  const savedConsent = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  if (savedConsent === "accepted" || savedConsent === "essential") {
    return savedConsent;
  }

  return null;
};

export const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const persistTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export const persistCookieConsent = (choice: CookieConsent) => {
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
};

export const getToggledTheme = (theme: Theme): Theme => (theme === "light" ? "dark" : "light");

export const getThemedAsset = (asset: string, theme: Theme) => {
  if (!asset || theme !== "dark") {
    return asset;
  }

  const normalizedAsset = asset.replace(/\\/g, "/");
  const relativePath = normalizedAsset.replace(/^.*\/src\/lib\/images\//, "");
  const darkAssetPath = relativePath.replace(/^light\//, "dark/");
  const darkAsset = themedImageMap[`/src/lib/images/${darkAssetPath}`];

  return darkAsset ?? asset;
};

export const getThemedImageList = (images: string[], theme: Theme) => images.map((image) => getThemedAsset(image, theme));

export const getThemedProducts = (theme: Theme, products: Product[]) =>
  products.map((product) => ({
    ...product,
    images: getThemedImageList(product.images, theme),
  }));

export const getThemedGalleryPhotos = (theme: Theme, photos: GalleryPhoto[]) =>
  photos.map((photo) => ({
    ...photo,
    src: getThemedAsset(photo.src, theme),
  }));

export const extractLightboxImageFromClick = (event: MouseEvent<HTMLDivElement>): LightboxImage | null => {
  const pathname = window.location.pathname;
  const isGalleryRoute = pathname.startsWith("/gallery");
  const isProductRoute = pathname.startsWith("/products/");

  if (!isGalleryRoute && !isProductRoute) {
    return null;
  }

  const clickTarget = event.target as HTMLElement;

  if (clickTarget.closest('[data-lightbox-modal="true"]')) {
    return null;
  }

  const imageElement = clickTarget.closest("img");
  if (!(imageElement instanceof HTMLImageElement)) {
    return null;
  }

  if (isProductRoute && imageElement.dataset.lightboxTrigger !== "product-main") {
    return null;
  }

  const src = imageElement.currentSrc || imageElement.src;
  if (!src) {
    return null;
  }

  const linkAncestor = imageElement.closest("a");
  if (linkAncestor) {
    event.preventDefault();
    event.stopPropagation();
  }

  return {
    src,
    alt: imageElement.alt?.trim() || "Image preview",
  };
};
