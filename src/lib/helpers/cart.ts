import type { Cart, Product } from "@/types";

export const CART_STORAGE_KEY = "willow-market-cart";

export const getInitialCart = (): Cart => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) return {};

    const parsed = JSON.parse(saved) as Cart;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

export const getCartItems = (cart: Cart, products: Product[]): Product[] => products.filter((product) => (cart[product.id] ?? 0) > 0);

export const getTotalItems = (cart: Cart): number => Object.values(cart).reduce((sum, qty) => sum + qty, 0);

export const getTotalPrice = (cart: Cart, products: Product[]): number => getCartItems(cart, products).reduce((sum, item) => sum + item.price * (cart[item.id] ?? 0), 0);

export const addItemToCart = (cart: Cart, id: number): Cart => ({
  ...cart,
  [id]: (cart[id] ?? 0) + 1,
});

export const removeItemFromCart = (cart: Cart, id: number): Cart => {
  const nextCount = (cart[id] ?? 0) - 1;
  if (nextCount <= 0) {
    const next = { ...cart };
    delete next[id];
    return next;
  }

  return { ...cart, [id]: nextCount };
};
