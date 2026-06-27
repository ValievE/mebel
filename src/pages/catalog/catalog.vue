<template>
  <div class="catalog">
    <ItemPopup
      :props="itemPopup.data"
      @close="itemPopup.functions.close"
      @addToCart="itemPopup.functions.addToCart"
      @updateMaterial="itemPopup.functions.updateMaterial"
      @updateSize="itemPopup.functions.updateSize"
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
    <CheckoutPopup
      :email="checkoutPopup.data.email"
      :address="checkoutPopup.data.address"
      :cities-hint="citiesHint"
      :loading="checkoutPopup.data.loading"
      :email-error="checkoutPopup.data.emailError"
      :address-error="checkoutPopup.data.addressError"
      :address-suggestions="checkoutPopup.data.addressSuggestions"
      :guest="checkoutPopup.data.guest"
      @close="checkoutPopup.functions.close"
      @accept="checkoutPopup.functions.accept"
      @update:email="checkoutPopup.functions.updateEmail"
      @update:address="checkoutPopup.functions.updateAddress"
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
          :model-value="filterSelector.value"
          placeholder="Тип"
          :options="filterSelector.items"
          @update:modelValue="filterSelector.functions.updateValue"
        />
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
import { computed, onMounted, reactive, ref } from "vue";

import ButtonComponent from "@/components/button-component/button-component.vue";
import Loader from "@/components/loader/loader.vue";
import ScrollContainer from "@/components/scroll-container/scroll-container.vue";
import Selector from "@/components/selector/selector.vue";
import WarningBadge from "@/components/warning-badge/warning-badge.vue";
import infrastructure from "@/infrastructure";
import { type GetListRequest, GetListSort } from "@/infrastructure/get-list.ts";
import {
  getCartItemsAdapter,
  getItemAdapter,
  getItemMinPrice,
  getListAdapter
} from "@/pages/catalog/adapters.ts";
import CatalogItem from "@/pages/catalog/components/catalog-item/catalog-item.vue";
import { type CatalogItemNS } from "@/pages/catalog/components/catalog-item/types.ts";
import type { ErrorType } from "@/types/types.ts";
import { FurnitureType } from "@/types/types.ts";
import ItemPopup from "@/pages/catalog/components/item-popup/item-popup.vue";

import type {
  CartObject,
  CheckoutPopupObject,
  FilterSelector,
  ItemPopupObject,
  SortSelector
} from "@/pages/catalog/types.ts";
import { useUiStore } from "@/stores/use-ui-store.ts";
import CartPopup from "@/pages/catalog/components/cart-popup/cart-popup.vue";
import { useCartStore } from "@/stores/use-cart-store.ts";
import { type CartPopupNS } from "@/pages/catalog/components/cart-popup/types.ts";
import { useAuthStore } from "@/stores/use-auth-store.ts";
import {
  initGuestPaymentRequest,
  initPaymentRequest
} from "@/infrastructure/payments-api.ts";
import { createGuestOrder } from "@/infrastructure/create-guest-order.ts";
import { usePaymentReturn } from "@/composables/use-payment-return.ts";
import { validator } from "@/common/validator.ts";
import { debounce, furnitureName, getErrorText } from "@/common/consts.ts";
import CheckoutPopup from "@/pages/catalog/components/checkout-popup/checkout-popup.vue";

const catalogItems = ref<CatalogItemNS.Props[]>([]);
const error = ref<string>("");
const deliveryCities = ref<string[]>([]);

