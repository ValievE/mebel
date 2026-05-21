<template>
  <div class="settings">
    <div class="settings__item">
      <Tumbler v-model="form.advertisement" />
      <span class="settings__item-text">
        Получать рекламную рассылку на электронную почту
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCabinetLayout } from "@/stores/use-cabinet-layout.ts";
import { onMounted, reactive } from "vue";
import Tumbler from "@/components/tumbler/tumbler.vue";
import { type Settings } from "@/pages/settings/types.ts";

const { setTitle } = useCabinetLayout();

const form: Settings.Form = reactive({
  advertisement: false
});

onMounted(() => {
  setTitle("Настройки");
});
</script>

<style lang="css">
.settings {
  padding: 24px 24px 24px 0;
}
.settings__item {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
