import { useMemo } from "react";
import { CartPanel, FestivalSection, PageShell, ProductGrid, Hero, InstagramOrderBanner } from "@/lib/components";
import { getCartItems, getTotalItems, getTotalPrice } from "@/lib/helpers";
import { products } from "@/data/storefront";
import { useContext } from "@/lib/context";
import type { Cart, Festival } from "@/types";
import { getThemedProducts } from "@/lib/helpers";
import { getThemedImageList } from "@/lib/helpers";
import { heroImages } from "@/data/storefront";

export function HomePage({ cart, festivals, addToCart, removeFromCart }: HomePageProps) {
  const { onlineOrdersEnabled, theme } = useContext();
  const themedHeroImages = useMemo(() => getThemedImageList(heroImages, theme), [theme]);

  const themedProducts = useMemo(() => getThemedProducts(theme, products), [theme]);

  const cartItems = useMemo(() => getCartItems(cart, themedProducts), [cart, themedProducts]);
  const totalItems = useMemo(() => getTotalItems(cart), [cart]);
  const totalPrice = useMemo(() => getTotalPrice(cart, themedProducts), [cart, themedProducts]);

  return (
    <PageShell maxWidth="7xl" navbar={{ totalItems }}>
      {!onlineOrdersEnabled ? <InstagramOrderBanner /> : null}
      <Hero heroImages={themedHeroImages} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <ProductGrid products={themedProducts} addToCart={addToCart} />
        <CartPanel cart={cart} cartItems={cartItems} totalItems={totalItems} totalPrice={totalPrice} addToCart={addToCart} removeFromCart={removeFromCart} />
      </div>
      <FestivalSection festivals={festivals} />
    </PageShell>
  );
}

type HomePageProps = {
  cart: Cart;
  festivals: Festival[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
};
