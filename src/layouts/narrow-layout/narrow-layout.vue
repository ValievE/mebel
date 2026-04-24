<template>
  <div class="narrow-layout">
    <HeaderComponent />
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import HeaderComponent from "@/components/header-component/header-component.vue";
</script>

<style lang="css">
.narrow-layout {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
