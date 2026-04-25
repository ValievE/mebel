<template>
  <div class="overlay"></div>
  <HeaderComponent />
  <RouterView />
  <MobileNavBar />
</template>
<script setup lang="ts">
import { useUiStore } from "@/stores/use-ui-store.ts";
import { onMounted } from "vue";
import MobileNavBar from "@/components/mobile-nav-bar/mobile-nav-bar.vue";
import HeaderComponent from "@/components/header-component/header-component.vue";

const uiStore = useUiStore();

onMounted(() => {
  window.addEventListener("resize", () => {
    uiStore.isMobile = window.innerWidth <= 768;
  });
});
</script>
