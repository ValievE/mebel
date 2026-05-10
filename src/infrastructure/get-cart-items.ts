import query from "@/infrastructure/query.ts";
import { ExtFurnitureType } from "@/infrastructure/types.ts";

export type GetCartItemsResponse = Array<
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

export async function getCartItems(
  ids: string[]
): Promise<GetCartItemsResponse> {
  return query<{ items: GetCartItemsResponse }>({
    point: `/api/v1/cart`,
    config: {
      method: "GET",
      params: { ids: ids.join(",") }
    }
  }).then(res => res?.data?.items ?? []);
}
