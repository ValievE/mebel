import query from "@/infrastructure/query.ts";
import { ExtFurnitureType } from "@/infrastructure/types.ts";
import type { FurnitureType } from "@/types/types.ts";

export enum GetListField {
  PriceAsc = "price.asc",
  PriceDesc = "price.desc",
  Default = "id.asc"
}
export type GetListRequest = {
  filter?: {
    type: FurnitureType;
  };
  sort?: GetListField;
};
export type GetListResponse = Array<
  Partial<{
    id: number;
    title: string;
    type: ExtFurnitureType;
    images: string[];
    price: number;
  }>
>;

export async function getList(
  payload?: GetListRequest
): Promise<GetListResponse> {
  const params: Record<string, string> = {
    select: "id,title,type,images,price",
    order: payload?.sort || GetListField.Default
  };

  return query<GetListResponse>({
    point: `/rest/v1/items`,
    config: {
      method: "GET",
      params
    }
  }).then(res => res?.data);
}
