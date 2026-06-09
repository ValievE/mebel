import { ref } from "vue";

import PaymentResultPopup from "@/widgets/payment-result-popup/payment-result-popup.vue";
import { type PaymentResultPopupNS } from "@/widgets/payment-result-popup/types.ts";
import { useUiStore } from "@/stores/use-ui-store.ts";
import {
  clearCheckoutCart,
  loadCheckoutCart,
  loadCheckoutEmail
} from "@/infrastructure/checkout-cart.ts";
import {
  confirmGuestPaymentRequest,
  confirmPaymentRequest
} from "@/infrastructure/payments-api.ts";
import { useCartStore } from "@/stores/use-cart-store.ts";
import { useAuthStore } from "@/stores/use-auth-store.ts";

export function usePaymentReturn() {
  const uiStore = useUiStore();
  const cartStore = useCartStore();
  const authStore = useAuthStore();
  const paymentResultMode = ref<PaymentResultPopupNS.Mode | null>(null);

  const restoreCartFromCheckout = () => {
    const snapshot = loadCheckoutCart();
    if (!snapshot) return;
    cartStore.restoreSnapshot(snapshot);
  };

  const handlePaymentReturn = async () => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("payment_session");
    if (!sessionId) return;

    const resultFromQuery = params.get("payment_result");
    const isGuestCheckout = !authStore.isAuthenticated && !!loadCheckoutEmail();

    window.history.replaceState({}, "", window.location.pathname);

    if (!authStore.isAuthenticated && !isGuestCheckout) {
      uiStore.addToast("Войдите в аккаунт для проверки оплаты", "error");
      return;
    }

    try {
      const { status } = isGuestCheckout
        ? await confirmGuestPaymentRequest({ payment_id: sessionId })
        : await confirmPaymentRequest({ payment_id: sessionId });

      if (status === "success" || resultFromQuery === "success") {
        clearCheckoutCart();
        cartStore.clear();
        paymentResultMode.value = "success";
        uiStore.openPopup("payment-result");
        return;
      }

      restoreCartFromCheckout();
      paymentResultMode.value = "failure";
      uiStore.openPopup("payment-result");
    } catch {
      restoreCartFromCheckout();
      paymentResultMode.value = "failure";
      uiStore.openPopup("payment-result");
    }
  };

  const closePaymentResult = () => {
    paymentResultMode.value = null;
  };

  return {
    PaymentResultPopup,
    paymentResultMode,
    handlePaymentReturn,
    closePaymentResult
  };
}
