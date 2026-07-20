import { createApp } from "vue";
import { createPinia } from "pinia";

import "overlayscrollbars/overlayscrollbars.css";
import "vue3-carousel/carousel.css";
import "./assets/css/app.css";

import App from "./App.vue";
import router from "./router";
import { createYmaps } from "vue-yandex-maps";
import vClickOutside from "click-outside-vue3";
import { useAuthStore } from "@/stores/use-auth-store.ts";

async function bootstrap() {
  const app = createApp(App);
  const pinia = createPinia();
  app.use(pinia);
  app.use(router);
  await useAuthStore().bootstrap();
  app.use(
    createYmaps({
      apikey: import.meta.env.VITE_YANDEX_KEY
    })
  );
  app.use(vClickOutside);
  app.mount("#app");
}

void bootstrap();
