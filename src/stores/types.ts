export enum StoreNames {
  UI = "ui",
  Cart = "cart",
  Auth = "auth",
  CabinetLayout = "cabinetLayout"
}

export namespace CartStore {
  export type Item = {
    quantity: number;
    price: number;
    size?: string;
    material_id?: string;
  };
}
