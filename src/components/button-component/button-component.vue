<template>
  <button
    class="button-component"
    :class="customClasses"
    @click="clickHandler"
  >
    <Icon
      class="button-component__icon"
      v-if="props.iconName"
      :size="iconSize"
      :name="props.iconName"
    />
    <span
      v-if="!isIconOnly"
      class="button-component__text"
    >
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
  import Icon from '@/components/icon/icon.vue';
  import type { UIComponentsNS } from '@/types/types.ts';
  import { computed, useSlots } from 'vue';

  const slots = useSlots();

  const props = withDefaults(defineProps<UIComponentsNS.Button.Props>(), {
    size: 'm',
  });
  const emit = defineEmits<UIComponentsNS.Button.Emits>();

  const isIconOnly = computed<boolean>(() => !slots.default && !!props.iconName);
  const customClasses = computed<string[]>(() => {
    const classes: string[] = [];

    classes.push(`button-component_${props.size}`);

    if (isIconOnly.value) classes.push('button-component_square');
    if (props.disabled) classes.push('button-component_disabled');

    return classes;
  });
  const iconSize = computed<number>(() => {
    switch (props.size) {
      case 'm':
        return 24;
      case 'l':
        return 28;
      case 'xl':
        return 32;
      default:
        return 20;
    }
  });

  const clickHandler = (e: MouseEvent) => {
    e.preventDefault();
    if (props.disabled) return;
    emit('click');
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

    &:hover {
      background-color: var(--gray-20);
    }
    &:active {
      background-color: var(--gray-30);
    }
  }
  .button-component_disabled {
    cursor: not-allowed;
    pointer-events: none;
    background-color: var(--gray-10);
  }
  .button-component_square {
    aspect-ratio: 1;
  }
  .button-component_s {
    padding: 4px 8px;
    gap: 4px;
    & > * {
      font-size: var(--font-size-s);
    }
  }
  .button-component_m {
    padding: 8px 16px;
    gap: 8px;
    & > * {
      font-size: var(--font-size-m);
    }
  }
  .button-component_l {
    padding: 8px 16px;
    gap: 8px;
    & > * {
      font-size: var(--font-size-l);
    }
  }
  .button-component_xl {
    padding: 12px 24px;
    gap: 12px;
    & > * {
      font-size: var(--font-size-xl);
    }
  }
</style>
