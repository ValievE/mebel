export namespace UIComponentsNS {
  export type Size = "s" | "m" | "l" | "xl";
  export type Style = "red" | "white";

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

  export namespace Tag {
    export type Props = {
      size?: Size;
      type?: Style;
    };
  }

  export namespace ScrollContainer {
    export type Props = {
      customClass?: string;
    };
  }

  export namespace Popup {
    export type Props = {
      visible: boolean;
      customClass?: string;
      size?: Size;
    };
    export type Emits = {
      (e: "close"): void;
    };
  }
}

export enum FurnitureType {
  Kitchen = "Kitchen",
  LivingRoom = "LivingRoom",
  Bathroom = "Bathroom",
  Bedroom = "Bedroom",
  Wardrobe = "Wardrobe",
  Other = "Other"
}
