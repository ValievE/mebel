export enum StoreNames {
  UI = "ui",
  Cart = "cart",
  Auth = "auth",
  CabinetLayout = "cabinetLayout"
}

export namespace CartStore {
  export type Item = {
    id: string;
    quantity: number;
  };
}
