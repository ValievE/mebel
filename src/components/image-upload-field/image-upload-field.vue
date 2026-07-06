<template>
  <div
    class="image-upload-field"
    :class="{ 'image-upload-field_disabled': disabled || uploading }"
  >
    <span v-if="label" class="image-upload-field__label">{{ label }}</span>
    <div v-if="previewUrl" class="image-upload-field__preview-wrap">
      <ImagePreviewer
        class="image-upload-field__preview"
        :images="[previewUrl]"
      />
      <ButtonComponent
        v-if="!disabled && !uploading"
        type="red"
        size="s"
        @click.prevent="clear"
      >
        Удалить фото
      </ButtonComponent>
    </div>
    <label class="image-upload-field__control">
      <input
        class="image-upload-field__input"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        :disabled="disabled || uploading"
        @change="onFileChange"
      />

      <span class="image-upload-field__button">
        {{ uploading ? "Загрузка…" : previewUrl ? "Заменить" : "Выбрать файл" }}
      </span>
    </label>
    <span v-if="error" class="image-upload-field__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import ButtonComponent from "@/components/button-component/button-component.vue";
import { resolveMediaUrl } from "@/common/media-url.ts";
import { adminUploadImage } from "@/infrastructure/admin-upload.ts";
import ImagePreviewer from "@/components/image-previewer/image-previewer.vue";

const props = defineProps<{
  modelValue: string;
  label?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const uploading = ref(false);
const error = ref("");
const previewUrl = computed(() => resolveMediaUrl(props.modelValue));

const onFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = "";
  if (!file || props.disabled || uploading.value) {
    return;
  }

  uploading.value = true;
  error.value = "";

  try {
    const uploaded = await adminUploadImage(file);
    emit("update:modelValue", uploaded.object_key);
  } catch {
    error.value = "Не удалось загрузить изображение.";
  } finally {
    uploading.value = false;
  }
};

const clear = () => {
  error.value = "";
  emit("update:modelValue", "");
};
</script>

<style lang="css">
.image-upload-field {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.image-upload-field__label {
  font-size: var(--font-size-s);
  color: var(--gray-60);
}
.image-upload-field__preview-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.image-upload-field__preview {
  width: 120px;
  height: 120px;
  border-radius: 12px;
}
.image-upload-field__control {
  display: inline-flex;
  width: fit-content;
  cursor: pointer;
}
.image-upload-field_disabled .image-upload-field__control {
  cursor: not-allowed;
  opacity: 0.6;
}
.image-upload-field__input {
  display: none;
}
.image-upload-field__button {
  padding: 0 8px;
  border-radius: 12px;
  background: var(--gray-10);
  font-size: var(--font-size-s);
}
.image-upload-field__error {
  color: var(--red-50);
  font-size: var(--font-size-s);
}
</style>
