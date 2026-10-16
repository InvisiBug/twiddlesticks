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
        {onlineOrdersEnabled ? <CartPanel cart={cart} cartItems={cartItems} totalItems={totalItems} totalPrice={totalPrice} addToCart={addToCart} removeFromCart={removeFromCart} /> : <CartPanelComingSoon />}
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

const CartPanelComingSoon = () => (
  <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/85 dark:shadow-black/20 lg:sticky lg:top-6">
    <h2 className="text-xl font-semibold tracking-tight">Online Orders</h2>
    <p className="mt-3 rounded-xl border border-dashed border-slate-300 px-4 py-5 text-sm text-slate-600 dark:border-slate-600 dark:text-slate-300">Online orders coming soon.</p>
  </aside>
);
