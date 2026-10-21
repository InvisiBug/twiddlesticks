import type { MouseEvent } from "react";
import type { LightboxImage } from "@/types";

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
