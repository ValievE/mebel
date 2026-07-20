<template>
  <div class="orders">
    <ScrollContainer class="orders__scroll">
      <Loader v-if="loading" />

      <div v-else class="orders__scroll-list">
        <WarningBadge
          v-if="error"
          class="orders__empty"
          title="Не удалось загрузить заказы"
          :subtitle="error"
        />
        <WarningBadge
          v-else-if="!orders.length"
          class="orders__empty"
          title="Заказов пока нет"
          subtitle="Оформите заказ в каталоге — он появится здесь."
        />
        <template v-else>
          <OrderItem v-for="order in orders" :key="order.id" :props="order" />
        </template>
      </div>
    </ScrollContainer>
  </div>
</template>

<script setup lang="ts">
import { OrderItemNS } from "@/pages/orders/components/order-item/types.ts";
import { onMounted, ref } from "vue";
import OrderItem from "@/pages/orders/components/order-item/order-item.vue";
import ScrollContainer from "@/components/scroll-container/scroll-container.vue";
import Loader from "@/components/loader/loader.vue";
import WarningBadge from "@/components/warning-badge/warning-badge.vue";
import { useCabinetLayout } from "@/stores/use-cabinet-layout.ts";
import infrastructure from "@/infrastructure";
import { getOrdersAdapter } from "@/pages/orders/adapters.ts";

const { setTitle } = useCabinetLayout();

const orders = ref<OrderItemNS.Props[]>([]);
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  setTitle("Заказы");
  try {
    const response = await infrastructure.getOrders();
    orders.value = getOrdersAdapter(response);
  } catch {
    error.value = "Попробуйте обновить страницу позже.";
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="css">
.orders {
  width: 100%;
  height: 100%;
}
.orders__scroll-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 24px 24px 0;
  height: fit-content;
}
.orders__empty {
  margin: auto;
}

@media screen and (max-width: 768px) {
  .orders__scroll-list {
    padding: 24px 0;
  }
}
</style>
