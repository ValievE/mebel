<template>
  <Carousel class="image-previewer" wrap-around>
    <Slide class="image-previewer__slide" v-for="slide in images" :key="slide">
      <img class="image-previewer__slide-item" :src="slide" alt="image" />
    </Slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import type { UIComponentsNS } from "@/types/types.ts";

defineProps<UIComponentsNS.ImagePreviewer.Props>();
</script>

<style lang="css">
.image-previewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-previewer__slide-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
