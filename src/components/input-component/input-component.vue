<template>
  <div
    class="input-component"
    :class="{
      'input-component_required': required,
      'input-component_disabled': disabled,
      'input-component_error': error
    }"
  >
    <label class="input-component__wrapper">
      <span v-if="label" class="input-component__wrapper-title">
        {{ label }}
      </span>
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        class="input-component__wrapper-input"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
        @input="inputHandler"
      />
    </label>
    <Transition name="fade-100">
      <span v-if="error" class="input-component__error">{{ error }}</span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { type UIComponentsNS } from "@/types/types.ts";
import { computed } from "vue";

const props = defineProps<UIComponentsNS.Input.Props>();
const emit = defineEmits<UIComponentsNS.Input.Emits>();

const type = computed<string>(() => (props.hidden ? "password" : "text"));

const inputHandler = (e: InputEvent): void => {
  e.preventDefault();
  if (props.disabled) return;
  const target = e.target as HTMLInputElement;

  emit("update:modelValue", target.value);
};
</script>

<style lang="css">
.input-component {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
  position: relative;
}
.input-component__wrapper {
  width: 100%;
  height: fit-content;
}
.input-component__wrapper-title {
  display: block;
  font-weight: var(--font-weight-medium);
  color: var(--gray-70);
  margin-bottom: 8px;
}
.input-component__wrapper-input {
  width: 100%;
  display: block;
  border: 1px solid var(--gray-30);
  padding: 8px 16px;
  border-radius: 48px;
  outline: none;
  transition-property: background-color, color, border;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
  font-size: var(--font-size-m);
  line-height: var(--line-height-m);

  &:focus {
    border: 1px solid var(--gray-60);
  }
}
.input-component__error {
  position: absolute;
  bottom: 0;
  font-size: var(--font-size-s);
  color: var(--red-60);
}

/* REQUIRED */

.input-component_required {
  .input-component__wrapper-title::after {
    content: "*";
    color: var(--red-60);
    margin-left: 2px;
  }
}

/* DISABLED */

.input-component_disabled {
  .input-component__wrapper-title {
    color: var(--gray-50);
  }
  .input-component__wrapper-input {
    background-color: var(--gray-10);
    cursor: not-allowed;
  }
}

/* ERROR */

.input-component_error {
  .input-component__wrapper-input {
    border: 1px solid var(--red-60);
  }
}
</style>
