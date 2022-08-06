import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/views/index"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
