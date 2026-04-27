<template>
  <div class="empty-list">
    <Icon class="empty-list__icon" name="warning" :size="48" />
    <h1 class="empty-list__title">{{ title || "Список пуст" }}</h1>
    <span v-if="subtitle" class="empty-list__subtitle">{{ subtitle }}</span>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/icon/icon.vue";
import type { UIComponentsNS } from "@/types/types.ts";

defineProps<UIComponentsNS.EmptyList.Props>();
</script>

<style lang="css">
.empty-list {
  display: flex;
  width: fit-content;
  max-width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.empty-list__icon {
  color: var(--gray-50);
}
.empty-list__title {
  margin-top: 16px;
  font-size: var(--font-size-l);
}
.empty-list__subtitle {
  margin-top: 12px;
  width: 320px;
  max-width: 100%;
  font-size: var(--font-size-s);
  color: var(--gray-50);
}
</style>
