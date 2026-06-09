import type { GetListRequest } from "@/infrastructure/get-list.ts";
import type { SuggestAddressRequest } from "@/infrastructure/delivery/suggest-address.ts";

export default {
  getList(payload?: GetListRequest) {
    return import("./get-list.ts").then(m => {
      return m.getList(payload);
    });
  },
  getItem(id: string) {
    return import("./get-item.ts").then(m => {
      return m.getItem(id);
    });
  },
  getCartItems(ids: string[]) {
    return import("./get-cart-items.ts").then(m => {
      return m.getCartItems(ids);
    });
  },
  getOrders() {
    return import("./get-orders.ts").then(m => {
      return m.getOrders();
    });
  },
  createOrder(payload: import("./create-order.ts").CreateOrderRequest) {
    return import("./create-order.ts").then(m => {
      return m.createOrder(payload);
    });
  },
  createGuestOrder(
    payload: import("./create-guest-order.ts").CreateGuestOrderRequest
  ) {
    return import("./create-guest-order.ts").then(m => {
      return m.createGuestOrder(payload);
    });
  },
  getLegalDocument(id: string) {
    return import("./get-legal-document.ts").then(m => {
      return m.getLegalDocument(id);
    });
  },
  getDeliveryCities() {
    return import("./delivery/get-cities.ts").then(m => {
      return m.getDeliveryCities();
    });
  },
  suggestAddress(payload: SuggestAddressRequest) {
    return import("./delivery/suggest-address.ts").then(m => {
      return m.suggestAddress(payload);
    });
  }
};
