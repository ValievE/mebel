<template>
  <footer
    class="footer-component"
    :class="{
      'footer-component_absolute': absolute
    }"
  >
    <RouterLink
      v-for="link in documentLinks"
      :key="link.id"
      class="footer-component-item"
      active-class="footer-component-item_active"
      :to="{ name: PageName.Legal, params: { id: link.id } }"
    >
      {{ link.name }}
    </RouterLink>
    <span
      class="footer-component-item"
      @click="uiStore.openPopup('social-media-popup')"
    >
      Контакты
    </span>
  </footer>
</template>

<script setup lang="ts">
import { PageName } from "@/router/consts.ts";
import { documentLinks } from "@/common/consts.ts";
import { useUiStore } from "@/stores/use-ui-store.ts";

const uiStore = useUiStore();

defineProps<{
  absolute?: boolean;
}>();
</script>

<style lang="css">
.footer-component {
  margin: 0 auto;
  padding: 12px 0;
  height: fit-content;
  display: flex;
  align-items: center;
  max-width: var(--max-width);
  background-color: var(--white);
  color: var(--gray-40);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
  z-index: 1;
  user-select: none;
  justify-content: start;
  gap: 12px 48px;
  width: 100%;
  flex-wrap: wrap;
}
.footer-component_absolute {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 128px;
  padding: 8px 32px;
  width: calc(100% - 32px);
  justify-content: center;
  box-shadow: var(--shadow);
}

.footer-component-item {
  text-decoration: none;
  transition: var(--transition-color-100);
  color: var(--gray-50);
  user-select: none;
  cursor: pointer;
  width: fit-content;
  white-space: nowrap;

  &:hover {
    color: var(--gray-90);
  }

  &:active {
    color: var(--gray-60);
  }
}

.footer-component-item_active {
  color: var(--gray-90);
}

@media screen and (max-width: 768px) {
  .footer-component {
    display: none;
  }
}
</style>
