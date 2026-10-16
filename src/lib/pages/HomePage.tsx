import { useMemo } from "react";
import { CartPanel, FestivalSection, PageShell, ProductGrid, Hero } from "@/lib/components";
import { getCartItems, getTotalItems, getTotalPrice } from "@/lib/cart";
import type { Cart, Festival, Product } from "@/types";

export function HomePage({ cart, products, festivals, heroImages, theme, toggleTheme, addToCart, removeFromCart, onlineOrdersEnabled }: HomePageProps) {
  const cartItems = useMemo(() => getCartItems(cart, products), [cart, products]);
  const totalItems = useMemo(() => getTotalItems(cart), [cart]);
  const totalPrice = useMemo(() => getTotalPrice(cart, products), [cart, products]);

  return (
    <PageShell maxWidth="7xl" navbar={{ totalItems, theme, onToggleTheme: toggleTheme, onlineOrdersEnabled }}>
      <Hero heroImages={heroImages} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <ProductGrid products={products} addToCart={addToCart} onlineOrdersEnabled={onlineOrdersEnabled} />
        <CartPanel cart={cart} onlineOrdersEnabled={onlineOrdersEnabled} cartItems={cartItems} totalItems={totalItems} totalPrice={totalPrice} addToCart={addToCart} removeFromCart={removeFromCart} />
      </div>
      <FestivalSection festivals={festivals} />
    </PageShell>
  );
}

type HomePageProps = {
  cart: Cart;
  products: Product[];
  festivals: Festival[];
  heroImages: string[];
  theme: "light" | "dark";
  toggleTheme: () => void;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  onlineOrdersEnabled: boolean;
};
