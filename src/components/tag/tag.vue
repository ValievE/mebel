<template>
  <div class="tag" :class="customClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type UIComponentsNS } from "@/types/types.ts";
import { computed } from "vue";

const props = withDefaults(defineProps<UIComponentsNS.Tag.Props>(), {
  size: "m",
  style: "white"
});

const customClass = computed(() => {
  const classes: string[] = [];
  classes.push(`tag_${props.size}`);
  classes.push(`tag_${props.type}`);
  return classes;
});
</script>

<style lang="css">
.tag {
  padding: 4px 12px;
  background-color: var(--white);
  height: fit-content;
  font-weight: var(--font-weight-semibold);
  border-radius: 100px;
  user-select: none;
  width: fit-content;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: var(--shadow);
}
.tag_s {
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
}
.tag_m {
  font-size: var(--font-size-m);
  line-height: var(--line-height-m);
}
.tag_l {
  padding: 8px 16px;
  font-size: var(--font-size-l);
  line-height: var(--line-height-l);
}
.tag_xl {
  padding: 8px 16px;
  font-size: var(--font-size-xl);
  line-height: var(--line-height-xl);
}
.tag_red {
  background-color: var(--red-60);
  color: var(--white);
}
</style>
