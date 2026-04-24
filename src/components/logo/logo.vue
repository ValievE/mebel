<template>
  <img
    src="/logo.svg"
    class="logo"
    :class="customClass"
  />
</template>

<script setup lang="ts">
  import type { UIComponentsNS } from '@/types/types.ts';

  const { size } = withDefaults(defineProps<{ size: UIComponentsNS.Size }>(), {
    size: 'm',
  });

  const customClass = `logo-${size}`;
</script>

<style lang="css">
  .logo {
    max-width: 100%;
    height: 100%;
    width: auto;
  }
  .logo-s {
    max-height: 58px;
  }
  .logo-m {
    max-height: 76px;
  }
  .logo-l {
    max-height: 92px;
  }
  .logo-xl {
    max-height: 128px;
  }
</style>
