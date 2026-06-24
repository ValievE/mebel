<template>
  <teleport to=".overlay">
    <Transition name="fade-100">
      <div
        v-if="uiStore.isPopupOpened(id)"
        class="popup-overlay"
        @mousedown.self="$emit('close')"
      >
        <div
          class="popup"
          :class="{
            [`popup_${size}`]: size,
            'popup_content-height': contentHeight,
            'popup_content-width': contentWidth
          }"
        >
          <ButtonComponent
            class="popup__close-button"
            icon-name="close"
            size="s"
            @click="$emit('close')"
          />
          <Transition name="fade-100">
            <Loader v-if="loading" class="popup__loader" />
            <div
              v-else
              class="popup__content"
              :class="{
                [`${customClass}`]: !!customClass
              }"
            >
              <slot />
            </div>
          </Transition>
        </div>
        <div v-if="$slots['additional-popup']" class="additional-popup">
          <slot name="additional-popup" />
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script setup lang="ts">
import { type UIComponentsNS } from "@/types/types.ts";
import ButtonComponent from "@/components/button-component/button-component.vue";
import Loader from "@/components/loader/loader.vue";
import { useUiStore } from "@/stores/use-ui-store.ts";

defineProps<UIComponentsNS.Popup.Props>();
defineEmits<UIComponentsNS.Popup.Emits>();

const uiStore = useUiStore();
</script>

<style lang="css">
.popup-overlay {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--white-a-25);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
  gap: 24px;
}

.popup {
  width: 760px;
  height: 680px;
  max-height: 90%;
  background-color: var(--white);
  box-shadow: var(--shadow);
  position: relative;
  max-width: 100%;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.popup__close-button {
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 10;
}

.popup__loader,
.popup__content {
  width: 100%;
  height: 100%;
}

.popup__loader {
  position: absolute;
  top: 0;
  left: 0;
}

.popup__content {
  overflow: auto;
  max-height: 100%;
}

.popup_content-width {
  width: fit-content;
  max-width: 100%;
  .popup__content {
    position: relative;
    width: fit-content;
    max-width: 100%;
  }
}

.popup_content-height {
  max-height: 100%;
  height: fit-content;
  .popup__content {
    position: relative;
    max-height: 100%;
    height: fit-content;
  }
}

.additional-popup {
  width: 256px;
  height: fit-content;
  max-height: 90%;
  background-color: var(--white);
  box-shadow: var(--shadow);
  position: relative;
  max-width: 100%;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@media screen and (max-width: 768px) {
  .popup {
    width: 100%;
    height: 100%;
    min-height: 0;
    max-height: 100%;
    border-radius: 0;
  }

  .popup .popup__content {
    height: 100%;
    width: 100%;
  }

  .additional-popup {
    display: none;
  }
}
</style>
