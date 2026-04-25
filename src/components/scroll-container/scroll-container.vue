<template>
  <OverlayScrollbarsComponent
    class="scroll-container"
    :options="{ scrollbars: { theme: 'default-theme', autoHide: 'leave' } }"
  >
    <slot />
  </OverlayScrollbarsComponent>
</template>

<script lang="ts" setup>
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
</script>

<style>
.scroll-container {
  height: 100%;
  width: 100%;

  [data-overlayscrollbars-viewport~="overflowYScroll"] {
    overscroll-behavior: auto;
  }
}

.default-theme {
  --os-size: 5px;
  --os-padding-perpendicular: 10px;
  --os-handle-border-radius: 15px;
  --os-padding-axis: 10px;
  --os-handle-bg: var(--red-50);
  --os-handle-bg-hover: var(--red-30);
  --os-handle-bg-active: var(--red-70);
  --os-handle-min-size: 100px;
  --os-handle-max-size: 200px;
  --os-handle-perpendicular-size: 5px;
  --os-handle-perpendicular-size-hover: 15px;
  --os-handle-perpendicular-size-active: 15px;
  --os-handle-interactive-area-offset: 0;
}
</style>
