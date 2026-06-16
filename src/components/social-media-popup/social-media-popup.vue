<template>
  <Popup
    id="social-media-popup"
    content-width
    content-height
    custom-class="social-media-popup"
  >
    <div class="social-media-popup__wrapper">
      <h1>Наши контакты</h1>
      <p>
        Есть вопрос по товарам, способу доставки, оплате? Свяжитесь с нами, мы
        обязательно ответим на интересующие вас вопросы
      </p>
      <ContactItem v-for="item in Contacts" :key="item" :type="item" />
    </div>
  </Popup>
</template>

<script setup lang="ts">
import Popup from "@/components/popup/popup.vue";
import ContactItem from "@/components/contact-item/contact-item.vue";
import { Contacts } from "@/types/types.ts";
</script>

<style lang="css">
.social-media-popup__wrapper {
  max-width: 100%;
  width: 480px;
  padding: 24px;
  display: flex;
  gap: 12px;
  flex-direction: column;
}
</style>
