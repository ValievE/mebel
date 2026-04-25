import type { GetListResponse } from "@/infrastructure/get-list.ts";
import { type CatalogItemNS } from "@/pages/catalog/components/catalog-item/types.ts";
import { FurnitureType } from "@/types/types.ts";
import { ExtFurnitureType } from "@/infrastructure/types.ts";
import type { GetItemResponse } from "@/infrastructure/get-item.ts";
import type { ItemPopupNS } from "@/pages/catalog/components/item-popup/types.ts";

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
  if (!response.length) throw new Error();

  return {
    type: adaptListType[response[0]?.type || 0],
    images: response[0]?.images || [],
    title: response[0]?.title || "",
    price: response[0]?.price || 0,
    id: String(response[0]?.id) || "",
    parameters: response[0]?.parameters || {}
  };
};
