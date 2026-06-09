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
        @focus="onFocus"
        @blur="onBlur"
      />
    </label>
    <Transition name="fade-100">
      <div v-if="showResults" class="input-component__search-results">
        <ScrollContainer>
          <template v-if="searchResults">
            <template v-for="item in searchResults" :key="item.id">
              <slot name="search-results-item" :props="item">
                <p
                  class="input-component__search-results-item"
                  @click="$emit('select:result', item)"
                >
                  {{ item.name }}
                </p>
              </slot>
            </template>
          </template>
          <span v-else class="input-component__search-results-empty">
            Результатов не обнаружено
          </span>
        </ScrollContainer>
      </div>
    </Transition>
    <Transition name="fade-100">
      <span v-if="error" class="input-component__error">{{ error }}</span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { type UIComponentsNS } from "@/types/types.ts";
import { computed, ref } from "vue";
import ScrollContainer from "@/components/scroll-container/scroll-container.vue";

const props = defineProps<UIComponentsNS.Input.Props>();
const emit = defineEmits<UIComponentsNS.Input.Emits>();

const isFocused = ref<boolean>(false);

const type = computed<string>(() => (props.hidden ? "password" : "text"));
const showResults = computed<boolean>(
  () => isFocused.value && props.search && !!props.modelValue
);

const onFocus = () => {
  isFocused.value = true;
};
const onBlur = () => {
  isFocused.value = false;
};
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
.input-component__search-results {
  position: absolute;
  top: calc(100% - 16px);
  left: 0;
  width: 100%;
  height: 200px;
  background-color: var(--white);
  border: 1px solid var(--gray-30);
  border-radius: 24px;
  z-index: 300;
  overflow: auto;
}
.input-component__search-results-item {
  padding: 8px 16px;
  cursor: pointer;
  transition: var(--transition-bg-color-100);

  &:hover {
    background-color: var(--gray-10);
  }
  &:active {
    background-color: var(--gray-20);
  }
}
.input-component__search-results-empty {
  color: var(--gray-50);
  padding: 8px 16px 0;
  display: block;
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
