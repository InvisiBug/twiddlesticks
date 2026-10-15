import { useMemo } from "react";
import { CartPanel, FestivalSection, PageShell, ProductGrid, ShopHero, ShopNavbar } from "../ui";
import { getCartItems, getTotalItems, getTotalPrice } from "../../lib/cart";
import type { Cart, Festival, Product } from "../../types";

type ShopPageProps = {
  cart: Cart;
  products: Product[];
  festivals: Festival[];
  heroImages: string[];
  theme: "light" | "dark";
  toggleTheme: () => void;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
};

export function ShopPage({ cart, products, festivals, heroImages, theme, toggleTheme, addToCart, removeFromCart }: ShopPageProps) {
  const cartItems = useMemo(() => getCartItems(cart, products), [cart, products]);
  const totalItems = useMemo(() => getTotalItems(cart), [cart]);
  const totalPrice = useMemo(() => getTotalPrice(cart, products), [cart, products]);

  return (
    <PageShell maxWidth="7xl">
      <ShopNavbar totalItems={totalItems} theme={theme} onToggleTheme={toggleTheme} />
      <ShopHero heroImages={heroImages} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <ProductGrid products={products} addToCart={addToCart} />
        <CartPanel cart={cart} cartItems={cartItems} totalItems={totalItems} totalPrice={totalPrice} addToCart={addToCart} removeFromCart={removeFromCart} />
      </div>
      <FestivalSection festivals={festivals} />
    </PageShell>
  );
}
