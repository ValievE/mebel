<template>
  <YandexMap
    v-model="map"
    class="delivery-map"
    :settings="{
      location: {
        center: [54.110925, 54.548013],
        zoom: 10
      }
    }"
  >
    <YandexMapMarker
      :settings="{
        coordinates: [54.110925, 54.548013]
      }"
    >
      <a
        class="delivery-map__marker"
        href="geo:0,0?q=Кандры,+Ленина 15,+Мебель+вашего+дома"
      >
        <div class="delivery-map__marker-icon">
          <Icon name="logo-outline" />
        </div>
        <div class="delivery-map__marker-cloud">
          Наш магазин находится здесь
          <span class="delivery-map__marker-cloud-address">
            Кандры, ул. Ленина, 15
          </span>
        </div>
      </a>
    </YandexMapMarker>
    <YandexMapFeature
      :settings="{
        geometry: {
          type: 'Polygon',
          coordinates: [coords]
        },
        style: {
          stroke: [{ color: '#6d5858', width: 2 }],
          fill: '#ff9090',
          fillOpacity: 0.2,
          interactive: true,
          cursor: 'pointer'
        }
      }"
    />
    <YandexMapDefaultSchemeLayer :settings="{ theme: 'dark' }" />
    <YandexMapDefaultFeaturesLayer />
    <YandexMapControls :settings="{ position: 'right' }">
      <YandexMapZoomControl />
    </YandexMapControls>
  </YandexMap>
</template>

<script setup lang="ts">
import Icon from "@/components/icon/icon.vue";
import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapFeature,
  YandexMapMarker,
  YandexMapZoomControl
} from "vue-yandex-maps";
import type { YMap } from "@yandex/ymaps3-types";
import type { LngLat } from "@yandex/ymaps3-types/common/types/lng-lat";
import { shallowRef } from "vue";

const coords: LngLat[] = [
  [53.57937229882693, 54.37236734861589],
  [53.43168872757573, 54.36390270426819],
  [53.32205859186165, 54.38135911296959],
  [53.21877069540375, 54.39087764842845],
  [53.18434139658444, 54.42681654953351],
  [53.204274148532456, 54.479610411871484],
  [53.30303187409309, 54.54181923782854],
  [53.462493889677205, 54.61497711071824],
  [53.5739360937502, 54.62286395990289],
  [53.73974034859052, 54.62128671291277],
  [53.99252388465854, 54.595516316538756],
  [54.265240172674574, 54.56920309708307],
  [54.306011710750056, 54.51547118366081],
  [54.29332723223769, 54.46377943386206],
  [54.21178415608671, 54.4257599746243],
  [54.03329542273402, 54.395107396807305],
  [53.80769291204966, 54.40779401395194],
  [53.57937229882693, 54.37236734861589]
];

const map = shallowRef<null | YMap>(null);
</script>

<style lang="css">
.delivery-map {
  width: 100%;
  height: 100%;
}
.delivery-map__marker {
  width: 36px;
  height: 36px;
  position: relative;
  border-radius: 50%;
}
.delivery-map__marker-icon {
  background-color: var(--white);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--red-50);
}
.delivery-map__marker-cloud {
  position: absolute;
  bottom: calc(100% + 24px);
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  padding: 12px 20px;
  border-radius: 16px;
  background-color: var(--white);
  white-space: nowrap;
  text-align: center;
  color: var(--gray-50);
}
.delivery-map__marker-cloud-address {
  display: block;
  color: var(--gray-90);
  font-weight: var(--font-weight-semibold);
}
</style>
