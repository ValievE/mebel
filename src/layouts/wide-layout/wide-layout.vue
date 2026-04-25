<template>
  <div class="wide-layout">
    <RouterView />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="css">
.wide-layout {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
