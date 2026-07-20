import { CatalogSort, FurnitureType } from "@/types/types.ts";
import { ExtCatalogSort, ExtFurnitureType } from "@/infrastructure/types.ts";

export const adaptCatalogSort = {
  toDto: (value?: CatalogSort): ExtCatalogSort => {
    switch (value) {
      case CatalogSort.PriceAsc:
        return ExtCatalogSort.PriceAsc;
      case CatalogSort.PriceDesc:
        return ExtCatalogSort.PriceDesc;
      case CatalogSort.TitleAsc:
        return ExtCatalogSort.TitleAsc;
      case CatalogSort.TitleDesc:
        return ExtCatalogSort.TitleDesc;
      default:
        return ExtCatalogSort.Default;
    }
  },
  fromDto: (value: ExtCatalogSort): CatalogSort => {
    switch (value) {
      case ExtCatalogSort.PriceAsc:
        return CatalogSort.PriceAsc;
      case ExtCatalogSort.PriceDesc:
        return CatalogSort.PriceDesc;
      case ExtCatalogSort.TitleAsc:
        return CatalogSort.TitleAsc;
      case ExtCatalogSort.TitleDesc:
        return CatalogSort.TitleDesc;
      default:
        return CatalogSort.Default;
    }
  }
};

export const adaptCatalogFilter = {
  toDto: (value?: FurnitureType): ExtFurnitureType => {
    switch (value) {
      case FurnitureType.Bathroom:
        return ExtFurnitureType.Bathroom;
      case FurnitureType.Bedroom:
        return ExtFurnitureType.Bedroom;
      case FurnitureType.Kitchen:
        return ExtFurnitureType.Kitchen;
      case FurnitureType.Wardrobe:
        return ExtFurnitureType.Wardrobe;
      case FurnitureType.LivingRoom:
        return ExtFurnitureType.LivingRoom;
      default:
        return ExtFurnitureType.Other;
    }
  },
  fromDto: (value?: ExtFurnitureType): FurnitureType => {
    switch (value) {
      case ExtFurnitureType.Bathroom:
        return FurnitureType.Bathroom;
      case ExtFurnitureType.Bedroom:
        return FurnitureType.Bedroom;
      case ExtFurnitureType.Kitchen:
        return FurnitureType.Kitchen;
      case ExtFurnitureType.Wardrobe:
        return FurnitureType.Wardrobe;
      case ExtFurnitureType.LivingRoom:
        return FurnitureType.LivingRoom;
      default:
        return FurnitureType.Other;
    }
  }
};
