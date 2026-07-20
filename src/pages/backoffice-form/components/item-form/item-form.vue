<template>
  <form class="item-form" @submit.prevent="emit('save')">
    <section class="item-form__section item-form__section_row">
      <h2 class="item-form__section-title">Основное</h2>
      <InputComponent
        v-model="form.title"
        class="item-form__section-input"
        label="Название"
        required
        :disabled="saving"
      />
      <InputComponent
        v-model="form.article"
        class="item-form__section-input"
        label="Артикул"
        :disabled="saving"
      />
    </section>
    <section class="item-form__section">
      <h2 class="item-form__section-title">Тип мебели</h2>
      <div class="item-form__types">
        <Checkbox
          v-for="type in furnitureTypes"
          :key="type"
          :model-value="form.types.includes(type)"
          :disabled="saving"
          @update:model-value="toggleType(type, $event)"
        >
          {{ furnitureName[type].long }}
        </Checkbox>
      </div>
    </section>
    <section class="item-form__section">
      <h2 class="item-form__section-title">Изображения</h2>
      <ImageUploadField
        v-model="form.coverImage"
        label="Обложка"
        :disabled="saving"
      />
      <div
        v-for="(_, index) in form.images"
        :key="'img-' + index"
        class="item-form__row item-form__row_upload"
      >
        <ImageUploadField
          :model-value="form.images[index] ?? ''"
          :label="'Доп. фото ' + (index + 1)"
          :disabled="saving"
          @update:model-value="form.images[index] = $event"
        />
        <ButtonComponent
          type="white"
          size="s"
          :disabled="saving"
          @click.prevent="removeImage(index)"
        >
          Удалить
        </ButtonComponent>
      </div>
      <ButtonComponent
        type="white"
        size="s"
        :disabled="saving"
        @click.prevent="addImage"
      >
        Добавить фото
      </ButtonComponent>
    </section>
    <section class="item-form__section">
      <h2 class="item-form__section-title">Параметры</h2>
      <div
        v-for="(_, index) in form.parameters"
        :key="'param-' + index"
        class="item-form__row"
      >
        <h3 class="item-form__row-title">{{ "Параметр " + (index + 1) }}</h3>
        <InputComponent
          class="item-form__row-input"
          :model-value="form.parameters[index]?.key ?? ''"
          label="Название"
          :disabled="saving"
          @update:model-value="updateParameterKey(index, $event)"
        />
        <InputComponent
          :model-value="form.parameters[index]?.value ?? ''"
          class="item-form__row-input"
          label="Значение"
          :disabled="saving"
          @update:model-value="updateParameterValue(index, $event)"
        />
        <ButtonComponent
          type="white"
          size="m"
          icon-name="trash-full"
          :disabled="saving || form.parameters.length === 1"
          @click.prevent="removeParameter(index)"
        />
      </div>
      <ButtonComponent
        type="orange"
        :disabled="saving"
        @click.prevent="addParameter"
      >
        Добавить параметр
      </ButtonComponent>
    </section>
    <section v-if="!form.sizes.length" class="item-form__section">
      <h2 class="item-form__section-title">Цена и остаток</h2>
      <p class="item-form__hint">
        Заполните, если у товара нет размеров и материалов.
      </p>
      <div class="item-form__row item-form__row_inputs">
        <InputComponent
          v-model="priceText"
          label="Цена, ₽"
          type="number"
          :disabled="saving"
        />
        <InputComponent
          v-model="inStockText"
          label="Остаток"
          type="number"
          :disabled="saving"
        />
      </div>
    </section>
    <section class="item-form__section">
      <h2 class="item-form__section-title">Размеры и материалы</h2>
      <div
        v-for="(sizeGroup, sizeIndex) in form.sizes"
        :key="'size-' + sizeIndex"
        class="item-form__size-block"
      >
        <div class="item-form__row">
          <ButtonComponent
            type="red"
            :disabled="saving"
            @click.prevent="removeSize(sizeIndex)"
          >
            Удалить размер
          </ButtonComponent>
          <InputComponent
            v-model="sizeGroup.size"
            label="Размер"
            :disabled="saving"
          />
        </div>
        <MaterialItem
          v-for="(material, matIndex) in sizeGroup.materials"
          :key="'mat-' + sizeIndex + '-' + matIndex"
          class="item-form__row-material-item"
          :name="material.name"
          :image="material.image"
          :price="material.price"
          :in-stock="material.inStock"
          :saving="saving"
          @delete="removeMaterial(sizeIndex, matIndex)"
          @update:name="material.name = $event"
          @update:image="material.image = $event"
          @update:price="material.price = $event"
          @update:inStock="material.inStock = $event"
        />
        <ButtonComponent
          type="white"
          class="item-form__row-button"
          :disabled="saving"
          @click.prevent="addMaterial(sizeIndex)"
        >
          + Добавить материал
        </ButtonComponent>
      </div>

      <ButtonComponent type="white" :disabled="saving" @click.prevent="addSize">
        + Добавить размер
      </ButtonComponent>
    </section>

    <div class="item-form__actions">
      <ButtonComponent
        class="item-form__actions-button"
        type="red"
        size="m"
        :disabled="saving"
      >
        {{ isEdit ? "Сохранить" : "Создать" }}
      </ButtonComponent>
      <ButtonComponent
        type="white"
        class="item-form__actions-button"
        size="m"
        :disabled="saving"
        @click.prevent="emit('cancel')"
      >
        Отмена
      </ButtonComponent>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from "vue";
