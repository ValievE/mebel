<template>
  <div class="catalog">
    <ItemPopup :props="itemPopup.data" @close="itemPopup.functions.close" />
    <header class="catalog__header">
      <h1 class="catalog__header-title">Каталог</h1>
      <Selector
        :disabled="loaders.itemList"
        size="l"
        :model-value="sortSelector.value"
        placeholder="Сортировка"
        :options="sortSelector.items"
        @update:modelValue="sortSelector.functions.updateValue"
      />
    </header>
    <div class="catalog__list">
      <ScrollContainer>
        <Loader v-if="loaders.itemList" />
        <WarningBadge
          v-else-if="error"
          class="catalog__list-empty-list"
          title="Список пуст"
          :subtitle="error"
        />
        <div v-else class="catalog__list-scroll">
          <CatalogItem
            v-for="item in catalogItems"
            :key="item.id"
            :props="item"
            @click="itemPopup.functions.open(item.id)"
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
import { onMounted, reactive, ref } from "vue";
import type { ItemPopupObject, SortSelector } from "@/pages/catalog/types.ts";
import infrastructure from "@/infrastructure";
import { getItemAdapter, getListAdapter } from "@/pages/catalog/adapters.ts";
import Loader from "@/components/loader/loader.vue";
import { useUiStore } from "@/stores/use-ui-store.ts";
import Selector from "@/components/selector/selector.vue";
import {
  GetListField,
  type GetListRequest
} from "@/infrastructure/get-list.ts";
import WarningBadge from "@/components/warning-badge/warning-badge.vue";

const catalogItems = ref<CatalogItemNS.Props[]>([]);
const error = ref<string>("");

const { loaders, addToast } = useUiStore();

const itemPopup: ItemPopupObject = reactive({
  data: {
    visible: false,
    loading: false,
    data: {
      title: "Название кухни 1234",
      parameters: {},
      price: 0,
      images: [],
      type: FurnitureType.Other,
      id: ""
    }
  },
  functions: {
    open(id) {
      itemPopup.data.visible = true;
      getItem(id);
    },
    close() {
      itemPopup.data.visible = false;
    }
  }
});
const sortSelector: SortSelector = reactive({
  items: [
    {
      id: GetListField.PriceAsc,
      name: "По возрастанию цены"
    },
    {
      id: GetListField.PriceDesc,
      name: "По убыванию цены"
    },
    {
      id: GetListField.Default,
      name: "По-умолчанию"
    }
  ],
  value: GetListField.Default,
  functions: {
    async updateValue(id) {
      await getList({
        sort: id
      });
      sortSelector.value = id;
    }
  }
});

onMounted(() => {
  getList();
});

const getList = async (payload?: GetListRequest) => {
  loaders.itemList = true;
  error.value = "";
  try {
    catalogItems.value = getListAdapter(await infrastructure.getList(payload));
  } catch {
    error.value = "Не удалось получить список предметов";
    addToast("Произошла ошибка при загрузке каталога", "error");
  } finally {
    loaders.itemList = false;
  }
};
const getItem = async (id: string) => {
  itemPopup.data.loading = true;
  try {
    itemPopup.data.data = getItemAdapter(await infrastructure.getItem(id));
  } catch {
    addToast("Произошла ошибка при загрузке информации о предмете", "error");
    itemPopup.functions.close();
  } finally {
    itemPopup.data.loading = false;
  }
};
</script>

<style lang="css">
.catalog {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.catalog__header {
  margin-top: 160px;
  display: flex;
  gap: 16px;
  justify-content: space-between;
}
.catalog__header-title {
  color: var(--gray-70);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-xl);
}
.catalog__list {
  width: 100%;
  overflow: hidden;
  flex-grow: 1;
  border-radius: 24px;
}
.catalog__list-empty-list {
  margin: auto;
  height: 100%;
}
.catalog__list-scroll {
  padding-top: 24px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 240px;
  gap: 24px;
  padding-bottom: 32px;
}

@media screen and (max-width: 768px) {
  .catalog__header {
    margin-top: 128px;
  }
  .catalog__list-scroll {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;
    padding-bottom: 100px;
  }
}
</style>
