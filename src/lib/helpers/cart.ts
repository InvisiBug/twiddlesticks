import type { Cart, Product, CartProduct } from "@/types";
import { getProductById } from "./product";

export const CART_STORAGE_KEY = "willow-market-cart";
export const DEFAULT_CORE_OPTION = "Standard core";
export const DEFAULT_COLOUR_OPTION = "Default colour";

export type CartItem = {
  key: string;
  productId: number;
  selectedCore: string;
  selectedColour: string;
  quantity: number;
  product: Product;
};

const normalizeCartBreakdown = (items: Array<{ name: string; total: number }>, fallback: string): Array<{ name: string; total: number }> => {
  const totals = new Map<string, number>();

  items.forEach((item) => {
    const normalizedName = item.name || fallback;
    if (item.total <= 0) {
      return;
    }

    totals.set(normalizedName, (totals.get(normalizedName) ?? 0) + item.total);
  });

  return Array.from(totals.entries()).map(([name, total]) => ({ name, total }));
};

const normalizeProductEntry = (entry: { id: number; name: string; cores: Array<{ name: string; total: number }>; colours: Array<{ name: string; total: number }> }): CartProduct | null => {
  const normalizedCores = normalizeCartBreakdown(entry.cores, DEFAULT_CORE_OPTION);
  const normalizedColours = normalizeCartBreakdown(entry.colours, DEFAULT_COLOUR_OPTION);

  if (!normalizedCores.length || !normalizedColours.length) {
    return null;
  }

  const coreTotal = normalizedCores.reduce((sum, core) => sum + core.total, 0);
  const colourTotal = normalizedColours.reduce((sum, colour) => sum + colour.total, 0);
  const total = Math.min(coreTotal, colourTotal);

  if (total <= 0) {
    return null;
  }

  return {
    id: entry.id,
    name: entry.name,
    total,
    cores: normalizedCores,
    colours: normalizedColours,
  };
};

