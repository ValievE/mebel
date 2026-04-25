<template>
  <div class="loader">
    <div class="loader__item"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="css">
.loader {
  width: 100%;
  height: 100%;
  display: flex;
}

.loader__item {
  margin: auto;
  width: 100%;
  height: 100%;
  max-width: 120px;
  background-image: url("/loader.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
