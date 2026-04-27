import { ref } from "vue";
import { defineStore } from "pinia";
import { StoreNames } from "@/stores/consts.ts";
import type { UIComponentsNS } from "@/types/types.ts";

export const useUiStore = defineStore(StoreNames.UI, () => {
  const loaders = ref<Record<string, boolean>>({});
  const isMobile = ref<boolean>(window.innerWidth <= 768);
  const toasts = ref<UIComponentsNS.Toast.Props[]>([]);

  const addToast = (message: string, type: UIComponentsNS.Toast.Type) => {
    toasts.value.push({
      message,
      type,
      id: Date.now().toString()
    });
  };
  const removeToast = (id: string) => {
    const position = toasts.value.findIndex(toast => toast.id === id);
    if (position > -1) {
      toasts.value.splice(position, 1);
    }
  };

  return { loaders, isMobile, toasts, addToast, removeToast };
});
