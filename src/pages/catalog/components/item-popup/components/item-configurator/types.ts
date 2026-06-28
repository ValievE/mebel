import type { SizeSelectorNS } from "@/components/size-selector/types.ts";
import type { MaterialSelectorNS } from "@/components/material-selector/types.ts";

export namespace ItemConfiguratorNS {
  export type Value = {
    size: string;
    material: string;
  };
  export type Options = {
    size: SizeSelectorNS.Option[];
    material: MaterialSelectorNS.Option[];
  };
  export type Props = {
    options: Options;
    modelValue: Value;
  };
  export type Emits = {
    (e: "update:size", item: string): void;
    (e: "update:material", item: string): void;
  };
}
