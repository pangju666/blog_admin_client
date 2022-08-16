import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import { router } from "@/router";

import Vue3Menus from "vue3-menus";

import "assets/css/index.less";
import "assets/css/toast.less";

createApp(App).use(createPinia()).use(router).use(Vue3Menus).mount("#app");
