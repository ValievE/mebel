import { SSNames } from "@/common/consts.ts";
import type { CartStore } from "@/stores/types.ts";

export type CheckoutCartSnapshot = Record<string, CartStore.Item>;

export function saveCheckoutCart(
  cart: CheckoutCartSnapshot,
  guestEmail?: string
): void {
  sessionStorage.setItem(SSNames.CheckoutCart, JSON.stringify(cart));
  if (guestEmail) {
    sessionStorage.setItem(
      SSNames.CheckoutEmail,
      guestEmail.trim().toLowerCase()
    );
  } else {
    sessionStorage.removeItem(SSNames.CheckoutEmail);
  }
}

export function loadCheckoutCart(): CheckoutCartSnapshot | null {
  const raw = sessionStorage.getItem(SSNames.CheckoutCart);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CheckoutCartSnapshot;
  } catch {
    return null;
  }
}

export function loadCheckoutEmail(): string {
  return sessionStorage.getItem(SSNames.CheckoutEmail) ?? "";
}

export function clearCheckoutCart(): void {
  sessionStorage.removeItem(SSNames.CheckoutCart);
  sessionStorage.removeItem(SSNames.CheckoutEmail);
}
