<template>
  <Popup id="uikit" custom-class="uikit-popup">
    <h2 class="icons-title">Иконки</h2>
    <div class="icons">
      <div
        v-for="icon in UIComponentsNS.Icon.names"
        :key="icon"
        class="icons__item"
      >
        <Icon :name="icon" />
        <span class="icons-item__text">
          {{ icon }}
        </span>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import Popup from "@/components/popup/popup.vue";
import { UIComponentsNS } from "@/types/types.ts";
import Icon from "@/components/icon/icon.vue";
</script>

<style lang="css">
.uikit-popup {
  padding: 24px;
}
.icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  gap: 24px;
  margin-top: 16px;
}
.icons__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.icons-item__text {
  font-size: 12px;
  text-align: center;
  line-height: 12px;
  color: var(--gray-40);
}
</style>
