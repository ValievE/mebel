import { FurnitureType } from "@/types/types.ts";

export namespace BackofficeForm {
  export type MaterialOption = {
    name: string;
    image: string;
    price: number;
    inStock: number;
  };
  export type SizeGroup = {
    size: string;
    materials: MaterialOption[];
  };
  export type Form = {
    title: string;
    article: string;
    types: FurnitureType[];
    coverImage: string;
    images: string[];
    parameters: string[];
    price: number;
    inStock: number;
    sizes: SizeGroup[];
  };
  export type Props = {
    form: Form;
    saving: boolean;
    isEdit: boolean;
  };
  export type Emits = {
    (e: "save"): void;
    (e: "cancel"): void;
  };

  export namespace MaterialItem {
    export type Props = MaterialOption & {
      saving: boolean;
    };
    export type Emits = {
      (e: "update:name", value: string): void;
      (e: "update:image", value: string): void;
      (e: "update:price", value: number): void;
      (e: "update:inStock", value: number): void;
      (e: "delete"): void;
    };
  }
}
