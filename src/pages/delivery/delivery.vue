<template>
  <div class="delivery">
    <div class="delivery__info">
      <h2 class="delivery__info-title">Доставка</h2>
      <span class="delivery__info-text">
        Мы осуществляем доставку во все населенные пункты, указанные на карте
        <br />
        (а также за пределами зоны в радиусе 10 км)
      </span>
      <span class="delivery__info-warning">
        Стоимость доставки уточняйте по телефону
      </span>
    </div>
    <DeliveryMap />
  </div>
</template>

<script setup lang="ts">
import DeliveryMap from "@/pages/delivery/components/delivery-map/delivery-map.vue";
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
    bottom: 96px;
    transform: translateX(-50%);
    left: 50%;
  }
}
</style>
