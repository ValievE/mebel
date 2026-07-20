<template>
  <Popup
    id="checkout-popup"
    custom-class="checkout-popup"
    :loading="loading"
    content-width
    content-height
    @close="$emit('close')"
  >
    <h1 class="checkout-popup__title">Оформление заказа</h1>
    <span class="checkout-popup__subtitle">
      {{ description }}
    </span>
    <InputComponent
      v-if="guest"
      class="checkout-popup__email"
      :model-value="email"
      label="Ваш email"
      placeholder="example@site.ru"
      :disabled="loading"
      :error="emailError"
      required
      @update:modelValue="$emit('update:email', $event)"
    />
    <InputComponent
      class="checkout-popup__address"
      required
      label="Адрес доставки"
      placeholder="Г. Уфа, ул. Пархоменко, 157В, кв. 9999"
      :model-value="address"
      :search-results="addressSuggestions"
      search
      @select:result="$emit('update:address', $event.name)"
      @update:modelValue="$emit('update:address', $event)"
    />
    <ButtonComponent
      class="checkout-popup__button"
      wide
      type="red"
      @click="$emit('accept')"
    >
      Оплатить
    </ButtonComponent>
  </Popup>
</template>

<script setup lang="ts">
import Popup from "@/components/popup/popup.vue";
import { type CheckoutPopupNS } from "@/pages/catalog/components/checkout-popup/types.ts";
import InputComponent from "@/components/input-component/input-component.vue";
import ButtonComponent from "@/components/button-component/button-component.vue";
import { computed } from "vue";
import type { UIComponentsNS } from "@/types/types.ts";

const props = defineProps<CheckoutPopupNS.Props>();
defineEmits<CheckoutPopupNS.Emits>();

const description = computed<string>(() => {
  if (props.guest)
    return "Чтобы мы могли отправить вам подтверждение заказа, чек и информацию о доставке, укажите email и адрес доставки.";
  return "Чтобы мы могли отправить вам подтверждение заказа, чек и информацию о доставке, укажите адрес доставки.";
});

const addressSuggestions = computed<UIComponentsNS.Input.SearchItem[]>(() => {
  if (!props.addressSuggestions?.length) return [];
  return props.addressSuggestions.map(i => ({ id: i, name: i }));
});
</script>

<style lang="css">
.checkout-popup {
  display: flex;
  flex-direction: column;
  padding: 24px;
}
.checkout-popup__subtitle {
  max-width: 560px;
  color: var(--gray-70);
  margin: 24px 0;
}
.checkout-popup__address {
  margin-bottom: 144px;
}
.checkout-popup__button {
  margin-top: auto;
}
</style>
