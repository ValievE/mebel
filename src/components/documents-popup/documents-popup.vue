<template>
  <Popup id="documents" custom-class="documents-popup" @close="$emit('close')">
    <RouterLink
      v-for="link in documentLinks"
      :key="link.id"
      class="documents-popup__item"
      active-class="documents-popup__item_active"
      :to="{ name: PageName.Legal, params: { id: link.id } }"
      @click="$emit('close')"
    >
      {{ link.name }}
    </RouterLink>
  </Popup>
</template>

<script setup lang="ts">
import Popup from "@/components/popup/popup.vue";
import { PageName } from "@/router/consts.ts";
import { documentLinks } from "@/common/consts.ts";

defineEmits<{ (e: "close"): void }>();
</script>

<style lang="css">
.documents-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
}

.documents-popup__item {
  text-decoration: none;
  transition: var(--transition-color-100);
  color: var(--gray-50);
  user-select: none;
  cursor: pointer;
  width: fit-content;
  white-space: nowrap;
  font-size: var(--font-size-l);
  line-height: var(--line-height-l);

  &:hover {
    color: var(--gray-90);
  }

  &:active {
    color: var(--gray-60);
  }
}

.documents-popup__item_active {
  color: var(--gray-90);
}
</style>
