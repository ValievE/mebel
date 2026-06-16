<template>
  <div class="cart-item">
    <ButtonComponent
      class="cart-item__delete-button"
      size="s"
      icon-name="close-square"
      @click="$emit('delete', props.id)"
    >
      Удалить
    </ButtonComponent>
    <div class="cart-item__wrapper">
      <ImagePreviewer
        class="cart-item__wrapper-image"
        :images="[props.image]"
      />
      <div class="cart-item__wrapper-info">
        <h2 class="cart-item__wrapper-info-title" @click="$emit('click:item')">
          {{ props.title }}
        </h2>
        <div class="cart-item__wrapper-info-tags">
          <Tag
            v-for="tag in props.tags"
            :key="tag.text"
            class="cart-item__wrapper-info-tags-item"
            :type="tag.type"
            :size="uiStore.isMobile ? 'l' : 's'"
          >
            {{ tag.text }}
            <div
              v-if="tag.editable"
              class="cart-item__wrapper-info-tags-item-buttons"
            >
              <ButtonComponent
                :size="uiStore.isMobile ? 'm' : 's'"
                type="orange"
                @click="$emit('change:quantity', false)"
              >
                -
              </ButtonComponent>
              <ButtonComponent
                :size="uiStore.isMobile ? 'm' : 's'"
                type="orange"
                @click="$emit('change:quantity', true)"
              >
                +
              </ButtonComponent>
            </div>
          </Tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagePreviewer from "@/components/image-previewer/image-previewer.vue";
import type { CartPopupNS } from "@/pages/catalog/components/cart-popup/types.ts";
import Tag from "@/components/tag/tag.vue";
import ButtonComponent from "@/components/button-component/button-component.vue";
import { useUiStore } from "@/stores/use-ui-store.ts";

const { props } = defineProps<{ props: CartPopupNS.Item }>();
defineEmits<CartPopupNS.ItemEmits>();

const uiStore = useUiStore();
</script>

<style lang="css">
.cart-item {
  height: 120px;
  width: 100%;
  position: relative;
}
.cart-item__delete-button {
  position: absolute;
  top: -8px;
  right: 0;
  z-index: 2;
}
.cart-item__wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 24px;
  box-shadow: var(--shadow);
  position: relative;
}
.cart-item__wrapper-image {
  width: 240px;
  cursor: pointer;
}
.cart-item__wrapper-info {
  position: absolute;
  top: 0;
  right: 0;
  width: calc(100% - 200px);
  height: 100%;
  overflow: hidden;
  z-index: 1;
  background-color: var(--white);
  padding: 20px;
  border-radius: 24px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}
.cart-item__wrapper-info-title {
  cursor: pointer;
  transition: var(--transition-color-100);

  &:hover {
    color: var(--gray-70);
  }
  &:active {
    color: var(--gray-50);
  }
}
.cart-item__wrapper-info-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 16px;
}
.cart-item__wrapper-info-tags-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
.cart-item__wrapper-info-tags-item-buttons {
  display: flex;
  gap: 4px;
}

@media screen and (max-width: 768px) {
  .cart-item {
    height: 260px;
  }
  .cart-item__wrapper-image {
    width: 160px;
  }
  .cart-item__wrapper-info {
    width: calc(100% - 120px);

    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    z-index: 1;
    background-color: var(--white);
    padding: 20px;
    border-radius: 24px;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }
  .cart-item__wrapper-info-tags-item-buttons {
    gap: 8px;
  }
}
</style>