export const getInitialCart = (): Cart => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved) as unknown;

    if (Array.isArray(parsed)) {
      return parsed
        .map((entry) => {
          const maybeEntry = entry as Partial<CartProduct>;

          if (typeof maybeEntry?.id !== "number") {
            return null;
          }

          const cores = Array.isArray(maybeEntry.cores)
            ? maybeEntry.cores
                .map((core) => {
                  const maybeCore = core as { name?: unknown; total?: unknown; colour?: unknown };
                  if (typeof maybeCore?.name !== "string") {
                    return null;
                  }

                  const total = typeof maybeCore.total === "number" ? maybeCore.total : 0;
                  if (total <= 0) {
                    return null;
                  }

                  return {
                    name: maybeCore.name,
                    total,
                  };
                })
                .filter((core): core is { name: string; total: number } => core !== null)
            : [];

          const colours = Array.isArray((maybeEntry as { colours?: unknown }).colours)
            ? ((maybeEntry as { colours?: unknown }).colours as unknown[])
                .map((colour) => {
                  const maybeColour = colour as { name?: unknown; total?: unknown };
                  if (typeof maybeColour?.name !== "string") {
                    return null;
                  }

                  const total = typeof maybeColour.total === "number" ? maybeColour.total : 0;
                  if (total <= 0) {
                    return null;
                  }

                  return {
                    name: maybeColour.name,
                    total,
                  };
                })
                .filter((colour): colour is { name: string; total: number } => colour !== null)
            : [];

          // Legacy migration: when colour lived in core entries, derive colour totals from core.colour if colours array is missing.
          const legacyColoursFromCores = Array.isArray(maybeEntry.cores)
            ? maybeEntry.cores
                .map((core) => {
                  const maybeCore = core as { colour?: unknown; total?: unknown };
                  if (typeof maybeCore?.colour !== "string") {
                    return null;
                  }

                  const total = typeof maybeCore.total === "number" ? maybeCore.total : 0;
                  if (total <= 0) {
                    return null;
                  }

                  return {
                    name: maybeCore.colour,
                    total,
                  };
                })
                .filter((colour): colour is { name: string; total: number } => colour !== null)
            : [];

          const normalizedColours = colours.length > 0 ? colours : legacyColoursFromCores;

          return normalizeProductEntry({
            id: maybeEntry.id,
            name: typeof maybeEntry.name === "string" && maybeEntry.name ? maybeEntry.name : (getProductById(String(maybeEntry.id))?.name ?? ""),
            cores,
            colours: normalizedColours,
          });
        })
        .filter((entry): entry is CartProduct => entry !== null);
    }

    // Migrate legacy cart shape: Record<string, number> where key was either "id" or "id::core"
    if (parsed && typeof parsed === "object") {
      const legacyEntries = Object.entries(parsed as Record<string, number>);
      const grouped = new Map<number, { id: number; name: string; cores: Array<{ name: string; total: number }>; colours: Array<{ name: string; total: number }> }>();

      legacyEntries.forEach(([legacyKey, quantity]) => {
        if (typeof quantity !== "number" || quantity <= 0) {
          return;
        }

        const separatorIndex = legacyKey.indexOf("::");
        const productId = Number(separatorIndex === -1 ? legacyKey : legacyKey.slice(0, separatorIndex));
        if (!Number.isFinite(productId)) {
          return;
        }

        const suffix = separatorIndex === -1 ? "" : legacyKey.slice(separatorIndex + 2);
        const [selectedCoreRaw, selectedColourRaw] = suffix.split("::");
        const selectedCore = separatorIndex === -1 ? DEFAULT_CORE_OPTION : selectedCoreRaw || DEFAULT_CORE_OPTION;
        const selectedColour = selectedColourRaw || DEFAULT_COLOUR_OPTION;
        const existingProduct = grouped.get(productId);

        if (!existingProduct) {
          grouped.set(productId, {
            id: productId,
            name: getProductById(String(productId))?.name ?? "",
            cores: [{ name: selectedCore, total: quantity }],
            colours: [{ name: selectedColour, total: quantity }],
          });
          return;
        }

        const coreIndex = existingProduct.cores.findIndex((core) => core.name === selectedCore);
        const colourIndex = existingProduct.colours.findIndex((colour) => colour.name === selectedColour);

        if (coreIndex === -1) {
          existingProduct.cores.push({ name: selectedCore, total: quantity });
        } else {
          existingProduct.cores[coreIndex].total += quantity;
        }

        if (colourIndex === -1) {
          existingProduct.colours.push({ name: selectedColour, total: quantity });
        } else {
          existingProduct.colours[colourIndex].total += quantity;
        }
      });

      return Array.from(grouped.values())
        .map((entry) => normalizeProductEntry(entry))
        .filter((entry): entry is CartProduct => entry !== null);
    }

    return [];
  } catch {
    return [];
  }
};

export const getCartItemKey = (id: number, selectedCore: string = DEFAULT_CORE_OPTION, selectedColour: string = DEFAULT_COLOUR_OPTION): string => {
  return `${id}::${selectedCore}::${selectedColour}`;
};

export const getDefaultCoreOption = (product: Product): string => {
  return product.coreOptions?.[0]?.label ?? DEFAULT_CORE_OPTION;
};

export const getDefaultColourOption = (product: Product): string => {
  if (!product.availableColours?.length) {
    return DEFAULT_COLOUR_OPTION;
  }

  const firstColour = product.availableColours
    .flatMap((colour) => colour.split(","))
    .map((colour) => colour.trim())
    .find(Boolean);

  return firstColour ?? DEFAULT_COLOUR_OPTION;
};

export const getCartItems = (cart: Cart, products: Product[]): CartItem[] => {
  const productsById = new Map(products.map((product) => [product.id, product]));

  return cart.flatMap((cartProduct) => {
    const product = productsById.get(cartProduct.id);
    if (!product) {
      return [];
    }

    const corePool = cartProduct.cores.filter((core) => core.total > 0).map((core) => ({ ...core }));
    const colourPool = cartProduct.colours.filter((colour) => colour.total > 0).map((colour) => ({ ...colour }));

    const pairedEntries = new Map<string, CartItem>();
    let colourIndex = 0;

    for (const core of corePool) {
      let remainingCore = core.total;

      while (remainingCore > 0 && colourIndex < colourPool.length) {
        const currentColour = colourPool[colourIndex];
        if (currentColour.total <= 0) {
          colourIndex += 1;
          continue;
        }

        const pairedCount = Math.min(remainingCore, currentColour.total);
        if (pairedCount <= 0) {
          break;
        }

        const pairKey = getCartItemKey(cartProduct.id, core.name, currentColour.name);
        const existingEntry = pairedEntries.get(pairKey);

        if (!existingEntry) {
          pairedEntries.set(pairKey, {
            key: pairKey,
            productId: cartProduct.id,
            selectedCore: core.name,
            selectedColour: currentColour.name,
            quantity: pairedCount,
            product,
          });
        } else {
          existingEntry.quantity += pairedCount;
        }

        remainingCore -= pairedCount;
        currentColour.total -= pairedCount;

        if (currentColour.total <= 0) {
          colourIndex += 1;
        }
      }
    }

    return Array.from(pairedEntries.values()).filter((entry) => entry.quantity > 0);
  });
};

