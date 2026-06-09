import { LayoutName, PageName } from "@/router/consts.ts";

export namespace UIComponentsNS {
  export type Size = "s" | "m" | "l" | "xl";
  export type Style = "red" | "white" | "orange" | "link";

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
      | "logo-outline"
      | "chevron"
      | "warning"
      | "close-square"
      | "user";

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
      type?: Style;
      wide?: boolean;
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

  export namespace EmptyList {
    export type Props = {
      title?: string;
      subtitle?: string;
    };
  }

  export namespace Popup {
    export type Props = {
      id: string;
      customClass?: string;
      size?: Size;
      loading?: boolean;
      contentWidth?: boolean;
      contentHeight?: boolean;
    };
    export type Emits = {
      (e: "close"): void;
    };
  }

  export namespace ImagePreviewer {
    export type Props = {
      images: string[];
      loading?: boolean;
    };
  }

  export namespace Selector {
    export type Option<T> = {
      id: T;
      name: string;
    };
    export type Props<T> = {
      disabled?: boolean;
      placeholder?: string;
      modelValue: T;
      options: Option<T>[];
    };
    export type Emits<T> = {
      (e: "update:modelValue", value: T): void;
    };
  }

  export namespace Toaster {
    export type Props = {
      toasts: Toast.Props[];
    };

    export type Emits = {
      (e: "delete", id: string): void;
    };
  }

  export namespace Toast {
    export type Type = "error" | "success" | "info";
    export type Emits = {
      (e: "close", id: string): void;
    };
    export type Props = {
      id: string;
      message: string;
      type: Type;
    };
  }

  export namespace Input {
    export type SearchItem = {
      id: string;
      name: string;
    };
    export type Props = {
      placeholder?: string;
      label?: string;
      modelValue: string;
      error?: string;
      required?: boolean;
      disabled?: boolean;
      hidden?: boolean;
      autocomplete?: string;
      maxlength?: number;
      search?: boolean;
      searchResults?: SearchItem[];
    };
    export type Emits = {
      (e: "update:modelValue", value: string): void;
      (e: "select:result", item: SearchItem): void;
    };
  }

  export namespace Tabs {
    export type Item<T> = {
      id: T;
      text: string;
    };
    export type Props<T> = {
      items: Item<T>[];
      modelValue: T;
      disabled?: boolean;
    };
    export type Emits<T> = {
      (e: "update:modelValue", value: T): void;
    };
  }

  export namespace Tumbler {
    export type Props = {
      modelValue: boolean;
      disabled?: boolean;
    };
    export type Emits = {
      (e: "update:modelValue", value: boolean): void;
    };
  }

  export namespace Checkbox {
    export type Props = {
      modelValue: boolean;
      disabled?: boolean;
      required?: boolean;
      error?: string;
    };
    export type Emits = {
      (e: "update:modelValue", value: boolean): void;
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

export type NavBarLink = {
  text: string;
  name: PageName | LayoutName;
  icon: UIComponentsNS.Icon.Names;
};

export type ErrorType = {
  response?: {
    data?: {
      error?: {
        code?: string;
        message?: string;
      };
    };
  };
};

export enum DocumentsTypeRoute {
  Privacy = "privacy-policy",
  Return = "return-policy",
  Details = "store-details",
  Offer = "public-offer"
}
