<template>
  <div class="item-configurator">
    <h2 class="item-configurator__title">Цвет</h2>
    <MaterialSelector
      :model-value="modelValue.material"
      :options="options.material"
      @update:modelValue="$emit('update:material', $event)"
    />
    <h2 class="item-configurator__title">Размер</h2>
    <SizeSelector
      :model-value="modelValue.size"
      :options="options.size"
      @update:modelValue="$emit('update:size', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import SizeSelector from "@/components/size-selector/size-selector.vue";
import MaterialSelector from "@/components/material-selector/material-selector.vue";
import { type ItemConfiguratorNS } from "@/pages/catalog/components/item-popup/components/item-configurator/types.ts";

defineProps<ItemConfiguratorNS.Props>();
defineEmits<ItemConfiguratorNS.Emits>();
</script>

<style lang="css">
.item-configurator {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 24px;
}
.item-configurator__title {
  font-weight: var(--font-weight-medium);
  color: var(--gray-60);
}
</style>
