<template>
  <header class="header-component">
    <Logo size="m" />
    <div class="header-component__links">
      <RouterLink
        v-for="link in navBarLinks"
        :key="link.name"
        class="header-component__links-item"
        active-class="header-component__links-item_active"
        :to="{ name: link.name }"
      >
        {{ link.text }}
      </RouterLink>
      <p
        v-if="!auth.isAuthenticated"
        class="header-component__links-item"
        @click="openAccount"
      >
        Кабинет
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Logo from "@/components/logo/logo.vue";
import { useAuthStore } from "@/stores/use-auth-store.ts";
import { useUiStore } from "@/stores/use-ui-store.ts";
import { PageName } from "@/router/consts.ts";
import { getNavBarLinks } from "@/common/consts.ts";
import { computed } from "vue";

const auth = useAuthStore();
const ui = useUiStore();
const router = useRouter();

const navBarLinks = computed(() => getNavBarLinks(auth.isAuthenticated));

function openAccount() {
  if (auth.isAuthenticated) {
    router.push({ name: PageName.Orders });
    return;
  }
  ui.openPopup("login");
}
</script>

<style lang="css">
.header-component {
  width: calc(100% - 32px);
  box-shadow: var(--shadow);
  height: 100px;
  display: flex;
  position: absolute;
  left: 50%;
  top: 32px;
  transform: translateX(-50%);
  align-items: center;
  justify-content: space-between;
  padding: 12px 88px;
  max-width: var(--max-width);
  border-radius: 128px;
  background-color: var(--white);
  color: var(--gray-40);
  font-weight: var(--font-weight-medium);
  z-index: 1;
  user-select: none;
}

.header-component__links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
}

.header-component__links-item {
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

.header-component__links-item_active {
  color: var(--gray-90);
}

@media screen and (max-width: 768px) {
  .header-component {
    justify-content: space-between;
    padding: 16px 24px;
    box-shadow: none;
    width: calc(100% - 32px);
    max-width: 100%;
    height: 80px;
  }

  .header-component__links {
    display: none;
  }
}
</style>
