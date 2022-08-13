<template>
  <el-scrollbar :height="height" :noresize="noResize">
    <pj-menu
      :active-text-color="activeTextColor"
      :background-color="backgroundColor"
      :collapse="collapse"
      :collapse-transition="collapseTransition"
      :default-active="defaultActive"
      :default-openeds="defaultOpeneds"
      :hide-timeout="itemHideTimeout"
      :items="routes"
      :popper-class="itemPopperClass"
      :popper-offset="itemPopperOffset"
      :show-timeout="itemShowTimeout"
      :text-color="textColor"
      :unique-opened="uniqueOpened"
      item-index-key="path"
      menu-trigger="click"
      mode="vertical"
      router
    >
    </pj-menu>
  </el-scrollbar>
</template>

<script>
import PjMenu from "./PjMenu.vue";

export default {
  name: "PjRouteMenu",
  components: { PjMenu },
  props: {
    routes: {
      type: Array,
      required: true,
    },
    noResize: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [String, Number],
    },
    collapse: {
      type: Boolean,
      default: false,
    },
    defaultActive: {
      type: String,
    },
    defaultOpeneds: {
      type: Array,
    },
    uniqueOpened: {
      type: Boolean,
      default: false,
    },
    collapseTransition: {
      type: Boolean,
      default: true,
    },
    itemIconColor: {
      type: String,
      default: "inherit",
    },
    itemIconSize: {
      type: Number,
    },
    itemPopperClass: {
      type: String,
    },
    itemPopperOffset: {
      type: Number,
      default: 6,
    },
    itemShowTimeout: {
      type: Number,
      default: 300,
    },
    itemHideTimeout: {
      type: Number,
      default: 300,
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
    textColor: {
      type: String,
      default: "#303133",
    },
    activeTextColor: {
      type: String,
      default: "#409EFF",
    },
  },
};
</script>

<style lang="less" scoped></style>