import InputComponent from "@/components/input-component/input-component.vue";
import ButtonComponent from "@/components/button-component/button-component.vue";
import Checkbox from "@/components/checkbox/checkbox.vue";
import ImageUploadField from "@/components/image-upload-field/image-upload-field.vue";
import { furnitureName } from "@/common/consts.ts";
import { FurnitureType } from "@/types/types.ts";
import { type BackofficeForm } from "@/pages/backoffice-form/components/item-form/types.ts";
import MaterialItem from "@/pages/backoffice-form/components/item-form/components/material-item.vue";

const props = defineProps<BackofficeForm.Props>();
const emit = defineEmits<BackofficeForm.Emits>();

const form = props.form;

const furnitureTypes = Object.values(FurnitureType);

const priceText = computed({
  get: () => String(form.price),
  set: value => {
    form.price = Number(value) || 0;
  }
});

const inStockText = computed({
  get: () => String(form.inStock),
  set: value => {
    form.inStock = Number(value) || 0;
  }
});

const toggleType = (type: FurnitureType, checked: boolean) => {
  if (checked) {
    if (!form.types.includes(type)) {
      form.types.push(type);
    }
    return;
  }
  form.types = form.types.filter(t => t !== type);
};

const addImage = () => {
  form.images.push("");
};

const removeImage = (index: number) => {
  form.images.splice(index, 1);
};

const addParameter = () => {
  form.parameters.push({ key: "", value: "" });
};

const updateParameterKey = (index: number, value: string) => {
  const parameter = form.parameters[index];
  if (!parameter) return;
  parameter.key = value;
};

const updateParameterValue = (index: number, value: string) => {
  const parameter = form.parameters[index];
  if (!parameter) return;
  parameter.value = value;
};

const removeParameter = (index: number) => {
  if (form.parameters.length === 1) {
    form.parameters[0] = { key: "", value: "" };
    return;
  }
  form.parameters.splice(index, 1);
};

const emptyMaterial = (): BackofficeForm.MaterialOption => ({
  name: "",
  image: "",
  price: 0,
  inStock: 0
});

const addSize = () => {
  form.sizes.push({
    size: "",
    materials: [emptyMaterial()]
  });
};

const removeSize = (index: number) => {
  form.sizes.splice(index, 1);
};

const addMaterial = (sizeIndex: number) => {
  const sizeGroup = form.sizes[sizeIndex];
  if (!sizeGroup) return;
  sizeGroup.materials.push(emptyMaterial());
};

const removeMaterial = (sizeIndex: number, matIndex: number) => {
  const sizeGroup = form.sizes[sizeIndex];
  if (!sizeGroup) return;
  const materials = sizeGroup.materials;
  if (materials.length === 1) {
    materials[0] = emptyMaterial();
    return;
  }
  materials.splice(matIndex, 1);
};
</script>

<style lang="css">
.item-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 24px 24px 0;
  width: 100%;
}
.item-form__section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.item-form__section_row {
  flex-direction: row;
  flex-wrap: wrap;
}
.item-form__section-title {
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-semibold);
  width: 100%;
}
.item-form__section-input {
  flex: 1;
}
.item-form__types {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.item-form__types .checkbox {
  padding-bottom: 0;
}
.item-form__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
.item-form__row-title {
  width: 100%;
  font-size: var(--font-size-m);
  color: var(--gray-20);
  font-weight: var(--font-weight-medium);
}
.item-form__row-input {
  flex: 1;
}
.item-form__row-material-item:not(:last-of-type) {
  border-bottom: 1px solid var(--gray-20);
  padding-bottom: 16px;
}
.item-form__row-button {
  margin: 16px auto 0;
}
.item-form__row_upload {
  align-items: flex-start;
}
.item-form__row_upload > .image-upload-field {
  flex: 1;
}
.item-form__size-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--gray-20);
  border-radius: 16px;
}
.item-form__hint {
  color: var(--gray-60);
  font-size: var(--font-size-s);
}
.item-form__actions {
  display: flex;
  gap: 12px;
  padding-top: 8px;
}
.item-form__actions-button {
  flex: 1;
}

@media screen and (max-width: 768px) {
  .item-form {
    padding: 24px 0;
  }
  .item-form__row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
