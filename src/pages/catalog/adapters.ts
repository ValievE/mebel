import type { GetListResponse } from "@/infrastructure/get-list.ts";
import type { CatalogItemNS } from "@/pages/catalog/components/catalog-item/types.ts";
import type { GetItemResponse } from "@/infrastructure/get-item.ts";
import type { ItemPopupNS } from "@/pages/catalog/components/item-popup/types.ts";
import type { GetCartItemsResponse } from "@/infrastructure/get-cart-items.ts";
import type { CartPopupNS } from "@/pages/catalog/components/cart-popup/types.ts";
import { adaptCatalogFilter } from "@/infrastructure/adapters.ts";

export const getListAdapter = (
  response: GetListResponse
): CatalogItemNS.Props[] =>
  (response || []).map(i => ({
    type: (i.types || []).map(i => adaptCatalogFilter.fromDto(i)),
    image: i.images?.[0] || "",
    title: i.title || "",
    price: i.price || 0,
    id: String(i.id) || "",
    multipleVariants: i.multiple_variants ?? false
  }));

export const getItemMinPrice = (data: ItemPopupNS.Data): number => {
  const prices = data.variants.flatMap(group =>
    group.options.map(option => option.price)
  );
  return prices.length ? Math.min(...prices) : 0;
};

export const getItemSelectedPrice = (data: ItemPopupNS.Data): number => {
  const { size, material } = data.pickedOptions;
  const group = data.variants.find(v => v.size === size);
  const option = group?.options.find(o => o.material_id === material);
  if (option?.price != null) {
    return option.price;
  }
  return getItemMinPrice(data);
};

export const getItemAdapter = (response: GetItemResponse): ItemPopupNS.Data => {
  if (response == null || Array.isArray(response)) throw new Error();
  if (response.id === undefined) throw new Error();

  return {
    type: (response.types || []).map(i => adaptCatalogFilter.fromDto(i)),
    images: response.images || [],
    title: response.title || "",
    article: response.article || "",
    variants: response.variants || [],
    id: String(response.id) || "",
    parameters: response.parameters || [],
    pickedOptions: {
      material: response.variants?.[0]?.options?.[0]?.material_id || "",
      size: response.variants?.[0]?.size || ""
    }
  };
};

export const getCartItemsAdapter = (
  response: GetCartItemsResponse
): [CartPopupNS.Item[], number] => {
  if (!response.length) throw new Error();

  return response.reduce(
    (acc: [CartPopupNS.Item[], number], item) => {
      const quantity = item.quantity ?? 1;
      const lineTotal = item.line_total ?? (item.price || 0) * quantity;

      acc[1] += lineTotal;

      acc[0].push({
        image: item.images?.[0] || "",
        title: item.title || "",
        id: String(item.id) || "",
        tags: {
          quantity: {
            text: "Кол-во: " + quantity,
            type: "white",
            editable: true
          },
          price: {
            text: lineTotal + "Р",
            type: "red"
          }
        },
        price: item.price || 0,
        quantity,
        inStock: item.in_stock || 0
      });

      return acc;
    },
    [[], 0]
  );
};
