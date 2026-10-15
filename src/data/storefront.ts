import type { Festival, GalleryPhoto, Product } from "../types";

// Hero Images
import proBlack from "@/lib/assets/hero/pro-black.jpg";
import proWhite from "@/lib/assets/hero/pro-white.jpg";
import hero1 from "@/lib/assets/hero/hero1.jpg";
import hero2 from "@/lib/assets/hero/hero2.jpg";
import hero3 from "@/lib/assets/hero/hero3.jpg";

// Spiral
import spiral from "@/lib/assets/spiral/spiral.jpg";
import spiral1 from "@/lib/assets/spiral/spiral1.jpg";

// Circle
import circle from "@/lib/assets/circle/circle.jpg";

// LED
import led1 from "@/lib/assets/led/led-1.jpg";
import led2 from "@/lib/assets/led/led-2.jpg";
import led3 from "@/lib/assets/led/led-3.jpg";
import led4 from "@/lib/assets/led/led-4.jpg";

//triangle
import triangle1 from "@/lib/assets/triangle/triangle-1.jpg";
import triangle2 from "@/lib/assets/triangle/triangle-2.jpg";

export const heroImages = [proBlack, proWhite, hero1, hero2, hero3];

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
  {
    id: 4,
    name: "Triangle",
    price: 30,
    description: "The triangle twiddle",
    longDescription: "Kinda sucks but I made one so here it is.",
    tag: "Kinda sucks",
    images: [triangle1, triangle2],
    image: triangle1,
    details: ["Battery operated", "LED lights", "Durable plastic body"],
  },
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    src: hero1,
    title: "Material Prep",
    caption: "Sorting cords and shell pieces before cutting and balancing each twiddle.",
    stage: "Prep",
  },
  {
    id: 2,
    src: hero2,
    title: "First Assembly",
    caption: "Early assembly pass while testing rotation feel and thumb grip comfort.",
    stage: "Assembly",
  },
  {
    id: 3,
    src: spiral,
    title: "Spiral Tuning",
    caption: "Checking the balance and spin of the first spiral prototype before polishing.",
    stage: "Tuning",
  },
  {
    id: 4,
    src: circle,
    title: "Circle Build",
    caption: "Final adjustments on the round body to keep the motion smooth and consistent.",
    stage: "Finishing",
  },
];
