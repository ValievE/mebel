<template>
  <div
    class="radio"
    :class="{
      radio_disabled: disabled
    }"
  >
    <input
      class="radio__input"
      type="radio"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />
    <p class="radio__text">
      <slot name="default"></slot>
    </p>
    <Transition name="fade-100">
      <span v-if="error" class="radio_error">{{ error }}</span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { type UIComponentsNS } from "@/types/types.ts";

const props = defineProps<UIComponentsNS.Radio.Props>();
const emit = defineEmits<UIComponentsNS.Radio.Emits>();

const onChange = (event: Event) => {
  if (props.disabled) return;

  emit("update:modelValue", (event.target as HTMLInputElement).checked);
};
</script>

<style lang="css">
.radio {
  width: 100%;
  display: flex;
  gap: 12px;
  padding-bottom: 24px;
  position: relative;
}
.radio__input {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: block;
  margin-top: 2px;
  appearance: none;
  border: 1px solid var(--gray-40);
  border-radius: 4px;
  transition-property: background-color, border;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  cursor: pointer;
  outline: none;
}
.radio__input:checked {
  background-color: var(--red-60);
  position: relative;
  border: none;
}
.radio__input:checked::before {
  content: "●";
  font-size: 12px;
  color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.radio__text {
  line-height: var(--line-height-m);
  font-size: var(--font-size-m);
}

.radio_disabled .radio__input {
  cursor: not-allowed;
  opacity: 0.6;
}

.radio_error {
  position: absolute;
  bottom: 0;
  font-size: var(--font-size-s);
  color: var(--red-60);
}
</style>
