<template>
  <div class="overlay"></div>
  <Toaster :toasts="uiStore.toasts" @delete="uiStore.removeToast" />
  <HeaderComponent />
  <LoginPopup />
  <RouterView />
  <MobileNavBar />
</template>
<script setup lang="ts">
import { useUiStore } from "@/stores/use-ui-store.ts";
import { onMounted } from "vue";
import MobileNavBar from "@/components/mobile-nav-bar/mobile-nav-bar.vue";
import HeaderComponent from "@/components/header-component/header-component.vue";
import LoginPopup from "@/widgets/login-popup/login-popup.vue";
import Toaster from "@/components/toaster/toaster.vue";

const uiStore = useUiStore();

onMounted(() => {
  window.addEventListener("resize", () => {
    uiStore.isMobile = window.innerWidth <= 768;
  });
});
</script>
