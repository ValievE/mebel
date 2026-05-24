import { type UIComponentsNS } from "@/types/types.ts";

export namespace CartPopupNS {
  export type Item = {
    id: string;
    title: string;
    tags: Record<
      "type" | "quantity" | "price",
      {
        text: string;
        type: UIComponentsNS.Style;
        editable?: boolean;
      }
    >;
    image: string;
    quantity: number;
    price: number;
    inStock: number;
  };
  export type Data = {
    items: Item[];
    sum: number;
  };
  export type Props = {
    data: Data;
    id: string;
    loading: boolean;
  };
  export type Emits = {
    (e: "close"): void;
    (e: "checkout"): void;
    (e: "accept"): void;
    (e: "delete", id: string): void;
    (e: "click:item", id: string): void;
    (e: "change:quantity", payload: { increase: boolean; id: string }): void;
  };
  export type ItemEmits = {
    (e: "click:item"): void;
    (e: "change:quantity", increase: boolean): void;
    (e: "delete", id: string): void;
  };
}
