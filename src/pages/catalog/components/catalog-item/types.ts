import { FurnitureType } from "@/types/types.ts";

export namespace CatalogItemNS {
  export type Props = {
    title: string;
    price: number;
    type: FurnitureType;
    image: string;
  };
}
