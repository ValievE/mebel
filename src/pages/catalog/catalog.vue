<template>
  <div class="catalog">
    <ItemPopup
      :props="itemPopup.data"
      @close="itemPopup.functions.close"
      @addToCart="itemPopup.functions.addToCart"
    />
    <CartPopup
      :props="cart.popupData"
      @close="cart.functions.closePopup"
      @checkout="cart.functions.checkout"
      @delete="cart.functions.deleteItem"
      @click:item="itemPopup.functions.open"
      @change:quantity="cart.functions.changeQuantity"
      @change:agreement="cart.functions.changeAgreement"
    />
    <PaymentResultPopup :mode="paymentResultMode" @close="closePaymentResult" />
    <header class="catalog__header">
      <h1 class="catalog__header-title">Каталог</h1>
      <div class="catalog__header-options">
        <Transition name="slide-upside-down">
          <ButtonComponent
            v-if="cartStore.itemIDs.length"
            type="orange"
            icon-name="cart"
            size="m"
            @click="cart.functions.openPopup"
          >
            Корзина {{ cartStore.itemIDs.length }}
          </ButtonComponent>
        </Transition>
        <Selector
          :disabled="uiStore.loaders.itemList"
          size="l"
          :model-value="sortSelector.value"
          placeholder="Сортировка"
          :options="sortSelector.items"
          @update:modelValue="sortSelector.functions.updateValue"
        />
      </div>
    </header>
    <div class="catalog__list">
      <ScrollContainer>
        <Loader v-if="uiStore.loaders.itemList" />
        <WarningBadge
          v-else-if="error"
          class="catalog__list-empty-list"
          title="Список пуст"
          :subtitle="error"
        />
        <div v-else class="catalog__list-scroll">
          <CatalogItem
            v-for="item in catalogItems"
            :key="item.id"
            :props="item"
            @click="itemPopup.functions.open(item.id)"
          />
        </div>
      </ScrollContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import ButtonComponent from "@/components/button-component/button-component.vue";
import Loader from "@/components/loader/loader.vue";
import ScrollContainer from "@/components/scroll-container/scroll-container.vue";
import Selector from "@/components/selector/selector.vue";
import WarningBadge from "@/components/warning-badge/warning-badge.vue";
import infrastructure from "@/infrastructure";
import {
  GetListField,
  type GetListRequest
} from "@/infrastructure/get-list.ts";
import {
  getCartItemsAdapter,
  getItemAdapter,
  getListAdapter
} from "@/pages/catalog/adapters.ts";
import CatalogItem from "@/pages/catalog/components/catalog-item/catalog-item.vue";
import { type CatalogItemNS } from "@/pages/catalog/components/catalog-item/types.ts";
import { FurnitureType } from "@/types/types.ts";
import ItemPopup from "@/pages/catalog/components/item-popup/item-popup.vue";

import type {
  CartObject,
  ItemPopupObject,
  SortSelector
} from "@/pages/catalog/types.ts";
import { useUiStore } from "@/stores/use-ui-store.ts";
import CartPopup from "@/pages/catalog/components/cart-popup/cart-popup.vue";
import { useCartStore } from "@/stores/use-cart-store.ts";
import { type CartPopupNS } from "@/pages/catalog/components/cart-popup/types.ts";
import { useAuthStore } from "@/stores/use-auth-store.ts";
import { saveCheckoutCart } from "@/infrastructure/checkout-cart.ts";
import { initPaymentRequest } from "@/infrastructure/payments-api.ts";
import { usePaymentReturn } from "@/composables/use-payment-return.ts";

const catalogItems = ref<CatalogItemNS.Props[]>([]);
const error = ref<string>("");

const uiStore = useUiStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
const {
  PaymentResultPopup,
  paymentResultMode,
  handlePaymentReturn,
  closePaymentResult
} = usePaymentReturn();