export const getTotalItems = (cart: Cart): number => {
  return cart.reduce((sum, cartProduct) => sum + cartProduct.total, 0);
};

export const getTotalPrice = (cart: Cart, products: Product[]): number => {
  return getCartItems(cart, products).reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

export const addItemToCart = (cart: Cart, id: number, selectedCore: string = DEFAULT_CORE_OPTION, selectedColour: string = DEFAULT_COLOUR_OPTION): Cart => {
  const nextCart = [...cart];
  const productIndex = nextCart.findIndex((entry) => entry.id === id);

  if (productIndex === -1) {
    const normalized = normalizeProductEntry({
      id,
      name: getProductById(String(id))?.name ?? "",
      cores: [{ name: selectedCore, total: 1 }],
      colours: [{ name: selectedColour, total: 1 }],
    });

    if (normalized) {
      nextCart.push(normalized);
    }

    return nextCart;
  }

  const productEntry = nextCart[productIndex];
  const nextCores = [...productEntry.cores];
  const nextColours = [...productEntry.colours];

  const coreIndex = nextCores.findIndex((core) => core.name === selectedCore);
  if (coreIndex === -1) {
    nextCores.push({ name: selectedCore, total: 1 });
  } else {
    nextCores[coreIndex] = {
      ...nextCores[coreIndex],
      total: nextCores[coreIndex].total + 1,
    };
  }

  const colourIndex = nextColours.findIndex((colour) => colour.name === selectedColour);
  if (colourIndex === -1) {
    nextColours.push({ name: selectedColour, total: 1 });
  } else {
    nextColours[colourIndex] = {
      ...nextColours[colourIndex],
      total: nextColours[colourIndex].total + 1,
    };
  }

  const normalized = normalizeProductEntry({
    id: productEntry.id,
    name: productEntry.name,
    cores: nextCores,
    colours: nextColours,
  });

  if (!normalized) {
    nextCart.splice(productIndex, 1);
  } else {
    nextCart[productIndex] = normalized;
  }

  return nextCart;
};

export const removeItemFromCart = (cart: Cart, id: number, selectedCore: string = DEFAULT_CORE_OPTION, selectedColour: string = DEFAULT_COLOUR_OPTION): Cart => {
  const productIndex = cart.findIndex((entry) => entry.id === id);
  if (productIndex === -1) {
    return cart;
  }

  const nextCart = [...cart];
  const productEntry = nextCart[productIndex];
  const coreIndex = productEntry.cores.findIndex((core) => core.name === selectedCore);
  const colourIndex = productEntry.colours.findIndex((colour) => colour.name === selectedColour);

  if (coreIndex === -1 || colourIndex === -1) {
    return cart;
  }

  const nextCores = [...productEntry.cores];
  const nextColours = [...productEntry.colours];

  const nextCoreTotal = nextCores[coreIndex].total - 1;
  if (nextCoreTotal <= 0) {
    nextCores.splice(coreIndex, 1);
  } else {
    nextCores[coreIndex] = { ...nextCores[coreIndex], total: nextCoreTotal };
  }

  const nextColourTotal = nextColours[colourIndex].total - 1;
  if (nextColourTotal <= 0) {
    nextColours.splice(colourIndex, 1);
  } else {
    nextColours[colourIndex] = { ...nextColours[colourIndex], total: nextColourTotal };
  }

  const normalized = normalizeProductEntry({
    id: productEntry.id,
    name: productEntry.name,
    cores: nextCores,
    colours: nextColours,
  });

  if (!normalized) {
    nextCart.splice(productIndex, 1);
    return nextCart;
  }

  nextCart[productIndex] = normalized;

  return nextCart;
};
