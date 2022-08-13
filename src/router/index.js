import { createRouter, createWebHashHistory } from "vue-router";
import { Edit } from "@element-plus/icons-vue";

export const routes = [
  {
    path: "/",
    redirect: "/index",
    meta: {
      title: "起始页",
      hidden: true,
    },
  },
  {
    path: "/home",
    meta: {
      title: "起始页",
      icon: Edit,
    },
    children: [
      {
        path: "/home2",
        name: "Home2",
        meta: {
          title: "首页",
          icon: Edit,
        },
        component: () => import("views/HomeView.vue"),
      },
    ],
  },
  {
    path: "/index",
    name: "Index",
    meta: {
      title: "首页",
      icon: Edit,
    },
    component: () => import("views/IndexView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录页",
      hidden: true,
    },
    component: () => import("views/LoginView.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
