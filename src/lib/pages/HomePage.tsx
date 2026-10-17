import { useMemo } from "react";
import { CartPanel, FestivalSection, PageShell, ProductGrid, Hero, InstagramOrderBanner } from "@/lib/components";
import { getCartItems, getTotalItems, getTotalPrice } from "@/lib/cart";
import { useStorefront } from "@/lib/context";
import type { Cart, Festival, Product } from "@/types";

export function HomePage({ cart, products, festivals, heroImages, theme, toggleTheme, addToCart, removeFromCart }: HomePageProps) {
  const { onlineOrdersEnabled } = useStorefront();

  const cartItems = useMemo(() => getCartItems(cart, products), [cart, products]);
  const totalItems = useMemo(() => getTotalItems(cart), [cart]);
  const totalPrice = useMemo(() => getTotalPrice(cart, products), [cart, products]);

  return (
    <PageShell maxWidth="7xl" navbar={{ totalItems, theme, onToggleTheme: toggleTheme }}>
      {!onlineOrdersEnabled ? <InstagramOrderBanner /> : null}
      <Hero heroImages={heroImages} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <ProductGrid products={products} addToCart={addToCart} />
        <CartPanel cart={cart} cartItems={cartItems} totalItems={totalItems} totalPrice={totalPrice} addToCart={addToCart} removeFromCart={removeFromCart} />
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
};
