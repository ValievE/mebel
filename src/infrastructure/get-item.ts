import query from "@/infrastructure/query.ts";
import { ExtFurnitureType } from "@/infrastructure/types.ts";

export type GetItemResponse = Array<
  Partial<{
    id: number;
    title: string;
    type: ExtFurnitureType;
    price: number;
    created_at: string;
    images: string[];
    parameters: Record<string, string>;
  }>
>;

export async function getItem(id: string): Promise<GetItemResponse> {
  return query<GetItemResponse>({
    point: `/rest/v1/items?id=eq.${id}`,
    config: {
      method: "GET"
    }
  }).then(res => res?.data);
}
