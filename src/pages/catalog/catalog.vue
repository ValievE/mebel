<template>
  <div class="catalog">
    <ItemPopup :props="itemPopup.data" @close="itemPopup.functions.toggle" />
    <h1 class="catalog__title">Каталог</h1>
    <div class="catalog__list">
      <ScrollContainer>
        <div class="catalog__list-items">
          <CatalogItem
            v-for="item in catalogItems"
            :props="item"
            :key="item.title"
            @click="itemPopup.functions.toggle"
          />
        </div>
      </ScrollContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type CatalogItemNS } from "@/pages/catalog/components/catalog-item/types.ts";
import { FurnitureType } from "@/types/types.ts";
import CatalogItem from "@/pages/catalog/components/catalog-item/catalog-item.vue";
import ItemPopup from "@/pages/catalog/components/item-popup/item-popup.vue";
import ScrollContainer from "@/components/scroll-container/scroll-container.vue";
import { reactive } from "vue";
import type { ItemPopupObject } from "@/pages/catalog/types.ts";

const itemPopup: ItemPopupObject = reactive({
  data: {
    visible: false,
    title: "",
    subtitle: "",
    parameters: {},
    price: 0,
    images: [],
    type: FurnitureType.Other
  },
  functions: {
    toggle() {
      itemPopup.data.visible = !itemPopup.data.visible;
    }
  }
});

const catalogItems: CatalogItemNS.Props[] = [];

for (let i = 0; i < 100; i++) {
  catalogItems.push({
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: FurnitureType.Bedroom,
    price: 12000,
    title: "АОаоаоо"
  });
}
</script>

<style lang="css">
.catalog {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.catalog__title {
  margin-top: 160px;
  margin-left: 16px;
  color: var(--gray-70);
  font-weight: var(--font-weight-semibold);
}
.catalog__list {
  width: 100%;
  overflow: hidden;
  flex-grow: 1;
}
.catalog__list-items {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 240px;
  gap: 24px;
  padding-bottom: 32px;
}

@media screen and (max-width: 768px) {
  .catalog__title {
    margin-top: 128px;
  }
}
</style>
