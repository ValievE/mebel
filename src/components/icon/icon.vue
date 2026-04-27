<template>
  <div class="icon">
    <svg :width="size" :height="size" role="img">
      <use :href="`${baseUrl}sprite.svg#icon-${name}`"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { UIComponentsNS } from "@/types/types.ts";

const baseUrl = import.meta.env.BASE_URL;

const { size = 24, name } = defineProps<UIComponentsNS.Icon.Props>();
</script>

<style scoped>
.icon {
  transition: var(--transition-color-100);
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-shrink: 0;
}
</style>
