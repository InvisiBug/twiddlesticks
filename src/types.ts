export type CoreOption = {
  label: string;
  image?: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  tag: string;
  images: string[];
  details: string[];
  availableColours?: string[];
  coreOptions?: CoreOption[];
};

export type Festival = {
  name: string;
  date: string;
  location: string;
  hours: string;
  note: string;
};

export type GalleryPhoto = {
  id: number;
  src: string;
  title: string;
  caption: string;
  stage: string;
};

export type Cart = Record<string, number>;

export type Theme = "light" | "dark";

export type LightboxImage = {
  src: string;
  alt: string;
};

export type CookieConsent = "accepted" | "essential";
