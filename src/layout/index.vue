<template>
  <div>
    <div class="navbar">
      <route-bread-crumb
        id="breadcrumb-container"
        class="breadcrumb-container"
      />
    </div>
    <div>
      <pj-menu :items="items" />
    </div>
  </div>
</template>

<script setup>
import RouteBreadCrumb from "@/layout/components/RouteBreadCrumb.vue";
import PjMenu from "components/common/navigation/PjMenu.vue";
import { shallowRef } from "vue";
import { Edit } from "@element-plus/icons-vue";

const items = shallowRef([
  {
    id: 1,
    path: "",
    title: "测试1",
    icon: Edit,
    children: [
      {
        id: 2,
        path: "",
        title: "测试2",
        icon: Edit,
        children: [
          {
            id: 3,
            icon: Edit,
            path: "",
            title: "测试6",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    path: "",
    title: "测试3",
    icon: Edit,
    children: [
      {
        id: 4,
        icon: Edit,
        path: "",
        title: "测试4",
      },
    ],
  },
  {
    id: 6,
    icon: Edit,
    path: "",
    title: "测试5",
  },
]);
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
