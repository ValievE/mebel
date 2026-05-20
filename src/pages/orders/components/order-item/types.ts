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
    Pending = "pending",
    Production = "production",
    Delivery = "delivery",
    Completed = "completed"
  }
}
