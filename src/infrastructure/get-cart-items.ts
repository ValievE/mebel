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
  return query<GetCartItemsResponse>({
    point: `/rest/v1/items?id=in.(${ids.join(",")})`,
    config: {
      method: "GET"
    }
  }).then(res => res?.data);
}
