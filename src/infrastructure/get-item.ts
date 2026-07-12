import query from "@/infrastructure/query.ts";
import { ExtFurnitureType } from "@/infrastructure/types.ts";

export type ItemVariantOption = {
  material_id: string;
  url: string;
  price: number;
  name: string;
};

export type ItemVariantSizeGroup = {
  size: string;
  options: ItemVariantOption[];
};

export type GetItemResponse = Partial<{
  id: number;
  title: string;
  types: ExtFurnitureType[];
  in_stock: number;
  article: string;
  created_at: string;
  images: string[];
  parameters: string[];
  variants: ItemVariantSizeGroup[];
}>;

export async function getItem(id: string): Promise<GetItemResponse> {
  return query<GetItemResponse>({
    point: `/api/v1/items/${id}`,
    config: {
      method: "GET"
    }
  }).then(res => res?.data);
}
