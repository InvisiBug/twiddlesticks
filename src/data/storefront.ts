import candlePlaceholder from '../components/ui/assets/placeholder-candle.svg'
import detailA from '../components/ui/assets/placeholder-detail-a.svg'
import detailB from '../components/ui/assets/placeholder-detail-b.svg'
import detailC from '../components/ui/assets/placeholder-detail-c.svg'
import heroPlaceholder from '../components/ui/assets/hero-market-placeholder.svg'
import mugPlaceholder from '../components/ui/assets/placeholder-mug.svg'
import totePlaceholder from '../components/ui/assets/placeholder-tote.svg'
import type { Festival, Product } from '../types'

export const products: Product[] = [
  {
    id: 1,
    name: 'Handmade Mug',
    price: 24,
    description: 'Ceramic mug, glazed and fired by hand.',
    longDescription:
      'A hand-thrown ceramic mug with a comfortable handle and satin glaze. Built for everyday coffee and tea rituals.',
    tag: 'Bestseller',
    image: mugPlaceholder,
    images: [mugPlaceholder, detailA, detailB],
    details: ['12 oz capacity', 'Microwave safe', 'Top-rack dishwasher safe'],
  },
  {
    id: 2,
    name: 'Canvas Tote',
    price: 18,
    description: 'Thick cotton tote for books, groceries, or everyday use.',
    longDescription:
      'Durable cotton canvas tote with reinforced seams and long handles. Folds flat for travel and market runs.',
    tag: 'New',
    image: totePlaceholder,
    images: [totePlaceholder, detailB, detailC],
    details: ['100% cotton canvas', 'Machine washable', 'Fits up to 15-inch laptop'],
  },
  {
    id: 3,
    name: 'Scented Candle',
    price: 16,
    description: 'Soy wax candle with a soft cedar and vanilla scent.',
    longDescription:
      'Small-batch soy wax candle poured in reusable glass. Soft throw designed for bedrooms, offices, and cozy corners.',
    tag: 'Limited',
    image: candlePlaceholder,
    images: [candlePlaceholder, detailC, detailA],
    details: ['40 hour burn time', 'Soy wax blend', 'Phthalate-free fragrance'],
  },
  {
    id: 4,
    name: 'Stoneware Bowl',
    price: 28,
    description: 'Wide handmade bowl for ramen, salads, and grain bowls.',
    longDescription:
      'Stoneware bowl with a broad rim and sturdy base. Perfect for hearty meals and easy plating.',
    tag: 'Popular',
    image: mugPlaceholder,
    images: [mugPlaceholder, detailB, detailA],
    details: ['Approx. 7.5 inch diameter', 'Oven safe up to 350 F', 'Food-safe glaze'],
  },
  {
    id: 5,
    name: 'Market Apron',
    price: 34,
    description: 'Heavy cotton apron with two deep front pockets.',
    longDescription:
      'Workhorse market apron cut from durable cotton with an adjustable neck strap and roomy pockets.',
    tag: 'Small Batch',
    image: totePlaceholder,
    images: [totePlaceholder, detailA, detailC],
    details: ['Adjustable neck strap', 'Double front pockets', 'One size fits most'],
  },
  {
    id: 6,
    name: 'Travel Tumbler',
    price: 22,
    description: 'Lidded tumbler designed for coffee and tea on the go.',
    longDescription:
      'Lightweight travel tumbler with secure lid and clean silhouette. Fits most cup holders.',
    tag: 'Restock',
    image: mugPlaceholder,
    images: [mugPlaceholder, detailC, detailB],
    details: ['14 oz capacity', 'BPA-free lid', 'Hand wash recommended'],
  },
  {
    id: 7,
    name: 'Gift Set Trio',
    price: 42,
    description: 'Curated bundle of candle, tote, and ceramic mini cup.',
    longDescription:
      'Gift-ready set featuring three customer favorites in one bundle, wrapped and ready for special occasions.',
    tag: 'Bundle',
    image: candlePlaceholder,
    images: [candlePlaceholder, detailA, detailB],
    details: ['Includes 3 items', 'Seasonal wrapping included', 'Best value bundle'],
  },
  {
    id: 8,
    name: 'Linen Table Runner',
    price: 26,
    description: 'Soft woven runner to style dining and coffee tables.',
    longDescription:
      'Textured linen runner that adds warmth and contrast to tablescapes while staying easy to clean.',
    tag: 'New',
    image: totePlaceholder,
    images: [totePlaceholder, detailB, detailC],
    details: ['72 inch length', 'Linen blend', 'Machine wash cold'],
  },
  {
    id: 9,
    name: 'Mini Candle Pair',
    price: 19,
    description: 'Two small candles in seasonal scents for gifting.',
    longDescription:
      'A pair of mini candles in rotating scents. Ideal for testing fragrances or gifting to friends.',
    tag: 'Giftable',
    image: candlePlaceholder,
    images: [candlePlaceholder, detailC, detailA],
    details: ['Set of 2', '20 hour burn each', 'Reusable tins'],
  },
]

export const festivals: Festival[] = [
  {
    name: 'Riverfront Makers Market',
    date: 'Nov 2, 2026',
    location: 'Portland Waterfront Park',
    hours: '10:00 AM - 4:00 PM',
    note: 'Great for local pickup and first-time product tryouts.',
  },
  {
    name: 'Autumn Craft Fair',
    date: 'Nov 16, 2026',
    location: 'Pearl District Event Hall',
    hours: '11:00 AM - 5:00 PM',
    note: 'Smell the candles, feel materials, and pick up your order in person.',
  },
  {
    name: 'Holiday Night Bazaar',
    date: 'Dec 6, 2026',
    location: 'SE Community Warehouse',
    hours: '5:00 PM - 9:00 PM',
    note: 'Limited edition items available first at this event.',
  },
]

export const heroImage = heroPlaceholder
