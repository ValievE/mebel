<template>
  <div class="orders">
    <ScrollContainer class="orders__scroll">
      <div class="orders__scroll-list">
        <OrderItem v-for="order in orders" :key="order.id" :props="order" />
      </div>
    </ScrollContainer>
  </div>
</template>

<script setup lang="ts">
import { OrderItemNS } from "@/pages/orders/components/order-item/types.ts";
import { onMounted, ref } from "vue";
import Status = OrderItemNS.Status;
import OrderItem from "@/pages/orders/components/order-item/order-item.vue";
import ScrollContainer from "@/components/scroll-container/scroll-container.vue";
import { useCabinetLayout } from "@/stores/use-cabinet-layout.ts";

const { setTitle } = useCabinetLayout();

onMounted(() => {
  setTitle("Заказы");
});

const orders = ref<OrderItemNS.Props[]>([
  {
    id: "aoaoa",
    title: "Заказ №1",
    description: "Какое-нибудь описание товара",
    deliveryDate: "24.05.2026",
    creationDate: "11.05.2026",
    price: 26000,
    quantity: 1,
    status: Status.Delivery,
    imageUrl:
      "https://img.magnific.com/free-photo/interior-modern-kitchen-with-wooden-details_169016-20193.jpg?t=st=1779306019~exp=1779309619~hmac=89310925e6386f655de1366d197e952d504fe7585bca60767175b1856ac87143&w=1480"
  },
  {
    id: "dasdasda",
    title: "Заказ №2",
    description: "Какое-нибудь описание товара",
    deliveryDate: "24.05.2026",
    creationDate: "11.05.2026",
    price: 182000,
    quantity: 1,
    status: Status.Completed,
    imageUrl:
      "https://img.magnific.com/free-photo/3d-rendering-white-minimal-kitchen-with-wood-decoration_105762-2218.jpg?t=st=1779306073~exp=1779309673~hmac=4f7cf442ada883ee6d5264b4ee8347b0f33467384c91053be99806465e26e20d&w=2000"
  }
]);
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
}
</style>
