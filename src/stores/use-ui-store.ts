import { ref } from "vue";
import { defineStore } from "pinia";
import { StoreNames } from "@/stores/consts.ts";

export const useUiStore = defineStore(StoreNames.UI, () => {
  const loaders = ref<Record<string, boolean>>({});
  const isBurgerOpen = ref<boolean>(false);
  const isMobile = ref<boolean>(window.innerWidth <= 768);

  return { loaders, isBurgerOpen, isMobile };
});
