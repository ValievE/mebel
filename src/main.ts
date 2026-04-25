import { createApp } from "vue";
import { createPinia } from "pinia";

import "overlayscrollbars/overlayscrollbars.css";
import "./assets/css/app.css";
import "normalize.css/normalize.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
