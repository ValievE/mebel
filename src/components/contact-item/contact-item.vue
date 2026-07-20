<template>
  <a
    class="contact-item"
    :class="{
      [`contact-item_${type}`]: type
    }"
    :href="href[type]"
    target="_blank"
  >
    <div class="contact-item__icon"></div>
    <span class="contact-item__text">
      {{ texts[type] }}
    </span>
  </a>
</template>

<script setup lang="ts">
import { type ContactItemNS } from "@/components/contact-item/types.ts";
import { Contacts } from "@/types/types.ts";

const texts: Record<Contacts, string> = {
  [Contacts.VK]: "vk.com/okt_mebel",
  [Contacts.Phone]: "+7 (927) 31-54-166",
  [Contacts.Max]: "+7 (927) 31-54-166"
};

const href: Record<Contacts, string> = {
  [Contacts.Phone]: "tel:+79273154166",
  [Contacts.VK]: "https://vk.me/okt_mebel",
  [Contacts.Max]:
    "https://max.ru/u/f9LHodD0cOJ-N5MBYXNVvUJ7myCSAV9EGjo2HyqOlP8wGr4El4bc-5pJui4"
};

defineProps<ContactItemNS.Props>();
defineEmits<ContactItemNS.Emits>();
</script>

<style lang="css">
.contact-item {
  border: 1px solid var(--gray-20);
  padding: 12px;
  border-radius: 16px;
  cursor: pointer;
  transition: var(--transition-bg-color-100);
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: var(--gray-10);
  }
  &:active {
    background-color: var(--gray-20);
  }
}

.contact-item__icon {
  width: 40px;
  height: 40px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
}

.contact-item_phone .contact-item__icon {
  background-image: url("/images/contacts/phone_google.webp");
}

.contact-item_vk .contact-item__icon {
  background-image: url("/images/contacts/vk_logo.svg");
}

.contact-item_max .contact-item__icon {
  background-image: url("/images/contacts/max_logo.svg");
}

.contact-item__text {
  font-weight: var(--font-weight-medium);
  color: var(--gray-90);
}
</style>
