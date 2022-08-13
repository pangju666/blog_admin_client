<template>
  <el-menu
    ref="menuRef"
    :collapse="collapse"
    :collapse-transition="collapseTransition"
    :default-active="defaultActive"
    :default-openeds="defaultOpeneds"
    :ellipsis="ellipsis"
    :menu-trigger="menuTrigger"
    :active-text-color="activeTextColor"
    :background-color="backgroundColor"
    :text-color="textColor"
    :mode="mode"
    :router="router"
    :unique-opened="uniqueOpened"
    class="pj-menu"
  >
    <pj-menu-item
      v-for="item in menuItems"
      :key="item.index"
      :item="item"
      :hide-timeout="itemHideTimeout"
      :popper-class="itemPopperClass"
      :popper-offset="itemPopperOffset"
      :show-timeout="itemShowTimeout"
      @click="$emit('item-click', item)"
    >
      <template #sub-menu-title="scope">
        <slot :item="scope.item" name="sub-menu-title">
          <template v-if="item.icon">
            <el-icon v-if="typeof item.icon === 'object'" :size="itemIconSize">
              <component :is="item.icon" />
            </el-icon>
            <svg-icon v-else :icon="item.icon" :size="itemIconSize" />
          </template>
          <span>{{ scope.item.title }}</span>
        </slot>
      </template>
      <template #default="scope">
        <slot :item="scope.item">
          <template v-if="item.icon">
            <el-icon v-if="typeof item.icon === 'object'" :size="itemIconSize">
              <component :is="item.icon" />
            </el-icon>
            <svg-icon v-else :icon="item.icon" :size="itemIconSize" />
          </template>
        </slot>
      </template>
      <template #title="scope">
        <slot :item="scope.item" name="title">
          {{ scope.item.title }}
        </slot>
      </template>
    </pj-menu-item>
  </el-menu>
</template>

<script setup>
import PjMenuItem from "./PjMenuItem.vue";
import SvgIcon from "../basic/PjSvgIcon.vue";
import { onMounted, ref, shallowRef } from "vue";
import { ArrayUtils, ObjectUtils } from "pangju-utils";

const props = defineProps({
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
    default: "hover",
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
  collapseWidth: {
    type: String,
    default: "64px",
  },
});

defineEmits(["item-click"]);

const menuRef = ref();
const menuItems = ref([]);

let itemIndexProp,
  itemDisabledProp,
  itemChildrenProp,
  itemRouteProp,
  itemHiddenProp,
  itemIconProp,
  itemTitleProp;

onMounted(() => {
  itemIndexProp = {
    keys: props.itemIndexKey.replace(/\[/g, ".").replace(/]/g, "").split("."),
  };
  itemIndexProp.deep = itemIndexProp.keys.length > 1;

  itemDisabledProp = {
    keys: props.itemDisabledKey
      .replace(/\[/g, ".")
      .replace(/]/g, "")
      .split("."),
  };
  itemDisabledProp.deep = itemDisabledProp.keys.length > 1;

  itemChildrenProp = {
    keys: props.itemChildrenKey
      .replace(/\[/g, ".")
      .replace(/]/g, "")
      .split("."),
  };
  itemChildrenProp.deep = itemChildrenProp.keys.length > 1;

  itemRouteProp = {
    keys: props.itemRouteKey.replace(/\[/g, ".").replace(/]/g, "").split("."),
  };
  itemRouteProp.deep = itemRouteProp.keys.length > 1;

  itemHiddenProp = {
    keys: props.itemHiddenKey.replace(/\[/g, ".").replace(/]/g, "").split("."),
  };
  itemHiddenProp.deep = itemHiddenProp.keys.length > 1;

  itemIconProp = {
    keys: props.itemIconKey.replace(/\[/g, ".").replace(/]/g, "").split("."),
  };
  itemIconProp.deep = itemIconProp.keys.length > 1;

  itemTitleProp = {
    keys: props.itemTitleKey.replace(/\[/g, ".").replace(/]/g, "").split("."),
  };
  itemTitleProp.deep = itemTitleProp.keys.length > 1;

  menuItems.value = getMenuItems(props.items);
});

const getMenuItems = (items = []) => {
  const menuItems = [];
  for (let item of items) {
    const menuItem = {};

    if (itemIndexProp.deep) {
      menuItem.index = itemIndexProp.keys.reduce((o, k) => (o || {})[k], item);
    } else {
      menuItem.index = item[props.itemIndexKey];
    }

    if (itemDisabledProp.deep) {
      menuItem.disabled = itemDisabledProp.keys.reduce(
        (o, k) => (o || {})[k],
        item
      );
    } else {
      menuItem.disabled = item[props.itemDisabledKey];
    }

    if (itemChildrenProp.deep) {
      menuItem.children = itemChildrenProp.keys.reduce(
        (o, k) => (o || {})[k],
        item
      );
    } else {
      menuItem.children = item[props.itemChildrenKey];
    }

    if (itemRouteProp.deep) {
      menuItem.route = itemRouteProp.keys.reduce((o, k) => (o || {})[k], item);
    } else {
      menuItem.route = item[props.itemRouteKey];
    }

    if (itemHiddenProp.deep) {
      menuItem.hidden = itemHiddenProp.keys.reduce(
        (o, k) => (o || {})[k],
        item
      );
    } else {
      menuItem.hidden = item[props.itemHiddenKey];
    }

    if (itemIconProp.deep) {
      menuItem.icon = itemIconProp.keys.reduce((o, k) => (o || {})[k], item);
    } else {
      menuItem.icon = item[props.itemIconKey];
    }
    if (
      ObjectUtils.nonNull(menuItem.icon) &&
      typeof menuItem.icon === "object"
    ) {
      menuItem.icon = shallowRef({ ...menuItem.icon });
    }

    if (itemTitleProp.deep) {
      menuItem.title = itemTitleProp.keys.reduce((o, k) => (o || {})[k], item);
    } else {
      menuItem.title = item[props.itemTitleKey];
    }

    if (ArrayUtils.isNotEmpty(menuItem.children)) {
      menuItem.children = getMenuItems(item.children);
    }

    menuItems.push(menuItem);
  }
  return menuItems;
};

const open = (index) => {
  menuRef.value.open(index);
};
const close = (index) => {
  menuRef.value.close(index);
};

defineExpose({
  open,
  close,
});
</script>

<style>
.pj-menu {
  border: none;
}

.pj-menu + .el-menu--collapse {
  width: v-bind(width);
}
</style>
