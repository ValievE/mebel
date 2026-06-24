import type { ItemPopupNS } from "@/pages/catalog/components/item-popup/types.ts";
import type { UIComponentsNS } from "@/types/types.ts";
import { GetListField } from "@/infrastructure/get-list.ts";
import type { CartPopupNS } from "@/pages/catalog/components/cart-popup/types.ts";
import { type CheckoutPopupNS } from "@/pages/catalog/components/checkout-popup/types.ts";

export type ItemPopupObject = {
  data: ItemPopupNS.Props;
  functions: {
    open(id: string): void;
    close(): void;
    addToCart(): void;
    updateSize(value: string): void;
    updateMaterial(value: string): void;
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
  popupData: CartPopupNS.Props;
  functions: {
    openPopup(): Promise<void>;
    closePopup(): void;
    addItem(id: string, price: number): void;
    hasItem(id: string): boolean;
    deleteItem(id: string): void;
    checkout(): Promise<void>;
    changeQuantity(payload: { increase: boolean; id: string }): void;
    changeAgreement(): void;
  };
};

export type CheckoutPopupObject = {
  data: CheckoutPopupNS.Props;
  functions: {
    open(): void;
    close(): void;
    accept(): Promise<void>;
    updateEmail(value: string): void;
    updateAddress(value: string): void;
  };
};
