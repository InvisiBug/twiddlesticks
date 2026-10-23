import { useMemo } from "react";
import { FestivalSection, PageShell, ProductGrid, Hero, InstagramOrderBanner } from "@/lib/components";
import { getThemedImageList } from "@/lib/helpers";
import { useContext } from "@/lib/context";
import type { Festival } from "@/types";
import { heroImages } from "@/data/storefront";

export const HomePage = ({ festivals }: HomePageProps) => {
  const { onlineOrdersEnabled, theme } = useContext();

  const themedHeroImages = useMemo(() => getThemedImageList(heroImages, theme), [theme]);

  return (
    <PageShell maxWidth="7xl">
      {!onlineOrdersEnabled ? <InstagramOrderBanner /> : null}
      <Hero heroImages={themedHeroImages} />

      <div className="mt-8">
        <ProductGrid />
      </div>

      <FestivalSection festivals={festivals} />
    </PageShell>
  );
};

export default HomePage;

type HomePageProps = {
  festivals: Festival[];
};
