import { useMemo } from "react";
import { products } from "@/data/storefront";

export const useProductById = <T extends { id: number | string }>(products: T[], productId: string | undefined) => {
  return useMemo(() => products.find((entry) => entry.id === Number(productId)), [products, productId]);
};

export const useRelatedProducts = <T extends { id: number | string }>(products: T[], productId: string | undefined) => {
  return useMemo(() => products.filter((entry) => entry.id !== Number(productId)), [products, productId]);
};

export const getProductById = (productId: string | undefined) => {
  return products.find((entry) => entry.id === Number(productId));
};
