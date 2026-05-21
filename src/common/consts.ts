import { LayoutName, PageName } from "@/router/consts.ts";
import {
  type ErrorType,
  FurnitureType,
  type NavBarLink
} from "@/types/types.ts";

export const getNavBarLinks = (isLoggedIn: boolean): NavBarLink[] => {
  const links: NavBarLink[] = [
    { text: "Главная", name: PageName.Home, icon: "logo-outline" },
    { text: "Каталог", name: PageName.Catalog, icon: "catalog" },
    { text: "Доставка", name: PageName.Delivery, icon: "delivery" }
  ];
  if (isLoggedIn)
    links.push({ text: "Кабинет", name: LayoutName.Cabinet, icon: "user" });
  return links;
};

export const furnitureName: Record<FurnitureType, string> = {
  [FurnitureType.Kitchen]: "Кухня",
  [FurnitureType.Bathroom]: "Ванная",
  [FurnitureType.Bedroom]: "Спальня",
  [FurnitureType.LivingRoom]: "Гостиная",
  [FurnitureType.Wardrobe]: "Шкаф-купе",
  [FurnitureType.Other]: "Прочая мебель"
};

export const getErrorText = (e: ErrorType) =>
  e.response?.data?.error?.message || "Ошибка сервера";
