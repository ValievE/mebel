import type { GetOrdersResponse } from "@/infrastructure/get-orders.ts";
import { OrderItemNS } from "@/pages/orders/components/order-item/types.ts";

const formatDate = (value: string): string => {
  if (!value) return "—";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}.${month}.${year}`;
};

export const getOrdersAdapter = (
  response: GetOrdersResponse
): OrderItemNS.Props[] =>
  (response.orders || []).map(order => ({
    id: String(order.id),
    title: order.title,
    description: order.description,
    imageUrl: order.image_url,
    creationDate: formatDate(order.created_at),
    deliveryDate: formatDate(order.delivery_at),
    status: order.status,
    price: order.price,
    quantity: order.quantity
  }));
