import { type FurnitureType, UIComponentsNS } from "@/types/types.ts";

export namespace HomepageNavigatorNS {
  export type Item = {
    id: FurnitureType;
    name: string;
    description: string;
    icon: UIComponentsNS.Icon.Names;
    image: string;
  };
}
