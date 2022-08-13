import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    redirect: "/index",
    title: "起始页",
    hidden: true,
  },
  {
    path: "/home",
    title: "起始页",
    children: [
      {
        path: "/home2",
        name: "Home2",
        title: "首页",
        component: () => import("views/HomeView.vue"),
      },
    ],
  },
  {
    path: "/index",
    name: "Index",
    title: "首页",
    component: () => import("views/IndexView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    title: "登录页",
    hidden: true,
    component: () => import("views/LoginView.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to);
  next();
});
