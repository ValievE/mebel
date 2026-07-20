import { FurnitureType } from "@/types/types.ts";

export namespace CatalogItemNS {
  export type Props = {
    id: string;
    title: string;
    price: number;
    type: FurnitureType[];
    image: string;
    multipleVariants?: boolean;
  };
}
