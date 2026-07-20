import query from "@/infrastructure/query.ts";
import { ExtFurnitureType } from "@/infrastructure/types.ts";

export type CartLineInput = {
  item_id: number;
  quantity: number;
  size?: string;
  material_id?: string;
};

export type GetCartItemsResponseItem = Partial<{
  id: number;
  in_stock: number;
  title: string;
  types: ExtFurnitureType[];
  price: number;
  article: string;
  size: string;
  material: string;
  material_id: string;
  quantity: number;
  line_total: number;
  available: boolean;
  images: string[];
  parameters: Record<string, string>;
}>;

export type GetCartItemsResponse = GetCartItemsResponseItem[];

type CartPreviewResponse = {
  lines: GetCartItemsResponseItem[];
};

/** Загружает строки корзины с учётом выбранных размера и материала. */
export async function getCartItems(
  lines: CartLineInput[]
): Promise<GetCartItemsResponse> {
  if (lines.length === 0) {
    return [];
  }
  return query<CartPreviewResponse>({
    point: `/api/v1/cart/preview`,
    config: {
      method: "POST",
      data: { lines }
    }
  }).then(res => res?.data?.lines ?? []);
}
