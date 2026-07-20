import type { RouteRecordRaw } from "vue-router";

export enum LayoutName {
  Narrow = "narrow",
  Wide = "wide",
  Cabinet = "cabinet"
}

export enum PageName {
  Home = "home",
  Catalog = "catalog",
  Delivery = "delivery",
  Orders = "orders",
  Settings = "settings",
  Backoffice = "backoffice",
  BackofficeItem = "backoffice-item",
  NotFound = "not-found",
  Legal = "legal"
}

export const BACKOFFICE_CREATE_ID = "new";

export const Routes = {
  [LayoutName.Narrow]: {
    name: LayoutName.Narrow,
    path: "/",
    component: () => import("@/layouts/narrow-layout/narrow-layout.vue")
  },
  [LayoutName.Wide]: {
    name: LayoutName.Wide,
    path: "/",
    component: () => import("@/layouts/wide-layout/wide-layout.vue")
  },
  [PageName.Home]: {
    name: PageName.Home,
    path: "/",
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
  [LayoutName.Cabinet]: {
    name: LayoutName.Cabinet,
    path: "cabinet",
    component: () => import("@/layouts/cabinet-layout/cabinet-layout.vue"),
    meta: { requiresAuth: true }
  },
  [PageName.Orders]: {
    name: PageName.Orders,
    path: "orders",
    component: () => import("@/pages/orders/orders.vue")
  },
  [PageName.Settings]: {
    name: PageName.Settings,
    path: "settings",
    component: () => import("@/pages/settings/settings.vue")
  },
  [PageName.Backoffice]: {
    name: PageName.Backoffice,
    path: "backoffice",
    component: () => import("@/pages/backoffice-list/backoffice.vue"),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  [PageName.BackofficeItem]: {
    name: PageName.BackofficeItem,
    path: "backoffice/:id",
    component: () => import("@/pages/backoffice-form/backoffice-form.vue"),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  [PageName.NotFound]: {
    name: PageName.NotFound,
    path: "/:pathMatch(.*)*",
    redirect: {
      name: PageName.Home
    }
  },
  [PageName.Legal]: {
    name: PageName.Legal,
    path: "legal/:id",
    component: () => import("@/pages/legal/legal.vue")
  }
} satisfies Record<string, RouteRecordRaw>;
