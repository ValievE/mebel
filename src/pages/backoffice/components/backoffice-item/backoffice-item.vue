<template>
  <div class="backoffice-item" @click="$emit('edit', id)">
    <ButtonComponent
      class="backoffice-item__button"
      icon-name="trash-full"
      size="s"
      @click.stop="$emit('delete', id)"
    />
    <ImagePreviewer class="backoffice-item__preview" :images="[preview]" />
    <div class="backoffice-item__info">
      <p class="backoffice-item__info-title">{{ title }}</p>
      <p class="backoffice-item__info-article">{{ article }}</p>
      <p class="backoffice-item__info-types">{{ types }}</p>
      <p class="backoffice-item__info-price">{{ price }} ₽</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type BackofficeItemNS } from "@/pages/backoffice/components/backoffice-item/types.ts";
import ImagePreviewer from "@/components/image-previewer/image-previewer.vue";
import ButtonComponent from "@/components/button-component/button-component.vue";

defineProps<BackofficeItemNS.Props>();
defineEmits<BackofficeItemNS.Emits>();
</script>

<style lang="css">
.backoffice-item {
  height: 168px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  box-shadow: var(--shadow);
  cursor: pointer;
  position: relative;
  transition: var(--transition-bg-color-100);
  &:hover {
    background-color: var(--gray-10);
  }
}
.backoffice-item__button {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
.backoffice-item__preview {
  border-radius: 16px;
  height: 100%;
  width: 168px;
  flex-shrink: 0;
}
.backoffice-item__info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  padding: 16px;
}
.backoffice-item__info-title {
  font-weight: var(--font-weight-semibold);
  margin-bottom: auto;
}
.backoffice-item__info-article {
  color: var(--gray-40);
}
.backoffice-item__info-price {
  color: var(--red-50);
  font-weight: var(--font-weight-semibold);
}
</style>
