<template>
  <article class="catalog-item" :style="styles">
    <Tag>{{ furnitureName[props.type] }}</Tag>
    <footer class="catalog-item__footer">
      <Tag type="red">{{ props.title }}</Tag>
      <Tag type="red">{{ props.price }}</Tag>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { type CatalogItemNS } from "@/pages/catalog/components/catalog-item/types.ts";
import Tag from "@/components/tag/tag.vue";
import { furnitureName } from "@/common/consts.ts";
import { computed, type CSSProperties } from "vue";

const { props } = defineProps<{ props: CatalogItemNS.Props }>();

const styles = computed<CSSProperties>(() => {
  return {
    backgroundImage: `url(${props.image})`
  };
});
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

  &:hover {
    scale: 0.99;
  }

  &:active {
    scale: 0.95;
  }
}
.catalog-item__footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
