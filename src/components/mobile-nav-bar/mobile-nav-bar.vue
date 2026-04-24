<template>
  <div class="mobile-nav-bar">
    <RouterLink
      class="mobile-nav-bar__link"
      exact-active-class="mobile-nav-bar__link_active"
      v-for="link in navBarLinks"
      :key="link.name"
      :to="{ name: link.name }">
      <Icon :size="20" :name="link.icon" />
      {{ link.text }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { navBarLinks } from "@/common/consts.ts";
import Icon from "@/components/icon/icon.vue";
</script>

<style lang="css">
.mobile-nav-bar {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 16px;
  width: calc(100% - 32px);
  box-shadow: var(--shadow);
  height: 64px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 12px 24px;
  max-width: var(--max-width);
  border-radius: 128px;
  background-color: var(--white);
  color: var(--gray-40);
  font-weight: var(--font-weight-medium);
  z-index: 1;
}

.mobile-nav-bar__link {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: var(--transition-color-100);
  user-select: none;
  font-size: var(--font-size-s);
  color: var(--gray-50);

  * {
    color: var(--gray-50);
  }

  &:hover {
    color: var(--gray-90);
  }

  &:active {
    color: var(--gray-60);
  }
}

.mobile-nav-bar__link_active {
  color: var(--gray-90);
  * {
    color: var(--gray-90);
  }
}

@media screen and (min-width: 769px) {
  .mobile-nav-bar {
    display: none;
  }
}
</style>
