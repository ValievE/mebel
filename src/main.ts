import { createApp } from "vue";
import { createPinia } from "pinia";

import "overlayscrollbars/overlayscrollbars.css";
import "vue3-carousel/carousel.css";
import "./assets/css/app.css";

import App from "./App.vue";
import router from "./router";
import { createYmaps } from "vue-yandex-maps";
import vClickOutside from "click-outside-vue3";

const app = createApp(App);

app.use(
  createYmaps({
    apikey: "55f21058-2946-4002-8256-5f8a300d1834"
  })
);
app.use(createPinia());
app.use(router);
app.use(vClickOutside);

app.mount("#app");
