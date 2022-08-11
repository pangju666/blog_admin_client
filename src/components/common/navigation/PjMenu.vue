<template>
  <el-menu class="el-menu-vertical-demo" collapse menu-trigger="click">
    <pj-menu-item
      v-for="item in items"
      :key="item.id"
      :color="color"
      :item="item"
      :size="size"
      @click="$emit('click', item)"
    >
      <template #title="scope">
        <slot :item="scope.item" name="title">
          {{ scope.item.title }}
        </slot>
      </template>
      <template #sub-menu-title="scope">
        <slot :item="scope.item" name="sub-menu-title">
          <el-icon
            v-if="typeof scope.item.icon === 'object'"
            :color="color"
            :size="size"
          >
            <component :is="scope.item.icon" />
          </el-icon>
          <pj-svg-icon v-else :icon="scope.item.icon" :size="size" />
          <span>{{ scope.item.title }}</span>
        </slot>
      </template>
      <template #default="scope">
        <slot :item="scope.item">
          <el-icon
            v-if="typeof scope.item.icon === 'object'"
            :color="color"
            :size="size"
          >
            <component :is="scope.item.icon" />
          </el-icon>
          <pj-svg-icon v-else :icon="scope.item.icon" :size="size" />
        </slot>
      </template>
    </pj-menu-item>
  </el-menu>
</template>

<script setup>
import PjMenuItem from "components/common/navigation/PjMenuItem.vue";
import PjSvgIcon from "components/common/basic/PjSvgIcon.vue";

defineProps({
  items: {
    type: Array,
    required: true,
  },
  defaultActive: {
    type: String,
    default: "0",
  },
  color: {
    type: String,
  },
  size: {
    type: Number,
  },
});

defineEmits(["click"]);
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
