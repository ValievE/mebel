import type { GetListRequest } from "@/infrastructure/get-list.ts";

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
  }
};
