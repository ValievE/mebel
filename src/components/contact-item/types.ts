import { Contacts } from "@/types/types.ts";

export namespace ContactItemNS {
  export type Props = {
    type: Contacts;
  };
  export type Emits = {
    (e: "select", id: Contacts): void;
  };
}
