<template>
  <div class="cabinet-sidebar">
    <p class="cabinet-layout__title">
      Здравствуйте, <br />
      <strong>{{ props.userName }}</strong>
    </p>
    <div class="cabinet-sidebar__links">
      <ScrollContainer class="cabinet-sidebar__links-scroll">
        <div class="cabinet-sidebar__links-items">
          <RouterLink
            v-for="link in props.items"
            :key="link.id"
            class="cabinet-sidebar__links-item"
            exact-active-class="cabinet-sidebar__links-item_active"
            :to="{ name: link.route }"
          >
            {{ link.title }}
          </RouterLink>
          <ButtonComponent
            class="cabinet-sidebar__links-button"
            type="red"
            @click="$emit('logout')"
          >
            Выйти
          </ButtonComponent>
        </div>
      </ScrollContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type CabinetSidebarNS } from "@/layouts/cabinet-layout/components/cabinet-sidebar/types.ts";
import ButtonComponent from "@/components/button-component/button-component.vue";
import { useUiStore } from "@/stores/use-ui-store.ts";
import ScrollContainer from "@/components/scroll-container/scroll-container.vue";

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
.cabinet-sidebar__links-item:not(:last-of-type) {
  border-bottom: 1px solid var(--gray-10);
}
.cabinet-sidebar__links-button {
  margin: 12px auto 0;
  width: calc(100% - 24px);
}
@media screen and (max-width: 768px) {
  .cabinet-sidebar {
    padding: 16px;
  }
  .cabinet-layout__title {
    padding: 0;
    width: 100%;

    br {
      display: none;
    }
  }
  .cabinet-sidebar__links {
    width: 100%;
    padding: 16px 0 0;
  }
  .cabinet-sidebar__links-scroll {
    border-radius: 16px;
  }
  .cabinet-sidebar__links-items {
    display: flex;
    gap: 8px;
  }
  .cabinet-sidebar__links-item {
    padding: 10px 16px;
    background-color: var(--gray-10);
    border-radius: 128px;
    text-align: center;
    width: fit-content;
    border-bottom: none;
  }
  .cabinet-sidebar__links-item_active {
    color: var(--gray-70);
    background-color: var(--gray-20);
    &:hover {
      background-color: var(--gray-20);
    }
  }
  .cabinet-sidebar__links-button {
    margin: 0;
    width: fit-content;
  }
}
</style>
