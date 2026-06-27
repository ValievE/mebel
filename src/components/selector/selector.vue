<template>
  <div
    class="selector"
    :class="{
      selector_opened: isOpen,
      selector_disabled: disabled
    }"
  >
    <div class="selector__value" @click="toggleSelector">
      <!--      TODO: toggleSelector & v-click-->
      <span class="selector__value-text">
        {{ valueText }}
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
              'selector__options-item_selected': props.modelValue.includes(
                option.id
              )
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

const valueText = computed<string>(() => {
  if (!props.modelValue.length) return props.placeholder || "";
  if (props.modelValue.length === 1) {
    const item = props.options?.find(opt => props.modelValue.includes(opt.id));
    return props.placeholder + ": " + item?.name || "";
  }
  return props.placeholder + " (Выбрано: " + props.modelValue.length + ")";
});

const getValue = (option: T): Array<T> => {
  if (!props.modelValue.length) return [option];

  if (props.modelValue.includes(option))
    return props.modelValue.filter(i => i !== option);

  return [...props.modelValue, option];
};
const selectOption = (option: T) => {
  if (props.disabled) return;
  emit("update:modelValue", getValue(option));
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
  height: fit-content;
  flex-shrink: 0;
}
.selector__value {
  background-color: var(--red-50);
  padding: 8px 16px;
  border-radius: 100px;
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
  min-width: fit-content;
}
.selector__options__empty-list {
  color: var(--gray-40);
}
.selector__options-item {
  white-space: nowrap;
  padding: 8px 12px;
  cursor: pointer;
  transition: var(--transition-bg-color-100);
  color: var(--gray-50);

  &:hover {
    background-color: var(--gray-10);
    color: var(--gray-50);
  }
}
.selector__options-item_selected {
  background-color: var(--red-10);
  color: var(--red-90);
}

/* DISABLED */
.selector_disabled .selector__value {
  background-color: var(--gray-30);
}
</style>
