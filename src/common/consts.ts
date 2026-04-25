import { PageName } from "@/router/consts.ts";
import { FurnitureType, type UIComponentsNS } from "@/types/types.ts";

export const navBarLinks: Array<{
  text: string;
  name: PageName;
  icon: UIComponentsNS.Icon.Names;
}> = [
  { text: "Главная", name: PageName.Home, icon: "logo-outline" },
  { text: "Каталог", name: PageName.Catalog, icon: "catalog" },
  { text: "Доставка", name: PageName.Delivery, icon: "delivery" }
];

export const furnitureName: Record<FurnitureType, string> = {
  [FurnitureType.Kitchen]: "Кухня",
  [FurnitureType.Bathroom]: "Ванная",
  [FurnitureType.Bedroom]: "Спальня",
  [FurnitureType.LivingRoom]: "Гостиная",
  [FurnitureType.Wardrobe]: "Шкаф-купе",
  [FurnitureType.Other]: "Прочая мебель"
};
