export namespace OrderItemNS {
  export type Props = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    creationDate: string;
    deliveryDate: string;
    status: Status;
    price: number;
    quantity: number;
  };

  export enum Status {
    Payment = "payment", // Ожидает оплаты
    Pending = "pending", // Заказ обрабатывается
    Production = "production", // Заказ в производстве
    Delivery = "delivery", // Заказ доставляется
    Completed = "completed" // Заказ завершен
  }
}
