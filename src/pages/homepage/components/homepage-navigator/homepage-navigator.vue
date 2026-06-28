<template>
  <div class="homepage-navigator">
    <RouterLink
      v-for="item in items"
      :key="item.id"
      class="homepage-navigator__item"
      :to="{ name: PageName.Catalog, query: { filter: item.id } }"
    >
      <ImagePreviewer
        class="homepage-navigator__item-image"
        :images="[item.image]"
      />
      <div class="homepage-navigator__item-icon-wrapper">
        <Icon class="homepage-navigator__item-icon" name="chevron" />
      </div>
      <div class="homepage-navigator__item-info">
        <div class="homepage-navigator__item-info-head">
          <Icon
            class="homepage-navigator__item-info-head-icon"
            :name="item.icon"
          />
          {{ item.name }}
        </div>
        <span class="homepage-navigator__item-info-description">
          {{ item.description }}
        </span>
      </div>
    </RouterLink>
    <RouterLink
      class="homepage-navigator__button"
      :to="{ name: PageName.Catalog }"
    >
      <ButtonComponent
        class="homepage-navigator__button-item"
        icon-name="catalog"
        type="red"
      >
        В каталог
      </ButtonComponent>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { type HomepageNavigatorNS } from "@/pages/homepage/components/homepage-navigator/types.ts";
import { FurnitureType } from "@/types/types.ts";

import kitchenImg from "/images/sections/kitchen.png";
import bedroomImg from "/images/sections/bedroom.png";
import livingRoomImg from "/images/sections/living_room.png";
import bathroomImg from "/images/sections/bathroom.png";
import { PageName } from "@/router/consts.ts";
import ImagePreviewer from "@/components/image-previewer/image-previewer.vue";
import Icon from "@/components/icon/icon.vue";
import ButtonComponent from "@/components/button-component/button-component.vue";

const items: HomepageNavigatorNS.Item[] = [
  {
    icon: "kitchen",
    id: FurnitureType.Kitchen,
    name: "Кухня",
    description: "Функциональность \nи стиль",
    image: kitchenImg
  },
  {
    icon: "sofa",
    id: FurnitureType.LivingRoom,
    name: "Гостиная",
    description: "Пространство \nдля жизни",
    image: livingRoomImg
  },
  {
    icon: "bed",
    id: FurnitureType.Bedroom,
    name: "Спальня",
    description: "Ваш отдых - \nнаша забота",
    image: bedroomImg
  },
  {
    icon: "bath",
    id: FurnitureType.Bathroom,
    name: "Ванная",
    description: "Комфорт \nи порядок",
    image: bathroomImg
  }
];
</script>

<style lang="css">
.homepage-navigator {
  box-shadow: var(--shadow);
  padding: 20px;
  background-color: var(--white);
  border-radius: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 24px;
  text-decoration: none;
  position: relative;
  width: 100%;
  max-width: 1440px;
}
.homepage-navigator__item {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-right: 24px;
  border-radius: 12px;
  transition: var(--transition-bg-color-100);
  width: 100%;
  overflow: hidden;
  position: relative;
  &:hover {
    background-color: var(--gray-10);
  }
}
.homepage-navigator__item-image {
  width: 128px;
  height: 120px;
  border-radius: 12px;
  flex-shrink: 0;
}
.homepage-navigator__item-icon-wrapper {
  display: none;
}
.homepage-navigator__item-info-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-m);
  line-height: var(--line-height-m);
  color: var(--gray-60);
  font-weight: var(--font-weight-semibold);
}
.homepage-navigator {
  > *:nth-child(4n + 1) {
    .homepage-navigator__item-info-head-icon {
      color: var(--red-50);
    }
  }
  > *:nth-child(4n + 2) {
    .homepage-navigator__item-info-head-icon {
      color: var(--orange-50);
    }
  }
  > *:nth-child(4n + 3) {
    .homepage-navigator__item-info-head-icon {
      color: var(--gray-40);
    }
  }
  > *:nth-child(4n) {
    .homepage-navigator__item-info-head-icon {
      color: var(--blue);
    }
  }
}
.homepage-navigator__item-info-description {
  display: block;
  margin-top: 16px;
  white-space: pre-wrap;
  color: var(--gray-40);
}
.homepage-navigator__button {
  position: absolute;
  left: 0;
  top: 95%;
}

@media screen and (max-width: 768px) {
  .homepage-navigator {
    grid-template-columns: 1fr;
  }
  .homepage-navigator__item-icon-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    display: flex;
    width: 32px;
    height: 32px;
    background-color: var(--red-10);
    border-radius: 50%;
  }
  .homepage-navigator__item-icon {
    margin: auto;
    transform: rotate(270deg);
    color: var(--red-50);
  }
  .homepage-navigator__button {
    position: relative;
    top: auto;
    width: 100%;
  }
  .homepage-navigator__button-item {
    width: 100%;
  }
}
</style>
