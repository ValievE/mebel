<template>
  <div class="mobile-nav-bar">
    <RouterLink
      v-for="link in navBarLinks"
      :key="link.name"
      exact-active-class="mobile-nav-bar__link_active"
      :to="{ name: link.name }"
    >
      <ButtonComponent type="link" size="s" wide :icon-name="link.icon">
        {{ link.text }}
      </ButtonComponent>
    </RouterLink>
    <ButtonComponent
      v-if="!auth.isAuthenticated"
      type="link"
      size="s"
      wide
      icon-name="user"
      @click="openAccount"
    >
      Кабинет
    </ButtonComponent>
  </div>
</template>

<script setup lang="ts">
import { getNavBarLinks } from "@/common/consts.ts";
import { computed } from "vue";
import { useAuthStore } from "@/stores/use-auth-store.ts";
import ButtonComponent from "@/components/button-component/button-component.vue";
import { PageName } from "@/router/consts.ts";
import { useRouter } from "vue-router";
import { useUiStore } from "@/stores/use-ui-store.ts";

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
.mobile-nav-bar {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 16px;
  width: calc(100% - 24px);
  box-shadow: var(--shadow);
  height: 64px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
