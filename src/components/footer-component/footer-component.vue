<template>
  <footer
    class="footer-component"
    :class="{
      'footer-component_absolute': absolute
    }"
  >
    <div class="footer-component__links">
      <RouterLink
        v-for="link in links"
        :key="link.id"
        class="footer-component__links-item"
        active-class="footer-component__links-item_active"
        :to="{ name: PageName.Legal, params: { id: link.id } }"
      >
        {{ link.name }}
      </RouterLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { PageName } from "@/router/consts.ts";
import { DocumentsTypeRoute } from "@/types/types.ts";

defineProps<{
  absolute?: boolean;
}>();

const links = [
  {
    name: "Политика конфиденциальности",
    id: DocumentsTypeRoute.Privacy
  },
  {
    name: "Согласие на обработку персональных данных",
    id: DocumentsTypeRoute.Data
  }
];
</script>

<style lang="css">
.footer-component {
  margin: 0 auto;
  padding: 12px 0;
  width: calc(100% - 32px);
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  background-color: var(--white);
  color: var(--gray-40);
  font-weight: var(--font-weight-medium);
  z-index: 1;
  user-select: none;
}
.footer-component_absolute {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 128px;
  padding: 12px 88px;
}

.footer-component__links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
}

.footer-component__links-item {
  text-decoration: none;
  transition: var(--transition-color-100);
  color: var(--gray-50);
  user-select: none;
  cursor: pointer;

  &:hover {
    color: var(--gray-90);
  }

  &:active {
    color: var(--gray-60);
  }
}

.footer-component__links-item_active {
  color: var(--gray-90);
}

@media screen and (max-width: 768px) {
  .footer-component {
    justify-content: center;
    padding: 16px 24px;
    box-shadow: none;
    width: calc(100% - 32px);
    max-width: 100%;
    height: 80px;
    top: 8px;
  }

  .footer-component__links {
    display: none;
  }
}
</style>
