<template>
  <OverlayScrollbarsComponent
    class="scroll-container"
    :options="{ scrollbars: { theme: 'default-theme' } }"
  >
    <div class="scroll-container__custom-class" :class="customClass">
      <slot />
    </div>
  </OverlayScrollbarsComponent>
</template>

<script lang="ts" setup>
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import { type UIComponentsNS } from "@/types/types.ts";

defineProps<UIComponentsNS.ScrollContainer.Props>();
</script>

<style>
.scroll-container {
  height: 100%;
  width: 100%;

  [data-overlayscrollbars-viewport~="overflowYScroll"] {
    overscroll-behavior: auto;
  }
}

.scroll-container__custom-class {
  overscroll-behavior: auto;
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
