import type { ItemPopupNS } from "@/pages/catalog/components/item-popup/types.ts";
import { type UIComponentsNS } from "@/types/types.ts";
import { GetListField } from "@/infrastructure/get-list.ts";

export type ItemPopupObject = {
  data: ItemPopupNS.Props;
  functions: {
    open(id: string): void;
    close(): void;
  };
};

export type SortSelector = {
  items: UIComponentsNS.Selector.Option<GetListField>[];
  value: GetListField;
  functions: {
    updateValue(id: GetListField): Promise<void>;
  };
};
