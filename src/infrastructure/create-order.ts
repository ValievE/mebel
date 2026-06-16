import query from "@/infrastructure/query.ts";
import type { GetOrdersResponse } from "@/infrastructure/get-orders.ts";

export type CreateOrderLine = {
  item_id: number;
  quantity: number;
  size?: string;
  material_id?: string;
};

export type CreateOrderRequest = {
  items: CreateOrderLine[];
  delivery_address: string;
};

export async function createOrder(
  payload: CreateOrderRequest
): Promise<GetOrdersResponse> {
  return query<GetOrdersResponse>({
    point: "/api/v1/orders",
    config: {
      method: "POST",
      data: payload
    }
  }).then(res => res.data);
}
