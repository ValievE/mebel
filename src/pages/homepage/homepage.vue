<template>
  <div class="homepage">
    <h1 class="homepage__title">
      КОРПУСНАЯ И МЯГКАЯ <br />
      МЕБЕЛЬ ПОД ЗАКАЗ
    </h1>
    <h3 class="homepage__text">
      ШИРОКИЙ ВЫБОР МЕБЕЛИ ПОД ЗАКАЗ <br />
      С БЕСПЛАТНЫМ ЗАМЕРОМ
    </h3>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="css">
.homepage {
  width: 100%;
  height: 100%;
  background-image: url("/images/home_bg_horizontal.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.homepage__title,
.homepage__text {
  text-align: center;
  position: absolute;
  left: 50%;
  width: 100%;
  padding: 0 32px;
  max-width: var(--max-width);
  cursor: default;
}
.homepage__title {
  font-weight: var(--font-weight-bold);
  top: 44%;
  transform: translate(-50%, -50%);
  font-size: 80px;
  line-height: 72px;
  color: var(--white);
  text-shadow: var(--shadow-l);
  overflow: hidden;
  text-overflow: ellipsis;
}
.homepage__text {
  bottom: 25%;
  transform: translateX(-50%);
  font-weight: var(--font-weight-medium);
  font-size: 32px;
  line-height: 40px;
  color: var(--white);
  text-shadow: var(--shadow);
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (max-width: 768px) {
  .homepage {
    background-image: url("/images/home_bg_vertical.jpg");
  }
  .homepage__title {
    font-size: 42px;
    line-height: 42px;
  }
  .homepage__text {
    font-size: 24px;
    line-height: 32px;
    bottom: 20%;
  }
}
</style>
