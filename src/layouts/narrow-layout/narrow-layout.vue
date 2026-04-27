<template>
  <div class="narrow-layout">
    <RouterView />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="css">
.narrow-layout {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: var(--max-width);
  margin: 0 auto;
}
@media screen and (max-width: 768px) {
  .narrow-layout {
    padding: 0 12px;
  }
}
</style>
