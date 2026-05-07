import { type UIComponentsNS } from "@/types/types.ts";

export namespace CartPopupNS {
  export type Item = {
    id: string;
    title: string;
    tags: Array<{
      text: string;
      type: UIComponentsNS.Style;
    }>;
    image: string;
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
    (e: "accept"): void;
    (e: "delete", id: string): void;
    (e: "click:item", id: string): void;
  };
  export type ItemEmits = {
    (e: "click:item"): void;
    (e: "delete", id: string): void;
  };
}
