import { PageName } from "@/router/consts.ts";
import { type UIComponentsNS } from "@/types/types.ts";

export const navBarLinks: Array<{
  text: string;
  name: PageName;
  icon: UIComponentsNS.Icon.Names;
}> = [
  { text: "Главная", name: PageName.Home, icon: "logo-outline" },
  { text: "Каталог", name: PageName.Catalogue, icon: "catalog" },
  { text: "Доставка", name: PageName.Delivery, icon: "delivery" }
];
