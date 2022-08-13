<template>
  <el-menu
    ref="menu"
    :collapse="collapse"
    :collapse-transition="collapseTransition"
    :default-active="defaultActive"
    :default-openeds="defaultOpeneds"
    :ellipsis="ellipsis"
    :menu-trigger="menuTrigger"
    :mode="mode"
    :router="router"
    :style="menuStyle"
    :unique-opened="uniqueOpened"
  >
    <pj-menu-item
      v-for="item in items"
      :key="item[itemIndexKey]"
      :item="item"
      :children-key="itemChildrenKey"
      :disabled-key="itemDisabledKey"
      :hidden-key="itemHiddenKey"
      :hide-timeout="itemHideTimeout"
      :index-key="itemIndexKey"
      :popper-class="itemPopperClass"
      :popper-offset="itemPopperOffset"
      :route-key="itemRouteKey"
      :show-timeout="itemShowTimeout"
      @click="$emit('item-click', item)"
    >
      <template #sub-menu-title="scope">
        <slot :item="scope.item" name="sub-menu-title">
          <template v-if="scope.item[itemIconKey]">
            <el-icon
              v-if="typeof scope.item[itemIconKey] === 'object'"
              :color="itemIconColor"
              :size="itemIconSize"
            >
              <component :is="scope.item[itemIconKey]" />
            </el-icon>
            <svg-icon
              v-else
              :icon="scope.item[itemIconKey]"
              :size="itemIconSize"
            />
          </template>
          <span>{{ scope.item[itemTitleKey] }}</span>
        </slot>
      </template>
      <template #default="scope">
        <slot :item="scope.item">
          <template v-if="scope.item[itemIconKey]">
            <el-icon
              v-if="typeof scope.item[itemIconKey] === 'object'"
              :color="itemIconColor"
              :size="itemIconSize"
            >
              <component :is="scope.item[itemIconKey]" />
            </el-icon>
            <svg-icon
              v-else
              :icon="scope.item[itemIconKey]"
              :size="itemIconSize"
            />
          </template>
        </slot>
      </template>
      <template #title="scope">
        <slot :item="scope.item" name="title">
          {{ scope.item[itemTitleKey] }}
        </slot>
      </template>
    </pj-menu-item>
  </el-menu>
</template>

<script>
import PjMenuItem from "./PjMenuItem.vue";
import SvgIcon from "../basic/PjSvgIcon.vue";

export default {
  name: "PjMenu",
  components: { PjMenuItem, SvgIcon },
  inheritAttrs: true,
  props: {
    mode: {
      type: String,
      default: "vertical",
      validator: (value) => ["vertical", "horizontal"].includes(value),
    },
    collapse: {
      type: Boolean,
      default: false,
    },
    ellipsis: {
      type: Boolean,
      default: true,
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
    menuTrigger: {
      type: String,
      default: "click",
      validator: (value) => ["hover", "click"].includes(value),
    },
    router: {
      type: Boolean,
      default: false,
    },
    collapseTransition: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      required: true,
    },
    itemIndexKey: {
      type: String,
      default: "index",
    },
    itemDisabledKey: {
      type: String,
      default: "disabled",
    },
    itemChildrenKey: {
      type: String,
      default: "children",
    },
    itemRouteKey: {
      type: String,
      default: "route",
    },
    itemHiddenKey: {
      type: String,
      default: "hidden",
    },
    itemIconKey: {
      type: String,
      default: "icon",
    },
    itemTitleKey: {
      type: String,
      default: "title",
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
  emits: ["item-click"],
  computed: {
    menuStyle() {
      return `--bg-color: ${this.backgroundColor}; --text-color: ${this.textColor}; --active-color: ${this.activeTextColor}`;
    },
  },
  methods: {
    open(index) {
      this.refs.menu.open(index);
    },
    close(index) {
      this.refs.menu.close(index);
    },
  },
};
</script>

<style lang="less" scoped></style>
