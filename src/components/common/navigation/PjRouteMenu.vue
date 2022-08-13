<template>
  <pj-menu
    v-if="routes"
    :active-text-color="activeTextColor"
    :background-color="backgroundColor"
    :collapse="collapse"
    :collapse-transition="collapseTransition"
    :collapse-width="collapseWidth"
    :default-active="defaultActive"
    :default-openeds="defaultOpeneds"
    :item-disabled-key="itemDisabledKey"
    :item-hidden-key="itemHiddenKey"
    :item-hide-timeout="itemHideTimeout"
    :item-icon-key="itemIconKey"
    :item-icon-size="itemIconSize"
    :item-popper-class="itemPopperClass"
    :item-popper-offset="itemPopperOffset"
    :item-show-timeout="itemShowTimeout"
    :item-title-key="itemTitleKey"
    :items="routes"
    :menu-trigger="menuTrigger"
    :text-color="textColor"
    :unique-opened="uniqueOpened"
    item-children-key="children"
    item-index-key="path"
    mode="vertical"
    router
  >
  </pj-menu>
</template>

<script setup>
import PjMenu from "./PjMenu.vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const router = useRouter();

defineProps({
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
  menuTrigger: {
    type: String,
    default: "click",
    validator: (value) => ["hover", "click"].includes(value),
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
  itemHiddenKey: {
    type: String,
    default: "meta.hidden",
  },
  itemIconKey: {
    type: String,
    default: "meta.icon",
  },
  itemTitleKey: {
    type: String,
    default: "meta.title",
  },
  itemDisabledKey: {
    type: String,
    default: "meta.disabled",
  },
  collapseWidth: {
    type: String,
    default: "64px",
  },
});

const routes = ref(null);

onMounted(() => {
  routes.value = router.options.routes;
});
</script>

<style lang="less" scoped></style>
