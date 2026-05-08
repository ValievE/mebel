import { ref } from "vue";
import { defineStore } from "pinia";
import type { UIComponentsNS } from "@/types/types.ts";
import { StoreNames } from "@/stores/types.ts";

export const useUiStore = defineStore(StoreNames.UI, () => {
  const loaders = ref<Record<string, boolean>>({});
  const isMobile = ref<boolean>(window.innerWidth <= 768);
  const toasts = ref<UIComponentsNS.Toast.Props[]>([]);
  const popups = ref<string[]>([]);

  const addToast = (message: string, type: UIComponentsNS.Toast.Type) => {
    const id = Date.now().toString();
    toasts.value.push({
      message,
      type,
      id
    });

    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };
  const removeToast = (id: string) => {
    const position = toasts.value.findIndex(toast => toast.id === id);
    if (position > -1) {
      toasts.value.splice(position, 1);
    }
  };
  const isPopupOpened = (id: string): boolean => {
    return popups.value[0] === id;
  };
  const openPopup = (id: string) => {
    popups.value.unshift(id);
  };
  const closePopup = (id: string) => {
    popups.value.splice(popups.value.indexOf(id), 1);
  };

  return {
    loaders,
    isMobile,
    toasts,
    addToast,
    removeToast,
    openPopup,
    isPopupOpened,
    closePopup
  };
});
