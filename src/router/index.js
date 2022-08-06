import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  /* {
    path: "/",
    name: "logon",
    component: () => import("@/views/logon"), //登录页面
  },*/
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router };
