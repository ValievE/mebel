<template>
  <div class="order-item">
    <div class="order-item__wrapper">
      <ImagePreviewer
        class="order-item__wrapper-image"
        :images="[props.imageUrl]"
      />
      <div class="order-item__wrapper-info">
        <p class="order-item__wrapper-info-dates">
          <span class="order-item__wrapper-info-dates-item">
            Дата создания: {{ props.creationDate }}
          </span>
          <span
            v-if="props.deliveryDate"
            class="order-item__wrapper-info-dates-item"
          >
            Дата доставки: {{ props.deliveryDate }}
          </span>
        </p>
        <div class="order-item__wrapper-info-main">
          <div class="order-item__wrapper-info-main-texts">
            <h2
              class="order-item__wrapper-info-title"
              @click="$emit('click:item')"
            >
              {{ props.title }}
            </h2>
            <span class="order-item__wrapper-info-description">
              {{ props.description }}
            </span>
          </div>
          <div class="order-item__wrapper-info-main-sum">
            <span class="order-item__wrapper-info-main-sum-price">
              {{ props.price }}Р
            </span>
            <span class="order-item__wrapper-info-main-sum-quantity">
              Количество: {{ props.quantity }}
            </span>
          </div>
        </div>
        <span class="order-item__wrapper-info-delivery">
          Статус заказа: {{ status }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImagePreviewer from "@/components/image-previewer/image-previewer.vue";
import { OrderItemNS } from "@/pages/orders/components/order-item/types.ts";
import { computed } from "vue";

const { props } = defineProps<{ props: OrderItemNS.Props }>();

const status = computed<string>(() => {
  const dict: Record<OrderItemNS.Status, string> = {
    [OrderItemNS.Status.Payment]: "Ожидает оплаты",
    [OrderItemNS.Status.Pending]: "Обрабатывается",
    [OrderItemNS.Status.Production]: "В производстве",
    [OrderItemNS.Status.Delivery]: "Доставляется",
    [OrderItemNS.Status.Completed]: "Завершен"
  };

  return dict[props.status];
});
</script>

<style lang="css">
.order-item {
  height: fit-content;
  width: 100%;
  position: relative;
  display: flex;
}
.order-item__wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 24px;
  box-shadow: var(--shadow);
  position: relative;
}
.order-item__wrapper-image {
  width: 240px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.order-item__wrapper-info {
  position: relative;
  width: calc(100% - 200px);
  height: fit-content;
  overflow: hidden;
  z-index: 2;
  background-color: var(--white);
  padding: 20px;
  border-radius: 24px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  margin-left: auto;
}
.order-item__wrapper-info-dates {
  display: flex;
  gap: 16px;
  color: var(--gray-40);
}
.order-item__wrapper-info-title {
  cursor: pointer;
  transition: var(--transition-color-100);

  &:hover {
    color: var(--gray-70);
  }
  &:active {
    color: var(--gray-50);
  }
}
.order-item__wrapper-info-description {
  margin-top: 12px;
  display: block;
}
.order-item__wrapper-info-main {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.order-item__wrapper-info-main-texts {
  flex: 1;
}
.order-item__wrapper-info-main-sum {
  display: flex;
  flex-direction: column;
  align-items: end;
  flex-shrink: 0;
}
.order-item__wrapper-info-main-sum-price {
  font-size: var(--font-size-l);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-l);
}
.order-item__wrapper-info-main-sum-quantity {
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
  color: var(--gray-40);
}
.order-item__wrapper-info-delivery {
  font-weight: var(--font-weight-semibold);
}
@media screen and (max-width: 768px) {
  .order-item__wrapper-image {
    width: 100%;
    height: 240px;
  }
  .order-item__wrapper-info {
    width: 100%;
    margin: 200px 0 0;
  }
  .order-item__wrapper-info-delivery {
    margin-top: 24px;
  }
}
</style>
