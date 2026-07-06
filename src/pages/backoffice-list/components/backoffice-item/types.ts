export namespace BackofficeItemNS {
  export type Props = {
    id: string;
    preview: string;
    title: string;
    article: string;
    types: string;
    price: number;
  };
  export type Emits = {
    (e: "edit", id: string): void;
    (e: "delete", id: string): void;
  };
}
