import { createRouter, createWebHistory } from "vue-router";
import { LayoutName, PageName, Routes } from "@/router/consts.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: Routes[LayoutName.Wide].name,
      path: Routes[LayoutName.Wide].path,
      component: Routes[LayoutName.Wide].component,
      children: [
        {
          name: Routes[PageName.Home].name,
          path: Routes[PageName.Home].path,
          component: Routes[PageName.Home].component
        },
        {
          name: Routes[PageName.Delivery].name,
          path: Routes[PageName.Delivery].path,
          component: Routes[PageName.Delivery].component
        }
      ]
    },
    {
      name: Routes[LayoutName.Narrow].name,
      path: Routes[LayoutName.Narrow].path,
      component: Routes[LayoutName.Narrow].component,
      children: [
        {
          name: Routes[PageName.Catalog].name,
          path: Routes[PageName.Catalog].path,
          component: Routes[PageName.Catalog].component
        }
      ]
    },
    {
      name: Routes[PageName.NotFound].name,
      path: Routes[PageName.NotFound].path,
      redirect: Routes[PageName.NotFound].redirect
    }
  ]
});

export default router;
