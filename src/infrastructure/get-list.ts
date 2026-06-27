import query from "@/infrastructure/query.ts";
import { ExtFurnitureType } from "@/infrastructure/types.ts";
import type { FurnitureType } from "@/types/types.ts";

export enum GetListSort {
  PriceAsc = "price.asc",
  PriceDesc = "price.desc",
  TitleAsc = "title.asc",
  TitleDesc = "title.desc",
  Default = "id.asc"
}
export type GetListRequest = {
  filter?: {
    type: FurnitureType;
  };
  sort?: GetListSort;
};
export type GetListResponse = Array<
  Partial<{
    id: number;
    title: string;
    type: ExtFurnitureType;
    images: string[];
    price: number;
    article: string;
    multiple_variants: boolean;
  }>
>;

export async function getList(
  payload?: GetListRequest
): Promise<GetListResponse> {
  const params: Record<string, string> = {
    sort: payload?.sort || GetListSort.Default
  };
  if (payload?.filter?.type !== undefined) {
    params.type = String(payload.filter.type);
  }
  return query<GetListResponse>({
    point: `/api/v1/catalog`,
    config: {
      method: "GET",
      params
    }
  }).then(res => res?.data);
}
