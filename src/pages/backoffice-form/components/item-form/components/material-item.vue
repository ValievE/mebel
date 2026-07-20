<template>
  <div class="material-item">
    <ImageUploadField
      :model-value="image"
      label="Фото материала"
      :disabled="saving"
      @update:modelValue="$emit('update:image', $event)"
    />
    <div class="material-item__info">
      <InputComponent
        :model-value="name"
        label="Материал"
        :disabled="saving"
        @update:modelValue="$emit('update:name', $event)"
      />
      <div class="material-item__info-row">
        <InputComponent
          :model-value="String(price)"
          class="material-item__info-row-input"
          label="Цена, ₽"
          type="number"
          :disabled="saving"
          @update:model-value="$emit('update:price', Number($event) || 0)"
        />
        <InputComponent
          :model-value="String(inStock)"
          class="material-item__info-row-input"
          label="Кол-во в наличии"
          type="number"
          :disabled="saving"
          @update:model-value="$emit('update:inStock', Number($event) || 0)"
        />
      </div>
      <ButtonComponent
        class="material-item__info-button"
        type="red"
        :disabled="saving"
        @click.prevent="$emit('delete')"
      >
        Удалить материал
      </ButtonComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageUploadField from "@/components/image-upload-field/image-upload-field.vue";
import { type BackofficeForm } from "@/pages/backoffice-form/components/item-form/types.ts";
import InputComponent from "@/components/input-component/input-component.vue";
import ButtonComponent from "@/components/button-component/button-component.vue";

defineProps<BackofficeForm.MaterialItem.Props>();
defineEmits<BackofficeForm.MaterialItem.Emits>();
</script>

<style lang="css">
.material-item {
  display: flex;
  gap: 16px;
  width: 100%;
}
.material-item__info {
  flex-grow: 1;
}
.material-item__info-row {
  display: flex;
  gap: 16px;
}
.material-item__info-button {
  margin-left: auto;
}
</style>
