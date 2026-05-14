<template>
  <div class="tabs">
    <ButtonComponent
      v-for="tab in items"
      :key="String(tab.id)"
      :disabled="disabled"
      class="tabs__item"
      :type="tab.id === modelValue ? 'red' : 'white'"
      @click="updateModelValue(tab.id)"
    >
      {{ tab.text }}
    </ButtonComponent>
  </div>
</template>

<script setup lang="ts" generic="T = string">
import ButtonComponent from "@/components/button-component/button-component.vue";
import { type UIComponentsNS } from "@/types/types.ts";

const props = defineProps<UIComponentsNS.Tabs.Props<T>>();
const emit = defineEmits<UIComponentsNS.Tabs.Emits<T>>();

const updateModelValue = (value: T) => {
  if (props.disabled) return;
  emit("update:modelValue", value);
};
</script>

<style lang="css">
.tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.tabs__item {
  flex: 1;
}
</style>
