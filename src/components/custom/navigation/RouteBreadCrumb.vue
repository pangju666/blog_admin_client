<template>
  <pj-bread-crumb
    class="route-bread-crumb"
    :items="routes"
    value-key="meta.title"
    :item-class="getItemClass"
    @click-item="onBreadCrumbClickItem"
  ></pj-bread-crumb>
</template>

<script setup>
import PjBreadCrumb from "components/common/navigation/PjBreadCrumb.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useRouteStore } from "@/store/RouteStore.js";
import { ObjectUtils } from "pangju-utils";

const router = useRouter();
const routeStore = useRouteStore();

const routes = computed(() => {
  let routes = [{ meta: { title: "首页" }, path: "/index" }];
  if (
    ObjectUtils.nonNull(routeStore.currentRoute) &&
    routeStore.currentRoute.path !== "/index"
  ) {
    routes = [...routes, ...routeStore.currentRoute.matched];
  }
  return routes;
});

const getItemClass = (item, index) => {
  return index === routes.value.length - 1 ? "active-bread-crumb-item" : "";
};

const onBreadCrumbClickItem = (item) => {
  router.push(item.path);
};
</script>

<style lang="less">
.route-bread-crumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}

.active-bread-crumb-item {
  --el-text-color-regular: #97a8be;
}
</style>
