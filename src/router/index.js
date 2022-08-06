import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("views/indexView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("views/loginView.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
