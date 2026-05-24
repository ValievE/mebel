<template>
  <Popup
    :id="props.id"
    custom-class="cart-popup"
    :loading="props.loading"
    @close="$emit('close')"
  >
    <h1 class="cart-popup__title">Корзина</h1>
    <div class="cart-popup__list">
      <ScrollContainer>
        <div class="cart-popup__list-items">
          <TransitionGroup name="fade-100">
            <CartItem
              v-for="item in props.data.items"
              :key="item.id"
              :props="item"
              @change:quantity="
                $emit('change:quantity', { increase: $event, id: item.id })
              "
              @click:item="$emit('click:item', item.id)"
              @delete="$emit('delete', item.id)"
            />
          </TransitionGroup>
        </div>
      </ScrollContainer>
    </div>
    <footer class="cart-popup__footer">
      <p class="cart-popup__footer-text">
        Сумма:
        <span class="cart-popup__footer-text-sum">
          {{ props.data.sum }}
        </span>
      </p>
      <ButtonComponent type="red" @click="$emit('checkout')">
        Оплатить
      </ButtonComponent>
    </footer>
  </Popup>
</template>

<script setup lang="ts">
import Popup from "@/components/popup/popup.vue";
import ButtonComponent from "@/components/button-component/button-component.vue";
import ScrollContainer from "@/components/scroll-container/scroll-container.vue";
import type { CartPopupNS } from "@/pages/catalog/components/cart-popup/types.ts";
import CartItem from "@/pages/catalog/components/cart-popup/components/cart-item/cart-item.vue";

const { props } = defineProps<{ props: CartPopupNS.Props }>();
defineEmits<CartPopupNS.Emits>();
</script>

<style lang="css">
.cart-popup {
  display: flex;
  flex-direction: column;
}
.cart-popup__title {
  font-size: var(--font-size-l);
  line-height: var(--line-height-l);
  padding: 24px 24px 0;
}
.cart-popup__list {
  flex-grow: 1;
  overflow: hidden;
}
.cart-popup__list-items {
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 24px;
}
.cart-popup__footer {
  padding: 0 24px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cart-popup__footer-text-sum {
  font-weight: var(--font-weight-semibold);
}

@media screen and (max-width: 768px) {
}
</style>
