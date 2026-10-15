import { useMemo } from "react";
import { CartPanel, FestivalSection, PageShell, ProductGrid, ShopHero, Navbar } from "../../components/ui";
import { getCartItems, getTotalItems, getTotalPrice } from "../cart";
import type { Cart, Festival, Product } from "../../types";

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

export function HomePage({ cart, products, festivals, heroImages, theme, toggleTheme, addToCart, removeFromCart }: HomePageProps) {
  const cartItems = useMemo(() => getCartItems(cart, products), [cart, products]);
  const totalItems = useMemo(() => getTotalItems(cart), [cart]);
  const totalPrice = useMemo(() => getTotalPrice(cart, products), [cart, products]);

  return (
    <PageShell maxWidth="7xl">
      <Navbar totalItems={totalItems} theme={theme} onToggleTheme={toggleTheme} />
      <ShopHero heroImages={heroImages} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <ProductGrid products={products} addToCart={addToCart} />
        <CartPanel cart={cart} cartItems={cartItems} totalItems={totalItems} totalPrice={totalPrice} addToCart={addToCart} removeFromCart={removeFromCart} />
      </div>
      <FestivalSection festivals={festivals} />
    </PageShell>
  );
}
