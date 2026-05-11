<template>
  <div class="overlay"></div>
  <Toaster :toasts="uiStore.toasts" @delete="uiStore.removeToast" />
  <HeaderComponent />
  <LoginPopup @success="onLoginSuccess" />
  <RouterView />
  <MobileNavBar />
</template>
<script setup lang="ts">
import { useUiStore } from "@/stores/use-ui-store.ts";
import { nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";
import MobileNavBar from "@/components/mobile-nav-bar/mobile-nav-bar.vue";
import HeaderComponent from "@/components/header-component/header-component.vue";
import LoginPopup from "@/components/login-popup/login-popup.vue";
import Toaster from "@/components/toaster/toaster.vue";
import { PageName } from "@/router/consts.ts";

const uiStore = useUiStore();
const router = useRouter();

async function onLoginSuccess() {
  await nextTick();
  await router.push({ name: PageName.Cabinet });
}

onMounted(() => {
  window.addEventListener("resize", () => {
    uiStore.isMobile = window.innerWidth <= 768;
  });
});
</script>
