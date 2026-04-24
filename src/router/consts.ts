import type { RouteRecordRaw } from 'vue-router';

export enum LayoutName {
  Main = 'main',
  Narrow = 'narrow',
  Wide = 'wide',
}

export enum PageName {
  Home = 'home',
  Catalogue = 'catalogue',
  Delivery = 'delivery',
}

export const Routes = {
  [LayoutName.Narrow]: {
    name: LayoutName.Narrow,
    path: '',
    component: () => import('@/layouts/narrow-layout/narrow-layout.vue'),
  },
  [LayoutName.Wide]: {
    name: LayoutName.Wide,
    path: '',
    component: () => import('@/layouts/wide-layout/wide-layout.vue'),
  },
  [PageName.Home]: {
    name: PageName.Home,
    path: '',
    component: () => import('@/pages/homepage/homepage.vue'),
  },
  [PageName.Catalogue]: {
    name: PageName.Catalogue,
    path: 'catalogue',
    component: () => import('@/pages/catalogue/catalogue.vue'),
  },
  [PageName.Delivery]: {
    name: PageName.Delivery,
    path: 'delivery',
    component: () => import('@/pages/delivery/delivery.vue'),
  },
} satisfies Record<string, RouteRecordRaw>;
