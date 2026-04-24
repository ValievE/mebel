<template>
  <svg
    class="icon"
    :width="size"
    :height="size"
    role="img"
  >
    <use :href="`/sprite.svg#icon-${name}`"></use>
  </svg>
</template>

<script setup lang="ts">
  import type { UIComponentsNS } from '@/types/types.ts';

  const { size, name } = withDefaults(defineProps<UIComponentsNS.Icon.Props>(), {
    size: 24,
  });
</script>

<style scoped>
  .icon {
    transition: var(--transition-color-100);
  }
</style>
