import type { GetListResponse } from "@/infrastructure/get-list.ts";
import type { CatalogItemNS } from "@/pages/catalog/components/catalog-item/types.ts";
import { FurnitureType } from "@/types/types.ts";
import { ExtFurnitureType } from "@/infrastructure/types.ts";
import type { GetItemResponse } from "@/infrastructure/get-item.ts";
import type { ItemPopupNS } from "@/pages/catalog/components/item-popup/types.ts";
import type { GetCartItemsResponse } from "@/infrastructure/get-cart-items.ts";
import type { CartPopupNS } from "@/pages/catalog/components/cart-popup/types.ts";
import { furnitureName } from "@/common/consts.ts";

const adaptListType: Record<ExtFurnitureType, FurnitureType> = {
  [ExtFurnitureType.LivingRoom]: FurnitureType.LivingRoom,
  [ExtFurnitureType.Kitchen]: FurnitureType.Kitchen,
  [ExtFurnitureType.Bedroom]: FurnitureType.Bedroom,
  [ExtFurnitureType.Bathroom]: FurnitureType.Bathroom,
  [ExtFurnitureType.Wardrobe]: FurnitureType.Wardrobe,
  [ExtFurnitureType.Other]: FurnitureType.Other
};

export const getListAdapter = (
  response: GetListResponse
): CatalogItemNS.Props[] =>
  (response || []).map(i => ({
    type: adaptListType[i.type || 0],
    image: i.images?.[0] || "",
    title: i.title || "",
    price: i.price || 0,
    id: String(i.id) || ""
  }));

export const getItemAdapter = (response: GetItemResponse): ItemPopupNS.Data => {
  if (response == null || Array.isArray(response)) throw new Error();
  if (response.id === undefined) throw new Error();

  return {
    type: adaptListType[response.type || 0],
    images: response.images || [],
    title: response.title || "",
    price: response.price || 0,
    id: String(response.id) || "",
    parameters: response.parameters || {}
  };
};

export const getCartItemsAdapter = (
  response: GetCartItemsResponse
): [CartPopupNS.Item[], number] => {
  if (!response.length) throw new Error();

  return response.reduce(
    (acc: [CartPopupNS.Item[], number], item) => {
      acc[1] += item.price || 0;

      acc[0].push({
        image: item.images?.[0] || "",
        title: item.title || "",
        id: String(item.id) || "",
        tags: [
          {
            text: `${furnitureName[adaptListType[item.type || 0]]}`,
            type: "white"
          },
          {
            text: "Кол-во: 1",
            type: "white"
          },
          {
            text: (item.price || 0) + "Р",
            type: "red"
          }
        ]
      });

      return acc;
    },
    [[], 0]
  );
};
