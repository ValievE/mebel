import { CatalogSort } from "@/types/types.ts";
import { GetListSort } from "@/infrastructure/get-list.ts";

export const AdaptCatalogSort = (value?: CatalogSort): GetListSort => {
  switch (value) {
    case CatalogSort.PriceAsc:
      return GetListSort.PriceAsc;
    case CatalogSort.PriceDesc:
      return GetListSort.PriceDesc;
    case CatalogSort.TitleAsc:
      return GetListSort.TitleAsc;
    case CatalogSort.TitleDesc:
      return GetListSort.TitleDesc;
    default:
      return GetListSort.Default;
  }
};
