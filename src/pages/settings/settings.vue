<template>
  <div class="settings">
    <Loader v-if="loading" />
    <WarningBadge
      v-else-if="error"
      class="settings__error"
      title="Не удалось загрузить настройки"
      :subtitle="error"
    />
    <div v-else class="settings__item">
      <Tumbler
        :model-value="form.advertisement"
        :disabled="saving"
        @update:model-value="onAdvertisementChange"
      />
      <span class="settings__item-text">
        {{ advertisementLabel }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCabinetLayout } from "@/stores/use-cabinet-layout.ts";
import { onMounted, reactive, ref } from "vue";
import Tumbler from "@/components/tumbler/tumbler.vue";
import Loader from "@/components/loader/loader.vue";
import WarningBadge from "@/components/warning-badge/warning-badge.vue";
import { type Settings } from "@/pages/settings/types.ts";
import {
  getSettingsRequest,
  updateSettingsRequest,
  type GetSettingsResponse
} from "@/infrastructure/settings-api.ts";

const { setTitle } = useCabinetLayout();

const form: Settings.Form = reactive({
  advertisement: false
});

const loading = ref(true);
const saving = ref(false);
const error = ref("");
const advertisementLabel = ref(
  "Получать рекламную рассылку на электронную почту"
);

const applySettings = (response: GetSettingsResponse) => {
  const advertisement = response.settings.advertisement;
  if (advertisement) {
    form.advertisement = Boolean(advertisement.value);
    advertisementLabel.value = advertisement.label;
  }
};

const onAdvertisementChange = async (value: boolean) => {
  if (saving.value || form.advertisement === value) return;

  const previous = form.advertisement;
  form.advertisement = value;
  saving.value = true;
  error.value = "";

  try {
    await updateSettingsRequest({ advertisement: value });
  } catch {
    form.advertisement = previous;
    error.value = "Не удалось сохранить настройку.";
  } finally {
    saving.value = false;
  }
};

onMounted(async () => {
  setTitle("Настройки");
  try {
    applySettings(await getSettingsRequest());
  } catch {
    error.value = "Попробуйте обновить страницу позже.";
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="css">
.settings {
  padding: 24px 24px 24px 0;
}
.settings__item {
  display: flex;
  align-items: center;
  gap: 16px;
}
.settings__error {
  margin-top: 0;
}
</style>
