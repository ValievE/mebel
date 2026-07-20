<template>
  <div
    class="tumbler"
    :class="{
      tumbler_active: modelValue,
      tumbler_disabled: disabled
    }"
    @click="clickHandler"
  >
    <div class="tumbler-track"></div>
  </div>
</template>

<script setup lang="ts">
import { type UIComponentsNS } from "@/types/types.ts";

const props = defineProps<UIComponentsNS.Tumbler.Props>();
const emit = defineEmits<UIComponentsNS.Tumbler.Emits>();

const clickHandler = () => {
  if (props.disabled) return;
  emit("update:modelValue", !props.modelValue);
};
</script>

<style lang="css">
.tumbler {
  width: 48px;
  height: 24px;
  background-color: var(--gray-20);
  border-radius: 24px;
  padding: 4px;
  cursor: pointer;
  transition: var(--transition-bg-color-100);
  flex-shrink: 0;
}
.tumbler:hover {
  background-color: var(--gray-30);
  &.tumbler_active {
    background-color: var(--red-70);
  }
}
.tumbler-track {
  height: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--white);
  transition: var(--transition-transform-100), var(--transition-bg-color-100);
}
.tumbler_active {
  background-color: var(--red-50);
  .tumbler-track {
    transform: translateX(24px);
    background-color: var(--red-10);
  }
}

.tumbler_disabled {
  background-color: var(--gray-10);
  cursor: not-allowed;
  pointer-events: none;
  &.tumbler_active {
    background-color: var(--red-20);
    .tumbler-track {
      background-color: var(--white);
    }
  }
}
</style>
