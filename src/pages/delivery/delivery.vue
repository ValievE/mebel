<template>
  <div class="delivery">
    <div class="delivery__info">
      <h2 class="delivery__info-title">Доставка</h2>
      <span class="delivery__info-text">
        Мы осуществляем доставку в следующие населённые пункты:
        <template v-if="cities.length">
          {{ cities.join(", ") }}
        </template>
        <template v-else>уточняйте по телефону</template>
        .
      </span>
      <span class="delivery__info-warning">
        Стоимость доставки уточняйте по телефону
      </span>
    </div>
    <DeliveryMap />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import infrastructure from "@/infrastructure";
import DeliveryMap from "@/pages/delivery/components/delivery-map/delivery-map.vue";

const cities = ref<string[]>([]);

onMounted(async () => {
  try {
    const response = await infrastructure.getDeliveryCities();
    cities.value = response.cities ?? [];
  } catch {
    cities.value = [];
  }
});
</script>

<style lang="css">
.delivery {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
}
.delivery__info {
  width: 100%;
  max-width: 420px;
  max-height: calc(100% - 60px);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 24px;
  background-color: var(--white);
  padding: 32px 24px;
  border-radius: 24px;
  box-shadow: var(--shadow);
  z-index: 1;
}
.delivery__info-title {
  font-size: 32px;
  font-weight: 600;
}
.delivery__info-text {
  display: block;
  margin-top: 24px;
  color: var(--gray-70);
}
.delivery__info-warning {
  display: block;
  margin-top: 12px;
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
  color: var(--gray-50);
}

@media screen and (max-width: 768px) {
  .delivery__info {
    width: calc(100% - 32px);
    max-width: none;
    top: unset;
    bottom: var(--footer-height);
    transform: translateX(-50%);
    left: 50%;
  }
}
</style>
