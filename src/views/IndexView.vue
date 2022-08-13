<template>
  <div>
    <div class="navbar">
      <route-bread-crumb
        id="breadcrumb-container"
        class="breadcrumb-container"
      />
    </div>
    <div>
      <pj-route-menu :routes="routes" />
    </div>
  </div>
</template>

<script setup>
import RouteBreadCrumb from "components/custom/navigation/RouteBreadCrumb.vue";
import PjRouteMenu from "components/common/navigation/PjRouteMenu.vue";
import { routes } from "@/router";
</script>

<style lang="less" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .breadcrumb-container {
    float: left;
  }
}
</style>
