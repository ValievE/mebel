import { FurnitureType } from "@/types/types.ts";
import type { ItemVariantSizeGroup } from "@/infrastructure/get-item.ts";
import { type ItemConfiguratorNS } from "@/pages/catalog/components/item-popup/components/item-configurator/types.ts";

export namespace ItemPopupNS {
  export type Data = {
    id: string;
    title: string;
    parameters: string[];
    article: string;
    variants: ItemVariantSizeGroup[];
    images: string[];
    type: FurnitureType[];
    isAdded?: boolean;
    pickedOptions: ItemConfiguratorNS.Value;
  };
  export type Props = {
    data: Data;
    loading: boolean;
    id: string;
  };
  export type Emits = {
    (e: "close"): void;
    (e: "addToCart"): void;
    (e: "updateSize", value: string): void;
    (e: "updateMaterial", value: string): void;
  };
}
