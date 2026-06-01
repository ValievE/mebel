<template>
  <div class="overlay"></div>
  <Toaster :toasts="uiStore.toasts" @delete="uiStore.removeToast" />
  <HeaderComponent />
  <LoginPopup />
  <div class="app-content">
    <RouterView />
  </div>
  <MobileNavBar />
  <FooterComponent :absolute="isFooterAbsolute" />
</template>
<script setup lang="ts">
import { useUiStore } from "@/stores/use-ui-store.ts";
import { computed, onMounted } from "vue";
import MobileNavBar from "@/components/mobile-nav-bar/mobile-nav-bar.vue";
import HeaderComponent from "@/components/header-component/header-component.vue";
import LoginPopup from "@/widgets/login-popup/login-popup.vue";
import Toaster from "@/components/toaster/toaster.vue";
import FooterComponent from "@/components/footer-component/footer-component.vue";
import { useRoute } from "vue-router";
import { LayoutName } from "@/router/consts.ts";

const uiStore = useUiStore();
const route = useRoute();

const isFooterAbsolute = computed(() =>
  route.matched.some(i => i.name === LayoutName.Wide)
);

onMounted(() => {
  window.addEventListener("resize", () => {
    uiStore.isMobile = window.innerWidth <= 768;
  });
});
</script>
