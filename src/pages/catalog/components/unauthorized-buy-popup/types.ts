export namespace UnauthorizedBuyPopupNS {
  export type Props = {
    email: string;
    loading?: boolean;
    error?: string;
  };
  export type Emits = {
    (e: "close"): void;
    (e: "accept"): void;
    (e: "update:email", value: string): void;
  };
}
