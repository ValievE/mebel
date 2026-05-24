import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { type CartStore, StoreNames } from "@/stores/types.ts";

export const useCartStore = defineStore(StoreNames.Cart, () => {
  const cart = ref<Record<string, CartStore.Item>>({});
  const sum = ref<number>(0);

  const itemIDs = computed<string[]>(() => {
    return Object.keys(cart.value) ?? [];
  });

  const addItem = (id: string, price: number) => {
    if (cart.value[id]) {
      increaseQuantity(id);
      return;
    }
    sum.value += price;
    cart.value[id] = {
      price,
      quantity: 1
    };
  };
  const deleteItem = (id: string) => {
    if (!cart.value[id]) return;
    const itemSum = cart.value[id].price * cart.value[id].quantity;
    delete cart.value[id];
    sum.value -= itemSum;
  };
  const changeQuantity = (id: string, increase: boolean) => {
    if (!cart.value[id]) return;
    if (increase) {
      sum.value += cart.value[id].price;
      cart.value[id].quantity += 1;
      return;
    }
    sum.value -= cart.value[id].price;
    if (cart.value[id].quantity === 1) {
      delete cart.value[id];
      return;
    }
    cart.value[id].quantity -= 1;
  };
  const increaseQuantity = (id: string) => changeQuantity(id, true);
  const decreaseQuantity = (id: string) => changeQuantity(id, false);

  const restoreSnapshot = (snapshot: Record<string, CartStore.Item>) => {
    cart.value = { ...snapshot };
    sum.value = Object.values(cart.value).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const clear = () => {
    cart.value = {};
    sum.value = 0;
  };

  return {
    cart,
    sum,
    itemIDs,
    addItem,
    deleteItem,
    increaseQuantity,
    decreaseQuantity,
    restoreSnapshot,
    clear
  };
});
