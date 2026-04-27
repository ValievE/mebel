<template>
  <Carousel
    :enabled="images.length > 1"
    class="image-previewer"
    :class="{
      'image-previewer_single': images.length < 2
    }"
    :wrap-around="images.length > 1"
  >
    <Slide v-for="slide in images" :key="slide">
      <Transition name="fade-300">
        <div v-if="loading" class="image-previewer__slide-loader">
          <div class="image-previewer__slide-loader-item"></div>
        </div>
      </Transition>
      <img
        v-show="!loading"
        class="image-previewer__slide-item"
        :src="slide"
        alt="image"
        @load="handleLoad"
      />
    </Slide>
    <template v-if="images.length > 1" #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import type { UIComponentsNS } from "@/types/types.ts";
import { ref } from "vue";

defineProps<UIComponentsNS.ImagePreviewer.Props>();

const loading = ref<boolean>(true);
const handleLoad = () => {
  loading.value = false;
};
</script>

<style lang="css">
.image-previewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--gray-40);
}
.image-previewer_single {
  pointer-events: none;
}
.image-previewer__slide-loader {
  z-index: 1;
  background-color: var(--gray-40);
}
.image-previewer__slide-loader,
.image-previewer__slide-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.image-previewer__slide-item {
  object-fit: cover;
}
.image-previewer__slide-loader-item {
  width: 50%;
  height: 100%;
  background-color: var(--white);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: transform 1s ease-out;
  animation: imageLoading 1s infinite ease-in-out;
}

@keyframes imageLoading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}
</style>
