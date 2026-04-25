import { FurnitureType } from "@/types/types.ts";

export namespace ItemPopupNS {
  export type Props = {
    visible: boolean;
    title: string;
    subtitle: string;
    parameters: Record<string, string>;
    price: number;
    images: string[];
    type: FurnitureType;
  };
  export type Emits = {
    (e: "close"): void;
  };
}
