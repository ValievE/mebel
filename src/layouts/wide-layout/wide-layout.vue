<template>
  <div class="wide-layout">
    <HeaderComponent class="wide-layout__header" />
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import HeaderComponent from "@/components/header-component/header-component.vue";
</script>

<style lang="css">
.wide-layout {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wide-layout__header {
  max-width: var(--max-width);
}
</style>
