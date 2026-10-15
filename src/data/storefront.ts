import galleryPhotoSeeds from "./gallery-photos.json";

import type { Festival, GalleryPhoto, Product } from "../types";
import hero1 from "../components/ui/assets/hero/hero1.jpg";
import hero2 from "../components/ui/assets/hero/hero2.jpg";
import hero3 from "../components/ui/assets/hero/hero3.jpg";

// Hero Images
import proBlack from "../components/ui/assets/pro-black.jpg";

// Spiral
import spiral from "../components/ui/assets/spiral.jpg";
import spiral1 from "../components/ui/assets/spiral1.jpg";

// Circle
import circle from "../components/ui/assets/circle.jpg";

// LED
import led1 from "../components/ui/assets/led/led-1.jpg";
import led2 from "../components/ui/assets/led/led-2.jpg";
import led3 from "../components/ui/assets/led/led-3.jpg";
import led4 from "../components/ui/assets/led/led-4.jpg";

export const heroImages = [proBlack, hero1, hero2, hero3];

type GalleryPhotoSeed = {
  id: number;
  imageKey: string;
  title: string;
  caption: string;
  stage: string;
};

const galleryPhotoImageMap: Record<string, string> = {
  hero1,
  hero2,
  spiral,
  spiral1,
  circle,
  proBlack,
};

export const galleryPhotos: GalleryPhoto[] = (galleryPhotoSeeds as GalleryPhotoSeed[]).map((photo) => {
  const src = galleryPhotoImageMap[photo.imageKey];

  if (!src) {
    throw new Error(`Unknown gallery image key: ${photo.imageKey}`);
  }

  return {
    id: photo.id,
    src,
    title: photo.title,
    caption: photo.caption,
    stage: photo.stage,
  };
});

export const festivals: Festival[] = [
  {
    name: "Leeds Luggling Convention",
    date: "Nov 2, 2026",
    location: "Leeds",
    hours: "10:00 AM - 4:00 PM",
    note: "Come try prototypes in person and collect pre-ordered pieces.",
  },
  {
    name: "BJC",
    date: "Apr 16, 2026",
    location: "South of london somewhere",
    hours: "its like 5 days",
    note: "Featuring flowception crew LED space",
  },
  {
    name: "Slack fest",
    date: "Summer 2027",
    location: "Manchester",
    hours: "4 Days",
    note: "My first and ongoing favourite circus festival. The Flowception dome will also be there",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Spiral Twiddle",
    price: 30,
    description: "The original spiral twiddle",
    longDescription: "This twiddle spins slower and for longer than other variants due to the thinness of the core",
    tag: "My fave",
    images: [spiral, spiral1],
    image: spiral,
    details: ["250mm long", "3mm core diameter", "50 grams"],
  },
  {
    id: 2,
    name: "Circle Twiddle",
    price: 30,
    description: "The new circle twiddle",
    longDescription: "Slightly heavier than the spiral version, most people prefer this type.",
    tag: "Bestseller",
    images: [circle],
    image: circle,
    details: ["250mm long", "3mm core diameter", "500 grams"],
  },
  {
    id: 3,
    name: "LED Twiddle",
    price: 50,
    description: "The dark mode twiddle",
    longDescription: "This twiddle lights up with LED lights, perfect for dark mode enthusiasts.",
    tag: "Expensive",
    images: [led1, led2, led3, led4],
    image: led1,
    details: ["Battery operated", "LED lights", "Durable plastic body"],
  },
];
