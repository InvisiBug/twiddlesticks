import { useMemo } from "react";

export const useProductById = <T extends { id: number | string }>(products: T[], productId: string | undefined) => {
  return useMemo(() => products.find((entry) => entry.id === Number(productId)), [products, productId]);
};
