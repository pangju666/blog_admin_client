<template>
  <div v-if="!item[hiddenKey]">
    <el-menu-item
      v-if="!item[childrenKey] || item[childrenKey].length === 0"
      :disabled="item[disabledKey]"
      :index="item[indexKey]"
      :route="item[routeKey]"
      @click="$emit('click', item)"
    >
      <template #title>
        <slot :item="item" name="title" />
      </template>
      <slot :item="item" />
    </el-menu-item>
    <el-sub-menu
      v-else
      :disabled="item[disabledKey]"
      :hide-timeout="hideTimeout"
      :index="item[indexKey]"
      :popper-class="popperClass"
      :popper-offset="popperOffset"
      :show-timeout="showTimeout"
    >
      <template #title>
        <slot :item="item" name="sub-menu-title" />
      </template>
      <pj-menu-item
        v-for="child in item[childrenKey]"
        :key="child.id"
        :children-key="childrenKey"
        :disabled-key="disabledKey"
        :hidden-key="hiddenKey"
        :hide-timeout="hideTimeout"
        :index-key="indexKey"
        :item="child"
        :popper-class="popperClass"
        :popper-offset="popperOffset"
        :route-key="routeKey"
        :show-timeout="showTimeout"
      >
        <template #title="scope">
          <slot :item="scope.item" name="title" />
        </template>
        <template #sub-menu-title="scope">
          <slot :item="scope.item" name="sub-menu-title" />
        </template>
        <template #default="scope">
          <slot :item="scope.item" />
        </template>
      </pj-menu-item>
    </el-sub-menu>
  </div>
</template>

<script>
export default {
  name: "PjMenuItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
    indexKey: {
      type: String,
      default: "index",
    },
    disabledKey: {
      type: String,
      default: "disabled",
    },
    childrenKey: {
      type: String,
      default: "children",
    },
    routeKey: {
      type: String,
      default: "route",
    },
    hiddenKey: {
      type: String,
      default: "hidden",
    },
    popperClass: {
      type: String,
    },
    popperOffset: {
      type: Number,
      default: 6,
    },
    showTimeout: {
      type: Number,
      default: 300,
    },
    hideTimeout: {
      type: Number,
      default: 300,
    },
  },
  emits: ["click"],
};
</script>
