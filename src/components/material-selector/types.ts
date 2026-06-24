export namespace MaterialSelectorNS {
  export type Option = {
    id: string;
    name: string;
    url: string;
  };
  export type Props = {
    modelValue: string;
    options: Option[];
  };
  export type Emits = {
    (e: "update:modelValue", value: string): void;
  };
}
