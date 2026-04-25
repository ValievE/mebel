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
  }
};
