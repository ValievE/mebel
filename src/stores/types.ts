export enum StoreNames {
  UI = "ui",
  Cart = "cart",
  Auth = "auth"
}

export namespace CartStore {
  export type Item = {
    quantity: number;
    price: number;
  };
}
