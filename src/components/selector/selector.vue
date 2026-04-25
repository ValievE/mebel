<template>
  <div
    class="selector"
    :class="{
      selector_opened: isOpen,
      selector_disabled: disabled
    }"
  >
    <div class="selector__value" @click="toggleSelector">
      <span class="selector__value-text">
        {{
          selectedOption
            ? placeholder + ": " + selectedOption.name
            : placeholder
        }}
      </span>
      <div class="selector__value-icon">
        <Icon name="chevron" />
      </div>
    </div>
    <Transition name="fade-100">
      <div
        v-if="isOpen"
        v-click-outside="toggleSelector"
        class="selector__options"
      >
        <span v-if="!options?.length" class="selector__options__empty-list">
          Список пуст
        </span>
        <template v-else>
          <div
            v-for="option in options"
            :key="String(option.id)"
            class="selector__options-item"
            :class="{
              'selector__options-item_selected': option.id === props.modelValue
            }"
            @click="selectOption(option.id)"
          >
            {{ option.name }}
          </div>
        </template>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref, computed } from "vue";
import { type UIComponentsNS } from "@/types/types.ts";
import Icon from "@/components/icon/icon.vue";

const props = defineProps<UIComponentsNS.Selector.Props<T>>();
const emit = defineEmits<UIComponentsNS.Selector.Emits<T>>();

const isOpen = ref(false);

const selectedOption = computed(() => {
  return props.options?.find(opt => opt.id === props.modelValue);
});

const selectOption = (option: T) => {
  if (props.disabled) return;
  emit("update:modelValue", option);
  toggleSelector();
};
const toggleSelector = () => {
  if (props.disabled && !isOpen.value) return;
  isOpen.value = !isOpen.value;
};
</script>

<style lang="css">
.selector {
  position: relative;
}
.selector__value {
  background-color: var(--red-60);
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  user-select: none;
}
.selector__value-text {
  color: var(--white);
  font-size: var(--font-size-m);
  line-height: var(--line-height-m);
}
.selector__value-icon {
  color: var(--white);
  transition: all 0.3s ease;
}
.selector_opened .selector__value-icon {
  transform: rotate(180deg);
}
.selector__options {
  padding: 8px 0;
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: var(--white);
  border-radius: 16px;
  overflow: hidden;
  z-index: 1;
  box-shadow: var(--shadow);
  user-select: none;
}
.selector__options__empty-list {
  color: var(--gray-40);
}
.selector__options-item {
  padding: 8px 12px;
  cursor: pointer;
  transition: var(--transition-bg-color-100);

  &:hover {
    background-color: var(--red-20);
  }
}
.selector__options-item_selected {
  background-color: var(--red-10);
}

/* DISABLED */
.selector_disabled .selector__value {
  background-color: var(--red-40);
}
</style>
