export namespace UIComponentsNS {
  export type Size = "s" | "m" | "l" | "xl";

  export namespace Icon {
    export type Names =
      | "search"
      | "checkbox"
      | "checkbox-checked"
      | "radio-checked"
      | "radio"
      | "close"
      | "more-1"
      | "more-2"
      | "slider"
      | "success"
      | "filter"
      | "cart"
      | "nav-point"
      | "phone"
      | "delivery"
      | "catalog"
      | "logo-outline";

    export type Props = {
      size?: number;
      name: Names;
    };
  }

  export namespace Button {
    export type Props = {
      iconName?: Icon.Names;
      size?: Size;
      disabled?: boolean;
    };
    export type Emits = {
      (e: "click"): void;
    };
  }
}
