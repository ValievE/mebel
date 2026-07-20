export namespace CheckoutPopupNS {
  export type Props = {
    email: string;
    address: string;
    citiesHint?: string;
    loading?: boolean;
    emailError?: string;
    addressError?: string;
    addressSuggestions?: string[];
    guest: boolean;
  };
  export type Emits = {
    (e: "close"): void;
    (e: "accept"): void;
    (e: "update:email", value: string): void;
    (e: "update:address", value: string): void;
  };
}
