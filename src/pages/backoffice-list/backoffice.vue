<template>
  <div class="backoffice">
    <Popup
      :id="confirmationPopup.id"
      custom-class="backoffice-confirmation-popup"
      content-height
      @close="confirmationPopup.close"
    >
      <h2 class="backoffice-confirmation-popup__title">
        Вы точно хотите удалить предмет?
      </h2>
      <p class="backoffice-confirmation-popup__text">
        {{ confirmationPopup.text }}
      </p>
      <ButtonComponent
        class="backoffice-confirmation-popup__button"
        type="red"
        wide
        @click="deleteItem(confirmationPopup.itemID)"
      >
        Удалить предмет
      </ButtonComponent>
    </Popup>
    <Loader v-if="loading" />
    <WarningBadge
      v-else-if="error || !items.length"
      class="backoffice__error"
      :title="warningBadgeInfo.title"
      :subtitle="warningBadgeInfo.subtitle"
    />
    <div class="backoffice__header">
      <ButtonComponent type="red" size="m" @click="openCreate">
        Создать товар
      </ButtonComponent>
    </div>
    <div v-if="items.length" class="backoffice__list">
      <ScrollContainer class="backoffice__list-scroll-wrapper">
        <div class="backoffice__list-scroll">
          <BackofficeItem
            v-for="item in items"
            :id="item.id"
            :key="item.id"
            :title="item.title"
            :article="item.article"
            :preview="item.preview"
            :price="item.price"
            :types="item.types"
            @delete="openConfirmationPopup"
            @edit="openItem"
          />
        </div>
      </ScrollContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Loader from "@/components/loader/loader.vue";
import WarningBadge from "@/components/warning-badge/warning-badge.vue";
import ButtonComponent from "@/components/button-component/button-component.vue";
import ScrollContainer from "@/components/scroll-container/scroll-container.vue";
import BackofficeItem from "@/pages/backoffice-list/components/backoffice-item/backoffice-item.vue";
import { useCabinetLayout } from "@/stores/use-cabinet-layout.ts";
import infrastructure from "@/infrastructure";
import { listToUi } from "@/pages/backoffice-list/adapters.ts";
import { type BackofficeItemNS } from "@/pages/backoffice-list/components/backoffice-item/types.ts";
import { BACKOFFICE_CREATE_ID, PageName } from "@/router/consts.ts";
import Popup from "@/components/popup/popup.vue";
import { useUiStore } from "@/stores/use-ui-store.ts";

const router = useRouter();
const { setTitle } = useCabinetLayout();
const uiStore = useUiStore();

const loading = ref(true);
const error = ref("");
const items = ref<BackofficeItemNS.Props[]>([]);

const confirmationPopup = reactive({
  id: "backoffice-confirmation-popup",
  text: "",
  itemID: "",
  open(id: string, text: string) {
    confirmationPopup.text = text;
    confirmationPopup.itemID = id;
    uiStore.openPopup(confirmationPopup.id);
  },
  close() {
    uiStore.closePopup(confirmationPopup.id);
  }
});

const warningBadgeInfo = computed<{ title: string; subtitle: string }>(() => {
  if (error.value) {
    return {
      title: "Не удалось загрузить данные",
      subtitle: error.value
    };
  }
  if (!items.value.length) {
    return {
      title: "Товаров пока нет",
      subtitle: "Создайте первую карточку товара"
    };
  }
  return {
    title: "",
    subtitle: ""
  };
});

const loadList = async () => {
  const response = await infrastructure.adminListItems();
  items.value = listToUi(response);
};

const openCreate = () => {
  router.push({
    name: PageName.BackofficeItem,
    params: { id: BACKOFFICE_CREATE_ID }
  });
};

const openItem = (id: string) => {
  router.push({
    name: PageName.BackofficeItem,
    params: { id }
  });
};

const openConfirmationPopup = (id: string) => {
  const item = items.value.find(item => item.id === id);
  if (!item) return;
  confirmationPopup.open(id, item.title + "; Артикул: " + item.article);
};
const deleteItem = async (id: string) => {
  try {
    await infrastructure.adminDeleteItem(Number(id));
    items.value = items.value.filter(item => item.id !== id);
    confirmationPopup.close();
    uiStore.addToast("Предмет удален", "success");
  } catch {
    error.value = "Не удалось удалить товар.";
  }
};

onMounted(async () => {
  setTitle("Бэкофис");
  try {
    await loadList();
  } catch {
    error.value = "Попробуйте обновить страницу позже.";
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="css">
.backoffice-confirmation-popup {
  padding: 24px;
}
.backoffice-confirmation-popup__text {
  margin-top: 16px;
  font-weight: var(--font-weight-semibold);
}
.backoffice-confirmation-popup__button {
  margin-top: 24px;
}
.backoffice {
  width: 100%;
  height: 100%;
}
.backoffice__error {
  margin: 24px 24px 24px 0;
}
.backoffice__list {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.backoffice__header {
  padding-top: 24px;
  padding-right: 24px;
}
.backoffice__list-scroll-wrapper {
  border-radius: 16px;
}
.backoffice__list-scroll {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;
  padding: 24px 24px 24px 0;
}

@media screen and (max-width: 768px) {
  .backoffice__header {
    padding-right: 0;
  }
  .backoffice__list-scroll {
    grid-template-columns: 1fr;
    padding: 24px 0;
  }
}
</style>
