import { useMemo } from "react";
import { CartPanel, FestivalSection, PageShell, ProductGrid, Hero, InstagramOrderBanner } from "@/lib/components";
import { getTotalItems, getTotalPrice, getThemedImageList, getThemedProducts } from "@/lib/helpers";
import { useContext } from "@/lib/context";
import type { Festival } from "@/types";
import { heroImages } from "@/data/storefront";

export const HomePage = ({ festivals }: HomePageProps) => {
  const { onlineOrdersEnabled, theme, cart, products } = useContext();

  const themedHeroImages = useMemo(() => getThemedImageList(heroImages, theme), [theme]);
  const themedProducts = useMemo(() => getThemedProducts(theme, products), [theme, products]);

  const totalPrice = useMemo(() => getTotalPrice(cart, themedProducts), [cart, themedProducts]);

  return (
    <PageShell maxWidth="7xl">
      {!onlineOrdersEnabled ? <InstagramOrderBanner /> : null}
      <Hero heroImages={themedHeroImages} />

      <FestivalSection festivals={festivals} />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <ProductGrid products={themedProducts} />
        <CartPanel totalItems={getTotalItems(cart)} totalPrice={totalPrice} />
      </div>
    </PageShell>
  );
};

export default HomePage;

type HomePageProps = {
  festivals: Festival[];
};
