import type { ItemPopupNS } from "@/pages/catalog/components/item-popup/types.ts";

export type ItemPopupObject = {
  data: ItemPopupNS.Props;
  functions: {
    toggle(): void;
  };
};
