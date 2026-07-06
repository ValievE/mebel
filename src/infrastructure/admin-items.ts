import query from "@/infrastructure/query.ts";
import { ExtFurnitureType } from "@/infrastructure/types.ts";

export type AdminMaterialOption = {
  name: string;
  image: string;
  price: number;
  in_stock: number;
};

export type AdminSizeGroup = {
  size: string;
  materials: AdminMaterialOption[];
};

export type AdminSaveItemRequest = {
  title: string;
  article: string;
  types: ExtFurnitureType[];
  cover_image: string;
  images: string[];
  parameters: string[];
  price: number;
  in_stock: number;
  sizes: AdminSizeGroup[];
};

export type AdminListItem = {
  id: number;
  title: string;
  article: string;
  types: ExtFurnitureType[];
  cover_image: string;
  price: number;
};

export type AdminItemDetail = AdminSaveItemRequest & {
  id: number;
};

export async function adminListItems(): Promise<AdminListItem[]> {
  return query<AdminListItem[]>({
    point: "/api/v1/admin/items",
    config: { method: "GET" }
  }).then(res => res.data ?? []);
}

export async function adminGetItem(id: number): Promise<AdminItemDetail> {
  return query<AdminItemDetail>({
    point: `/api/v1/admin/items/${id}`,
    config: { method: "GET" }
  }).then(res => res.data);
}

export async function adminCreateItem(
  payload: AdminSaveItemRequest
): Promise<AdminItemDetail> {
  return query<AdminItemDetail>({
    point: "/api/v1/admin/items",
    config: {
      method: "POST",
      data: payload
    }
  }).then(res => res.data);
}

export async function adminUpdateItem(
  id: number,
  payload: AdminSaveItemRequest
): Promise<AdminItemDetail> {
  return query<AdminItemDetail>({
    point: `/api/v1/admin/items/${id}`,
    config: {
      method: "PUT",
      data: payload
    }
  }).then(res => res.data);
}

export async function adminDeleteItem(id: number): Promise<void> {
  await query({
    point: `/api/v1/admin/items/${id}`,
    config: { method: "DELETE" }
  });
}
