<template>
  <div class="main-wrapper">
    <RouterView />
  </div>
  <MobileNavBar />
</template>
<script setup lang="ts">
import { useUiStore } from "@/stores/use-ui-store.ts";
import { onMounted } from "vue";
import MobileNavBar from "@/components/mobile-nav-bar/mobile-nav-bar.vue";

const uiStore = useUiStore();

onMounted(() => {
  window.addEventListener("resize", () => {
    uiStore.isMobile = window.innerWidth <= 768;
  });
});
</script>
