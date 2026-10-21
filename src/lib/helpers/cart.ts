import type { Cart, Product } from "@/types";

export const CART_STORAGE_KEY = "willow-market-cart";
export const DEFAULT_CORE_OPTION = "Standard core";

export type CartItem = {
  key: string;
  productId: number;
  selectedCore: string;
  quantity: number;
  product: Product;
};

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

export const getCartItemKey = (id: number, selectedCore: string = DEFAULT_CORE_OPTION): string => {
  return `${id}::${selectedCore}`;
};

const parseCartItemKey = (key: string): { productId: number; selectedCore: string } | null => {
  const separatorIndex = key.indexOf("::");

  if (separatorIndex === -1) {
    const legacyProductId = Number(key);
    if (!Number.isFinite(legacyProductId)) {
      return null;
    }

    return { productId: legacyProductId, selectedCore: DEFAULT_CORE_OPTION };
  }

  const productId = Number(key.slice(0, separatorIndex));
  if (!Number.isFinite(productId)) {
    return null;
  }

  return {
    productId,
    selectedCore: key.slice(separatorIndex + 2) || DEFAULT_CORE_OPTION,
  };
};

export const getDefaultCoreOption = (product: Product): string => {
  return product.coreOptions?.[0]?.label ?? DEFAULT_CORE_OPTION;
};

export const getCartItems = (cart: Cart, products: Product[]): CartItem[] => {
  const productsById = new Map(products.map((product) => [product.id, product]));

  return Object.entries(cart)
    .map(([key, quantity]) => {
      if (quantity <= 0) {
        return null;
      }

      const parsed = parseCartItemKey(key);
      if (!parsed) {
        return null;
      }

      const product = productsById.get(parsed.productId);
      if (!product) {
        return null;
      }

      return {
        key,
        productId: parsed.productId,
        selectedCore: parsed.selectedCore,
        quantity,
        product,
      } satisfies CartItem;
    })
    .filter((entry): entry is CartItem => entry !== null);
};

export const getTotalItems = (cart: Cart): number => {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
};

export const getTotalPrice = (cart: Cart, products: Product[]): number => {
  return getCartItems(cart, products).reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

export const addItemToCart = (cart: Cart, id: number, selectedCore: string = DEFAULT_CORE_OPTION): Cart => {
  const key = getCartItemKey(id, selectedCore);

  return {
    ...cart,
    [key]: (cart[key] ?? 0) + 1,
  };
};

export const removeItemFromCart = (cart: Cart, id: number, selectedCore: string = DEFAULT_CORE_OPTION): Cart => {
  const key = getCartItemKey(id, selectedCore);
  const nextCount = (cart[key] ?? 0) - 1;
  if (nextCount <= 0) {
    const next = { ...cart };
    delete next[key];
    return next;
  }

  return { ...cart, [key]: nextCount };
};
