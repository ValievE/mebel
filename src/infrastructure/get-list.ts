import query from "@/infrastructure/query.ts";
import { ExtFurnitureType } from "@/infrastructure/types.ts";
import { CatalogSort, type FurnitureType } from "@/types/types.ts";
import {
  adaptCatalogFilter,
  adaptCatalogSort
} from "@/infrastructure/adapters.ts";

export type GetListRequest = {
  filter?: FurnitureType[];
  sort?: CatalogSort;
};

export type GetListResponse = Array<
  Partial<{
    id: number;
    title: string;
    types: ExtFurnitureType[];
    images: string[];
    price: number;
    article: string;
    multiple_variants: boolean;
  }>
>;

export async function getList(
  payload?: GetListRequest
): Promise<GetListResponse> {
  const params: Record<string, string | string[]> = {
    sort: String(adaptCatalogSort.toDto(payload?.sort))
  };
  if (payload?.filter?.length) {
    params.filter = payload?.filter.map(t =>
      String(adaptCatalogFilter.toDto(t))
    );
  }
  return query<GetListResponse>({
    point: `/api/v1/catalog`,
    config: {
      method: "GET",
      params
    }
  }).then(res => res?.data);
}
