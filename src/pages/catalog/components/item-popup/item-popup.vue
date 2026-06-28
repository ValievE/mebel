<template>
  <Popup
    :id="props.id"
    custom-class="item-popup"
    :loading="props.loading"
    @close="$emit('close')"
  >
    <template #additional-popup>
      <div class="item-popup__item-configurator">
        <ItemConfigurator
          :model-value="props.data.pickedOptions"
          :options="sizeAndMaterialOptions"
          @update:material="$emit('updateMaterial', $event)"
          @update:size="$emit('updateSize', $event)"
        />
      </div>
    </template>
    <div class="item-popup__images">
      <ImagePreviewer :images="props.data.images" />
    </div>
    <div class="item-popup__info">
      <h1 class="item-popup__info-title">
        {{ props.data.title }}
      </h1>
      <ScrollContainer class="item-popup__info-parameters">
        <p class="item-popup__info-parameters-list">
          <span
            v-for="(parameterValue, parameterKey) in props.data.parameters"
            :key="parameterKey"
            class="item-popup__info-parameters-list-item"
          >
            {{ parameterKey }}: {{ parameterValue }}
          </span>
        </p>
        <div class="item-popup__info-parameters-configurator">
          <ItemConfigurator
            :model-value="props.data.pickedOptions"
            :options="sizeAndMaterialOptions"
            @update:material="$emit('updateMaterial', $event)"
            @update:size="$emit('updateSize', $event)"
          />
        </div>
      </ScrollContainer>
      <footer class="item-popup__footer">
        <ButtonComponent
          icon-name="help"
          class="item-popup__footer-info-button"
          @click="uiStore.openPopup('social-media-popup')"
        >
          Задать вопрос
        </ButtonComponent>
        <transition name="flashlight" mode="out-in">
          <ButtonComponent
            :key="buttonText"
            :type="buttonType"
            :disabled="props.data.isAdded || !displayPrice"
            :size="uiStore.isMobile ? 'l' : 'm'"
            class="item-popup__footer-cart-button"
            @click="$emit('addToCart')"
          >
            <span>
              {{ buttonText }}
            </span>
          </ButtonComponent>
        </transition>
      </footer>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import Popup from "@/components/popup/popup.vue";
import type { ItemPopupNS } from "@/pages/catalog/components/item-popup/types.ts";
import ButtonComponent from "@/components/button-component/button-component.vue";
import ImagePreviewer from "@/components/image-previewer/image-previewer.vue";
import ScrollContainer from "@/components/scroll-container/scroll-container.vue";
import { computed } from "vue";
import { type UIComponentsNS } from "@/types/types.ts";
import { useUiStore } from "@/stores/use-ui-store.ts";
import ItemConfigurator from "@/pages/catalog/components/item-popup/components/item-configurator/item-configurator.vue";
import { type ItemConfiguratorNS } from "@/pages/catalog/components/item-popup/components/item-configurator/types.ts";

const { props } = defineProps<{ props: ItemPopupNS.Props }>();
defineEmits<ItemPopupNS.Emits>();

const uiStore = useUiStore();

const sizeAndMaterialOptions = computed<ItemConfiguratorNS.Options>(() => {
  const item = props.data.variants.find(
    i => i.size === props.data.pickedOptions.size
  );
  if (!item)
    return {
      size: [],
      material: []
    };

  return {
    size: props.data.variants.map(i => ({ id: i.size, label: i.size })),
    material: item.options.map(i => ({
      id: i.material_id,
      url: i.url,
      name: i.name
    }))
  };
});

const displayPrice = computed<number>(() => {
  const item = props.data.variants.find(
    i => i.size === props.data.pickedOptions.size
  );
  if (!item) return 0;
  return (
    item.options.find(i => i.material_id === props.data.pickedOptions.material)
      ?.price || 0
  );
});

const buttonType = computed<UIComponentsNS.Style>(() => {
  if (!displayPrice.value) return "red";
  return "orange";
});

const buttonText = computed<string>(() => {
  if (props.data.isAdded) return "Товар в корзине";
  if (displayPrice.value) return displayPrice.value + " Р";
  return "Цена индивидуальная";
});
</script>

<style lang="css">
.item-popup__item-configurator {
  padding: 24px 12px;
}
.item-popup__images {
  width: 100%;
  height: 60%;

  .carousel__pagination {
    bottom: 44px;
  }
}
.item-popup__info {
  background-color: var(--white);
  width: 100%;
  height: 45%;
  position: absolute;
  bottom: 0;
  border-radius: 24px 24px 0 0;
  box-shadow: var(--shadow);
  padding: 24px;
  display: flex;
  flex-direction: column;
  z-index: 1;
}
.item-popup__info-title {
  font-size: var(--font-size-l);
  line-height: var(--line-height-l);
  font-weight: var(--font-weight-bold);
}
.item-popup__info-parameters-list {
  display: flex;
  flex-direction: column;
  padding-top: 12px;
}
.item-popup__info-parameters-list-item {
  font-size: var(--font-size-s);
  color: var(--gray-60);
}
.item-popup__footer {
  margin-left: auto;
  margin-top: auto;
  display: flex;
  gap: 8px;
  position: relative;
  flex-wrap: wrap;
}
.item-popup__info-parameters-configurator {
  display: none;
}

@media screen and (max-width: 768px) {
  .item-popup__images .carousel__pagination {
    bottom: 80px;
  }
  .item-popup__info-parameters-configurator {
    display: block;
    margin-top: 24px;
  }
  .item-popup__footer {
    width: 100%;
  }
  .item-popup__footer-cart-button {
    flex-grow: 1;
  }
}
</style>
