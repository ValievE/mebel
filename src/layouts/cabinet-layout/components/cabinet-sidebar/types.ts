import { PageName } from "@/router/consts.ts";

export namespace CabinetSidebarNS {
  export type Item = {
    id: string;
    title: string;
    route: PageName;
  };
  export type Props = {
    userName: string;
    loading: boolean;
    items: Item[];
  };
  export type Emits = {
    (e: "logout"): void;
  };
}
