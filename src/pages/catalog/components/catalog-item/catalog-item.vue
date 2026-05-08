<template>
  <article class="catalog-item">
    <ImagePreviewer class="catalog-item__img" :images="[props.image]" />
    <Tag class="catalog-item__type">{{ furnitureName[props.type] }}</Tag>
    <footer class="catalog-item__footer">
      <Tag type="red">{{ props.title }}</Tag>
      <Tag v-if="props.price" type="red">{{ props.price }}</Tag>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { type CatalogItemNS } from "@/pages/catalog/components/catalog-item/types.ts";
import Tag from "@/components/tag/tag.vue";
import { furnitureName } from "@/common/consts.ts";
import ImagePreviewer from "@/components/image-previewer/image-previewer.vue";

const { props } = defineProps<{ props: CatalogItemNS.Props }>();
</script>

<style lang="css">
.catalog-item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  border-radius: 24px;
  box-shadow: var(--shadow);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  background-color: var(--red-90);
  transition: var(--transition-scale-100);
  position: relative;
  overflow: hidden;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--red-50);
    z-index: 2;
    opacity: 0;
    transition: var(--transition-opacity-100);
  }

  &:hover::before {
    opacity: 0.2;
  }

  &:active::before {
    opacity: 0.4;
  }
}
.catalog-item__img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.catalog-item__type {
  z-index: 1;
}
.catalog-item__footer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  z-index: 1;
}
</style>
