import { useCartStore } from "@/stores/cartStore";
import type { CatalogProduct } from "@/lib/catalog";

export const IPHONE18_HANDLE = "iphone-18-pro-max-1tb";
export const APPLE_DISCOUNT = 0.2;

export function isAppleProduct(product?: CatalogProduct | null) {
  if (!product) return false;
  const node = product.node;
  if (node.brand?.toLowerCase() === "apple") return true;
  return /iphone|macbook|apple watch|ipad|imac/i.test(node.title);
}

/** True when the iPhone 18 Pro Max is in the cart (unlocks 20% off on Apple items). */
export function useIphone18InCart() {
  return useCartStore((s) => s.items.some((i) => i.product.node.handle === IPHONE18_HANDLE));
}
