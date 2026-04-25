import { FurnitureType } from "@/types/types.ts";

export namespace ItemPopupNS {
  export type Data = {
    id: string;
    title: string;
    parameters: Record<string, string>;
    price: number;
    images: string[];
    type: FurnitureType;
  };
  export type Props = {
    data: Data;
    loading: boolean;
    visible: boolean;
  };
  export type Emits = {
    (e: "close"): void;
  };
}
