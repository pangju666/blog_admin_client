<template>
  <pj-bread-crumb
    :items="currentRoute"
    value-key="title"
    @click-item="onBreadCrumbClickItem"
  ></pj-bread-crumb>
</template>

<script setup>
import PjBreadCrumb from "components/common/navigation/PjBreadCrumb.vue";
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useRouteStore } from "@/store/RouteStore.js";
import { ArrayUtils, StringUtils } from "pangju-utils";

const router = useRouter();
const routeTitleStore = useRouteStore();

const currentRoute = computed(() => routeTitleStore.currentRoute);

onMounted(() => {
  const routeMap = new Map();
  readRoutes(routeMap, router.options.routes, [
    {
      title: "首页",
      path: "/",
    },
  ]);
  routeTitleStore.routeMap = routeMap;
});

const readRoutes = (routeMap, routes, parentRoutes) => {
  for (let route of routes) {
    if (StringUtils.equalsAny(route.path, "/")) {
      continue;
    }

    let currentRoutes = [
      {
        title: route.meta.title,
        path: route.path,
      },
    ];
    if (ArrayUtils.isNotEmpty(parentRoutes) && route.name !== "Index") {
      currentRoutes = [...parentRoutes, ...currentRoutes];
    }
    routeMap.set(route.name, currentRoutes);

    if (ArrayUtils.isNotEmpty(route.children)) {
      readRoutes(routeMap, route.children, parentRoutes);
    }
  }
};

const onBreadCrumbClickItem = (item) => {
  router.push(item.path);
};
</script>

<style lang="less" scoped></style>
