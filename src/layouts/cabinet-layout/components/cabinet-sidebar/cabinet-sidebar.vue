<template>
  <div class="cabinet-sidebar">
    <p class="cabinet-layout__title">
      Здравствуйте, <br />
      <strong>{{ props.userName }}</strong>
    </p>
    <div class="cabinet-sidebar__links">
      <RouterLink
        v-for="link in props.items"
        :key="link.id"
        class="cabinet-sidebar__links-item"
        exact-active-class="cabinet-sidebar__links-item_active"
        :to="{ name: link.route }"
      >
        {{ link.title }}
      </RouterLink>
    </div>
    <footer class="cabinet-cabinet-sidebar__footer">
      <ButtonComponent
        class="cabinet-cabinet-sidebar__footer-button"
        wide
        type="red"
        @click="$emit('logout')"
      >
        Выйти
      </ButtonComponent>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { type CabinetSidebarNS } from "@/layouts/cabinet-layout/components/cabinet-sidebar/types.ts";
import ButtonComponent from "@/components/button-component/button-component.vue";
import { useUiStore } from "@/stores/use-ui-store.ts";

defineProps<{ props: CabinetSidebarNS.Props }>();
defineEmits<CabinetSidebarNS.Emits>();

const UIStore = useUiStore();
</script>

<style lang="css">
.cabinet-sidebar {
  width: 100%;
  height: fit-content;
  overflow: auto;
  border-radius: 24px;
  background-color: var(--white);
  box-shadow: var(--shadow);
}
.cabinet-layout__title {
  padding: 24px 24px 0;
}
.cabinet-sidebar__links {
  padding: 16px 0;
}
.cabinet-sidebar__links-item {
  width: 100%;
  display: block;
  padding: 16px 24px;
  transition: var(--transition-bg-color-100);
  color: var(--gray-50);
  font-weight: var(--font-weight-medium);

  &:hover {
    background-color: var(--gray-10);
  }
}
.cabinet-sidebar__links-item_active {
  color: var(--gray-70);
}
.cabinet-sidebar__links-item:not(:last-child) {
  border-bottom: 1px solid var(--gray-10);
}
.cabinet-cabinet-sidebar__footer {
  padding: 0 24px 24px;
}
@media screen and (max-width: 768px) {
  .cabinet-sidebar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 48px;
    align-items: center;
    justify-items: center;
    gap: 4px;
    padding: 16px;
  }
  .cabinet-layout__title {
    grid-column: 1/-1;
    padding: 0;
    width: 100%;

    br {
      display: none;
    }
  }
  .cabinet-sidebar__links {
    grid-column: 1/3;
    width: 100%;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .cabinet-sidebar__links-item {
    background-color: var(--gray-10);
    border-radius: 128px;
    text-align: center;
  }
  .cabinet-sidebar__links-item:not(:last-child) {
    border-bottom: none;
  }
  .cabinet-sidebar__links-item_active {
    color: var(--gray-70);
    background-color: var(--gray-20);
    &:hover {
      background-color: var(--gray-20);
    }
  }
  .cabinet-cabinet-sidebar__footer {
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .cabinet-cabinet-sidebar__footer-button {
    height: 100%;
  }
}
</style>
