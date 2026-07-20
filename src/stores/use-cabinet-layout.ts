import { ref } from "vue";
import { defineStore } from "pinia";
import { StoreNames } from "@/stores/types.ts";

export const useCabinetLayout = defineStore(StoreNames.CabinetLayout, () => {
  const title = ref<string>("");

  const setTitle = (value: string) => {
    title.value = value;
  };

  return {
    title,
    setTitle
  };
});