const citiesHint = computed(() =>
  deliveryCities.value.length
    ? `Доступные населённые пункты: ${deliveryCities.value.join(", ")}`
    : undefined
);

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
      article: "",
      variants: [],
      title: "Название кухни 1234",
      parameters: {},
      images: [],
      type: FurnitureType.Other,
      id: "",
      pickedOptions: {
        material: "",
        size: ""
      }
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
      cart.functions.addItem(
        itemPopup.data.data.id,
        getItemMinPrice(itemPopup.data.data)
      );
      itemPopup.data.data.isAdded = true;
    },
    updateSize(value: string) {
      itemPopup.data.data.pickedOptions.size = value;
      itemPopup.data.data.pickedOptions.material =
        itemPopup.data.data.variants.find(i => i.size === value)?.options[0]
          ?.material_id || "";
    },
    updateMaterial(value: string) {
      itemPopup.data.data.pickedOptions.material = value;
    }
  }
});
const sortSelector: SortSelector = reactive({
  items: [
    {
      id: GetListSort.PriceAsc,
      name: "По возрастанию цены"
    },
    {
      id: GetListSort.PriceDesc,
      name: "По убыванию цены"
    },
    {
      id: GetListSort.TitleAsc,
      name: "По названию (А–Я)"
    },
    {
      id: GetListSort.TitleDesc,
      name: "По названию (Я–А)"
    },
    {
      id: GetListSort.Default,
      name: "По-умолчанию"
    }
  ],
  value: [GetListSort.Default],
  functions: {
    async updateValue(id) {
      if (!id[1]) return;
      await getList({
        sort: id[1]
      });
      sortSelector.value = [id[1]];
    }
  }
});
const filterSelector: FilterSelector = reactive({
  items: [
    {
      id: FurnitureType.Kitchen,
      name: furnitureName[FurnitureType.Kitchen].long
    },
    {
      id: FurnitureType.LivingRoom,
      name: furnitureName[FurnitureType.LivingRoom].long
    },
    {
      id: FurnitureType.Bedroom,
      name: furnitureName[FurnitureType.Bedroom].long
    },
    {
      id: FurnitureType.Bathroom,
      name: furnitureName[FurnitureType.Bathroom].long
    },
    {
      id: FurnitureType.Wardrobe,
      name: furnitureName[FurnitureType.Wardrobe].long
    },
    {
      id: FurnitureType.Other,
      name: furnitureName[FurnitureType.Other].long
    }
  ],
  value: [],
  functions: {
    async updateValue(id) {
      // await getList({
      //   sort: id
      // });
      filterSelector.value = id;
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
      checkoutPopup.functions.open();
    }
  }
});
const checkoutPopup: CheckoutPopupObject = reactive({
  data: {
    email: "",
    get guest() {
      return !authStore.isAuthenticated;
    },
    address: "",
    get loading() {
      return uiStore.loaders.checkout;
    }
  },
  functions: {
    open() {
      delete checkoutPopup.data.emailError;
      delete checkoutPopup.data.addressError;
      uiStore.openPopup("checkout-popup");
    },
    close() {
      uiStore.closePopup("checkout-popup");
    },
    async accept() {
      delete checkoutPopup.data.emailError;
      delete checkoutPopup.data.addressError;

      if (
        checkoutPopup.data.guest &&
        !validator.isEmail(checkoutPopup.data.email)
      ) {
        checkoutPopup.data.emailError = "Неправильно введен email";
        return;
      }

      const addressText = checkoutPopup.data.address.trim();
      if (!addressText) {
        checkoutPopup.data.addressError = "Укажите адрес доставки";
        return;
      }

      await checkout(true);
    },
    updateEmail(value) {
      checkoutPopup.data.email = value;
      delete checkoutPopup.data.emailError;
    },
    updateAddress(value) {
      checkoutPopup.data.address = value;
      getSuggestions(value);
      delete checkoutPopup.data.addressError;
    }
  }
});

onMounted(async () => {
  getList();
  void loadDeliveryCities();
  await handlePaymentReturn();
});

const getSuggestions = debounce(async (query: string) => {
  try {
    const response = await infrastructure.suggestAddress({ query });

    checkoutPopup.data.addressSuggestions = response.suggestions || [];
  } catch (e) {
    console.error(e);
  }
});

const loadDeliveryCities = async () => {
  try {
    const response = await infrastructure.getDeliveryCities();
    deliveryCities.value = response.cities ?? [];
  } catch {
    deliveryCities.value = [];
  }
};

const applyCheckoutError = (e: unknown, guest: boolean) => {
  const err = e as ErrorType;
  const code = err.response?.data?.error?.code;
  const message = getErrorText(err);

  if (
    code === "DELIVERY_NOT_AVAILABLE" ||
    code === "INVALID_DELIVERY_ADDRESS"
  ) {
    checkoutPopup.data.addressError = message;
    return;
  }

  if (code === "INVALID_EMAIL" && guest) {
    checkoutPopup.data.emailError = message;
    return;
  }

  uiStore.addToast(message || "Не удалось оформить заказ", "error");
};

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
const checkout = async (guest: boolean) => {
  if (uiStore.loaders.checkout || !cartStore.itemIDs.length) return;

  const items = cartStore.itemIDs.map(id => ({
    item_id: Number(id),
    quantity: cartStore.cart[id]?.quantity ?? 1
  }));
  const returnUrl = `${window.location.origin}/catalog`;

  uiStore.loaders.checkout = true;
  try {
    const created = guest
      ? await createGuestOrder({
          email: checkoutPopup.data.email,
          items,
          delivery_address: checkoutPopup.data.address
        })
      : await infrastructure.createOrder({
          items,
          delivery_address: checkoutPopup.data.address
        });

    const orderIds = created.orders.map(order => order.id);
    const payment = guest
      ? await initGuestPaymentRequest({
          email: checkoutPopup.data.email,
          order_ids: orderIds,
          return_url: returnUrl
        })
      : await initPaymentRequest({
          order_ids: orderIds,
          return_url: returnUrl
        });

    cart.functions.closePopup();
    checkoutPopup.functions.close();

    window.location.assign(payment.redirect_url);
  } catch (e) {
    applyCheckoutError(e, guest);
  } finally {
    uiStore.loaders.checkout = false;
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
