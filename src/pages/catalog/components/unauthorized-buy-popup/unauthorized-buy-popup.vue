<template>
  <Popup
    id="unauthorized-buy-popup"
    custom-class="unauthorized-buy-popup"
    :loading="loading"
    content-width
    content-height
    @close="$emit('close')"
  >
    <h1 class="unauthorized-buy-popup__title">Введите email</h1>
    <span class="unauthorized-buy-popup__subtitle">
      Чтобы мы могли отправить вам подтверждение заказа, чек и всю информацию о
      доставке, пожалуйста, укажите ваш email.
    </span>
    <InputComponent
      class="unauthorized-buy-popup__input"
      :model-value="email"
      label="Email для подтверждения заказа"
      placeholder="example@site.ru"
      :disabled="loading"
      :error="error"
      required
      @update:modelValue="$emit('update:email', $event)"
    />
    <ButtonComponent
      class="unauthorized-buy-popup__button"
      wide
      type="red"
      @click="$emit('accept')"
    >
      Подтвердить
    </ButtonComponent>
  </Popup>
</template>

<script setup lang="ts">
import Popup from "@/components/popup/popup.vue";
import { type UnauthorizedBuyPopupNS } from "@/pages/catalog/components/unauthorized-buy-popup/types.ts";
import InputComponent from "@/components/input-component/input-component.vue";
import ButtonComponent from "@/components/button-component/button-component.vue";

defineProps<UnauthorizedBuyPopupNS.Props>();
defineEmits<UnauthorizedBuyPopupNS.Emits>();
</script>

<style lang="css">
.unauthorized-buy-popup {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
}
.unauthorized-buy-popup__subtitle {
  max-width: 560px;
}
.unauthorized-buy-popup__button {
  margin-top: auto;
}
</style>
