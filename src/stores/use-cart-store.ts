import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { type CartStore, StoreNames } from "@/stores/types.ts";
import type { CartLineInput } from "@/infrastructure/get-cart-items.ts";

export const useCartStore = defineStore(StoreNames.Cart, () => {
  const cart = ref<Record<string, CartStore.Item>>({});
  const sum = ref<number>(0);

  const itemIDs = computed<string[]>(() => {
    return Object.keys(cart.value) ?? [];
  });

  const addItem = (
    id: string,
    price: number,
    options?: Pick<CartStore.Item, "size" | "material_id">
  ) => {
    if (cart.value[id]) {
      increaseQuantity(id);
      return;
    }
    sum.value += price;
    cart.value[id] = {
      price,
      quantity: 1,
      size: options?.size,
      material_id: options?.material_id
    };
  };

  const cartLines = (): CartLineInput[] =>
    Object.entries(cart.value).map(([id, item]) => {
      const line: CartLineInput = {
        item_id: Number(id),
        quantity: item.quantity
      };
      if (item.size) {
        line.size = item.size;
      }
      if (item.material_id && item.material_id !== "default") {
        line.material_id = item.material_id;
      }
      return line;
    });
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
    cartLines,
    deleteItem,
    changeQuantity,
    increaseQuantity,
    decreaseQuantity,
    restoreSnapshot,
    clear
  };
});
