export enum StoreNames {
  UI = "ui",
  Cart = "cart"
}

export namespace CartStore {
  export type Item = {
    quantity: number;
    price: number;
  };
}
