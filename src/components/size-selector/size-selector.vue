<template>
  <div class="size-selector">
    <span v-for="option in options" :key="option.id">
      <Radio
        :model-value="modelValue === option.id"
        @update:modelValue="$emit('update:modelValue', option.id)"
      >
        {{ option.label }}
      </Radio>
    </span>
  </div>
</template>

<script setup lang="ts">
import { type SizeSelectorNS } from "@/components/size-selector/types.ts";
import Radio from "@/components/radio/radio.vue";

defineProps<SizeSelectorNS.Props>();
defineEmits<SizeSelectorNS.Emits>();
</script>

<style lang="css"></style>
