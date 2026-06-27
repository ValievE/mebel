<template>
  <div class="material-selector">
    <div
      v-for="item in options"
      :key="item.id"
      class="material-selector__item"
      :class="{
        'material-selector__item_selected': item.id === modelValue
      }"
      @click="$emit('update:modelValue', item.id)"
    >
      <ImagePreviewer
        class="material-selector__item-image"
        :images="[item.url]"
      />
      <span class="material-selector__item-name">
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type MaterialSelectorNS } from "@/components/material-selector/types.ts";
import ImagePreviewer from "@/components/image-previewer/image-previewer.vue";

defineProps<MaterialSelectorNS.Props>();
defineEmits<MaterialSelectorNS.Emits>();
</script>

<style lang="css">
.material-selector {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, 1fr);
  width: fit-content;
  justify-items: center;
}
.material-selector__item {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: fit-content;
  min-width: max-content;
  gap: 4px;
}
.material-selector__item-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--gray-40);
  box-shadow: var(--shadow);
  transition: var(--transition-border-300);
  cursor: pointer;
}
.material-selector__item-name {
  transition: var(--transition-color-300);
}
.material-selector__item_selected {
  .material-selector__item-image {
    border: 2px solid var(--red-50);
  }
  .material-selector__item-name {
    color: var(--red-50);
  }
}
</style>
