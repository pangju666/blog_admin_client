import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import { router } from "@/router";

import "assets/css/index.less";
import "assets/css/toast.less";

const pina = createPinia();

createApp(App).use(pina).use(router).mount("#app");
