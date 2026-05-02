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
    loading: boolean;
    visible: boolean;
  };
  export type Emits = {
    (e: "close"): void;
    (e: "accept"): void;
    (e: "delete", id: string): void;
  };
}
