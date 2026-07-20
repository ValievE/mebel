export namespace SizeSelectorNS {
  export type Option = {
    id: string;
    label: string;
  };
  export type Props = {
    modelValue: string;
    options: Option[];
  };
  export type Emits = {
    (e: "update:modelValue", value: string): void;
  };
}
