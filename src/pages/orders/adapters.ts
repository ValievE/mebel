import type { GetOrdersResponse } from "@/infrastructure/get-orders.ts";
import { OrderItemNS } from "@/pages/orders/components/order-item/types.ts";

const STATUS_FROM_API: Record<number, OrderItemNS.Status> = {
  0: OrderItemNS.Status.Payment,
  1: OrderItemNS.Status.Pending,
  2: OrderItemNS.Status.Production,
  3: OrderItemNS.Status.Delivery,
  4: OrderItemNS.Status.Completed
};

const formatDate = (value: string): string => {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}.${month}.${year}`;
};

export const getOrdersAdapter = (
  response: GetOrdersResponse
): OrderItemNS.Props[] =>
  (response.orders || []).map(order => ({
    id: order.id,
    title: order.title,
    description: order.description,
    imageUrl: order.image_url,
    creationDate: formatDate(order.created_at),
    deliveryDate: formatDate(order.delivery_at),
    status: STATUS_FROM_API[order.status] ?? OrderItemNS.Status.Pending,
    price: order.unit_price,
    quantity: order.quantity
  }));
