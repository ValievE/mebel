import type { CartStore } from "@/stores/types.ts";

export const CHECKOUT_CART_KEY = "mebel_checkout_cart";

export type CheckoutCartSnapshot = Record<string, CartStore.Item>;

export function saveCheckoutCart(cart: CheckoutCartSnapshot): void {
  sessionStorage.setItem(CHECKOUT_CART_KEY, JSON.stringify(cart));
}

export function loadCheckoutCart(): CheckoutCartSnapshot | null {
  const raw = sessionStorage.getItem(CHECKOUT_CART_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CheckoutCartSnapshot;
  } catch {
    return null;
  }
}

export function clearCheckoutCart(): void {
  sessionStorage.removeItem(CHECKOUT_CART_KEY);
}
