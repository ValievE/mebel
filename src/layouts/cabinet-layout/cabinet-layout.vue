<template>
  <div class="cabinet-layout">
    <div class="cabinet-layout__page">
      <h1 class="cabinet-layout__page-title">{{ layoutStore.title }}</h1>
      <div class="cabinet-layout__page-scroll">
        <ScrollContainer>
          <RouterView />
        </ScrollContainer>
      </div>
    </div>
    <div class="cabinet-layout__sidebar">
      <CabinetSidebar :props="sidebar" @logout="onLogout" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/use-auth-store.ts";
import { PageName } from "@/router/consts.ts";
import ScrollContainer from "@/components/scroll-container/scroll-container.vue";
import CabinetSidebar from "@/layouts/cabinet-layout/components/cabinet-sidebar/cabinet-sidebar.vue";
import { reactive } from "vue";
import { type CabinetSidebarNS } from "@/layouts/cabinet-layout/components/cabinet-sidebar/types.ts";
import { useCabinetLayout } from "@/stores/use-cabinet-layout.ts";

const auth = useAuthStore();
const router = useRouter();
const layoutStore = useCabinetLayout();

const sidebar: CabinetSidebarNS.Props = reactive({
  userName: auth.user
    ? `${auth.user.first_name} ${auth.user.last_name}`.trim()
    : "",
  items: [
    {
      id: "orders",
      route: PageName.Orders,
      title: "Заказы"
    },
    {
      id: "settings",
      route: PageName.Settings,
      title: "Настройки"
    }
  ],
  loading: false
});

async function onLogout() {
  await auth.logout();
  await router.push({ name: PageName.Catalog });
}
</script>

<style lang="css">
.cabinet-layout {
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: var(--header-height);
  position: relative;
}
.cabinet-layout__page {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.cabinet-layout__page-scroll {
  flex-grow: 1;
  overflow: hidden;
  border-radius: 24px;
}
.cabinet-layout__page-title {
  font-size: var(--font-size-xl);
  line-height: var(--line-height-xl);
  font-weight: var(--font-weight-semibold);
}
.cabinet-layout__sidebar {
  width: 280px;
  height: 100%;
}
@media screen and (max-width: 768px) {
  .cabinet-layout {
    padding-top: var(--header-height);
    flex-direction: column;
  }
  .cabinet-layout__page {
    height: 40%;
  }
  .cabinet-layout__sidebar {
    width: 100%;
    height: fit-content;
    padding-bottom: var(--footer-height);
  }
}
</style>
