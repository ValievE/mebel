<template>
  <Popup
    custom-class="item-popup"
    :visible="props.visible"
    :loading="props.loading"
    @close="$emit('close')"
  >
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
      </ScrollContainer>
      <ButtonComponent
        :disabled="!props.data.price"
        class="item-popup__info-button"
      >
        {{ buttonText }}
      </ButtonComponent>
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

const { props } = defineProps<{ props: ItemPopupNS.Props }>();
defineEmits<ItemPopupNS.Emits>();

const buttonText = computed<string>(() => {
  if (props.data.price) return props.data.price + " Р";
  return "Цена индивидуальная";
});
</script>

<style lang="css">
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
.item-popup__info-button {
  margin-left: auto;
  margin-top: auto;
}

@media screen and (max-width: 768px) {
  .item-popup__images .carousel__pagination {
    bottom: 80px;
  }
  .item-popup__info-title {
  }
}
</style>
