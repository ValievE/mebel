<template>
  <button class="button-component" :class="customClasses" @click="clickHandler">
    <Icon
      v-if="props.iconName"
      class="button-component__icon"
      :size="iconSize"
      :name="props.iconName"
    />
    <span v-if="!isIconOnly" class="button-component__text">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import Icon from "@/components/icon/icon.vue";
import type { UIComponentsNS } from "@/types/types.ts";
import { computed, useSlots } from "vue";

const slots = useSlots();

const props = withDefaults(defineProps<UIComponentsNS.Button.Props>(), {
  size: "m",
  type: "white"
});
const emit = defineEmits<UIComponentsNS.Button.Emits>();

const isIconOnly = computed<boolean>(() => !slots.default && !!props.iconName);
const customClasses = computed<string[]>(() => {
  const classes: string[] = [];

  classes.push(`button-component_${props.size}`);
  classes.push(`button-component_${props.type}`);

  if (isIconOnly.value) classes.push("button-component_square");
  if (props.disabled) classes.push("button-component_disabled");
  if (props.wide) classes.push("button-component_wide");

  return classes;
});
const iconSize = computed<number>(() => {
  switch (props.size) {
    case "m":
      return 20;
    case "l":
      return 28;
    case "xl":
      return 32;
    default:
      return 20;
  }
});

const clickHandler = (e: Event) => {
  if (props.disabled) return;
  emit("click", e);
};
</script>

<style lang="css">
.button-component {
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  cursor: pointer;
  border: 0;
  box-shadow: var(--shadow);
  background-color: var(--white);
  transition: var(--transition-bg-color-100);
  user-select: none;
  flex-shrink: 0;

  &:hover {
    background-color: var(--gray-20);
  }
  &:active {
    background-color: var(--gray-30);
  }
}
.button-component__text {
  position: relative;
}

.button-component_square {
  aspect-ratio: 1;
}

.button-component_s {
  padding: 4px 8px;
  gap: 4px;
  & > * {
    font-size: var(--font-size-s);
    line-height: var(--line-height-s);
  }
}
.button-component_m {
  padding: 10px 16px;
  gap: 8px;
  & > * {
    font-size: var(--font-size-m);
    line-height: var(--line-height-m);
  }
}
.button-component_l {
  padding: 12px 16px;
  gap: 8px;
  & > * {
    font-size: var(--font-size-l);
    line-height: var(--line-height-l);
  }
}
.button-component_xl {
  padding: 16px 24px;
  gap: 12px;
  & > * {
    font-size: var(--font-size-xl);
    line-height: var(--line-height-xl);
  }
}
.button-component_red {
  background-color: var(--red-50);
  color: var(--white);
  box-shadow: none;
  &:hover {
    background-color: var(--red-70);
  }
  &:active {
    background-color: var(--red-80);
  }
}
.button-component_orange {
  background-color: var(--orange-50);
  color: var(--white);
  box-shadow: none;
  &:hover {
    background-color: var(--orange-70);
  }
  &:active {
    background-color: var(--orange-80);
  }
}
.button-component_link {
  box-shadow: none;
  color: var(--gray-50);
  background: none;
  flex-direction: column;
  gap: 2px;

  &:hover {
    background: none;
    color: var(--gray-90);
  }
  &:active {
    background: none;
    color: var(--gray-60);
  }
}
.button-component_wide {
  width: 100%;
}

.button-component_disabled {
  cursor: not-allowed;
  pointer-events: none;
  background-color: var(--gray-10);
  &.button-component_red {
    background-color: var(--red-20);
  }
  &.button-component_orange {
    background-color: var(--orange-20);
  }
}
</style>
