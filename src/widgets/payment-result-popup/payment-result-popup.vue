<template>
  <Popup
    id="payment-result"
    size="s"
    content-height
    content-width
    :loading="false"
    @close="close"
  >
    <div class="payment-result-popup">
      <h2 class="payment-result-popup__title">
        {{ isSuccess ? "Заказ оформлен" : "Оплата не прошла" }}
      </h2>
      <p class="payment-result-popup__text">
        {{
          isSuccess
            ? "Оплата прошла успешно. Заказ принят в обработку."
            : "Не удалось завершить оплату. Попробуйте ещё раз."
        }}
      </p>
      <div class="payment-result-popup__actions">
        <ButtonComponent v-if="isSuccess" type="red" @click="goToOrders">
          Перейти к заказам
        </ButtonComponent>
        <ButtonComponent v-else type="red" @click="close">
          Закрыть
        </ButtonComponent>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import Popup from "@/components/popup/popup.vue";
import ButtonComponent from "@/components/button-component/button-component.vue";
import { useUiStore } from "@/stores/use-ui-store.ts";
import { PageName } from "@/router/consts.ts";
import { type PaymentResultPopupNS } from "@/widgets/payment-result-popup/types.ts";

const props = defineProps<{ mode: PaymentResultPopupNS.Mode | null }>();
const emit = defineEmits<{ (e: "close"): void }>();

const uiStore = useUiStore();
const router = useRouter();

const isSuccess = computed(() => props.mode === "success");

const close = () => {
  uiStore.closePopup("payment-result");
  emit("close");
};

const goToOrders = async () => {
  close();
  await router.push({ name: PageName.Orders });
};
</script>

<style lang="css">
.payment-result-popup {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
}
.payment-result-popup__title {
  font-size: var(--font-size-l);
  line-height: var(--line-height-l);
}
.payment-result-popup__text {
  color: var(--gray-60);
}
.payment-result-popup__actions {
  margin: 8px auto 0;
}
</style>
