import query from "@/infrastructure/query.ts";
import type { GetOrdersResponse } from "@/infrastructure/get-orders.ts";
import type { CreateOrderLine } from "@/infrastructure/create-order.ts";

export type CreateGuestOrderRequest = {
  email: string;
  items: CreateOrderLine[];
};

export async function createGuestOrder(
  payload: CreateGuestOrderRequest
): Promise<GetOrdersResponse> {
  return query<GetOrdersResponse>({
    point: "/api/v1/orders/guest",
    config: {
      method: "POST",
      data: payload
    }
  }).then(res => res.data);
}