const itemPopup: ItemPopupObject = reactive({
  data: {
    id: "item",
    loading: false,
    data: {
      title: "Название кухни 1234",
      parameters: {},
      price: 0,
      images: [],
      type: FurnitureType.Other,
      id: ""
    }
  },
  functions: {
    open(id) {
      uiStore.openPopup(itemPopup.data.id);
      getItem(id);
    },
    close() {
      uiStore.closePopup(itemPopup.data.id);
    },
    addToCart() {
      cart.functions.addItem(itemPopup.data.data.id, itemPopup.data.data.price);
      itemPopup.data.data.isAdded = true;
    }
  }
});
const sortSelector: SortSelector = reactive({
  items: [
    {
      id: GetListField.PriceAsc,
      name: "По возрастанию цены"
    },
    {
      id: GetListField.PriceDesc,
      name: "По убыванию цены"
    },
    {
      id: GetListField.TitleAsc,
      name: "По названию (А–Я)"
    },
    {
      id: GetListField.TitleDesc,
      name: "По названию (Я–А)"
    },
    {
      id: GetListField.Default,
      name: "По-умолчанию"
    }
  ],
  value: GetListField.Default,
  functions: {
    async updateValue(id) {
      await getList({
        sort: id
      });
      sortSelector.value = id;
    }
  }
});
const cart: CartObject = reactive({
  popupData: {
    data: {
      items: [],
      sum: cartStore.sum,
      agreement: false
    },
    id: "cart",
    get loading() {
      return !!uiStore.loaders.cart || !!uiStore.loaders.checkout;
    }
  },
  functions: {
    changeAgreement() {
      cart.popupData.data.agreement = !cart.popupData.data.agreement;
    },
    async openPopup() {
      if (!cartStore.itemIDs.length || uiStore.loaders.cart) return;
      uiStore.loaders.cart = true;
      uiStore.openPopup(cart.popupData.id);

      try {
        [cart.popupData.data.items, cart.popupData.data.sum] =
          getCartItemsAdapter(
            await infrastructure.getCartItems(cartStore.itemIDs)
          );
        cartStore.sum = cart.popupData.data.sum;
      } catch {
        uiStore.addToast("Произошла ошибка при загрузке корзины", "error");
      } finally {
        uiStore.loaders.cart = false;
      }
    },
    closePopup() {
      uiStore.closePopup(cart.popupData.id);
    },
    addItem: cartStore.addItem,
    hasItem(id) {
      return cartStore.itemIDs.includes(id);
    },
    deleteItem(id) {
      cartStore.deleteItem(id);
      const index = cart.popupData.data.items.findIndex(i => i.id === id);
      if (index === -1) return;
      cart.popupData.data.items.splice(index, 1);
      cart.popupData.data.sum = cartStore.sum;
      if (!cart.popupData.data.items.length) cart.functions.closePopup();
    },
    changeQuantity(payload) {
      const item = cart.popupData.data.items.find(i => i.id === payload.id);
      if (!item) return;

      const changeQuantity = (item: CartPopupNS.Item) => {
        if (payload.increase) {
          if (item.quantity + 1 > item.inStock) return;
          item.quantity += 1;
          return;
        }

        if (item.quantity === 1) {
          cart.functions.deleteItem(payload.id);
          return;
        }
        item.quantity -= 1;
      };
      changeQuantity(item);

      item.tags.quantity.text = "Кол-во: " + item.quantity;
      item.tags.price.text = item.price * item.quantity + "Р";
    },
    async checkout() {
      if (uiStore.loaders.checkout || !cartStore.itemIDs.length) return;

      if (!authStore.isAuthenticated) {
        uiStore.addToast("Войдите в аккаунт, чтобы оформить заказ", "info");
        uiStore.openPopup("login");
        return;
      }

      uiStore.loaders.checkout = true;
      try {
        saveCheckoutCart({ ...cartStore.cart });

        const items = cartStore.itemIDs.map(id => ({
          item_id: Number(id),
          quantity: cartStore.cart[id]?.quantity ?? 1
        }));
        const created = await infrastructure.createOrder({ items });
        const payment = await initPaymentRequest({
          order_ids: created.orders.map(order => order.id),
          return_url: `${window.location.origin}/catalog`
        });
        cart.functions.closePopup();
        window.location.assign(payment.redirect_url);
      } catch {
        uiStore.addToast("Не удалось оформить заказ", "error");
      } finally {
        uiStore.loaders.checkout = false;
      }
    }
  }
});

onMounted(async () => {
  getList();
  await handlePaymentReturn();
});

const getList = async (payload?: GetListRequest) => {
  uiStore.loaders.itemList = true;
  error.value = "";
  try {
    catalogItems.value = getListAdapter(await infrastructure.getList(payload));
  } catch {
    error.value = "Не удалось получить список предметов";
    uiStore.addToast("Произошла ошибка при загрузке каталога", "error");
  } finally {
    uiStore.loaders.itemList = false;
  }
};
const getItem = async (id: string) => {
  itemPopup.data.loading = true;
  try {
    itemPopup.data.data = getItemAdapter(await infrastructure.getItem(id));
    itemPopup.data.data.isAdded = cart.functions.hasItem(id);
  } catch {
    uiStore.addToast(
      "Произошла ошибка при загрузке информации о предмете",
      "error"
    );
    itemPopup.functions.close();
  } finally {
    itemPopup.data.loading = false;
  }
};
</script>

<style lang="css">
.catalog {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.catalog__header {
  margin-top: var(--header-height);
  display: flex;
  gap: 16px;
  justify-content: space-between;
}
.catalog__header-title {
  color: var(--gray-70);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-xl);
}
.catalog__header-options {
  display: flex;
  gap: 16px;
}
.catalog__list {
  width: 100%;
  overflow: hidden;
  flex-grow: 1;
  border-radius: 24px;
}
.catalog__list-empty-list {
  margin: auto;
  height: 100%;
}
.catalog__list-scroll {
  padding-top: 24px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 240px;
  gap: 24px;
  padding-bottom: 32px;
}

@media screen and (max-width: 768px) {
  .catalog__header {
    margin-top: var(--header-height);
    flex-direction: column;
    width: 100%;
  }
  .catalog__list-scroll {
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: 240px;
    gap: 32px;
    padding-bottom: 100px;
  }
}
</style>
