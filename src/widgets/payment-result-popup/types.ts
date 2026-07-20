export namespace PaymentResultPopupNS {
  export type Mode = "success" | "failure";

  export type State = {
    mode: Mode | null;
  };
}
