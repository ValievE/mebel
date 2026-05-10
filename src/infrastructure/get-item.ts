import query from "@/infrastructure/query.ts";
import { ExtFurnitureType } from "@/infrastructure/types.ts";

export type GetItemResponse = Partial<{
  id: number;
  title: string;
  type: ExtFurnitureType;
  price: number;
  in_stock: number;
  created_at: string;
  images: string[];
  parameters: Record<string, string>;
}>;

export async function getItem(id: string): Promise<GetItemResponse> {
  return query<GetItemResponse>({
    point: `/api/v1/items/${id}`,
    config: {
      method: "GET"
    }
  }).then(res => res?.data);
}
