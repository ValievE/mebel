import { LayoutName, PageName } from "@/router/consts.ts";
import {
  CatalogSort,
  DocumentsTypeRoute,
  type ErrorType,
  FurnitureType,
  type NavBarLink
} from "@/types/types.ts";

export enum SSNames {
  AccessToken = "mebel_access_token",
  CheckoutCart = "mebel_checkout_cart"
}

export enum LSNames {}

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

export const furnitureName: Record<
  FurnitureType,
  { long: string; short: string }
> = {
  [FurnitureType.Kitchen]: { short: "Кухня", long: "Мебель для кухни" },
  [FurnitureType.Bathroom]: { short: "Ванная", long: "Мебель для ванной" },
  [FurnitureType.Bedroom]: { short: "Спальня", long: "Мебель для спальни" },
  [FurnitureType.LivingRoom]: {
    short: "Гостиная",
    long: "Мебель для гостиной"
  },
  [FurnitureType.Wardrobe]: { short: "Шкаф-купе", long: "Шкафы-купе" },
  [FurnitureType.Other]: { short: "Прочая мебель", long: "Прочая мебель" }
};

export const getErrorText = (e: ErrorType) =>
  e.response?.data?.error?.message || "Ошибка сервера";

export const documentLinks: { name: string; id: DocumentsTypeRoute }[] = [
  {
    name: "Политика конфиденциальности",
    id: DocumentsTypeRoute.Privacy
  },
  {
    name: "Публичная оферта",
    id: DocumentsTypeRoute.Offer
  },
  {
    name: "Правила возврата и обмена товаров",
    id: DocumentsTypeRoute.Return
  },
  {
    name: "Реквизиты",
    id: DocumentsTypeRoute.Details
  }
];

export const debounce = <T extends (...arg: any[]) => any>(
  func: T,
  timeout = 500
): ((...arg: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...arg: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...arg);
    }, timeout);
  };
};

export const stringToFurnitureType = (value: string): FurnitureType | null => {
  for (const key of Object.keys(FurnitureType)) {
    if (FurnitureType[key as keyof typeof FurnitureType] === value) {
      return FurnitureType[key as keyof typeof FurnitureType];
    }
  }
  return null;
};

export const stringToCatalogSort = (value: string): CatalogSort | null => {
  for (const key of Object.keys(CatalogSort)) {
    if (CatalogSort[key as keyof typeof CatalogSort] === value) {
      return CatalogSort[key as keyof typeof CatalogSort];
    }
  }
  return null;
};
