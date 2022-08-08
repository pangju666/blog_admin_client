import { createApp } from "vue";

import App from "@/App.vue";
import { router } from "@/router";
import { pinia } from "@/store";

import "assets/css/index.less";
import "assets/css/toast.less";

createApp(App).use(pinia).use(router).mount("#app");
