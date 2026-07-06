<template>
  <div class="backoffice-item-page">
    <Loader v-if="loading" />
    <WarningBadge
      v-else-if="error"
      class="backoffice-item-page__error"
      title="Ошибка"
      :subtitle="error"
    />
    <ItemForm
      v-else
      :form="form"
      :saving="saving"
      :is-edit="isEdit"
      @save="save"
      @cancel="goBack"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Loader from "@/components/loader/loader.vue";
import WarningBadge from "@/components/warning-badge/warning-badge.vue";
import ItemForm from "@/pages/backoffice-list/components/item-form/item-form.vue";
import { useCabinetLayout } from "@/stores/use-cabinet-layout.ts";
import infrastructure from "@/infrastructure";
import {
  detailToForm,
  emptyForm,
  formToDto
} from "@/pages/backoffice-list/adapters.ts";
import type { BackofficeNS } from "@/pages/backoffice-list/types.ts";
import { BACKOFFICE_CREATE_ID, PageName } from "@/router/consts.ts";

const route = useRoute();
const router = useRouter();
const { setTitle } = useCabinetLayout();

const loading = ref(true);
const saving = ref(false);
const error = ref("");
const form = reactive<BackofficeNS.Form>(emptyForm());

const routeId = computed(() => String(route.params.id ?? ""));
const isEdit = computed(() => routeId.value !== BACKOFFICE_CREATE_ID);
const editingId = computed(() => (isEdit.value ? Number(routeId.value) : null));

const goBack = () => {
  router.push({ name: PageName.Backoffice });
};

const loadItem = async () => {
  loading.value = true;
  error.value = "";

  if (!isEdit.value) {
    Object.assign(form, emptyForm());
    setTitle("Новый товар");
    loading.value = false;
    return;
  }

  const id = Number(routeId.value);
  if (!Number.isFinite(id) || id < 1) {
    error.value = "Некорректный идентификатор товара.";
    loading.value = false;
    return;
  }

  setTitle("Редактирование товара");

  try {
    const detail = await infrastructure.adminGetItem(id);
    Object.assign(form, detailToForm(detail));
  } catch {
    error.value = "Не удалось загрузить товар.";
  } finally {
    loading.value = false;
  }
};

const save = async () => {
  if (saving.value) return;

  if (!form.title.trim()) {
    error.value = "Укажите название товара.";
    return;
  }
  if (!form.types.length) {
    error.value = "Выберите хотя бы один тип мебели.";
    return;
  }

  saving.value = true;
  error.value = "";

  try {
    const payload = formToDto(form);
    if (editingId.value) {
      await infrastructure.adminUpdateItem(editingId.value, payload);
    } else {
      await infrastructure.adminCreateItem(payload);
    }
    goBack();
  } catch {
    error.value = "Не удалось сохранить товар.";
  } finally {
    saving.value = false;
  }
};

onMounted(loadItem);

watch(routeId, () => {
  loadItem();
});
</script>

<style lang="css">
.backoffice-item-page {
  width: 100%;
  height: 100%;
}
.backoffice-item-page__error {
  margin: 24px 24px 24px 0;
}

@media screen and (max-width: 768px) {
  .backoffice-item-page__error {
    margin-right: 0;
  }
}
</style>
