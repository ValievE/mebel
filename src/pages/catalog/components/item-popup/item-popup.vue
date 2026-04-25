<template>
  <Popup
    custom-class="item-popup"
    :visible="props.visible"
    @close="$emit('close')"
  >
    item
  </Popup>
</template>

<script setup lang="ts">
import Popup from "@/components/popup/popup.vue";
import type { ItemPopupNS } from "@/pages/catalog/components/item-popup/types.ts";

const { props } = defineProps<{ props: ItemPopupNS.Props }>();
defineEmits<ItemPopupNS.Emits>();
</script>

<style lang="css"></style>
