import type { ItemPopupNS } from "@/pages/catalog/components/item-popup/types.ts";
import type { UIComponentsNS } from "@/types/types.ts";
import { GetListField } from "@/infrastructure/get-list.ts";
import type { CartPopupNS } from "@/pages/catalog/components/cart-popup/types.ts";

export type ItemPopupObject = {
  data: ItemPopupNS.Props;
  functions: {
    open(id: string): void;
    close(): void;
    addToCart(): void;
  };
};

export type SortSelector = {
  items: UIComponentsNS.Selector.Option<GetListField>[];
  value: GetListField;
  functions: {
    updateValue(id: GetListField): Promise<void>;
  };
};

export type CartObject = {
  data: {
    items: string[];
  };
  popupData: CartPopupNS.Props;
  functions: {
    openPopup(): Promise<void>;
    closePopup(): void;
    addItem(id: string): void;
    hasItem(id: string): boolean;
  };
};
