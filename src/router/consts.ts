import type { RouteRecordRaw } from "vue-router";

export enum LayoutName {
  Narrow = "narrow",
  Wide = "wide"
}

export enum PageName {
  Home = "home",
  Catalog = "catalog",
  Delivery = "delivery",
  NotFound = "not-found"
}

export const Routes = {
  [LayoutName.Narrow]: {
    name: LayoutName.Narrow,
    path: "",
    component: () => import("@/layouts/narrow-layout/narrow-layout.vue")
  },
  [LayoutName.Wide]: {
    name: LayoutName.Wide,
    path: "",
    component: () => import("@/layouts/wide-layout/wide-layout.vue")
  },
  [PageName.Home]: {
    name: PageName.Home,
    path: "",
    component: () => import("@/pages/homepage/homepage.vue")
  },
  [PageName.Catalog]: {
    name: PageName.Catalog,
    path: "catalog",
    component: () => import("@/pages/catalog/catalog.vue")
  },
  [PageName.Delivery]: {
    name: PageName.Delivery,
    path: "delivery",
    component: () => import("@/pages/delivery/delivery.vue")
  },
  [PageName.NotFound]: {
    name: PageName.NotFound,
    path: "/:pathMatch(.*)*",
    redirect: {
      name: PageName.Home
    }
  }
} satisfies Record<string, RouteRecordRaw>;
