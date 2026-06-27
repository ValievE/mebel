<template>
  <div class="homepage">
    <img
      :class="{ homepage__image_hidden: !imgReady }"
      class="homepage__image"
      :src="uiStore.isMobile ? vertical : horizontal"
      alt="bg"
      @load="loadHandler"
    />
    <div class="homepage__white"></div>
    <div class="homepage__info">
      <h3 class="homepage__info-subtitle">Мебель в наличии и под заказ</h3>
      <h2 class="homepage__info-title">
        Мебель, которая <br />
        <span class="homepage__info-title_orange"> создаёт </span> уют в доме
      </h2>
      <span class="homepage__info-text">
        Для кухни, гостиной, спальни и ванной. <br />
        Продуманные проекты, качественные материалы и стиль, который будет
        радовать каждый день
      </span>
      <div class="homepage__info-advantages">
        <div
          v-for="advantage in advantages"
          :key="advantage.text"
          class="homepage__info-advantage"
        >
          <div class="homepage__info-advantage-icon-wrapper">
            <Icon
              :name="advantage.icon"
              class="homepage__info-advantage-icon"
            />
          </div>
          <p class="homepage__info-advantage-text">
            {{ advantage.text }}
          </p>
        </div>
      </div>
      <HomepageNavigator class="homepage__navigator" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUiStore } from "@/stores/use-ui-store.ts";
import horizontal from "/images/home_bg_horizontal.jpg";
import vertical from "/images/home_bg_vertical.jpg";
import Icon from "@/components/icon/icon.vue";
import { UIComponentsNS } from "@/types/types.ts";
import HomepageNavigator from "@/pages/homepage/components/homepage-navigator/homepage-navigator.vue";

const uiStore = useUiStore();

const imgReady = ref<boolean>(false);
const loadHandler = () => {
  imgReady.value = true;
};

const advantages: { text: string; icon: UIComponentsNS.Icon.Names }[] = [
  {
    text: "Сделаем замеры",
    icon: "ruler"
  },
  {
    text: "Доставка до 2х недель",
    icon: "delivery-car"
  },
  {
    text: "Гарантия качества",
    icon: "approved"
  }
];
</script>

<style lang="css">
.homepage {
  width: 100%;
  height: 100%;
  background-color: var(--gray-90);
  position: relative;
}
.homepage__image {
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleX(-1);
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-opacity-300);
  opacity: 1;
  z-index: 0;
}
.homepage__image_hidden {
  opacity: 0;
}
.homepage__white {
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  background-color: var(--white);
  z-index: 1;
  box-shadow: 120px 0 240px 200px var(--white);
}
.homepage__info {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--header-height) 92px var(--footer-height);
}
.homepage__info-subtitle {
  font-size: 24px;
  line-height: 24px;
  color: var(--orange-50);
  text-transform: uppercase;
  font-weight: var(--font-weight-semibold);
}
.homepage__info-title {
  margin-top: 48px;
  font-size: 92px;
  line-height: 112px;
  font-weight: var(--font-weight-semibold);
  color: var(--gray-60);
}
.homepage__info-title_orange {
  color: var(--orange-50);
}
.homepage__info-text {
  margin-top: 48px;
  color: var(--gray-60);
  font-weight: var(--font-weight-medium);
  font-size: 28px;
  line-height: 40px;
  max-width: 728px;
}
.homepage__info-advantages {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-top: 48px;
}
.homepage__info-advantage {
  display: flex;
  align-items: center;
  gap: 8px;
}
.homepage__info-advantage-icon-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  border-radius: 48px;
}
.homepage__info-advantages > *:nth-child(3n + 1) {
  .homepage__info-advantage-icon-wrapper {
    background-color: var(--red-50);
  }
}
.homepage__info-advantages > *:nth-child(3n + 2) {
  .homepage__info-advantage-icon-wrapper {
    background-color: var(--orange-50);
  }
}
.homepage__info-advantages > *:nth-child(3n) {
  .homepage__info-advantage-icon-wrapper {
    background-color: var(--gray-50);
  }
}
.homepage__info-advantage-icon {
  margin: auto;
  color: var(--white);
}
.homepage__info-advantage-text {
  font-weight: var(--font-weight-medium);
  max-width: 108px;
  font-size: var(--font-size-m);
  line-height: var(--line-height-m);
  color: var(--gray-60);
}
.homepage__navigator {
  margin-top: 28px;
}

@media screen and (max-width: 768px) {
}
</style>
