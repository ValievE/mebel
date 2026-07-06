<template>
  <form class="item-form" @submit.prevent="emit('save')">
    <section class="item-form__section">
      <h2 class="item-form__section-title">Основное</h2>
      <InputComponent
        v-model="form.title"
        label="Название"
        required
        :disabled="saving"
      />
      <InputComponent
        v-model="form.article"
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
      <ButtonComponent type="white" size="s" :disabled="saving" @click.prevent="addImage">
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
        <InputComponent
          :model-value="form.parameters[index] ?? ''"
          :label="'Параметр ' + (index + 1)"
          :disabled="saving"
          @update:model-value="form.parameters[index] = $event"
        />
        <ButtonComponent
          type="white"
          size="s"
          :disabled="saving || form.parameters.length === 1"
          @click.prevent="removeParameter(index)"
        >
          Удалить
        </ButtonComponent>
      </div>
      <ButtonComponent
        type="white"
        size="s"
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
          <InputComponent
            v-model="sizeGroup.size"
            label="Размер"
            :disabled="saving"
          />
          <ButtonComponent
            type="white"
            size="s"
            :disabled="saving"
            @click.prevent="removeSize(sizeIndex)"
          >
            Удалить размер
          </ButtonComponent>
        </div>

        <div
          v-for="(material, matIndex) in sizeGroup.materials"
          :key="'mat-' + sizeIndex + '-' + matIndex"
          class="item-form__material-block"
        >
          <InputComponent
            v-model="material.name"
            label="Материал"
            :disabled="saving"
          />
          <ImageUploadField
            v-model="material.image"
            label="Фото материала"
            :disabled="saving"
          />
          <div class="item-form__row item-form__row_inputs">
            <InputComponent
              :model-value="String(material.price)"
              label="Цена, ₽"
              type="number"
              :disabled="saving"
              @update:model-value="material.price = Number($event) || 0"
            />
            <InputComponent
              :model-value="String(material.inStock)"
              label="Остаток"
              type="number"
              :disabled="saving"
              @update:model-value="material.inStock = Number($event) || 0"
            />
          </div>
          <ButtonComponent
            type="white"
            size="s"
            :disabled="saving"
            @click.prevent="removeMaterial(sizeIndex, matIndex)"
          >
            Удалить материал
          </ButtonComponent>
        </div>

        <ButtonComponent
          type="white"
          size="s"
          :disabled="saving"
          @click.prevent="addMaterial(sizeIndex)"
        >
          Добавить материал
        </ButtonComponent>
      </div>

      <ButtonComponent type="white" size="s" :disabled="saving" @click.prevent="addSize">
        Добавить размер
      </ButtonComponent>
    </section>

    <div class="item-form__actions">
      <ButtonComponent type="red" size="m" wide :disabled="saving">
        {{ isEdit ? "Сохранить" : "Создать" }}
      </ButtonComponent>
      <ButtonComponent
        type="white"
        size="m"
        wide
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
import type { BackofficeNS } from "@/pages/backoffice/types.ts";

const props = defineProps<BackofficeNS.ItemFormProps>();
const emit = defineEmits<BackofficeNS.ItemFormEmits>();

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
  form.parameters.push("");
};

const removeParameter = (index: number) => {
  if (form.parameters.length === 1) {
    form.parameters[0] = "";
    return;
  }
  form.parameters.splice(index, 1);
};

const emptyMaterial = (): BackofficeNS.MaterialOption => ({
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
  gap: 32px;
  max-width: 720px;
  padding: 24px 24px 24px 0;
}
.item-form__section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.item-form__section-title {
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-semibold);
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
  align-items: flex-end;
  gap: 12px;
}
.item-form__row_inputs {
  align-items: flex-start;
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
.item-form__material-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: var(--gray-10);
}
.item-form__hint {
  color: var(--gray-60);
  font-size: var(--font-size-s);
}
.item-form__actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 8px;
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
