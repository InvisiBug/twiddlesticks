import type { Festival, GalleryPhoto, Product } from "../types";

// Hero Images
import hero1 from "@/lib/images/light/hero/hero1.jpg";
import hero2 from "@/lib/images/light/hero/hero2.jpg";

// Clear LED
import clearLED1 from "@/lib/images/light/clearLED/led-1.jpg";
import clearLED2 from "@/lib/images/light/clearLED/led-2.jpg";
import clearLED3 from "@/lib/images/light/clearLED/led-3.jpg";
import clearLED4 from "@/lib/images/light/clearLED/led-4.jpg";

// Coloured LED
import blackCover from "@/lib/images/light/colouredLED/cover.jpg";
import black1 from "@/lib/images/light/colouredLED/1.jpg";

// Spiral
import spiralCover from "@/lib/images/light/spiral/cover.jpg";
import spiral1 from "@/lib/images/light/spiral/1.jpg";
import spiral2 from "@/lib/images/light/spiral/2.jpg";

// Circle
import circle from "@/lib/images/light/circle/cover.jpg";
import circle1 from "@/lib/images/light/circle/1.jpg";
import circle2 from "@/lib/images/light/circle/2.jpg";

// Triangle
import triangleCover from "@/lib/images/light/triangle/cover.jpg";
import triangle1 from "@/lib/images/light/triangle/1.jpg";
import triangle2 from "@/lib/images/light/triangle/2.jpg";

// Stand
import standCover from "@/lib/images/light/stand/cover.jpg";
import stand1 from "@/lib/images/light/stand/1.jpg";

// Variables
export const onlineOrdersEnabled = false;
export const instagramOrderUrl = "https://www.instagram.com/em.brrrr/";
export const maxRelatedProducts = 4;

// Site data
export const heroImages = [hero1, hero2];

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
    name: "Clear LED Twiddle",
    price: 50,
    description: "The dark mode twiddle",
    longDescription: "This twiddle lights up with LED lights, perfect for dark mode enthusiasts.",
    tag: "Expensive",
    images: [clearLED1, clearLED2, clearLED3, clearLED4],
    details: ["Battery operated", "LED lights", "Durable plastic body"],
    availableColours: ["Clear"],
  },
  {
    id: 2,
    name: "Black LED Twiddle",
    price: 50,
    description: "The dark mode twiddle",
    longDescription: "This version has a black body and a clear window to allow the light through",
    tag: "Super Cool",
    images: [blackCover, black1],
    availableColours: ["Black"],
    details: ["Battery operated", "LED lights", "Durable plastic body"],
  },
  {
    id: 3,
    name: "Spiral Twiddle",
    price: 30,
    description: "The original spiral twiddle",
    longDescription: "This twiddle spins slower and for longer than other variants due to the thinness of the core",
    tag: "My fave",
    images: [spiralCover, spiral1, spiral2],
    details: ["250mm long", "3mm core diameter", "50 grams"],
    availableColours: ["Green & Orange Blend, Red, Green & Purple Blend, Purple & Green Blend, Yellow Orange"],
  },
  {
    id: 4,
    name: "Circle Twiddle",
    price: 30,
    description: "The new circle twiddle",
    longDescription: "Slightly heavier than the spiral version, most people prefer this type.",
    tag: "Bestseller",
    images: [circle, circle1, circle2],
    details: ["250mm long", "3mm core diameter", "500 grams"],
    availableColours: ["Red", "Green & Purple Blend"],
  },
  {
    id: 5,
    name: "Triangle Twiddle",
    price: 30,
    description: "The triangle twiddle",
    longDescription: "Kinda sucks but I made one so here it is.",
    tag: "Kinda sucks",
    images: [triangleCover, triangle1, triangle2],
    details: ["Battery operated", "LED lights", "Durable plastic body"],
  },
  {
    id: 6,
    name: "Stand",
    price: 10,
    description: "The stand for twiddles",
    longDescription: "Do you have too many twiddles lying around? This stand helps keep them organized.",
    tag: "It's a stand",
    images: [standCover, stand1],
    details: ["Needs no batteries", "The ultimate in twiddle organisation"],
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
    src: spiralCover,
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
