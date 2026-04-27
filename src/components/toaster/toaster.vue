<template>
  <div class="toaster">
    <div class="toaster__list">
      <TransitionGroup name="slide-upside-down">
        <Toast
          v-for="toast in toasts"
          :key="toast.id"
          :props="toast"
          @close="$emit('delete', $event)"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import Toast from "@/components/toaster/toast.vue";
import type { UIComponentsNS } from "@/types/types.ts";

defineProps<UIComponentsNS.Toaster.Props>();
defineEmits<UIComponentsNS.Toaster.Emits>();
</script>

<style lang="css">
.toaster {
  width: 0;
  height: 0;
  z-index: 11;
}
.toaster__list {
  position: fixed;
  top: 32px;
  right: 24px;
  width: 320px;
  max-width: 100%;
  height: fit-content;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
