import { createRouter, createWebHashHistory } from "vue-router";
import { Edit } from "@element-plus/icons-vue";
import { useRouteStore } from "@/store/RouteStore.js";

const routes = [
  {
    path: "/",
    redirect: "/index",
    meta: {
      hidden: true,
    },
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
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "测试页1",
      icon: Edit,
    },
    children: [
      {
        path: "/home2",
        name: "Home2",
        meta: {
          title: "测试页2",
          icon: Edit,
        },
        component: () => import("views/HomeView.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  document.title = to.meta.title;

  const routeStore = useRouteStore();
  routeStore.setCurrentRoute(to);
});
