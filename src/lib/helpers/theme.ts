import type { Theme, Product, GalleryPhoto } from "@/types";

const THEME_STORAGE_KEY = "twiddlesticks-theme";

const themedImageMap = import.meta.glob("/src/lib/images/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const getToggledTheme = (theme: Theme): Theme => (theme === "light" ? "dark" : "light");

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

export const getThemedProducts = (theme: Theme, products: Product[]) => {
  // console.log("🚀 ~ getThemedProducts ~ theme:", theme);
  // console.log("🚀 ~ getThemedProducts ~ products:", products);

  return products.map((product) => ({
    ...product,
    images: getThemedImageList(product.images, theme),
  }));
};

export const getThemedImageList = (images: string[], theme: Theme) => {
  return images.map((image) => getThemedAsset(image, theme));
};

export const getThemedAsset = (asset: string, theme: Theme) => {
  console.log("🚀 ~ getThemedAsset ~ asset:", asset);
  if (!asset || theme !== "dark") {
    return asset;
  }

  const normalizedAsset = asset.replace(/\\/g, "/");
  const relativePath = normalizedAsset.replace(/^.*\/src\/lib\/images\//, "");
  console.log("🚀 ~ getThemedAsset ~ relativePath:", relativePath);

  const darkAssetPath = relativePath.replace(/^light\//, "dark/");
  console.log("🚀 ~ getThemedAsset ~ darkAssetPath:", darkAssetPath);

  const darkAsset = themedImageMap[`/src/lib/images/${darkAssetPath}`];
  console.log("🚀 ~ getThemedAsset ~ themedImageMap:", themedImageMap);
  console.log("🚀 ~ getThemedAsset ~ darkAsset:", darkAsset);

  return darkAsset ?? asset;
};

export const getThemedGalleryPhotos = (theme: Theme, photos: GalleryPhoto[]) => {
  return photos.map((photo) => ({
    ...photo,
    src: getThemedAsset(photo.src, theme),
  }));
};
