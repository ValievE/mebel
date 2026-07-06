import { FurnitureType } from "@/types/types.ts";

export namespace BackofficeNS {
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

  export type ItemFormProps = {
    form: Form;
    saving: boolean;
    isEdit: boolean;
  };

  export type ItemFormEmits = {
    (e: "save"): void;
    (e: "cancel"): void;
  };
}
