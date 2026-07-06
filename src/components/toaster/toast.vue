<template>
  <div
    class="toast"
    :class="{
      toast_success: props.type === 'success',
      toast_info: props.type === 'info'
    }"
  >
    <p class="toast__text">
      <span v-if="titleText" class="toast__text-title">
        {{ titleText }} <br />
      </span>
      {{ props.message }}
    </p>
    <ButtonComponent
      icon-name="close"
      size="s"
      @click="$emit('close', props.id)"
    />
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "@/components/button-component/button-component.vue";
import { type UIComponentsNS } from "@/types/types.ts";

defineEmits<UIComponentsNS.Toast.Emits>();
const { props } = defineProps<{ props: UIComponentsNS.Toast.Props }>();

const titleText = props.type === "error" ? "Ошибка!" : "";
</script>

<style lang="css">
.toast {
  width: 100%;
  padding: 16px 20px;
  background-color: var(--red-50);
  color: var(--white);
  box-shadow: var(--shadow);
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
}
.toast__text-title {
  font-weight: var(--font-weight-medium);
}

.toast_success {
  background-color: var(--orange-50);
}

.toast_info {
  background-color: var(--gray-30);
}
</style>
