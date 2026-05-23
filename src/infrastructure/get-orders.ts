import query from "@/infrastructure/query.ts";
import { OrderItemNS } from "@/pages/orders/components/order-item/types.ts";

export type GetOrdersResponseItem = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  delivery_at: string;
  status: OrderItemNS.Status;
  price: number;
  quantity: number;
};

export type GetOrdersResponse = {
  orders: GetOrdersResponseItem[];
};

export async function getOrders(): Promise<GetOrdersResponse> {
  return query<GetOrdersResponse>({
    point: "/api/v1/orders",
    config: { method: "GET" }
  }).then(res => res.data);
}
