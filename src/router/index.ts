import { createRouter, createWebHistory } from "vue-router";
import { LayoutName, PageName, Routes } from "@/router/consts.ts";
import { useAuthStore } from "@/stores/use-auth-store.ts";

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
        },
        {
          name: Routes[LayoutName.Cabinet].name,
          path: Routes[LayoutName.Cabinet].path,
          component: Routes[LayoutName.Cabinet].component,
          meta: Routes[LayoutName.Cabinet].meta,
          beforeEnter: (to, _, next) => {
            if (to.name === LayoutName.Cabinet) {
              next({ name: PageName.Orders });
              return;
            }
            next();
          },
          children: [
            {
              name: Routes[PageName.Orders].name,
              path: Routes[PageName.Orders].path,
              component: Routes[PageName.Orders].component
            },
            {
              name: Routes[PageName.Settings].name,
              path: Routes[PageName.Settings].path,
              component: Routes[PageName.Settings].component
            }
          ]
        },
        {
          name: Routes[PageName.Legal].name,
          path: Routes[PageName.Legal].path,
          component: Routes[PageName.Legal].component
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

router.beforeEach(async (to, _from, next) => {
  const auth = useAuthStore();
  if (!auth.bootstrapped) {
    await auth.bootstrap();
  }

  const requiresAuth = to.matched.some(
    record => record.meta.requiresAuth === true
  );
  if (requiresAuth && !auth.isAuthenticated) {
    next({ name: PageName.Catalog });
    return;
  }
  next();
});

export default router;
