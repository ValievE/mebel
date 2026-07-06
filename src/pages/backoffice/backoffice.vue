<template>
  <div class="backoffice">
    <Loader v-if="loading" />

    <WarningBadge
      v-else-if="error"
      class="backoffice__error"
      title="Не удалось загрузить данные"
      :subtitle="error"
    />
    <template v-else>
      <div v-if="mode === 'list'" class="backoffice__list">
        <div class="backoffice__list-header">
          <ButtonComponent type="red" size="m" @click="openCreate">
            Создать товар
          </ButtonComponent>
        </div>
        <WarningBadge
          v-if="!items.length"
          class="backoffice__empty"
          title="Товаров пока нет"
          subtitle="Создайте первую карточку товара."
        />
        <ScrollContainer v-else class="backoffice__list-scroll-wrapper">
          <div class="backoffice__list-scroll">
            <BackofficeItem
              v-for="item in items"
              :id="item.id"
              :key="item.id"
              :title="item.title"
              :article="item.article"
              :preview="item.preview"
              :price="item.price"
              :types="item.types"
              @delete="deleteItem"
              @edit="openItem"
            />
          </div>
        </ScrollContainer>
      </div>

      <div v-else class="backoffice__form">
        <h2 class="backoffice__form-title">
          {{ editingId ? "Редактирование товара" : "Новый товар" }}
        </h2>
        <Loader v-if="formLoading" />
        <WarningBadge
          v-else-if="formError"
          class="backoffice__error"
          title="Ошибка"
          :subtitle="formError"
        />
        <ItemForm
          v-else
          :form="form"
          :saving="saving"
          :is-edit="!!editingId"
          @save="save"
          @cancel="closeForm"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Loader from "@/components/loader/loader.vue";
import WarningBadge from "@/components/warning-badge/warning-badge.vue";
import ButtonComponent from "@/components/button-component/button-component.vue";
import ScrollContainer from "@/components/scroll-container/scroll-container.vue";
import ItemForm from "@/pages/backoffice/components/item-form/item-form.vue";
import { useCabinetLayout } from "@/stores/use-cabinet-layout.ts";
import infrastructure from "@/infrastructure";
import {
  detailToForm,
  emptyForm,
  formToDto,
  listToUi
} from "@/pages/backoffice/adapters.ts";
import type { BackofficeNS } from "@/pages/backoffice/types.ts";
import BackofficeItem from "@/pages/backoffice/components/backoffice-item/backoffice-item.vue";
import { type BackofficeItemNS } from "@/pages/backoffice/components/backoffice-item/types.ts";

const { setTitle } = useCabinetLayout();

const mode = ref<"list" | "form">("list");
const loading = ref(true);
const formLoading = ref(false);
const saving = ref(false);
const error = ref("");
const formError = ref("");
const editingId = ref<number | null>(null);
const items = ref<BackofficeItemNS.Props[]>([]);
const form = reactive<BackofficeNS.Form>(emptyForm());

const loadList = async () => {
  const response = await infrastructure.adminListItems();
  items.value = listToUi(response);
};

const openCreate = () => {
  Object.assign(form, emptyForm());
  editingId.value = null;
  formError.value = "";
  mode.value = "form";
  setTitle("Новый товар");
};

const closeForm = () => {
  mode.value = "list";
  editingId.value = null;
  formError.value = "";
  setTitle("Бэкофис");
};

const save = async () => {
  if (saving.value) return;

  if (!form.title.trim()) {
    formError.value = "Укажите название товара.";
    return;
  }
  if (!form.types.length) {
    formError.value = "Выберите хотя бы один тип мебели.";
    return;
  }

  saving.value = true;
  formError.value = "";

  try {
    const payload = formToDto(form);
    if (editingId.value) {
      await infrastructure.adminUpdateItem(editingId.value, payload);
    } else {
      await infrastructure.adminCreateItem(payload);
    }
    await loadList();
    closeForm();
  } catch {
    formError.value = "Не удалось сохранить товар.";
  } finally {
    saving.value = false;
  }
};

onMounted(async () => {
  setTitle("Бэкофис");
  try {
    await loadList();
  } catch {
    error.value = "Попробуйте обновить страницу позже.";
  } finally {
    loading.value = false;
  }
});

const deleteItem = async (id: string) => {
  console.log("deleteItemi", id);
};
const openItem = async (id: string) => {
  mode.value = "form";
  formLoading.value = true;
  formError.value = "";
  editingId.value = Number(id);
  setTitle("Редактирование товара");

  try {
    const detail = await infrastructure.adminGetItem(Number(id));
    Object.assign(form, detailToForm(detail));
  } catch {
    formError.value = "Не удалось загрузить товар.";
    mode.value = "list";
    setTitle("Бэкофис");
  } finally {
    formLoading.value = false;
  }
};
</script>

<style lang="css">
.backoffice {
  width: 100%;
  height: 100%;
}
.backoffice__error,
.backoffice__empty {
  margin: 24px 24px 24px 0;
}
.backoffice__list {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 24px;
}
.backoffice__list-header {
  padding-right: 24px;
}
.backoffice__list-scroll-wrapper {
  border-radius: 16px;
}
.backoffice__list-scroll {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;
  padding: 24px 24px 24px 0;
}
.backoffice__list-item {
  display: flex;
  gap: 16px;
  width: 100%;
  padding: 16px 24px 16px 0;
  border: none;
  border-bottom: 1px solid var(--gray-20);
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.backoffice__list-item:hover {
  background: var(--gray-10);
}
.backoffice__list-item-image {
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 12px;
  object-fit: cover;
  background: var(--gray-10);
}
.backoffice__list-item-image_empty {
  border: 1px dashed var(--gray-30);
}
.backoffice__list-item-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.backoffice__list-item-title {
  font-weight: var(--font-weight-semibold);
}
.backoffice__list-item-meta {
  color: var(--gray-60);
  font-size: var(--font-size-s);
}
.backoffice__list-item-price {
  color: var(--red-50);
  font-weight: var(--font-weight-semibold);
}
.backoffice__form-title {
  padding: 24px 24px 0 0;
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-semibold);
}

@media screen and (max-width: 768px) {
  .backoffice__list-header,
  .backoffice__list-item,
  .backoffice__form-title {
    padding-right: 0;
  }
}
</style>
